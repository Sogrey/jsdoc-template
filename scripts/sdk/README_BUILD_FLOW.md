# SDK 构建流程说明

## 目录结构

```
scripts/
├── sdk/                    # SDK 配置文件模板目录
│   ├── package.json        # SDK 的 NPM 配置模板
│   ├── README.md          # SDK 使用文档模板
│   └── README_BUILD_FLOW.md # 本文件
├── build-sdk.mjs         # SDK 生产构建脚本
├── build-sdk-dev.mjs     # SDK 开发构建脚本
└── test-sdk.html         # SDK 功能测试页面

src/sdk/                  # SDK 源代码
Build/SDK/               # SDK 构建输出目录（自动生成，gitignore）
```

## 构建流程

### 1. 执行构建命令

```bash
# 生产构建
pnpm run build:sdk

# 开发构建
pnpm run build:sdk:dev
```

### 2. 构建脚本执行步骤

#### build-sdk.mjs / build-sdk-dev.mjs

1. **清空输出目录**
   ```javascript
   if (existsSync(OUTPUT_DIR)) {
     rmSync(OUTPUT_DIR, { recursive: true, force: true })
   }
   mkdirSync(OUTPUT_DIR, { recursive: true })
   ```
   - 如果 `Build/SDK/` 目录存在，先清空
   - 然后创建空的 `Build/SDK/` 目录

2. **调用 Vite 构建**
   ```javascript
   await build({
     configFile: resolve(__dirname, '../vite.config.sdk.ts'),
     mode: 'production'  // 或 'development'
   })
   ```
   - 使用 Vite 库模式打包 `src/sdk/index.js`
   - 生成 ES Module、CommonJS、UMD 三种格式
   - 生成对应的 source map 文件

3. **复制配置文件**
   ```javascript
   copyFileSync(
     resolve(SDK_TEMPLATE_DIR, 'package.json'),
     resolve(OUTPUT_DIR, 'package.json')
   )
   copyFileSync(
     resolve(SDK_TEMPLATE_DIR, 'README.md'),
     resolve(OUTPUT_DIR, 'README.md')
   )
   ```
   - 将 `scripts/sdk/package.json` 复制到 `Build/SDK/package.json`
   - 将 `scripts/sdk/README.md` 复制到 `Build/SDK/README.md`

### 3. 最终输出结构

```
Build/SDK/
├── jsdoc-sdk.es.js          # ES Module 格式
├── jsdoc-sdk.es.js.map      # ES Module Source Map
├── jsdoc-sdk.cjs.js         # CommonJS 格式
├── jsdoc-sdk.cjs.js.map     # CommonJS Source Map
├── jsdoc-sdk.umd.js         # UMD 格式
├── jsdoc-sdk.umd.js.map     # UMD Source Map
├── package.json             # NPM 配置（从 scripts/sdk/ 复制）
└── README.md                # 使用文档（从 scripts/sdk/ 复制）
```

## 为什么要这样设计？

### 1. 清空输出目录

**问题**：如果不清空输出目录，旧的构建文件可能会残留。

**解决**：每次构建前先清空 `Build/SDK/` 目录，确保只包含当前构建的文件。

### 2. 配置文件作为模板

**问题**：如果直接在 `Build/SDK/` 中维护配置文件，会被 `gitignore` 忽略，无法提交。

**解决**：
- 将配置文件放在 `scripts/sdk/` 作为模板
- 构建完成后自动复制到输出目录
- 模板文件可以纳入版本控制

### 3. 分离源码和构建产物

**源码位置**：`src/sdk/`
**构建产物**：`Build/SDK/`

这种分离的好处：
- 源码可以独立开发和测试
- 构建产物不会被提交到 git（由 `.gitignore` 控制）
- 清晰的项目结构

## 自定义配置文件

### 修改 package.json

编辑 `scripts/sdk/package.json`：

```json
{
  "name": "your-sdk-name",
  "version": "1.0.0",
  "description": "Your SDK description",
  ...
}
```

构建后自动复制到 `Build/SDK/package.json`。

### 修改 README.md

编辑 `scripts/sdk/README.md`，添加你的 API 文档和使用说明。

构建后自动复制到 `Build/SDK/README.md`。

## 发布到 NPM

### 1. 构建 SDK

```bash
pnpm run build:sdk
```

### 2. 进入输出目录

```bash
cd Build/SDK
```

### 3. 检查文件

确保以下文件存在：
- `jsdoc-sdk.es.js`
- `jsdoc-sdk.cjs.js`
- `jsdoc-sdk.umd.js`
- `package.json`
- `README.md`

### 4. 登录 NPM（首次）

```bash
npm login
```

### 5. 发布

```bash
npm publish
```

## 调试技巧

### 1. 使用开发构建

开发构建包含完整的 source map：

```bash
pnpm run build:sdk:dev
```

### 2. 使用测试页面

1. 构建开发版本：`pnpm run build:sdk:dev`
2. 在浏览器中打开 `scripts/test-sdk.html`
3. 打开浏览器开发者工具，可以看到完整的源码调试信息

### 3. 查看构建输出

构建脚本会显示生成的文件列表：

```
生成的文件:
  - jsdoc-sdk.es.js       (ES Module)
  - jsdoc-sdk.es.js.map   (ES Module Source Map)
  - jsdoc-sdk.cjs.js      (CommonJS)
  - jsdoc-sdk.cjs.js.map  (CommonJS Source Map)
  - jsdoc-sdk.umd.js      (UMD)
  - jsdoc-sdk.umd.js.map  (UMD Source Map)
  - package.json          (NPM 配置)
  - README.md             (使用文档)
```

## 常见问题

### Q: 为什么 Build/SDK 目录不在 git 中？

A: `Build/SDK/` 在 `.gitignore` 中被忽略，因为它是构建产物。每次构建都会重新生成，不需要提交。配置文件的模板在 `scripts/sdk/` 中。

### Q: 如何修改 SDK 的名称？

A: 编辑以下文件：
1. `scripts/sdk/package.json` 中的 `name` 字段
2. `vite.config.sdk.ts` 中的 `name` 字段（UMD 全局变量名）
3. `vite.config.sdk.ts` 中的 `fileName` 函数

### Q: 构建失败怎么办？

A: 检查以下几点：
1. `src/sdk/index.js` 是否存在且正确导出
2. 所有导入路径是否使用 `.js` 扩展名
3. `scripts/sdk/` 目录下的配置文件是否存在
4. 查看构建脚本的错误输出

## 总结

新的构建流程：

```
源码 (src/sdk/) → 构建脚本 → 清空 Build/SDK/ → Vite 打包 → 复制配置文件 → 完成
                                    ↓
                              生成三种格式 + 配置文件
```

这种设计确保了：
- ✅ 每次构建都是干净的
- ✅ 配置文件可以版本控制
- ✅ 构建产物不会被提交
- ✅ 支持一键发布到 NPM
