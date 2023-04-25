<script setup lang="ts">
import { type ShallowRef, inject, onMounted } from 'vue'
import { DrawKit } from '@jamcaalaa/hagao'
import { Viewer } from 'cesium';
import { CESIUM_VIEWER } from '@/components/map-engine'

const viewerRef = inject<ShallowRef<Viewer>>(CESIUM_VIEWER)

onMounted(() => {
  if (!viewerRef) {
    return
  }

  const kit = new DrawKit(viewerRef.value)
  kit.begin({ type: 'point' })
})
</script>

<template>
  <div style="position: absolute; top: 50px; left: 50px; color: aliceblue; z-index: 3;">
    TestInfoPane
  </div>
</template>