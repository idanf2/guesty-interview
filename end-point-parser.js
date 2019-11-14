function getParsedEndPoints(endPointUrl, requestParams = []) {
    if (requestParams.length === 0) {
        return [endPointUrl];
    } else {
        return requestParams.map((requestParam) => {
            let parsedEndPointUrl = endPointUrl;
            for (let key in requestParam) {
                parsedEndPointUrl =  parsedEndPointUrl.replace(`{${key}`, requestParam[key]);
            }

            return parsedEndPointUrl;
        });
    }
}

module.exports = { getParsedEndPoints }
