<template>
  <animation-result class="anim"></animation-result>
  <div class="result">

    <div class="title">Your score:</div>
    <div class="desc">
      <h2>Number of questions:</h2>
      <span>{{ questions.length }}</span>
    </div>
    <div class="desc">
      <h2>True answers:</h2>
      <span>{{ totalCorrect }}</span>
    </div>
  </div>
  <div class="button">
    <button class="b1" @click="allResults">Save</button>
    <button class="b2" @click="results">All Results</button>
    <button class="b3" @click="theme">Back to Theme</button>
  </div>
</template>

<script>
import axios from "axios";
import AnimationResult from "../UI/AnimationResult.vue";
import Sound from '../../sounds/button.mp3';

export default {
  data() {
    return {
      audioElement: null
    }
  },
  mounted() {
    this.audioElement = new Audio(Sound);
  },
  components: {
    AnimationResult,
  },
  props: {
    name: String,
    totalCorrect: Number,
    questions: {
      type: Array,
      default: () => [],
    },
  },

  methods: {
    results() {
      this.playSound();
      this.$router.push("/all-results");
    },
    theme() {
      this.playSound();
      this.$router.push("/theme");
    },
    async allResults() {
      this.playSound();
      const result = {
        user_name: localStorage.getItem("loggedInUser"),
        numQuestions: this.questions.length,
        numAnswers: this.totalCorrect,
      };

      this.$emit("all-results-added", result);

      try {
        await axios.post(
          "http://134u123.e2.mars-hosting.com/project_quiz/quiz/result",
          result
        );
      } catch (error) {
        console.log(error);
      }
      this.$router.push("/all-results");
    },
    playSound() {
      this.audioElement.play();
    }
  }
};
</script>

<style scoped>
.anim {
  margin-top: 0px;
  padding-top: 0px;
}




.fade-enter-active,
.fade-leave-active {
  transition: opacity 2s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.result {
  width: 100%;
  margin-top: 35px;
}

span {
  font-size: 30px;
  font-weight: bold;
  margin-left: auto;
}

.title {
  border-radius: 10px;
  box-shadow: 5px 4px 15px rgba(0, 0, 0, 2);
  width: 100%;
  margin-top: 40px;
  padding: 20px;
  font-size: 32px;
  font-weight: bold;
  text-align: center;
  background-color: #000080;
  color: #fff;
  box-sizing: border-box;
}

.desc {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  border-radius: 10px;
  border: 5px solid #670404;
  padding: 20px;
  font-size: 18px;
  width: 100%;
  color: #000080;
  background-color: #fff;
  transition: 0.4s linear all;
  text-align: center;
}

h2 {
  font-weight: bold;
}

.res {
  margin-top: 10px;
  border-radius: 10px;
  padding: 20px;
  font-size: 18px;
  width: 100%;
  color: #53a6f9;
  background-color: #000000;
  transition: 0.4s linear all;
  text-align: center;
}

button {
  width: 200px;
  margin-top: 30px;
  margin-left: 10px;
  padding: 10px 20px;
  font-family: inherit;
  font-weight: bold;
  font-size: 18px;
  background-color: #d30f0f;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 1);
  border-radius: 30px;
  box-shadow: #0a0110;
  color: white;
  cursor: pointer;
}

.b1 {
  background-color: #01015f;
}

.b2 {
  background-color: #02028d;
}

.b3 {
  background-color: #0202c6;
}

button:hover {
  background-color: #4070d7;
  color: white;
  font-weight: bold;
}

.button {
  display: flex;
}

.results {
  text-align: start;
  padding-left: 0;
}
</style>
