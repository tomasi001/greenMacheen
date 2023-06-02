import {
  Box,
  Button,
  Center,
  Grid,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";

export default function chatPage() {
  return (
    <Center h="100vh">

      <Box
        w="90%"
        bg="##FFFCF5"
        shadow="xl"
        border="1px"
        borderColor="black"
        rounded="xl"
        p={[4, 50]}
        paddingBottom="5vh"
        position="relative"
      >
        <VStack alignContent="center" spacing={5}>
          <Text as="b" fontSize="3xl">
            Hi there!
          </Text>
          <Text textAlign="center">
            Or select one of the options for immediate assistance.
          </Text>
          <Grid
            templateColumns={["repeat(2, 1fr)", "repeat(4, 1fr)"]}
            gap={[3, 5]}
          >
            <Button
              whiteSpace="normal"
              bg="#F79009"
              textColor="white"
              shadow="lg"
              padding={6}
            >
              Emergency Help
            </Button>
            <Button
              whiteSpace="normal"
              bg="#F79009"
              textColor="white"
              shadow="lg"
              padding={6}
            >
              Am I having a panic attack?
            </Button>
            <Button
              whiteSpace="normal"
              bg="#F79009"
              textColor="white"
              shadow="lg"
              padding={6}
            >
              How do I do CPR
            </Button>
            <Button
              whiteSpace="normal"
              bg="#F79009"
              textColor="white"
              shadow="lg"
              padding={6}
            >
              Closet Hospital
            </Button>
          </Grid>
          <Input
            placeholder="You can speak or type to talk to Ozzy..."
            shadow="lg"
            borderColor="black"
          />
          
        </VStack>
        <Center>
            <Button
                bg="#F79009"
                size="lg"
                variant="solid"
                borderRadius="full"
                position="absolute"
                zIndex="1"
                height="60px"
                width="60px"
                fontSize="28px"
                marginTop={["10vh", "12vh"]}
                shadow="xl"
            >
                <i className="ri-mic-line"></i>
            </Button>
        </Center>
        
      </Box>
      
      
    </Center>
  );
}
