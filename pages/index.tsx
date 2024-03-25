import Head from "next/head";
import Image from "next/image";
import dynamic from "next/dynamic";

import { useEffect } from "react";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"] });

export default function Home() {
  useEffect(() => {
  }, []);

  return (
    <>
      <Head>
        <title>
          Template
        </title>
      </Head>
      <main
        className={`flex items-center justify-center ${montserrat.className}`}
      >
        Hello
       
      </main>
    </>
  );
}
