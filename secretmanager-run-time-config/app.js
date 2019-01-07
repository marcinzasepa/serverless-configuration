const AWSXRay = require('aws-xray-sdk-core');
const AWS = AWSXRay.captureAWS(require('aws-sdk'));

var secretsmanager = new AWS.SecretsManager();

const request = {
    SecretId: 'secretValue'
};

let response;
exports.lambdaHandler = async (event, context) => {
    try {

        const result = await secretsmanager.getSecretValue(request).promise();
        response = {
            'statusCode': 200,
            'body': JSON.stringify({
                message: `Here are the values from secret manager: ${result.SecretString}`
            })
        };
    } catch (err) {
        console.log(err);
        return err;
    }

    return response
};