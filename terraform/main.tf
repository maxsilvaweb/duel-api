terraform {
  required_providers {
    heroku = {
      source  = "heroku/heroku"
      version = "~> 5.0"
    }
  }
}

provider "heroku" {
  # Set HEROKU_API_KEY environment variable
}

resource "heroku_app" "duel_api" {
  name   = var.app_name  # Now uses variable
  region = "eu"  # This ensures EU deployment
  
  config_vars = {
    NODE_ENV = "production"
    DATABASE_URL = var.database_url
  }
  
  buildpacks = [
    "heroku/nodejs"
  ]
}

output "app_url" {
  value = "https://${heroku_app.duel_api.name}.herokuapp.com"
}