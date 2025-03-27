import { defineConfig } from 'dumi';
import { default as proxy } from './config/proxy';
import themeConfig from './config/theme-config';
// 站点配置
export default defineConfig({
  base: '/tech-pc',
  outputPath: 'docs-dist',
  publicPath: '/tech-pc/',
  resolve: {
    // docDirs: [{ type: 'doc', dir: 'docs' }],
    atomDirs: [{ type: 'component', dir: 'src/components' }],
    // codeBlockMode: 'passive',
  },
  alias: {
    '@': './src',
  },
  proxy,
  themeConfig,
  analyze: {},
});
