import { faker } from "@faker-js/faker";
import type { Video } from "../types";
import { user } from "./user";

export const video = () => ({
    id: faker.string.nanoid(),
    title: faker.lorem.words({ min: 2, max: 12 }),
    author: user(),
    likes: faker.number.int(1e4),
    dislikes: faker.number.int(1e4),
    createdAt: faker.date.recent({ days: 300 }),
    updatedAt: faker.date.recent({ days: 300 }),
}) as Video