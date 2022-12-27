export interface IPost {
  id: number;
  title: string;
  author: string;
  publish_date: string;
  slug: string;
  description: string;
  content: string;
}

export interface IPostList {
  posts: Array<IPost>;
}

export interface IComment {
  id: number;
  postId: number;
  parent_id?: number;
  user: string;
  date: string;
  content: string;
}

export interface ICommentList {
  comments: Array<IComment>;
}
