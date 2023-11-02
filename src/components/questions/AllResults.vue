<template>
  <the-header :loggedInUser="loggedInUser"></the-header>
  <transition name="fade" mode="out-in" :key="resultData.length">
    <div class="result">
      <div class="res">
        <h1>Rang list: </h1>
        <ul class="results" v-if="resultData.length > 0">
          <li v-for="(result, index) in resultData" :key="result.user_name">
            <h4>{{ index + 1 }}) {{ result.user_name || loggedInUser }}</h4>
            <h4>{{ result.numQuestions }}</h4>
            <h4>{{ result.numAnswers }}</h4>
          </li>
        </ul>
        <button @click="startNewGame">Start New Game</button>
      </div>
    </div>
  </transition>
  <the-footer class="footer"></the-footer>

</template>

<script>
import { ref, onMounted } from "vue";
import axios from "axios";
import TheFooter from "../layout/TheFooter.vue";
import TheHeader from "../layout/TheHeader.vue";

export default {
  components: {
    TheFooter,
    TheHeader
  },
  props: {
    loggedInUser: String
  },
  methods: {
    startNewGame() {
      this.$router.push('/theme')
    }
  },
  setup() {
    const resultData = ref([]);
    const loggedInUser = ref("");

    const fetchResults = async () => {
      try {
        const response = await axios.get("http://134u123.e2.mars-hosting.com/project_quiz/quiz/result");
        resultData.value = response.data.results.sort((a, b) => b.numAnswers - a.numAnswers);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };

    const updateLoggedInUser = () => {
      loggedInUser.value = localStorage.getItem("loggedInUser") || "";
    };

    onMounted(() => {
      fetchResults();
      updateLoggedInUser();
    });

    return {
      resultData,
      loggedInUser
    };
  }
};
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 2s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

h1 {
  font-weight: bold;
}

.results li {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding: 0;
}

.results li  h4{
flex-basis: calc(35% - 10px);
font-weight: bold;
font-size: 22px;
}

span {
  font-size: 30px;
  font-weight: bold;
  margin-left: auto;
}

.res {
margin: auto;
margin-top: 50px;
border-radius: 10px;
border: 5px solid #003006;
padding: 20px;
font-size: 18px;
width: 30%;
color: #3a6703;
background-color: #ffffff;
transition: 0.4s linear all;
text-align: center;
box-shadow: 10px 10px 15px rgba(0, 0, 0, 1);
}

button {
width: 200px;
margin-top: 20px;
padding: 10px 20px;
font-family: inherit;
font-size: 20px;
font-weight: bold;
background-color: #1a8213;
border-radius: 30px;
box-shadow: #0a0110;
color: rgb(255, 255, 255);
cursor: pointer;
}
button:hover{
background-color: #3abf09;
color: rgb(2, 2, 2);
}

.results {
  text-align: start;
  padding-left: 0;
}

</style>