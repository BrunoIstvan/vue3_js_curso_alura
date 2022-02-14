<template>
  <div class="is-flex is-align-items-center is-justify-content-space-between">
    <CustomCron :timeInSeconds="timeInSeconds" />

    <CustomButton @whenClicked="play" :disable="runningCron || disableButtons" icon="fas fa-play" text="play" />
    <CustomButton @whenClicked="stop" :disable="!runningCron || disableButtons" icon="fas fa-stop" text="stop" />

  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CustomCron from "../customs/CustomCron.vue"
import CustomButton from "../customs/CustomButton.vue"

export default defineComponent({
  name: "CustomTimer",
  emits: ['whenFinishedTimer'],
  components: {
    CustomCron,
    CustomButton
  },
  props: {
    disableButtons: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      timeInSeconds: 0,
      cron: 0,
      runningCron: false
    };
  },
  methods: {
    play() {
      this.runningCron = true
      this.cron = setInterval(() => {
        this.timeInSeconds++
      }, 1000)
    },

    stop() {
      this.runningCron = false
      clearInterval(this.cron)
      this.$emit('whenFinishedTimer', this.timeInSeconds)
      this.timeInSeconds = 0 
    },
  },
});
</script>