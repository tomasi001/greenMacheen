import { Button } from "@chakra-ui/react";
import { type Dispatch, type SetStateAction, useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { ClaudeService } from "~/@core/services/claude/cloude-service";

type VoiceInputProps = {
  setTranscript: Dispatch<SetStateAction<string>>;
  setResponse: Dispatch<SetStateAction<string>>;
};

const VoiceInput = ({ setResponse, setTranscript }: VoiceInputProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { transcript, listening } = useSpeechRecognition();

  const fetchResponse = async () => {
    setIsLoading(true);
    const result = await completeClaudRequest(transcript);
    setResponse(result);
    setIsLoading(false);
  };

  useEffect(() => {
    if (!listening && transcript) {
      fetchResponse();
    }
  }, [transcript, listening]);

  useEffect(() => {
    setTranscript(transcript);
  }, [transcript]);
  return (
    <Button
      bg="#F79009"
      size="lg"
      variant="solid"
      borderRadius="full"
      position="absolute"
      zIndex="1"
      height="60px"
      width="60px"
      fontSize="28px"
      marginTop={["10vh", "12vh"]}
      shadow="xl"
      textColor="white"
      onClick={() => {
        setResponse("");
        SpeechRecognition.startListening();
      }}
      isLoading={isLoading}
      // isDisabled={!browserSupportsSpeechRecognition}
    >
      <i className="ri-mic-line"></i>
    </Button>
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
