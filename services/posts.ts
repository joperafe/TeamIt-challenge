import { API_URL } from "../config";
import { request } from "./request";

export const createPost = ({ post }: { post: { Id: number; content: string; parentId?: number | null } }) => {
  return request(`${API_URL}/posts`, {
    method: "POST",
    data: {
      ...post,
      publish_date: new Date().toJSON().slice(0, 10),
    },
  });
};
