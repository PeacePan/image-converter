const WorkerPlugin = require('worker-plugin');

const nextConfig = {
	target: 'server',
	compress: true,
	poweredByHeader: false,
	typescript: {
		ignoreBuildErrors: true,
	},
	webpack: (config, { dev, isServer }) => {
		/** https://github.com/GoogleChromeLabs/worker-plugin */
		if (!isServer) {
			config.plugins.push(
				new WorkerPlugin({
					globalObject: 'self',
					sharedWorker: false,
					workerType: 'module',
				})
			);
		}
		return config;
	},
};
module.exports = nextConfig;
