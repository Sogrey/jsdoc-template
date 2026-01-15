# SDK 打包工具 - 快速开始

本文档帮助你快速上手 SDK 打包工具。

## 🚀 5 分钟快速开始

### 步骤 1：安装依赖

```bash
pnpm install
```

### 步骤 2：构建 SDK

```bash
# 开发模式构建（推荐用于调试）
pnpm run build:sdk:dev
```

### 步骤 3：测试 SDK

在浏览器中打开 `scripts/test-sdk.html` 文件，点击测试按钮验证 SDK 功能。

### 步骤 4：查看输出

构建完成后，检查 `Build/SDK/` 目录：

```
Build/SDK/
├── jsdoc-sdk.es.js      # ES Module 格式
├── jsdoc-sdk.cjs.js     # CommonJS 格式
├── jsdoc-sdk.umd.js     # UMD 格式
└── ...                  # 对应的 source map 文件
```

## 📦 使用 SDK

### 在浏览器中使用（UMD）

```html
<script src="./Build/SDK/jsdoc-sdk.umd.js"></script>
<script>
  // 使用全局变量 JSDocSDK
  const { Circle, Rectangle, ShapeFactory } = JSDocSDK

  // 创建一个圆形
  const circle = new Circle('myCircle', 0, 0, 5)
  console.log('圆的面积:', circle.getArea())
</script>
```

### 在 Node.js 中使用（CommonJS）

```javascript
const { Circle, Rectangle, ShapeFactory } = require('./Build/SDK/jsdoc-sdk.cjs.js')

const circle = new Circle('myCircle', 0, 0, 5)
console.log('圆的面积:', circle.getArea())
```

### 在现代项目中使用（ES Module）

```javascript
import { Circle, Rectangle, ShapeFactory } from './Build/SDK/jsdoc-sdk.es.js'

const circle = new Circle('myCircle', 0, 0, 5)
console.log('圆的面积:', circle.getArea())
```

## 🛠️ 可用命令

| 命令 | 说明 |
|------|------|
| `pnpm run build:sdk` | 生产构建（压缩） |
| `pnpm run build:sdk:dev` | 开发构建（未压缩 + source map） |
| `pnpm run docs` | 生成 JSDoc 文档 |
| `pnpm run docs:serve` | 生成并预览文档 |
| `pnpm run type-check` | TypeScript 类型检查 |
| `pnpm run lint` | ESLint 代码检查 |
| `pnpm run format` | Prettier 代码格式化 |

## 📚 文档

- **SDK API 文档**: 查看 [Build/SDK/README.md](Build/SDK/README.md)
- **详细构建指南**: 查看 [docs/SDK_BUILD_GUIDE.md](docs/SDK_BUILD_GUIDE.md)
- **项目 README**: 查看 [README.md](README.md)

## 🎯 SDK 功能

SDK 提供以下主要功能：

1. **图形类**：Shape、Circle、Rectangle
2. **工厂模式**：ShapeFactory - 批量创建图形
3. **事件系统**：EventEmitter - 发布订阅模式
4. **数学工具**：MathUtils - 常用数学函数

## 🧪 测试示例

```javascript
// 创建图形
const circle = new Circle('circle', 0, 0, 5)
console.log(circle.getArea())        // 78.54
console.log(circle.getPerimeter())   // 31.42

// 使用工厂
const rect = ShapeFactory.createShape(ShapeType.RECTANGLE, {
  name: 'rectangle',
  x: 0, y: 0,
  width: 4, height: 5
})

// 使用事件发射器
const emitter = new EventEmitter()
emitter.on('change', (data) => {
  console.log('Changed:', data)
})
emitter.emit('change', { value: 'hello' })

// 使用数学工具
const distance = MathUtils.distance(0, 0, 3, 4)
console.log('距离:', distance)  // 5
```

## 💡 提示

- **开发调试**：使用 `build:sdk:dev` 生成未压缩代码和 source map
- **生产部署**：使用 `build:sdk` 生成压缩后的代码
- **查看文档**：运行 `pnpm run docs:serve` 查看生成的 JSDoc 文档
- **测试功能**：打开 `scripts/test-sdk.html` 进行交互式测试

## 🆘 遇到问题？

1. **构建失败**：检查 `src/sdk/index.js` 中的导入路径是否正确
2. **浏览器报错**：确保使用正确的格式（ES/UMD）和文件路径
3. **TypeScript 错误**：运行 `pnpm run type-check` 查看详细信息
4. **需要更多帮助**：查看 [docs/SDK_BUILD_GUIDE.md](docs/SDK_BUILD_GUIDE.md)

## 🎉 下一步

- 查看 [SDK 构建指南](docs/SDK_BUILD_GUIDE.md) 了解更多细节
- 查看 [API 文档](Build/SDK/README.md) 了解所有可用的 API
- 修改 `src/sdk/` 下的代码，重新构建并测试你的改动
