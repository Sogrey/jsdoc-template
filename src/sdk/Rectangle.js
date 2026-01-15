/**
 * @fileoverview 矩形类，继承自Shape
 */

import { Shape } from './Shape.mjs';

/**
 * 矩形类
 * @class
 * @extends Shape
 * @description 表示一个矩形的几何图形
 */
export class Rectangle extends Shape {
  /**
   * 创建一个矩形实例
   * @constructor
   * @param {string} name - 矩形名称
   * @param {number} x - 左上角X坐标
   * @param {number} y - 左上角Y坐标
   * @param {number} width - 矩形宽度
   * @param {number} height - 矩形高度
   * @throws {Error} 当宽度或高度小于等于0时抛出错误
   */
  constructor(name, x, y, width, height) {
    super(name, x, y);

    if (width <= 0 || height <= 0) {
      throw new Error('Width and height must be positive');
    }

    /**
     * @type {number}
     * @description 矩形的宽度
     */
    this.width = width;

    /**
     * @type {number}
     * @description 矩形的高度
     */
    this.height = height;
  }

  /**
   * 计算矩形的面积
   * @override
   * @returns {number} 矩形的面积
   * @example
   * const rect = new Rectangle('myRect', 0, 0, 4, 5);
   * const area = rect.getArea(); // 20
   */
  getArea() {
    return this.width * this.height;
  }

  /**
   * 计算矩形的周长
   * @override
   * @returns {number} 矩形的周长
   */
  getPerimeter() {
    return 2 * (this.width + this.height);
  }

  /**
   * 判断一个点是否在矩形内部
   * @param {number} px - 点的X坐标
   * @param {number} py - 点的Y坐标
   * @returns {boolean} 如果点在矩形内部返回true，否则返回false
   */
  containsPoint(px, py) {
    return (
      px >= this.x &&
      px <= this.x + this.width &&
      py >= this.y &&
      py <= this.y + this.height
    );
  }

  /**
   * 获取矩形的右下角坐标
   * @returns {Object} 包含x和y坐标的对象
   */
  getBottomRight() {
    return {
      x: this.x + this.width,
      y: this.y + this.height
    };
  }

  /**
   * 获取矩形的中心点坐标
   * @returns {Object} 包含x和y坐标的对象
   */
  getCenter() {
    return {
      x: this.x + this.width / 2,
      y: this.y + this.height / 2
    };
  }

  /**
   * 获取矩形的字符串表示
   * @override
   * @returns {string} 矩形的描述信息
   */
  toString() {
    return `Rectangle: ${this.name} at (${this.x}, ${this.y}) with size ${this.width}x${this.height}`;
  }
}
