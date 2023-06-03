import {
  Box,
  Button,
  Center,
  Flex,
  Grid,
  HStack,
  Input,
  SimpleGrid,
  Text,
  Textarea,
  VStack,
  Spinner
} from "@chakra-ui/react";
import { useEffect, useRef, useState, type Dispatch, type SetStateAction  } from "react";
import Lotty from "~/components/Lotty";

import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { ClaudeService } from "~/@core/services/claude/cloude-service"; 
import Image from "next/image";


const buttonsText = [
  "I am having a panic attack how do I calm myself down ?",
  "Emergency Help",
  "Teach me how to do CPR",
  "How to correctly use an epipen",
];

export default function ChatPage() {
  const [response, setResponse] = useState("");
  const [prompt, setPrompt] = useState("");
  const [promptArray, setPromptArray] = useState([])
  const [responseArray, setResponseArray] = useState([])
  const textareaRef = useRef()
  const [isTyping, setIsTyping] = useState(false)

  let messageArray = promptArray.flatMap((item, index) => [item, responseArray[index]])

  const [isLoading, setIsLoading] = useState(false);
  const { transcript, listening } = useSpeechRecognition();

  const handleInput = (event) =>{
    setPrompt(event.target.value)
  }

  useEffect(()=>{
    const textArea = textareaRef.current
    textArea.style.height = 'auto'
    textArea.style.height = `${textArea.scrollHeight}px`
  }, [prompt])

  const sendPrompt = async () => {
    setIsLoading(true)
    setPromptArray([...promptArray, prompt])
    setPrompt("")
    const result = await completeClaudRequest(prompt);
    const result_string = result.data.completion.replace("911", "10177")
    setResponseArray([...responseArray, result_string])
    messageArray = promptArray.flatMap((item, index) => [item, responseArray[index]])
    setIsLoading(false)
  }

  const testBtn = async (text) =>{
    setIsLoading(true)
    if(text == "Emergency Help"){
      text = "Closet hospital near me in Cape Town South Africa with phone numbers"
    }
    setPrompt(text)
    setPromptArray([...promptArray, text])
    setPrompt("")
    const result = await completeClaudRequest(text);
    const result_string = result.data.completion.replace("911", "10177")
    setResponseArray([...responseArray, result_string])
    messageArray = promptArray.flatMap((item, index) => [item, responseArray[index]])
    setIsLoading(false)
  }

  useEffect(() => {
    if (!listening && transcript) {
      sendPrompt();
    }
  }, [transcript, listening]);

  useEffect(() => {
    setPrompt(transcript);
  }, [transcript]);

  return (
    <Center h="100vh" bg="##F6FEFD">
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
          <Image src="/Ozzy.png" alt="Ozzy" width={100} height={30}/>
          <Text as="b" fontSize="3xl" textAlign="center">
            Hi there! Get started by chatting to Ozzy
          </Text>
          <Grid
            templateColumns={["repeat(2, 1fr)", "repeat(4, 1fr)"]}
            gap={[3, 5]}
          >
            {buttonsText.map((text, index) => {
              return (
                <Button
                  key={index}
                  whiteSpace="normal"
                  bg="#F79009"
                  textColor="white"
                  shadow="lg"
                  padding={3}
                  height="auto"
                  onClick={()=>testBtn(text)}
                >
                  {text}
                </Button>
              );
            })}
          </Grid>
          <Box bg="white" border="1px" minW="100%" padding={5} rounded="xl">
            <SimpleGrid spacing={3} >
                {
                    messageArray.map((message, index)=>(
                      <Box key={index} textAlign={index % 2 ? "left" : "right"} bg={index % 2 ? "#23BECC1A" : "#F79009"} rounded="xl" p={3} textColor="black">
                        {message}
                      </Box>
                    ))
                }
            </SimpleGrid>
          </Box>
          <Textarea placeholder="You can speak or type to talk to Ozzy..." bg="white" width="90%" shadow="xl" onChange={handleInput} value={prompt} ref={textareaRef} />
          
            {
              isLoading ? 
              (
                <Spinner color="#F79009"  />
              ) 
              : 
              (
                <HStack>
                <Button bg="#F79009" variant="solid"
                borderRadius="full"
                height={["60px","45px"]}
                width={["60px","45px"]}
                fontSize="23px"
                shadow="xl"
                textColor="white"
                onClick={sendPrompt}
                isLoading={isLoading}
              >
              <i className="ri-send-plane-2-line"></i>
              </Button>
              <Button bg="#F79009" size="md" variant="solid"
                borderRadius="full"
                height={["60px","45px"]}
                width={["60px","45px"]}
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
              )
            }
            
          
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
      prompt: `\n\nHuman: ${transcript} ? Include only scientific answers less than 200 characters and do not include Here is a character response in your answer. \n\nAssistant: `,
      model: "claude-v1",
      max_tokens_to_sample: 300,
      stop_sequences: ["\n\nHuman:"],
      temperature: 0.2,
      top_k: 0.5
    });
    return res as any;
  } catch (error) {
    console.log("completeClaudRequest >> error ", error);
  }
}
