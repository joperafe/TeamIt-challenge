import styles from "../../../styles/PostComment.module.scss";
import { IComment } from "../../../types/interfaces";

export const PostComment = ({ comment, children }: { comment: IComment; children: React.ReactNode }) => {
  return (
    <div key={comment.id} className={styles.wrapper}>
      <div className={styles.header}>
        <h5>{comment.user}</h5>
        <p>{comment.date}</p>
      </div>
      <div className={styles.content}>
        <p className={styles.description}>{comment.content}</p>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default PostComment;
