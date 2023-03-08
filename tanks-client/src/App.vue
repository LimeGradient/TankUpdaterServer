<script setup lang="ts">
import Tank from './components/Tank.vue';

document.addEventListener("mousemove", (e) => {
    Array.from(document.getElementsByClassName("fancy-button")).forEach((buttonEl) => {
        const button = <HTMLElement> buttonEl;
        const rect = button.getBoundingClientRect(),
            x = e.clientX - rect.x,
            y = e.clientY - rect.y;

        button.style.setProperty("--mouse-x", `${x}px`);
        button.style.setProperty("--mouse-y", `${y}px`);
    })
})

</script>

<template>
    <Tank></Tank>
    <div class="content">
        <RouterView></RouterView>
    </div>
</template>

<style scoped>
.content {
    margin: auto;
    background-color: var(--lighter-gray);
    width: 60%;
    height: 100%;

    /* position: relative;
    z-index: -3; */
}
</style>
