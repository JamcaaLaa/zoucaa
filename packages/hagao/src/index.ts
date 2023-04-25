import { Camera, Rectangle } from 'cesium'

export * from './interaction'

export const useDefaultChinaRect = () => {
  Camera.DEFAULT_VIEW_RECTANGLE = Rectangle.fromDegrees(
    75.0, // 西经
    0.0, // 南纬
    140.0, // 东经
    60.0 // 北纬
  )
}

export const useGuangxiRect = () => {
  Camera.DEFAULT_VIEW_RECTANGLE = Rectangle.fromDegrees(
    104.5, // 西经
    20.5, // 南纬
    112.0, // 东经
    26.5 // 北纬
  )
}