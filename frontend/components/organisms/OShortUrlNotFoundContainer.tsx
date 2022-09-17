/* eslint-disable @next/next/no-page-custom-font */
import {
  Container,
  Stack,
  Heading,
  Button,
  Icon,
  useColorModeValue,
  Box,
  Text,
  Center,
} from "@chakra-ui/react";
import AArrow from "../atoms/AArrow";
import MList from "../molecules/MList";

interface OShortUrlNotFoundContainerProps {
  shortUrl: string;
}

const OShortUrlNotFoundContainer = ({
  shortUrl,
}: OShortUrlNotFoundContainerProps) => {
  return (
    <>
      <Container>
        <Stack
          as={Box}
          textAlign={"center"}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 10 }}
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
            lineHeight={"110%"}
          >
            Invalid URL
            <br />
            <Text as={"span"} color={"purple.400"} fontWeight={800}>
              {shortUrl}
            </Text>
          </Heading>
          <Text color={"gray.500"}>
            Please check that the URL entered is correct.
          </Text>
          <Button
            colorScheme={"purple"}
            bg={"purple.400"}
            px={6}
            _hover={{
              bg: "purple.500",
            }}
            as="a"
            href="/"
          >
            Home
          </Button>
        </Stack>
      </Container>
    </>
  );
};

export default OShortUrlNotFoundContainer;
