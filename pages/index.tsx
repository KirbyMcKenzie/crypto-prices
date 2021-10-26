import type { NextPage } from "next";
import Head from "next/head";
import { Flex } from "@chakra-ui/react";

import MainView from "../components/MainView";
import CryptoTableContainer from "../containers/CryptoTableContainer";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>{"Caleb and Brown - Coding Challenge"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MainView>
        <Flex direction="column" width="100%" marginTop={4}>
          <CryptoTableContainer />
        </Flex>
      </MainView>
    </div>
  );
};

export default Home;
