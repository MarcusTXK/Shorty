import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { FormEventHandler, useState } from "react";
import MPasswordInput from "../molecules/MPasswordInput";
import axios from "axios";
import {
  STATUS_CODE_CREATED,
  URL_BACKEND_SERVICE,
  URL_FRONTEND_SERVICE,
} from "../../constants";

interface urlDto {
  originalUrl: string;
  password?: string;
}

interface OShortenUrlCardProps {
  handleShortURl: (shortUrl: string) => void;
}

const OShortenUrlCard = ({
  handleShortURl,
}: OShortenUrlCardProps): JSX.Element => {
  const [url, setUrl] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    let toCreate: urlDto = { originalUrl: url };
    if (password) {
      toCreate.password = password;
    }
    const res = await axios.post(URL_BACKEND_SERVICE, toCreate).catch((e) => {
      console.log(e);
      toast({
        title: "Something went wrong.",
        description: "Please try again later.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    });
    if (res && res.status === STATUS_CODE_CREATED) {
      handleShortURl(`${URL_FRONTEND_SERVICE}/${res.data.shortUrl}`);
    }
  };

  const isPasswordValid = (password: string) =>
    password ? password.length >= 5 : true;

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
          Shorten your URL
        </Heading>
        <form onSubmit={handleSubmit}>
          <FormControl id="email" isRequired>
            <FormLabel>Long URL</FormLabel>
            <Input
              placeholder="https://yourURL.com"
              _placeholder={{ color: "gray.500" }}
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onBlur={() => {
                if (!url.includes("https://") && !url.includes("http://")) {
                  setUrl("https://" + url);
                }
              }}
            />
          </FormControl>
          <FormControl
            id="password"
            isInvalid={!isPasswordValid(password)}
            mb={4}
          >
            <FormLabel>Password</FormLabel>
            <MPasswordInput
              value={password}
              handleChange={setPassword}
              isValid={isPasswordValid(password)}
              errorMessage={"Minimum length of 5 characters"}
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
              isDisabled={!isPasswordValid(password)}
            >
              Shorten URL
            </Button>
          </Stack>
        </form>
      </Stack>
    </>
  );
};

export default OShortenUrlCard;
