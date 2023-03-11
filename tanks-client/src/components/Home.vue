<script setup lang="ts">
import RouterButton from './RouterButton.vue';
</script>

<template>
    <div class="container tank-avoid">
        <h1>Tanks!</h1>
        <div class="button-row">
            <RouterButton to="/download">Download Updater</RouterButton>
            <RouterButton to="/upload">Upload New Build</RouterButton>
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
}
</style>