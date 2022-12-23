import Head from "next/head";
import { Inter } from "@next/font/google";
import styles from "../styles/Layout.module.scss";
import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const inter = Inter({ subsets: ["latin"] });

type LayoutProps = {
  title: string;
  description: string;
  children: JSX.Element;
};

export const Layout: React.FC<LayoutProps> = ({ title, description, children }) => {
  return (
    <div className={styles.wrapper}>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content="blog" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className={styles.container}>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
