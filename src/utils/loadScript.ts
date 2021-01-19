declare global {
  interface Window {
    __loadScriptModuleCallback?: (module: any) => void;
  }
}
export interface LoadScriptParams {
  src: string;
  id?: string;
  type?: 'text/javascript' | 'module';
  crossOrigin?: 'anonymous' | 'use-credentials';
}
/** 程式內非同步載入 script */
async function loadScript<ModuleType = unknown>(params: LoadScriptParams) {
  if (typeof document === 'undefined') return null;
  const { src, id, type = 'text/javascript', crossOrigin } = params;
  return new Promise<HTMLScriptElement | ModuleType | null>((resolve, reject) => {
    let script = document.querySelector<HTMLScriptElement>(`script[src^="${src}"]`);
    /** 相同的 link url 資源已經掛載至 DOM 上無需再處理 */
    if (script) return resolve(script);
    script = document.createElement('script');
    script.type = type;
    script.onerror = () => reject(new Error('載入 script 發生錯誤'));
    if (id) script.id = id;
    if (typeof crossOrigin === 'string') script.crossOrigin = crossOrigin;
    if (type === 'module') {
      window.__loadScriptModuleCallback = (module: ModuleType) => resolve(module);
      script.textContent =
        `import * as module from '${src}';` +
        `window.__loadScriptModuleCallback(module);` +
        `delete window.__loadScriptModuleCallback;`;
      document.head.appendChild(script);
    } else {
      script.async = script.defer = true;
      script.onload = () => resolve(script);
      script.src = src;
      document.head.appendChild(script);
    }
  });
}
export default loadScript;
