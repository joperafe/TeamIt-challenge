import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.scss";
import Layout from "../components/Layout";
import { API_URL } from "../config";
import { useState } from "react";
import PostCard from "../components/pieces/post/PostCard";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ posts }) {
  console.log("props ?? ", posts);

  const [view, setView] = useState("grid");

  return (
    <Layout title="Blog posts" description="Blog area">
      <div>
        <div>Some text?</div>
        {posts.length ? (
          <div className={styles.view}>
            <ul className={styles.listWrapper}>
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </Layout>
  );
}

export const getServerSideProps = async () => {
  const res = await fetch(`${API_URL}/posts`);

  const posts = await res.json();
  console.log("posts :: ", posts);

  return { props: { posts } };
};
