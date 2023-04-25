<script setup lang="ts">
import { onMounted, provide, ref, shallowRef } from 'vue'
import { ArcGisMapServerImageryProvider, Ellipsoid, EllipsoidTerrainProvider, TileMapServiceImageryProvider, Viewer, buildModuleUrl } from 'cesium'
import { useDefaultChinaRect, useGuangxiRect } from '@jamcaalaa/hagao'
import 'cesium/Build/CesiumUnminified/Widgets/widgets.css'
import { CESIUM_VIEWER } from '.'

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

console.log(`模式: ${mode}, CESIUM_BASE_URL: ${cesiumBaseUrl}`)
provide(CESIUM_VIEWER, viewerRef)

onMounted(async () => {
  useGuangxiRect()
  viewerRef.value = new Viewer(viewerDivRef.value as HTMLElement, {
    infoBox: false,
    selectionIndicator: false,
    msaaSamples: 4,
    imageryProvider: new TileMapServiceImageryProvider({
      // 对于 CESIUM_BASE_URL 下的静态资源，推荐用 buildModuleUrl 获取
      url: buildModuleUrl('Assets/Textures/NaturalEarthII'),
    }),
  })
})
</script>

<template>
  <slot name="router-view"></slot>
  <div id="cesium-viewer" ref="viewerDivRef"></div>
</template>

<style scoped>
#cesium-viewer {
  width: 100%;
  height: 100%;
}
</style>