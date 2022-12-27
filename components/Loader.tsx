import React from "react";
import styles from "../styles/Loader.module.scss";

export default function LoadingSpinner() {
  return (
    <div className={styles.container}>
      <div className={styles.progressContainer}>
        <h3>Loading...</h3>
        <div className={styles.progress}>
          <div className={styles.color}></div>
        </div>
      </div>
    </div>
  );
}
