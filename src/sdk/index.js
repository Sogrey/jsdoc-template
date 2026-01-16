/**
 * @fileoverview SDK 模块入口文件
 * 导出所有 SDK 类和工具
 */
export const VERSION = '1.0.0'
// 基础图形类
export { Shape } from './Shape.js'

// 具体图形类
export { Circle } from './Circle.js'
export { Rectangle } from './Rectangle.js'

// 工厂类
export { ShapeFactory } from './ShapeFactory.js'

// 图形类型枚举
export * as ShapeType from './ShapeType.js'

// 工具类
export { MathUtils } from './MathUtils.js'

// 事件类
export { EventEmitter } from './EventEmitter.js'
