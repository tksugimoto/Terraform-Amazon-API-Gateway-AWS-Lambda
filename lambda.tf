data "archive_file" "source_code" {
  type        = "zip"
  source_file = "./src/index.js"
  output_path = "./dist/source.zip"
}

resource "aws_lambda_function" "main" {
  function_name    = "${var.prefix}"
  role             = "${aws_iam_role.iam_for_lambda.arn}"
  runtime          = "nodejs8.10"
  handler          = "index.handler"
  timeout          = 10
  filename         = "${data.archive_file.source_code.output_path}"
  source_code_hash = "${data.archive_file.source_code.output_base64sha256}"
}
