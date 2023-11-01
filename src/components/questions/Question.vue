<template>
  <timer></timer>
  <div class="questions-ctr">
    <div class="progress">
      <div
        class="bar"
        :style="{ width: `${(questionsAnswered / questions.length) * 100}%` }"
      ></div>
      <div class="status">
        {{ questionsAnswered }} out of {{ questions.length }}
      </div>
    </div>

    <div
      class="single-question"
      v-for="(question, qi) in questions"
      :key="question.q"
      v-show="questionsAnswered === qi"
    >
      <div class="question">{{ question.question }}</div>

      <answer
        v-for="answer in question.answers"
        :key="answer.text"
        :answer="answer"
        @answer-selected="selectAnswer"
      ></answer>
    </div>
  </div>
</template>

<script>
import Answer from "./Answers.vue";
import { TransitionGroup } from "vue";

export default {
  props: ["questions", "questionsAnswered"],
  emits: ["question-answered"],
  components: {
    Answer,
  },
  data() {
    return {
      loggedInUser: "",
    };
  },
  methods: {
    selectAnswer(is_correct) {
      this.$emit("question-answered", is_correct);
    },
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.questions-ctr {
  position: relative;

  width: 100%;
}

.question {
  border-radius: 50px;
  box-shadow: 5px 4px 15px rgba(0, 0, 0, 2);
  width: 100%;
  padding: 20px;
  font-size: 32px;
  font-weight: bold;
  text-align: center;
  background-color: #000080;
  color: #fff;
  box-sizing: border-box;
}

.single-question {
  position: relative;
  width: 100%;
}

.progress {
  height: 50px;
  margin-top: 10px;
  margin-bottom: 10px;
  background-color: #ddd;
  position: relative;
}

.bar {
  height: 50px;
  background-color: #009833;
  transition: all 0.5s linear;
}

.status {
  position: absolute;
  top: 5px;
  left: 0;
  text-align: center;
  color: #070707;
  width: 100%;
}
</style>
