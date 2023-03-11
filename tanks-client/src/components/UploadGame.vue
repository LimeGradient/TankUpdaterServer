<template>
<div class="container tank-avoid">
    <h1>Upload</h1>

    <form>
        <label for="zip-upload">
            <img src="../assets/upload.svg" class="upload-svg">
        </label>
        <input id="zip-upload" name="zip-upload" type="file" required accept="zip">
        
        <input id="version" name="version" type="text" required size="3" placeholder="0.0.0" pattern="^(\d+\.)?(\d+\.)?(\d+)$">
        <Button @click="submitForm">Submit</Button>
    </form>
</div>
</template>

<script setup lang="ts">
import Button from './Button.vue';

function submitForm() {
    console.log("boo")
}
</script>

<style scoped lang="postcss">

.upload-svg {
    width: 20px;
    aspect-ratio: 1;
}

.container {
    width: fit-content;
    margin-left: auto;
    margin-right: auto;

    display: flex;
    flex-direction: column;
    align-items: center;

    position: relative;
    z-index: 4;
}

input[type="file"] {
    opacity: 0;
    width: 0;
}
</style>