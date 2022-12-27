import styles from "../styles/Header.module.scss";
import React from "react";
import Link from "next/link";

export const Header = () => {
  return (
    <header className={styles.header}>
      <>
        <Link href="/">Blog</Link>
      </>
    </header>
  );
};

export default Header;
