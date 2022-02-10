<template>
  <div class="box has-text-weight-bold" :style="styleBox">
      <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "CustomBox",
  data() {
      return {
          styleBox: {
              background: "#faf0ca"
          }
      }
  }
});
</script>

