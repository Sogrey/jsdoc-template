#!/usr/bin/env node

/**
 * SDK 构建脚本
 * 用于构建 SDK 的多种格式输出
 */

import { build } from 'vite'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import { rmSync, mkdirSync, existsSync, copyFileSync, readFileSync, writeFileSync, readdirSync } from 'fs'
import { execSync } from 'child_process'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// 输出目录
const OUTPUT_DIR = resolve(__dirname, '../Build/SDK')
// SDK 模板目录
const SDK_TEMPLATE_DIR = resolve(__dirname, './sdk')

// 读取 package.json
const pkgContent = readFileSync(resolve(__dirname, '../package.json'), 'utf-8')
const pkg = JSON.parse(pkgContent)

// 读取 SDK package.json 模板
const sdkPkgContent = readFileSync(resolve(SDK_TEMPLATE_DIR, 'package.json'), 'utf-8')
const sdkPkg = JSON.parse(sdkPkgContent)

// 更新 SDK 版本号
sdkPkg.version = pkg.version

// 清空输出目录
function cleanOutputDir() {
  if (existsSync(OUTPUT_DIR)) {
    rmSync(OUTPUT_DIR, { recursive: true, force: true })
    console.log('✓ 已清空输出目录:', OUTPUT_DIR)
  }
  mkdirSync(OUTPUT_DIR, { recursive: true })
  console.log('✓ 已创建输出目录:', OUTPUT_DIR)
}

// 清理 source map 文件，移除 sourcesContent 并压缩 JSON 以减小文件大小
function cleanSourceMaps() {
  try {
    const files = readdirSync(OUTPUT_DIR)

    for (const file of files) {
      if (file.endsWith('.map')) {
        const mapPath = resolve(OUTPUT_DIR, file)
        const mapContent = readFileSync(mapPath, 'utf-8')
        const map = JSON.parse(mapContent)

        // 移除 sourcesContent 以减小文件大小
        if (map.sourcesContent) {
          delete map.sourcesContent
          // 生产版压缩到一行
          writeFileSync(mapPath, JSON.stringify(map), 'utf-8')
          console.log(`✓ 已清理并压缩 source map: ${file}`)
        }
      }
    }
  } catch (error) {
    console.warn('清理 source map 时出现问题:', error.message)
  }
}

// 使用 TypeScript 编译器生成类型定义
function generateTypeDefinitions() {
  try {
    // 使用 TypeScript 编译器生成类型定义
    execSync('npx tsc --project ./tsconfig.types.json --declaration --emitDeclarationOnly --outDir ./Build/SDK', {
      cwd: resolve(__dirname, '..'),
      stdio: 'inherit'
    })
    
    console.log('✓ 已生成 TypeScript 类型定义文件')
    
    // 合并所有 .d.ts 文件为一个 jsdoc-sdk.d.ts
    const outputFiles = readdirSync(OUTPUT_DIR).filter(f => f.endsWith('.d.ts') && f !== 'jsdoc-sdk.d.ts')
    
    let combinedContent = ''
    
    // 读取所有生成的 .d.ts 文件并合并
    for (const dtsFile of outputFiles) {
      const dtsPath = resolve(OUTPUT_DIR, dtsFile)
      const content = readFileSync(dtsPath, 'utf-8')
      combinedContent += content + '\n\n'
    }
    
    // 写入合并后的 jsdoc-sdk.d.ts
    const jsdocDtsPath = resolve(OUTPUT_DIR, 'jsdoc-sdk.d.ts')
    writeFileSync(jsdocDtsPath, combinedContent, 'utf-8')
    console.log('✓ 已合并所有类型定义到 jsdoc-sdk.d.ts')
    
    // 删除单独的 .d.ts 文件
    for (const dtsFile of outputFiles) {
      const dtsPath = resolve(OUTPUT_DIR, dtsFile)
      rmSync(dtsPath)
    }
    
    // 删除所有 .d.ts.map 文件
    const mapFiles = readdirSync(OUTPUT_DIR).filter(f => f.endsWith('.d.ts.map'))
    for (const mapFile of mapFiles) {
      const mapPath = resolve(OUTPUT_DIR, mapFile)
      rmSync(mapPath)
    }
    console.log('✓ 已删除 .d.ts.map 文件')
  } catch (error) {
    console.warn('生成类型定义文件时出现问题:', error.message)
  }
}

// 复制 SDK 配置文件
function copySDKConfigFiles() {
  try {
    // 写入更新后的 package.json
    writeFileSync(
      resolve(OUTPUT_DIR, 'package.json'),
      JSON.stringify(sdkPkg, null, 2),
      'utf-8'
    )
    console.log('✓ 已复制并更新 package.json (版本:', pkg.version + ')')

    // 复制 README.md
    copyFileSync(
      resolve(SDK_TEMPLATE_DIR, 'README.md'),
      resolve(OUTPUT_DIR, 'README.md')
    )
    console.log('✓ 已复制 README.md')
  } catch (error) {
    console.error('✗ 复制配置文件失败:', error.message)
  }
}

// 构建 SDK
async function buildSDK() {
  console.log('\n========================================')
  console.log('开始构建 SDK')
  console.log('========================================\n')

  try {
    // 清空输出目录
    cleanOutputDir()

    console.log('\n正在构建...\n')

    // 调用 Vite 构建
    await build({
      configFile: resolve(__dirname, '../vite.config.sdk.ts'),
      mode: 'production'
    })

    // 生产版清理 source map（移除 sourcesContent 以减小文件大小）
    console.log('\n清理 source map 文件...\n')
    cleanSourceMaps()

    // 生成 TypeScript 类型定义文件
    console.log('\n生成类型定义文件...\n')
    generateTypeDefinitions()

    // 复制配置文件
    copySDKConfigFiles()

    console.log('\n========================================')
    console.log('✓ SDK 构建成功!')
    console.log('========================================\n')
    console.log('输出目录:', OUTPUT_DIR)
    console.log('\n生成的文件:')
    console.log('  - jsdoc-sdk.es.js       (ES Module)')
    console.log('  - jsdoc-sdk.es.js.map   (ES Module Source Map)')
    console.log('  - jsdoc-sdk.cjs.js      (CommonJS)')
    console.log('  - jsdoc-sdk.cjs.js.map  (CommonJS Source Map)')
    console.log('  - jsdoc-sdk.umd.js      (UMD)')
    console.log('  - jsdoc-sdk.umd.js.map  (UMD Source Map)')
    console.log('  - jsdoc-sdk.d.ts        (TypeScript 类型定义)')
    console.log('  - package.json          (NPM 配置)')
    console.log('  - README.md             (使用文档)')
    console.log()
  } catch (error) {
    console.error('\n========================================')
    console.error('✗ SDK 构建失败!')
    console.error('========================================\n')
    console.error(error)
    process.exit(1)
  }
}

// 执行构建
buildSDK()
