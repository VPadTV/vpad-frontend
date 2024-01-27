
export async function logout(): Promise<undefined> {
    localStorage.removeItem('userAuth')
}