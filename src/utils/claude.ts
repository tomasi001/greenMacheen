import { ClaudeService } from "~/@core/services/claude/cloude-service";

export async function completeClaudRequest(transcript: string) {
  const claude = new ClaudeService();

  try {
    const res = await claude.complete({
      prompt: `\n\nHuman: ${transcript} ? Include only scientific answers less than 200 characters and do not include Here is a character response in your answer. \n\nAssistant: `,
      model: "claude-v1",
      max_tokens_to_sample: 300,
      stop_sequences: ["\n\nHuman:"],
      temperature: 0.2,
      top_k: 0.5,
    });

    // Manpulate the response to be more catered for platform and end user 
    const result_string =
      res.completion.replace("911", "10177").replace("Claude", "Ozzy") || "";

    return result_string;
  } catch (error) {
    console.log("completeClaudRequest >> error ", error);
  }
}
