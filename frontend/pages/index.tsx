import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Navbar from "../components/organisms/ONavbar";
import OFooter from "../components/organisms/OFooter";
import {
  Box,
  Heading,
  Container,
  Text,
  Button,
  Stack,
  Icon,
  useColorModeValue,
  createIcon,
  Flex,
  SimpleGrid,
  Hide,
  Spacer,
  Center,
} from "@chakra-ui/react";
import MWelcomeContainer from "../components/organisms/OWelcomeContainer";
import OShortenSuccessDialog from "../components/organisms/OShortenSuccessDialog";
import { useState } from "react";
import OShortenUrlCard from "../components/organisms/OShortenUrlCard";

const Home: NextPage = () => {
  const [shortUrl, setShortUrl] = useState("");
  return (
    <>
      <Head>
        <title>Shorty | Shorten URLs</title>
        <meta
          name="description"
          content="Secure URL shortener with passwords"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <Flex>
        <Spacer />
        <Center>
          <OShortenUrlCard handleShortURl={setShortUrl} />
        </Center>
        <Hide below="md">
          <MWelcomeContainer />
        </Hide>
        <Spacer />
      </Flex>
      <OShortenSuccessDialog
        shortUrl={shortUrl}
        handleClose={() => setShortUrl("")}
      />
      <footer>
        <OFooter />
      </footer>
    </>
  );
};

export default Home;
