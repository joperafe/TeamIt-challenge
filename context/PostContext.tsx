import React, { createContext, useContext, useEffect, useState } from "react";
import { IComment, IPost } from "../types/interfaces";

const PostContext = createContext<any>(null);

export const usePost = () => {
  return useContext(PostContext);
};

const PostProvider = ({ children }: { children: React.ReactNode }) => {
  const [post, setPost] = useState<IPost>();
  const [comments, setComments] = useState<any[]>([]);
  const [rootComments, setRootComments] = useState<any[]>([]);
  const [commentsByParentId, setCommentsByParentId] = useState<any[]>([]);

  useEffect(() => {
    if (comments) {
      setRootComments(comments.filter((comment: IComment) => !comment.parent_id));
    }
  }, [comments]);

  useEffect(() => {
    const group: any = {};
    if (comments.length) {
      comments.forEach((comment: IComment) => {
        group[comment.parent_id] ||= [];
        group[comment.parent_id].push(comment);
      });
      setCommentsByParentId(group);
    }
  }, [comments]);

  const getCommentReplies = (parent_id: number) => {
    if (commentsByParentId) {
      return commentsByParentId[parent_id];
    }
    return;
  };

  return (
    <PostContext.Provider
      value={{
        post,
        setPost,
        comments,
        setComments,
        rootComments,
        getCommentReplies,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export { PostContext, PostProvider };
