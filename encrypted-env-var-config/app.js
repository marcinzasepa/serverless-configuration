const AWS = require('aws-sdk');
let response;

const kms = new AWS.KMS();

exports.lambdaHandler = async (event, context) => {
    try {
        let sensitiveValueBlob = Buffer.from(process.env.OTHER_SENSITIVE_VAR, 'base64');
        const decryptedValue = await kms.decrypt({CiphertextBlob: sensitiveValueBlob}).promise();
        response = {
            'statusCode': 200,
            'body': JSON.stringify({
                message: `Env variable: ${process.env.ENCRYPTED_AT_REST}, sensitive decrypted ${decryptedValue.Plaintext}`
            })
        }
    } catch (err) {
        console.log(err);
        return err;
    }

    return response
};
