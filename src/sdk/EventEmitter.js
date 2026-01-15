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
   * 创建事件发射器实例
   * @constructor
   */
  constructor() {
    /**
     * @type {Object.<string, Array<{handler: EventHandler, options: ListenerOptions}>>}
     * @description 事件监听器映射表
     * @private
     */
    this._listeners = {};

    /**
     * @type {number}
     * @description 最大监听器数量，用于防止内存泄漏
     */
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
        listener => listener.handler !== handler
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
      data: data,
      timestamp: Date.now(),
      target: this
    };

    // 创建副本以避免在遍历时修改数组
    const listenersCopy = [...listeners];

    for (let i = listenersCopy.length - 1; i >= 0; i--) {
      const listener = listenersCopy[i];
      const context = listener.options.context || this;
      listener.handler.call(context, data, event);

      // 如果是一次性监听器，移除它
      if (listener.options.once) {
        this._listeners[eventType] = this._listeners[eventType].filter(
          l => l !== listener
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
