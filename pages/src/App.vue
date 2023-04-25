<script setup lang="ts">
import { RouterView } from 'vue-router'
import { MapEngine } from '@/components/map-engine'
</script>

<template>
  <MapEngine>
    <template #router-view>
      <RouterView />
    </template>
  </MapEngine>
</template>

<style scoped>
</style>
