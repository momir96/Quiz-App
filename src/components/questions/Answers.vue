<template>
  <transition name="fade" mode="out-in">
    <div class="answer" :class="{ 'is-answered': isAnswered }" @click="selectAnswer">
      {{ answer.text }}
    </div>
  </transition>
</template>

<script>
import { TransitionGroup } from "vue";
import Sound from '../../sounds/button.mp3';

export default {
  components: { TransitionGroup },
  props: ['answer'],
  data() {
    return {
      audioElement: null
    };
  },
  mounted() {
    this.audioElement = new Audio(Sound);
  },
  methods: {
    selectAnswer() {
      this.playSound();
      this.$emit('answer-selected', this.answer.is_correct);
    },
    playSound() {
      this.audioElement.play();
    }
  }
};
</script>
  
<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 2s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.answer {
  border-radius: 30px;
  border: 5px solid #090909;
  padding: 20px;
  margin-top: 10px;
  font-size: 22px;
  font-weight: bold;
  width: 100%;
  background-color: #ed0d0d;
  transition: 0.2s linear all;
  color: rgb(255, 255, 255);
}




.answer span {
  display: inline-block;
  margin-left: 5px;
  font-size: 0.75em;
  font-style: italic;
}

.answer:not(.is-answered) {
  cursor: pointer;
}

.answer:not(.is-answered):hover {
  background-color: orange;
  border-color: #6b0000;
  color: #0c0c0c;
}


.answer:not(.is-answered) {
  cursor: pointer;
}

.answer:not(.is-answered):hover {
  background-color: #f59289;
  border-color: #6b0000;
  color: #0c0c0c;
}
</style>
  