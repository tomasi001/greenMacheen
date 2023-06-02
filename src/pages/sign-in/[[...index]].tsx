import { Flex } from "@chakra-ui/react";
import { SignIn } from "@clerk/nextjs";
import Lotty from "~/components/Lotty";

export default function Page() {
  return (
    <Flex
      alignItems="center"
      justifyContent="space-between"
      flexDir="column"
      width="100vw"
      height="100vh"
    >
      <Flex pt="30vh">
        <Lotty
          bottom="185px"
          right="70px"
          position="absolute"
          transform="scale(0.3)"
        />
        <Flex>
          <SignIn />
        </Flex>
      </Flex>
    </Flex>
  );
}
