import json
import boto3

def handler(event, context):
    lambda_client = boto3.client('lambda')
    lambda_payload= json.dumps(event)
    lambda_client.invoke(FunctionName='two',
                     InvocationType='Event',
                     Payload=lambda_payload)
    print('request: {}'.format(json.dumps(event)))
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json'
        },
        # 'body': 'Hello, CDK! You have hit {}\n'.format(event['path'])
         'body': "{\"message\": \"okay\"}"

    }