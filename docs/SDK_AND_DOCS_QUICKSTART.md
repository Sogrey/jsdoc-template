# SDK 打包与文档生成快速指南

本文档总结了一个完整的 JavaScript SDK 开发实践，包括：
- SDK 多格式打包（ES Module、CommonJS、UMD）
- TypeScript 类型定义生成
- JSDoc 文档生成
- 可配置的 SDK 名称和命名空间

## 目录

- [快速开始](#快速开始)
- [依赖安装](#依赖安装)
- [目录结构](#目录结构)
- [可复用文件清单](#可复用文件清单)
- [配置步骤详解](#配置步骤详解)
- [自定义修改指南](#自定义修改指南)
- [NPM 脚本说明](#npm-脚本说明)
- [常见问题](#常见问题)

---

## 快速开始

```bash
# 1. 安装依赖
pnpm install

# 2. 构建 SDK（生产版 + 开发版）
pnpm run build:sdk

# 3. 生成文档
pnpm run docs

# 4. 一键发布（SDK + 文档）
pnpm run release
```

---

## 依赖安装

### 核心依赖

```bash
# SDK 打包
pnpm add -D vite terser vite-plugin-dts

# TypeScript 支持
pnpm add -D typescript @types/node

# JSDoc 文档生成
pnpm add jsdoc taffydb

# 工具库
pnpm add -D npm-run-all2
```

### package.json 依赖示例

```json
{
  "dependencies": {
    "jsdoc": "^4.0.5",
    "taffydb": "^2.7.3"
  },
  "devDependencies": {
    "@types/node": "^24.10.4",
    "npm-run-all2": "^8.0.4",
    "terser": "^5.45.0",
    "typescript": "~5.9.3",
    "vite": "^7.3.0",
    "vite-plugin-dts": "^4.5.4"
  }
}
```

---

## 目录结构

```
project/
├── Build/                      # 构建输出目录
│   ├── Documentation/          # JSDoc 生成的文档
│   ├── SDK/                    # 生产版 SDK
│   └── SDK-dev/                # 开发版 SDK
├── docs/                       # 项目文档
├── scripts/
│   ├── build-sdk.mjs           # SDK 构建脚本
│   ├── sdk/                    # SDK 模板文件
│   │   ├── package.json        # SDK package.json 模板
│   │   └── README.md           # SDK README 模板
│   └── jsdoc/                  # JSDoc 配置
│       ├── conf.json           # JSDoc 基础配置
│       ├── conf.generated.json # 生成的配置（自动）
│       ├── generate-config.mjs # 配置生成脚本
│       └── jsdoc_template/     # 文档模板
├── src/
│   └── sdk/                    # SDK 源代码
│       ├── index.js            # 入口文件
│       ├── Shape.js            # 类文件示例
│       └── ...
├── package.json
├── tsconfig.types.json         # TypeScript 类型配置
├── vite.config.sdk.ts          # Vite SDK 打包配置
└── .gitignore
```

---

## 可复用文件清单

### 直接复用（无需修改）

| 文件 | 说明 |
|------|------|
| `scripts/build-sdk.mjs` | SDK 构建脚本 |
| `scripts/jsdoc/generate-config.mjs` | JSDoc 配置生成脚本 |
| `scripts/jsdoc/jsdoc_template/` | JSDoc 文档模板目录 |
| `tsconfig.types.json` | TypeScript 类型配置 |
| `vite.config.sdk.ts` | Vite SDK 打包配置 |

### 需要修改的配置文件

| 文件 | 修改内容 |
|------|----------|
| `package.json` | SDK 配置、项目信息、脚本 |
| `scripts/sdk/package.json` | SDK 包信息模板 |
| `scripts/sdk/README.md` | SDK 使用文档模板 |
| `scripts/jsdoc/conf.json` | JSDoc 源码路径配置 |
| `.gitignore` | 忽略构建输出目录 |

---

## 配置步骤详解

### 第一步：配置 package.json

在 `package.json` 中添加 SDK 配置项：

```json
{
  "name": "your-project-name",
  "version": "1.0.0",
  "sdk": {
    "name": "your-sdk-name",      // SDK 文件名，默认 my-sdk
    "namespace": "YourNamespace"  // UMD 全局变量名，默认 SDK
  },
  "scripts": {
    "build:sdk": "node scripts/build-sdk.mjs --all",
    "docs": "node scripts/jsdoc/generate-config.mjs && npx jsdoc --configure scripts/jsdoc/conf.generated.json --pedantic",
    "docs:serve": "npm run docs && npx http-server Build/Documentation -o -p 8081",
    "release": "npm run build:sdk && npm run docs"
  }
}
```

**配置说明：**

| 字段 | 说明 | 默认值 |
|------|------|--------|
| `sdk.name` | SDK 输出文件名 | `my-sdk` |
| `sdk.namespace` | UMD 全局变量名，用于 `new Namespace.Class()` | `SDK` |

### 第二步：创建 SDK 源码

在 `src/sdk/` 目录下创建 SDK 源代码：

```javascript
// src/sdk/index.js - 入口文件
/**
 * @fileoverview SDK 模块入口文件
 */

export const VERSION = '1.0.0'

// 导出类
export { MyClass } from './MyClass.js'
export { MyUtils } from './MyUtils.js'
```

```javascript
// src/sdk/MyClass.js - 类示例
/**
 * 示例类
 * @class
 */
export class MyClass {
  /**
   * 创建实例
   * @constructor
   * @param {string} name - 名称
   */
  constructor(name) {
    this.name = name
  }

  /**
   * 获取名称
   * @returns {string} 名称
   */
  getName() {
    return this.name
  }
}
```

### 第三步：配置 JSDoc

编辑 `scripts/jsdoc/conf.json`：

```json
{
  "source": {
    "include": ["src/sdk"],           // 修改为你的 SDK 源码目录
    "exclude": [],
    "includePattern": ".+\\.js(doc)?$",
    "excludePattern": "(^|\\/|\\\\)_"
  },
  "templates": {
    "cleverLinks": true,
    "default": {
      "outputSourceFiles": false
    }
  },
  "opts": {
    "destination": "Build/Documentation",  // 文档输出目录
    "template": "./scripts/jsdoc/jsdoc_template",
    "recurse": true
  }
}
```

### 第四步：配置 SDK 模板

编辑 `scripts/sdk/package.json`，使用 `{{SDK_NAME}}` 占位符：

```json
{
  "name": "{{SDK_NAME}}",
  "version": "1.0.0",
  "description": "你的 SDK 描述",
  "main": "{{SDK_NAME}}.cjs.js",
  "module": "{{SDK_NAME}}.es.js",
  "types": "{{SDK_NAME}}.d.ts",
  "exports": {
    ".": {
      "import": "./{{SDK_NAME}}.es.js",
      "require": "./{{SDK_NAME}}.cjs.js",
      "types": "./{{SDK_NAME}}.d.ts"
    }
  },
  "browser": "{{SDK_NAME}}.umd.js",
  "keywords": ["your", "keywords"],
  "author": "Your Name",
  "license": "MIT"
}
```

### 第五步：配置 TypeScript

创建 `tsconfig.types.json`：

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["ES2020"],
    "allowJs": true,
    "checkJs": false,
    "declaration": true,
    "declarationMap": true,
    "emitDeclarationOnly": false,
    "strict": false,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "moduleResolution": "bundler"
  },
  "include": ["src/sdk/**/*.js"],
  "exclude": ["node_modules", "**/*.test.js", "**/*.spec.js"]
}
```

### 第六步：配置 .gitignore

```gitignore
# 构建输出
Build/

# JSDoc 生成的配置
scripts/jsdoc/conf.generated.json
```

---

## 自定义修改指南

### 修改 SDK 名称和命名空间

**方式一：修改 package.json**

```json
{
  "sdk": {
    "name": "my-awesome-sdk",
    "namespace": "MyAwesomeSDK"
  }
}
```

**方式二：使用默认值**

如果不配置，将使用默认值：
- `name`: `my-sdk`
- `namespace`: `SDK`

### 修改输出目录

编辑 `scripts/build-sdk.mjs`：

```javascript
// 修改输出目录
const OUTPUT_DIR = resolve(__dirname, '../dist/sdk')      // 生产版
const OUTPUT_DIR_DEV = resolve(__dirname, '../dist/sdk-dev')  // 开发版
```

同步修改 `vite.config.sdk.ts` 和 `scripts/jsdoc/conf.json`。

### 修改文档模板命名空间显示

文档模板会自动读取 `sdk.namespace` 配置，在类名前显示命名空间：

```
MyNamespace.ClassName
```

### 添加外部依赖

编辑 `vite.config.sdk.ts`：

```javascript
rollupOptions: {
  external: ['lodash', 'axios'],  // 不打包的依赖
  output: {
    globals: {
      lodash: '_',
      axios: 'axios'
    }
  }
}
```

---

## NPM 脚本说明

| 脚本 | 说明 |
|------|------|
| `pnpm run build:sdk` | 构建生产版和开发版 SDK |
| `pnpm run build:sdk -- --dev` | 仅构建开发版 SDK |
| `pnpm run docs` | 生成 JSDoc 文档 |
| `pnpm run docs:serve` | 生成文档并启动本地服务器 |
| `pnpm run release` | 一键构建 SDK 和文档 |

---

## 输出文件说明

### SDK 输出（Build/SDK/）

| 文件 | 格式 | 说明 |
|------|------|------|
| `{name}.es.js` | ES Module | 现代浏览器、构建工具 |
| `{name}.cjs.js` | CommonJS | Node.js 环境 |
| `{name}.umd.js` | UMD | 浏览器直接引用 |
| `{name}.d.ts` | TypeScript | 类型定义 |
| `package.json` | - | NPM 包配置 |
| `README.md` | - | 使用文档 |

### 文档输出（Build/Documentation/）

完整的 HTML 文档站点，包含：
- 类列表和详情
- 方法说明和参数
- 示例代码
- 搜索功能

---

## 使用示例

### 浏览器 UMD

```html
<script src="./Build/SDK/my-sdk.umd.js"></script>
<script>
  // 使用配置的命名空间
  const instance = new MySDK.MyClass('test')
  console.log(instance.getName())
</script>
```

### ES Module

```javascript
import { MyClass } from './Build/SDK/my-sdk.es.js'

const instance = new MyClass('test')
console.log(instance.getName())
```

### CommonJS

```javascript
const { MyClass } = require('./Build/SDK/my-sdk.cjs.js')

const instance = new MyClass('test')
console.log(instance.getName())
```

---

## 常见问题

### Q: 如何只构建开发版或生产版？

```bash
# 仅开发版
node scripts/build-sdk.mjs --dev

# 仅生产版
node scripts/build-sdk.mjs
```

### Q: 如何修改 JSDoc 文档模板？

编辑 `scripts/jsdoc/jsdoc_template/` 目录下的模板文件：
- `tmpl/` - HTML 模板
- `static/` - 静态资源
- `publish.js` - 生成逻辑

### Q: 类型定义文件没有生成？

1. 确保 `tsconfig.types.json` 配置正确
2. 检查源码是否有 JSDoc 注释
3. 运行 `npx tsc --project tsconfig.types.json` 查看错误

### Q: 如何发布到 NPM？

```bash
cd Build/SDK
npm publish
```

### Q: 文档中命名空间显示不正确？

确保：
1. `package.json` 中配置了 `sdk.namespace`
2. 重新运行 `pnpm run docs`

---

## 最佳实践

1. **JSDoc 注释规范**：为所有公开 API 添加完整的 JSDoc 注释
2. **版本管理**：在 `package.json` 中维护版本号，SDK 会自动同步
3. **类型定义**：使用 JSDoc 注释让 TypeScript 自动推断类型
4. **Source Map**：生产版保留 source map 便于调试
5. **文档同步**：每次发布前运行 `pnpm run release` 同步更新

---

## 参考资源

- [Vite 官方文档](https://vitejs.dev/)
- [JSDoc 官方文档](https://jsdoc.app/)
- [TypeScript 官方文档](https://www.typescriptlang.org/)
- [vite-plugin-dts](https://github.com/qmhc/vite-plugin-dts)

---

## License

MIT
