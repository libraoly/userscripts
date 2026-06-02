// ==UserScript==
// @name               Windy Premium Cleaner
// @name:zh-CN         Windy Premium 清理器
// @version            1.0.0
// @description        Remove Windy Premium watermark and grayscale filter.
// @description:zh-CN  移除 Windy Premium 水印和灰度滤镜。
// @run-at             document-start
// @match              https://www.windy.com/*
// @grant              GM_addStyle
// @author             libraoly <uylor.liao@gmail.com>
// @homepage           https://github.com/libraoly/userscripts
// @supportURL         https://github.com/libraoly/userscripts/issues
// @license            MIT
// @contributionURL    https://github.com/sponsors/libraoly
// @namespace          https://github.com/libraoly/userscripts/blob/release/windy-premium.user.js
// @downloadURL        https://github.com/libraoly/userscripts/raw/refs/heads/release/windy-premium.user.js
// ==/UserScript==
(function() {
	//#region src/windy-premium.ts
	const css = String.raw;
	GM_addStyle(css`
  #map-container::after {
    background-image: none !important;
  }

  .premium-calendar #map-container #leaflet-map {
    filter: none !important;
  }
`);
	//#endregion
})();
