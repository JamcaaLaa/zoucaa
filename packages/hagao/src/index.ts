import { Camera, Rectangle } from 'cesium'

export const useDefaultChinaRect = () => {
  Camera.DEFAULT_VIEW_RECTANGLE = Rectangle.fromDegrees(
    75.0, // 西经
    0.0, // 南纬
    140.0, // 东经
    60.0 // 北纬
  )
}
