import { GetStaticPaths, GetStaticProps } from "next";
import Layout from "../../components/Layout";
import PostComment from "../../components/pieces/post/PostComment";
import { API_URL } from "../../config";

export const SinglePost = ({ post, comments }) => {
  console.log("this post ", post, comments);

  return (
    <Layout title="Post" description="">
      <div>
        <div>
          <div>
            <h2>{post.title}</h2>
            <p>{post.publish_date}</p>
            <h3>{post.author}</h3>
          </div>
          {/* ! Careful with this ! */}
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
        <div>
          <h3>Comments</h3>
          {comments.length ? comments.map((comment) => <PostComment key={comment.id} comment={comment} />) : null}
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
