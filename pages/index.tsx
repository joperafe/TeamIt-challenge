import { useCallback } from "react";
import Image from "next/image";
import styles from "../styles/Home.module.scss";
import Layout from "../components/Layout";
import { API_URL } from "../config";
import { useState } from "react";
import PostCard from "../components/pieces/post/PostCard";
import { IPost } from "../types/interfaces";
import listView from "../public/listView.png";
import gridView from "../public/gridView.png";
import { GetServerSideProps } from "next";

export const Home: React.FC<{ posts: IPost[] }> = ({ posts }) => {
  // @ View will define the type of posts display
  const [view, setView] = useState({ src: listView, type: "list" });

  // @ Function to handle the change of posts display from list or grid
  const handleChangeView = useCallback(() => {
    setView(view.type === "list" ? { src: gridView, type: "grid" } : { src: listView, type: "list" });
  }, [view.type]);

  return (
    <Layout title="Blog Posts" description="Blog Posts">
      <div className={styles.wrapper}>
        <h2>Blog Posts</h2>
        {posts.length ? (
          <div className={styles.contentWrapper}>
            <div className={styles.icon}>
              <div onClick={handleChangeView} className={styles.iconBtn}>
                <Image src={view.src} alt="icon" width={30} height={30} />
              </div>
            </div>
            <div className={view.type === "list" ? styles.grid : styles.list}>
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        ) : (
          <div className={styles.emptyList}>
            <h3>No posts to be shown</h3>
          </div>
        )}
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<{ posts: IPost[] }> = async () => {
  const res = await fetch(`${API_URL}/posts?_sort=publish_date&_order=desc`);
  const posts = await res.json();

  return { props: { posts } };
};

export default Home;
