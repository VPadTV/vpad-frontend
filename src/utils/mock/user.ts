import { faker } from "@faker-js/faker";
import type { User } from "../../types/entities";

export const user = (id?: string) => ({
    id: id ?? faker.string.nanoid(),
    nickname: faker.internet.displayName()
} as User)