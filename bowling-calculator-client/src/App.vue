<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css?family=Turret+Road&display=swap");
@import url("https://fonts.googleapis.com/css?family=Roboto+Slab&display=swap");
body,
html,
#app {
  padding: 0px;
  margin: 0px;
  background-color: rgb(233, 233, 233);
  font-family: "Roboto Slab", serif;
}

.box {
  background-color: white;
  /* border-radius: 4px; */
}

.display-in-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
