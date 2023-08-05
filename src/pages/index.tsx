import { Box, Button, Center, HStack, Text, VStack } from "@chakra-ui/react";
import { type NextPage } from "next";
import Image from "next/image";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <>
      <main>
        <Center h="100vh" bg="##F6FEFD">
          <Box w={["90%", "30%"]} bg="#FFFCF5" shadow="xl" rounded="xl">
            <VStack paddingY={"3vh"} spacing={10}>
              <Image src="/Ozzy.png" alt="Ozzy" width={100} height={30} />
              <Text fontSize="50px">
                <Text fontWeight="bold" as="span">
                  Ozzy{" "}
                </Text>
                <Text as="span" color="orange">
                  /
                </Text>{" "}
                <Text fontWeight="thin" as="span">
                  Assist
                </Text>
              </Text>
              <HStack spacing={5}>
                <Link href="/sign-in">
                  <Button color="white" bg="#F79009" shadow="xl">
                    Sign in
                  </Button>
                </Link>
                <Link href="/sign-up">
                  <Button color="white" bg="#F79009" shadow="xl">
                    Sign Up
                  </Button>
                </Link>
              </HStack>
            </VStack>
          </Box>
        </Center>
      </main>
    </>
  );
};
export default Home;
