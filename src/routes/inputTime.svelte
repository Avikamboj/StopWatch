<script lang="ts">
    import { countDown, buttonValue } from "./store";
    import { get } from "svelte/store";

    let isRunning = false;

    function toggleButton() {
        if (get(buttonValue).valueOf() === "▶️") {
            buttonValue.set("⏸️");
            startTimer();
        } else {
            buttonValue.set("▶️");
            stopTimer();
        }
    }

    function startTimer() {
        isRunning = true;
        countDown.update((timer) => {
            timer.isRunning = true;
            return timer;
        });

        incrementTime();
    }

    function stopTimer() {
        isRunning = false;
        countDown.update((timer) => {
            timer.isRunning = false;
            return timer;
        });
    }

    function resetTimer() {
        isRunning = false;
        countDown.update((timer) => {
            timer.isRunning = false;
            timer.miliSecond = 0;
            timer.second = 0;
            timer.minute = 0;
            timer.hour = 0;
            return timer;
        });
        buttonValue.set("▶️");
    }

    function incrementTime() {
        if (!isRunning) return;

        countDown.update((timer) => {
            timer.miliSecond++;

            if (timer.miliSecond >= 100) {
                timer.miliSecond = 0;
                timer.second++;
            }

            if (timer.second >= 60) {
                timer.second = 0;
                timer.minute++;
            }

            if (timer.minute >= 60) {
                timer.minute = 0;
                timer.hour++;
            }

            return timer;
        });

        setTimeout(incrementTime, 8);
    }
</script>

<div class="stopWatch">
    <h1>Stop Watch</h1>
    <div class="time">
        <p>
            {$countDown.hour}:{$countDown.minute}:{$countDown.second}:{$countDown.miliSecond}
        </p>
    </div>
    <div class="btns">
        <button type="button" on:click={toggleButton}>{$buttonValue}</button>
        <button type="button" on:click={resetTimer}>❌</button>
    </div>
</div>

<style>
    .stopWatch {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;
        font-size: 2em;
    }

    .time {
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        padding: 10px;
        font-size: 1.5em;
        width: 150px;
    }

    button {
        padding: 10px;
        border: none;
        background: none;
        cursor: pointer;
        font-size: 1.2em;
    }

    .btns button:nth-child(2) {
        font-size: 1.1em;
    }

    .btns {
        display: flex;
        gap: 100px;
    }
</style>
