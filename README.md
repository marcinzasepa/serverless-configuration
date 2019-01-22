# Configuration management for serverless AWS applications

This is a small application showing different approaches for configuration management on AWS when using lambdas. Below short description of the project layout:  

```bash
.
├── README.md                   <-- This instructions file
├── env-var-config              <-- Source code for lambda using environment variables for configuration
├── encrypted-env-var-config    <-- Source code for lambda using environment variables for configuration including sensitive data encrypted with KMS
├── ssm-build-time-config       <-- Source code for lambda using cloudformation SSM parameter resolution for its configuration
├── ssm-run-time-config         <-- Source code for lambda reading config params at runtime from SSM store
├── secretmanager-run-time-config<-- Source code for lambda using Secrets Manager to read the paramteres at runtime
├── ssm-run-time-config-cached  <-- Source code for lambda using middleware to cache the parameters fecthed at runtime from SSM store
└── template.yaml               <-- SAM template deploying all the lambdas described above
└── encryption-key-template.yaml <-- SAM template which deploys custom CMK used for encryption and decryption of sensitive data  
```

## Description 

Project consist of many lambdas presenting different approaches for configuration management. More information can be found on the related blog entry on the medium.com.
Apart from the lambdas and template.yaml there is an additional Cloudformation template encryption-key-template.yaml which deploys custom CMK used for encryption and decryption of sensitive data.

## Requirements

* AWS CLI already configured with Administrator permission
* [NodeJS 8.10+ installed](https://nodejs.org/en/download/)
* [Docker installed](https://www.docker.com/community-edition)

## Environment Variables 

For the deployment of the cloudformation stacks, yarn with predefined scripts can be used. For scripts to work it is necessary to have following environment variables defined:

AWS_PROFILE - Which is the name of the profile which should be used for deployment as configured in the ~/.aws/credentials file

DEPLOYMENT_BUCKET - Name of the S3 bucket which should be used for deployment

## Deployment
 
In order to get all lambdas working, it is necessary to deploy encryption-key-template.yaml. 
Following command has to be issued to deploy custom CMK and alias for it.
```
export AWS_PROFILE=<PROFILE_NAME> yarn deploy-encryption-key
```
Once this step is finished  custom CMK, alias for it and some SSM parameters are deployed.
In order for encrypted-env-var-config to work, it is necessary to encrypt your sensitive data with the command:
```
aws kms encrypt --key-id alias/EncryptionKeyForEnvVariables --plaintext "SENSITIVE_DATA_STRING" --profile <AWS_PROFILE_NAME>
```
In the second step you can deploy all the lambdas with:
```
export DEPLOYMENT_BUCKET=<BUCKET_NAME>;AWS_PROFILE=<PROFILE_NAME> yarn sam-package-and-deploy
```