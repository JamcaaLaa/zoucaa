<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div id="route-pane">
    <RouterView />
    <div id="nav">
      <button type="button" @click="router.push({ path: '/' })">/</button>
      <button type="button" @click="router.push({ path: '/test' })">/TestPane</button>
    </div>
  </div>
</template>

<style scoped>
#route-pane {
  display: flex;
  flex-direction: column;
  align-items: center;

  position: fixed;
  bottom: 5vh;
  left: 5vh;
  z-index: 1;

  background-color: rgba(240, 240, 230, 0.3);
  color: rgba(255, 255, 255, 0.9);
  border-radius: 4px;

  padding: 8px;

  min-width: 160px;
  min-height: 48px;
}
#nav {
  width: 100%;
  min-height: 32px;

  display: flex;
  justify-content: space-around;
  align-items: center;
}

#nav button {
  border: 0;
  border-radius: 4px;
  height: 24px;
  margin: 8px 0;
  min-width: 48px;
}
</style>