import { faker } from "@faker-js/faker";
import type { User } from "../types";

export const user = () => ({
    id: faker.string.nanoid(),
    nickname: faker.internet.displayName()
} as User)