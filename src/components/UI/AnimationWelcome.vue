<template>
    <div>
        <div class="waviy">
          <span style="--i:1">W</span>
          <span style="--i:2">E</span>
          <span style="--i:3">L</span>
          <span style="--i:4">C</span>
          <span style="--i:5">O</span>
          <span style="--i:6">M</span>
          <span style="--i:7">E</span>
          <span>&nbsp;</span>
          <span style="--i:8">TO</span>
          <span>&nbsp;</span>
          <span style="--i:9">Q</span>
          <span style="--i:10">U</span>
          <span style="--i:11">I</span>
          <span style="--i:12">Z</span>
       
         </div>
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
  -webkit-box-reflect: below -40px linear-gradient(transparent, rgba(0,0,0,0.5));
  font-size: 60px;
}
.waviy span {
  font-family: 'Alfa Slab One', cursive;
  position: relative;
  display: inline-block;
  color: #460e06;
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