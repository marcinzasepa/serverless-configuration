let response;

exports.lambdaHandler = async (event, context) => {
    try {
        response = {
            'statusCode': 200,
            'body': JSON.stringify({
                message: `Here is the value from env variable: ${process.env.MY_PARAM_FROM_SSM}`
            })
        }
    } catch (err) {
        console.log(err);
        return err;
    }

    return response
};
