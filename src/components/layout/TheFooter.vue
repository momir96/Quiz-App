<template>
  <footer>
    <h3> Momir Tijanic</h3><img src="../../assets/img/@.png" alt="Mali logo" class="mali-logo">
    <h3>Ivana Bojovic</h3>
    <div>
    <h3>Copyright 2023. All right received</h3>
  </div>
  </footer>
</template>
  
<script>
export default {};
</script>
  
<style >
footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 5rem;
  background-color: #d40808;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 0;
  padding: 0;

}

#app {
  height: 100%;
  min-height: calc(100vh - 144px);
}


.mali-logo {
  height: 50px;
  align-items: center;
  margin: 10px 10px;
}

h3 {
  color: rgb(245, 244, 241);
  font-family: Arial, Helvetica, sans-serif;
  margin: 5px 10px;
  font-weight: bold;
}
</style>