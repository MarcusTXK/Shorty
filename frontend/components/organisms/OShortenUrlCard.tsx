import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import MPasswordInput from "../molecules/MPasswordInput";

const OShortenUrlCard = (): JSX.Element => {
  return (
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
      <FormControl id="email" isRequired>
        <FormLabel>URL</FormLabel>
        <Input
          placeholder="https://yourURL.com"
          _placeholder={{ color: "gray.500" }}
          type="url"
        />
      </FormControl>
      <FormControl id="password">
        <FormLabel>Password</FormLabel>
        <MPasswordInput />
      </FormControl>
      <Stack spacing={6}>
        <Button
          colorScheme={"purple"}
          bg={"purple.400"}
          _hover={{
            bg: "purple.500",
          }}
        >
          Create
        </Button>
      </Stack>
    </Stack>
  );
};

export default OShortenUrlCard;
