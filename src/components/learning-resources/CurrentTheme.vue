<template>
  <li>
    <div :style="backgroundImageStyle">
      <header>
        <h3>{{ title }}</h3>
        <router-link :to="getQuestionsForTheme">
          <base-button mode="flat">Start Quiz</base-button>
        </router-link>
      </header>

      <p>{{ description }}</p>
    </div>
  </li>
</template>

<script>
import BaseButton from '../UI/BaseButton.vue';
import geografijaImage from '@/assets/img/background-cool-geography.jpg';
import istorijaImage from '@/assets/img/history-background.jpg';
import psihologijaImage from '@/assets/img/psyhol.webp';
import allQuestionImage from '@/assets/img/question.jpg';



export default {
  components: {
    BaseButton
  },
  props: {
    loggedInUser: {
      type: String,
      required: true
    },
    id: Number,
    title: String
  },
  computed: {
    getQuestionsForTheme() {
      if (this.title === 'Geography') {
        return '/geography'
      } else if (this.title === 'History') {
        return '/history'
      } else if (this.title === 'Psychology') {
        return '/psychology'
      } else if (this.title === 'All Themes')
        return '/question'
    },

    backgroundImageStyle() {
      if (this.title === 'Geography') {
        return { 'background-image': `url(${geografijaImage})` };
      } else if (this.title === 'History') {
        return { 'background-image': `url(${istorijaImage})` };
      } else if (this.title === 'Psychology') {
        return { 'background-image': `url(${psihologijaImage})` };
      } else if (this.title === 'All Themes') {
        return { 'background-image': `url(${allQuestionImage})` };
      }
    }
  }
}

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Alfa+Slab+One&display=swap');

li {
  margin: auto;
  margin-top: 0px;
  max-width: 800px;
  border-radius: 50px;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white
}



h3 {
  font-size: 1.25rem;
  padding-left: 20px;
  margin: 0.5rem 0;
  font-weight: bold;
}

p {
  margin: 0.5rem 0;
}

a {
  text-decoration: none;
}

div {
  border-radius: 50px;
  box-shadow: 10px 10px 10px rgba(8, 8, 8, 0.8);
  border: 5px solid rgb(128, 3, 3);
  padding: 20px 0;
  margin-bottom: 1rem ;
  max-width: 40rem;
  background-size: cover;
  background-position: center;
  height: 100px;
}
</style>