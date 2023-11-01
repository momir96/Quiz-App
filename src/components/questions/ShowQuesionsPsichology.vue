<template>
    <the-header></the-header>
    <div v-if="questionsAnswered < questions.length">
      <question-animation></question-animation>
    </div>
  <div>
    <transition-group name="fade" mode="out-in">
      <div class="ctr">
        <question
          v-if="questionsAnswered < questions.length"
          :questions="questions"
          :questionsAnswered="questionsAnswered"
          @question-answered="questionAnswered"
        ></question>
        <result v-else :results="results" :totalCorrect="totalCorrect" :questions="questions"></result>
  
        <button type="button" class="reset-btn" @click.prevent="reset">
          Reset
        </button>
      </div>
    </transition-group>
  </div>
  <the-footer class="footer"></the-footer>
  <timer ref="timer"></timer>
</template>
  
<script>
import axios from "axios";
import QuestionAnimation from "../UI/QuestionAnimation.vue";
import Question from "./Question.vue";
import Result from "./Result.vue";
import TheHeader from "../layout/TheHeader.vue";
import TheFooter from "../layout/TheFooter.vue";
import Timer from "./Timer.vue";
import Sound from '../../sounds/button.mp3';


export default {
  components: {
    Question,
    Result,
    QuestionAnimation,
    TheHeader,
    TheFooter,
    Timer,
  },
  methods: {

    playSound() {
      this.audioElement.play();
    },
    questionAnswered(is_correct) {
      if (is_correct) {
        this.totalCorrect++;
      }

      this.questionsAnswered++;
    },
    reset() {
      this.playSound()
      this.questionsAnswered = 0;
      this.totalCorrect = 0;
      this.$router.push("/theme");
    },
    async fetchQuestions() {
      try {
        const response = await axios.get(
          "http://134u123.e2.mars-hosting.com/project_quiz/quiz/psychology"
        );
        const questionsData = await response.data;
        console.log(questionsData);

        this.questions = questionsData.questions.map((question, index) => {
          return {
            id: index + 1,
            question: question.q,
            answers: question.answers.map((answer, answerIndex) => {
              return {
                id: answerIndex + 1,
                text: answer.text,
                is_correct: answer.is_correct === 1,
              };
            }),
          };
        });
      } catch (e) {
        console.error(e);
      }
    },
  },
  mounted() {
    this.fetchQuestions();
    this.$refs.timer.startCountdown();
    this.audioElement = new Audio(Sound);

  },
  watch: {
    "$route.path": function (newPath) {
      if (newPath === "/theme") {
        this.showTimer = true;
      } else {
        this.showTimer = false;
      }
    },
  },

  data() {
    return {
      login: false,
      questionsAnswered: 0,
      audioElement: null,
      totalCorrect: 0,
      questions: [],
      results: [
        {
          min: 0,
          max: 2,
          title: "Try again!",
          desc: "Do a little more studying and you may succeed!",
        },
        {
          min: 3,
          max: 3,
          title: "Wow, you're a genius!",
          desc: "Studying has definitely paid off for you!",
        },
      ],
      showTimer: false,
    };
  },
};
</script>

  
<style scope>
@import url("https://fonts.googleapis.com/css2?family=Alfa+Slab+One&display=swap");

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.footer {
  position: fixed;
}

.ctr {
  margin: 0 auto;
  margin-top: 50px;
  max-width: 600px;
  width: 100%;
  box-sizing: border-box;
  position: relative;
}

.fade-enter-from {
  opacity: 0;
}
.fade-enter-active {
  transition: all 0.3s linear;
}
.fade-leave-active {
  transition: all 0.3s linear;
  opacity: 0;
  position: absolute;
}
.fade-leave-to {
  opacity: 0;
}

.reset-btn {
  background-color: #de1616;
  box-shadow: 5px 4px 15px rgba(0, 0, 0, 2);
  border-radius: 30px;
  font-size: 22px;
  font-weight: bold;
  color: #fff;
  padding: 10px 25px;
  margin: 10px auto;
  display: block;
}

.reset-btn:active,
.reset-btn:focus,
.reset-btn:hover {
  border: 0;
  outline: 0;
  background-color: #670404;
  color: white;
}
</style>