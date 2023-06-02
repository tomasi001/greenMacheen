import { Flex } from "@chakra-ui/react";
import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <Flex alignItems="center" flexDir="column" width="100vw" height="100vh">
      <Flex justifyContent="space-between" pt="10vh">
        <SignIn />
      </Flex>
    </Flex>
  );
}
