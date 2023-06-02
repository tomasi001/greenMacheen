import axios from "axios";
const DEFAULT_API_URL = "https://frail-newt-jersey.cyclic.app";

const apiKey =
  "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";

export class ClaudeService {
  async complete(params: any) {
    // Make a request for a user with a given ID
    return new Promise(async (resolve, reject) => {
      const body = JSON.stringify({
        ...params,
        stream: false,
      });

      try {
        const response = await axios.post(
          `${DEFAULT_API_URL}/claude-ask`,
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
}
