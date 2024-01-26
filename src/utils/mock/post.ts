import { faker } from "@faker-js/faker";
import type { Post } from "@/types/entities";
import { user } from "./user";

const pickRandom = <T>(...options: T[]): T => {
    return options[Math.floor(Math.random() * options.length)];
}

const randomCasing = (str: string): string => {
    switch (pickRandom(1, 2, 3)) {
        case 1: // title case
            return str.replace(/(^|\s)\S/g, function (t) { return t.toUpperCase() });
        case 2: // upper case
            return str.toUpperCase();
    }
    return str;
}

export const post = (id?: string) => ({
    id: id ?? faker.string.nanoid(),
    title: randomCasing(faker.lorem.words({ min: 2, max: 6 })),
    url: pickRandom('/src/assets/example_horizontal.png', '/src/assets/example_vertical.png'),
    author: user(),
    likes: faker.number.int(1e4),
    dislikes: faker.number.int(1e4),
    createdAt: faker.date.recent({ days: 300 }),
    updatedAt: faker.date.recent({ days: 300 }),
}) as Post