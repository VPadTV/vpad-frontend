<template>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17 17">
        <path
            d="M14 6h-4V3c0-1.103-.897-2-2-2H6.5a.5.5 0 0 0-.5.5v2.367L4.066 7.252A.493.493 0 0 0 4 7.5v7a.5.5 0 0 0 .5.5h8.025a2 2 0 0 0 1.827-1.188l1.604-3.609A.491.491 0 0 0 16 10V8c0-1.103-.897-2-2-2zM0 7.5v7a.5.5 0 0 0 .5.5H3V7H.5a.5.5 0 0 0-.5.5z">
        </path>
    </svg>
</template>

<style scoped lang="scss">
svg {
    background: none;
    display: inline-block;
    height: 100%;
}

svg:hover {
    cursor: pointer;
}

svg:hover {
    path {
        stroke: white !important;
    }
}

svg:not(.active) {
    filter: saturate(.8);
}

svg.active {
    filter: saturate(3);
}
</style>