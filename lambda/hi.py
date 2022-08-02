import json
# import time

def handler(event, context):
    # Imitating intensive process to test asynchronism
    # time.sleep(10)

    print(event)
    rawData = json.loads(str(event['body']))

    data = rawData['data']
    data.sort()
    uniqueData = list(dict.fromkeys(data))
    print(uniqueData[-3:])