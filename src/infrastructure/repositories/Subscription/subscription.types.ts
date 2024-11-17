export type SubCreateBody = {
    tierId: string
}

export type SubGetResponse = {
    id: string
    tier: {
        id: string
        name: string
        price: number
    }
}