import {
  Box,
  Button,
  Center,
  Grid,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import Lotty from "~/components/Lotty";
import VoiceInput from "~/components/VoiceInput";

const buttonsText = [
  "Emergency Help",
  "Am I having a panic attack ?",
  "How do I do CPR",
  "Closest Hospital",
];

export default function ChatPage() {
  const [response, setResponse] = useState("");
  const [transcript, setTranscript] = useState("");

  const textAreaRef = useRef();

  useEffect(() => {
    const textarea = textAreaRef.current;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  }, [response]);

  return (
    <Center h="100vh" bg="##F6FEFD">
      {!response && (
        <Lotty
          bottom="185px"
          right="70px"
          position="absolute"
          transform="scale(0.3)"
        />
      )}

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
          <Text textAlign="center">
            Or select one of the options for immediate assistance.
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
                >
                  {text}
                </Button>
              );
            })}
          </Grid>
          <Textarea
            ref={textAreaRef}
            placeholder="You can speak or type to talk to Ozzy..."
            shadow="lg"
            bg="white"
            value={
              (response && (response as any)?.data?.completion) || transcript
            }
            readOnly={true}
          />
        </VStack>
        <Center>
          <VoiceInput setResponse={setResponse} setTranscript={setTranscript} />
        </Center>
      </Box>
    </Center>
  );
}
