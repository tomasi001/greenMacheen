import { VStack, Link, Button } from "@chakra-ui/react";
import { SignUp } from "@clerk/nextjs";
import Lotty from "~/components/Lotty";
import Image from "next/image";

export default function Page() {
  return (
    <VStack spacing={6} my="auto">
      <SignUp />
      <Link href="/">
        <Button bg="#F79009" textColor="white">Back</Button>
      </Link>
    </VStack>
  );
}
