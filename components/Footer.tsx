import styles from "../styles/Footer.module.scss";
import React from "react";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>
        <b>Copyright &copy; TeamIt 2022</b>
      </p>
    </footer>
  );
};

export default Footer;
