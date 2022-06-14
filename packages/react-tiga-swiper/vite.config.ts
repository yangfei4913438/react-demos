import { defineConfig, loadEnv, type UserConfig } from 'vite';
import react from '@vitejs/plugin-react';
import commonjs from '@rollup/plugin-commonjs';

// https://vitejs.dev/config/
export default ({ mode }: UserConfig) => {
  process.env = { ...process.env, ...loadEnv(mode ?? 'development', process.cwd()) };

  return defineConfig({
    esbuild: {
      jsxFactory: 'h',
      jsxFragment: 'Fragment',
    },
    server: {
      proxy: {},
    },
    plugins: [
      react(),
      commonjs({
        include: ['use-timeout-mock-interval'],
      }),
    ],
    resolve: {
      alias: {
        'use-timeout-mock-interval': require.resolve('use-timeout-mock-interval'),
        src: '/src', // 映射的目录必须以/开头，表示根目录
      },
    },
  });
};
