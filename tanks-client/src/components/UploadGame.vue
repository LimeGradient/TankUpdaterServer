<template>
<div class="container tank-avoid">
    <h1>Upload</h1>

    <form @submit.prevent="submitForm">
        <Button @click="openFilePicker">
            <span class="file-name">{{ fileName == "" ? "Upload ZIP" : fileName }}</span>
            <img src="../assets/upload.svg" class="upload-svg">
        </Button>
        <input id="zip-upload" name="zip-upload" type="file" required accept="zip" ref="zipUpload" @change="fileChange">
        
        <input id="version" name="version" type="text" required size="3" placeholder="0.0.0" pattern="^(\d+\.)?(\d+\.)?(\d+)$">
        <Button @click="submitForm">Submit</Button>
    </form>
</div>
</template>

<script setup lang="ts">
import Button from './Button.vue';

import { ref } from 'vue';

const zipUpload = ref<HTMLInputElement | null>(null);

const fileName = ref("");

function submitForm() {
    console.log("boo")

    return false;
}

function openFilePicker() {
    zipUpload.value?.click();
}

function fileChange() {
    const name = zipUpload.value?.files?.item(0)?.name;

    fileName.value = name == undefined ? fileName.value : name;
}
</script>

<style scoped lang="postcss">

.upload-svg {
    width: 20px;
    aspect-ratio: 1;

    fill: var(--dark-green);

    margin-left: 6px
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