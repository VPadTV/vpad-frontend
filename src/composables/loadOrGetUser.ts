import { ref, type Ref, onMounted } from "vue";
import { getUserAuth } from "./api/auth";
import { getUser } from './api/user'
import type { User } from "@/types/entities";
import { store } from "@/store/store";
import type { Router } from "vue-router";

export async function loadOrGetUser(router: Router, reload: boolean = true, fallbackRoute: string = '/'): Promise<User | undefined> {
    let user: User | undefined
    const userAuth = getUserAuth()
    if (!userAuth) {
        store.user = undefined
        if (reload)
            router.push(fallbackRoute);
    } else if (store.user) {
        user = store.user;
    } else {
        console.log(store.user)
        store.user = await getUser(userAuth?.id)
        user = store.user
    }
    return user
}
export function loadOrGetUserRef(router: Router, reload: boolean = true, fallbackRoute: string = '/') {
    const user: Ref<User | undefined> = ref()
    onMounted(async () => {
        user.value = await loadOrGetUser(router, reload, fallbackRoute)
    })
    return user;
}