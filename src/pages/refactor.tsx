import React from "react";
import { NextPage } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";

const Environment = dynamic(import("@spacesvr/core/environments/Environment"), {
  ssr: false,
});
const Refactor = dynamic(import("scenes/Refactor"), { ssr: false });

const RefactorPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Spaces Gallery</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@1,300&family=Space+Mono&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Environment scene={Refactor} />
    </>
  );
};

export default RefactorPage;
