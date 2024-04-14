import type { Author } from '@domain/entities/Author'

export interface User extends Author {
    username: string
    email: string
    about?: string
    contact?: string
    admin?: boolean
}
