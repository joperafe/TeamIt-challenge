import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { PostProvider } from "../context/PostContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <PostProvider>
      <Component {...pageProps} />
    </PostProvider>
  );
}
