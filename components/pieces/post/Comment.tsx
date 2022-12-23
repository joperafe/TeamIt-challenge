import { usePost } from "../../../context/PostContext";
import CommentsList from "./CommentsList";
import styles from "../../../styles/Comment.module.scss";

export const Comment = (comment) => {
  const { getCommentReplies } = usePost();
  const replies = getCommentReplies(comment.id);
  console.log("what comment ?? ", comment, replies);

  return (
    <div key={comment.id} className={styles.wrapper}>
      <div className={styles.header}>
        <h5>{comment.user}</h5>
        <p>{comment.date}</p>
      </div>
      <div className={styles.content}>
        <p className={styles.description}>{comment.content}</p>
      </div>
      {replies?.length ? (
        <>
          <div className={styles.nestedComment}>
            <CommentsList comments={replies} />
          </div>
        </>
      ) : null}
      {/* <div className={styles.buttonWrapper}>
        <Link href={`/comment/${comment.id}`}>
          <div className={styles.button}>Read more</div>
        </Link>
      </div> */}
    </div>
  );
};

export default Comment;
