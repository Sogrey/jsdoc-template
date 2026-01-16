(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global.JSDocSDK = {}));
})(this, (function(exports2) {
  "use strict";
  class Shape {
    /**
     * 创建一个图形实例
     * @constructor
     * @param {string} name - 图形名称
     * @param {number} x - X坐标
     * @param {number} y - Y坐标
     */
    constructor(name, x, y) {
      this.name = name;
      this.x = x;
      this.y = y;
    }
    /**
     * 计算图形的面积
     * @abstract
     * @returns {number} 图形的面积
     */
    getArea() {
      throw new Error("Method must be implemented by subclass");
    }
    /**
     * 计算图形的周长
     * @abstract
     * @returns {number} 图形的周长
     */
    getPerimeter() {
      throw new Error("Method must be implemented by subclass");
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
  class Circle extends Shape {
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
        throw new Error("Radius must be positive");
      }
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
        throw new Error("Radius must be positive");
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
  class Rectangle extends Shape {
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
        throw new Error("Width and height must be positive");
      }
      this.width = width;
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
      return px >= this.x && px <= this.x + this.width && py >= this.y && py <= this.y + this.height;
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
  const ShapeType = Object.freeze({
    /**
     * 圆形
     *
     * @type {String}
     * @constant
     */
    CIRCLE: "circle",
    /**
     * 矩形
     *
     * @type {String}
     * @constant
     */
    RECTANGLE: "rectangle",
    /**
     * 三角形
     *
     * @type {String}
     * @constant
     */
    TRIANGLE: "triangle"
  });
  class ShapeFactory {
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
      const { name, x, y } = options;
      switch (type) {
        case ShapeType.CIRCLE:
          if (!options.radius) {
            throw new Error("Circle requires radius property");
          }
          return new Circle(name, x, y, options.radius);
        case ShapeType.RECTANGLE:
          if (!options.width || !options.height) {
            throw new Error("Rectangle requires width and height properties");
          }
          return new Rectangle(name, x, y, options.width, options.height);
        case ShapeType.TRIANGLE:
          throw new Error("Triangle is not yet implemented");
        default:
          throw new Error(`Unknown shape type: ${type}`);
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
        return this.createShape(config.type, config.options);
      });
    }
    /**
     * 计算多个图形的总面积
     * @static
     * @param {Array<Shape>} shapes - 图形数组
     * @returns {number} 所有图形的总面积
     */
    static calculateTotalArea(shapes) {
      return shapes.reduce((total, shape) => total + shape.getArea(), 0);
    }
    /**
     * 根据名称查找图形
     * @static
     * @param {Array<Shape>} shapes - 图形数组
     * @param {string} name - 要查找的图形名称
     * @returns {Shape|undefined} 找到的图形，如果未找到返回undefined
     */
    static findShapeByName(shapes, name) {
      return shapes.find((shape) => shape.name === name);
    }
  }
  class MathUtils {
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
        throw new Error("Array cannot be empty");
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
        throw new Error("Array cannot be empty");
      }
      const avg = this.average(numbers);
      const squareDiffs = numbers.map((num) => Math.pow(num - avg, 2));
      const avgSquareDiff = this.average(squareDiffs);
      return Math.sqrt(avgSquareDiff);
    }
  }
  class EventEmitter {
    /**
     * 创建事件发射器实例
     * @constructor
     */
    constructor() {
      this._listeners = {};
      this.maxListeners = 10;
    }
    /**
     * 注册事件监听器
     * @param {string} eventType - 事件类型
     * @param {EventHandler} handler - 事件处理函数
     * @param {ListenerOptions} [options] - 监听器配置选项
     * @returns {EventEmitter} 返回this，支持链式调用
     * @example
     * const emitter = new EventEmitter();
     * emitter.on('click', (data) => {
     *   console.log('Clicked:', data);
     * });
     */
    on(eventType, handler, options = {}) {
      if (!this._listeners[eventType]) {
        this._listeners[eventType] = [];
      }
      if (this._listeners[eventType].length >= this.maxListeners) {
        console.warn(
          `Possible EventEmitter memory leak detected. ${this._listeners[eventType].length} ${eventType} listeners added. Use emitter.setMaxListeners() to increase limit.`
        );
      }
      this._listeners[eventType].push({ handler, options });
      return this;
    }
    /**
     * 注册一次性事件监听器
     * @param {string} eventType - 事件类型
     * @param {EventHandler} handler - 事件处理函数
     * @param {ListenerOptions} [options] - 监听器配置选项
     * @returns {EventEmitter} 返回this，支持链式调用
     */
    once(eventType, handler, options = {}) {
      return this.on(eventType, handler, { ...options, once: true });
    }
    /**
     * 移除事件监听器
     * @param {string} eventType - 事件类型
     * @param {EventHandler} [handler] - 要移除的处理函数，如果不指定则移除该类型的所有监听器
     * @returns {EventEmitter} 返回this，支持链式调用
     */
    off(eventType, handler) {
      if (!this._listeners[eventType]) {
        return this;
      }
      if (!handler) {
        delete this._listeners[eventType];
      } else {
        this._listeners[eventType] = this._listeners[eventType].filter(
          (listener) => listener.handler !== handler
        );
      }
      return this;
    }
    /**
     * 触发事件
     * @param {string} eventType - 事件类型
     * @param {*} [data] - 事件数据
     * @returns {boolean} 是否有监听器被触发
     * @example
     * const emitter = new EventEmitter();
     * emitter.on('message', (data) => {
     *   console.log('Received:', data);
     * });
     * emitter.emit('message', 'Hello World!');
     */
    emit(eventType, data) {
      const listeners = this._listeners[eventType];
      if (!listeners || listeners.length === 0) {
        return false;
      }
      const event = {
        type: eventType,
        data,
        timestamp: Date.now(),
        target: this
      };
      const listenersCopy = [...listeners];
      for (let i = listenersCopy.length - 1; i >= 0; i--) {
        const listener = listenersCopy[i];
        const context = listener.options.context || this;
        listener.handler.call(context, data, event);
        if (listener.options.once) {
          this._listeners[eventType] = this._listeners[eventType].filter(
            (l) => l !== listener
          );
        }
      }
      return true;
    }
    /**
     * 移除所有监听器或指定类型的监听器
     * @param {string} [eventType] - 事件类型，如果不指定则移除所有监听器
     * @returns {EventEmitter} 返回this，支持链式调用
     */
    removeAllListeners(eventType) {
      if (eventType) {
        delete this._listeners[eventType];
      } else {
        this._listeners = {};
      }
      return this;
    }
    /**
     * 获取指定类型的监听器数量
     * @param {string} eventType - 事件类型
     * @returns {number} 监听器数量
     */
    listenerCount(eventType) {
      const listeners = this._listeners[eventType];
      return listeners ? listeners.length : 0;
    }
    /**
     * 获取所有已注册的事件类型
     * @returns {Array<string>} 事件类型数组
     */
    eventNames() {
      return Object.keys(this._listeners);
    }
    /**
     * 设置最大监听器数量
     * @param {number} count - 最大监听器数量
     * @returns {EventEmitter} 返回this，支持链式调用
     */
    setMaxListeners(count) {
      this.maxListeners = count;
      return this;
    }
  }
  const VERSION = "1.0.0";
  exports2.Circle = Circle;
  exports2.EventEmitter = EventEmitter;
  exports2.MathUtils = MathUtils;
  exports2.Rectangle = Rectangle;
  exports2.Shape = Shape;
  exports2.ShapeFactory = ShapeFactory;
  exports2.ShapeType = ShapeType;
  exports2.VERSION = VERSION;
  Object.defineProperty(exports2, Symbol.toStringTag, { value: "Module" });
}));
//# sourceMappingURL=jsdoc-sdk.umd.js.map
