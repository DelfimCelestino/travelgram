import { Post } from "./post";

export interface Traveler {
  id: number;
  name: string;
  location: string;
  avatar: string;
  bio: string;
  posts: Post[];
}
