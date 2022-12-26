import Link from "next/link";
import styles from "../../../styles/PostCard.module.scss";
import { IPost } from "../../../types/interfaces";

export const PostCard = ({ post }: { post: IPost }) => {
  return (
    <div key={post.id} className={styles.wrapper}>
      <div className={styles.header}>
        <h3>{post.title}</h3>
        <p>{post.publish_date}</p>
      </div>
      <div className={styles.content}>
        <p className={styles.description}>{post.description}</p>
        <h5>{post.author}</h5>
      </div>

      <div className={styles.buttonWrapper}>
        <Link href={`/post/${post.id}`}>
          <div className={styles.button}>Read more</div>
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
