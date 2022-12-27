import { request } from "./request";

export const getPosts = () => {
  return request("/posts");
};

export const getPost = (id: number) => {
  return request(`/posts/${id}`);
};
