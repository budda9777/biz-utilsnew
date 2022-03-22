import UrlParse from 'url-parse';
import { OpenUrlOptions, UrlQuery } from './typings/common';

function noop() {}

export function _buildUrl(url: string, options: { query?: UrlQuery }) {
  const urlIns = new UrlParse(url, true);
  Object.assign(urlIns.query, options?.query);
  return urlIns.toString();
}

export function _ensureFunction(fn: unknown) {
  return typeof fn === 'function' ? fn : noop;
}

export function _openUrl(url: string, options: OpenUrlOptions & { download?: string }) {
  const finalUrl = _buildUrl(url, options);

  // 模拟 a 标签点击跳转
  const aEl = document.createElement('a');
  aEl.href = finalUrl;
  // 是否要新窗口打开
  if (options?.newWindow) {
    aEl.target = '_blank';
  }
  // 是否是下载文件
  if (options?.download) {
    aEl.download = options.download;
  }
  aEl.rel = 'noopener';
  aEl.style.display = 'none';
  document.body.appendChild(aEl);
  aEl.click();
  document.body.removeChild(aEl);
}