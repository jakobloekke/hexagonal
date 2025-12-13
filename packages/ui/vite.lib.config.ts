import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    react(),
    dts({ 
      include: ['src'],
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
        'utils/index': resolve(__dirname, 'src/utils/index.ts'),
      },
      name: 'SecondGenUI',
      fileName: (format, entryName) => {
        // Ensure emitted filenames match `package.json` export targets:
        // - dist/secondgen-ui.mjs + dist/secondgen-ui.js
        // - dist/utils/index.mjs + dist/utils/index.js
        const ext = format === 'es' ? 'mjs' : 'js';
        const base = entryName === 'index' ? 'secondgen-ui' : entryName;
        return `${base}.${ext}`;
      },
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        '@tanstack/react-table',
        'focus-trap-react',
        'framer-motion',
        'lucide-react',
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          '@tanstack/react-table': 'TanStackTable',
          'focus-trap-react': 'FocusTrapReact',
          'framer-motion': 'FramerMotion',
          'lucide-react': 'LucideReact',
        },
      },
    },
  },
});

