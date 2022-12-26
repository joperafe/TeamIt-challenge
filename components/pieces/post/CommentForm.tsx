import { useState } from "react";
import styles from "../../../styles/CommentForm.module.scss";

export const CommentForm = ({
  loading,
  error = "",
  initialValue = "",
  onSubmit,
}: {
  loading: boolean;
  error?: string;
  initialValue?: string;
  onSubmit: Function;
}) => {
  const [comment, setComment] = useState(initialValue);
  const [formError, setFormError] = useState("");
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    comment
      ? onSubmit(comment).then(() => {
          setComment("");
          formError && setFormError("");
        })
      : setFormError("Comment is required");
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.wrapper}>
        <textarea
          className={styles.textArea}
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
            formError && setFormError("");
          }}
        />
        <button className={styles.submitBtn} disabled={loading} type="submit">
          {loading ? "Loading" : "Submit"}
        </button>
      </div>
      <div className="error">{error || formError}</div>
    </form>
  );
};

export default CommentForm;
