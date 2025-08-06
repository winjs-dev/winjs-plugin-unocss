/**
 * plugin-unocss
 * @Author: liwb (lwbhtml@163.com)
 * @Date: 2025-08-06 15:52
 * @LastEditTime: 2025-08-06 15:52
 * @Description: unocss 插件
 */
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import UnoCSSPost from '@unocss/postcss';
import { default as UnoCSSWebpack } from '@unocss/webpack';
import type { IApi } from '@winner-fed/winjs';

export default (api: IApi) => {
  api.describe({
    key: 'unocss',
    config: {
      schema({ zod }) {
        return zod.object({
          // 这个配置无用了，保留可选
          watch: zod.optional(zod.array(zod.any())),
        });
      },
    },
    enableBy: api.EnableBy.config,
  });

  api.onBeforeCompiler(async () => {
    if (process.env.IS_WIN_BUILD_WORKER) return;
    if (api.userConfig?.unocss?.watch) {
      api.logger.warn('unocss?.watch 配置不再需要。');
    }

    // 不再使用 unocss cli 的方式，所以如果存在 unocss.config.ts 应该引导用户使用新的方式
    if (existsSync(join(api.paths.cwd, 'unocss.config.ts'))) {
      api.logger.warn(
        '请修改 unocss 的接入方式，主要是将 unocss.config.ts 修改为 uno.config.ts！移除 @unocss/cli。',
      );
    }
  });

  // webpack
  if (!api.userConfig.rsbuild && !api.userConfig.vite) {
    api.modifyConfig((memo) => {
      // fix mfsu error
      memo.alias['uno.css'] = '/__uno.css';
      return memo;
    });

    api.chainWebpack(async (memo) => {
      memo.plugin('uno-css').use(UnoCSSWebpack);
      memo.optimization.realContentHash(true);
      // 移除缓存，否则会出现样式失效的问题
      memo.module.rule('vue').uses.delete('cache-loader');
      memo.module.rule('tsx').uses.delete('cache-loader');
      memo.merge({
        cache: false,
      });

      return memo;
    });

    // 将生成的 css 文件加入到 import 中
    api.addEntryImports(() => {
      return [{ source: 'uno.css' }];
    });
  } else {
    // vite or rsbuild
    api.modifyConfig((memo) => {
      memo.extraPostCSSPlugins ??= [];
      memo.extraPostCSSPlugins.push(UnoCSSPost());

      return memo;
    });
  }
};
