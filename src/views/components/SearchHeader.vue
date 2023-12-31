<script setup lang="ts">
</script>

<template>
    <header>
        <img alt="VPad" class="logo" src="@/assets/logo_whitebg.png" height="60" />
        <form id="search-box" method="get">
            <input name="search" type="text">
            <button id="search-button">
                <img alt="Search" src="@/assets/search.svg">
            </button>
        </form>
        <section id="stuff">
            <RouterLink to=""><img src="@/assets/pencil.png" alt="Create"></RouterLink>
            <RouterLink to=""><img src="@/assets/mailbox.png" alt="Notifications"></RouterLink>
            <RouterLink to=""><img src="@/assets/circle.png" alt="Profile"></RouterLink>
        </section>
    </header>
</template>
  
<style scoped lang="scss">
@import '@/assets/base.scss';

header {
    display: flex;
    align-items: center;
    background-color: $main;
    width: 100vw;
    padding: 1rem;

    .logo {
        margin: 0 1rem 0 0;
    }
}

#search-box, #stuff {
    height: 2rem;
    display: flex;
}

#search-box {
    input {
        height: 100%;
        width: 40vw;
        border: 0;
        padding: 4px;
        font-size: 1.2rem;
    }

    input:focus {
        outline: none;
    }

    button {
        height: 100%;
        padding: 0.22rem;
        border: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        background-color: $accent;
        img {
            height: 100%;
        }
    }
}

#search-box:focus-within {
    outline: 2px solid $accent;
}

#stuff {
    margin-left: auto;
    justify-content: flex-end;
    align-items: center;
    gap: 0.5rem;

    a, img {
        height: 120%;
    }
}
</style>
