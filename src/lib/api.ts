import { faker } from "@faker-js/faker"

export async function get<T>(url: string, query?: { [key: string]: string | number | boolean }): Promise<T> {
    if (query)
        url += '?' + new URLSearchParams(query as any)
    console.log(`Calling ${url}`)
    // fetch(url, {
    //     method: "get",
    // })

    const fakeData = Array.from({ length: 100 }).map(() => `${faker.company.buzzPhrase()}`)

    console.log(fakeData)

    const data = [
        "text1",
        "text2aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        "text3 a a a aa a a a a  a a a a a a  a a a a a a a aa  aa   a a a a a a a a a a   a",
        ...fakeData
    ]


    return data.map((text, index) => ({
        id: index,
        title: text,
        author: faker.internet.displayName(),
        likes: faker.number.int(1e4),
        dislikes: faker.number.int(1e4)
    })) as any
}