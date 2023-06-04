import {
  Box,
  Button,
  Center,
  Grid,
  HStack,
  SimpleGrid,
  Spinner,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { usePostHog } from "posthog-js/react";
import { type ChangeEvent, useEffect, useRef, useState } from "react";

import Image from "next/image";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { ClaudeService } from "~/@core/services/claude/cloude-service";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/nextjs";
import { api } from "~/utils/api";

const buttonsText = [
  "I am having a panic attack how do I calm myself down ?",
  "Emergency Help",
  "Teach me how to do CPR",
  "How to correctly use an epipen",
];

export default function ChatPage() {
  const posthog = usePostHog();
  const [response, setResponse] = useState("");
  const [prompt, setPrompt] = useState("");
  const [promptArray, setPromptArray] = useState<string[]>([]);
  const [responseArray, setResponseArray] = useState<string[]>([]);
  const [sessionId] = useState(uuidv4());
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { user } = useUser();

  const { mutate } = api.chat.create.useMutation();

  useEffect(() => {
    if (user) {
      posthog?.identify(user?.primaryEmailAddress?.emailAddress || "", {
        email: user?.primaryEmailAddress?.emailAddress,
      });
    }
  }, [posthog, user]);

  useEffect(() => {
    if (prompt.length > 0 && response.length > 0) {
      mutate({ message: prompt, response, userId: user?.id || "", sessionId });
      setPrompt("");
      setResponse("");
    }
  }, [prompt, response, mutate, user?.id, sessionId]);

  let messageArray = promptArray.flatMap((item, index) => [
    item,
    responseArray[index],
  ]);

  const [isLoading, setIsLoading] = useState(false);
  const { transcript, listening } = useSpeechRecognition();

  const handleInput = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(event.target.value);
  };

  useEffect(() => {
    const textArea = textareaRef.current;
    if (textArea) {
      textArea.style.height = "auto";
      textArea.style.height = `${textArea.scrollHeight}px`;
    }
  }, [prompt]);

  const sendPrompt = async () => {
    setIsLoading(true);
    setPromptArray([...promptArray, prompt]);
    const result = await completeClaudRequest(prompt);
    const result_string =
      result?.replace("911", "10177").replace("Claude", "Ozzy") || "";
    setResponse(result_string);
    setResponseArray([...responseArray, result_string]);
    setResponseArray([...responseArray, result_string]);
    messageArray = promptArray.flatMap((item, index) => [
      item,
      responseArray[index],
    ]);
    setIsLoading(false);
  };

  const testBtn = async (text: string) => {
    setIsLoading(true);
    if (text == "Emergency Help") {
      text =
        "Closet hospital near me in Cape Town South Africa with phone numbers";
    }
    setPrompt(text);
    setPromptArray([...promptArray, text]);
    const result = await completeClaudRequest(text);
    const result_string =
      result?.replace("911", "10177").replace("Claude", "Ozzy") || "";
    setResponse(result_string);
    setResponseArray([...responseArray, result_string]);
    messageArray = promptArray.flatMap((item, index) => [
      item,
      responseArray[index],
    ]);
    setIsLoading(false);
  };

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
          <Image src="/Ozzy.png" alt="Ozzy" width={100} height={30} />
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
                  onClick={() => {
                    testBtn(text).catch((error) => {
                      console.log("Error with preset prompt button", error);
                    });
                  }}
                >
                  {text}
                </Button>
              );
            })}
          </Grid>
          <Box bg="white" border="1px" minW="100%" padding={5} rounded="xl">
            <SimpleGrid spacing={3}>
              {messageArray.map((message, index) => (
                <Box
                  key={index}
                  textAlign={index % 2 ? "left" : "right"}
                  bg={index % 2 ? "#23BECC1A" : "#F79009"}
                  rounded="xl"
                  p={3}
                  textColor="black"
                >
                  {message}
                </Box>
              ))}
            </SimpleGrid>
          </Box>
          <Textarea
            placeholder="You can speak or type to talk to Ozzy..."
            bg="white"
            width="90%"
            shadow="xl"
            onChange={handleInput}
            value={prompt}
            ref={textareaRef}
          />

          {isLoading ? (
            <Spinner color="#F79009" />
          ) : (
            <HStack>
              <Button
                bg="#F79009"
                variant="solid"
                borderRadius="full"
                height={["60px", "45px"]}
                width={["60px", "45px"]}
                fontSize="23px"
                shadow="xl"
                textColor="white"
                onClick={() => {
                  sendPrompt().catch((error) => {
                    console.log("Error sending prompt", error);
                  });
                }}
                isLoading={isLoading}
              >
                <i className="ri-send-plane-2-line"></i>
              </Button>
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
            </HStack>
          )}
        </VStack>
        <Center></Center>
      </Box>
    </Center>
  );
}

async function completeClaudRequest(transcript: string) {
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
    return res.completion;
  } catch (error) {
    console.log("completeClaudRequest >> error ", error);
  }
}
