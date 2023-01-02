import Head from "next/head";
import styles from "../styles/Layout.module.scss";
import React from "react";
import Header from "./Header";
import Footer from "./Footer";

type LayoutProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
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
      <main className={styles.container}>
        <section className={styles.mainSection}>{children}</section>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
