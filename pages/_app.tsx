import "../styles/globals.css";
import type { AppProps } from "next/app";

const CodingChallenge = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

export default CodingChallenge;
