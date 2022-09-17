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

const OWelcomeContainer = () => {
  const perks = [
    "Easy Link Shortening",
    "Full Link history",
    "Customized Shorty URLs",
    "Password secured URLs",
  ];
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
            Welcome to
            <br />
            <Text as={"span"} color={"purple.400"} fontWeight={800}>
              SHORTY
            </Text>
          </Heading>
          <Text color={"gray.500"}>Create a free account to enjoy:</Text>
          <Center mt={0}>
            <MList options={perks} />
          </Center>
          <Stack
            direction={"column"}
            spacing={3}
            align={"center"}
            alignSelf={"center"}
            position={"relative"}
          >
            <Button
              colorScheme={"purple"}
              bg={"purple.400"}
              px={6}
              _hover={{
                bg: "purple.500",
              }}
            >
              Create Free Account
            </Button>
            <Button variant={"link"} colorScheme={"purple"} size={"sm"}>
              Learn more
            </Button>
            <Box>
              <Icon
                as={AArrow}
                color={useColorModeValue("gray.800", "gray.300")}
                w={71}
                position={"absolute"}
                right={-71}
                top={"10px"}
              />
              <Text
                fontSize={"lg"}
                fontFamily={"Caveat"}
                position={"absolute"}
                right={"-125px"}
                top={"-15px"}
                transform={"rotate(10deg)"}
              >
                Start shortening today!
              </Text>
            </Box>
          </Stack>
        </Stack>
      </Container>
    </>
  );
};

export default OWelcomeContainer;
