import React from "react";
import { Button, ButtonGroup, Stack } from "@chakra-ui/react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

function VoiceInput() {
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
    <div className="voice-input-container">
      <Stack direction="row" spacing={4}>
        <Button colorScheme="teal" variant="solid"  onClick={SpeechRecognition.startListening as any}>
        <i className="ri-mic-2-fill"></i>
        Task to Ozzi
        </Button>
        <Button colorScheme="teal" variant="outline" onClick={SpeechRecognition.stopListening}>
          Stop Recording
        </Button>

        <Button colorScheme="teal" variant="outline" onClick={resetTranscript}>
          Reset Transcript
        </Button>
      </Stack>

      <p>{transcript}</p>
    </div>
  );
}

export default VoiceInput;
