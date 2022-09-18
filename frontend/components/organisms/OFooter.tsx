import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
} from "@chakra-ui/react";
import { FaGithub } from "react-icons/fa";
import ASocialButton from "../atoms/ASocialButton";

const OFooter = () => {
  return (
    <Box
      bg={useColorModeValue("gray.100", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
    >
      <Container
        as={Stack}
        maxW={"6xl"}
        py={2}
        direction={{ base: "column", md: "row" }}
        spacing={4}
        justify={{ base: "center", md: "space-between" }}
        align={{ base: "center", md: "center" }}
      >
        <Text>Made with Next.js and Chakra UI</Text>
        <Stack direction={"row"} spacing={6}>
          <ASocialButton
            label={"Github"}
            href={"https://github.com/MarcusTXK/url-shortener"}
          >
            <FaGithub />
          </ASocialButton>
        </Stack>
      </Container>
    </Box>
  );
};

export default OFooter;
