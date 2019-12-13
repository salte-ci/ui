terraform {
  backend "s3" {
    bucket = "salte-ci"
    key    = "salte-ci-ui.tfstate"
    region = "us-east-1"
  }
}

locals {
  environment = terraform.workspace
  domain_name = "${local.environment == "live" ? "salte.ci" : "${local.environment}.salte.ci"}"
  s3_origin_id = "SalteCI-${local.environment}"
}

provider "aws" {
  region = "us-east-1"
}

data "aws_iam_policy_document" "policy" {
  statement {
    actions   = ["s3:GetObject"]
    resources = ["${aws_s3_bucket.bucket.arn}/*"]

    principals {
      type        = "AWS"
      identifiers = [aws_cloudfront_origin_access_identity.origin_access_identity.iam_arn]
    }
  }

  statement {
    actions   = ["s3:ListBucket"]
    resources = [aws_s3_bucket.bucket.arn]

    principals {
      type        = "AWS"
      identifiers = [aws_cloudfront_origin_access_identity.origin_access_identity.iam_arn]
    }
  }
}

resource "aws_s3_bucket_policy" "policy" {
  bucket = aws_s3_bucket.bucket.id
  policy = data.aws_iam_policy_document.policy.json
}

resource "aws_s3_bucket" "bucket" {
  bucket = "salte-ci-${local.environment}"
  acl    = "private"

  tags = {
    Name        = "Salte CI"
    Environment = "${local.environment}"
  }
}

resource "aws_cloudfront_origin_access_identity" "origin_access_identity" {
  comment = "Salte CI - ${local.environment}"
}

data "aws_acm_certificate" "cert" {
  domain   = "*.salte.ci"
  statuses = ["ISSUED"]
}

data "aws_route53_zone" "salte_ci" {
  name         = "salte.ci."
  private_zone = false
}

resource "aws_route53_record" "site" {
  zone_id = data.aws_route53_zone.salte_ci.zone_id
  name    = local.domain_name
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.s3_distribution.domain_name
    zone_id                = aws_cloudfront_distribution.s3_distribution.hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_cloudfront_distribution" "s3_distribution" {
  origin {
    domain_name = aws_s3_bucket.bucket.bucket_regional_domain_name
    origin_id   = local.s3_origin_id

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.origin_access_identity.cloudfront_access_identity_path
    }
  }

  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"

  aliases = [local.domain_name]

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD", "OPTIONS"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = local.s3_origin_id

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
  }

  custom_error_response {
    error_code = 404
    response_code = 200
    response_page_path = "/index.html"
  }

  price_class = "PriceClass_100"

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  tags = {
    Environment = local.environment
  }

  viewer_certificate {
    ssl_support_method = "sni-only"
    acm_certificate_arn = data.aws_acm_certificate.cert.arn
  }
}

output "distribution_id" {
  value = aws_cloudfront_distribution.s3_distribution.id
}
