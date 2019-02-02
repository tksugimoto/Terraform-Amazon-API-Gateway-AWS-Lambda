resource "aws_api_gateway_rest_api" "main" {
  name = "${var.prefix}"
}

data "aws_api_gateway_resource" "root" {
  rest_api_id = "${aws_api_gateway_rest_api.main.id}"
  path        = "/"
}

resource "aws_api_gateway_method" "any" {
  rest_api_id   = "${aws_api_gateway_rest_api.main.id}"
  resource_id   = "${data.aws_api_gateway_resource.root.id}"
  http_method   = "ANY"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "lambda_integration" {
  rest_api_id = "${aws_api_gateway_rest_api.main.id}"
  resource_id = "${data.aws_api_gateway_resource.root.id}"
  http_method = "${aws_api_gateway_method.any.http_method}"

  # Lambda プロキシ統合
  type = "AWS_PROXY"

  # Lambda へは POST のみ対応
  integration_http_method = "POST"

  uri = "arn:aws:apigateway:${var.region}:lambda:path/2015-03-31/functions/${aws_lambda_function.main.arn}/invocations"
}

resource "aws_lambda_permission" "api_gateway_lambda" {
  action        = "lambda:InvokeFunction"
  function_name = "${aws_lambda_function.main.arn}"
  principal     = "apigateway.amazonaws.com"

  # The /*/*/* part allows invocation from any stage, method and resource path within API Gateway REST API.
  source_arn = "${aws_api_gateway_rest_api.main.execution_arn}/*/*/*"
}

resource "aws_api_gateway_deployment" "production" {
  depends_on = [
    "aws_api_gateway_integration.lambda_integration",
  ]

  rest_api_id = "${aws_api_gateway_rest_api.main.id}"
  stage_name  = "prod"
}
