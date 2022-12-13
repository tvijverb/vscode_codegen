"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchCodeCompletionTexts = exports.debounce = void 0;
const node_fetch_1 = require("node-fetch");
const debounce = (func, waitFor) => {
    let timeout;
    return (...args) => new Promise(resolve => {
        if (timeout) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(() => resolve(func(...args)), waitFor);
    });
};
exports.debounce = debounce;
function fetchCodeCompletionTexts(prompt) {
    const API_URL = `http://192.168.68.106:8000/`;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    // const headers = { "Authorization": `Bearer ${API_KEY}` };
    return new Promise((resolve, reject) => {
        // Send post request to inference API
        return (0, node_fetch_1.default)(API_URL, {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "input_text": prompt
            }),
            // headers: headers
        })
            .then(res => res.json())
            .then(json => {
            if ('response_text' in json) {
                const completions = Array();
                completions.push(json.response_text);
                console.log(completions);
                resolve({ completions });
            }
            else {
                console.log(json);
                throw new Error(json["error"]);
            }
        })
            .catch(err => reject(err));
    });
}
exports.fetchCodeCompletionTexts = fetchCodeCompletionTexts;
