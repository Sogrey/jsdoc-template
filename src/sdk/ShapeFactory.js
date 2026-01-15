/**
 * @fileoverview 图形工厂类，用于创建和管理图形对象
 */

import { Shape } from './Shape.js'
import { Circle } from './Circle.js'
import { Rectangle } from './Rectangle.js'

/**
 * 图形类型枚举
 * @enum {string}
 */
export const ShapeType = {
  /** 圆形 */
  CIRCLE: 'circle',
  /** 矩形 */
  RECTANGLE: 'rectangle',
  /** 三角形 */
  TRIANGLE: 'triangle',
}

/**
 * 图形工厂类
 * @class
 * @description 提供创建和管理图形的静态方法
 */
export class ShapeFactory {
  /**
   * 根据类型创建图形
   * @static
   * @param {ShapeType} type - 图形类型
   * @param {Object} options - 图形配置选项
   * @param {string} options.name - 图形名称
   * @param {number} options.x - X坐标
   * @param {number} options.y - Y坐标
   * @param {number} [options.radius] - 半径（圆形）
   * @param {number} [options.width] - 宽度（矩形）
   * @param {number} [options.height] - 高度（矩形）
   * @returns {Shape} 创建的图形对象
   * @throws {Error} 当图形类型不支持或参数不正确时抛出错误
   * @example
   * // 创建一个圆形
   * const circle = ShapeFactory.createShape(ShapeType.CIRCLE, {
   *   name: 'myCircle',
   *   x: 0,
   *   y: 0,
   *   radius: 5
   * });
   *
   * // 创建一个矩形
   * const rect = ShapeFactory.createShape(ShapeType.RECTANGLE, {
   *   name: 'myRect',
   *   x: 0,
   *   y: 0,
   *   width: 4,
   *   height: 5
   * });
   */
  static createShape(type, options) {
    const { name, x, y } = options

    switch (type) {
      case ShapeType.CIRCLE:
        if (!options.radius) {
          throw new Error('Circle requires radius property')
        }
        return new Circle(name, x, y, options.radius)

      case ShapeType.RECTANGLE:
        if (!options.width || !options.height) {
          throw new Error('Rectangle requires width and height properties')
        }
        return new Rectangle(name, x, y, options.width, options.height)

      case ShapeType.TRIANGLE:
        throw new Error('Triangle is not yet implemented')

      default:
        throw new Error(`Unknown shape type: ${type}`)
    }
  }

  /**
   * 批量创建图形
   * @static
   * @param {Array<Object>} configs - 图形配置数组
   * @returns {Array<Shape>} 创建的图形数组
   * @example
   * const shapes = ShapeFactory.createShapes([
   *   {
   *     type: ShapeType.CIRCLE,
   *     options: { name: 'c1', x: 0, y: 0, radius: 5 }
   *   },
   *   {
   *     type: ShapeType.RECTANGLE,
   *     options: { name: 'r1', x: 10, y: 10, width: 4, height: 5 }
   *   }
   * ]);
   */
  static createShapes(configs) {
    return configs.map((config) => {
      return this.createShape(config.type, config.options)
    })
  }

  /**
   * 计算多个图形的总面积
   * @static
   * @param {Array<Shape>} shapes - 图形数组
   * @returns {number} 所有图形的总面积
   */
  static calculateTotalArea(shapes) {
    return shapes.reduce((total, shape) => total + shape.getArea(), 0)
  }

  /**
   * 根据名称查找图形
   * @static
   * @param {Array<Shape>} shapes - 图形数组
   * @param {string} name - 要查找的图形名称
   * @returns {Shape|undefined} 找到的图形，如果未找到返回undefined
   */
  static findShapeByName(shapes, name) {
    return shapes.find((shape) => shape.name === name)
  }
}
