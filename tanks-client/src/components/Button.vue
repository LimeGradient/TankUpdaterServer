<script setup lang="ts">
import { RouterLink } from 'vue-router';

const props = defineProps({
    // @ts-ignore
    ...RouterLink.props
});
</script>

<template>
<RouterLink v-bind="$props" :to="props.to" custom v-slot="{isActive, href, navigate}">
    <div class="fancy-button-container" @click="navigate">
        <div class="fancy-button-border" @click="navigate"></div>
        <button class="fancy-button" v-bind="$attrs" @click="navigate">
            <slot />
        </button>
    </div>
</RouterLink>
</template>

<style scoped lang="postcss">

button {
    all: unset;

    width: calc(100% - 2px);
    height: calc(100% - 2px);

    border-radius: inherit;

    position: relative;
    top: 1px;
    left: 2px;

    z-index: 2;

    text-align: center;

    font-size: 20px;

    background-color: rgb(23, 20, 78);
}

.fancy-button-container {
    border-radius: 6px;

    margin: 5px;

    width: 200px;
    height: 50px;

    background-color: rgba(94, 92, 193, 0.5);

    position: relative;

    &:hover::before {
        opacity: 1;
    }

    &::before, .fancy-button-border {
        position: absolute;

        height: 100%;
        width: 100%;

        top: 0px;
        left: 0px;

        content: "";
        
        border-radius: inherit;

        opacity: 0;

        transition: opacity 500ms;
    }

    &::before {
        background-image: radial-gradient(
            800px circle at var(--mouse-x) var(--mouse-y),
            rgba(255, 255, 255, .06),
            transparent 40%
        );

        z-index: 3;
    }

    .fancy-button-border {
        background-image: radial-gradient(
            400px circle at var(--mouse-x) var(--mouse-y),
            rgba(255, 255, 255, .2),
            transparent 40%
        );

        z-index: 1;
    }
}
</style>

<style lang="postcss">
.button-row:hover > .fancy-button-container > .fancy-button-border {
    opacity: 1;
}
</style>