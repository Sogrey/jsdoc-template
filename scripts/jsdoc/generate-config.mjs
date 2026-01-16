#!/usr/bin/env node

/**
 * JSDoc 配置生成脚本
 * 动态生成包含版本号的 JSDoc 配置文件
 */

import { readFileSync, writeFileSync } from 'fs'
import { resolve } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// 读取主 package.json 获取版本号
const pkgPath = resolve(__dirname, '../../package.json')
const pkgContent = readFileSync(pkgPath, 'utf-8')
const pkg = JSON.parse(pkgContent)

// 读取基础 JSDoc 配置
const confPath = resolve(__dirname, 'conf.json')
const confContent = readFileSync(confPath, 'utf-8')
const conf = JSON.parse(confContent)

// 添加版本号到配置
conf.version = pkg.version

// 写入生成的配置文件
const outputPath = resolve(__dirname, 'conf.generated.json')
writeFileSync(outputPath, JSON.stringify(conf, null, 2), 'utf-8')

console.log('✓ JSDoc 配置已生成，版本号:', pkg.version)
