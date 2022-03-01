<template>
  <section>
    <span class="icon">
      <i class="fas fa-clock"></i>
    </span>
    <strong :class="display">{{ elapsedTime }}</strong>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "CustomCron",
  props: {
      timeInSeconds: {
          type: Number,
          default: 0
      },
      display: {
        type: String,
        default: 'display'
      }
  },
  computed: {
    elapsedTime(): string {
      return new Date(this.timeInSeconds * 1000).toISOString().substr(11, 8);
    },
  },
});
</script>

<style scoped>
.display {
  color: var(--text-primary);
}
.normal {
  color: #000
}
</style>