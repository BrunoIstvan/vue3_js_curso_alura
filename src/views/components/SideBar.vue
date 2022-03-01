<template>
  <header>
    <div class="card-content is-flex is-horizontal-center">
      <h1>
        <img src="../../assets/logo.png" alt="" srcset="" />
      </h1>
    </div>

    <div class="has-text-centered">
      <button class="button" @click="changeTheme">{{ textButton }}</button>
    </div>

    <MenuSideBar> </MenuSideBar>
  </header>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import MenuSideBar from "./MenuSideBar.vue";

export default defineComponent({
  name: "SideBar",
  emits: ["whenChangeTheme"],

  components: {
    MenuSideBar,
  },
  computed: {
    textButton() {
      if (this.darkModeActive) {
        return "Desativar modo escuro";
      }
      return "Ativar modo escuro";
    },
  },
  setup(props, { emit }) {
    const darkModeActive = ref(false);

    const changeTheme = () => {
      darkModeActive.value = !darkModeActive.value;
      emit("whenChangeTheme", darkModeActive.value);
    };

    return {
      darkModeActive,
      changeTheme,
    };
  },
});
</script>

<style scoped>
header {
  padding: 1rem;
  background: #0d3b66;
  width: 100%;
  height: 100vh;
  /* text-align: center; */
}
@media only screen and (max-width: 768px) {
  header {
    padding: 2.5rem;
    height: auto;
  }
}
.is-horizontal-center {
  justify-content: center;
}
</style>