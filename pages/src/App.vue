<script setup lang="ts">
import { MapEngine } from '@/components/map-engine'
import { NavPane } from '@/components/nav-pane'
</script>

<template>
  <MapEngine>
    <template #router-view>
      <NavPane />
    </template>
  </MapEngine>
</template>

<style scoped>
</style>
