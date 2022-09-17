import {
  Button,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  useClipboard,
  useToast,
} from "@chakra-ui/react";
import { URL_FRONTEND_SERVICE } from "../../constants";

interface MCopyInputProps {
  value: string;
}

const MCopyInput = ({ value }: MCopyInputProps) => {
  const { hasCopied, onCopy } = useClipboard(value);
  const toast = useToast();
  return (
    <>
      <InputGroup size="md" mb={5}>
        <Input value={value} isReadOnly placeholder="Short Url" />
        <InputRightElement width="4.5rem">
          <Button
            h="1.75rem"
            size="sm"
            onClick={() => {
              onCopy();
              toast({
                title: "Successfully Copied",
                description: "Thank you for using Shorty.",
                status: "info",
                duration: 2000,
                isClosable: true,
              });
            }}
          >
            {hasCopied ? "Copied" : "Copy"}
          </Button>
        </InputRightElement>
      </InputGroup>
    </>
  );
};

export default MCopyInput;
