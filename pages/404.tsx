import Layout from "../components/Layout";
import styles from "../styles/404.module.scss";

export default function Home() {
  return (
    <Layout title="Page Not Found">
      <div className={styles.error}>
        <h1>404</h1>
        <h2>Page not found</h2>
      </div>
    </Layout>
  );
}
