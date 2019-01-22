const AWSXRay = require('aws-xray-sdk-core');
const AWS = AWSXRay.captureAWS(require('aws-sdk'));

const ssm = new AWS.SSM();
exports.lambdaHandler = async () => {
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

        return {
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
};