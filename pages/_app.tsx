import "@/styles/globals.css";

import type { AppProps } from "next/app";

import { useEffect } from "react";

export default function NexSite({ Component, pageProps }: AppProps) {
  useEffect(() => {
  }, []);

  return <Component {...pageProps} />;
}
