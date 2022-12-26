import { GetStaticPaths, GetStaticProps, PreviewData } from "next";
import Link from "next/link";
import { useEffect } from "react";
import Layout from "../../components/Layout";
import CommentForm from "../../components/pieces/post/CommentForm";
import CommentsList from "../../components/pieces/post/CommentsList";
import { API_URL } from "../../config";
import { usePost } from "../../context/PostContext";
import { useAsyncFn } from "../../hooks/useAsync";
import { createComment } from "../../services/comments";
import styles from "../../styles/SinglePost.module.scss";
import { ICommentList, IPost } from "../../types/interfaces";

export const SinglePost = ({ post, commentsFromAPI }: { post: IPost; commentsFromAPI: ICommentList }) => {
  const { setPost, comments, setComments, rootComments } = usePost();
  const { loading, error, execute: createCommentFn } = useAsyncFn(createComment);

  useEffect(() => {
    post && setPost(post);
    setComments(commentsFromAPI);
  }, [post, commentsFromAPI]);

  const onCreateComment = (newComment: string) => {
    return createCommentFn({
      postId: post.id,
      content: newComment,
    }).then((res: Object) => {
      setComments([res, ...comments]);
    });
  };

  // @ Changing the url to show the slug instead of id
  // ! When reloading is trying to fetch post by slug...
  // const router = useRouter();
  // useEffect(() => {
  //   router.push(`/post/${post.slug}`, undefined, { shallow: true });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [post]);

  return (
    <Layout title={post.title} description={post.description}>
      <>
        <Link href="/" className={styles.goBack}>
          <h3> {"<"} Go back</h3>
        </Link>
        <div>
          <div className={styles.header}>
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
            <CommentForm loading={false} error="" onSubmit={onCreateComment} />
            {rootComments?.length ? (
              <div className={styles.comments}>
                <CommentsList comments={rootComments} />
              </div>
            ) : (
              <p>No comments to display</p>
            )}
          </div>
        </div>
      </>
    </Layout>
  );
};

type ContextParams = {
  slug: string;
};

type PageProps = {
  blogPost: IPost;
};

export const getStaticProps: GetStaticProps<PageProps, ContextParams, PreviewData> = async (context) => {
  const {
    params: { slug },
  } = context;

  if (slug) {
    try {
      const res = await fetch(`${API_URL}/posts/${slug}`);
      const commentsRes = await fetch(`${API_URL}/posts/${slug}/comments?_sort=date&_order=desc`);

      const post = await res.json();
      const comments = await commentsRes.json();

      return {
        props: { post: post, commentsFromAPI: comments || [] },
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
