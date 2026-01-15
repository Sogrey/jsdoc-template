# JSDoc SDK

一个用于生成和管理几何图形的工具库，支持多种图形类型和事件机制。

## 安装

### NPM
```bash
npm install jsdoc-sdk
```

### Yarn
```bash
yarn add jsdoc-sdk
```

### pnpm
```bash
pnpm add jsdoc-sdk
```

## 使用方式

### ES Module
```javascript
import { ShapeFactory, Circle, Rectangle, EventEmitter } from 'jsdoc-sdk'

// 创建图形
const circle = new Circle('myCircle', 0, 0, 5)
console.log(circle.getArea())

// 使用工厂创建
const rect = ShapeFactory.createShape(ShapeType.RECTANGLE, {
  name: 'myRect',
  x: 0,
  y: 0,
  width: 4,
  height: 5
})
```

### CommonJS
```javascript
const { ShapeFactory, Circle, Rectangle, EventEmitter } = require('jsdoc-sdk')

// 创建图形
const circle = new Circle('myCircle', 0, 0, 5)
console.log(circle.getArea())
```

### UMD (浏览器)
```html
<script src="jsdoc-sdk.umd.js"></script>
<script>
  const { ShapeFactory, Circle, Rectangle, EventEmitter } = JSDocSDK

  const circle = new Circle('myCircle', 0, 0, 5)
  console.log(circle.getArea())
</script>
```

## API 文档

完整的 API 文档请参考项目主文档。

## 特性

- 📐 支持多种几何图形（圆形、矩形等）
- 🏭 工厂模式创建图形
- 📦 支持多种模块格式（ES Module, CommonJS, UMD）
- 🔔 内置事件发射器（EventEmitter）
- 🧮 数学工具类（MathUtils）
- 📚 完整的 JSDoc 文档
- 📦 提供 Source Map

## 主要类

### Shape
基础图形类，定义了所有图形的通用属性和方法。

### Circle
圆形类，继承自 Shape，提供圆形相关的计算方法。

### Rectangle
矩形类，继承自 Shape，提供矩形相关的计算方法。

### ShapeFactory
图形工厂类，用于创建和管理图形对象。

### EventEmitter
事件发射器类，实现发布-订阅模式。

### MathUtils
数学工具类，提供常用的数学计算方法。

## 示例

### 创建和使用图形
```javascript
import { Circle, Rectangle } from 'jsdoc-sdk'

// 创建圆形
const circle = new Circle('myCircle', 0, 0, 5)
console.log('面积:', circle.getArea())
console.log('周长:', circle.getPerimeter())
console.log('直径:', circle.getDiameter())

// 创建矩形
const rect = new Rectangle('myRect', 0, 0, 4, 5)
console.log('面积:', rect.getArea())
console.log('周长:', rect.getPerimeter())
console.log('中心点:', rect.getCenter())
```

### 使用工厂模式
```javascript
import { ShapeFactory, ShapeType } from 'jsdoc-sdk'

// 创建多个图形
const shapes = ShapeFactory.createShapes([
  {
    type: ShapeType.CIRCLE,
    options: { name: 'c1', x: 0, y: 0, radius: 5 }
  },
  {
    type: ShapeType.RECTANGLE,
    options: { name: 'r1', x: 10, y: 10, width: 4, height: 5 }
  }
])

// 计算总面积
const totalArea = ShapeFactory.calculateTotalArea(shapes)
console.log('总面积:', totalArea)
```

### 使用事件发射器
```javascript
import { EventEmitter } from 'jsdoc-sdk'

class MyObject extends EventEmitter {
  constructor() {
    super()
  }

  triggerEvent() {
    this.emit('change', { value: 'hello' })
  }
}

const obj = new MyObject()
obj.on('change', (data) => {
  console.log('Changed:', data.value)
})

obj.triggerEvent()
```

### 使用数学工具
```javascript
import { MathUtils } from 'jsdoc-sdk'

// 计算两点距离
const distance = MathUtils.distance(0, 0, 3, 4)
console.log('距离:', distance) // 5

// 线性插值
const result = MathUtils.lerp(0, 100, 0.5)
console.log('插值:', result) // 50
```

## License

MIT
