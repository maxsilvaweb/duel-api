variable "database_url" {
  description = "Database URL"
  type        = string
  sensitive   = true
}

variable "app_name" {
  description = "Heroku app name"
  type        = string
  default     = "duel-api"
}