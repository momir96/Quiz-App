<template>
  <animation-welcome class="anim"></animation-welcome>
  <div class="login">
    <div class="login-container">
      <h2 class="login-heading">LOGIN</h2>
      <div class="login-form" :class="{ active: showForm }" ref="form">
        <div class="form-group">
          <label for="email"></label>
          <input type="text" v-model="email" :class="{ error: emailError }" @input="validateEmail"
            @keydown="handleKeyDown" placeholder="Email" required />
          <p v-if="emailError" class="error">{{ emailError }}</p>
        </div>

        <div class="form-group">
          <label for="password"></label>
          <input type="password" v-model="password" :class="{ error: passwordError }" @input="validatePassword"
            @keydown="handleKeyDown" placeholder="Password" required />
          <p v-if="passwordError" class="error">{{ passwordError }}</p>
        </div>

        <button @click="submit()" class="btn">Log in</button>
      </div>
      <router-link to="/signup">
        <span class="signup-link">Signup</span>
      </router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import AnimationWelcome from "../UI/AnimationWelcome.vue";
export default {
  components: {
    AnimationWelcome,
  },
  data() {
    return {
      showForm: false,
      email: "",
      password: "",
      emailError: "",
      passwordError: "",
      loggedInUser: "",
      isAdmin: false,
    };
  },
  methods: {
    handleKeyDown(event) {
      if (event.key === "Enter") {
        event.preventDefault();
        const inputs = Array.from(document.querySelectorAll("input"));
        const currentIndex = inputs.findIndex(
          (input) => input === event.target
        );
        let nextIndex = (currentIndex + 1) % inputs.length;

        while (nextIndex !== currentIndex) {
          const nextInput = inputs[nextIndex];
          if (nextInput && !nextInput.disabled && !nextInput.readOnly) {
            nextInput.focus();
            break;
          }
          nextIndex = (nextIndex + 1) % inputs.length;
        }
        if (currentIndex === inputs.length - 1) {
          const loginButton = document.querySelector(".btn");
          loginButton.click();
        }
      }
    },
    handleUserLoggedIn(userName, isAdmin) {
      console.log("User logged in:", userName);
      this.loggedInUser = userName;
      this.isAdmin = isAdmin;

      if (this.isAdmin) {
        localStorage.setItem("isAdmin", "true");
      } else {
        localStorage.removeItem("isAdmin");
      }

      this.$emit("userLoggedIn", userName);
    },
    submit() {
      console.log("Submit method called");
      this.validateEmail();
      this.validatePassword();


      if (this.emailError || this.passwordError) {
        console.log("Please fix the validation errors before submitting.");
        return;
      }
      console.log("Before API call");

      const userData = {
        user_email: this.email,
        user_password: this.password,
      };

      axios
        .post(
          "http://134u123.e2.mars-hosting.com/project_quiz/log_reg/login",
          userData
        )

        .then((response) => {
          console.log("API response:", response);
          if (response.status === 200) {
            console.log("Login successful!");
            console.log(response.data);

            if (response.data.user_exists === false) {
              console.log("User does not exist. Redirecting to signup page.");
              this.$router.push("/signup");
              return;
            }

            if (response.data.login_success === false) {
              console.log("Invalid credentials. Please enter correct email and password.");
              return;
            }

            localStorage.setItem("loggedInUser", response.data.user_name);
            localStorage.setItem("sid", response.data.sid);
            this.$emit("userLoggedIn", response.data.user_name);

            console.log("Pre preusmeravanja");

            this.$router.push("/theme");

            console.log("Posle preusmeravanja");
            this.handleUserLoggedIn(
              response.data.user_name,
              response.data.role === "admin"
            );
          }
        })
        .catch((error) => {
          console.error("Login failed", error);
        });
    },
    validateEmail() {
      if (this.email === "") {
        this.emailError = "Email is required.";
        return;
      }

      if (this.email.length > 50) {
        this.emailError = "Email can have a maximum of 50 characters.";
        return;
      }

      const emailParts = this.email.split("@");
      const domain = emailParts[1] || "";

      if (
        emailParts.length !== 2 ||
        (domain !== "gmail.com" && domain !== "yahoo.com")
      ) {
        this.emailError =
          "Invalid email format. Email should be in the format 'example@gmail.com' or 'example@yahoo.com'.";
        return;
      }

      const username = emailParts[0];
      if (username.length > 30) {
        this.emailError = "Username can have a maximum of 30 characters.";
        return;
      }

      for (let i = 0; i < username.length; i++) {
        const charCode = username.charCodeAt(i);
        if (
          (charCode < 97 || charCode > 122) &&
          (charCode < 48 || charCode > 57) &&
          charCode !== 46
        ) {
          this.emailError =
            "Username can only contain lowercase letters,numbers and dots.";
          return;
        }
      }

      this.emailError = "";

      if (
        this.email.endsWith("@gmail.com") ||
        this.email.endsWith("@yahoo.com")
      ) {
        const nextInput = this.$refs.form.querySelector("input[type=password]");
        if (nextInput) {
          nextInput.focus();
        }
      }
    },

    validatePassword() {
      for (let i = 0; i < this.password.length; i++) {
        const charCode = this.password.charCodeAt(i);
        if (charCode < 32 || charCode > 126) {
          this.passwordError = "Password can only contain ASCII characters.";
          return;
        }
      }
      this.passwordError = "";
    },
    goToAdminPage() {
      this.$router.push("/admin");
    },
  },
  mounted() {
    setTimeout(() => {
      this.showForm = true;
    }, 500);
  },
};
</script>

<style scoped>
body {
  background-image: url('/src/assets/img/quiz1.jpg');
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
}

.anim {
  margin-top: 100px;
}

.login {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
}

.login-heading {
  text-align: center;
  color: rgb(255, 251, 251);
  font-weight: bold;
  font-size: 28px;
  margin-bottom: 20px;
}

.login-container {
  margin-top: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 1);
  background-color: #000080;
  padding: 20px;
  border-radius: 25px;
}

.login-form {
  text-align: center;
  position: relative;
  top: -100px;
  opacity: 0;
  animation: slideIn 1s forwards;
}

@keyframes slideIn {
  0% {
    top: -100px;
    opacity: 0;
  }

  100% {
    top: 0;
    opacity: 1;
  }
}

.form-group {
  margin-bottom: 10px;
  width: 300px;
}

label {
  display: block;
  font-weight: bold;
  color: white;
}

input[type="text"],
input[type="email"],
input[type="password"] {
  width: 300px;
  padding: 10px;
  border: none;
  border-radius: 8px;
  background-color: white;
  color: black;
  margin-bottom: 10px;
  font-size: 25px;
}

input[type="text"]:not(:focus)::after,
input[type="password"]:not(:focus)::after {
  display: none !important;
}

button.btn {
  padding: 10px 20px;
  background-color: black;
  color: white;
  border-radius: 10px;
  cursor: pointer;
  width: 60%;
}

button.btn:hover {
  background-color: #333;
  border: 2px solid white;
  font-weight: bold;
}

.error {
  color: rgb(254, 254, 254);
  font-size: 14px;
  font-weight: bold;
  display: block;
}

input.error {
  width: 100%;
}

input.error:focus+.error {
  display: block;
}

p {
  padding: 0;
  margin: 0;
}

.signup-link {
  color: rgb(255, 255, 255);
  text-decoration: none;
}
</style>