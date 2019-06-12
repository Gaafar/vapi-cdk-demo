# Nexmo Voice API Demo with AWS CDK

This repo sets up a simple nexmo application that will answer phone calls and accept user input, and respond according to the input

## Structure

```
├── index.ts: defines the cdk stack
└── lambda: contains the lambda functions along with any dependencies. 
    │    This dir will be zipped and deployed to different lambdas with different handlers
    ├── answer.ts: called when a phone call is received to return the ncco
    ├── input.ts: called when a user makes an input, returns a new ncco based on input
    └── voice-event.ts: called for generic events which don't have a specific handler
```

## Dependencies
* AWS CLI installed and configured with your account credentials
  
    * Setup: https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html
    * Configure: https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html

* CDK & Typescript global install
  ```
  npm i -g aws-cdk typescript
  ```

* nexmo account, application credentials, and phone number 
https://dashboard.nexmo.com/voice/create-application

## Install
```
yarn
```

## Configure nexmo application
Copy the file `.env-template` to `.env` and replace variables with your nexmo credentials. Leave the variable `ENDPOINT` for now, we'll get it from `yarn deploy` output.

## Run
* `yarn watch` starts typescript compiler and watch for changes
* `yarn deploy` deploys the CDK stack to your AWS account, this will output the gateway endpoint like 
  ```
  Outputs:
  VAPIStack.VAPIGatewayEndpointXXXXX = https://{some-id}.execute-api.{region}.amazonaws.com/prod/
  ```
  you'll then copy this url (without the trailing slash) to your `.env` file under `ENDPOINT`
* `yarn setup` configures your nexmo app to use the AWS stack endpoint for webhooks
