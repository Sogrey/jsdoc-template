/**
 * @fileoverview 圆形类，继承自Shape
 */

import { Shape } from './Shape.js';

/**
 * 圆形类
 * @class
 * @extends Shape
 * @description 表示一个圆形的几何图形
 */
export class Circle extends Shape {
  /**
   * 创建一个圆形实例
   * @constructor
   * @param {string} name - 圆形名称
   * @param {number} x - 圆心X坐标
   * @param {number} y - 圆心Y坐标
   * @param {number} radius - 圆的半径
   * @throws {Error} 当半径小于等于0时抛出错误
   */
  constructor(name, x, y, radius) {
    super(name, x, y);

    if (radius <= 0) {
      throw new Error('Radius must be positive');
    }

    /**
     * @type {number}
     * @description 圆的半径
     */
    this.radius = radius;
  }

  /**
   * 计算圆的面积
   * @override
   * @returns {number} 圆的面积
   * @example
   * const circle = new Circle('myCircle', 0, 0, 5);
   * const area = circle.getArea(); // 78.53981633974483
   */
  getArea() {
    return Math.PI * this.radius * this.radius;
  }

  /**
   * 计算圆的周长
   * @override
   * @returns {number} 圆的周长
   */
  getPerimeter() {
    return 2 * Math.PI * this.radius;
  }

  /**
   * 获取圆的直径
   * @returns {number} 圆的直径
   */
  getDiameter() {
    return this.radius * 2;
  }

  /**
   * 调整圆的大小
   * @param {number} newRadius - 新的半径
   * @throws {Error} 当新半径小于等于0时抛出错误
   */
  resize(newRadius) {
    if (newRadius <= 0) {
      throw new Error('Radius must be positive');
    }
    this.radius = newRadius;
  }

  /**
   * 获取圆形的字符串表示
   * @override
   * @returns {string} 圆形的描述信息
   */
  toString() {
    return `Circle: ${this.name} at (${this.x}, ${this.y}) with radius ${this.radius}`;
  }
}
