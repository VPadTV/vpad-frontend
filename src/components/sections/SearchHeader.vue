<script setup lang="ts">
import { onMounted, ref } from 'vue';

import UserProfilePicture from '../UserProfilePicture.vue';
import ProfileDropdown from '../ProfileDropdown.vue';
import SearchIcon from '../icons/SearchIcon.vue';
import PenIcon from '../icons/PenIcon.vue';
import MailIcon from '../icons/MailIcon.vue';
import { getUserAuth } from '@/composables/api/auth';
import type { UserAuth } from '@/types/auth';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute()
const router = useRouter()

const profileDropdownClosed = ref(true)
function toggleProfileDropdown() {
    profileDropdownClosed.value = !profileDropdownClosed.value
}

const userAuth = ref<UserAuth | undefined>()
onMounted(() => {
    userAuth.value = getUserAuth()
})

function onClickLogo() {
    router.push({
        path: '/',
        query: {
            search: ''
        }
    });
}
const search = ref<string>('')
function onSearch() {
    router.replace({ query: { ...route.query, search: search.value } })
}
</script>

<template>
    <header>
        <button class="logo" @click.prevent="onClickLogo">
            <img alt="VPad" src="@/assets/logonew.png" height="60" />
        </button>
        <form class="search-box" @submit.prevent="onSearch">
            <input name="search" type="text" v-model="search">
            <button>
                <SearchIcon />
            </button>
        </form>
        <nav class="user-area">
            <RouterLink to="/" class="logo-mobile nt">
                <img alt="VPad" src="@/assets/logo_whitebg.png" height="60" />
            </RouterLink>
            <RouterLink class="nt" to="/create">
                <PenIcon />
            </RouterLink>
            <RouterLink class="nt" to="/notifications">
                <MailIcon />
            </RouterLink>
            <div class="profile-wrap nt" v-if="userAuth">
                <button class="profile" @click="toggleProfileDropdown">
                    <UserProfilePicture :id="''" />
                </button>
                <ProfileDropdown :userId="userAuth.id" :closed="profileDropdownClosed" />
            </div>
            <RouterLink v-else to="/login">
                <span>Login</span>
            </RouterLink>
        </nav>
    </header>
</template>
  
<style scoped lang="scss">
@import '@/assets/style/base.scss';

header {
    padding: 0 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: $main;
    width: 100vw;
    height: $header-height;
    column-gap: 1rem;

    button {
        background: none;
        border: none;

        .logo {
            margin: 0 1rem 0 0;

            img {
                vertical-align: middle;
            }
        }
    }
}

.search-box,
.user-area {
    height: 100%;
    display: flex;
}

.search-box {
    height: 35%;
    border: 2px solid $main-lighter;
    border-radius: 1rem;
    overflow: hidden;
    transition: background-color 0.08s, border 0.08s;

    input {
        height: 100%;
        width: 40vw;
        border: 0;
        padding: 6px;
        font-size: 1rem;
        overflow: hidden;
        color: $text;
        background-color: $main;
    }

    button {
        height: 100%;
        padding: 0.22rem 0.8rem;
        padding-right: 0.82rem;
        border: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        background-color: transparent;
        overflow: hidden;

        svg {
            height: 100%;
        }

        :hover {
            cursor: pointer;
        }
    }
}

.search-box:focus-within {
    border: 2px solid $accent;
    background-color: $accent;
    outline: none;
}

.user-area {
    height: 40%;
    margin-left: auto;
    justify-content: flex-end;
    align-items: center;
    column-gap: 2rem;

    .nt {
        height: 100%;
    }

    a {
        font-size: 1.2rem;
    }

    .profile-wrap {
        aspect-ratio: 1;
        height: 100%;
        left: 1px;

        .profile {
            height: 100%;
        }
    }

    button {
        border: none;
        background: none;
    }

    .logo-mobile {
        display: none;
    }

    .profile-wrap {
        height: 100%;
    }
}

@media screen and (max-width: $mobile-width-large) {
    header {
        flex-direction: column;
        padding: .5rem 0;
        height: $header-height-width-large;
    }

    .logo {
        position: absolute;
        left: 1rem;
        margin: 0;
    }

    .search-box {
        order: 3;
        height: 2rem;
        width: 65%;
        margin-top: .5rem;

        input {
            width: 100%;
        }
    }

    .user-area {
        width: unset;
        height: unset;
        height: calc($header-height-width-large - 70px);
        margin-left: 0;

        .profile {
            margin-left: .2rem;
        }
    }
}

@media screen and (max-width: $mobile-width-small) {
    .logo {
        display: none;
    }

    .search-box {
        width: 85%;
    }

    .user-area {
        column-gap: 1rem;

        .nt {
            aspect-ratio: 1;

            * {
                vertical-align: middle;
            }
        }

        .logo-mobile {
            display: unset;

            img {
                height: 100%;
            }
        }
    }
}
</style>
