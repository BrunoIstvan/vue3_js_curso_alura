<template>
  <header>
    <div class="card-content is-flex is-horizontal-center">
      <h1>
        <img src="../assets/logo.png" alt="" srcset="" />
      </h1>
    </div>

    <div class="has-text-centered">
      <button class="button" @click="changeTheme">{{ textButton }}</button>
    </div>
    
    <MenuSideBar>
      
    </MenuSideBar>

  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MenuSideBar from './MenuSideBar.vue'

export default defineComponent({
  name: "SideBar",
  emits: ["whenChangeTheme"],
  data() {
    return {
      darkModeActive: false,
    };
  },
  computed: {
    textButton () {
      if(this.darkModeActive) {
        return 'Desativar modo escuro';
      } 
      return 'Ativar modo escuro';
    }
  },
  components: {
    MenuSideBar
  },
  methods: {
    changeTheme() {
      this.darkModeActive = !this.darkModeActive;
      this.$emit("whenChangeTheme", this.darkModeActive);
    },
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