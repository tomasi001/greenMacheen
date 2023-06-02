import { Button, Stack, Text } from "@chakra-ui/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { ClaudeService } from "~/@core/services/claude/cloude-service";

type VoiceInputProps = {
  setResponse: Dispatch<SetStateAction<undefined>>
}

const VoiceInput = ({setResponse}: VoiceInputProps) => {
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
    setResponse && setResponse(result);
  };

  useEffect(() => {
    if (transcript) {
      fetchResponse();
    }
  }, [transcript]);

  return (
    <>
    {/* TODO: remove at later stage */}
      {/* <Stack direction="row" spacing={4}>
        <Button
          colorScheme="teal"
          variant="solid"
          onClick={SpeechRecognition.startListening as any}
        >
          <i className="ri-mic-2-fill"></i>
          Ask to Ozzi
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
      </Stack> */}
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
        onClick={SpeechRecognition.startListening as any}
      >
        <i className="ri-mic-line"></i>
      </Button>
      <p>{transcript}</p>

      
    </>
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
