import { Button, Stack } from "@chakra-ui/react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { ClaudeService } from "~/@core/services/claude/cloude-service";

const VoiceInput = () => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div>
      <Stack direction="row" spacing={4}>
        <Button
          colorScheme="teal"
          variant="solid"
          onClick={SpeechRecognition.startListening as any}
        >
          <i className="ri-mic-2-fill"></i>
          Task to Ozzi
        </Button>

        <Button
          colorScheme="teal"
          variant="outline"
          onClick={SpeechRecognition.stopListening}
        >
          Stop Recording
        </Button>

        <Button colorScheme="teal" variant="outline" onClick={resetTranscript}>
          Reset Transcript
        </Button>

        <Button
          colorScheme="teal"
          variant="outline"
          onClick={completeClaudRequest}
        >
          Invoke claude text complete
        </Button>
      </Stack>
      <p>{transcript}</p>
    </div>
  );
};

/**
 *
 *
 */
async function completeClaudRequest() {
  const claude = new ClaudeService();

  try {
    const res = await claude.complete({
      prompt: "\n\nHuman: I have a headache, what do i do ?\n\nAssistant: ",
      model: "claude-v1",
      max_tokens_to_sample: 300,
      stop_sequences: ["\n\nHuman:"],
    });

    console.log("res", res);
  } catch (error) {
    console.log("completeClaudRequest >> error ", error);
  }
}

export default VoiceInput;
