# JSDoc Template

一个基于 Vue 3 + Vite 的 JSDoc 文档生成模板项目，支持为 JavaScript 代码生成美观的 API 文档。

## 项目特性

- 📝 基于 [JSDoc](https://jsdoc.app/) 的文档生成
- 🎨 自定义文档模板，美观易用
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
│   ├── sdk/              # SDK 源码目录（文档生成目标）
│   ├── components/       # Vue 组件
│   ├── views/            # 页面视图
│   └── router/           # 路由配置
├── scripts/
│   └── jsdoc/
│       ├── conf.json     # JSDoc 配置文件
│       └── jsdoc_template/ # 自定义文档模板
├── Build/
│   └── Documentation/    # 生成的文档输出目录
├── public/               # 静态资源
└── package.json
```

## 环境要求

- Node.js ^20.19.0 || >=22.12.0
- pnpm (推荐) 或 npm

## 快速开始

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
pnpm run docs:pedantic
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

## IDE 推荐配置

### VS Code

推荐安装以下插件：

- [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) - Vue 3 语言支持
- [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) - Vue TypeScript 支持
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) - 代码检查
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) - 代码格式化

### 浏览器开发工具

推荐安装 Vue.js devtools：

- [Chrome/Edge](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
- [Firefox](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)

## TypeScript 支持

项目使用 `vue-tsc` 进行类型检查，以支持 `.vue` 文件的类型检查。编辑器中需要安装 [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) 插件以获得完整的 TypeScript 支持。

## 自定义配置

- **Vite 配置**: 查看 [vite.config.ts](./vite.config.ts)
- **TypeScript 配置**:
  - [tsconfig.json](./tsconfig.json) - 主配置文件
  - [tsconfig.app.json](./tsconfig.app.json) - 应用配置
  - [tsconfig.node.json](./tsconfig.node.json) - Node 环境配置
- **ESLint 配置**: 查看 [eslint.config.ts](./eslint.config.ts)
- **JSDoc 配置**: 查看 [scripts/jsdoc/conf.json](./scripts/jsdoc/conf.json)

## License

MIT
