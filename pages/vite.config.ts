import { type PluginOption, defineConfig, splitVendorChunkPlugin, loadEnv } from 'vite'
import { join } from "node:path"
import vue from '@vitejs/plugin-vue'
import { viteExternalsPlugin } from 'vite-plugin-externals'
import { insertHtml, h } from 'vite-plugin-insert-html'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import compress from 'vite-plugin-compression'

export default defineConfig((context) => {
  const mode = context.mode
  const envDir = 'env'
  const env = loadEnv(mode, envDir)
  const base = env['BASE_URL']
  const cesiumBaseUrl = env['VITE_CESIUM_BASE_URL']
  const isProd = mode === 'production'

  const plugins: PluginOption[] = [
    vue(),
    splitVendorChunkPlugin(),
    viteExternalsPlugin({
      cesium: 'Cesium',
    }),
    insertHtml({
      head: [
        h('script', {
          src: isProd ? `${cesiumBaseUrl}Cesium.js` : `${base}${cesiumBaseUrl}Cesium.js`
        })
      ]
    }),
  ]
  if (!isProd) {
    // 开发模式，复制 node_modules 下的 cesium 依赖
    const cesiumLibraryRoot = 'node_modules/cesium/Build/CesiumUnminified/'
    const cesiumLibraryCopyToRootPath = 'libs/cesium/' // 相对于打包后的路径
    const cesiumStaticSourceCopyOptions = ['Assets', 'ThirdParty', 'Workers', 'Widgets'].map((dirName) => {
      return {
        src: `${cesiumLibraryRoot}${dirName}/*`,
        dest: `${cesiumLibraryCopyToRootPath}${dirName}`
      }
    })
    plugins.push(
      viteStaticCopy({
        targets: [
          {
            src: `${cesiumLibraryRoot}Cesium.js`,
            dest: cesiumLibraryCopyToRootPath
          },
          ...cesiumStaticSourceCopyOptions
        ]
      }),
    )
  }
  plugins.push(compress({
    threshold: 10 * 1024 // 10KB 以下不压缩
  }))

  console.log(env)

  return {
    plugins,
    envDir,
    base,
    build: {
      chunkSizeWarningLimit: 1024 * 1024,
      reportCompressedSize: false,
    },
    resolve: {
      alias: {
        '@': join(__dirname, "src")
      }
    }
  }
})