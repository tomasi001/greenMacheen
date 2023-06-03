import { Flex, Button, VStack, Link } from "@chakra-ui/react";
import { SignIn } from "@clerk/nextjs";
import Lotty from "~/components/Lotty";

export default function Page() {
  return (
    <VStack spacing={6}>
      <SignIn />
      <Link href="/">
        <Button bg="#F79009" textColor="white">Back</Button>
      </Link>
    </VStack>
      
  );
}
