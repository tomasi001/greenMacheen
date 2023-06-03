import axios from "axios";
const DEFAULT_API_URL = "https://frail-newt-jersey.cyclic.app";

const apiKey =
  "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";
interface AxiosResponseData {
  completion: string;
  stop_reason: string;
  truncated: boolean;
  stop: string | null;
  model: string;
  log_id: string;
  // This is disabled as we do not know the specific
  // type returned from axios
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  exception: any | null;
}

type PromptObject = {
  prompt: string;
  model: string;
  max_tokens_to_sample: number;
  stop_sequences: string[];
  temperature: number;
  top_k: number;
};

export class ClaudeService {
  async complete(params: PromptObject): Promise<AxiosResponseData> {
    const body = JSON.stringify({
      ...params,
      stream: false,
    });

    try {
      const response = await axios.post(`${DEFAULT_API_URL}/claude-ask`, body, {
        headers: {
          Accept: "application/json",
          "content-type": "application/json",
          "x-api-key": apiKey,
        },
      });

      // This is disabled as we do not know the specific
      // type returned from axios
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
      const responseData: AxiosResponseData = response.data.data;
      return responseData;
    } catch (error) {
      throw error;
    }
  }
}
