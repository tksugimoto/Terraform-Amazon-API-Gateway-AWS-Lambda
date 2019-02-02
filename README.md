# Terraform-Amazon-API-Gateway-AWS-Lambda
Terraform を使って API Gateway と Lambda を構築する

## 機能
- Lambdaに届いた Event をそのままレスポンスする
	- `?type=echo` (デフォルト)
- 別URLへのリクエストをLambdaにプロキシさせる
	- 制約
		- GETリクエストのみ
		- レスポンスはテキストのみ
	- `?type=proxy&target=<encodedURL>`
		- `type=proxy`
		- `target=<encodedURL>`
			- `target=http%3A%2F%2Fcheckip.amazonaws.com%2F`
				- `http://checkip.amazonaws.com/`
			- `target=https%3A%2F%2Fexample.com%2F%3Fa%3D1%26b%3D2`
				- `https://example.com/?a=1&b=2`

## 使い方
1. 事前準備
	1. [Terraform](https://www.terraform.io/ "https://www.terraform.io/") をインストール
	1. 設定用ファイル (`terraform.tfvars`) を作成
		1. [terraform.tfvars.sample](./terraform.tfvars.sample) ファイルを `terraform.tfvars` という名前でコピー
			```
			cp terraform.tfvars.sample terraform.tfvars
			```
		1. `terraform.tfvars` に設定を書き込む
			* `aws_access_key`
			* `aws_secret_key`
			* `prefix`
			* `region`
1. デプロイ
	```
	terraform apply
	```
