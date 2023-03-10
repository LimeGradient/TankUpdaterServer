<template>
    <svg id="tanks">
        <rect id="tank" :x="tankX - tankWidth" :y="tankY - tankHeight / 2" :width="tankWidth" :height="tankHeight" 
        :transform="`rotate(${tankAngle * 180 / Math.PI}, ${tankX}, ${tankY})`"></rect>
        <text x="10" y="10">{{ debug }}</text>

        <line v-for="line in lines" :x1="line.startX" :y1="line.startY" 
        :x2="line.startX + Math.cos(line.angle) * line.length"
        :y2="line.startY + Math.sin(line.angle) * line.length"></line>
    </svg>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

type Line = {
    startX: number;
    startY: number;
    angle: number;
    length: number;
}

const moveSpeed = 3;
const turnSpeed = Math.PI / 12;

const lineAngles = [
    -Math.PI / 6,
    0,
    Math.PI / 6
]

const lines = ref<Line[]>();

const debug = ref<any[]>();

const mouseX = ref(10);
const mouseY = ref(10);

const tankX = ref(100);
const tankY = ref(100);

const tankWidth = ref(50);
const tankHeight = ref(30);

const tankAngle = ref(.1);

const turnDirection = ref(0);

const deltaX = ref(0);
const deltaY = ref(0);

document.addEventListener("mousemove", mouseMove);

function mouseMove(event: MouseEvent) {
    mouseX.value = event.clientX;
    mouseY.value = event.clientY;
}

function updateTank() {
    // deltaX.value = mouseX.value - tankX.value;
    // deltaY.value = mouseY.value - tankY.value;

    // if (Math.abs(deltaX.value) < moveSpeed / 2 && Math.abs(deltaY.value) < moveSpeed / 2) {
    //     tankX.value = mouseX.value;
    //     tankY.value = mouseY.value;
    // } else {
    //     tankAngle.value = Math.atan2(deltaY.value, deltaX.value);

    //     tankX.value += Math.cos(tankAngle.value) * moveSpeed;
    //     tankY.value += Math.sin(tankAngle.value) * moveSpeed;
    // }

    const distances = lineAngles.map((val) => checkDistance(val));

    if (distances.reduce((pervious, current) => Math.min(pervious, current)) <= 100) {

        if (distances[0] > distances[2]) turnDirection.value = -1;
        else turnDirection.value = 1;

    } else {
        turnDirection.value = 0;
    }

    console.log(turnDirection.value)

    tankAngle.value += turnSpeed * turnDirection.value;

    tankX.value += Math.cos(tankAngle.value) * moveSpeed;
    tankY.value += Math.sin(tankAngle.value) * moveSpeed;

    debug.value = [...distances, turnDirection.value]

    drawLines();
}

function drawLines() {

    lines.value = lineAngles.map((val) => {return line(val)});
}

function line(angleOffset: number): Line  {
    return {
        startX: tankX.value,
        startY: tankY.value,
        angle: tankAngle.value + angleOffset,
        length: checkDistance(angleOffset)
    }
}

setInterval(updateTank, 10)

function linesIntersect(x1: number, y1: number, x2: number, y2: number, 
        x3: number, y3: number, x4: number, y4: number): number | undefined {
    const determinant = (x2 - x1) * (y4 - y3) - (x4 - x3) * (y2 - y1);

    if (determinant == 0) return;

    const lambda = ((y4 - y3) * (x4 - x1) + (x3 - x4) * (y4 - y1)) / determinant;
    const gamma = ((y1 - y2) * (x4 - x1) + (x2 - x1) * (y4 - y1)) / determinant;

    if (!(0 <= lambda && lambda <= 1 && 0 <= gamma && gamma <= 1)) return;

    return Math.sqrt(lambda * (x2 - x1) * lambda * (x2 - x1) + lambda * (y2 - y1) * lambda * (y2 - y1));
}

function checkDistance(angle: number = 0, x: number = tankX.value, y: number = tankY.value): number {
    angle += tankAngle.value;

    let distance = Number.MAX_VALUE;

    angle %= 2 * Math.PI;
    angle = (angle + 2 * Math.PI) % (2 * Math.PI);

    angle = angle > Math.PI ? angle - 2 * Math.PI : angle;

    const angleTL = Math.atan2(-y, -x);
    const angleTR = Math.atan2(-y, window.innerWidth - x);
    const angleBR = Math.atan2(window.innerHeight - y, window.innerWidth - x);
    const angleBL = Math.atan2(window.innerHeight - y, -x);
    // section order:
    //         1
    //    -----------
    //   |           | 
    // 0 |           | 2
    //   |           | 
    //    -----------
    //         3

    let section = 0;

    if (angle > angleTL && angle <= angleTR) section = 1;
    if (angle > angleTR && angle <= angleBR) section = 2;
    if (angle > angleBR && angle <= angleBL) section = 3;

    // alert(`${angleTL}, ${angleTR}, ${angleBR}, ${angleBL}`)

    switch (section) {
        case 0:
            distance = -x / Math.cos(angle);
            break;
        case 1:
            distance = -y / Math.sin(angle);
            break;
        case 2:
            distance = (innerWidth - x) / Math.cos(angle);
            break;
        case 3: 
            distance = (innerHeight - y) / Math.sin(angle);
            break;
        default:
            break;
    }

    const elements = document.getElementsByClassName("tank-avoid");

    const boundingBoxes = Array.from(elements).map((el) => el.getBoundingClientRect());

    boundingBoxes.forEach((rect) => {
        const otherPosX = x + Math.cos(angle) * distance;
        const otherPosY = y + Math.sin(angle) * distance;

        const lines = [
            [rect.left, rect.top, rect.right, rect.top],
            [rect.right, rect.top, rect.right, rect.bottom],
            [rect.right, rect.bottom, rect.left, rect.bottom],
            [rect.left, rect.bottom, rect.left, rect.top]
        ]

        lines.forEach((line) => {
            const newDistance = linesIntersect(x, y, otherPosX, otherPosY, line[0], line[1], line[2], line[3]);

            if (newDistance == undefined) return;

            distance = Math.min(distance, newDistance)
        })
    })

    return distance;
}

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

line { 
    stroke: red;
}
</style>