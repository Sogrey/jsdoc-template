/**
 * @fileoverview 数学工具类，提供常用的数学计算方法
 */

/**
 * 数学工具类
 * @class
 * @description 提供常用的数学计算静态方法
 */
export class MathUtils {
  /**
   * 常量：圆周率
   * @static
   * @constant {number}
   */
  static PI = Math.PI;

  /**
   * 常量：欧拉数
   * @static
   * @constant {number}
   */
  static E = Math.E;

  /**
   * 计算两点之间的距离（欧几里得距离）
   * @static
   * @param {number} x1 - 第一个点的X坐标
   * @param {number} y1 - 第一个点的Y坐标
   * @param {number} x2 - 第二个点的X坐标
   * @param {number} y2 - 第二个点的Y坐标
   * @returns {number} 两点之间的距离
   * @example
   * const distance = MathUtils.distance(0, 0, 3, 4); // 5
   */
  static distance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  }

  /**
   * 计算两点的中点坐标
   * @static
   * @param {number} x1 - 第一个点的X坐标
   * @param {number} y1 - 第一个点的Y坐标
   * @param {number} x2 - 第二个点的X坐标
   * @param {number} y2 - 第二个点的Y坐标
   * @returns {Object} 中点坐标
   * @returns {number} returns.x - 中点的X坐标
   * @returns {number} returns.y - 中点的Y坐标
   */
  static midpoint(x1, y1, x2, y2) {
    return {
      x: (x1 + x2) / 2,
      y: (y1 + y2) / 2
    };
  }

  /**
   * 将角度转换为弧度
   * @static
   * @param {number} degrees - 角度值
   * @returns {number} 弧度值
   */
  static degreesToRadians(degrees) {
    return degrees * (Math.PI / 180);
  }

  /**
   * 将弧度转换为角度
   * @static
   * @param {number} radians - 弧度值
   * @returns {number} 角度值
   */
  static radiansToDegrees(radians) {
    return radians * (180 / Math.PI);
  }

  /**
   * 限制数值在指定范围内
   * @static
   * @param {number} value - 要限制的值
   * @param {number} min - 最小值
   * @param {number} max - 最大值
   * @returns {number} 限制后的值
   */
  static clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  /**
   * 线性插值
   * @static
   * @param {number} start - 起始值
   * @param {number} end - 结束值
   * @param {number} t - 插值因子（0到1之间）
   * @returns {number} 插值结果
   */
  static lerp(start, end, t) {
    return start + (end - start) * t;
  }

  /**
   * 判断一个数是否为质数
   * @static
   * @param {number} n - 要判断的数
   * @returns {boolean} 如果是质数返回true，否则返回false
   */
  static isPrime(n) {
    if (n <= 1) return false;
    if (n <= 3) return true;
    if (n % 2 === 0 || n % 3 === 0) return false;

    for (let i = 5; i * i <= n; i += 6) {
      if (n % i === 0 || n % (i + 2) === 0) return false;
    }

    return true;
  }

  /**
   * 计算数组平均值
   * @static
   * @param {Array<number>} numbers - 数字数组
   * @returns {number} 平均值
   * @throws {Error} 当数组为空时抛出错误
   */
  static average(numbers) {
    if (!numbers || numbers.length === 0) {
      throw new Error('Array cannot be empty');
    }
    const sum = numbers.reduce((acc, num) => acc + num, 0);
    return sum / numbers.length;
  }

  /**
   * 计算数组标准差
   * @static
   * @param {Array<number>} numbers - 数字数组
   * @returns {number} 标准差
   */
  static standardDeviation(numbers) {
    if (!numbers || numbers.length === 0) {
      throw new Error('Array cannot be empty');
    }
    const avg = this.average(numbers);
    const squareDiffs = numbers.map(num => Math.pow(num - avg, 2));
    const avgSquareDiff = this.average(squareDiffs);
    return Math.sqrt(avgSquareDiff);
  }
}
