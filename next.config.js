const withPWA = require('next-pwa');
const defaultRuntimeCaching = require('next-pwa/cache');
const WorkerPlugin = require('worker-plugin');
const isProduction = process.env.NODE_ENV === 'production';

const nextConfig = withPWA({
	target: 'server',
	compress: true,
	poweredByHeader: false,
	typescript: {
		ignoreBuildErrors: true,
	},
	//#region next-pwa 設定
	/** @ref https://github.com/shadowwalker/next-pwa#available-options */
	pwa: {
		/** 只有啟用 production 並 serve 時 (npm run start)，才會啟用 PWA */
		disable: !isProduction,
		/** 網站 window.load 事件觸發即註冊 service-worker.js */
		register: true,
		dest: './public',
		sw: 'service-worker.js',
		scope: '/',
		/** 當網址存取時，不要快取某些網址資源的設定，如 /robots.txt */
		publicExcludes: [],
		/** webpack 編譯完後，過濾某些檔案的設定，過濾的檔案不會被儲存在 workbox-precache-v2-http */
		buildExcludes: [],
		//#region workboxOpts
		/** 超過 20 MB 的檔案不要存快取 */
		maximumFileSizeToCacheInBytes: 20 * 1024 * 1024,
		/**
		 * 忽略網址上的 URL 參數，不視為 cache 鍵值，只工作於網址為 /_next/static/* 底下的檔案
		 * dev 模式時 next-pwa 預設會過濾 next 編譯的時戳 ts 的 URL 參數
		 * https://github.com/shadowwalker/next-pwa/blob/master/index.js#L241
		 */
		// ignoreURLParametersMatching: [/.*/], // 忽略所有 URL 参数
		/**
		 * 產生 service-worker.js 時，會將設定的 Caching 注入
		 * 不同的 urlPattern 會儲存在不同的 cacheName
		 */
		runtimeCaching: [
			/**
			 * 可額外對規則重新設定
			 * 但 next-pwa 規定第一個 caching rule 必須為 start-url
			 * 且 urlPattern 需與 manifest.json 內的 start_url 相呼應
			 */
			...defaultRuntimeCaching,
		],
		//#endregion
	},
	//#endregion
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
});
module.exports = nextConfig;
