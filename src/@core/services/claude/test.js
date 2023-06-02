const axios = require("axios");
const DEFAULT_API_URL = "https://api.anthropic.com";

const apiKey =
  "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";

async function complete(params) {
  // Make a request for a user with a given ID
  return new Promise(async (resolve, reject) => {
    const body = JSON.stringify({
      ...params,
      stream: false,
    });

    console.log("BODY", body);

    try {
      const response = await axios.post(
        `${DEFAULT_API_URL}/v1/complete`,
        body,
        {
          headers: {
            Accept: "application/json",
            "content-type": "application/json",
            "x-api-key": apiKey,
          },
        }
      );

      return resolve(response.data);
    } catch (error) {
      return reject(error);
    }
  });
}

async function completeClaudRequest() {
  try {
    const res = await complete({
      prompt: "\n\nHuman: I have a headache, what do i do ?\n\nAssistant: ",
      model: "claude-v1",
      max_tokens_to_sample: 300,
      stop_sequences: ["\n\nHuman:"],
    });

    console.log('res', res)
  } catch (error) {
    console.log("completeClaudRequest >> error ", error);
  }
}

completeClaudRequest();
