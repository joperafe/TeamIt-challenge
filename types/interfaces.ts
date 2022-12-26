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
  length: any;
  map(arg0: (post: any) => JSX.Element): import("react").ReactNode;
  posts: IPost[];
}

export interface IComment {
  id: number;
  postId: number;
  parent_id: string;
  user: string;
  date: string;
  content: string;
}

export interface ICommentList {
  posts: IComment[];
}
