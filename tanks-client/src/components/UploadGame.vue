<template>
<div class="container tank-avoid">
    <h1>Upload</h1>

    <form @submit.prevent="submitForm">
        <Button @click="openFilePicker">
            <span class="file-name">{{ fileName == "" ? "Upload ZIP" : fileName }}</span>
            <img src="../assets/upload.svg" class="upload-svg">
        </Button>

        <input id="zip-upload" name="zip-upload" type="file" required accept="zip" ref="zipUpload" @change="fileChange">
        
        <input id="version" name="version" type="text" required size="3" placeholder="0.0.0" pattern="^(\d+\.)?(\d+\.)?(\d+)$" v-model="version">

        <!-- <div class="break"></div> -->
        <Button class="sumbit-button" @click="submitForm">Submit</Button>
    </form>

    <div v-if="status != 'waiting'">
        <span v-if="status == 'processing'">Processing upload...</span>
        <span v-else-if="status == 'completed'">Upload complete in {{ Math.floor(time / 1000) }} seconds</span>
        <span v-else-if="status == 'error'">Upload failed.</span>
    </div>
</div>
</template>

<script setup lang="ts">
import Button from './Button.vue';

import { ref } from 'vue';

const zipUpload = ref<HTMLInputElement | null>(null);

const fileName = ref("");
const version = ref("")

const time = ref(-1);
const status = ref("waiting")

function submitForm() {
    const formData = new FormData();


    let file = zipUpload.value?.files?.item(0);
    console.log(zipUpload.value?.files?.item(0))
    if (file == undefined) return;

    file = <File>file;

    formData.append("zip", file);
    formData.append("version", version.value)

    status.value = "processing";

    fetch("/update/new-zip", {
        method: "POST",
        body: formData
    }).then((response) => {
        if (!response.ok) {
            status.value = "error";
        } else {
            status.value = "completed"
        }
        return response.json()
    }).then(response => {
        if (status.value == "completed") {
            time.value = response.time;
        }
    })

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

.file-name {
    align-self: center;
}

.upload-svg {
    width: 20px;
    aspect-ratio: 1;

    fill: var(--dark-green);

    display: inline;

    margin-left: 6px;

    /* position: relative;
    top: 50%;
    transform: translateY(-50%); */
}

.container {
    width: fit-content;
    margin-left: auto;
    margin-right: auto;

    display: flex;
    flex-direction: column;
    align-items: center;

    position: relative;
    /* z-index: 4; */
}

form {
    display: flex;

    flex-direction: row;
    align-items: stretch;

    height: 50px;

    position: relative;
    z-index: 4;

    gap: 5px;

    /* & > * {
        margin: 5px;
    } */
}

input[type="file"] {
    opacity: 0;
    width: 0;

    margin: calc(-5px / 2);
}

#version {
    all: unset;

    background-color: white;

    border-radius: 6px;

    text-align: center;
}

.break {
    flex-basis: 100%;
    height: 0px;
}
</style>