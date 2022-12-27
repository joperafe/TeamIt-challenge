import { API_URL } from "../config";
import { request } from "./request";

export const createComment = ({
  postId,
  content,
  parentId,
}: {
  postId: number;
  content: string;
  parentId?: number | null;
}) => {
  // ! Should do something with the user
  const user = "Unknown";

  return request(`${API_URL}/comments`, {
    method: "POST",
    data: {
      postId,
      content,
      parent_id: parentId,
      user,
      date: new Date().toJSON().slice(0, 10),
    },
  });
};

export const updateComment = ({ content, id }: { content: string; id: number }) => {
  return request(`${API_URL}/comments/${id}`, {
    method: "PATCH",
    data: { content },
  });
};

// ! Not requested
export const deleteComment = ({ id }: { id: number }) => {
  return request(`${API_URL}/comments/${id}`, {
    method: "DELETE",
  });
};
