import { UserButton } from "@clerk/nextjs";
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import styles from "./index.module.css";

import { Spinner } from "@chakra-ui/react";
const Home: NextPage = () => {
  return (
    <>
      <UserButton afterSignOutUrl="/" />

      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.container}></div>
        <div className={styles.container}>
          <h1 className={styles.title}>
            <span className={styles.pinkSpan}>Green Macheen</span>
          </h1>
          <div className={styles.cardRow}>
            <Link className={styles.card} href="/sign-up" target="_blank">
              <h3 className={styles.cardTitle}> Sign Up</h3>
            </Link>
            <Link className={styles.card} href="/sign-up" target="_blank">
              <h3 className={styles.cardTitle}>Sign In</h3>
            </Link>
          </div>
          <p>Chakra ui works</p>
          <Spinner />
        </div>
      </main>
    </>
  );
};

export default Home;
