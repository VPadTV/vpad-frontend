import { faker } from "@faker-js/faker";
import type { User } from "../types";

export const users = () => (Array.from({ length: 100 }).map(() => ({
    id: faker.string.nanoid(),
    nickname: faker.internet.displayName()
})) as User[])