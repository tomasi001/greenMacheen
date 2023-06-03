import { Box, Button, Flex, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure, ModalCloseButton } from "@chakra-ui/react";

export default function Footer(){
    const { isOpen, onOpen, onClose } = useDisclosure()
    return(
        <Box as="footer" bg="#23BECC1A" py={4}>
          <Flex justify="center" align="center" h="100%">
            <Text onClick={onOpen} as="b" fontSize="xl">Disclaimer</Text>
          </Flex>
        <Modal isOpen={isOpen} onClose={onClose} >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Disclaimer</ModalHeader>
          <ModalCloseButton />
          <ModalBody >
          Experimental Telemedicine Proof of Concept
Welcome to our web application! Please note that this platform is a proof of concept and is intended for experimental purposes only. We strongly advise against using the information or services provided on this platform as a substitute for professional medical advice, diagnosis, or treatment.
The content and features available on this web application are designed to showcase the potential applications of artificial intelligence in telemedicine. While we have made every effort to ensure the accuracy and reliability of the information presented, it should not be considered as a substitute for consultation with qualified healthcare professionals.
It is important to understand that this platform is not intended for real-time or emergency medical situations. In case of a medical emergency, please contact your local emergency services immediately.
By accessing and using this web application, you acknowledge and agree that any reliance you place on the information provided is at your own risk. The developers and creators of this platform, including any affiliated individuals or organisations, shall not be held responsible or liable for any damages or losses resulting from the use of this platform or the information provided herein.
We strongly recommend consulting a healthcare professional for any medical concerns or questions you may have. This platform should not be used to self-diagnose or treat any medical condition.
Please remember that this web application is a work in progress, and as such, its features, functionalities, and information may change or be updated without notice.
Thank you for your understanding and cooperation.
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
    )
}