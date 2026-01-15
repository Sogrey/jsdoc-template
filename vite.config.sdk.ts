import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import dts from 'vite-plugin-dts'

/**
 * SDK 打包配置（生产版）
 * 支持输出多种格式：ES Module, CommonJS, UMD
 * 生成 TypeScript 类型定义文件
 */
export default defineConfig({
  plugins: [
    dts({
      // 输入文件
      entryRoot: './src/sdk',
      // 输出目录
      outDir: './Build/SDK',
      // 输出文件名（生成单个统一的 d.ts 文件）
      rollupTypes: true,
      // 从 JSDoc 注释生成类型
      include: ['src/sdk/**/*.js'],
      // 排除文件
      exclude: ['**/*.test.js', '**/*.spec.js'],
      // 允许从 JS 文件推断类型
      allowJs: true,
      // 使用 TypeScript 编译器从 JSDoc 推断类型
      tsconfigPath: './tsconfig.types.json'
    })
  ],
  build: {
    // 输出目录
    outDir: './Build/SDK',
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
        globals: {}
      }
    },
    // 生产版使用 terser 压缩
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_debugger: true
      }
    },
    // 生成 source map
    sourcemap: true
  }
})




