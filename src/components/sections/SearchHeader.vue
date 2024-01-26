<script setup lang="ts">
import UserProfilePicture from '../UserProfilePicture.vue';
import SearchIcon from '../icons/SearchIcon.vue';
import PenIcon from '../icons/PenIcon.vue';
import MailIcon from '../icons/MailIcon.vue';
</script>

<template>
    <header>
        <RouterLink to="/" class="logo">
            <img alt="VPad" src="@/assets/logo_whitebg.png" height="60" />
        </RouterLink>
        <form class="search-box" method="get">
            <input name="search" type="text">
            <button>
                <SearchIcon/>
            </button>
        </form>
        <section class="user-area">
            <RouterLink to="/create"><PenIcon/></RouterLink>
            <RouterLink to="/notifications"><MailIcon/></RouterLink>
            <RouterLink to="/profile" class="profile"><UserProfilePicture :id="'among us'"/></RouterLink>
        </section>
    </header>
</template>
  
<style scoped lang="scss">
@import '@/assets/base.scss';

header {
    padding: 0 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: $main;
    width: 100vw;
    height: $header-height;

    .logo {
        margin: 0 1rem 0 0;
        
        img {
            vertical-align: middle;
        }
    }
}

.search-box, .user-area {
    height: 100%;
    display: flex;
}

.search-box {
    height: 40%;
    border: 2px solid transparent;
    border-radius: 1rem;
    overflow: hidden;
    input {
        height: 100%;
        width: 40vw;
        border: 0;
        padding: 6px;
        font-size: 1rem;
        overflow: hidden;
        color: $text-dark;
    }

    input:focus {
        outline: none;
    }

    button {
        height: 100%;
        padding: 0.22rem 0.8rem;
        padding-right: 0.82rem;
        border: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        background-color: $accent;
        overflow: hidden;
        svg {
            height: 100%;
            width: 100%;
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
    gap: 0.5rem;

    a {
        height: 100%;
    }
    .profile {
        margin-left: .4rem;
    }
}

@media screen and (max-width: $mobile-width-large) {
    header {
        flex-direction: column;
        padding: .5rem 0;
    }

    .logo {
        position: absolute;
        left: 1rem;
        margin: 0;
    }

    .search-box {
        order: 3;
        height: 2rem;
        width: 60%;
        margin-top: .5rem;

        input {
            width: 100%;
        }
    }

    .user-area {
        height: unset;
        width: 120px;
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
}
</style>
