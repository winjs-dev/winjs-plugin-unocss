# winjs-plugin-unocss

适配 WinJS 的 UnoCSS 插件，提供原子化 CSS 的即时按需生成能力。

<p>
  <a href="https://npmjs.com/package/@winner-fed/plugin-unocss">
   <img src="https://img.shields.io/npm/v/@winner-fed/plugin-unocss?style=flat-square&colorA=564341&colorB=EDED91" alt="npm version" />
  </a>
  <img src="https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square&colorA=564341&colorB=EDED91" alt="license" />
  <a href="https://npmcharts.com/compare/@winner-fed/plugin-unocss?minimal=true"><img src="https://img.shields.io/npm/dm/@winner-fed/plugin-unocss.svg?style=flat-square&colorA=564341&colorB=EDED91" alt="downloads" /></a>
</p>


## 功能特性

- ⚡ **即时按需生成** - 基于使用的类名实时生成样式，无需预构建
- 🎨 **原子化 CSS** - 提供丰富的原子化 CSS 类名，快速构建样式
- 🔧 **灵活配置** - 支持自定义预设、快捷方式和规则
- 📦 **多预设支持** - 内置多种预设，包括图标、属性化、字体等
- 🚀 **性能优化** - 只生成实际使用的样式，极大减少 CSS 体积
- 🔄 **热重载** - 开发环境下支持样式热重载
- 🛠️ **TypeScript 支持** - 完整的 TypeScript 类型定义
- 🏗️ **多构建工具支持** - 同时支持 Webpack、Vite 和 Rsbuild 构建工具

## 安装

```bash
npm install @winner-fed/plugin-unocss unocss
# 或者
yarn add @winner-fed/plugin-unocss unocss
# 或者
pnpm add @winner-fed/plugin-unocss unocss
```

## 配置

### 基本配置

在 WinJS 项目中启用插件：

```typescript
// .winrc.ts
import { defineConfig } from 'win';

export default defineConfig({
  plugins: ['@winner-fed/plugin-unocss'],
  unocss: {
    // 插件配置选项（可选）
    // 插件会自动检测项目构建工具类型（Webpack/Vite/Rsbuild）
  }
});
```

插件支持的构建工具：

- **Webpack**: 使用 `@unocss/webpack` 进行集成
- **Vite**: 使用 `@unocss/postcss` 通过 PostCSS 集成
- **Rsbuild**: 使用 `@unocss/postcss` 通过 PostCSS 集成

### UnoCSS 配置

在项目根目录创建 `uno.config.ts` 文件：

```typescript
// uno.config.ts
import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  presetWebFonts,
} from 'unocss';

export default defineConfig({
  presets: [
    presetAttributify(),
    presetIcons(),
    presetWebFonts({
      provider: 'google',
      fonts: {
        sans: 'Roboto',
      },
    }),
    presetUno(),
  ],
  shortcuts: [
    [
      'btn',
      'px-4 py-1 rounded inline-block bg-teal-600 text-white cursor-pointer hover:bg-teal-700 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50',
    ],
  ],
});
```

## 使用示例

### 基本使用

安装并配置插件后，可以在 Vue 组件中直接使用 UnoCSS 类名：

```vue
<template>
  <div class="min-h-screen bg-gray-100 py-8">
    <div class="max-w-4xl mx-auto px-4">
      <h1 class="text-3xl font-bold text-center mb-8 text-gray-800">
        UnoCSS 示例
      </h1>
      
      <!-- 按钮示例 -->
      <div class="flex gap-4 mb-8">
        <button class="btn">自定义按钮</button>
        <button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          蓝色按钮
        </button>
        <button class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
          绿色按钮
        </button>
      </div>
      
      <!-- 卡片示例 -->
      <div class="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 class="text-xl font-semibold mb-4">卡片标题</h2>
        <p class="text-gray-600 leading-relaxed">
          这是一个使用 UnoCSS 构建的卡片组件，展示了原子化 CSS 的强大功能。
        </p>
      </div>
      
      <!-- 网格布局示例 -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div class="bg-white p-4 rounded-lg shadow">项目 1</div>
        <div class="bg-white p-4 rounded-lg shadow">项目 2</div>
        <div class="bg-white p-4 rounded-lg shadow">项目 3</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 无需额外导入，UnoCSS 会自动生成对应的样式
</script>
```

### 属性化模式

启用 `presetAttributify` 后，可以使用属性化的写法：

```vue
<template>
  <div 
    bg="gray-100" 
    text="center" 
    p="8"
    class="min-h-screen"
  >
    <h1 
      text="3xl bold gray-800" 
      mb="8"
    >
      属性化示例
    </h1>
    
    <button 
      bg="blue-500 hover:blue-600" 
      text="white" 
      px="4" 
      py="2" 
      rounded
      cursor="pointer"
    >
      属性化按钮
    </button>
  </div>
</template>
```

### 图标使用

启用 `presetIcons` 后，可以直接使用图标：

```vue
<template>
  <div class="flex items-center gap-2">
    <i class="i-heroicons-home text-xl"></i>
    <span>首页</span>
  </div>
  
  <div class="flex items-center gap-2">
    <i class="i-carbon-user text-xl"></i>
    <span>用户</span>
  </div>
</template>
```

## 配置选项

### 插件配置

```typescript
// .winrc.ts
export default defineConfig({
  unocss: {
    // 插件会根据构建工具自动选择集成方式
    // 无需额外配置，开箱即用
  }
});
```

> **注意**：旧版本的 `watch` 配置项已废弃，插件现在会自动处理文件监听。

### UnoCSS 配置选项

在 `uno.config.ts` 中可以配置：

- **presets**: 预设配置
- **rules**: 自定义规则
- **shortcuts**: 快捷方式
- **theme**: 主题配置
- **variants**: 变体配置
- **extractors**: 提取器配置
- **transformers**: 转换器配置

## 预设介绍

### @unocss/preset-uno

提供 Tailwind CSS 兼容的实用工具类：

```typescript
presetUno()
```

### @unocss/preset-attributify

支持属性化模式：

```typescript
presetAttributify({
  prefix: 'un-',
  prefixedOnly: false,
})
```

### @unocss/preset-icons

提供图标支持：

```typescript
presetIcons({
  scale: 1.2,
  warn: true,
  extraProperties: {
    'display': 'inline-block',
    'vertical-align': 'middle',
  }
})
```

### @unocss/preset-web-fonts

提供网络字体支持：

```typescript
presetWebFonts({
  provider: 'google',
  fonts: {
    sans: 'Roboto',
    mono: ['Fira Code', 'Fira Mono:400,700'],
  }
})
```

## 迁移指南

### 从 unocss.config.ts 迁移

如果你的项目中存在 `unocss.config.ts` 文件，请将其重命名为 `uno.config.ts`：

```bash
mv unocss.config.ts uno.config.ts
```

同时移除 `@unocss/cli` 依赖：

```bash
npm uninstall @unocss/cli
```

### 配置更新

旧的 `watch` 配置已不再需要，插件会自动处理文件监听。

## 依赖要求

- `unocss`: 最新版本（通过 catalog 管理）
- `@unocss/webpack`: 最新版本（通过 catalog 管理）
- `@unocss/postcss`: 最新版本（通过 catalog 管理）
- `vue`: ^3.0.0 或 ^2.6.0（取决于项目配置）

## 工作原理

### Webpack 模式

1. **Webpack 集成**：使用 `@unocss/webpack` 插件将 UnoCSS 集成到 Webpack 构建流程中
2. **自动导入**：自动将 `uno.css` 添加到入口文件导入
3. **别名设置**：设置 `uno.css` 别名为 `/__uno.css`，修复 mfsu 相关问题
4. **优化处理**：启用 `realContentHash` 优化，确保样式文件的正确缓存
5. **缓存优化**：禁用相关缓存以确保样式更新的实时性

### Vite/Rsbuild 模式

1. **PostCSS 集成**：使用 `@unocss/postcss` 插件通过 PostCSS 处理样式
2. **自动处理**：构建工具自动扫描和处理 UnoCSS 类名
3. **样式注入**：样式通过 PostCSS 流程自动注入到构建结果中

### 通用流程

1. **样式生成**：扫描源代码中的类名，按需生成对应的 CSS 样式
2. **配置检测**：自动检测项目使用的构建工具类型
3. **迁移提示**：检测旧版配置文件并提供迁移指引

## 常见问题

### Q: 样式没有生效？

A: 请确保：

1. 已正确安装 `unocss` 依赖
2. 在 `.winrc.ts` 中启用了插件
3. 创建了 `uno.config.ts` 配置文件
4. 确认项目使用的构建工具（Webpack/Vite/Rsbuild）被插件正确识别

### Q: 图标无法显示？

A: 请确保：

1. 在 `uno.config.ts` 中启用了 `presetIcons`
2. 安装了对应的图标集，如 `@iconify-json/heroicons`
3. 使用正确的图标命名格式

### Q: 开发环境下样式更新慢？

A: 这是正常现象，UnoCSS 需要扫描文件变更后重新生成样式。

### Q: Vite/Rsbuild 模式下样式处理有问题？

A: 请确保：

1. 项目正确配置了 PostCSS
2. 没有其他 PostCSS 插件冲突
3. UnoCSS 的 PostCSS 插件已正确加载

### Q: 出现 "unocss?.watch 配置不再需要" 警告？

A: 这是正常的迁移提示，请移除 `.winrc.ts` 中的 `unocss.watch` 配置项。

### Q: 出现 "将 unocss.config.ts 修改为 uno.config.ts" 警告？

A: 请按照迁移指南重命名配置文件并移除 `@unocss/cli` 依赖。

## 许可证

MIT
