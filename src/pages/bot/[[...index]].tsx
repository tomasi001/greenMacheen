"use client";
import { Button, Flex } from "@chakra-ui/react";
import React from "react";
import VoiceInput from "~/components/VoiceInput";
import "regenerator-runtime/runtime";

const page = () => {
  return (
    <Flex alignItems="center" flexDir="column" width="100vw" height="100vh" justifyContent="center">
      <Flex justifyContent="space-between">
        <VoiceInput />
      </Flex>
    </Flex>
  );
};

export default page;
