let response;

exports.lambdaHandler = async () => {
    try {
        response = {
            'statusCode': 200,
            'body': JSON.stringify({
                message: `Here is the value from env variable: ${process.env.MY_PARAM_USED_BY_ONE_FUNCTION}`
            })
        }
    } catch (err) {
        console.log(err);
        return err;
    }

    return response
};
