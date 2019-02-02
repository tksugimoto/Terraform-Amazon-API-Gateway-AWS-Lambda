# Terraform-Amazon-API-Gateway-AWS-Lambda
Terraform を使って API Gateway と Lambda を構築する

## 機能
- Lambdaに届いた Event をそのままレスポンスする

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
