<script setup lang="ts">
import Button from './Button.vue';
</script>

<template>
    <div class="container">
        <h1>Tanks!</h1>
        <div>
            <Button to="/download">Download Updater</Button>
            <Button to="/upload">Upload New Build</Button>
        </div>
    </div>
</template>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>