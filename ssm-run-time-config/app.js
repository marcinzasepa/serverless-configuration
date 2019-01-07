const AWSXRay = require('aws-xray-sdk-core');
const AWS = AWSXRay.captureAWS(require('aws-sdk'));

const ssm = new AWS.SSM();

const request = {
    Path: `/serviceA`,
    Recursive: true,
    WithDecryption: false,
};

let response;
exports.lambdaHandler = async (event, context) => {
    try {

        const result = await ssm.getParametersByPath(request).promise();
        response = {
            'statusCode': 200,
            'body': JSON.stringify({
                message: `Here are the values from ssm: ${JSON.stringify(result.Parameters)}`
            })
        };
    } catch (err) {
        console.log(err);
        return err;
    }

    return response
};