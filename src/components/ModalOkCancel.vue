<template>
  <div class="modal" :class="{ 'is-active': activeModal }">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">{{ title }}</p>
        <button class="delete" aria-label="close" @click="close"></button>
      </header>
      <section class="modal-card-body">
        <slot></slot>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success" @click="save">{{ okText }}</button>
        <button class="button" @click="close">{{ cancelText }}</button>
      </footer>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ModalOkCancel",
  
  emits: ['whenCloseModal', 'whenClickOk'],
  props: {
    content: {
      type: String,
      default: "Conteúdo",
    },
    title: {
      type: String,
      default: "Título",
    },
    okText: {
      type: String,
      default: "Salvar",
    },
    cancelText: {
      type: String,
      default: "Cancelar",
    },
    activeModal: {
        type: Boolean,
        default: true
    }
  },
  methods: {
    save() {
      this.$emit('whenClickOk');
    },
    close() {
      console.log("Clicou em fechar");
      this.$emit('whenCloseModal');
    },
  },
});
</script>