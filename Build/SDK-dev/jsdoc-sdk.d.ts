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
    constructor(name: string, x: number, y: number, radius: number);
    /**
     * @type {number}
     * @description 圆的半径
     */
    radius: number;
    /**
     * 获取圆的直径
     * @returns {number} 圆的直径
     */
    getDiameter(): number;
    /**
     * 调整圆的大小
     * @param {number} newRadius - 新的半径
     * @throws {Error} 当新半径小于等于0时抛出错误
     */
    resize(newRadius: number): void;
}
import { Shape } from './Shape.js';
//# sourceMappingURL=Circle.d.ts.map

/**
 * @fileoverview 事件发射器类，实现观察者模式
 */
/**
 * 事件处理器类型定义
 * @callback EventHandler
 * @param {*} data - 事件数据
 * @param {Event} event - 事件对象
 */
/**
 * 事件对象
 * @typedef {Object} Event
 * @property {string} type - 事件类型
 * @property {*} data - 事件数据
 * @property {number} timestamp - 事件时间戳
 * @property {Object} [target] - 事件目标对象
 */
/**
 * 监听器配置
 * @typedef {Object} ListenerOptions
 * @property {boolean} [once=false] - 是否只触发一次
 * @property {Object} [context] - 绑定的上下文对象
 */
/**
 * 事件发射器类
 * @class
 * @description 实现发布-订阅模式，允许对象注册事件监听器并触发事件
 */
export class EventEmitter {
    /**
     * @type {Object.<string, Array<{handler: EventHandler, options: ListenerOptions}>>}
     * @description 事件监听器映射表
     * @private
     */
    private _listeners;
    /**
     * @type {number}
     * @description 最大监听器数量，用于防止内存泄漏
     */
    maxListeners: number;
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
    on(eventType: string, handler: EventHandler, options?: ListenerOptions): EventEmitter;
    /**
     * 注册一次性事件监听器
     * @param {string} eventType - 事件类型
     * @param {EventHandler} handler - 事件处理函数
     * @param {ListenerOptions} [options] - 监听器配置选项
     * @returns {EventEmitter} 返回this，支持链式调用
     */
    once(eventType: string, handler: EventHandler, options?: ListenerOptions): EventEmitter;
    /**
     * 移除事件监听器
     * @param {string} eventType - 事件类型
     * @param {EventHandler} [handler] - 要移除的处理函数，如果不指定则移除该类型的所有监听器
     * @returns {EventEmitter} 返回this，支持链式调用
     */
    off(eventType: string, handler?: EventHandler): EventEmitter;
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
    emit(eventType: string, data?: any): boolean;
    /**
     * 移除所有监听器或指定类型的监听器
     * @param {string} [eventType] - 事件类型，如果不指定则移除所有监听器
     * @returns {EventEmitter} 返回this，支持链式调用
     */
    removeAllListeners(eventType?: string): EventEmitter;
    /**
     * 获取指定类型的监听器数量
     * @param {string} eventType - 事件类型
     * @returns {number} 监听器数量
     */
    listenerCount(eventType: string): number;
    /**
     * 获取所有已注册的事件类型
     * @returns {Array<string>} 事件类型数组
     */
    eventNames(): Array<string>;
    /**
     * 设置最大监听器数量
     * @param {number} count - 最大监听器数量
     * @returns {EventEmitter} 返回this，支持链式调用
     */
    setMaxListeners(count: number): EventEmitter;
}
/**
 * 事件处理器类型定义
 */
export type EventHandler = (data: any, event: Event) => any;
/**
 * 事件对象
 */
export type Event = {
    /**
     * - 事件类型
     */
    type: string;
    /**
     * - 事件数据
     */
    data: any;
    /**
     * - 事件时间戳
     */
    timestamp: number;
    /**
     * - 事件目标对象
     */
    target?: any;
};
/**
 * 监听器配置
 */
export type ListenerOptions = {
    /**
     * - 是否只触发一次
     */
    once?: boolean;
    /**
     * - 绑定的上下文对象
     */
    context?: any;
};
//# sourceMappingURL=EventEmitter.d.ts.map

/**
 * @fileoverview SDK 模块入口文件
 * 导出所有 SDK 类和工具
 */
export const VERSION: "1.0.0";
export { Shape } from "./Shape.js";
export { Circle } from "./Circle.js";
export { Rectangle } from "./Rectangle.js";
export { MathUtils } from "./MathUtils.js";
export { EventEmitter } from "./EventEmitter.js";
export { ShapeFactory, ShapeType } from "./ShapeFactory.js";
//# sourceMappingURL=index.d.ts.map

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
    static PI: number;
    /**
     * 常量：欧拉数
     * @static
     * @constant {number}
     */
    static E: number;
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
    static distance(x1: number, y1: number, x2: number, y2: number): number;
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
    static midpoint(x1: number, y1: number, x2: number, y2: number): any;
    /**
     * 将角度转换为弧度
     * @static
     * @param {number} degrees - 角度值
     * @returns {number} 弧度值
     */
    static degreesToRadians(degrees: number): number;
    /**
     * 将弧度转换为角度
     * @static
     * @param {number} radians - 弧度值
     * @returns {number} 角度值
     */
    static radiansToDegrees(radians: number): number;
    /**
     * 限制数值在指定范围内
     * @static
     * @param {number} value - 要限制的值
     * @param {number} min - 最小值
     * @param {number} max - 最大值
     * @returns {number} 限制后的值
     */
    static clamp(value: number, min: number, max: number): number;
    /**
     * 线性插值
     * @static
     * @param {number} start - 起始值
     * @param {number} end - 结束值
     * @param {number} t - 插值因子（0到1之间）
     * @returns {number} 插值结果
     */
    static lerp(start: number, end: number, t: number): number;
    /**
     * 判断一个数是否为质数
     * @static
     * @param {number} n - 要判断的数
     * @returns {boolean} 如果是质数返回true，否则返回false
     */
    static isPrime(n: number): boolean;
    /**
     * 计算数组平均值
     * @static
     * @param {Array<number>} numbers - 数字数组
     * @returns {number} 平均值
     * @throws {Error} 当数组为空时抛出错误
     */
    static average(numbers: Array<number>): number;
    /**
     * 计算数组标准差
     * @static
     * @param {Array<number>} numbers - 数字数组
     * @returns {number} 标准差
     */
    static standardDeviation(numbers: Array<number>): number;
}
//# sourceMappingURL=MathUtils.d.ts.map

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
    constructor(name: string, x: number, y: number, width: number, height: number);
    /**
     * @type {number}
     * @description 矩形的宽度
     */
    width: number;
    /**
     * @type {number}
     * @description 矩形的高度
     */
    height: number;
    /**
     * 判断一个点是否在矩形内部
     * @param {number} px - 点的X坐标
     * @param {number} py - 点的Y坐标
     * @returns {boolean} 如果点在矩形内部返回true，否则返回false
     */
    containsPoint(px: number, py: number): boolean;
    /**
     * 获取矩形的右下角坐标
     * @returns {Object} 包含x和y坐标的对象
     */
    getBottomRight(): any;
    /**
     * 获取矩形的中心点坐标
     * @returns {Object} 包含x和y坐标的对象
     */
    getCenter(): any;
}
import { Shape } from './Shape.js';
//# sourceMappingURL=Rectangle.d.ts.map

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
    constructor(name: string, x: number, y: number);
    /**
     * @type {string}
     * @description 图形的名称
     */
    name: string;
    /**
     * @type {number}
     * @description X坐标
     */
    x: number;
    /**
     * @type {number}
     * @description Y坐标
     */
    y: number;
    /**
     * 计算图形的面积
     * @abstract
     * @returns {number} 图形的面积
     */
    getArea(): number;
    /**
     * 计算图形的周长
     * @abstract
     * @returns {number} 图形的周长
     */
    getPerimeter(): number;
    /**
     * 移动图形到新的位置
     * @param {number} newX - 新的X坐标
     * @param {number} newY - 新的Y坐标
     */
    moveTo(newX: number, newY: number): void;
    /**
     * 获取图形的位置信息
     * @returns {Object} 包含x和y坐标的对象
     * @returns {number} returns.x - X坐标
     * @returns {number} returns.y - Y坐标
     */
    getPosition(): any;
    /**
     * 获取图形的字符串表示
     * @returns {string} 图形的描述信息
     */
    toString(): string;
}
//# sourceMappingURL=Shape.d.ts.map

/**
 * 图形类型枚举
 */
export type ShapeType = string;
/**
 * 图形类型枚举
 * @enum {string}
 */
export const ShapeType: Readonly<{
    /**
     * 圆形
     *
     * @type {String}
     * @constant
     */
    CIRCLE: string;
    /**
     * 矩形
     *
     * @type {String}
     * @constant
     */
    RECTANGLE: string;
    /**
     * 三角形
     *
     * @type {String}
     * @constant
     */
    TRIANGLE: string;
}>;
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
    static createShape(type: ShapeType, options: {
        name: string;
        x: number;
        y: number;
        radius?: number;
        width?: number;
        height?: number;
    }): Shape;
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
    static createShapes(configs: Array<any>): Array<Shape>;
    /**
     * 计算多个图形的总面积
     * @static
     * @param {Array<Shape>} shapes - 图形数组
     * @returns {number} 所有图形的总面积
     */
    static calculateTotalArea(shapes: Array<Shape>): number;
    /**
     * 根据名称查找图形
     * @static
     * @param {Array<Shape>} shapes - 图形数组
     * @param {string} name - 要查找的图形名称
     * @returns {Shape|undefined} 找到的图形，如果未找到返回undefined
     */
    static findShapeByName(shapes: Array<Shape>, name: string): Shape | undefined;
}
import { Shape } from './Shape.js';
//# sourceMappingURL=ShapeFactory.d.ts.map

