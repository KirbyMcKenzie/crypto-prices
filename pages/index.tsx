import type { NextPage } from "next";
import Head from "next/head";

import { Box, Divider, Heading, Flex, Text } from "@chakra-ui/react";

import MainView from "../components/MainView";
import CryptoTableContainer from "../containers/CryptoTableContainer";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Caleb and Brown - Coding Challenge</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MainView>
        <Flex direction="column" width="100%" margin={10}>
          <Heading
            as="h1"
            fontSize={{ base: "xx-large", md: "xxx-large" }}
            fontWeight="extrabold"
            marginBottom={2}
            marginX={{ base: 2, md: 0 }}
          >
            {"Crypto by Market Cap"}
          </Heading>
          <Text
            fontWeight="bold"
            fontSize="large"
            color="gray.500"
            marginX={{ base: 2, md: 0 }}
          >
            {"In the past 24 hours"}
          </Text>

          <Box marginY={6}>
            <CryptoTableContainer />
          </Box>
        </Flex>
      </MainView>
    </div>
  );
};

export default Home;
