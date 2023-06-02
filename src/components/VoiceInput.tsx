import { Button, Stack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { ClaudeService } from "~/@core/services/claude/cloude-service";

const VoiceInput = () => {
  const [response, setResponse] = useState();
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const fetchResponse = async () => {
    const result = await completeClaudRequest(transcript);
    setResponse(result);
  };

  useEffect(() => {
    if (transcript) {
      fetchResponse();
    }
  }, [transcript]);

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
      </Stack>
      <p>{transcript}</p>

      {response && <Text>{(response as any)?.data?.completion}</Text>}
    </div>
  );
};

/**
 *
 *
 */
async function completeClaudRequest(transcript: any) {
  const claude = new ClaudeService();

  try {
    const res = await claude.complete({
      prompt: `\n\nHuman: ${transcript} ?\n\nAssistant: `,
      model: "claude-v1",
      max_tokens_to_sample: 300,
      stop_sequences: ["\n\nHuman:"],
    });

    console.log("res", res);
    return res as any;
  } catch (error) {
    console.log("completeClaudRequest >> error ", error);
  }
}

export default VoiceInput;
