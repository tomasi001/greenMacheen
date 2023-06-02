import "dotenv/config";
import { AI_PROMPT, Client, HUMAN_PROMPT } from "./index";

const apiKey = process.env.ANTHROPIC_API_KEY;

export class ClaudeBasicStreamService {

    /**
     * Uses claude to answer a question form some static text
     *
     * @param {string} inputText
     * @memberof ClaudeBasicStreamService
     */
    complete(inputText: string) {
        if (!apiKey) {
            throw new Error("The ANTHROPIC_API_KEY environment variable must be set");
        }

        const client = new Client(apiKey);

        client
            .complete({
                prompt: `${HUMAN_PROMPT} ${inputText} ${AI_PROMPT}`,
                stop_sequences: [HUMAN_PROMPT],
                max_tokens_to_sample: 200,
                model: "claude-v1",
            })
            .then((completion) => {
                console.log(completion);
            })
            .catch((error) => {
                console.error(error);
            });
    }

}

