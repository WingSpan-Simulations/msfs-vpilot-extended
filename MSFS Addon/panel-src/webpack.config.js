const path = require('path');

module.exports = {
	entry: { 
		vPEPanel: './panel-src/panels/vPEPanel/vPEPanel.tsx',
	},
	mode: 'none',
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, '../html_ui/InGamePanels/vPEPanel'),
		devtoolModuleFilenameTemplate: (info) =>
			`file:///${path.resolve(info.absoluteResourcePath).replace(/\\/g, '/')}`,
	  	devtoolFallbackModuleFilenameTemplate: (info) =>
			`file:///${path.resolve(info.absoluteResourcePath).replace(/\\/g, '/')}`,
	 	sourceMapFilename: '[file].map'
	},
	module: {
		rules: [{
			test: /\.tsx?$/,
			use: 'ts-loader',
			exclude: /node_modules/,
		}],
	},
	optimization: {
		splitChunks: {
		  cacheGroups: {
			react: {
			  test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
			  name: 'react.bundle',
			  chunks: 'all',
			}
		  }
		}
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
	},
	// devtool: 'source-map'
};