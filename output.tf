output "API Gateway REST API URL" {
  value = "https://${aws_api_gateway_rest_api.main.id}.execute-api.${var.region}.amazonaws.com/${aws_api_gateway_deployment.production.stage_name}"
}
