export interface Story {
  id: number;
  username: string;
  location: string;
  image: string;
  viewed: boolean;
  latestStory: {
    createdAt: Date;
    media: string;
    caption: string;
  };
}
