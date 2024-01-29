import { ref, type Ref, onBeforeMount } from "vue";
import { getUserAuth } from "./api/auth";
import { getUser } from './api/user'
import router from "@/router";
import type { User } from "@/types/entities";
import { store } from "@/store/store";

export function loadOrGetUserRef(reload: boolean = true, fallbackRoute: string = '/') {
    const user: Ref<User | undefined> = ref()
    onBeforeMount(async () => {
        user.value = await loadOrGetUser(reload, fallbackRoute)
    })
    return user;
}

async function loadOrGetUser(reload: boolean, fallbackRoute: string): Promise<User | undefined> {
    let user: User | undefined
    const userAuth = getUserAuth()
    if (!userAuth) {
        store.user = undefined
        if (reload)
            router.push(fallbackRoute);
    } else if (store.user) {
        user = store.user;
    } else {
        store.user = await getUser(userAuth?.id)
        user = store.user
    }
    return user
}