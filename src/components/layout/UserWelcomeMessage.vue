<template>
  <div class="user-welcome-message">
    Dobro došli u kviz, {{ loggedInUser }}!
  </div>
</template>
  
<script>
export default {
  props: {
    loggedInUser: {
      type: String,
      default: "",
    },
  },
};
</script>
  
  
<style scoped>
.user-welcome-message {
  color: white;
  margin-right: 10px;

}
</style>
  