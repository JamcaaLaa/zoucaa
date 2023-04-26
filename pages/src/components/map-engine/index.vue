<script setup lang="ts">
import { onMounted, provide, ref, shallowRef } from 'vue'
import { ImageryLayer, UrlTemplateImageryProvider, Viewer } from 'cesium'
import { useDefaultChinaRect } from '@jamcaalaa/hagao'
import { CESIUM_VIEWER } from '.'

import 'cesium/Build/CesiumUnminified/Widgets/widgets.css'

const viewerDivRef = ref<HTMLDivElement>()
const viewerRef = shallowRef<Viewer>()
const sysBaseUrl = import.meta.env.BASE_URL
const mode = import.meta.env.MODE
const sourceCesiumBaseUrl = import.meta.env.VITE_CESIUM_BASE_URL

// 在不同的 base 路径下（vite.config.ts 中的 base 配置
// 尤其是开发模式用的是拷贝来的 CesiumJS 库文件，最好拼接上 base 路径
// 生产模式使用 CDN 则不用拼接 base 路径
const cesiumBaseUrl = mode === 'development' ? `${sysBaseUrl}${sourceCesiumBaseUrl}` : sourceCesiumBaseUrl
window.CESIUM_BASE_URL = cesiumBaseUrl

provide(CESIUM_VIEWER, viewerRef)
console.log(`模式: ${mode}, CESIUM_BASE_URL: ${cesiumBaseUrl}`)

onMounted(() => {
  useDefaultChinaRect()
  viewerRef.value = new Viewer(viewerDivRef.value as HTMLElement, {
    infoBox: false,
    selectionIndicator: false,
    msaaSamples: 4,
    timeline: false,
    animation: false,
    sceneModePicker: false,
    scene3DOnly: true,
    baseLayer: new ImageryLayer(new UrlTemplateImageryProvider({
      url: 'https://gac-geo.googlecnapps.cn/maps/vt/lyrs=s&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}',
      maximumLevel: 18,
    }), {}),
    geocoder: false,
    navigationHelpButton: false,
    projectionPicker: false,
    requestRenderMode: true,
    creditContainer: 'none-credit'
  })
})
</script>

<template>
  <slot name="router-view"></slot>
  <div id="cesium-viewer" ref="viewerDivRef"></div>
  <div id="none-credit"></div>
</template>

<style scoped>
#cesium-viewer {
  width: 100%;
  height: 100%;
}

#none-credit {
  display: none;
}
</style>
