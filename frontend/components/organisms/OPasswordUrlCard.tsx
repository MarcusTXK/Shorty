import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Stack,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { FormEventHandler, useState } from "react";
import MPasswordInput from "../molecules/MPasswordInput";
import axios from "axios";
import { STATUS_CODE_SUCCESS, URL_BACKEND_SERVICE } from "../../constants";

interface OPasswordUrlCardProps {
  shortUrl: string;
}

const OPasswordUrlCard = ({ shortUrl }: OPasswordUrlCardProps): JSX.Element => {
  const [password, setPassword] = useState("");
  const toast = useToast();
  const toastId = "invalid-password";
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const res = await axios
      .post(`${URL_BACKEND_SERVICE}/${shortUrl}`, { password: password })
      .catch((e) => {
        console.log(e);
      });
    if (
      res &&
      res.status === STATUS_CODE_SUCCESS &&
      res.data &&
      res.data.originalUrl
    ) {
      window.location.assign(res.data.originalUrl);
    } else if (!toast.isActive(toastId)) {
      toast({
        id: toastId,
        title: "Invalid Password.",
        description: "Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };
  return (
    <>
      <Stack
        spacing={4}
        w={"full"}
        maxW={"md"}
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={12}
      >
        <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
          Password protected URL
        </Heading>
        <form onSubmit={handleSubmit}>
          <FormControl id="password" mb={4}>
            <FormLabel>Password</FormLabel>
            <MPasswordInput
              value={password}
              placeholder={"Enter Password"}
              handleChange={setPassword}
            />
          </FormControl>
          <Stack spacing={6}>
            <Button
              colorScheme={"purple"}
              bg={"purple.400"}
              _hover={{
                bg: "purple.500",
              }}
              type="submit"
            >
              Submit
            </Button>
          </Stack>
        </form>
      </Stack>
    </>
  );
};

export default OPasswordUrlCard;
