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
        <form id="search-box" method="get">
            <input name="search" type="text">
            <button id="search-button">
                <SearchIcon/>
            </button>
        </form>
        <section id="stuff">
            <RouterLink to="/create"><PenIcon/></RouterLink>
            <RouterLink to="/notifications"><MailIcon/></RouterLink>
            <RouterLink to="/profile" class="profile"><UserProfilePicture :id="'among us'"/></RouterLink>
        </section>
    </header>
</template>
  
<style scoped lang="scss">
@import '@/assets/base.scss';

header {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: $main;
    width: 100vw;
    padding: 1rem;
    height: $header-height;

    .logo {
        margin: 0 1rem 0 0;
    }
}

#search-box, #stuff {
    height: calc(2rem + 4px);
    display: flex;
}

#search-box {
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

#search-box:focus-within {
    border: 2px solid $accent;
    background-color: $accent;
    outline: none;
}

#stuff {
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
</style>
