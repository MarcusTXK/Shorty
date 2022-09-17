import {
  Modal,
  ModalOverlay,
  ModalContent,
  Button,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  Text,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import MCopyInput from "../molecules/MCopyInput";

interface OShortenSuccessDialogProps {
  shortUrl: string;
  handleClose: () => void;
}

const OShortenSuccessDialog = ({
  shortUrl,
  handleClose,
}: OShortenSuccessDialogProps) => {
  return (
    <>
      <Modal isOpen={shortUrl !== ""} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent minH={220}>
          <ModalHeader>Shorten URL Success!</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text mb={2}>Copy your shortened URL here:</Text>
            <MCopyInput value={shortUrl} />
          </ModalBody>
          <ModalFooter mt={5}>
            <Button
              colorScheme={"purple"}
              bg={"purple.400"}
              _hover={{
                bg: "purple.500",
              }}
              mr={3}
              onClick={handleClose}
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default OShortenSuccessDialog;
