const endPointParser = require('./end-point-parser');
const restRequest = require('./utils/restRequest');

async function handleBatch(req, res) {
    const {
        urlEndPoint,
        httpVerb,
        requestParams,
        data
    } = req.body;

    if (!(urlEndPoint && httpVerb) || !isBodyValid(httpVerb, requestParams, data)) {
        return res.status(400).send({
            message: 'Request is not in the correct format'
        });
    }

    const parsedEndPoints = endPointParser.getParsedEndPoints(urlEndPoint, requestParams);

    const requestsPromises = [];
    parsedEndPoints.forEach((endPoint) => {
        requestsPromises.push(restRequest.makeRequestCall(endPoint, httpVerb, data));
    });

    const allResultsStatuses = await Promise.all(requestsPromises);
    const successStatuses = allResultsStatuses.filter(status => status === 200);
    const failedStatuses = allResultsStatuses.filter(status => status !== 200);
    return res.json({message: `Finished Batching. Success Requests: ${successStatuses.length}, Failed Requests: ${failedStatuses.length}`});
}

function isBodyValid(httpVerb, requestParams, data) {
    // Check if the httpVerb is not get, then if the requestParams or data not empty
    // If params exists, then check the format of it - array that the values are non-empty objects.
    return true;
}

module.exports = {
    handleBatch
}
