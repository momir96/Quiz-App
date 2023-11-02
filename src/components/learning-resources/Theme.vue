<template>
  <the-header></the-header>
  <choose-quiz-animation class="anim"></choose-quiz-animation>
  <div>
    <show-all-themes :themes="themes"></show-all-themes>
  </div>
  <the-footer class="footer"></the-footer>
</template>

<script>
import axios from "axios";
import ShowAllThemes from "./ShowAllThemes.vue";
import TheHeader from '../layout/TheHeader.vue';
import ChooseQuizAnimation from '../UI/ChooseQuizAnimation.vue';
import TheFooter from '../layout/TheFooter.vue';
export default {
  components: {
    ShowAllThemes,
    TheHeader,
    ChooseQuizAnimation,
    TheFooter,
  },
  data() {
    return {
      themes: [],
      selectedTab: "",
      loggedInUser: ""
    };
  },
  methods: {
    async loadThemes() {
      try {
        const response = await axios.get("http://134u123.e2.mars-hosting.com/project_quiz/quiz/theme?sid=" + localStorage.getItem("sid"));

        const themesData = response.data.theme;
        console.log(themesData);

        this.themes = themesData.map((theme, index) => {
          return {
            id: index + 1,
            title: theme
          };
        });
      } catch (error) {
        console.error(error);
      }
    },
    setSelectedMethod(tab) {
      this.selectedTab = tab;
    },
  },
  mounted() {
    this.loadThemes();
  },
  provide() {
    return {
      resources: this.themes
    };
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Alfa+Slab+One&display=swap");

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.anim {
  margin-top: 20px;
}
</style>