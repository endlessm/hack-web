const AWS = require('aws-sdk');

const TABLE = process.env.table;

const dynamoDb = new AWS.DynamoDB.DocumentClient();

function resp(code, data) {
    return {
        statusCode: code,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    };
}

exports.handler = async (event) => {
    let email;

    try {
        ({email} = JSON.parse(event.body));
    } catch(e) {
        return resp(400, { error: 'Invalid params' });
    }

    await dynamoDb.put({
        TableName: TABLE,
        Item: {
            email,
            // We can add here random data, like the form that sent this, the device, etc
        },
    }).promise();

    return resp(200, { response: 'ok' });
}
