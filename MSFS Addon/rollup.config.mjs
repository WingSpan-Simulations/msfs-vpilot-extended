import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';

export default [
    {
        input: 'src/html_ui/InGamePanels/vPEPanel.tsx',
        output: {
            file: 'build/html_ui/InGamePanels/vPEPanel/vPEPanel.js',
            format: 'iife',
            globals: { 'msfssdk': 'msfssdk'  }
        },
        external: ['msfssdk', 'msfstypes'],
        plugins: [  
            resolve(),  
            typescript()
        ]
    },
    {
        input: 'src/html_ui/Pages/ToolBar/vPilotPersistent/base.tsx',
        output: {
            file: 'build/html_ui/Pages/ToolBar/vPilotPersistent/vPE.js',
            format: 'iife',
            globals: { 'msfssdk': 'msfssdk'  }
        },
        external: ['msfssdk', 'msfstypes'],
        plugins: [  
            resolve(),  
            typescript()
        ]
    },
]