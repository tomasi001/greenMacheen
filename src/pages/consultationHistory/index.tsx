import {
  Box,
  Button,
  Center,
  Flex,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import type { Chat } from "@prisma/client";
import { useEffect, useState } from "react";
import { api } from "~/utils/api";

const ConsultationHistory = () => {
  const { data } = api.chat.getChatHistory.useQuery();
  const [chatSessions, setChatSessions] = useState<Chat[][]>([[]]);
  const [displayConsultation, setDisplayConsultation] = useState(false);
  const [displayIndex, setDisplayIndex] = useState<number>(0);
  const [displayFlatMessages, setDisplayFlatMessages] = useState<string[]>([]);

  useEffect(() => {
    if (data) {
      const output: Chat[][] = data?.reduce(
        (acc: Chat[][], obj: Chat | undefined) => {
          if (obj) {
            const sessionId = obj.sessionId;
            const groupIndex = acc.findIndex(
              (group) => group[0]?.sessionId === sessionId
            );
            if (groupIndex !== -1) {
              acc[groupIndex]?.push(obj);
            } else {
              acc.push([obj]);
            }
          }
          return acc;
        },
        []
      );
      setChatSessions(output);
    }
  }, [data]);

  useEffect(() => {
    const extractedData = chatSessions[displayIndex]?.flatMap((chat) => [
      chat.message,
      chat.response,
    ]);
    if (extractedData) {
      setDisplayFlatMessages(extractedData);
    }
  }, [chatSessions, displayIndex]);

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
          <Text as="b" fontSize="3xl" textAlign="center">
            Here is your consultation history
          </Text>
          {displayConsultation && (
            <Flex justifyContent="flex-end" width="100%">
              <Button onClick={() => setDisplayConsultation(false)}>
                Close
              </Button>
            </Flex>
          )}

          {displayConsultation ? (
            <Box bg="white" border="1px" minW="75%" padding={5} rounded="xl">
              <SimpleGrid spacing={3}>
                {displayFlatMessages.map((chats, index) => (
                  <Box
                    key={index}
                    bg={index % 2 ? "#23BECC1A" : "#F79009"}
                    rounded="xl"
                    p={3}
                    textColor="black"
                  >
                    {chats}
                  </Box>
                ))}
              </SimpleGrid>
            </Box>
          ) : (
            <Box bg="white" border="1px" minW="75%" padding={5} rounded="xl">
              <SimpleGrid spacing={3}>
                {chatSessions?.map((_chats, index) => (
                  <Button
                    key={index}
                    bg={index % 2 ? "#23BECC1A" : "#F79009"}
                    rounded="xl"
                    p={3}
                    textColor="black"
                    onClick={() => {
                      setDisplayIndex(index);
                      setDisplayConsultation(true);
                    }}
                  >
                    {`Consultation ${index + 1}`}
                  </Button>
                ))}
              </SimpleGrid>
            </Box>
          )}
        </VStack>
      </Box>
    </Center>
  );
};

export default ConsultationHistory;
