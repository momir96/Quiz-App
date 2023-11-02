<template>
  <ul>
    <div>
      <transition-group name="fade" mode="out-in">
        <current-theme v-for="theme in themes" :key="theme.id" :title="theme.title">
        </current-theme>
      </transition-group>
    </div>
  </ul>
</template>

<script>
import axios from "axios";
import CurrentTheme from "./CurrentTheme.vue";
import { TransitionGroup } from "vue";

export default {
  props: {
    themes: Array,
  },
  components: {
    CurrentTheme,
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 10px;
  margin: auto;
  max-width: 40rem;
}



.fade-enter-active,
.fade-leave-active {
  transition: opacity 2s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>