import { faker } from "@faker-js/faker";

const generateTraveler = (id: number) => ({
  id,
  name: `${faker.person.firstName()} ${faker.person.lastName()}`,
  location: faker.location.city() + ", " + faker.location.country(),
  avatar: faker.image.url({ width: 600, height: 600 }),
  bio: faker.lorem.sentence(),
  posts: Array.from({ length: 5 }, (_, postId) => ({
    id: postId,
    image: faker.image.url({ width: 600, height: 600 }),
    likes: faker.number.int({ min: 100, max: 5000 }),
    description: faker.lorem.sentence(),
    comments: faker.number.int({ min: 0, max: 100 }),
    createdAt: faker.date.past(),
  })),
});

export const travelers = Array.from({ length: 10 }, (_, i) =>
  generateTraveler(i + 1)
);

// Gerar stories com dados mais realistas
export const generateStories = () => {
  return Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    username: `${faker.person.firstName()}`,
    location: `${faker.location.city()}`,
    image: faker.image.url({ width: 600, height: 600 }),
    viewed: faker.datatype.boolean(),
    latestStory: {
      createdAt: faker.date.recent(),
      media: faker.image.url({ width: 1080, height: 1920 }),
      caption: faker.lorem.sentence(),
    },
  }));
};

export const stories = generateStories();
