let response;

exports.lambdaHandler = async (event, context) => {
    try {
        response = {
            'statusCode': 200,
            'body': JSON.stringify({
                message: `Here is the value from env variable delivered from ssm: ${process.env.MY_PARAM_FROM_SSM} 
                and from secret manager: ${process.env.MY_PARAM_FROM_SECRET_MANAGER}`
            })
        }
    } catch (err) {
        console.log(err);
        return err;
    }

    return response
};
