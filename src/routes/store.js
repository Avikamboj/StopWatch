import { writable } from "svelte/store";

export let countDown = writable({
    second: 0,
    minute: 0,
    hour: 0,
    miliSecond: 0,
    isRunning: false,
});

export let buttonValue = writable("▶️");