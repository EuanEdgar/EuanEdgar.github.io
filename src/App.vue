<template>
  <div id="app">
    <router-view :key="$router.currentRoute.fullPath"/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
