<template>
  <main class="columns is-gaplessis-multiline" :class="{ 'dark-mode' : darkModeActive }">
    <div class="column is-one-quarter">
      <SideBar @whenChangeTheme="changeTheme" />
    </div>

    <div class="column is-three-quarter content">
      <Notification></Notification>
      <router-view></router-view>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SideBar from './views/components/SideBar.vue';
import Notification from './views/components/customs/Notification.vue';

export default defineComponent({
  name: "App",
  data() {
    return {
      darkModeActive: false,
    };
  },
  components: {
    SideBar,
    Notification
  },
  methods: {
    changeTheme(darkModeActive: boolean) : void {
      this.darkModeActive = darkModeActive;
    }
  },
  computed: {
    
  }
});
</script>

<style>

main {
  --bg-primary: #fff;
  --text-primary: #000;
}

main.dark-mode {
  --bg-primary: #2b2d42;
  --text-primary: #ddd;
}

.content {
  background-color: var(--bg-primary)
}
</style>
