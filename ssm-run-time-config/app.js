const AWSXRay = require('aws-xray-sdk-core');
const AWS = AWSXRay.captureAWS(require('aws-sdk'));

const ssm = new AWS.SSM();

let response;
exports.lambdaHandler = async (event, context) => {
    try {

        const result = await ssm.getParametersByPath({
            Path: `/serviceA`,
            Recursive: true,
            WithDecryption: false,
        }).promise();
        const parameterFromSecretManager = await ssm.getParameter({
            Name: '/aws/reference/secretsmanager/secretValue',
            WithDecryption: true
        }).promise();
        response = {
            'statusCode': 200,
            'body': JSON.stringify({
                message: `Here are the values from ssm: ${JSON.stringify(result.Parameters)} 
                and parameter value from secret manager via ssm: ${JSON.stringify(parameterFromSecretManager)}`
            })
        };
    } catch (err) {
        console.log(err);
        return err;
    }

    return response
};