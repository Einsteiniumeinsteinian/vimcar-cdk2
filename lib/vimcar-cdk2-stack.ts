import { Stack, StackProps,Duration } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigw from 'aws-cdk-lib/aws-apigateway';
import * as iam from 'aws-cdk-lib/aws-iam'


export class VimcarCdk2Stack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // defines an AWS Lambda Role resource
    const helloRole = new iam.Role(this, 'HelloHandler_Role', {
      assumedBy: new iam.ServicePrincipal("lambda.amazonaws.com")
    });

    // defines an AWS Lambda resource
    const hello = new lambda.Function(this, 'HelloHandler', {
      runtime: lambda.Runtime.PYTHON_3_7,    // execution environment
      code: lambda.Code.fromAsset('lambda'),  // code loaded from "lambda" directory
      handler: 'ambassador.handler',              // file is "hello", function is "handler"
      functionName: "one",
      role: helloRole
    });


    // defines an AWS Lambda 2 resource
    const hi = new lambda.Function(this, 'HiHandler', {
      runtime: lambda.Runtime.PYTHON_3_7,    // execution environment
      code: lambda.Code.fromAsset('lambda'),  // code loaded from "lambda" directory
      handler: 'delegate.handler',              // file is "hello", function is "handler"
      functionName: "two"
    });

    helloRole.addToPolicy(
      new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        actions: [
          "lambda:InvokeFunction",
          "lambda:InvokeAsync",
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents",
        ],
        resources: hi.resourceArnsForGrantInvoke
      })
    )
 
    // defines an API Gateway REST API resource backed by our "hello" function.
    const gatewayApi = new apigw.LambdaRestApi(this, 'Endpoint', {
      handler: hello,
      proxy: false,
      // integrationOptions: {
      //   requestTemplates:{ "application/json": '{ "statusCode": "200" }' },
      // },
  
    });

    const gatewayApiRest = gatewayApi.root.addResource('test');
    gatewayApiRest.addMethod('POST')
    
  }
}
