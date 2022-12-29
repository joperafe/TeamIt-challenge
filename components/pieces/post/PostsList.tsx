import { useCallback } from "react";
import Image from "next/image";
import styles from "../../../styles/PostsList.module.scss";
import { useState } from "react";
import listView from "../../../public/listView.png";
import gridView from "../../../public/gridView.png";
import { IPost } from "../../../types/interfaces";
import PostCard from "./PostCard";

export const PostsList: React.FC<{ posts: IPost[] }> = ({ posts }) => {
  // @ View will define the type of posts display
  const [view, setView] = useState({ src: listView, type: "list" });

  // @ Function to handle the change of posts display from list or grid
  const handleChangeView = useCallback(() => {
    setView(view.type === "list" ? { src: gridView, type: "grid" } : { src: listView, type: "list" });
  }, [view.type]);

  return (
    <div className={styles.contentWrapper}>
      <div className={styles.actionsBtn}>
        {posts.length ? (
          <div onClick={handleChangeView} className={styles.iconBtn} title="Change View">
            <Image src={view.src} alt="icon" width={30} height={30} />
          </div>
        ) : null}
      </div>
      {posts.length ? (
        <div className={view.type === "list" ? styles.grid : styles.list}>
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className={styles.emptyList}>
          <h3>No posts to be shown</h3>
        </div>
      )}
    </div>
  );
};

export default PostsList;
