<template>
  <div class="is-flex is-align-items-center is-justify-content-space-between">
    <CustomCron :timeInSeconds="timeInSeconds" />

    <CustomButton
      @whenClicked="play"
      :disable="runningCron || disableButtons"
      icon="fas fa-play"
      text="play"
    />
    <CustomButton
      @whenClicked="stop"
      :disable="!runningCron || disableButtons"
      icon="fas fa-stop"
      text="stop"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import CustomCron from "../customs/CustomCron.vue";
import CustomButton from "../customs/CustomButton.vue";

export default defineComponent({
  name: "CustomTimer",
  emits: ["whenFinishedTimer"],
  components: {
    CustomCron,
    CustomButton,
  },
  props: {
    disableButtons: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, { emit }) {
    const timeInSeconds = ref(0);
    const cron = ref(0);
    const runningCron = ref(false);

    const play = () => {
      runningCron.value = true;
      cron.value = setInterval(() => {
        timeInSeconds.value++;
      }, 1000);
    };

    const stop = () => {
      runningCron.value = false;
      clearInterval(cron.value);
      emit("whenFinishedTimer", timeInSeconds.value);
      timeInSeconds.value = 0;
    };

    return {
      timeInSeconds,
      cron,
      runningCron,
      play,
      stop,
    };
  },
});
</script>