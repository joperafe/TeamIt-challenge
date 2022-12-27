import React from "react";
import { Comment } from "./Comment";
import { IComment } from "../../../types/interfaces";

const MemoizedComment = React.memo(Comment);

export const CommentsList: React.FC<{ comments: IComment[] }> = ({ comments }) => {
  return (
    <>
      {comments.map((comment: IComment) => (
        <div key={comment.id}>
          <MemoizedComment comment={comment} />
        </div>
      ))}
    </>
  );
};

export default CommentsList;
