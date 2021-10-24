import { Heading } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";


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
        <CryptoTableContainer />
      </MainView>
    </div>
  );
};

export default Home;
