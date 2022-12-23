import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";

const PostContext = createContext<any>(null);

export const usePost = () => {
  return useContext(PostContext);
};

const PostProvider = ({ children }) => {
  const [comments, setComments] = useState([]);
  const [rootComments, setRootComments] = useState([]);
  const [commentsByParentId, setCommentsByParentId] = useState([]);

  useEffect(() => {
    if (comments) {
      setRootComments(comments.filter((comment) => !comment.parent_id));
    }
  }, [comments]);

  useEffect(() => {
    const group: any = {};
    if (comments.length) {
      comments.forEach((comment) => {
        group[comment.parent_id] ||= [];
        group[comment.parent_id].push(comment);
      });
      console.log("group ", group);
      setCommentsByParentId(group);
    }
  }, [comments]);

  const getCommentReplies = (parent_id) => {
    if (commentsByParentId) {
      console.log("commentsBy parent ", parent_id, commentsByParentId);
      return commentsByParentId[parent_id];
    }
    return;
  };

  return (
    <PostContext.Provider
      value={{
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
