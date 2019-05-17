variable "DO_DOCKER_CA_CERT" {}
variable "DO_DOCKER_CLIENT_CERT" {}
variable "DO_DOCKER_CLIENT_KEY" {}

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
  host          = "tcp://manager.salte.io:2376/"

  ca_material   = "${base64decode(var.DO_DOCKER_CA_CERT)}"
  cert_material = "${base64decode(var.DO_DOCKER_CLIENT_CERT)}"
  key_material  = "${base64decode(var.DO_DOCKER_CLIENT_KEY)}"
}

resource "docker_service" "default" {
  name = "${local.environment}-salte-ci"

  task_spec {
    container_spec {
      image = "nginx:alpine"

      labels {
        "traefik.docker.network" = "dmz"
        "traefik.enable" = "true"
        "traefik.frontend.rule" = "Host:${local.domain_name}"
        "traefik.port" = 80
        "traefik.protocol" = "http"
        "traefik.frontend.entryPoints" = "https"
      }
    }

    restart_policy {
      condition    = "any"
      delay        = "5s"
    }

    # networks     = ["${docker_network.default.name}"]
    networks     = ["dmz"]
  }

  mode {
    replicated {
      replicas = 1
    }
  }
}

resource "docker_network" "default" {
  name = "${replace(local.domain_name, ".", "-")}-dmz"
  driver = "overlay"
}
