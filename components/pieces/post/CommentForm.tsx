import { useState, useCallback } from "react";
import styles from "../../../styles/CommentForm.module.scss";

type Props = {
  loading: boolean;
  error?: string;
  initialValue?: string;
  onSubmit: Function;
};

export const CommentForm = ({ loading, error = "", initialValue = "", onSubmit }: Props) => {
  const [comment, setComment] = useState(initialValue);
  const [formError, setFormError] = useState("");

  const handleOnChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setComment(e.target.value);
      formError && setFormError("");
    },
    [formError]
  );

  const handleSubmit = useCallback(
    (e: React.SyntheticEvent) => {
      e.preventDefault();
      if (comment) {
        onSubmit(comment).then(() => {
          setComment("");
          formError && setFormError("");
        });
      } else {
        setFormError("Comment is required");
      }
    },
    [comment, formError, onSubmit]
  );

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.wrapper}>
        <textarea className={styles.textArea} value={comment} onChange={handleOnChange} />
        <button className={styles.submitBtn} disabled={loading} type="submit">
          {loading ? "Loading" : "Submit"}
        </button>
      </div>
      <div className="error">{error || formError}</div>
    </form>
  );
};

export default CommentForm;
