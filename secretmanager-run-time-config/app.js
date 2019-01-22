const AWSXRay = require('aws-xray-sdk-core');
const AWS = AWSXRay.captureAWS(require('aws-sdk'));

const secretsmanager = new AWS.SecretsManager();
const request = {
    SecretId: 'secretValue'
};

let secretValue;
exports.lambdaHandler = async () => {
    try {
        if (!secretValue) {
          secretValue = await secretsmanager.getSecretValue(request).promise();
        }
        return {
            'statusCode': 200,
            'body': JSON.stringify({
                message: `Here are the values from secret manager: ${secretValue.SecretString}`
            })
        };
    } catch (err) {
        console.log(err);
        return err;
    }
};