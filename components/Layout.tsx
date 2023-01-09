import Head from "next/head";
import styles from "../styles/Layout.module.scss";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";

type LayoutProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
};

export const Layout: React.FC<LayoutProps> = ({ title, description, children }) => {
  // @ Checking if user is on mobile to apply specific styles
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, []);

  return (
    <div className={`${styles.wrapper} ${isMobile ? styles.mobile : ""}`}>
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
