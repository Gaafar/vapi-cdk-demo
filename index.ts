import awsApigateway = require('@aws-cdk/aws-apigateway');
import awsLambda = require('@aws-cdk/aws-lambda');
import cdk = require('@aws-cdk/cdk');

export class VAPIStack extends cdk.Stack {
  constructor(app: cdk.App, id: string) {
    super(app, id);

    const defaultLambdaProps = {
      code: new awsLambda.AssetCode('lambda'),
      runtime: awsLambda.Runtime.NodeJS810,
      timeout: 60,
    };

    const api = new awsApigateway.RestApi(this, 'VAPIGateway', {});

    // tslint:disable-next-line:no-function-constructor-with-string-args
    const answerLambda = new awsLambda.Function(this, 'answerLambda', {
      ...defaultLambdaProps,
      handler: 'answer.handler',
    });
    const answer = api.root.addResource('answer');
    addCorsOptions(answer);
    answer.addMethod('GET', new awsApigateway.LambdaIntegration(answerLambda));

    // tslint:disable-next-line:no-function-constructor-with-string-args
    const inputLambda = new awsLambda.Function(this, 'inputLambda', {
      ...defaultLambdaProps,
      handler: 'input.handler',
    });
    const input = api.root.addResource('input');
    addCorsOptions(input);
    input.addMethod('POST', new awsApigateway.LambdaIntegration(inputLambda));

    // tslint:disable-next-line:no-function-constructor-with-string-args
    const voiceEventLambda = new awsLambda.Function(this, 'voiceEventLambda', {
      ...defaultLambdaProps,
      handler: 'voice-event.handler',
    });
    const event = api.root.addResource('event');
    addCorsOptions(event);
    event.addMethod('POST', new awsApigateway.LambdaIntegration(voiceEventLambda));
  }
}

export function addCorsOptions(apiResource: awsApigateway.IResource) {
  apiResource.addMethod('OPTIONS', new awsApigateway.MockIntegration({
    integrationResponses: [{
      statusCode: '200',
      responseParameters: {
        'method.response.header.Access-Control-Allow-Headers':
          "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,X-Amz-User-Agent'",
        'method.response.header.Access-Control-Allow-Origin': "'*'",
        'method.response.header.Access-Control-Allow-Credentials': "'false'",
        'method.response.header.Access-Control-Allow-Methods': "'OPTIONS,GET,PUT,POST,DELETE'",
      },
    }],
    passthroughBehavior: awsApigateway.PassthroughBehavior.Never,
    requestTemplates: {
      'application/json': '{"statusCode": 200}',
    },
  }),                   {
    methodResponses: [{
      statusCode: '200',
      responseParameters: {
        'method.response.header.Access-Control-Allow-Headers': true,
        'method.response.header.Access-Control-Allow-Methods': true,
        'method.response.header.Access-Control-Allow-Credentials': true,
        'method.response.header.Access-Control-Allow-Origin': true,
      },
    }],
  });
}

const app = new cdk.App();
new VAPIStack(app, 'VAPIStack');
app.run();
