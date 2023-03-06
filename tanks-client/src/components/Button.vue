<script setup lang="ts">
import { RouterLink } from 'vue-router';

const props = defineProps({
    // @ts-ignore
    ...RouterLink.props
});
</script>

<template>
<RouterLink v-bind="$props" :to="props.to" custom v-slot="{isActive, href, navigate}">
    <button v-bind="$attrs" @click="navigate">
        <slot />
    </button>
</RouterLink>
</template>

<style scoped>
button {
    all: unset;

    border-radius: 6px;
    border: 2px solid rgba(255, 252, 248, .3);

    margin: 5px;

    width: 200px;
    height: 50px;

    background-color: #14104d;

    text-align: center;

    font-size: 20px;
}
</style>