import { GetStaticPaths, GetStaticProps, GetStaticPropsContext, PreviewData } from "next";
import Link from "next/link";
import { ParsedUrlQuery } from "querystring";
import { useCallback, useEffect, useMemo } from "react";
import Layout from "../../components/Layout";
import CommentForm from "../../components/pieces/post/CommentForm";
import CommentsList from "../../components/pieces/post/CommentsList";
import { API_URL } from "../../config";
import { usePost } from "../../context/PostContext";
import { useAsyncFn } from "../../hooks/useAsync";
import { createComment } from "../../services/comments";
import styles from "../../styles/SinglePost.module.scss";
import { ICommentList, IPost } from "../../types/interfaces";

export const SinglePost = ({
  post,
  commentsFromAPI,
  errorFromAPI,
}: {
  post: IPost;
  commentsFromAPI: ICommentList;
  errorFromAPI?: Object | undefined;
}) => {
  const { setPost, comments, setComments, rootComments } = usePost();
  const { loading, error, execute: createCommentFn } = useAsyncFn(createComment);

  useEffect(() => {
    post && setPost(post);
    setComments(commentsFromAPI);
  }, [post, commentsFromAPI, setPost, setComments]);

  const onCreateComment = useCallback(
    (newComment: string) => {
      return createComment({
        postId: post.id,
        content: newComment,
      }).then((res: Object) => {
        setComments([res, ...comments]);
      });
    },
    [post.id, comments, setComments]
  );

  const memoizedCommentsList = useMemo(() => <CommentsList comments={rootComments} />, [rootComments]);

  return (
    <Layout title={post.title} description={post.description}>
      <>
        <Link href="/" className={styles.goBack}>
          <h3> {"<"} Go back</h3>
        </Link>
        <>
          <div className={styles.header}>
            <div className={styles.title}>
              <h2>{post.title}</h2> <p>Author:</p>
              <h5>{post.author}</h5>
            </div>
            <p>{post.publish_date}</p>
          </div>
          {/* ! Careful with this. Might cause security issues ! */}
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </>
        <div className={styles.commentsWrapper}>
          <div className={styles.commentsContent}>
            <h4>Comments</h4>
            <CommentForm loading={false} error="" onSubmit={onCreateComment} />
            {rootComments?.length ? (
              <div className={styles.comments}>{memoizedCommentsList}</div>
            ) : (
              <p>No comments to display</p>
            )}
          </div>
        </div>
      </>
    </Layout>
  );
};

interface IParams extends ParsedUrlQuery {
  slug: string;
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params as IParams;

  if (slug) {
    try {
      const res = await fetch(`${API_URL}/posts/${slug}?_embed=comments`);
      const post = await res.json();

      return {
        props: { post: post, commentsFromAPI: post.comments || [] },
      };
    } catch (error) {
      return { notFound: true, props: { errorFromAPI: error } };
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
