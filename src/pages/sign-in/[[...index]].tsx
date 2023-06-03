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
      <SignIn />
    </Flex>
  );
}
