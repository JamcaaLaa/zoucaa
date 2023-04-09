/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly PROD: boolean
  readonly VITE_CESIUM_BASE_URL: string
  // 更多环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
