<template>
  <button class="button" @click="whenClicked" :disabled="disable">
    <span class="icon">
      <i :class="icon"></i>
    </span>
    <span>{{ text }}</span>
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "CustomButton",
  emits: ["whenClicked"],
  props: {
    disable: {
      type: Boolean,
    },
    text: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
  },
  methods: {
    whenClicked(): void {
      this.$emit("whenClicked");
    },
  },
});
</script>