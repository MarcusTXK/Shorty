/* eslint-disable @next/next/no-page-custom-font */
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
import OCard from "../components/organisms/OShortenUrlCard";
import MWelcomeContainer from "../components/organisms/OWelcomeContainer";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Shorty</title>
        <meta
          name="description"
          content="Secure URL shortener with passwords"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Navbar />
        <Flex>
          <Spacer />
          <Center>
            <OCard />
          </Center>
          <Hide below="md">
            <MWelcomeContainer />
          </Hide>
          <Spacer />
        </Flex>
      </main>
      <footer>
        <OFooter />
      </footer>
    </>
  );
};

export default Home;
