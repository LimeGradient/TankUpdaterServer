<script setup lang="ts">

document.addEventListener("mousemove", (e) => {
    Array.from(document.getElementsByClassName("fancy-button-container")).forEach((buttonEl) => {
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
    <RouterView></RouterView>
</template>

<style scoped>
</style>
