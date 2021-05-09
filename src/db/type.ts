export type User = {
  uid: string;
  name: string;
  password: string;
};

export type Post = {
  postId: string;
  uid: string;
  description: string;
};
