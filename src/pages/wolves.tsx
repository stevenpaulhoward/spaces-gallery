import React from "react";
import { NextPage } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";

const Environment = dynamic(
  import("@spacesvr/core/environments/PlayerEnvironment"),
  {
    ssr: false,
  }
);
const Wolves = dynamic(import("scenes/Wolves"), { ssr: false });

const WolvesPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Spaces Gallery</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@1,300&family=Space+Mono&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Environment scene={Wolves} title="Wolves" />
    </>
  );
};

export default WolvesPage;
