if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let s=Promise.resolve();return t[e]||(s=new Promise((async s=>{if("document"in self){const t=document.createElement("script");t.src=e,document.head.appendChild(t),t.onload=s}else importScripts(e),s()}))),s.then((()=>{if(!t[e])throw new Error(`Module ${e} didn’t register its module`);return t[e]}))},s=(s,t)=>{Promise.all(s.map(e)).then((e=>t(1===e.length?e[0]:e)))},t={require:Promise.resolve(s)};self.define=(s,c,n)=>{t[s]||(t[s]=Promise.resolve().then((()=>{let t={};const r={uri:location.origin+s.slice(1)};return Promise.all(c.map((s=>{switch(s){case"exports":return t;case"module":return r;default:return e(s)}}))).then((e=>{const s=n(...e);return t.default||(t.default=s),t}))})))}}define("./service-worker.js",["./workbox-8778d57b"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/cXpUVx9f028uXotZvQq8l/_buildManifest.js",revision:"cXpUVx9f028uXotZvQq8l"},{url:"/_next/static/cXpUVx9f028uXotZvQq8l/_ssgManifest.js",revision:"cXpUVx9f028uXotZvQq8l"},{url:"/_next/static/chunks/9.42f8bbf2665ca6521195.js",revision:"cXpUVx9f028uXotZvQq8l"},{url:"/_next/static/chunks/commons.4b3867070b69ada0419d.js",revision:"cXpUVx9f028uXotZvQq8l"},{url:"/_next/static/chunks/f6078781a05fe1bcb0902d23dbbb2662c8d200b3.96e948c357f8fde6e6a0.js",revision:"cXpUVx9f028uXotZvQq8l"},{url:"/_next/static/chunks/framework.05ab8cef3851d5d0995c.js",revision:"cXpUVx9f028uXotZvQq8l"},{url:"/_next/static/chunks/main-8265fb9ed95f718480b4.js",revision:"cXpUVx9f028uXotZvQq8l"},{url:"/_next/static/chunks/pages/_app-d80bfcf443479020032c.js",revision:"cXpUVx9f028uXotZvQq8l"},{url:"/_next/static/chunks/pages/_error-856b8c032543804f418a.js",revision:"cXpUVx9f028uXotZvQq8l"},{url:"/_next/static/chunks/pages/index-06fbd04fd97f5fec6f32.js",revision:"cXpUVx9f028uXotZvQq8l"},{url:"/_next/static/chunks/polyfills-ffb73ada90564d0a44cc.js",revision:"cXpUVx9f028uXotZvQq8l"},{url:"/_next/static/chunks/webpack-aff8a8b0d7fa5828790f.js",revision:"cXpUVx9f028uXotZvQq8l"},{url:"/favicon.ico",revision:"c92b85a5b907c70211f4ec25e29a8c4a"},{url:"/logo192.png",revision:"33dbdd0177549353eeeb785d02c294af"},{url:"/logo512.png",revision:"917515db74ea8d1aee6a246cfbcc0b45"},{url:"/manifest.json",revision:"d9d975cebe2ec20b6c652e1e4c12ccf0"},{url:"/robots.txt",revision:"fa1ded1ed7c11438a9b0385b1e112850"},{url:"/static/js/magick.js",revision:"eae43afec76181897dccd6efe0bc8bb6"},{url:"/static/js/magick.wasm",revision:"cdd95d4e29eebf379d072057140d23ed"},{url:"/static/js/magickApi.js",revision:"81c00edf32e19fc347af6ff2f6fce3af"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[new e.ExpirationPlugin({maxEntries:1,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\/api\/.*$/i,new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/.*/i,new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET")}));