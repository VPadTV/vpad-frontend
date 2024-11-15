import type { User } from "@/domain/entities/User"
import { UserRepository } from "@/infrastructure/repositories/User/user"
import { getUserAuth } from "@/modules/authentication/composables"
import { store } from "@/store/store"
import { onBeforeMount, ref } from "vue"
import type { Router } from "vue-router"

export async function loadOrGetUser(router: Router, reload: boolean = true, fallbackRoute: string = '/'): Promise<User | undefined> {
    let user: User | undefined
    const userAuth = getUserAuth()
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
export function loadOrGetUserRef(router: Router, reload: boolean = true, fallbackRoute: string = '/') {
    const user = ref<User>()
    onBeforeMount(async () => {
        user.value = await loadOrGetUser(router, reload, fallbackRoute)
    })
    return user;
}