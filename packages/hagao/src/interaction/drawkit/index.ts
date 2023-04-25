import { Cartesian2, Cartesian3, Scene, ScreenSpaceEventHandler, ScreenSpaceEventType, Viewer, PointGraphics, HeightReference, Color, ConstantPositionProperty, Cartographic, Ellipsoid, Math, ReferenceFrame } from "cesium"

// 逐级降低pick
const pickPosition = (
  screenPosition: Cartesian2,
  scene: Scene
) => {
  const pickPositionSupported = scene.pickPositionSupported

  let result: Cartesian3 | null = null

  if (pickPositionSupported) {
    result = scene.pickPosition(screenPosition, new Cartesian3())
    console.log(toLonLatDegrees(result))
    return result
  } else {
    // 如果 Scene 不支持拾取，那么降级为
    const ray = scene.camera.getPickRay(screenPosition)
    if (ray) {
      const r = scene.globe.pick(ray, scene, new Cartesian3())
      if (r) {
        return r
      } else {
        return result
      }
    } else {
      // 如果射线都没有，最后尝试椭球拾取，还没有只能 null 了
      const r = scene.camera.pickEllipsoid(screenPosition, scene.globe.ellipsoid, new Cartesian3())
      if (r) {
        return r
      } else {
        return result
      }
    }
  }
}

const cartoScratch = new Cartographic(0, 0, 0)
const toLonLatDegrees = (cart: Cartesian3) => {
  Cartographic.fromCartesian(cart, Ellipsoid.WGS84, cartoScratch)
  const lon = cartoScratch.longitude * Math.DEGREES_PER_RADIAN
  const lat = cartoScratch.latitude * Math.DEGREES_PER_RADIAN
  return [lon, lat, cartoScratch.height]
}

export type DrawPointParam = {
  type: 'point'
}
export type DrawLineParam = {
  type: 'line'
}
export type DrawPolygonParam = {
  type: 'polygon'
}
export type DrawParam = DrawPointParam | DrawLineParam | DrawPolygonParam
export type DrawType = 'point' | 'line' | 'polygon'
type DrawIndicateType = 'point-move'

class DrawKit {
  viewer: Viewer
  eventHandlers: Record<string, ((evt: unknown) => void)[]>
  status: boolean
  drawType?: DrawType
  handlers: Map<DrawType | DrawIndicateType, ScreenSpaceEventHandler>

  private oldDepthTestValue = false

  constructor(viewer: Viewer) {
    this.viewer = viewer
    this.eventHandlers = {}
    this.status = false
    this.handlers = new Map()

    this.oldDepthTestValue = viewer.scene.globe.depthTestAgainstTerrain
    viewer.scene.globe.depthTestAgainstTerrain = true
  }

  private beginPoint() {
    const viewer = this.viewer
    const scene = viewer.scene
    const canvas = scene.canvas
    const entities = viewer.entities
    const getMovePointDescriptor = () => ({
      color: Color.ALICEBLUE,
      outlineColor: Color.AQUA,
      outlineWidth: 2,
      pixelSize: 4,
      disableDepthTestDistance: 50000,
      heightReference: HeightReference.RELATIVE_TO_GROUND,
      show: true,
    } satisfies PointGraphics.ConstructorOptions)
    const getDrawPointDescriptor = () => ({
      color: Color.ALICEBLUE,
      outlineColor: Color.AQUA,
      outlineWidth: 2,
      pixelSize: 4,
      disableDepthTestDistance: 0,
      heightReference: HeightReference.RELATIVE_TO_GROUND,
      show: true,
    } satisfies PointGraphics.ConstructorOptions)
    const movePointPosition = new ConstantPositionProperty()

    entities.add({
      id: 'movePoint',
      point: getMovePointDescriptor(),
      position: movePointPosition,
    })

    let pointMoveScreenHandler: ScreenSpaceEventHandler
    let pointDrawScreenHandler: ScreenSpaceEventHandler
    if (this.handlers.has('point-move')) {
      pointMoveScreenHandler = this.handlers.get('point-move')!
    } else {
      pointMoveScreenHandler = new ScreenSpaceEventHandler(canvas)
      this.handlers.set('point-move', pointMoveScreenHandler)
    }

    if (this.handlers.has('point')) {
      pointDrawScreenHandler = this.handlers.get('point')!
    } else {
      pointDrawScreenHandler = new ScreenSpaceEventHandler(canvas)
      this.handlers.set('point', pointDrawScreenHandler)
    }

    // 点击时绘制
    pointDrawScreenHandler.setInputAction((evt: {
      position: Cartesian2
    }) => {
      const coord = pickPosition(evt.position, scene)
      if (!coord) {
        return
      } else {
        entities.add({
          point: getDrawPointDescriptor(),
          position: coord,
        })
      }
    }, ScreenSpaceEventType.LEFT_CLICK)

    // 移动时更新鼠标点
    pointMoveScreenHandler.setInputAction((evt: {
      endPosition: Cartesian2,
      startPosition: Cartesian2,
    }) => {
      const coord = pickPosition(evt.endPosition, scene)
      if (!coord) {
        return
      } else {
        movePointPosition.setValue(coord, ReferenceFrame.FIXED)
      }
    }, ScreenSpaceEventType.MOUSE_MOVE)
  }

  private beginLine() {
    const viewer = this.viewer
    const scene = viewer.scene
    const canvas = scene.canvas

    let screenHandler: ScreenSpaceEventHandler
    if (this.handlers.has('line')) {
      screenHandler = this.handlers.get('line')!
    } else {
      screenHandler = new ScreenSpaceEventHandler(canvas)
      this.handlers.set('line', screenHandler)
    }

    screenHandler.setInputAction((evt: {
      position: Cartesian2
    }) => {
      const coord = pickPosition(evt.position, scene)
      if (!coord) {
        return
      } else {
        console.log(coord)
        // 触发事件？
      }
    }, ScreenSpaceEventType.LEFT_CLICK)
  }

  private beginPolygon() {
    const viewer = this.viewer
    const scene = viewer.scene
    const canvas = scene.canvas

    let screenHandler: ScreenSpaceEventHandler
    if (this.handlers.has('line')) {
      screenHandler = this.handlers.get('line')!
    } else {
      screenHandler = new ScreenSpaceEventHandler(canvas)
      this.handlers.set('line', screenHandler)
    }

    screenHandler.setInputAction((evt: {
      position: Cartesian2
    }) => {
      const coord = pickPosition(evt.position, scene)
      if (!coord) {
        return
      } else {
        console.log(coord)
        // 触发事件？
      }
    }, ScreenSpaceEventType.LEFT_CLICK)
  }

  begin(params: DrawParam) {
    this.status = true
    this.drawType = params.type
    switch (params.type) {
      case 'point':
        this.beginPoint()
        break
      case 'line':
        this.beginLine()
        break
      case 'polygon':
        this.beginPolygon()
        break
      default:
        break
    }

    return this
  }

  end() {
    this.status = false
    this.drawType = undefined

    for (const [_, h] of this.handlers) {
      h.destroy()
    }

    for (const [_, handlers] of Object.entries(this.eventHandlers)) {
      handlers.forEach((cb) => {
        cb({})
      })
    }
  }

  addEventListener(type: string, cb: (evt: unknown) => void) {
    this.eventHandlers[type].push(cb)
  }

  destroy() {
    // 清理资源占用和回调
    this.status = false
    this.viewer.scene.globe.depthTestAgainstTerrain = this.oldDepthTestValue
    for (const [_, handlers] of Object.entries(this.eventHandlers)) {
      handlers.length = 0
    }
  }
}

export default DrawKit
