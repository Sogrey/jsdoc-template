# SDK 构建指南

本文档介绍如何使用 SDK 打包工具为 `src/sdk` 目录下的代码生成多种格式的打包文件。

## 目录结构

```
src/sdk/
├── index.js              # SDK 入口文件，导出所有公共 API
├── Shape.js              # 基础图形类
├── Circle.js             # 圆形类
├── Rectangle.js          # 矩形类
├── ShapeFactory.js      # 图形工厂类
├── MathUtils.js          # 数学工具类
└── EventEmitter.js       # 事件发射器类
```

## 构建命令

### 生产构建

```bash
pnpm run build:sdk
```

生成压缩后的代码，适合生产环境使用。

### 开发构建

```bash
pnpm run build:sdk:dev
```

生成未压缩的代码，包含完整的 source map，适合开发调试。

## 输出格式

构建完成后，在 `Build/SDK/` 目录下会生成以下文件：

### 1. ES Module 格式

```
jsdoc-sdk.es.js
jsdoc-sdk.es.js.map
```

**使用场景**：
- 现代前端项目（使用 Vite、Webpack 等打包工具）
- 支持 ES Module 的浏览器
- Node.js 环境下的 ES Module

**示例**：
```javascript
import { Circle, ShapeFactory } from './jsdoc-sdk.es.js'
```

### 2. CommonJS 格式

```
jsdoc-sdk.cjs.js
jsdoc-sdk.cjs.js.map
```

**使用场景**：
- Node.js 传统项目
- 使用 Webpack 1.x 或其他支持 CommonJS 的打包工具

**示例**：
```javascript
const { Circle, ShapeFactory } = require('./jsdoc-sdk.cjs.js')
```

### 3. UMD 格式

```
jsdoc-sdk.umd.js
jsdoc-sdk.umd.js.map
```

**使用场景**：
- 浏览器直接引入（通过 `<script>` 标签）
- AMD/RequireJS 环境
- 需要兼容多种模块系统的项目

**示例**：
```html
<script src="jsdoc-sdk.umd.js"></script>
<script>
  // 全局变量 JSDocSDK
  const { Circle, ShapeFactory } = JSDocSDK
</script>
```

## 配置说明

### Vite SDK 配置

配置文件：`vite.config.sdk.ts`

```typescript
{
  build: {
    lib: {
      entry: './src/sdk/index.js',      // 入口文件
      name: 'JSDocSDK',                 // UMD 全局变量名
      fileName: (format) => `jsdoc-sdk.${format}.js`,
      formats: ['es', 'cjs', 'umd']    // 输出格式
    },
    rollupOptions: {
      external: [],                     // 外部依赖（不打包）
      output: {
        globals: {}                     // 全局变量映射
      }
    },
    minify: 'terser',                   // 压缩工具
    sourcemap: true                     // 生成 source map
  }
}
```

### 修改打包配置

#### 添加外部依赖

如果你的 SDK 依赖其他库，可以在 `vite.config.sdk.ts` 中配置为外部依赖：

```typescript
{
  rollupOptions: {
    external: ['lodash', 'axios'],
    output: {
      globals: {
        lodash: '_',
        axios: 'axios'
      }
    }
  }
}
```

#### 修改输出文件名

```typescript
{
  build: {
    lib: {
      fileName: (format) => {
        if (format === 'umd') return 'my-lib.min.js'
        if (format === 'cjs') return 'my-lib.cjs'
        return 'my-lib.js'
      }
    }
  }
}
```

## 添加新的 SDK 模块

### 1. 创建新的模块文件

在 `src/sdk/` 目录下创建新的 JavaScript 文件：

```javascript
// src/sdk/MyModule.js

/**
 * 我的自定义模块
 * @class
 */
export class MyModule {
  /**
   * 构造函数
   */
  constructor() {
    this.value = 0;
  }

  /**
   * 设置值
   * @param {number} val - 新值
   */
  setValue(val) {
    this.value = val;
  }

  /**
   * 获取值
   * @returns {number} 当前值
   */
  getValue() {
    return this.value;
  }
}
```

### 2. 在入口文件中导出

在 `src/sdk/index.js` 中添加导出：

```javascript
// 导出其他模块
export { Circle } from './Circle.js'
export { Rectangle } from './Rectangle.js'

// 添加新模块的导出
export { MyModule } from './MyModule.js'
```

### 3. 重新构建

```bash
pnpm run build:sdk:dev
```

### 4. 测试新模块

打开 `scripts/test-sdk.html`，添加测试代码验证新模块功能。

## 调试技巧

### 1. 使用开发构建

开发构建包含完整的 source map，方便在浏览器开发者工具中调试：

```bash
pnpm run build:sdk:dev
```

### 2. 使用测试页面

打开 `scripts/test-sdk.html` 测试 SDK 功能：

1. 确保 SDK 已构建
2. 在浏览器中打开 `scripts/test-sdk.html`
3. 点击测试按钮验证功能

### 3. 查看打包结果

检查 `Build/SDK/` 目录下的文件：
- 确认所有格式都已生成
- 检查文件大小是否合理
- 验证 source map 文件存在

## 发布到 npm

### 1. 更新版本号

在 `Build/SDK/package.json` 中更新版本：

```json
{
  "version": "1.0.0"
}
```

### 2. 准备发布文件

确保以下文件存在于 `Build/SDK/` 目录：
- `jsdoc-sdk.es.js`
- `jsdoc-sdk.cjs.js`
- `jsdoc-sdk.umd.js`
- `package.json`
- `README.md`

### 3. 发布

```bash
cd Build/SDK
npm publish
```

## 常见问题

### Q1: 构建失败，提示找不到模块

**原因**：`src/sdk/index.js` 中的导入路径不正确。

**解决**：检查所有导入语句，确保使用 `.js` 扩展名：
```javascript
// 错误
import { Shape } from './Shape'

// 正确
import { Shape } from './Shape.js'
```

### Q2: UMD 格式在浏览器中报错

**原因**：可能存在循环依赖或外部依赖未正确配置。

**解决**：
1. 检查 `vite.config.sdk.ts` 中的 `external` 配置
2. 确保所有依赖都正确配置为外部依赖或打包进最终文件

### Q3: Source map 不起作用

**原因**：可能是生产构建关闭了 source map。

**解决**：使用开发构建：
```bash
pnpm run build:sdk:dev
```

或者在配置中确保 `sourcemap: true`。

## 下一步

- 查看 [Build/SDK/README.md](../Build/SDK/README.md) 了解 SDK 的 API 文档
- 查看 [scripts/test-sdk.html](../scripts/test-sdk.html) 了解 SDK 的使用示例
- 查看 [vite.config.sdk.ts](../vite.config.sdk.ts) 了解构建配置