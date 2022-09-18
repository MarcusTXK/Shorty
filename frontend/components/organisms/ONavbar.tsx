import { ReactNode } from "react";
import {
  Box,
  Flex,
  Avatar,
  Link,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  Text,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isLogin = false;
  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Text fontWeight={800} as="a" href="/">
            SHORTY
          </Text>

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>
              {isLogin ? (
                <Button
                  display={"inline-flex"}
                  fontSize={"sm"}
                  fontWeight={600}
                  colorScheme={"purple"}
                  bg={"purple.400"}
                  _hover={{
                    bg: "purple.300",
                  }}
                >
                  Logout
                </Button>
              ) : (
                <Button
                  display={"inline-flex"}
                  fontSize={"sm"}
                  fontWeight={600}
                  colorScheme={"purple"}
                  bg={"purple.400"}
                  _hover={{
                    bg: "purple.300",
                  }}
                >
                  Login
                </Button>
              )}
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};

export default Navbar;
