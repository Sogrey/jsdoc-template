#!/usr/bin/env node

/**
 * SDK 构建脚本
 * 用于构建 SDK 的多种格式输出
 * 
 * 用法:
 *   node build-sdk.mjs          # 构建生产版本
 *   node build-sdk.mjs --dev    # 构建开发版本
 *   node build-sdk.mjs --all    # 构建所有版本
 */

import { build } from 'vite'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import { rmSync, mkdirSync, existsSync, copyFileSync, readFileSync, writeFileSync, readdirSync } from 'fs'
import { execSync } from 'child_process'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// 解析命令行参数
const args = process.argv.slice(2)
const isDev = args.includes('--dev')
const isAll = args.includes('--all')

// 输出目录
const OUTPUT_DIR = resolve(__dirname, '../Build/SDK')
const OUTPUT_DIR_DEV = resolve(__dirname, '../Build/SDK-dev')
// SDK 模板目录
const SDK_TEMPLATE_DIR = resolve(__dirname, './sdk')

// 读取 package.json
const pkgContent = readFileSync(resolve(__dirname, '../package.json'), 'utf-8')
const pkg = JSON.parse(pkgContent)

// SDK 名称（默认 my-sdk）
const SDK_NAME = pkg.sdk?.name || 'my-sdk'

// 清空输出目录
function cleanOutputDir(outputDir) {
  if (existsSync(outputDir)) {
    rmSync(outputDir, { recursive: true, force: true })
    console.log('✓ 已清空输出目录:', outputDir)
  }
  mkdirSync(outputDir, { recursive: true })
  console.log('✓ 已创建输出目录:', outputDir)
}

// 清理/格式化 source map 文件
function processSourceMaps(outputDir, isDevMode) {
  try {
    const files = readdirSync(outputDir)

    for (const file of files) {
      if (file.endsWith('.map')) {
        const mapPath = resolve(outputDir, file)
        const mapContent = readFileSync(mapPath, 'utf-8')
        const map = JSON.parse(mapContent)

        if (isDevMode) {
          // 开发版格式化 JSON 便于查看
          writeFileSync(mapPath, JSON.stringify(map, null, 2), 'utf-8')
          console.log(`✓ 已格式化 source map: ${file}`)
        } else {
          // 生产版移除 sourcesContent 以减小文件大小
          if (map.sourcesContent) {
            delete map.sourcesContent
            writeFileSync(mapPath, JSON.stringify(map), 'utf-8')
            console.log(`✓ 已清理并压缩 source map: ${file}`)
          }
        }
      }
    }
  } catch (error) {
    console.warn('处理 source map 时出现问题:', error.message)
  }
}

// 使用 TypeScript 编译器生成类型定义
function generateTypeDefinitions(outputDir) {
  try {
    const outDir = outputDir.replace(/.*\/Build\//, './Build/')
    
    // 使用 TypeScript 编译器生成类型定义
    execSync(`npx tsc --project ./tsconfig.types.json --declaration --emitDeclarationOnly --outDir ${outDir}`, {
      cwd: resolve(__dirname, '..'),
      stdio: 'inherit'
    })
    
    console.log('✓ 已生成 TypeScript 类型定义文件')
    
    // 合并所有 .d.ts 文件为一个 {SDK_NAME}.d.ts
    const dtsFileName = `${SDK_NAME}.d.ts`
    const outputFiles = readdirSync(outputDir).filter(f => f.endsWith('.d.ts') && f !== dtsFileName)
    
    let combinedContent = ''
    
    // 读取所有生成的 .d.ts 文件并合并
    for (const dtsFile of outputFiles) {
      const dtsPath = resolve(outputDir, dtsFile)
      const content = readFileSync(dtsPath, 'utf-8')
      combinedContent += content + '\n\n'
    }
    
    // 写入合并后的 {SDK_NAME}.d.ts
    const jsdocDtsPath = resolve(outputDir, dtsFileName)
    writeFileSync(jsdocDtsPath, combinedContent, 'utf-8')
    console.log(`✓ 已合并所有类型定义到 ${dtsFileName}`)
    
    // 删除单独的 .d.ts 文件
    for (const dtsFile of outputFiles) {
      const dtsPath = resolve(outputDir, dtsFile)
      rmSync(dtsPath)
    }
    
    // 删除所有 .d.ts.map 文件
    const mapFiles = readdirSync(outputDir).filter(f => f.endsWith('.d.ts.map'))
    for (const mapFile of mapFiles) {
      const mapPath = resolve(outputDir, mapFile)
      rmSync(mapPath)
    }
    console.log('✓ 已删除 .d.ts.map 文件')
  } catch (error) {
    console.warn('生成类型定义文件时出现问题:', error.message)
  }
}

// 复制 SDK 配置文件
function copySDKConfigFiles(outputDir) {
  try {
    // 读取 SDK package.json 模板并替换占位符
    let sdkPkgContent = readFileSync(resolve(SDK_TEMPLATE_DIR, 'package.json'), 'utf-8')
    sdkPkgContent = sdkPkgContent.replace(/{{SDK_NAME}}/g, SDK_NAME)
    const sdkPkgFinal = JSON.parse(sdkPkgContent)
    sdkPkgFinal.version = pkg.version

    // 写入更新后的 package.json
    writeFileSync(
      resolve(outputDir, 'package.json'),
      JSON.stringify(sdkPkgFinal, null, 2),
      'utf-8'
    )
    console.log('✓ 已复制并更新 package.json (版本:', pkg.version + ', 名称:', SDK_NAME + ')')

    // 复制 README.md
    copyFileSync(
      resolve(SDK_TEMPLATE_DIR, 'README.md'),
      resolve(outputDir, 'README.md')
    )
    console.log('✓ 已复制 README.md')
  } catch (error) {
    console.error('✗ 复制配置文件失败:', error.message)
  }
}

// 构建 SDK
async function buildSDK(isDevMode = false) {
  const outputDir = isDevMode ? OUTPUT_DIR_DEV : OUTPUT_DIR
  const modeName = isDevMode ? '开发模式' : '生产版本'
  const configFile = '../vite.config.sdk.ts'
  const mode = isDevMode ? 'development' : 'production'

  console.log('\n========================================')
  console.log(`开始构建 SDK (${modeName})`)
  console.log('========================================\n')

  try {
    // 清空输出目录
    cleanOutputDir(outputDir)

    console.log(`\n正在构建 (${modeName})...\n`)

    // 调用 Vite 构建
    await build({
      configFile: resolve(__dirname, configFile),
      mode
    })

    // 处理 source map
    console.log(`\n处理 source map 文件...\n`)
    processSourceMaps(outputDir, isDevMode)

    // 生成 TypeScript 类型定义文件
    console.log('\n生成类型定义文件...\n')
    generateTypeDefinitions(outputDir)

    // 复制配置文件
    copySDKConfigFiles(outputDir)

    console.log('\n========================================')
    console.log('✓ SDK 构建成功!')
    console.log('========================================\n')
    console.log('输出目录:', outputDir)
    console.log('\n生成的文件:')
    console.log(`  - ${SDK_NAME}.es.js       (ES Module)`)
    console.log(`  - ${SDK_NAME}.es.js.map   (ES Module Source Map)`)
    console.log(`  - ${SDK_NAME}.cjs.js      (CommonJS)`)
    console.log(`  - ${SDK_NAME}.cjs.js.map  (CommonJS Source Map)`)
    console.log(`  - ${SDK_NAME}.umd.js      (UMD)`)
    console.log(`  - ${SDK_NAME}.umd.js.map  (UMD Source Map)`)
    console.log(`  - ${SDK_NAME}.d.ts        (TypeScript 类型定义)`)
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

// 主入口
async function main() {
  if (isAll) {
    // 构建所有版本
    console.log('\n>>> 构建开发版本 <<<')
    await buildSDK(true)
    console.log('\n>>> 构建生产版本 <<<')
    await buildSDK(false)
  } else if (isDev) {
    // 仅构建开发版本
    await buildSDK(true)
  } else {
    // 默认构建生产版本
    await buildSDK(false)
  }
}

main()
