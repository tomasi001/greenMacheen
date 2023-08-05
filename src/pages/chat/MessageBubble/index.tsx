import { Avatar, Box, Flex, Spinner, Text } from "@chakra-ui/react";

interface MessageBubbleProps {
  sender: "Ozzy" | "User";
  message: string;
  avatarPhoto: string;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({
  sender,
  message,
  avatarPhoto,
}) => {

  return (
    <Flex justifyContent={sender === "Ozzy" ? "start" : "end"} gap={3}>
      {sender === "Ozzy" && (
        <Avatar
          src={avatarPhoto}
          name="Ozzy"
          size="sm"
          placeSelf="center"
          shadow="md"
        />
      )}

      <Box
        bg={sender === "Ozzy" ? "#23BECC1A" : "#F79009"}
        rounded="xl"
        p={3}
        textColor="black"
        maxW="70%"
        shadow="md"
      >
        {
            message !== undefined ? (
                message
            ) : (
                <Spinner />
            )
        }
      </Box>
      {sender === "User" && (
        <Avatar
          src={avatarPhoto}
          name="User"
          size="sm"
          placeSelf="center"
          shadow="md"
        />
      )}
    </Flex>
  );
};

export default MessageBubble;
