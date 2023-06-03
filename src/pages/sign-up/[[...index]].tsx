import { Flex } from "@chakra-ui/react";
import { SignUp } from "@clerk/nextjs";
import Lotty from "~/components/Lotty";
import Image from "next/image";

export default function Page() {
  return (
    <Flex
      alignItems="center"
      justifyContent="space-between"
      flexDir="column"
      width="100vw"
      height="100vh"
    >
      <SignUp />
    </Flex>
  );
}
