import { store } from "@/store/store"

export async function logout(): Promise<undefined> {
    localStorage.removeItem('userAuth')
    store.userAuth = undefined
}