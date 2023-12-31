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
}

.logo {
    margin: 0 1rem 0 0;
}

#search-box:focus-within {
    outline: 1px solid $accent;
}

#search-box {
    font-size: 1.1rem;
    height: 1.6rem;
    display: flex;

    input {
        height: 100%;
        width: 40vw;
        border: 0;
        padding: 4px;
    }

    input:focus {
        outline: none;
    }

    button {
        height: 100%;
        padding: 0.2rem;
        border: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        img {
            height: 100%;
        }
    }
}
</style>
