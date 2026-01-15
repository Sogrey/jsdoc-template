/**
 * @fileoverview 基础图形类，用于表示二维和三维图形
 */

/**
 * 基础图形类
 * @class
 * @description 这是一个抽象基类，定义了所有图形的通用属性和方法
 */
export class Shape {
  /**
   * 创建一个图形实例
   * @constructor
   * @param {string} name - 图形名称
   * @param {number} x - X坐标
   * @param {number} y - Y坐标
   */
  constructor(name, x, y) {
    /**
     * @type {string}
     * @description 图形的名称
     */
    this.name = name;

    /**
     * @type {number}
     * @description X坐标
     */
    this.x = x;

    /**
     * @type {number}
     * @description Y坐标
     */
    this.y = y;
  }

  /**
   * 计算图形的面积
   * @abstract
   * @returns {number} 图形的面积
   */
  getArea() {
    throw new Error('Method must be implemented by subclass');
  }

  /**
   * 计算图形的周长
   * @abstract
   * @returns {number} 图形的周长
   */
  getPerimeter() {
    throw new Error('Method must be implemented by subclass');
  }

  /**
   * 移动图形到新的位置
   * @param {number} newX - 新的X坐标
   * @param {number} newY - 新的Y坐标
   */
  moveTo(newX, newY) {
    this.x = newX;
    this.y = newY;
  }

  /**
   * 获取图形的位置信息
   * @returns {Object} 包含x和y坐标的对象
   * @returns {number} returns.x - X坐标
   * @returns {number} returns.y - Y坐标
   */
  getPosition() {
    return { x: this.x, y: this.y };
  }

  /**
   * 获取图形的字符串表示
   * @returns {string} 图形的描述信息
   */
  toString() {
    return `Shape: ${this.name} at (${this.x}, ${this.y})`;
  }
}
