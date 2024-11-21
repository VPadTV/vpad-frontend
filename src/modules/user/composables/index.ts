import { UserRepository } from "@infrastructure/repositories/User/user"
import { getUserAuth } from "@/modules/authentication/composables"
import { store } from "@/store/store"
import type { Router } from "vue-router"

type User = unknown

export async function loadOrGetUser(router: Router, reload: boolean = true, fallbackRoute: string = '/'): Promise<User | undefined> {
    let user: User | undefined
    const userAuth = await getUserAuth()
    if (!userAuth) {
        store.user = undefined
        if (reload)
            router.push(fallbackRoute)
        return undefined
    } else if (store.user) {
        user = store.user;
    } else {
        store.user = await UserRepository.get(userAuth?.id)
        user = store.user
    }
    return user
}
