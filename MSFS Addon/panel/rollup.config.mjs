import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';

export default {
    input: 'panel/src/vPEPanel.tsx',
    output: {
        file: 'src/html_ui/InGamePanels/vPEPanel/vPEPanel.js',
        format: 'iife',
        globals: { 'msfssdk': 'msfssdk'  }
    },
    external: ['msfssdk', 'msfstypes'],
    plugins: [  
        resolve(),  
        typescript()
    ]
}