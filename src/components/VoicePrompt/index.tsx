import { Button } from "@chakra-ui/react";
import { useEffect } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

interface VoicePromptProps {
  setPrompt: (value: string) => void;
  isLoading: boolean;
  sendPrompt: ()=>Promise<void>
}

const VoicePrompt: React.FC<VoicePromptProps> = ({ setPrompt, isLoading, sendPrompt }) => {
  const { transcript, listening } = useSpeechRecognition();

  useEffect(() => {
    if (!listening && transcript) {
      sendPrompt().catch((error) => {
        console.log("Error Sending Prompt", error);
      });
    }
    // including send prompt causes an infinite loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transcript, listening]);

  useEffect(() => {
    setPrompt(transcript);
  }, [transcript, setPrompt]);
  
  return (
    <Button
      bg="#F79009"
      size="md"
      variant="solid"
      borderRadius="full"
      height={["60px", "45px"]}
      width={["60px", "45px"]}
      fontSize="23px"
      shadow="xl"
      textColor="white"
      onClick={() => {
        SpeechRecognition.startListening().catch((error) => {
          console.log("Error With Speach Recognition", error);
        });
      }}
      isLoading={isLoading}
    >
      <i className="ri-mic-line"></i>
    </Button>
  );
};

export default VoicePrompt;
