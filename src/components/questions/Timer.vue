<template>
  <div v-if="showTimer" class="timer">
    <div class="countdown-container">
      <div class="countdown-number">{{ countdown }}</div>
      <div class="countdown-label">SEC</div>
    </div>
    <span v-if="timeExpired" class="expired">Time's up!</span>
  </div>
</template>
  
<script>
export default {
  data() {
    return {
      countdown: 30,
      showTimer: true,
      timeExpired: false,
      timer: null,
      timerBackgrounfcolor: "",
    };
  },
  mounted() {
    this.startCountdown();
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

  methods: {
    stopCountdown() {
      this.$router.push("/all-results");
      console.log("Stop countdown");
      if (this.timerRunning) {
        clearInterval(this.timer);
        this.countdown = 30;
        this.showTimer = false;
        this.timeExpired = false;
        this.timerRunning = false;
      }
    },
    startCountdown() {
      if (!this.timer) {
        this.timer = setInterval(() => {
          this.countdown--;
          if (this.countdown <= 0) {
            clearInterval(this.timer);
            this.timeExpired = true;
          }
        }, 1000);
      }
    },
  },
};
</script>

<style scoped>
.timer {
  position: fixed;
  top: 60px;
  right: 10px;
  display: flex;
  align-items: center;
  color: #0c0b0b;
  font-size: 18px;
  width: 500px;
  height: 40px;
  background-color: rgb(241, 9, 9);
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  margin: 0;
  margin: 25px 10px;
}

.countdown-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 0 10px;
  color: #121212;
  transition: background-color 1s linear;
}

.countdown-number {
  font-size: 44px;
  font-weight: bold;
}

.countdown-label {
  font-size: 12px;
  margin-left: 5px;
  text-transform: uppercase;
}

.expired {
  color: #090909;
  display: inline-block;
  align-items: center;
  justify-content: space-between;
  white-space: nowrap;
}
</style>