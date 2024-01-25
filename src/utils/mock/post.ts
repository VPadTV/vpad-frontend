import { faker } from "@faker-js/faker";
import type { Post } from "@/types/entities";
import { user } from "./user";

const pickRandom = (...options: string[]): string => {
    return options[Math.floor(Math.random() * options.length)];
}

export const post = (id?: string) => ({
    id: id ?? faker.string.nanoid(),
    title: faker.lorem.words({ min: 2, max: 12 }),
    url: pickRandom('/src/assets/example_horizontal.png', '/src/assets/example_vertical.png'),
    author: user(),
    likes: faker.number.int(1e4),
    dislikes: faker.number.int(1e4),
    createdAt: faker.date.recent({ days: 300 }),
    updatedAt: faker.date.recent({ days: 300 }),
}) as Post