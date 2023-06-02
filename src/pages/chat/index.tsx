import {
  Box,
  Button,
  Center,
  Grid,
  HStack,
  Input,
  SimpleGrid,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useRef, useState, type Dispatch, type SetStateAction  } from "react";
import Lotty from "~/components/Lotty";

import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { ClaudeService } from "~/@core/services/claude/cloude-service";


export default function ChatPage() {
  const [response, setResponse] = useState("");
  const [prompt, setPrompt] = useState("");
  const [promptArray, setPromptArray] = useState([])
  const [responseArray, setResponseArray] = useState([])

  let messageArray = promptArray.flatMap((item, index) => [item, responseArray[index]])

  const [isLoading, setIsLoading] = useState(false);
  const { transcript, listening } = useSpeechRecognition();

  const fetchResponse = async () => {
    setIsLoading(true);
    const result = await completeClaudRequest(transcript);
    setResponse(result);
    setIsLoading(false);
  };

  const handleInput = (event) =>{
    setPrompt(event.target.value)
  }

  const sendPrompt = async () => {
    setPromptArray([...promptArray, prompt])
    let final_prompt = prompt + ". Less than 200 characters and do not include Here is a character response in your answer."
    setPrompt("")
    const result = await completeClaudRequest(final_prompt);
    //setResponse(result.data.completion.replace(/• /g, "\n"))
    setResponseArray([...responseArray, result.data.completion.replace(/• /g, "\n")])
    messageArray = promptArray.flatMap((item, index) => [item, responseArray[index]])
  }

  useEffect(() => {
    if (!listening && transcript) {
      fetchResponse();
    }
  }, [transcript, listening]);

  useEffect(() => {
    setPrompt(transcript);
  }, [transcript]);

  return (
    <Center h="100vh" bg="##F6FEFD">
      <Lotty
        bottom="185px"
        right="70px"
        position="absolute"
        transform="scale(0.3)"
      />
      <Box
        w={["90%", "80%"]}
        bg="#FFFCF5"
        shadow="xl"
        rounded="xl"
        p={[4, 50]}
        paddingBottom="5vh"
        position="relative"
      >
        <VStack
          alignContent="center"
          spacing={5}
          paddingX={[0, "15vw"]}
          paddingTop={["3vh", "0"]}
        >
          <Text as="b" fontSize="3xl" textAlign="center">
            Hi there! Get started by chatting to Ozzy
          </Text>
          <Button bg="#F79009">Emergancy</Button>
          <Box bg="white" border="1px" minW="100%" padding={3}>
            <SimpleGrid spacing={3}>
                {
                    messageArray.map((message, index)=>(
                      <Box key={index} textAlign={index % 2 ? "left" : "right"}>{message}</Box>
                    ))
                }
            </SimpleGrid>
            
          </Box>
          <VStack>
            
          </VStack>
          <HStack>
              
            <Input placeholder="You can speak or type to talk to Ozzy..." bg="white" width="50vh" shadow="xl" onChange={handleInput} value={prompt}/>
            <Button bg="#F79009" size="md" variant="solid"
                borderRadius="full"
                height="45px"
                width="45px"
                fontSize="23px"
                shadow="xl"
                textColor="white"
                onClick={sendPrompt}
              >
              <i className="ri-send-plane-2-line"></i>
            </Button>
              <Button bg="#F79009" size="md" variant="solid"
                borderRadius="full"
                height="45px"
                width="45px"
                fontSize="23px"
                shadow="xl"
                textColor="white"
                onClick={() => {
                  setResponse("");
                  SpeechRecognition.startListening();
                }}
                isLoading={isLoading}
              >
              <i className="ri-mic-line"></i>
            </Button>
          </HStack>
        </VStack>
        <Center>
          
        </Center>
      </Box>
    </Center>
  );
}

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
