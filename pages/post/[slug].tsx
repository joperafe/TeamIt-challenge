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
  console.log("VALUE :: ", rootComments);

  // const commentsByParentId = useMemo(() => {
  //   const group = {};
  //   comments.forEach((comment) => {
  //     group[comment.parent_id] ||= [];
  //     group[comment.parent_id].push(comment);
  //   });

  //   return group;
  // }, [comments]);

  // const [rootComments, setRootComments] = useState([]);
  // useEffect(() => {
  //   if (comments) {
  //     setRootComments(comments.filter((comment) => !comment.parent_id));
  //   }
  // }, [comments]);

  // const commentReplies = (id) => {
  //   const replies = comments.filter((comment) => comment.parent_id === id);
  //   console.log("here? ", id, replies);
  //   return replies;
  //   // .sort((a,b)=>new Date(a.date);
  //   // or by id?
  // };

  // console.log("root comments ", rootComments);

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
            {/* {comments.length ? comments.map((comment) => <PostComment key={comment.id} comment={comment} />) : null} */}
            {rootComments?.length ? (
              // rootComments.map((comment) => (
              //   <PostComment key={comment.id} comment={comment}>
              //     {commentReplies(comment.id).length
              //       ? commentReplies(comment.id).map((reply) => <PostComment key={reply.id} comment={reply} />)
              //       : null}
              //   </PostComment>))
              // repliesList={commentReplies(comment.id)}
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
    paths: [], //indicates that no page needs be created at build time
    fallback: "blocking", //indicates the type of fallback
  };
};

export default SinglePost;
