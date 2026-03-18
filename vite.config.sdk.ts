import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import { readFileSync } from 'node:fs'
import dts from 'vite-plugin-dts'

// 读取 package.json 获取 SDK 配置
const pkg = JSON.parse(readFileSync('./package.json', 'utf-8'))
const sdkName = pkg.sdk?.name || 'my-sdk'

/**
 * SDK 打包配置
 * 支持输出多种格式：ES Module, CommonJS, UMD
 * 生成 TypeScript 类型定义文件
 * 
 * 用法:
 *   vite --config vite.config.sdk.ts --mode production  # 生产版
 *   vite --config vite.config.sdk.ts --mode development  # 开发版
 * 
 * SDK 名称可在 package.json 的 sdk.name 中配置，默认 my-sdk
 */
export default defineConfig(({ mode }) => {
  const isDev = mode === 'development'
  const outDir = isDev ? './Build/SDK-dev' : './Build/SDK'

  return {
    plugins: [
      dts({
        // 输入文件
        entryRoot: './src/sdk',
        // 输出目录
        outDir,
        // 生产版生成单个统一的 d.ts 文件
        rollupTypes: !isDev,
        // 从 JSDoc 注释生成类型
        include: isDev ? ['src/sdk/index.js'] : ['src/sdk/**/*.js'],
        // 排除文件
        exclude: ['**/*.test.js', '**/*.spec.js'],
        // 允许从 JS 文件推断类型
        allowJs: true,
        // 使用 TypeScript 编译器从 JSDoc 推断类型
        tsconfigPath: './tsconfig.types.json',
        // 开发版输出文件名
        outName: isDev ? `${sdkName}.d.ts` : undefined,
        // 复制源文件到输出目录
        copyDtsFiles: false
      })
    ],
    build: {
      // 输出目录
      outDir,
      lib: {
        entry: fileURLToPath(new URL('./src/sdk/index.js', import.meta.url)),
        name: 'JSDocSDK',
        fileName: (format) => `${sdkName}.${format}.js`,
        formats: ['es', 'cjs', 'umd']
      },
      rollupOptions: {
        // 外部依赖，不打包到最终输出
        external: [],
        output: {
          // 全局变量名（UMD 格式使用）
          globals: {}
        }
      },
      // 生产版使用 terser 压缩，开发版不压缩
      minify: isDev ? false : 'terser',
      terserOptions: isDev ? undefined : {
        compress: {
          drop_debugger: true
        }
      },
      // 生成 source map
      sourcemap: true
    }
  }
})
