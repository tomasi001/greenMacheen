import { Box, Center, Text, VStack } from "@chakra-ui/react";

export default function chatPage(){
    return(
        <Center h="100vh">
            <Box>
                <VStack>
                    <Text as="b" fontSize='3xl'>Hi There</Text>
                </VStack>
            </Box>
        </Center>
    )
}