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
        background: "rgb(110, 139, 227)",
      },
    };
  },
});
</script>

