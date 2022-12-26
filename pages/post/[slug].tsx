import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import Layout from "../../components/Layout";
import CommentsList from "../../components/pieces/post/CommentsList";
import PostComment from "../../components/pieces/post/PostComment";
import { API_URL } from "../../config";
import { PostContext, PostProvider, usePost } from "../../context/PostContext";
import styles from "../../styles/SinglePost.module.scss";

export const SinglePost = ({ post, comments }) => {
  const { setComments, rootComments } = usePost();
  useEffect(() => {
    setComments(comments);
  }, [comments]);

  // @ Changing the url to show the slug instead of id
  // ! When reloading is trying to fetch post by slug...
  // const router = useRouter();
  // useEffect(() => {
  //   router.push(`/post/${post.slug}`, undefined, { shallow: true });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [post]);

  return (
    <Layout title="Post" description="">
      <div>
        <div>
          <div>
            <div className={styles.title}>
              <h2>{post.title}</h2> <p>Author:</p>
              <h5>{post.author}</h5>
            </div>
            <p>{post.publish_date}</p>
          </div>
          {/* ! Careful with this ! */}
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
        <div className={styles.commentsWrapper}>
          <div className={styles.commentsContent}>
            <h4>Comments</h4>
            {rootComments?.length ? (
              <div>
                <CommentsList comments={rootComments} />
              </div>
            ) : (
              <p>No comments to display</p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

type ContextParams = {
  slug: string;
};

type PageProps = {
  // !! This any should be of type Post Interface
  blogPost: null | any;
};

export const getStaticProps: GetStaticProps<PageProps, ContextParams> = async (context) => {
  const {
    params: { slug },
  } = context;

  if (slug) {
    try {
      const res = await fetch(`${API_URL}/posts/${slug}`);
      const commentsRes = await fetch(`${API_URL}/posts/${slug}/comments`);

      const post = await res.json();
      const comments = await commentsRes.json();

      return {
        props: { post: post, comments: comments },
      };
    } catch (error) {
      console.log("error ", error);
    }
  }
  return {
    notFound: true,
  };
};

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export default SinglePost;
