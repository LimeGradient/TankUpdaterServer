<script setup lang="ts">
import { RouterLink } from 'vue-router';

const props = defineProps({
    // @ts-ignore
    ...RouterLink.props
});
</script>

<template>
<RouterLink v-bind="$props" :to="props.to" custom v-slot="{isActive, href, navigate}">
    <button class="fancy-button" v-bind="$attrs" @click="navigate">
        <div class="content">
            <slot />
        </div>
    </button>
</RouterLink>
</template>

<style scoped lang="postcss">

.fancy-button {
    all: unset;
    
    border-radius: 6px;

    margin: 5px;

    width: 200px;
    height: 50px;

    text-align: center;

    font-size: 20px;

    background-color: rgb(73, 111, 198);

    position: relative;

    .content {
        position: relative;
        z-index: 5;
    }

    &:hover::before {
        opacity: 1;
    }

    &:active::after {
        opacity: 1;
    }

    &::before {
        position: absolute;

        height: 100%;
        width: 100%;

        top: 0px;
        left: 0px;

        content: "";
        
        border-radius: inherit;


        background-image: radial-gradient(
            500px circle at var(--mouse-x) var(--mouse-y),
            rgba(8, 10, 98, 0.15),
            transparent 40%
        );

        opacity: 0;

        transition: opacity 500ms;
    }
}
</style>