<script setup lang="ts">
import { RouterLink } from 'vue-router';
import Button from './Button.vue';

const props = defineProps({
    // @ts-ignore
    ...RouterLink.props
})
</script>

<template>
<RouterLink v-bind="$props" :to="props.to" custom v-slot="{navigate}">
    <Button @click="navigate">
        <slot />
    </Button>
</RouterLink>
</template>