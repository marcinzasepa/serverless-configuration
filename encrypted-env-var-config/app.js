const AWSXRay = require('aws-xray-sdk-core');
const AWS = AWSXRay.captureAWS(require('aws-sdk'));

const kms = new AWS.KMS();

let decryptedValue;

exports.lambdaHandler = async () => {
    try {
        if(!decryptedValue) {
            const sensitiveValueBlob = Buffer.from(process.env.OTHER_SENSITIVE_VAR, 'base64');
            decryptedValue = await kms.decrypt({CiphertextBlob: sensitiveValueBlob}).promise();
        }
        return  {
            'statusCode': 200,
            'body': JSON.stringify({
                message: `Env variable: ${process.env.ENCRYPTED_AT_REST}, sensitive decrypted ${decryptedValue.Plaintext}`
            })
        }
    } catch (err) {
        console.log(err);
        return err;
    }
};
