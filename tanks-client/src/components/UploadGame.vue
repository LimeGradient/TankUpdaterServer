<template>
<div class="container">
    <h1>Upload</h1>

    <form>
        <label for="zip-upload">Upload</label>
        <input id="zip-upload" name="zip-upload" type="file" required accept="zip">
        
        <input id="version" name="version" type="text" required size="3" placeholder="0.0.0" pattern="^(\d+\.)?(\d+\.)?(\d+)$">
    </form>
</div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="postcss">

.container {
    width: fit-content;
    margin-left: auto;
    margin-right: auto;

    display: flex;
    flex-direction: column;
    align-items: center;
}

input[type="file"] {
    opacity: 0;
    width: 0;
}
</style>