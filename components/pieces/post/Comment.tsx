import { useCallback, useMemo, useState } from "react";
import { usePost } from "../../../context/PostContext";
import CommentsList from "./CommentsList";
import styles from "../../../styles/Comment.module.scss";
import { IComment } from "../../../types/interfaces";
import CommentForm from "./CommentForm";
import { useAsyncFn } from "../../../hooks/useAsync";
import { createComment, deleteComment, updateComment } from "../../../services/comments";
import Image from "next/image";
import pencil from "../../../public/pencil.png";
import trash from "../../../public/trash.png";
import reply from "../../../public/reply.png";

export const Comment: React.FC<{ comment: IComment }> = ({ comment }) => {
  const { post, comments, setComments, getCommentReplies } = usePost();
  const replies = useMemo(() => getCommentReplies(comment.id), [comment.id, getCommentReplies]);

  const [isReplying, setIsReplying] = useState(false);
  const createCommentFn = useAsyncFn(createComment);

  const [isEditing, setIsEditing] = useState(false);
  const updateCommentFn = useAsyncFn(updateComment);

  const deleteCommentFn = useAsyncFn(deleteComment);

  const onCreateComment = useCallback(
    (newComment: string) => {
      return createCommentFn
        .execute({
          postId: post.id,
          content: newComment,
          parentId: comment.id,
        })
        .then((res: Object) => {
          setComments([res, ...comments]);
          setIsReplying(false);
        });
    },
    [comment.id, comments, createCommentFn, post.id, setComments]
  );

  const onUpdateComment = useCallback(
    (newComment: string) => {
      return updateCommentFn
        .execute({
          id: comment.id,
          content: newComment,
        })
        .then((res: IComment) => {
          setComments(
            comments.map((comm: IComment) => (comm.id === res.id ? { ...comm, content: res.content } : comm))
          );
          setIsEditing(false);
        });
    },
    [comment.id, comments, setComments, updateCommentFn]
  );

  const onDeleteComment = useCallback(() => {
    const confirmDelete = confirm("Deleting a comment is a permanent action, are you sure?");
    if (confirmDelete) {
      return deleteCommentFn.execute({ id: comment.id }).then(() => {
        setComments(comments.filter((localComment: IComment) => localComment.id !== comment.id));
      });
    }
  }, [comment.id, comments, deleteCommentFn, setComments]);

  return (
    <div key={comment.id} className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h4>{comment.user}</h4>
          <p>{comment.date}</p>
        </div>
        <div className={styles.buttonWrapper}>
          <button onClick={() => setIsReplying(!isReplying)} title={!isReplying ? "Reply" : "Cancel Reply"}>
            <Image src={reply} alt="reply-btn" width={25} height={25} />
          </button>
          <button onClick={() => setIsEditing(!isEditing)} title={!isEditing ? "Edit" : "Cancel Edit"}>
            <Image src={pencil} alt="edit-btn" width={30} height={30} />
          </button>
          <button onClick={onDeleteComment} title="Delete">
            <Image src={trash} alt="delete-btn" width={30} height={30} />
          </button>
        </div>
      </div>
      <div className={styles.content}>
        {isEditing ? (
          <CommentForm initialValue={comment.content} onSubmit={onUpdateComment} loading={updateCommentFn.loading} />
        ) : (
          <p className={styles.description}>{comment.content}</p>
        )}
      </div>

      {isReplying && <CommentForm onSubmit={onCreateComment} loading={createCommentFn.loading} />}
      {replies?.length ? (
        <>
          <div className={styles.nestedComment}>
            <CommentsList comments={replies} />
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Comment;
