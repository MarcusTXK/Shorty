import type { NextPage } from "next";
import Head from "next/head";
import Navbar from "../components/organisms/ONavbar";
import {
  Button,
  GridItem,
  Select,
  HStack,
  Flex,
  SimpleGrid,
  useToast,
} from "@chakra-ui/react";
import { Key, useEffect, useState } from "react";
import { NEWS_CATEGORIES, URL_NEWS_SERVICE } from "../constants";
import ONewsWithImage from "../components/organisms/ONewsWithImage";
import axios from "axios";

interface News {
  source: { name: string | null };
  author: string | null;
  title: string | null;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string | null;
  content: string | null;
}

const Home: NextPage = () => {
  const [news, setNews] = useState<News[]>([]);
  const [category, setCategory] = useState("");
  const toast = useToast();

  useEffect(() => {
    if (news.length == 0) {
      getNews();
    }
  }, []);

  const getNews = () => {
    axios
      .get(`${URL_NEWS_SERVICE}${category ? "/" + category : ""}`)
      .then((res) => {
        console.log(res);
        if (res) {
          setNews(res.data);
          toast({
            title: "Fetched articles success",
            description: `Fetched 3 headline articles from ${
              category ? category : "any"
            } category.`,
            status: "success",
            isClosable: true,
          });
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const renderNews = () => {
    return news.map((e: News, i: Key) => {
      return (
        <GridItem key={i} w="100%">
          <ONewsWithImage
            source={e.source.name}
            author={e.author}
            title={e.title}
            description={e.description}
            url={e.url}
            urlToImage={e.urlToImage}
            publishedAt={e.publishedAt}
            content={e.content}
          />
        </GridItem>
      );
    });
  };
  return (
    <>
      <Head>
        <title>Shorty | NewsBites</title>
        <meta
          name="description"
          content="Secure URL shortener with passwords"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar title="SHORTY | NewsBites" />
      <Flex justifyContent="flex-end" mt={5} mr={5}>
        <HStack>
          <Select
            placeholder="Select a Category"
            maxWidth={200}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {NEWS_CATEGORIES.map((e, i) => (
              <option key={i} value={e}>
                {e[0].toUpperCase() + e.substring(1).toLowerCase()}
              </option>
            ))}
          </Select>
          <Button onClick={() => getNews()}>Reroll</Button>
        </HStack>
      </Flex>
      <SimpleGrid columns={[1, 1, 3]} spacing="40px">
        {renderNews()}
      </SimpleGrid>
    </>
  );
};

export default Home;