import styles from "../../../styles/PostModal.module.scss";
import PostForm from "./PostForm";

export const PostModal = ({
  onClose,
  handleSubmit,
}: {
  onClose: () => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}) => {
  return (
    <div className={styles.modal}>
      <div className={styles.content}>
        <button className={styles.close} onClick={onClose}>
          &times;
        </button>
        <div>
          <h3>Create New Post</h3>
          <PostForm handleSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default PostModal;
