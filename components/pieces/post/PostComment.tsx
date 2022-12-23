import Link from "next/link";
import styles from "../../../styles/PostComment.module.scss";

export const PostComment = ({ comment }) => {
  return (
    <div key={comment.id} className={styles.wrapper}>
      <div className={styles.header}>
        <h4>{comment.user}</h4>
        <p>{comment.date}</p>
      </div>
      <div className={styles.content}>
        <p className={styles.description}>{comment.content}</p>
      </div>

      {/* <div className={styles.buttonWrapper}>
        <Link href={`/comment/${comment.id}`}>
          <div className={styles.button}>Read more</div>
        </Link>
      </div> */}
    </div>
  );
};

export default PostComment;
