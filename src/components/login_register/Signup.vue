<template>
  <animation-welcome class="anim"></animation-welcome>
  <div class="signup">
    <div class="signup-container">
      <h2 class="signup-heading">SIGN UP</h2>
      <div class="signup-form" :class="{ active: showForm }" ref="form">
        <div class="form-group">
          <label for="name"></label>
          <input type="text" v-model="name" :class="{ error: nameError }" @input="validateName" @keydown="handleKeyDown"
            placeholder="Name" />
          <p v-if="nameError" class="error">{{ nameError }}</p>
        </div>

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
        <div class="form-group">
          <label for="confirmPassword"></label>
          <input type="password" v-model="confirmPassword" :class="{ error: confirmPasswordError }"
            @input="validateConfirmPassword" @keydown="handleKeyDown" placeholder="Confirm Password" required />
          <p v-if="confirmPasswordError" class="error">
            {{ confirmPasswordError }}
          </p>
        </div>
        <button @click="submit()" class="btn">Sign up</button>
      </div>
      <router-link to="/login">
        <a>Login</a>
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
      id: "",
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      nameError: "",
      emailError: "",
      passwordError: "",
      confirmPasswordError: "",
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
          const signUpButton = document.querySelector(".btn");
          signUpButton.click();
        }
      }
    },
    submit() {
      this.validateName();
      this.validateEmail();
      this.validatePassword();
      this.validateConfirmPassword();

      if (
        this.nameError ||
        this.emailError ||
        this.passwordError ||
        this.confirmPasswordError
      ) {
        console.log("Please fix the validation errors before submitting.");
        return;
      }
      if (this.password !== this.confirmPassword) {
        this.confirmPasswordError = "Password and Confirm Password must match.";
        return;
      }

      const userData = {
        user_id: this.id,
        user_name: this.name,
        user_email: this.email,
        user_password: this.password,
        confirmPassword: this.confirmPassword,
      };

      axios
        .post(
          "http://134u123.e2.mars-hosting.com/project_quiz/log_reg/register",
          userData
        )
        .then((response) => {
          console.log(response.data);
          this.name = "";
          localStorage.setItem("loggedInUser",userData.user_name);
          localStorage.setItem("sid", response.data.sid);
          this.$emit("userLoggedIn",response.data.user_name);
          this.$router.push("/theme");
          
        })

        .catch((error) => {
          console.log("Registration faild", error);
          if (
            error.response &&
            error.response.data &&
            error.response.data.emailTaken
          ) {
            this.email.Error =
              "Email address is already taken.Please choose a different email.address,";
          }
        });
    },
    saveUserToDatabase(userData) {
      axios
        .post(
          "http://134u123.e2.mars-hosting.com/project_quiz/log_reg/register",
          userData
        )
        .then((response) => {
          console.log(response.data);
          this.name = "";
          localStorage.setItem("loggedInUser", response.data.user_name);
          localStorage.setItem("sid", response.data.sid);
          this.$emit("userLoggedIn", this.name);
          this.$router.push("/theme");
        })
        .catch((error) => {
          console.error("Registration failed", error);
        });
    },

    validateName() {
      if (this.name === "") {
        this.nameError = "Name is required.";
        return;
      }

      if (this.name.length > 20) {
        this.nameError = "Name can have a maximum of 20 characters.";
        return;
      }

      const firstChar = this.name.charAt(0);
      if (firstChar.toUpperCase() !== firstChar) {
        this.nameError = "Name must start with a capital letter.";
        return;
      }

      for (let i = 0; i < this.name.length; i++) {
        const charCode = this.name.charCodeAt(i);
        if (charCode < 32 || charCode > 126) {
          this.nameError = "Name can only contain ASCII characters.";
          return;
        }
      }
      this.nameError = "";
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

      if (emailParts.length !== 2 || (domain !== "gmail.com" && domain !== "yahoo.com")) {
        this.emailError = "Invalid email format.";
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
      if (this.emailError) {
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

    validateConfirmPassword() {
      if (this.confirmPassword === "") {
        this.confirmPasswordError = "Confirm Password is required.";
        return;
      }

      for (let i = 0; i < this.confirmPassword.length; i++) {
        const charCode = this.confirmPassword.charCodeAt(i);
        if (charCode < 32 || charCode > 126) {
          this.confirmPasswordError =
            "Confirm Password can only contain ASCII characters.";
          return;
        }
      }
      this.confirmPasswordError = "";
    },
    beforeRouteLeave(to, from, next) {
      if (this.showForm) {
        next(false);
      } else {
        next();
      }
    },
    mounted() {
      setTimeout(() => {
        this.showForm = true;
      }, 500);
    },
  },
};
</script>


<style scoped>
.anim {
  margin-top: 50px;
}

.signup {
  display: flex;
  justify-content: center;
  align-items: center;
}

.signup-heading {
  text-align: center;
  color: rgb(252, 252, 252);
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 20px;
}

.signup-container {
  margin-top: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 1);
  background-color: #000080;
  padding: 20px;
  border-radius: 25px;
}

.signup-form {
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
}

label {
  display: block;
  font-weight: bold;
  color: white;
}

input[type="name"],
input[type="text"],
input[type="email"],
input[type="password"] {
  width: 100%;
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
  border: none;
  border-radius: 10px;
  cursor: pointer;
  width: 100%;
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

a {
  text-decoration: none;
  color: white;
  font-weight: bold;
}
</style>