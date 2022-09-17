import {
  Button,
  FormErrorMessage,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface MPasswordInputProps {
  value: string;
  handleChange: (password: string) => void;
  isValid?: boolean;
  placeholder?: string;
  errorMessage?: string;
}

const MPasswordInput = ({
  value,
  handleChange,
  placeholder = "Optional password",
  isValid = true,
  errorMessage,
}: MPasswordInputProps) => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <>
      <InputGroup size="md" mb={-2}>
        <Input
          pr="4.5rem"
          type={show ? "text" : "password"}
          placeholder={placeholder}
          _placeholder={{ color: "gray.500" }}
          onChange={(e) => handleChange(e.target.value)}
          value={value}
        />

        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={handleClick}>
            {show ? <Icon as={FaEyeSlash} /> : <Icon as={FaEye} />}
          </Button>
        </InputRightElement>
      </InputGroup>
      {!isValid && <FormErrorMessage>{errorMessage}</FormErrorMessage>}
    </>
  );
};

export default MPasswordInput;
