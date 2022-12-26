import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.scss";
import Layout from "../components/Layout";
import { API_URL } from "../config";
import { useState } from "react";
import PostCard from "../components/pieces/post/PostCard";
import { IPost, IPostList } from "../types/interfaces";

const inter = Inter({ subsets: ["latin"] });

export const Home: React.FC<{ posts: IPostList }> = ({ posts }) => {
  const [view, setView] = useState("grid");

  console.log(posts);

  return (
    <Layout title="Blog posts" description="Blog area">
      <div className={styles.wrapper}>
        <h2>Blog posts</h2>
        {posts.length ? (
          <div className={styles.listWrapper}>
            <div className={styles.grid}>
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </Layout>
  );
};

export const getServerSideProps = async () => {
  const res = await fetch(`${API_URL}/posts`);
  const posts = await res.json();
  // @ Ordering the array by publish date, newest first
  posts.sort((a: IPost, b: IPost) => new Date(b.publish_date).getTime() - new Date(a.publish_date).getTime());

  return { props: { posts } };
};

export default Home;
