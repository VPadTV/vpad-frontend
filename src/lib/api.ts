export async function get(url: string, query?: { [key: string]: string | number | boolean }): Promise<any> {
    if (query)
        url += '?' + new URLSearchParams(query as any)
    console.log(`Calling ${url}`)
    // fetch(url, {
    //     method: "get",
    // })

    const data = [
        "text1",
        "text2aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        "text3 a a a aa a a a a  a a a a a a  a a a a a a a aa  aa   a a a a a a a a a a   a",
        ...Array(100).fill("text")
    ]
    return data.map((text, index) => ({
        id: index,
        title: text,
    }))
}