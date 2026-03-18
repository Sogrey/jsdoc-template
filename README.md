# JSDoc Template

一个基于 Vue 3 + Vite 的 JSDoc 文档生成模板项目，支持为 JavaScript 代码生成美观的 API 文档。

## 项目特性

- 📝 基于 [JSDoc](https://jsdoc.app/) 的文档生成
- 🎨 自定义文档模板，美观易用
- 📦 支持 SDK 多格式打包（UMD、CommonJS、ES Module）
- 📚 支持递归扫描 `src/sdk` 目录
- 🔍 支持 JSDoc pedantic 模式严格检查
- 🔄 支持文档实时监听更新
- 🌐 内置文档预览服务器
- 📦 使用 pnpm 管理依赖

## 技术栈

- **框架**: Vue 3.5.26
- **构建工具**: Vite 7.3.0
- **文档生成**: JSDoc 4.0.5
- **状态管理**: Pinia 3.0.4
- **路由**: Vue Router 4.6.4
- **类型检查**: TypeScript 5.9.3 + vue-tsc 3.2.2

## 项目结构

```
jsdoc-template/
├── src/
│   ├── sdk/              # SDK 源码目录（文档生成和打包目标）
│   ├── components/       # Vue 组件
│   ├── views/            # 页面视图
│   └── router/           # 路由配置
├── scripts/
│   ├── jsdoc/
│   │   ├── conf.json     # JSDoc 配置文件
│   │   └── jsdoc_template/ # 自定义文档模板
│   ├── sdk/
│   │   ├── package.json  # SDK NPM 配置模板
│   │   └── README.md     # SDK 使用文档模板
│   ├── build-sdk.mjs    # SDK 生产构建脚本
│   ├── build-sdk-dev.mjs # SDK 开发构建脚本
│   └── test-sdk.html    # SDK 功能测试页面
├── Build/
│   ├── Documentation/    # 生成的文档输出目录
│   └── SDK/              # SDK 构建输出目录（自动生成，gitignore）
├── public/               # 静态资源
└── package.json
```

## 环境要求

- Node.js ^20.19.0 || >=22.12.0
- pnpm (推荐) 或 npm

## 快速开始

**📖 新用户？** 查看 [QUICKSTART.md](./QUICKSTART.md) 快速上手 SDK 打包工具！

### 安装依赖

```sh
pnpm install
```

### 开发模式

启动 Vite 开发服务器：

```sh
pnpm run dev
```

### 生成文档

生成 JSDoc 文档：

```sh
pnpm run docs
```

生成严格模式的文档（pedantic 模式会检查 JSDoc 注释的完整性）：

```sh
pnpm run docs
```

### 文档实时监听

监听 `src/sdk` 目录变化，自动重新生成文档：

```sh
pnpm run docs-watch
```

### 文档预览

生成文档并启动本地预览服务器（默认端口 8081）：

```sh
pnpm run docs:serve
```

### 类型检查

检查 TypeScript 类型：

```sh
pnpm run type-check
```

### 代码检查

使用 ESLint 检查并自动修复代码：

```sh
pnpm run lint
```

### 代码格式化

使用 Prettier 格式化代码：

```sh
pnpm run format
```

### 生产构建

类型检查并构建生产版本：

```sh
pnpm run build
```

仅构建生产版本（跳过类型检查）：

```sh
pnpm run build-only
```

预览生产构建：

```sh
pnpm run preview
```

### SDK 构建

构建 SDK 为多种格式（ES Module、CommonJS、UMD）：

```sh
# 生产构建（压缩代码） + 开发构建（不压缩，包含 source map）
pnpm run build:sdk
```

SDK 构建输出到 `Build/SDK/` 目录，包含：
- `{SDK_NAME}.es.js` - ES Module 格式。适用于现代浏览器和构建工具，支持 tree-shaking，按需加载。
- `{SDK_NAME}.cjs.js` - CommonJS 格式。适用于 Node.js 环境。
- `{SDK_NAME}.umd.js` - UMD 格式（浏览器直接使用）。兼容各种环境，但体积较大。
- 对应的 `.js.map` source map 文件

> **注意**: `{SDK_NAME}` 默认为 `my-sdk`，可在 `package.json` 的 `sdk.name` 字段中配置。

### SDK 测试

构建 SDK 后，可以在浏览器中打开测试页面：

```sh
# 1. 先构建 SDK
pnpm run build:sdk

# 2. 在浏览器中打开测试页面
# 文件路径：scripts/test-sdk.html
```

测试页面提供了交互式测试，验证 SDK 的所有功能：
- 图形创建和计算（圆形、矩形）
- 工厂模式创建图形
- 事件发射器功能
- 数学工具类函数

## JSDoc 配置

文档生成配置位于 `scripts/jsdoc/conf.json`：

```json
{
  "source": {
    "include": ["src/sdk"],           // 包含的源码目录
    "includePattern": ".+\\.js(doc)?$", // 匹配的文件模式
    "recurse": true                  // 递归扫描子目录
  },
  "opts": {
    "destination": "Build/Documentation", // 输出目录
    "template": "./scripts/jsdoc/jsdoc_template" // 自定义模板
  }
}
```

## JSDoc 注释规范

### 函数注释

```javascript
/**
 * 计算两个数的和
 * @param {number} a - 第一个加数
 * @param {number} b - 第二个加数
 * @returns {number} 两数之和
 * @example
 * add(1, 2) // 返回 3
 */
function add(a, b) {
  return a + b;
}
```

### 类注释

```javascript
/**
 * 用户类
 * @class
 * @classdesc 表示一个用户实体
 */
class User {
  /**
   * 创建用户实例
   * @param {string} name - 用户名
   * @param {number} age - 年龄
   */
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}
```

## TypeScript 支持

项目使用 `vue-tsc` 进行类型检查，以支持 `.vue` 文件的类型检查。编辑器中需要安装 [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) 插件以获得完整的 TypeScript 支持。

## 自定义配置

- **Vite 配置**:
  - [vite.config.ts](./vite.config.ts) - 应用开发配置
  - [vite.config.sdk.ts](./vite.config.sdk.ts) - SDK 打包配置（支持开发和生产模式）
- **TypeScript 配置**:
  - [tsconfig.json](./tsconfig.json) - 主配置文件
  - [tsconfig.app.json](./tsconfig.app.json) - 应用配置
  - [tsconfig.node.json](./tsconfig.node.json) - Node 环境配置
- **ESLint 配置**: 查看 [eslint.config.ts](./eslint.config.ts)
- **JSDoc 配置**: 查看 [scripts/jsdoc/conf.json](./scripts/jsdoc/conf.json)
- **SDK 配置**: 查看 [vite.config.sdk.ts](./vite.config.sdk.ts)

## SDK 使用示例

### 在 Node.js 环境使用（CommonJS）

```javascript
const { Circle, Rectangle, ShapeFactory, EventEmitter } = require('./Build/SDK/{SDK_NAME}.cjs.js')

const circle = new Circle('myCircle', 0, 0, 5)
console.log(circle.getArea())
```

### 在浏览器中使用（UMD）

```html
<script src="./Build/SDK/{SDK_NAME}.umd.js"></script>
<script>
  const { Circle, ShapeFactory } = JSDocSDK
  const circle = new Circle('myCircle', 0, 0, 5)
  console.log(circle.getArea())
</script>
```

### 在模块化环境使用（ES Module）

```javascript
import { Circle, ShapeFactory } from './Build/SDK/{SDK_NAME}.es.js'

const circle = new Circle('myCircle', 0, 0, 5)
console.log(circle.getArea())
```

## License

MIT

## 相关文档

- **[QUICKSTART.md](./QUICKSTART.md)** - SDK 打包工具快速开始指南
- **[docs/SDK_BUILD_GUIDE.md](./docs/SDK_BUILD_GUIDE.md)** - SDK 构建详细指南
- **[Build/SDK/README.md](./Build/SDK/README.md)** - SDK API 文档
