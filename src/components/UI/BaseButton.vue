<template>
  <button :type="type" :class="mode">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: ['type', 'mode', 'caption']
}
</script>

<style scoped>
button {
  width: 200px;
  padding: 10px 20px;
  font-family: inherit;
  font-size: 20px;
  background-color: #611700;
  box-shadow: #0a0110;
  color: white;
  cursor: pointer;
  font-weight: bold;
}

button:hover,
button:active {
  border: 4px solid #ffffff;
  border-radius: 50px;
  color: #fdfdfd;
}

.flat {
  background-color: transparent;
  color: #fdfdfd;
  border: none;
}

.flat:hover,
.flat:active {
  background-color: #e71e1e;
  color: #fdfdfd;
  font-size: 25px;
}
</style>