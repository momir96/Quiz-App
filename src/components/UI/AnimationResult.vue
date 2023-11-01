<template>
        <div class="waviy">
          <span style="--i:1">Y</span>
          <span style="--i:2">O</span>
          <span style="--i:3">U</span>
          <span style="--i:4">R</span>
          <span>&nbsp;</span>
          <span style="--i:5">R</span>
          <span style="--i:6">E</span>
          <span style="--i:7">Z</span>
          <span style="--i:8">U</span>
          <span style="--i:9">L</span>
          <span style="--i:10">T</span>
         </div>
</template>

<script>
export default {

}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Alfa+Slab+One&display=swap');
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.waviy {
  display: flex;
  justify-content: center;
  margin-top: 10px;
  margin-bottom: 20px;
  position: relative;
  -webkit-box-reflect: below -40px linear-gradient(transparent, rgba(3, 33, 64, 0.5));
  font-size: 60px;
}
.waviy span {
  font-family: 'Alfa Slab One', cursive;
  position: relative;
  display: inline-block;
  color: #061246;
  text-transform: uppercase;
  animation: waviy 1s infinite;
  animation-delay: calc(.1s * var(--i));
  
}
@keyframes waviy {
  0%,40%,100% {
    transform: translateY(0)
  }
  20% {
    transform: translateY(-20px)
  }
}
</style>