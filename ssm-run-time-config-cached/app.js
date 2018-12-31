const middy = require('middy');
const { ssm } = require('middy/middlewares');
const _ = require('lodash');

let response;

const unwrappedHandler = async (event, context) => {
    try {
        const paramByName = context.OTHER_PARAM_BY_NAME;
        const paramsByPath = JSON.stringify(_.pickBy(context, (value, key)  => _.startsWith(key, "SERVICE_A")));
        response = {
            'statusCode': 200,
            'body': JSON.stringify({message: `Here are the values fetched recursively: ${paramsByPath} and by name: ${paramByName}`})
        }
    } catch (err) {
        console.log(err);
        return err;
    }

    return response
};

const FIVE_MINUTES_IN_MS = 300000;

let ssmMiddleware = ssm({
    cache: true,
    cacheExpiryInMillis: FIVE_MINUTES_IN_MS,
    paths: {
        SERVICE_A: '/serviceA'
    },
    names: {
        OTHER_PARAM_BY_NAME: '/paramByName'
    },
    setToContext: true
});

exports.lambdaHandler = middy(unwrappedHandler)
    .use(ssmMiddleware);
