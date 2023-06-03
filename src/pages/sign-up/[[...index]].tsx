import { Button, Link, VStack } from "@chakra-ui/react";
import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <VStack pt="5vh" spacing={6} my="auto">
      <SignUp />
      <Link href="/">
        <Button bg="#F79009" textColor="white">
          Back
        </Button>
      </Link>
    </VStack>
  );
}
