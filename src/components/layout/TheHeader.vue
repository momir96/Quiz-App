<template>
  <header :loggedInUser="loggedInUser" :isUserLoggedIn="isUserLoggedIn" @userLoggedIn="handleUserLoggedIn">
    <img src="../../assets/img/logo.png" alt="Logo" class="logo" />

    <div class="msg">
      <span class="welcome" v-if="isUserLoggedIn && !isUserLoggedInViaSignup">
        <h3>Welcome, {{ loggedInUser }}!</h3>
      </span>
    </div>

    <ul class="tags">
      <li><router-link to="/theme" class="tag">HOME</router-link></li>
      <li><router-link to="/all-results" class="tag">RESULTS</router-link></li>
      <li>
        <router-link to="/login" class="tag" @click="logout">LOGOUT</router-link>
      </li>
      <li v-if="isAdmin">
        <router-link to="/admin" class="tag">ADMIN</router-link>
      </li>
    </ul>
  </header>
</template>

<script>
export default {
  data() {
    return {
      isUserLoggedIn: false,
      isUserLoggedInViaSignup: false,
      loggedInUser: "",
      isAdmin: false,
    };
  },

  mounted() {
    this.updateLoggedInUser();
  },

  methods: {
    updateLoggedInUser() {
      console.log("Updating logged in user");
      console.log(
        "Checking isAdmin:",
        localStorage.getItem("isAdmin") === "true"
      );

      const storedUser = localStorage.getItem("loggedInUser");
      console.log("Stored User:", storedUser);

      if (storedUser) {
        this.loggedInUser = localStorage.getItem("loggedInUser") || "";
        this.isUserLoggedIn = true;
        this.isUserLoggedInViaSignup =
          localStorage.getItem("loggedInUserViaSignup") === "true";
        this.isAdmin = localStorage.getItem("isAdmin") === "true";
      } else {
        this.loggedInUser = "";
        this.isUserLoggedIn = false;
        this.isUserLoggedInViaSignup = false;
        this.isAdmin = false;
      }
    },

    handleUserLoggedIn(userName) {
      console.log("User logged in:", userName);
      this.loggedInUser = userName;
      this.isUserLoggedIn = true;
      this.isUserLoggedInViaSignup = false;
      localStorage.setItem("loggedInUser", userName);

      this.isAdmin = userName.toLowerCase() === "admin";
      console.log("isAdmin:", this.isAdmin);

      console.log("Handle user logged in called");

      if (this.isAdmin) {
        localStorage.setItem("isAdmin", "true");
      } else {
        localStorage.removeItem("isAdmin");
        this.isAdmin = false;
      }
      console.log("isAdmin in localStorage:", localStorage.getItem("isAdmin") === "true");
      this.$router.replace({ name: "Theme" });
    },

    logout() {
      console.log("User logged out");
      console.log("Setting isAdmin to false");
      this.isAdmin = false;

      this.loggedInUser = "";
      localStorage.removeItem("loggedInUser");
      localStorage.removeItem("loggedInUserViaSignup");
      localStorage.removeItem("isAdmin");
    },
  },
};



</script>
<style scoped>
header {
  width: 100%;
  height: 4rem;
  background-color: #d40808;
  border-bottom: 1px solid #090202;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.8);
  margin: 0 auto;
  padding: 0;
}

.msg {
  display: inline-block;
  color: #eee;
  font-size: 25px;
  margin: 0 auto;

}

h3 {
  font-weight: bold;
}

.logo {
  margin-left: 10px;
  height: 63px;
  border-radius: 20px;
}

header h1 {
  color: white;
  margin: 0;
}

.tags {
  list-style: none;
  margin: 0;
  overflow: hidden;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-left: auto;
}

span {
  margin: 0 auto;
}

.tag {
  background: #eee;
  border-radius: 30px;
  color: #000000;
  display: inline-block;
  height: 40px;
  width: 150px;
  font-weight: bold;
  line-height: 40px;
  padding: 0 20px 0 23px;
  margin: 0 10px 10px 0;
  text-decoration: none;
  -webkit-transition: color 0.2s;
}

.tag:first-child {
  margin-left: auto;
}

.tag:hover {
  background-color: rgb(56, 5, 5);
  color: #ffffff;
  height: 40px;
  width: 150px;
}

.tag:hover::after {
  border-left-color: rgb(112, 3, 3);
}

.welcome-message {
  color: white;
  margin-right: 10px;
}
</style>