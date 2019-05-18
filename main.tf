variable "DO_DOCKER_CA_CERT" {}
variable "DO_DOCKER_CLIENT_CERT" {}
variable "DO_DOCKER_CLIENT_KEY" {}
variable "REGISTRY" {}
variable "REGISTRY_USER" {}
variable "REGISTRY_PASSWORD" {}
variable "IMAGE" {}

terraform {
  backend "s3" {
    bucket = "salte-ci"
    key    = "salte-ci-ui.tfstate"
    region = "us-east-1"
  }
}

locals {
  environment = "${terraform.workspace}"
  domain_name = "${local.environment == "live" ? "salte.ci" : "${local.environment}.salte.ci"}"
}

# Configure the Docker provider
provider "docker" {
  host = "tcp://manager.salte.io:2376/"

  ca_material   = "${base64decode(var.DO_DOCKER_CA_CERT)}"
  cert_material = "${base64decode(var.DO_DOCKER_CLIENT_CERT)}"
  key_material  = "${base64decode(var.DO_DOCKER_CLIENT_KEY)}"

  registry_auth {
    address  = "${var.REGISTRY}"
    username = "${var.REGISTRY_USER}"
    password = "${var.REGISTRY_PASSWORD}"
  }
}

resource "docker_service" "default" {
  name = "${local.environment}-salte-ci"

  labels {
    "traefik.docker.network"       = "dmz"
    "traefik.enable"               = "true"
    "traefik.frontend.rule"        = "Host:${local.domain_name}"
    "traefik.port"                 = 80
    "traefik.protocol"             = "http"
    "traefik.frontend.entryPoints" = "https"
  }

  task_spec {
    container_spec {
      image = "${var.IMAGE}"
    }

    restart_policy {
      condition = "any"
      delay     = "5s"
    }

    networks = ["dmz"]
  }

  mode {
    replicated {
      replicas = 1
    }
  }
}
