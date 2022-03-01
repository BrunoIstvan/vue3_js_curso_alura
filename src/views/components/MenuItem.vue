<template>
  <li>
    <router-link :to="to" class="link">
      <i :class="icon"></i> {{ text }}
    </router-link>
  </li>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "MenuItem",
  props: {
    to: {
      type: String,
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
});
</script>

<style scoped>

.link {
    color: #fff;
}

.link:hover {
    color: #e3f192;
}

.link.router-link-active {
    color: #a8beee;
    font-weight: bold;
}

</style>