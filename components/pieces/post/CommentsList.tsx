import { Comment } from "./Comment";
import styles from "../../../styles/CommentsList.module.scss";
import { usePost } from "../../../context/PostContext";

export const CommentsList = ({ comments }) => {
  return comments.map((comment) => (
    <div key={comment.id} className={styles.commentsList}>
      <Comment {...comment} />
    </div>
  ));
};

export default CommentsList;
