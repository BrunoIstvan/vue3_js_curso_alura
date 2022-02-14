<template>
  <div class="notification">
    <article class="message"
      :class="context[not.type]"
     v-for="not in notifications" :key="not.id">
      <div class="message-header">
        <p>{{ not.title }}</p>
      </div>
      <div class="message-body">
        {{ not.text }}
      </div>
    </article>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStoreX } from "../../store";
import { TypeNotification } from '../../interfaces/INotification'


export default defineComponent({
  name: "Notification",

  data() {
    return {
      context: {
        [TypeNotification.SUCCESS]: 'is-success',
        [TypeNotification.WARNING]: 'is-warning',
        [TypeNotification.ERROR]: 'is-danger',
      }
    }
  },

  setup() {
    const store = useStoreX();
    return {
      notifications: computed(() => store.state.notifications)
    }
  }

});
</script>

<style scoped>
.notification {
    position: absolute;
    right: 0;
    width: 300px;
    padding: 8px;
    z-index: 100;

  background: var(--bg-primary);

}


</style>