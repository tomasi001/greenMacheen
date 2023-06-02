import styles from "./index.module.css";
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { api } from "~/utils/api";
import { Spinner } from "@chakra-ui/react";
import VoiceInput from "~/compponents/voice-input";
const Home: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.container}>
          <p>Chakra ui works</p>
          <Spinner />


          <VoiceInput/>
        </div>
      </main>
    </>
  );
};

export default Home;
