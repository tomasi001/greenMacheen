import "dotenv/config";
import { AI_PROMPT, Client, HUMAN_PROMPT } from "./index";


const apiKey = process.env.ANTHROPIC_API_KEY!;


export class ClaudeBasicStreamService {

    /**
     * Uses claude to answer a question form som text stream
     *
     * @param {string} inputTextStream
     * @memberof ClaudeBasicStreamService
     */
    completeStream(inputTextStream:string) {

        if (apiKey) {
            throw new Error("The ANTHROPIC_API_KEY environment variable must be set");
        }
        const client = new Client(apiKey!);

        client
            .completeStream(
                {
                    prompt: `${HUMAN_PROMPT} ${inputTextStream} ${AI_PROMPT} `,
                    stop_sequences: [HUMAN_PROMPT],
                    max_tokens_to_sample: 200,
                    model: "claude-v1",
                },
                {
                    onOpen: (response) => {
                        console.log("Opened stream, HTTP status code", response.status);
                    },
                    onUpdate: (completion) => {
                        console.log(completion.completion);
                    },
                }
            )
            .then((completion) => {
                console.log("Finished sampling:\n", completion);
            })
            .catch((error) => {
                console.error(error);
            });
    }
}


