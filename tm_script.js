// ==UserScript==
// @name         Better UnKnoWnCheaTs
// @namespace    https://github.com/cryeprecision/
// @version      0.1
// @description  Some scripts to improve UnKnoWnCheaTs
// @author       Ideot
// @match        https://www.unknowncheats.me/*
// @run-at       document-idle
// @grant        GM_getResourceText
// @require      https://code.jquery.com/jquery-3.6.0.min.js
// @require      https://raw.githubusercontent.com/cryeprecision/better_uc/main/unknowncheats.js
// @resource     CUSTOM_CSS https://raw.githubusercontent.com/cryeprecision/better_uc/main/style.css
// ==/UserScript==

// For development
// @require      file:///C:/.../better_uc/unknowncheats.js
// @resource     CUSTOM_CSS file:///C:/.../better_uc/style.css

// The script itself is in a separate file so you can edit it with VSCode or something

injectCss();
addMarkAllRead();
addCopyToCodeBlocks();
addCopyToCodeLines();
compactifyUserInfos();
wrapImagesInSpoiler();
removeSignatures();
removeBannerImage();
