<template>
    <svg id="tanks">
        <rect id="tank" :x="tankX - tankWidth" :y="tankY - tankHeight / 2" :width="tankWidth" :height="tankHeight" 
        :transform="`rotate(${tankAngle * 180 / Math.PI}, ${tankX}, ${tankY})`"></rect>
        <!-- <text x="10" y="10">{{ deltaX }}, {{ deltaY }}, {{ tankAngle * 180 / Math.PI }}</text> -->
    </svg>
</template>

<script setup lang="ts">
import { ref } from '@vue/reactivity';

const moveSpeed = 10;

const mouseX = ref(10);
const mouseY = ref(10);

const tankX = ref(0);
const tankY = ref(0);

const tankWidth = ref(50);
const tankHeight = ref(30);

const tankAngle = ref(10);

const deltaX = ref(0);
const deltaY = ref(0);

document.addEventListener("mousemove", mouseMove);

function mouseMove(event: MouseEvent) {
    mouseX.value = event.clientX;
    mouseY.value = event.clientY;
}

function updateTank() {
    deltaX.value = mouseX.value - tankX.value;
    deltaY.value = mouseY.value - tankY.value;

    if (Math.abs(deltaX.value) < moveSpeed && Math.abs(deltaY.value) < moveSpeed) {
        tankX.value = mouseX.value;
        tankY.value = mouseY.value;
        return;
    }

    tankAngle.value = Math.atan2(deltaY.value, deltaX.value);

    tankX.value += Math.cos(tankAngle.value) * moveSpeed;
    tankY.value += Math.sin(tankAngle.value) * moveSpeed;
}

setInterval(updateTank, 10)

</script>

<style lang="postcss" scoped>
#tanks {
    width: 100%;
    height: 100%;

    position: absolute;
    top: 0px;
    left: 0px;

    /* z-index: -1; */
}

#tank {
    fill: var(--dark-green);
}

text {
    fill: red
}
</style>