import { Button, Link, VStack } from "@chakra-ui/react";
import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <VStack pt="5vh" spacing={6}>
      <SignIn />
      <Link href="/">
        <Button bg="#F79009" textColor="white">
          Back
        </Button>
      </Link>
    </VStack>
  );
}
