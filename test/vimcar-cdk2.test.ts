import * as cdk from 'aws-cdk-lib';
// import { expect as expectCDK, haveResource } from 
import { Template, Match } from 'aws-cdk-lib/assertions';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as VimcarCdk2 from '../lib/vimcar-cdk2-stack';
import * as CdkVimcar2LambdaDashboard from '../lib/vimcar-cdk2-lamba-dashboard';



// test('Lambda Dashboard Created', () => {
//   const stack = new cdk.App();
//   // WHEN
//   new CdkVimcar2LambdaDashboard(stack, 'TestConstruct',{
//     dow
//   })
// });
//   // THEN
  
// });

// test('DynamoDB Table Created', () => {
//   const stack = new cdk.Stack();
//   // WHEN
//   new , 'MyTestConstruct', {
//     downstream:  new lambda.Function(stack, 'TestFunction', {
//       runtime: lambda.Runtime.NODEJS_14_X,
//       handler: 'hello.handler',
//       code: lambda.Code.fromAsset('lambda')
//     })
//   });
//   // THEN

//   const template = Template.fromStack(stack);
//   template.resourceCountIs("AWS::DynamoDB::Table", 1);
// });    