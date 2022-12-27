import React, { createContext, useContext, useEffect, useState } from "react";
import { IComment, IPost } from "../types/interfaces";

const PostContext = createContext<any>(null);

export const usePost = () => {
  return useContext(PostContext);
};

const PostProvider = ({ children }: { children: React.ReactNode }) => {
  const [post, setPost] = useState<IPost>();
  const [comments, setComments] = useState<IComment[]>([]);
  const [rootComments, setRootComments] = useState<IComment[]>([]);
  const [commentsByParentId, setCommentsByParentId] = useState<{ [parentId: number]: IComment[] }>([]);

  useEffect(() => {
    setRootComments(comments.filter((comment: IComment) => !comment.parent_id));
  }, [comments]);

  useEffect(() => {
    const group: { [parentId: number]: IComment[] } = {};
    if (comments.length) {
      comments.forEach((comment: IComment) => {
        if (comment.parent_id) {
          if (!group[comment.parent_id]) {
            group[comment.parent_id] ||= [];
          }
          group[comment.parent_id].push(comment);
        }
      });
      setCommentsByParentId(group);
    }
  }, [comments]);

  const getCommentReplies = (parent_id: number) => {
    return commentsByParentId[parent_id];
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
