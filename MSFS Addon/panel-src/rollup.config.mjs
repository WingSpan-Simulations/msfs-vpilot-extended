import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import css from 'rollup-plugin-import-css';

export default {
    input: 'panel-src/src/vPEPanel.tsx',
    output: {
        file: 'html_ui/InGamePanels/vPEPanel/vPEPanel.js',
        format: 'iife',
        globals: { 'msfssdk': 'msfssdk'  }
    },
    external: ['msfssdk', 'msfstypes'],
    plugins: [
        css({ output: 'vPEPanel.css '}),  resolve(),  typescript()]
}