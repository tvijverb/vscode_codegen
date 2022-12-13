import fetch from "node-fetch";

export type FetchCodeCompletions = {
    completions: Array<string>
}

export const debounce = <F extends (...args: any[]) => any>(func: F, waitFor: number) => {
    let timeout: any;
  
    return (...args: Parameters<F>): Promise<ReturnType<F>> =>
      new Promise(resolve => {
        if (timeout) {
          clearTimeout(timeout);
        }
  
        timeout = setTimeout(() => resolve(func(...args)), waitFor);
      });
  };

export function fetchCodeCompletionTexts(prompt: string): Promise<FetchCodeCompletions> {
    const API_URL = `http://192.168.68.106:8000/`;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    // const headers = { "Authorization": `Bearer ${API_KEY}` };
    return new Promise((resolve, reject) => {
        // Send post request to inference API
        return fetch(API_URL, {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "input_text": prompt
            })
            ,
            // headers: headers
        })
        .then(res => res.json())
        .then(json => {
            if ('response_text' in json) {
                const completions = Array<string>();
                completions.push(
                    json.response_text
                );
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