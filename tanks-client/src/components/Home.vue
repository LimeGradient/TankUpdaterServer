<script setup lang="ts">
import Button from './Button.vue';
</script>

<template>
    <div class="container tank-avoid">
        <h1>Tanks!</h1>
        <div class="button-row">
            <Button to="/download">Download Updater</Button>
            <Button to="/upload">Upload New Build</Button>
        </div>
    </div>
</template>

<style scoped lang="postcss">

.button-row {
    display: flex;
    flex-direction: row;
}

.container {
    width: fit-content;
    margin-left: auto;
    margin-right: auto;

    display: flex;
    flex-direction: column;
    align-items: center;

    h1 {
        font-size: 3.5em;
    /* font-family: stencil; TODO: make this work */
        color: var(--dark-green)
    }
}
</style>