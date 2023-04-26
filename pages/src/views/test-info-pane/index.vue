<script setup lang="ts">
import { type ShallowRef, inject, onMounted, onBeforeUnmount, shallowRef } from 'vue'
import { useRoute } from 'vue-router'
import { DrawKit } from '@jamcaalaa/hagao'
import { Viewer } from 'cesium';
import { CESIUM_VIEWER } from '@/components/map-engine'

const viewerRef = inject<ShallowRef<Viewer>>(CESIUM_VIEWER)
const kitRef = shallowRef<DrawKit>()
const route = useRoute()

onMounted(() => {
  if (!viewerRef) {
    return
  }

  kitRef.value = new DrawKit(viewerRef.value)
  kitRef.value.begin({ type: 'point' })
})

onBeforeUnmount(() => {
  kitRef.value?.end()
  kitRef.value?.destroy()
})
</script>

<template>
  <div>
    {{ String(route.name) }}
  </div>
</template>