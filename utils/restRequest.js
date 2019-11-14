const axios = require('axios');

const RATE_LIMIT_STATUS = 429;
const WAITING_CALLS_TIME = 1000 * 10;

async function makeRequestCall(url, httpVerb, data, retries = 1) {
    try {
        const parsedHttpVerb = httpVerb.toLowerCase();
        const result = await axios({
            method: parsedHttpVerb,
            url,
            data
        });

        return result.status;
    } catch (error) {
        if (error.response.status === RATE_LIMIT_STATUS) {
            return new Promise((resolve) => {
                setTimeout(async () => {
                    resolve(await makeRequestCall(url, httpVerb, data, retries - 1));
                }, WAITING_CALLS_TIME);
            });
        }
        if (retries === 0) {
            return error.response.status;
        }

        return await makeRequestCall(url, httpVerb, data, retries - 1);
    }
}

module.exports = {makeRequestCall}
