import React, { useEffect, useState } from "react";
import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { PostProvider } from "../context/PostContext";
import { useRouter } from "next/router";
import Loader from "../components/Loader";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [pageLoading, setPageLoading] = useState(false);
  useEffect(() => {
    const handleStart = () => {
      setPageLoading(true);
    };
    const handleComplete = () => {
      setPageLoading(false);
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);
  }, [router]);

  return (
    <PostProvider>
      {pageLoading && <Loader />}
      <Component {...pageProps} />
    </PostProvider>
  );
}
