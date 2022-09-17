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
  Spinner,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import axios from "axios";
import redirect from "nextjs-redirect";

import { useEffect, useState } from "react";
import { STATUS_CODE_SUCCESS, URL_BACKEND_SERVICE } from "../constants";
import OPasswordUrlCard from "../components/organisms/OPasswordUrlCard";
import OShortUrlNotFoundContainer from "../components/organisms/OShortUrlNotFoundContainer";

const Home: NextPage = () => {
  const router = useRouter();
  const { shortUrl } = router.query;
  const [isLoading, setLoading] = useState(true);
  const [isValid, setValid] = useState(false);

  useEffect(() => {
    if (shortUrl) {
      axios
        .get(`${URL_BACKEND_SERVICE}/${shortUrl}`)
        .then((res) => {
          if (res && res.status === STATUS_CODE_SUCCESS && res.data) {
            setValid(true);
            if (!res.data.hasPassword && res.data.originalUrl) {
              window.location.assign(res.data.originalUrl);
            }
          }
          setLoading(false);
        })
        .catch((e) => {
          console.log(e);
          setLoading(false);
        });
    }
  }, [shortUrl]);
  const renderPage = () => {
    if (isLoading) {
      return (
        <Center h={"80vh"}>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="purple.500"
            size="xl"
          />
        </Center>
      );
    } else if (!isValid) {
      return <OShortUrlNotFoundContainer shortUrl={shortUrl as string} />;
    } else {
      return (
        <Center>
          <OPasswordUrlCard shortUrl={shortUrl as string} />
        </Center>
      );
    }
  };
  return (
    <>
      <Head>
        <title>Shorty | Redirecting</title>
        <meta
          name="description"
          content="Secure URL shortener with passwords"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      {renderPage()}
      <footer>
        <OFooter />
      </footer>
    </>
  );
};

export default Home;
