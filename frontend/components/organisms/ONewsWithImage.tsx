import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Avatar,
  useColorModeValue,
  Image,
} from "@chakra-ui/react";

interface ONewsWithImageProps {
  source: string | null;
  author: string | null;
  title: string | null;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string | null;
  content: string | null;
}

const ONewsWithImage = ({
  source,
  author = "Unknown",
  title,
  description,
  url,
  urlToImage,
  publishedAt,
  content,
}: ONewsWithImageProps) => {
  const renderDesc = (desc: string | null, cont: string | null) => {
    if (cont == null || desc == null) {
      return cont || desc;
    }
    return desc.length >= 80 ? desc : cont;
  };

  const makeUrlFriendly = (value: string | null) => {
    return value == undefined
      ? ""
      : value
          .replace(/[^a-z0-9_]+/gi, "-")
          .replace(/^-|-$/g, "")
          .toLowerCase();
  };
  return (
    <Center py={6} h={"100%"} px={6}>
      <Box
        maxW={"445px"}
        h={550}
        w={"full"}
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"2xl"}
        rounded={"md"}
        p={6}
        overflow={"hidden"}
        as="a"
        href={url}
      >
        <Box bg={"gray.100"} mt={-6} mx={-6} mb={6} pos={"relative"}>
          <Center>
            <Image
              src={urlToImage || "public\\missing.jpg"}
              alt="News article image"
              height={220}
            />
          </Center>
        </Box>
        <Stack h={220}>
          <Text
            color={"green.500"}
            textTransform={"uppercase"}
            fontWeight={800}
            fontSize={"sm"}
            letterSpacing={1.1}
          >
            {source}
          </Text>
          <Heading
            color={useColorModeValue("gray.700", "white")}
            fontSize={"l"}
            fontFamily={"body"}
          >
            {title}
          </Heading>
          <Text color={"gray.500"}>{renderDesc(description, content)}</Text>
        </Stack>
        <Stack mt={3} direction={"row"} spacing={4}>
          <Avatar
            src={`https://avatars.dicebear.com/api/big-smile/${makeUrlFriendly(
              author
            )}.svg`}
          />
          <Stack direction={"column"} spacing={0} fontSize={"sm"}>
            <Text fontWeight={600}>{author}</Text>
            <Text color={"gray.500"}>{publishedAt}</Text>
          </Stack>
        </Stack>
      </Box>
    </Center>
  );
};

export default ONewsWithImage;
