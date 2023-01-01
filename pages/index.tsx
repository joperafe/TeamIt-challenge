import { useState, useEffect, useCallback } from "react";
import styles from "../styles/Home.module.scss";
import Layout from "../components/Layout";
import { API_URL } from "../config";
import { IPost } from "../types/interfaces";
import { GetServerSideProps } from "next";
import { PostsList } from "../components/pieces/post/PostsList";
import PostModal from "../components/pieces/post/PostModal";
import InputSearch from "../components/pieces/InputSearch";
import { convertTitleToSlug } from "../utils/convertTitleToSlug";
import { useAsyncFn } from "../hooks/useAsync";
import { createPost } from "../services/posts";

interface IFormState {
  title: string;
  author: string;
  content: string;
}

export const Home: React.FC<{ posts: IPost[] }> = ({ posts }) => {
  const [postsToShow, setPostsToShow] = useState<IPost[]>([]);
  const [showPostModal, setShowPostModal] = useState(false);
  // @ State for the search bar
  const [searchTerm, setSearchTerm] = useState("");

  const createPostFn = useAsyncFn(createPost);

  useEffect(() => {
    if (posts) {
      setPostsToShow(posts);
    }
  }, [posts]);

  useEffect(() => {
    if (posts) {
      const filteredPosts = posts.filter((post) => post.title.toLowerCase().includes(searchTerm.toLowerCase()));
      setPostsToShow(filteredPosts);
    }
  }, [posts, searchTerm]);

  const handleshowPostModal = useCallback(() => {
    setShowPostModal(!showPostModal);
  }, [showPostModal]);

  const handleCloseModal = useCallback(() => {
    setShowPostModal(false);
  }, [setShowPostModal]);

  const handleNewPostSubmit = useCallback(
    (state: IFormState) => {
      if (state) {
        const description = `${state.content.split(".")[0]}.`;
        const slug = convertTitleToSlug(state.title);

        return createPostFn
          .execute({
            post: { ...state, content: `<p>${state.content}</p>`, description: description, slug: slug },
          })
          .then((res: IPost) => {
            setPostsToShow([res, ...postsToShow]);
            handleCloseModal();
          });
      }
    },
    [createPostFn, handleCloseModal, postsToShow]
  );

  return (
    <Layout title="Blog Posts" description="Blog Posts">
      <div className={styles.wrapper}>
        <div className={styles.actionsBtn}>
          <h2>Blog Posts</h2>
          <InputSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <button className={styles.addPostBtn} onClick={handleshowPostModal}>
            Create Post
          </button>
        </div>
        <PostsList posts={postsToShow} />
        {showPostModal && <PostModal onClose={handleCloseModal} handleSubmit={handleNewPostSubmit} />}
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<{ posts: IPost[] }> = async () => {
  const res = await fetch(`${API_URL}/posts?_sort=publish_date&_order=desc`);
  const posts = await res.json();

  // return { props: { posts } };
  return { props: { posts: [] } };
};

export default Home;
