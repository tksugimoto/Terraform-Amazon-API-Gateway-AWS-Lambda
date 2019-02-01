variable "aws_access_key" {
  description = "AWSアクセスキーID"
}

variable "aws_secret_key" {
  description = "AWSシークレットアクセスキー"
}

variable "prefix" {
  description = "リソース名のPrefix"
}

variable "region" {
  description = "リージョン"
  default     = "ap-northeast-1"
}
