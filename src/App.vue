<template>
  <div>
    <div class="bg"></div>
    <div class="bg bg2"></div>
    <div class="bg bg3"></div>
    <router-view />
  </div>
</template>

<script>

import TheHeader from "./components/layout/TheHeader.vue";
import Theme from "./components/learning-resources/Theme.vue";
import LoginForm from "./components/login_register/LoginForm.vue";
import ShowQuestions from "./components/questions/ShowQuestions.vue";
import animationWelcome from "./components/UI/AnimationWelcome.vue";
import Admin from "./components/Admin/Admin.vue";
import { ref, onBeforeUnmount } from 'vue';
import Sound from "./sounds/dance-with-me-152549.mp3";

export default {
  components: {
    TheHeader,
    LoginForm,
    Theme,
    ShowQuestions,
    animationWelcome,
    Admin,
  },
  data() {
    return {
      login: true,
      theme: false,
      questions: false,
    };
  },
  setup() {
    const audioElement = ref(null);
    let audioContext = null;

    onBeforeUnmount(() => {
      if (audioContext) {
        audioContext.suspend();
      }
    });

    const playAudio = () => {
      if (audioContext) {
        audioContext.resume();
      }
    };

    const initializeAudio = async () => {
      audioContext = new AudioContext();
      const response = await fetch(Sound);
      const audioData = await response.arrayBuffer();
      const audioBuffer = await audioContext.decodeAudioData(audioData);
      const sourceNode = audioContext.createBufferSource();
      sourceNode.buffer = audioBuffer;
      sourceNode.loop = true;
      sourceNode.connect(audioContext.destination);
      sourceNode.start();
    };

    window.addEventListener('click', initializeAudio, { once: true });

    return {
      audioElement,
      playAudio,
    };
  },
  created() {
    history.pushState(null, null, location.href);
    window.onpopstate = function () {
      history.go(1);
    };
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Alfa+Slab+One&display=swap");

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

body {
  background-image: url("/src/assets/img/quizCover.jpg");
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  min-height: 100vh;
}


html {
  height: 100%;
}

.bg {
  animation: slide 3s ease-in-out infinite alternate;
  background-image: linear-gradient(20deg, rgb(243, 131, 131) 50%, #fffafa 50%);
  bottom: 0;
  left: -200%;
  opacity: 0.5;
  position: fixed;
  right: -100%;
  top: 0;
  z-index: -1;
}

.bg2 {
  animation-direction: alternate-reverse;
  animation-duration: 4s;
}

.bg3 {
  animation-duration: 5s;
}

h1 {
  font-family: monospace;
}

@keyframes slide {
  0% {
    transform: translateX(-25%);
  }

  100% {
    transform: translateX(25%);
  }
}
</style>