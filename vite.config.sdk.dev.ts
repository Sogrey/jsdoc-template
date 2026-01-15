import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import dts from 'vite-plugin-dts'

/**
 * SDK 打包配置（开发版）
 * 支持输出多种格式：ES Module, CommonJS, UMD
 * 生成 TypeScript 类型定义文件
 */
export default defineConfig({
  plugins: [
    dts({
      // 直接指定入口文件
      include: ['src/sdk/index.js'],
      // 输出目录
      outDir: './Build/SDK-dev',
      // 输出文件名
      outName: 'jsdoc-sdk.d.ts',
      // 允许从 JS 文件推断类型
      allowJs: true,
      // 使用 TypeScript 编译器从 JSDoc 推断类型
      tsconfigPath: './tsconfig.types.json',
      // 复制源文件到输出目录
      copyDtsFiles: false
    })
  ],
  build: {
    // 输出目录
    outDir: './Build/SDK-dev',
    lib: {
      entry: fileURLToPath(new URL('./src/sdk/index.js', import.meta.url)),
      name: 'JSDocSDK',
      fileName: (format) => `jsdoc-sdk.${format}.js`,
      formats: ['es', 'cjs', 'umd']
    },
    rollupOptions: {
      // 外部依赖，不打包到最终输出
      external: [],
      output: {
        // 全局变量名（UMD 格式使用）
        globals: {},
        // 保持代码格式，不压缩变量名
        compact: false
      }
    },
    // 开发版不压缩，保留源码格式便于调试
    minify: false,
    // 生成 source map
    sourcemap: true
  }
})



