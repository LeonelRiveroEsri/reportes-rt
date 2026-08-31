System.register(["jimu-core","jimu-arcgis"], function(__WEBPACK_DYNAMIC_EXPORT__, __system_context__) {
	var __WEBPACK_EXTERNAL_MODULE_jimu_core__ = {};
	var __WEBPACK_EXTERNAL_MODULE_jimu_arcgis__ = {};
	Object.defineProperty(__WEBPACK_EXTERNAL_MODULE_jimu_core__, "__esModule", { value: true });
	Object.defineProperty(__WEBPACK_EXTERNAL_MODULE_jimu_arcgis__, "__esModule", { value: true });
	return {
		setters: [
			function(module) {
				Object.keys(module).forEach(function(key) {
					__WEBPACK_EXTERNAL_MODULE_jimu_core__[key] = module[key];
				});
			},
			function(module) {
				Object.keys(module).forEach(function(key) {
					__WEBPACK_EXTERNAL_MODULE_jimu_arcgis__[key] = module[key];
				});
			}
		],
		execute: function() {
			__WEBPACK_DYNAMIC_EXPORT__(
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!./node_modules/resolve-url-loader/index.js??ruleSet[1].rules[3].use[2]!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[3].use[3]!./your-extensions/widgets/selector-imagenes-drone/src/runtime/style.scss":
/*!********************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!./node_modules/resolve-url-loader/index.js??ruleSet[1].rules[3].use[2]!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[3].use[3]!./your-extensions/widgets/selector-imagenes-drone/src/runtime/style.scss ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".drone-selector {\n  --teal: #087f86;\n  --navy: #18394b;\n  --line: #dce5e9;\n  --muted: #718793;\n  position: relative;\n  display: flex;\n  height: 100%;\n  min-height: 360px;\n  flex-direction: column;\n  overflow: hidden;\n  color: #334f5f;\n  background: #f6f8f9;\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif; }\n  .drone-selector * {\n    box-sizing: border-box; }\n  .drone-selector header {\n    display: flex;\n    padding: 20px 20px 17px;\n    flex: 0 0 auto;\n    align-items: flex-start;\n    justify-content: space-between;\n    border-bottom: 1px solid var(--line);\n    background: #fff; }\n    .drone-selector header span {\n      color: var(--teal);\n      font-size: 9px;\n      font-weight: 800;\n      letter-spacing: .14em; }\n    .drone-selector header h2 {\n      margin: 3px 0 1px;\n      color: var(--navy);\n      font-size: 21px;\n      line-height: 1.15; }\n    .drone-selector header p {\n      margin: 0;\n      color: var(--muted);\n      font-size: 10px; }\n    .drone-selector header button {\n      width: 34px;\n      height: 34px;\n      border: 1px solid #c8d6dc;\n      border-radius: 7px;\n      color: var(--teal);\n      background: #fff;\n      cursor: pointer;\n      font-size: 19px; }\n    .drone-selector header button:hover {\n      border-color: var(--teal);\n      background: #f0fafa; }\n  .drone-selector__tools {\n    padding: 13px 16px 10px;\n    flex: 0 0 auto;\n    border-bottom: 1px solid var(--line);\n    background: #fff; }\n  .drone-selector__tabs {\n    display: grid;\n    min-height: 43px;\n    flex: 0 0 auto;\n    grid-template-columns: 1fr 1fr;\n    border-bottom: 1px solid var(--line);\n    background: #fff; }\n    .drone-selector__tabs button {\n      position: relative;\n      border: 0;\n      color: #718691;\n      background: transparent;\n      cursor: pointer;\n      font-size: 10px;\n      font-weight: 700; }\n    .drone-selector__tabs button::after {\n      position: absolute;\n      right: 12px;\n      bottom: -1px;\n      left: 12px;\n      height: 3px;\n      border-radius: 3px 3px 0 0;\n      background: transparent;\n      content: \"\"; }\n    .drone-selector__tabs button.is-active {\n      color: var(--teal); }\n    .drone-selector__tabs button.is-active::after {\n      background: var(--teal); }\n    .drone-selector__tabs b {\n      display: inline-grid;\n      min-width: 19px;\n      height: 19px;\n      margin-left: 4px;\n      place-items: center;\n      border-radius: 10px;\n      color: #68808b;\n      background: #edf3f5;\n      font-size: 8px; }\n  .drone-selector__search {\n    display: flex;\n    height: 38px;\n    padding: 0 10px;\n    align-items: center;\n    gap: 7px;\n    border: 1px solid #bdcdd4;\n    border-radius: 7px;\n    background: #fff; }\n    .drone-selector__search span {\n      color: #69818d;\n      font-size: 19px; }\n    .drone-selector__search input {\n      min-width: 0;\n      height: 100%;\n      flex: 1;\n      border: 0;\n      outline: 0;\n      color: #294757;\n      background: transparent;\n      font-size: 12px; }\n    .drone-selector__search button {\n      border: 0;\n      color: #7a8d97;\n      background: none;\n      cursor: pointer;\n      font-size: 18px; }\n    .drone-selector__search:focus-within {\n      border-color: var(--teal);\n      box-shadow: 0 0 0 3px rgba(8, 127, 134, 0.1); }\n  .drone-selector__filters {\n    display: grid;\n    grid-template-columns: 1fr 1fr 1.05fr;\n    gap: 6px;\n    margin-top: 8px; }\n    .drone-selector__filters select {\n      min-width: 0;\n      height: 32px;\n      padding: 0 5px;\n      border: 1px solid #ccd9de;\n      border-radius: 5px;\n      color: #496573;\n      background: #fbfcfc;\n      font-size: 9px; }\n  .drone-selector__summary {\n    display: flex;\n    min-height: 26px;\n    padding-top: 9px;\n    align-items: center;\n    gap: 12px;\n    color: #788d97;\n    font-size: 9px; }\n    .drone-selector__summary strong {\n      color: var(--navy);\n      font-size: 12px; }\n    .drone-selector__summary b {\n      color: var(--teal); }\n    .drone-selector__summary button {\n      margin-left: auto;\n      padding: 0;\n      border: 0;\n      color: var(--teal);\n      background: none;\n      cursor: pointer;\n      font-size: 9px;\n      font-weight: 700; }\n  .drone-selector__analysis {\n    flex: 0 0 auto;\n    border-bottom: 1px solid var(--line);\n    background: #f0f5f6; }\n  .drone-selector__analysis-toggle {\n    display: flex;\n    width: 100%;\n    min-height: 34px;\n    padding: 0 16px;\n    align-items: center;\n    justify-content: space-between;\n    border: 0;\n    color: #41616e;\n    background: transparent;\n    cursor: pointer;\n    font-size: 10px;\n    font-weight: 700; }\n  .drone-selector__analysis-body {\n    padding: 0 16px 12px; }\n    .drone-selector__analysis-body > p {\n      margin: 8px 0 0;\n      color: #768a94;\n      font-size: 9px; }\n  .drone-selector__kpis {\n    display: grid;\n    grid-template-columns: repeat(3, 1fr);\n    gap: 6px; }\n    .drone-selector__kpis div {\n      padding: 8px;\n      border: 1px solid #d9e5e8;\n      border-radius: 6px;\n      background: #fff;\n      text-align: center; }\n    .drone-selector__kpis strong, .drone-selector__kpis span {\n      display: block; }\n    .drone-selector__kpis strong {\n      color: var(--teal);\n      font-size: 16px; }\n    .drone-selector__kpis span {\n      color: #82949c;\n      font-size: 8px;\n      text-transform: uppercase; }\n  .drone-selector__compare {\n    display: grid;\n    grid-template-columns: minmax(0, 1fr) 90px minmax(0, 1fr);\n    margin-top: 9px;\n    align-items: center;\n    gap: 6px; }\n    .drone-selector__compare span {\n      overflow: hidden;\n      color: #405f6c;\n      font-size: 8px;\n      text-overflow: ellipsis;\n      white-space: nowrap; }\n    .drone-selector__compare span:last-child {\n      text-align: right; }\n    .drone-selector__compare input {\n      width: 100%;\n      accent-color: var(--teal); }\n  .drone-selector__swipe-controls {\n    display: grid;\n    grid-template-columns: 1fr 1fr;\n    margin-top: 9px;\n    gap: 6px; }\n    .drone-selector__swipe-controls span {\n      padding: 6px;\n      overflow: hidden;\n      border-radius: 5px;\n      color: #405f6c;\n      background: #fff;\n      font-size: 8px;\n      text-overflow: ellipsis;\n      white-space: nowrap; }\n    .drone-selector__swipe-controls button {\n      grid-column: 1 / -1;\n      min-height: 31px;\n      border: 1px solid var(--teal);\n      border-radius: 5px;\n      color: #fff;\n      background: var(--teal);\n      cursor: pointer;\n      font-size: 10px;\n      font-weight: 700; }\n  .drone-selector__inline-error {\n    margin-top: 8px;\n    padding: 7px;\n    border-radius: 5px;\n    color: #8d3737;\n    background: #fff0f0;\n    font-size: 9px; }\n  .drone-selector__list {\n    min-height: 0;\n    flex: 1 1 auto;\n    overflow: auto;\n    background: #fff; }\n  .drone-selector article {\n    position: relative;\n    display: grid;\n    min-height: 72px;\n    grid-template-columns: 35px minmax(0, 1fr) auto;\n    align-items: center;\n    border-bottom: 1px solid #e2e9ec;\n    background: #fff;\n    transition: background .15s, box-shadow .15s; }\n    .drone-selector article::before {\n      position: absolute;\n      top: 0;\n      bottom: 0;\n      left: 0;\n      width: 4px;\n      background: transparent;\n      content: \"\"; }\n    .drone-selector article:hover {\n      background: #f7fafb; }\n    .drone-selector article.is-visible {\n      background: #edf8f8; }\n      .drone-selector article.is-visible::before {\n        background: var(--teal); }\n    .drone-selector article.is-comparing {\n      box-shadow: inset 0 0 0 1px #e7a93d; }\n  .drone-selector__eye {\n    width: 30px;\n    height: 100%;\n    border: 0;\n    color: #92a4ac;\n    background: transparent;\n    cursor: pointer;\n    font-size: 16px; }\n  .is-visible .drone-selector__eye {\n    color: var(--teal); }\n  .drone-selector__flight {\n    display: flex;\n    min-width: 0;\n    padding: 10px 3px;\n    flex-direction: column;\n    align-items: flex-start;\n    border: 0;\n    color: inherit;\n    background: transparent;\n    cursor: pointer;\n    text-align: left; }\n    .drone-selector__flight strong {\n      width: 100%;\n      overflow: hidden;\n      color: #294958;\n      font-size: 12px;\n      line-height: 1.25;\n      text-overflow: ellipsis;\n      white-space: nowrap; }\n    .drone-selector__flight small {\n      width: 100%;\n      margin-top: 3px;\n      overflow: hidden;\n      color: #84969f;\n      font-size: 8px;\n      text-overflow: ellipsis;\n      white-space: nowrap; }\n  .drone-selector__date {\n    margin-bottom: 3px;\n    color: var(--teal);\n    font-size: 8px;\n    font-weight: 750;\n    letter-spacing: .06em; }\n  .drone-selector__actions {\n    display: flex;\n    padding-right: 8px;\n    gap: 2px; }\n    .drone-selector__actions button {\n      display: grid;\n      width: 27px;\n      height: 27px;\n      place-items: center;\n      border: 0;\n      border-radius: 5px;\n      color: #6f858f;\n      background: transparent;\n      cursor: pointer;\n      font-size: 13px; }\n    .drone-selector__actions button:hover, .drone-selector__actions button.is-active {\n      color: var(--teal);\n      background: #dff1f1; }\n    .drone-selector__actions button.is-active {\n      color: #a76b00;\n      background: #fff1d8; }\n  .drone-selector__opacity {\n    display: grid;\n    min-height: 38px;\n    padding: 5px 12px 8px 39px;\n    grid-column: 1 / -1;\n    grid-template-columns: 76px 1fr 34px;\n    align-items: center;\n    gap: 8px;\n    color: #6e838e;\n    background: #f4f8f9;\n    font-size: 8px; }\n    .drone-selector__opacity input {\n      width: 100%;\n      accent-color: var(--teal); }\n    .drone-selector__opacity b {\n      color: var(--teal);\n      text-align: right; }\n  .drone-selector__vector-help {\n    padding: 11px 16px;\n    border-bottom: 1px solid var(--line);\n    color: #718691;\n    background: #f5f8f9;\n    font-size: 9px;\n    line-height: 1.4; }\n  .drone-selector__vector-list article {\n    min-height: 61px; }\n  .drone-selector__empty, .drone-selector__no-results {\n    display: flex;\n    padding: 45px 25px;\n    flex: 1;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n    color: #7c9099;\n    text-align: center; }\n    .drone-selector__empty i, .drone-selector__no-results i {\n      color: var(--teal);\n      font-size: 30px;\n      font-style: normal; }\n    .drone-selector__empty strong, .drone-selector__no-results strong {\n      margin-top: 8px;\n      color: var(--navy);\n      font-size: 14px; }\n    .drone-selector__empty p, .drone-selector__no-results p {\n      max-width: 260px;\n      margin: 5px 0 13px;\n      font-size: 10px; }\n    .drone-selector__empty button, .drone-selector__no-results button {\n      padding: 7px 11px;\n      border: 1px solid var(--teal);\n      border-radius: 5px;\n      color: var(--teal);\n      background: #fff;\n      cursor: pointer;\n      font-size: 10px; }\n  .drone-selector__alert {\n    margin: 16px;\n    padding: 14px;\n    border: 1px solid #e7b6b6;\n    border-radius: 7px;\n    color: #8b3d3d;\n    background: #fff4f4; }\n    .drone-selector__alert strong, .drone-selector__alert span {\n      display: block; }\n    .drone-selector__alert strong {\n      font-size: 12px; }\n    .drone-selector__alert span {\n      margin-top: 3px;\n      font-size: 10px; }\n    .drone-selector__alert button {\n      margin-top: 9px;\n      border: 0;\n      color: #8b3d3d;\n      background: none;\n      cursor: pointer;\n      font-size: 10px;\n      font-weight: 700; }\n  .drone-selector__loading {\n    position: absolute;\n    z-index: 5;\n    right: 12px;\n    bottom: 31px;\n    display: flex;\n    padding: 7px 10px;\n    align-items: center;\n    gap: 7px;\n    border: 1px solid #c9dadd;\n    border-radius: 20px;\n    color: #506c78;\n    background: rgba(255, 255, 255, 0.95);\n    box-shadow: 0 4px 12px rgba(30, 60, 70, 0.12);\n    font-size: 9px; }\n    .drone-selector__loading i {\n      width: 12px;\n      height: 12px;\n      border: 2px solid #c6dddd;\n      border-top-color: var(--teal);\n      border-radius: 50%;\n      animation: drone-spin .75s linear infinite; }\n  .drone-selector footer {\n    display: flex;\n    min-height: 28px;\n    padding: 0 16px;\n    flex: 0 0 auto;\n    align-items: center;\n    gap: 6px;\n    border-top: 1px solid var(--line);\n    color: #82949c;\n    background: #fafcfc;\n    font-size: 8px; }\n    .drone-selector footer span {\n      width: 6px;\n      height: 6px;\n      border-radius: 50%;\n      background: #b0bcc1; }\n    .drone-selector footer span.is-ready {\n      background: #2a9b73;\n      box-shadow: 0 0 0 3px rgba(42, 155, 115, 0.12); }\n\n@keyframes drone-spin {\n  to {\n    transform: rotate(360deg); } }\n\n@media (max-width: 350px) {\n  .drone-selector__filters {\n    grid-template-columns: 1fr 1fr; }\n    .drone-selector__filters select:last-child {\n      grid-column: 1 / -1; }\n  .drone-selector__actions button:first-child {\n    display: none; } }\n", "",{"version":3,"sources":["webpack://./your-extensions/widgets/selector-imagenes-drone/src/runtime/style.scss"],"names":[],"mappings":"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","sourcesContent":[".drone-selector {\n  --teal: #087f86; --navy: #18394b; --line: #dce5e9; --muted: #718793;\n  position: relative; display: flex; height: 100%; min-height: 360px; flex-direction: column; overflow: hidden;\n  color: #334f5f; background: #f6f8f9; font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif;\n  * { box-sizing: border-box; }\n  header { display: flex; padding: 20px 20px 17px; flex: 0 0 auto; align-items: flex-start; justify-content: space-between; border-bottom: 1px solid var(--line); background: #fff;\n    span { color: var(--teal); font-size: 9px; font-weight: 800; letter-spacing: .14em; }\n    h2 { margin: 3px 0 1px; color: var(--navy); font-size: 21px; line-height: 1.15; }\n    p { margin: 0; color: var(--muted); font-size: 10px; }\n    button { width: 34px; height: 34px; border: 1px solid #c8d6dc; border-radius: 7px; color: var(--teal); background: #fff; cursor: pointer; font-size: 19px; }\n    button:hover { border-color: var(--teal); background: #f0fafa; }\n  }\n  &__tools { padding: 13px 16px 10px; flex: 0 0 auto; border-bottom: 1px solid var(--line); background: #fff; }\n  &__tabs { display: grid; min-height: 43px; flex: 0 0 auto; grid-template-columns: 1fr 1fr; border-bottom: 1px solid var(--line); background: #fff;\n    button { position: relative; border: 0; color: #718691; background: transparent; cursor: pointer; font-size: 10px; font-weight: 700; }\n    button::after { position: absolute; right: 12px; bottom: -1px; left: 12px; height: 3px; border-radius: 3px 3px 0 0; background: transparent; content: \"\"; }\n    button.is-active { color: var(--teal); }\n    button.is-active::after { background: var(--teal); }\n    b { display: inline-grid; min-width: 19px; height: 19px; margin-left: 4px; place-items: center; border-radius: 10px; color: #68808b; background: #edf3f5; font-size: 8px; }\n  }\n  &__search { display: flex; height: 38px; padding: 0 10px; align-items: center; gap: 7px; border: 1px solid #bdcdd4; border-radius: 7px; background: #fff;\n    span { color: #69818d; font-size: 19px; }\n    input { min-width: 0; height: 100%; flex: 1; border: 0; outline: 0; color: #294757; background: transparent; font-size: 12px; }\n    button { border: 0; color: #7a8d97; background: none; cursor: pointer; font-size: 18px; }\n    &:focus-within { border-color: var(--teal); box-shadow: 0 0 0 3px rgba(8,127,134,.1); }\n  }\n  &__filters { display: grid; grid-template-columns: 1fr 1fr 1.05fr; gap: 6px; margin-top: 8px;\n    select { min-width: 0; height: 32px; padding: 0 5px; border: 1px solid #ccd9de; border-radius: 5px; color: #496573; background: #fbfcfc; font-size: 9px; }\n  }\n  &__summary { display: flex; min-height: 26px; padding-top: 9px; align-items: center; gap: 12px; color: #788d97; font-size: 9px;\n    strong { color: var(--navy); font-size: 12px; }\n    b { color: var(--teal); }\n    button { margin-left: auto; padding: 0; border: 0; color: var(--teal); background: none; cursor: pointer; font-size: 9px; font-weight: 700; }\n  }\n  &__analysis { flex: 0 0 auto; border-bottom: 1px solid var(--line); background: #f0f5f6; }\n  &__analysis-toggle { display: flex; width: 100%; min-height: 34px; padding: 0 16px; align-items: center; justify-content: space-between; border: 0; color: #41616e; background: transparent; cursor: pointer; font-size: 10px; font-weight: 700; }\n  &__analysis-body { padding: 0 16px 12px;\n    > p { margin: 8px 0 0; color: #768a94; font-size: 9px; }\n  }\n  &__kpis { display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px;\n    div { padding: 8px; border: 1px solid #d9e5e8; border-radius: 6px; background: #fff; text-align: center; }\n    strong, span { display: block; }\n    strong { color: var(--teal); font-size: 16px; }\n    span { color: #82949c; font-size: 8px; text-transform: uppercase; }\n  }\n  &__compare { display: grid; grid-template-columns: minmax(0,1fr) 90px minmax(0,1fr); margin-top: 9px; align-items: center; gap: 6px;\n    span { overflow: hidden; color: #405f6c; font-size: 8px; text-overflow: ellipsis; white-space: nowrap; }\n    span:last-child { text-align: right; }\n    input { width: 100%; accent-color: var(--teal); }\n  }\n  &__swipe-controls { display: grid; grid-template-columns: 1fr 1fr; margin-top: 9px; gap: 6px;\n    span { padding: 6px; overflow: hidden; border-radius: 5px; color: #405f6c; background: #fff; font-size: 8px; text-overflow: ellipsis; white-space: nowrap; }\n    button { grid-column: 1 / -1; min-height: 31px; border: 1px solid var(--teal); border-radius: 5px; color: #fff; background: var(--teal); cursor: pointer; font-size: 10px; font-weight: 700; }\n  }\n  &__inline-error { margin-top: 8px; padding: 7px; border-radius: 5px; color: #8d3737; background: #fff0f0; font-size: 9px; }\n  &__list { min-height: 0; flex: 1 1 auto; overflow: auto; background: #fff; }\n  article { position: relative; display: grid; min-height: 72px; grid-template-columns: 35px minmax(0,1fr) auto; align-items: center; border-bottom: 1px solid #e2e9ec; background: #fff; transition: background .15s, box-shadow .15s;\n    &::before { position: absolute; top: 0; bottom: 0; left: 0; width: 4px; background: transparent; content: \"\"; }\n    &:hover { background: #f7fafb; }\n    &.is-visible { background: #edf8f8; &::before { background: var(--teal); } }\n    &.is-comparing { box-shadow: inset 0 0 0 1px #e7a93d; }\n  }\n  &__eye { width: 30px; height: 100%; border: 0; color: #92a4ac; background: transparent; cursor: pointer; font-size: 16px; }\n  .is-visible &__eye { color: var(--teal); }\n  &__flight { display: flex; min-width: 0; padding: 10px 3px; flex-direction: column; align-items: flex-start; border: 0; color: inherit; background: transparent; cursor: pointer; text-align: left;\n    strong { width: 100%; overflow: hidden; color: #294958; font-size: 12px; line-height: 1.25; text-overflow: ellipsis; white-space: nowrap; }\n    small { width: 100%; margin-top: 3px; overflow: hidden; color: #84969f; font-size: 8px; text-overflow: ellipsis; white-space: nowrap; }\n  }\n  &__date { margin-bottom: 3px; color: var(--teal); font-size: 8px; font-weight: 750; letter-spacing: .06em; }\n  &__actions { display: flex; padding-right: 8px; gap: 2px;\n    button { display: grid; width: 27px; height: 27px; place-items: center; border: 0; border-radius: 5px; color: #6f858f; background: transparent; cursor: pointer; font-size: 13px; }\n    button:hover, button.is-active { color: var(--teal); background: #dff1f1; }\n    button.is-active { color: #a76b00; background: #fff1d8; }\n  }\n  &__opacity { display: grid; min-height: 38px; padding: 5px 12px 8px 39px; grid-column: 1 / -1; grid-template-columns: 76px 1fr 34px; align-items: center; gap: 8px; color: #6e838e; background: #f4f8f9; font-size: 8px;\n    input { width: 100%; accent-color: var(--teal); }\n    b { color: var(--teal); text-align: right; }\n  }\n  &__vector-help { padding: 11px 16px; border-bottom: 1px solid var(--line); color: #718691; background: #f5f8f9; font-size: 9px; line-height: 1.4; }\n  &__vector-list article { min-height: 61px; }\n  &__empty, &__no-results { display: flex; padding: 45px 25px; flex: 1; flex-direction: column; align-items: center; justify-content: center; color: #7c9099; text-align: center;\n    i { color: var(--teal); font-size: 30px; font-style: normal; }\n    strong { margin-top: 8px; color: var(--navy); font-size: 14px; }\n    p { max-width: 260px; margin: 5px 0 13px; font-size: 10px; }\n    button { padding: 7px 11px; border: 1px solid var(--teal); border-radius: 5px; color: var(--teal); background: #fff; cursor: pointer; font-size: 10px; }\n  }\n  &__alert { margin: 16px; padding: 14px; border: 1px solid #e7b6b6; border-radius: 7px; color: #8b3d3d; background: #fff4f4;\n    strong, span { display: block; }\n    strong { font-size: 12px; } span { margin-top: 3px; font-size: 10px; }\n    button { margin-top: 9px; border: 0; color: #8b3d3d; background: none; cursor: pointer; font-size: 10px; font-weight: 700; }\n  }\n  &__loading { position: absolute; z-index: 5; right: 12px; bottom: 31px; display: flex; padding: 7px 10px; align-items: center; gap: 7px; border: 1px solid #c9dadd; border-radius: 20px; color: #506c78; background: rgba(255,255,255,.95); box-shadow: 0 4px 12px rgba(30,60,70,.12); font-size: 9px;\n    i { width: 12px; height: 12px; border: 2px solid #c6dddd; border-top-color: var(--teal); border-radius: 50%; animation: drone-spin .75s linear infinite; }\n  }\n  footer { display: flex; min-height: 28px; padding: 0 16px; flex: 0 0 auto; align-items: center; gap: 6px; border-top: 1px solid var(--line); color: #82949c; background: #fafcfc; font-size: 8px;\n    span { width: 6px; height: 6px; border-radius: 50%; background: #b0bcc1; }\n    span.is-ready { background: #2a9b73; box-shadow: 0 0 0 3px rgba(42,155,115,.12); }\n  }\n}\n\n@keyframes drone-spin { to { transform: rotate(360deg); } }\n\n@media (max-width: 350px) {\n  .drone-selector__filters { grid-template-columns: 1fr 1fr; select:last-child { grid-column: 1 / -1; } }\n  .drone-selector__actions button:first-child { display: none; }\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";

      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }

      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }

      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }

      content += cssWithMappingToString(item);

      if (needLayer) {
        content += "}";
      }

      if (item[2]) {
        content += "}";
      }

      if (item[4]) {
        content += "}";
      }

      return content;
    }).join("");
  }; // import a list of modules into the list


  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }

      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }

      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }

      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {

"use strict";


module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),

/***/ "./your-extensions/widgets/selector-imagenes-drone/src/runtime/style.scss":
/*!********************************************************************************!*\
  !*** ./your-extensions/widgets/selector-imagenes-drone/src/runtime/style.scss ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_3_use_1_node_modules_resolve_url_loader_index_js_ruleSet_1_rules_3_use_2_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_3_use_3_style_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!../../../../../node_modules/resolve-url-loader/index.js??ruleSet[1].rules[3].use[2]!../../../../../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[3].use[3]!./style.scss */ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!./node_modules/resolve-url-loader/index.js??ruleSet[1].rules[3].use[2]!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[3].use[3]!./your-extensions/widgets/selector-imagenes-drone/src/runtime/style.scss");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_3_use_1_node_modules_resolve_url_loader_index_js_ruleSet_1_rules_3_use_2_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_3_use_3_style_scss__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_3_use_1_node_modules_resolve_url_loader_index_js_ruleSet_1_rules_3_use_2_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_3_use_3_style_scss__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_3_use_1_node_modules_resolve_url_loader_index_js_ruleSet_1_rules_3_use_2_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_3_use_3_style_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_3_use_1_node_modules_resolve_url_loader_index_js_ruleSet_1_rules_3_use_2_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_3_use_3_style_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

"use strict";


var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";


var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ }),

/***/ "./your-extensions/widgets/selector-imagenes-drone/src/runtime/drone-utils.ts":
/*!************************************************************************************!*\
  !*** ./your-extensions/widgets/selector-imagenes-drone/src/runtime/drone-utils.ts ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "matchesGroupTitle": () => (/* binding */ matchesGroupTitle),
/* harmony export */   "normalizeText": () => (/* binding */ normalizeText),
/* harmony export */   "parseFlightName": () => (/* binding */ parseFlightName)
/* harmony export */ });
const MONTHS = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
const normalizeText = (value) => String(value !== null && value !== void 0 ? value : '')
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
const parseFlightName = (title) => {
    const raw = String(title || '').trim();
    const match = raw.match(/^(\d{2}|\d{4})[_-](\d{1,2})[_-](\d{1,2})(?:[_-]+)?(.*)$/);
    if (!match)
        return { date: null, dateKey: '', year: 'Sin fecha', month: 'Sin fecha', place: raw, label: raw };
    const yearNumber = match[1].length === 2 ? 2000 + Number(match[1]) : Number(match[1]);
    const monthNumber = Number(match[2]);
    const dayNumber = Number(match[3]);
    const candidate = new Date(yearNumber, monthNumber - 1, dayNumber);
    const valid = candidate.getFullYear() === yearNumber && candidate.getMonth() === monthNumber - 1 && candidate.getDate() === dayNumber;
    const place = (match[4] || 'Vuelo sin sector').replace(/[_-]+/g, ' ').replace(/\s+/g, ' ').trim();
    if (!valid)
        return { date: null, dateKey: '', year: 'Sin fecha', month: 'Sin fecha', place, label: `${raw} · fecha no válida` };
    const dateKey = `${yearNumber}-${String(monthNumber).padStart(2, '0')}-${String(dayNumber).padStart(2, '0')}`;
    return {
        date: candidate,
        dateKey,
        year: String(yearNumber),
        month: MONTHS[monthNumber - 1],
        place,
        label: `${String(dayNumber).padStart(2, '0')} ${MONTHS[monthNumber - 1].slice(0, 3).toLowerCase()} ${yearNumber} · ${place}`
    };
};
const matchesGroupTitle = (candidate, expected) => {
    const groupKey = (value) => normalizeText(value)
        .replace(/\b(de|del|la|las|el|los)\b/g, ' ')
        .replace(/[^a-z0-9]+/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
    const left = groupKey(candidate);
    const right = groupKey(expected || 'Imagenes de Drone');
    return left === right || left.includes(right);
};


/***/ }),

/***/ "jimu-arcgis":
/*!******************************!*\
  !*** external "jimu-arcgis" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE_jimu_arcgis__;

/***/ }),

/***/ "jimu-core":
/*!****************************!*\
  !*** external "jimu-core" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE_jimu_core__;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "";
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other entry modules.
(() => {
/*!******************************************!*\
  !*** ./jimu-core/lib/set-public-path.ts ***!
  \******************************************/
/**
 * Webpack will replace __webpack_public_path__ with __webpack_require__.p to set the public path dynamically.
 * The reason why we can't set the publicPath in webpack config is: we change the publicPath when download.
 * */
// eslint-disable-next-line
// @ts-ignore
__webpack_require__.p = window.jimuConfig.baseUrl;

})();

// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!********************************************************************************!*\
  !*** ./your-extensions/widgets/selector-imagenes-drone/src/runtime/widget.tsx ***!
  \********************************************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var jimu_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jimu-core */ "jimu-core");
/* harmony import */ var jimu_arcgis__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jimu-arcgis */ "jimu-arcgis");
/* harmony import */ var _drone_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./drone-utils */ "./your-extensions/widgets/selector-imagenes-drone/src/runtime/drone-utils.ts");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./style.scss */ "./your-extensions/widgets/selector-imagenes-drone/src/runtime/style.scss");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};




const collectLeafLayers = (group, parentTitle) => {
    const result = [];
    const visit = (layer, parent) => {
        const children = (layer === null || layer === void 0 ? void 0 : layer.layers) || (layer === null || layer === void 0 ? void 0 : layer.sublayers);
        const title = String((layer === null || layer === void 0 ? void 0 : layer.title) || (layer === null || layer === void 0 ? void 0 : layer.name) || '');
        if (children === null || children === void 0 ? void 0 : children.length) {
            children.forEach((child) => visit(child, title || parent));
            return;
        }
        if (!layer)
            return;
        result.push(Object.assign({ id: String(layer.id || layer.uid || `${parent}-${layer.title}`), title: title || 'Vuelo sin nombre', parentTitle: parent, layer, visible: Boolean(layer.visible) }, (0,_drone_utils__WEBPACK_IMPORTED_MODULE_2__.parseFlightName)(title)));
    };
    const children = (group === null || group === void 0 ? void 0 : group.layers) || (group === null || group === void 0 ? void 0 : group.sublayers);
    children === null || children === void 0 ? void 0 : children.forEach((layer) => visit(layer, group.title || group.name || parentTitle));
    return result;
};
const childrenOf = (item) => (item === null || item === void 0 ? void 0 : item.layers) || (item === null || item === void 0 ? void 0 : item.sublayers);
const itemTitle = (item) => String((item === null || item === void 0 ? void 0 : item.title) || (item === null || item === void 0 ? void 0 : item.name) || '');
const findRecursive = (collection, title) => {
    let found = null;
    collection === null || collection === void 0 ? void 0 : collection.forEach((item) => {
        if (found)
            return;
        if ((0,_drone_utils__WEBPACK_IMPORTED_MODULE_2__.matchesGroupTitle)(itemTitle(item), title))
            found = item;
        else
            found = findRecursive(childrenOf(item), title);
    });
    return found;
};
const findCatalog = (map, title) => __awaiter(void 0, void 0, void 0, function* () {
    const path = String(title || 'Vuelos Drone PAO/Imagenes Drone')
        .split(/[/>]/).map(part => part.trim()).filter(Boolean);
    const roots = map === null || map === void 0 ? void 0 : map.layers;
    const loadPromises = [];
    roots === null || roots === void 0 ? void 0 : roots.forEach((root) => {
        const loader = (root === null || root === void 0 ? void 0 : root.loadAll) || (root === null || root === void 0 ? void 0 : root.load);
        if (loader)
            loadPromises.push(Promise.resolve(loader.call(root)).catch(() => null));
    });
    yield Promise.all(loadPromises);
    let current = findRecursive(roots, path[0]);
    for (const segment of path.slice(1)) {
        current = findRecursive(childrenOf(current), segment);
        if (!current)
            break;
    }
    if (current)
        return current;
    const leafTitle = path[path.length - 1] || title;
    return findRecursive(roots, leafTitle);
});
const Widget = (props) => {
    var _a, _b, _c, _d;
    const [jimuMapView, setJimuMapView] = jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.useState(null);
    const [flights, setFlights] = jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.useState([]);
    const [groupFound, setGroupFound] = jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.useState(false);
    const [loading, setLoading] = jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.useState(false);
    const [error, setError] = jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.useState('');
    const [query, setQuery] = jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.useState('');
    const [year, setYear] = jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.useState('');
    const [month, setMonth] = jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.useState('');
    const [sort, setSort] = jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.useState('newest');
    const [analysisOpen, setAnalysisOpen] = jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.useState(false);
    const [compareIds, setCompareIds] = jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.useState([]);
    const [swipeActive, setSwipeActive] = jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.useState(false);
    const [swipeError, setSwipeError] = jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.useState('');
    const [activeTab, setActiveTab] = jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.useState('imagery');
    const [vectors, setVectors] = jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.useState([]);
    const [opacityEditorId, setOpacityEditorId] = jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.useState('');
    const handles = jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.useRef([]);
    const initializedCatalog = jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.useRef('');
    const swipeRef = jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.useRef(null);
    const swipeClonesRef = jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.useRef([]);
    const clearHandles = () => {
        handles.current.forEach(handle => { var _a; return (_a = handle === null || handle === void 0 ? void 0 : handle.remove) === null || _a === void 0 ? void 0 : _a.call(handle); });
        handles.current = [];
    };
    const scanMap = jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.useCallback(() => __awaiter(void 0, void 0, void 0, function* () {
        var _e, _f;
        if (!((_e = jimuMapView === null || jimuMapView === void 0 ? void 0 : jimuMapView.view) === null || _e === void 0 ? void 0 : _e.map))
            return;
        setLoading(true);
        setError('');
        clearHandles();
        try {
            yield jimuMapView.view.when();
            const configuredTitle = props.config.groupTitle || 'Vuelos Drone PAO/Imagenes Drone';
            const group = yield findCatalog(jimuMapView.view.map, configuredTitle);
            setGroupFound(Boolean(group));
            if (!group) {
                setFlights([]);
                setError(`No se encontró el grupo “${configuredTitle}” en el mapa.`);
                return;
            }
            const items = collectLeafLayers(group, configuredTitle);
            if (initializedCatalog.current !== configuredTitle) {
                items.forEach(item => { item.layer.visible = false; });
                initializedCatalog.current = configuredTitle;
            }
            setFlights(items);
            const catalogRoot = group.layer || group;
            const vectorItems = [];
            (_f = jimuMapView.view.map.layers) === null || _f === void 0 ? void 0 : _f.forEach((layer) => {
                if (layer === catalogRoot || layer.type === 'imagery')
                    return;
                vectorItems.push({
                    id: String(layer.id || layer.uid || layer.title),
                    title: itemTitle(layer) || 'Capa sin nombre',
                    type: String(layer.type || 'layer'),
                    layer,
                    visible: Boolean(layer.visible)
                });
            });
            setVectors(vectorItems);
            items.forEach(item => {
                var _a;
                if ((_a = item.layer) === null || _a === void 0 ? void 0 : _a.watch) {
                    handles.current.push(item.layer.watch('visible', (visible) => {
                        setFlights(current => current.map(flight => flight.id === item.id ? Object.assign(Object.assign({}, flight), { visible }) : flight));
                    }));
                }
            });
            vectorItems.forEach(item => {
                var _a;
                if ((_a = item.layer) === null || _a === void 0 ? void 0 : _a.watch) {
                    handles.current.push(item.layer.watch('visible', (visible) => {
                        setVectors(current => current.map(layer => layer.id === item.id ? Object.assign(Object.assign({}, layer), { visible }) : layer));
                    }));
                }
            });
            const groupChildren = childrenOf(group);
            if (groupChildren === null || groupChildren === void 0 ? void 0 : groupChildren.on)
                handles.current.push(groupChildren.on('change', scanMap));
            if (!items.length)
                setError('El grupo existe, pero no contiene capas de vuelo.');
        }
        catch (exception) {
            setError(exception instanceof Error ? exception.message : 'No fue posible leer las capas del mapa.');
        }
        finally {
            setLoading(false);
        }
    }), [jimuMapView, props.config.groupTitle]);
    jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.useEffect(() => {
        scanMap();
        return clearHandles;
    }, [scanMap]);
    const years = jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.useMemo(() => Array.from(new Set(flights.map(item => item.year))).sort().reverse(), [flights]);
    const months = jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.useMemo(() => Array.from(new Set(flights.filter(item => !year || item.year === year).map(item => item.month))), [flights, year]);
    const filtered = jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.useMemo(() => {
        const needle = (0,_drone_utils__WEBPACK_IMPORTED_MODULE_2__.normalizeText)(query);
        return flights.filter(item => (!needle || (0,_drone_utils__WEBPACK_IMPORTED_MODULE_2__.normalizeText)(`${item.title} ${item.place} ${item.parentTitle} ${item.dateKey}`).includes(needle)) &&
            (!year || item.year === year) && (!month || item.month === month)).sort((a, b) => {
            var _a, _b;
            if (sort === 'name')
                return a.place.localeCompare(b.place);
            const left = ((_a = a.date) === null || _a === void 0 ? void 0 : _a.getTime()) || 0;
            const right = ((_b = b.date) === null || _b === void 0 ? void 0 : _b.getTime()) || 0;
            return sort === 'newest' ? right - left : left - right;
        });
    }, [flights, query, year, month, sort]);
    const visibleCount = flights.filter(item => item.visible).length;
    const zoomTo = (item) => __awaiter(void 0, void 0, void 0, function* () {
        if (!(jimuMapView === null || jimuMapView === void 0 ? void 0 : jimuMapView.view) || !item.layer)
            return;
        try {
            let target = item.layer.fullExtent || item.layer.extent;
            if (!target && item.layer.queryExtent) {
                const result = yield item.layer.queryExtent();
                target = result === null || result === void 0 ? void 0 : result.extent;
            }
            if (target)
                yield jimuMapView.view.goTo(target.expand ? target.expand(1.15) : target);
        }
        catch (_) { }
    });
    const toggleVisibility = (item) => __awaiter(void 0, void 0, void 0, function* () {
        const next = !item.layer.visible;
        if (next && props.config.exclusiveVisibility !== false) {
            flights.forEach(candidate => { candidate.layer.visible = candidate.id === item.id; });
        }
        else {
            item.layer.visible = next;
        }
        setFlights(current => current.map(candidate => (Object.assign(Object.assign({}, candidate), { visible: Boolean(candidate.layer.visible) }))));
        if (next && props.config.zoomOnSelect !== false)
            yield zoomTo(item);
    });
    const toggleCompare = (item) => {
        setCompareIds(current => {
            if (current.includes(item.id))
                return current.filter(id => id !== item.id);
            if (current.length >= 2)
                return [current[1], item.id];
            return [...current, item.id];
        });
    };
    const closeSwipe = jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.useCallback(() => {
        var _a, _b;
        if (swipeRef.current && (jimuMapView === null || jimuMapView === void 0 ? void 0 : jimuMapView.view)) {
            jimuMapView.view.ui.remove(swipeRef.current);
            (_b = (_a = swipeRef.current).destroy) === null || _b === void 0 ? void 0 : _b.call(_a);
        }
        swipeRef.current = null;
        swipeClonesRef.current.forEach(layer => { var _a, _b; return (_b = (_a = jimuMapView === null || jimuMapView === void 0 ? void 0 : jimuMapView.view) === null || _a === void 0 ? void 0 : _a.map) === null || _b === void 0 ? void 0 : _b.remove(layer); });
        swipeClonesRef.current = [];
        setSwipeActive(false);
    }, [jimuMapView]);
    const showOnlySublayer = (collection, targetId) => {
        let collectionHasTarget = false;
        collection === null || collection === void 0 ? void 0 : collection.forEach((item) => {
            const children = childrenOf(item);
            const hasTarget = (children === null || children === void 0 ? void 0 : children.length)
                ? showOnlySublayer(children, targetId)
                : String(item.id) === targetId;
            item.visible = hasTarget;
            collectionHasTarget = collectionHasTarget || hasTarget;
        });
        return collectionHasTarget;
    };
    const startSwipe = () => __awaiter(void 0, void 0, void 0, function* () {
        var _g, _h;
        if (compareIds.length !== 2 || !(jimuMapView === null || jimuMapView === void 0 ? void 0 : jimuMapView.view))
            return;
        closeSwipe();
        setSwipeError('');
        try {
            const first = flights.find(item => item.id === compareIds[0]);
            const second = flights.find(item => item.id === compareIds[1]);
            const firstSource = (_g = first === null || first === void 0 ? void 0 : first.layer) === null || _g === void 0 ? void 0 : _g.layer;
            const secondSource = (_h = second === null || second === void 0 ? void 0 : second.layer) === null || _h === void 0 ? void 0 : _h.layer;
            if (!first || !second || !(firstSource === null || firstSource === void 0 ? void 0 : firstSource.clone) || !(secondSource === null || secondSource === void 0 ? void 0 : secondSource.clone)) {
                throw new Error('Las capas seleccionadas no pertenecen a un MapImageLayer compatible.');
            }
            const firstClone = firstSource.clone();
            const secondClone = secondSource.clone();
            firstClone.title = `Comparación A · ${first.place}`;
            secondClone.title = `Comparación B · ${second.place}`;
            yield Promise.all([firstClone.load(), secondClone.load()]);
            showOnlySublayer(firstClone.sublayers, first.id);
            showOnlySublayer(secondClone.sublayers, second.id);
            firstClone.listMode = 'hide';
            secondClone.listMode = 'hide';
            jimuMapView.view.map.addMany([firstClone, secondClone]);
            swipeClonesRef.current = [firstClone, secondClone];
            const [Swipe] = yield (0,jimu_arcgis__WEBPACK_IMPORTED_MODULE_1__.loadArcGISJSAPIModules)(['esri/widgets/Swipe']);
            const swipe = new Swipe({
                view: jimuMapView.view,
                leadingLayers: [firstClone],
                trailingLayers: [secondClone],
                direction: 'horizontal',
                position: 50
            });
            jimuMapView.view.ui.add(swipe);
            swipeRef.current = swipe;
            setSwipeActive(true);
            first.layer.visible = false;
            second.layer.visible = false;
        }
        catch (exception) {
            closeSwipe();
            setSwipeError(exception instanceof Error ? exception.message : 'No fue posible iniciar la comparación Swipe.');
        }
    });
    jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.useEffect(() => () => {
        var _a, _b;
        if (swipeRef.current && (jimuMapView === null || jimuMapView === void 0 ? void 0 : jimuMapView.view))
            jimuMapView.view.ui.remove(swipeRef.current);
        (_b = (_a = swipeRef.current) === null || _a === void 0 ? void 0 : _a.destroy) === null || _b === void 0 ? void 0 : _b.call(_a);
        swipeClonesRef.current.forEach(layer => { var _a, _b; return (_b = (_a = jimuMapView === null || jimuMapView === void 0 ? void 0 : jimuMapView.view) === null || _a === void 0 ? void 0 : _a.map) === null || _b === void 0 ? void 0 : _b.remove(layer); });
    }, [jimuMapView]);
    const setLayerOpacity = (item, value) => {
        item.layer.opacity = value / 100;
        setFlights(current => [...current]);
        setVectors(current => [...current]);
    };
    const toggleVector = (item) => {
        item.layer.visible = !item.layer.visible;
        setVectors(current => current.map(layer => layer.id === item.id ? Object.assign(Object.assign({}, layer), { visible: item.layer.visible }) : layer));
    };
    const clearFilters = () => { setQuery(''); setYear(''); setMonth(''); };
    const unconfigured = !((_a = props.useMapWidgetIds) === null || _a === void 0 ? void 0 : _a.length);
    return jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement("div", { className: "drone-selector" },
        ((_b = props.useMapWidgetIds) === null || _b === void 0 ? void 0 : _b[0]) && jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement(jimu_arcgis__WEBPACK_IMPORTED_MODULE_1__.JimuMapViewComponent, { useMapWidgetId: props.useMapWidgetIds[0], onActiveViewChange: setJimuMapView }),
        jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement("header", null,
            jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement("div", null,
                jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement("span", null, "IM\u00C1GENES A\u00C9REAS"),
                jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement("h2", null, "Vuelos Drone PAO"),
                jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement("p", null, "Exploraci\u00F3n temporal y comparaci\u00F3n visual")),
            jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement("button", { type: "button", title: "Actualizar capas", onClick: scanMap, disabled: loading }, "\u21BB")),
        unconfigured && jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement("div", { className: "drone-selector__empty" },
            jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement("i", null, "\u2316"),
            jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement("strong", null, "Configure un mapa"),
            jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement("p", null, "Abra los ajustes del widget y seleccione el Map Widget.")),
        !unconfigured && error && jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement("div", { className: "drone-selector__alert" },
            jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement("strong", null, "No se pudo cargar el cat\u00E1logo"),
            jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement("span", null, error),
            jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement("button", { onClick: scanMap }, "Reintentar")),
        !unconfigured && groupFound && jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement(jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.Fragment, null,
            jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement("nav", { className: "drone-selector__tabs" },
                jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement("button", { className: activeTab === 'imagery' ? 'is-active' : '', onClick: () => setActiveTab('imagery') },
                    "Im\u00E1genes ",
                    jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement("b", null, flights.length)),
                jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement("button", { className: activeTab === 'vectors' ? 'is-active' : '', onClick: () => setActiveTab('vectors') },
                    "Capas vectoriales ",
                    jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement("b", null, vectors.length))),
            activeTab === 'imagery' && jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement(jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.Fragment, null,
                jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement("section", { className: "drone-selector__tools" },
                    jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement("label", { className: "drone-selector__search" },
                        jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement("span", null, "\u2315"),
                        jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement("input", { "aria-label": "Buscar vuelos", value: query, placeholder: "Buscar sector, vuelo o fecha\u2026", onChange: event => setQuery(event.target.value) }),
                        query && jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement("button", { onClick: () => setQuery('') }, "\u00D7")),
                    jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement("div", { className: "drone-selector__filters" },
                        jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement("select", { "aria-label": "A\u00F1o", value: year, onChange: event => { setYear(event.target.value); setMonth(''); } },
                            jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement("option", { value: "" }, "Todos los a\u00F1os"),
                            years.map(value => jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement("option", { key: value }, value))),
                        jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement("select", { "aria-label": "Mes", value: month, onChange: event => setMonth(event.target.value) },
                            jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement("option", { value: "" }, "Todos los meses"),
                            months.map(value => jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement("option", { key: value }, value))),
                        jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement("select", { "aria-label": "Orden", value: sort, onChange: event => setSort(event.target.value) },
                            jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement("option", { value: "newest" }, "M\u00E1s recientes"),
                            jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement("option", { value: "oldest" }, "M\u00E1s antiguos"),
                            jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement("option", { value: "name" }, "Por sector"))),
                    jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement("div", { className: "drone-selector__summary" },
                        jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement("span", null,
                            jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement("strong", null, filtered.length),
                            " de ",
                            flights.length,
                            " vuelos"),
                        jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement("span", null,
                            jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement("b", null, visibleCount),
                            " visibles"),
                        (query || year || month) && jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement("button", { onClick: clearFilters }, "Limpiar filtros"))),
                jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement("section", { className: "drone-selector__analysis" },
                    jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement("button", { className: "drone-selector__analysis-toggle", onClick: () => setAnalysisOpen(value => !value) },
                        jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement("span", null, "\u25A5 Resumen y comparaci\u00F3n"),
                        jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement("b", null, analysisOpen ? '−' : '+')),
                    analysisOpen && jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement("div", { className: "drone-selector__analysis-body" },
                        jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement("div", { className: "drone-selector__kpis" },
                            jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement("div", null,
                                jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement("strong", null, years.filter(value => value !== 'Sin fecha').length),
                                jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement("span", null, "A\u00F1os")),
                            jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement("div", null,
                                jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement("strong", null, new Set(flights.map(item => item.place)).size),
                                jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement("span", null, "Sectores")),
                            jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement("div", null,
                                jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement("strong", null,
                                    compareIds.length,
                                    "/2"),
                                jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement("span", null, "Comparar"))),
                        jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement("p", null, "Seleccione dos vuelos con \u21C4 y active la cortina Swipe."),
                        compareIds.length === 2 && jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement("div", { className: "drone-selector__swipe-controls" },
                            jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement("span", null, (_c = flights.find(item => item.id === compareIds[0])) === null || _c === void 0 ? void 0 : _c.place),
                            jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement("span", null, (_d = flights.find(item => item.id === compareIds[1])) === null || _d === void 0 ? void 0 : _d.place),
                            jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement("button", { onClick: swipeActive ? closeSwipe : startSwipe }, swipeActive ? 'Cerrar Swipe' : 'Iniciar Swipe')),
                        swipeError && jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement("div", { className: "drone-selector__inline-error" }, swipeError))),
                jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement("main", { className: "drone-selector__list", "aria-busy": loading },
                    filtered.map(item => {
                        var _a, _b;
                        return jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement("article", { key: item.id, className: `${item.visible ? 'is-visible' : ''} ${compareIds.includes(item.id) ? 'is-comparing' : ''}` },
                            jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement("button", { className: "drone-selector__eye", title: item.visible ? 'Ocultar vuelo' : 'Mostrar vuelo', "aria-label": item.visible ? 'Ocultar vuelo' : 'Mostrar vuelo', onClick: () => toggleVisibility(item) }, item.visible ? '◉' : '○'),
                            jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement("button", { className: "drone-selector__flight", onClick: () => toggleVisibility(item) },
                                jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement("span", { className: "drone-selector__date" }, item.date ? item.dateKey.split('-').reverse().join('/') : 'SIN FECHA'),
                                jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement("strong", null, item.place),
                                jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement("small", { title: item.title }, item.parentTitle)),
                            jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement("div", { className: "drone-selector__actions" },
                                jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement("button", { title: "Comparar", className: compareIds.includes(item.id) ? 'is-active' : '', onClick: () => toggleCompare(item) }, "\u21C4"),
                                jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement("button", { title: "Transparencia", className: opacityEditorId === item.id ? 'is-active' : '', onClick: () => setOpacityEditorId(current => current === item.id ? '' : item.id) }, "\u25D0"),
                                jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement("button", { title: "Acercar", onClick: () => zoomTo(item) }, "\u2316")),
                            opacityEditorId === item.id && jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement("div", { className: "drone-selector__opacity" },
                                jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement("span", null, "Transparencia"),
                                jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement("input", { type: "range", min: "0", max: "100", value: Math.round((1 - ((_a = item.layer.opacity) !== null && _a !== void 0 ? _a : 1)) * 100), onChange: event => setLayerOpacity(item, 100 - Number(event.target.value)) }),
                                jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement("b", null,
                                    Math.round((1 - ((_b = item.layer.opacity) !== null && _b !== void 0 ? _b : 1)) * 100),
                                    "%")));
                    }),
                    !loading && !filtered.length && jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement("div", { className: "drone-selector__no-results" },
                        jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement("strong", null, "Sin coincidencias"),
                        jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement("p", null, "Pruebe otra fecha o t\u00E9rmino de b\u00FAsqueda."),
                        jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement("button", { onClick: clearFilters }, "Restablecer filtros")))),
            activeTab === 'vectors' && jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement("main", { className: "drone-selector__list drone-selector__vector-list" },
                jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement("div", { className: "drone-selector__vector-help" }, "Encienda, apague y ajuste la transparencia de las capas operacionales del web map."),
                vectors.map(item => {
                    var _a, _b;
                    return jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement("article", { key: item.id, className: item.visible ? 'is-visible' : '' },
                        jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement("button", { className: "drone-selector__eye", onClick: () => toggleVector(item) }, item.visible ? '◉' : '○'),
                        jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement("button", { className: "drone-selector__flight", onClick: () => toggleVector(item) },
                            jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement("strong", null, item.title),
                            jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement("small", null, item.type)),
                        jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement("div", { className: "drone-selector__actions" },
                            jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement("button", { title: "Transparencia", className: opacityEditorId === `v-${item.id}` ? 'is-active' : '', onClick: () => setOpacityEditorId(current => current === `v-${item.id}` ? '' : `v-${item.id}`) }, "\u25D0")),
                        opacityEditorId === `v-${item.id}` && jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement("div", { className: "drone-selector__opacity" },
                            jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement("span", null, "Transparencia"),
                            jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement("input", { type: "range", min: "0", max: "100", value: Math.round((1 - ((_a = item.layer.opacity) !== null && _a !== void 0 ? _a : 1)) * 100), onChange: event => setLayerOpacity(item, 100 - Number(event.target.value)) }),
                            jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement("b", null,
                                Math.round((1 - ((_b = item.layer.opacity) !== null && _b !== void 0 ? _b : 1)) * 100),
                                "%")));
                }))),
        loading && jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement("div", { className: "drone-selector__loading" },
            jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement("i", null),
            jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement("span", null, "Actualizando vuelos\u2026")),
        jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement("footer", null,
            jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement("span", { className: groupFound ? 'is-ready' : '' }),
            groupFound ? 'Catálogo conectado al mapa' : 'Esperando catálogo'));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Widget);

})();

/******/ 	return __webpack_exports__;
/******/ })()

			);
		}
	};
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lkZ2V0cy9zZWxlY3Rvci1pbWFnZW5lcy1kcm9uZS9kaXN0L3J1bnRpbWUvd2lkZ2V0LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDc0g7QUFDakI7QUFDckcsOEJBQThCLG1GQUEyQixDQUFDLDRGQUFxQztBQUMvRjtBQUNBLDJEQUEyRCxvQkFBb0Isb0JBQW9CLG9CQUFvQixxQkFBcUIsdUJBQXVCLGtCQUFrQixpQkFBaUIsc0JBQXNCLDJCQUEyQixxQkFBcUIsbUJBQW1CLHdCQUF3QiwrRUFBK0UsdUJBQXVCLCtCQUErQiw0QkFBNEIsb0JBQW9CLDhCQUE4QixxQkFBcUIsOEJBQThCLHFDQUFxQywyQ0FBMkMseUJBQXlCLG1DQUFtQywyQkFBMkIsdUJBQXVCLHlCQUF5QixnQ0FBZ0MsaUNBQWlDLDBCQUEwQiwyQkFBMkIsd0JBQXdCLDRCQUE0QixnQ0FBZ0Msa0JBQWtCLDRCQUE0QiwwQkFBMEIscUNBQXFDLG9CQUFvQixxQkFBcUIsa0NBQWtDLDJCQUEyQiwyQkFBMkIseUJBQXlCLHdCQUF3QiwwQkFBMEIsMkNBQTJDLGtDQUFrQyw4QkFBOEIsNEJBQTRCLDhCQUE4QixxQkFBcUIsMkNBQTJDLHlCQUF5QiwyQkFBMkIsb0JBQW9CLHVCQUF1QixxQkFBcUIscUNBQXFDLDJDQUEyQyx5QkFBeUIsb0NBQW9DLDJCQUEyQixrQkFBa0IsdUJBQXVCLGdDQUFnQyx3QkFBd0Isd0JBQXdCLDJCQUEyQiwyQ0FBMkMsMkJBQTJCLG9CQUFvQixxQkFBcUIsbUJBQW1CLG9CQUFvQixtQ0FBbUMsZ0NBQWdDLHdCQUF3Qiw4Q0FBOEMsNkJBQTZCLHFEQUFxRCxrQ0FBa0MsK0JBQStCLDZCQUE2Qix3QkFBd0IscUJBQXFCLHlCQUF5Qiw0QkFBNEIsNEJBQTRCLHVCQUF1Qiw0QkFBNEIseUJBQXlCLDZCQUE2QixvQkFBb0IsbUJBQW1CLHNCQUFzQiwwQkFBMEIsZUFBZSxnQ0FBZ0MseUJBQXlCLHlCQUF5Qixv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LE1BQU0sWUFBWSxVQUFVLFlBQVksaUJBQWlCLE1BQU0sWUFBWSxZQUFZLFVBQVUsaUJBQWlCLE1BQU0sVUFBVSxZQUFZLGVBQWUsTUFBTSxVQUFVLFVBQVUsWUFBWSxZQUFZLFlBQVksWUFBWSxVQUFVLGVBQWUsTUFBTSxhQUFhLGlCQUFpQixNQUFNLFlBQVksVUFBVSxZQUFZLGlCQUFpQixNQUFNLFVBQVUsWUFBWSxVQUFVLFlBQVksWUFBWSxpQkFBaUIsTUFBTSxZQUFZLFVBQVUsVUFBVSxZQUFZLFVBQVUsVUFBVSxpQkFBaUIsTUFBTSxhQUFhLFVBQVUsVUFBVSxVQUFVLFVBQVUsWUFBWSxZQUFZLGVBQWUsTUFBTSxrQkFBa0IsTUFBTSxrQkFBa0IsTUFBTSxZQUFZLFVBQVUsVUFBVSxZQUFZLFlBQVksWUFBWSxVQUFVLFlBQVksZUFBZSxNQUFNLFVBQVUsVUFBVSxVQUFVLFlBQVksVUFBVSxZQUFZLFlBQVksaUJBQWlCLE1BQU0sVUFBVSxlQUFlLE1BQU0sVUFBVSxVQUFVLFVBQVUsVUFBVSxVQUFVLFVBQVUsWUFBWSxlQUFlLE1BQU0sVUFBVSxVQUFVLFlBQVksVUFBVSxlQUFlLE1BQU0sYUFBYSxpQkFBaUIsTUFBTSxVQUFVLFlBQVksVUFBVSxlQUFlLE1BQU0sVUFBVSxVQUFVLFVBQVUsWUFBWSxZQUFZLFVBQVUsWUFBWSxlQUFlLE1BQU0sVUFBVSxZQUFZLFlBQVksWUFBWSxVQUFVLFVBQVUsZUFBZSxNQUFNLFlBQVksZUFBZSxNQUFNLGlCQUFpQixNQUFNLFlBQVksVUFBVSxVQUFVLFlBQVksWUFBWSxVQUFVLFVBQVUsaUJBQWlCLE1BQU0sVUFBVSxZQUFZLGlCQUFpQixNQUFNLFdBQVcsVUFBVSxZQUFZLFVBQVUsWUFBWSxZQUFZLFVBQVUsVUFBVSxZQUFZLFVBQVUsVUFBVSxpQkFBaUIsTUFBTSxrQkFBa0IsTUFBTSxVQUFVLFVBQVUsZUFBZSxNQUFNLFVBQVUsWUFBWSxlQUFlLE1BQU0sVUFBVSxZQUFZLFlBQVksWUFBWSxpQkFBaUIsTUFBTSxnQkFBZ0IsTUFBTSxZQUFZLGVBQWUsTUFBTSxVQUFVLFVBQVUsaUJBQWlCLE1BQU0sVUFBVSxZQUFZLFVBQVUsWUFBWSxlQUFlLE1BQU0sWUFBWSxVQUFVLFVBQVUsWUFBWSxpQkFBaUIsTUFBTSxrQkFBa0IsTUFBTSxVQUFVLGlCQUFpQixNQUFNLFdBQVcsWUFBWSxVQUFVLGVBQWUsTUFBTSxVQUFVLFlBQVksWUFBWSxVQUFVLFlBQVksVUFBVSxZQUFZLGlCQUFpQixNQUFNLFlBQVksWUFBWSxZQUFZLFlBQVksVUFBVSxZQUFZLFVBQVUsVUFBVSxpQkFBaUIsTUFBTSxXQUFXLFVBQVUsWUFBWSxVQUFVLFlBQVksZUFBZSxNQUFNLFVBQVUsVUFBVSxVQUFVLGlCQUFpQixPQUFPLGFBQWEsVUFBVSxZQUFZLFlBQVksWUFBWSxZQUFZLFlBQVksaUJBQWlCLE9BQU8sY0FBYyxVQUFVLFVBQVUsVUFBVSxVQUFVLFlBQVksZUFBZSxPQUFPLGtCQUFrQixPQUFPLG1CQUFtQixPQUFPLG1CQUFtQixPQUFPLG1CQUFtQixNQUFNLFVBQVUsVUFBVSxVQUFVLFVBQVUsWUFBWSxVQUFVLGVBQWUsTUFBTSxrQkFBa0IsTUFBTSxVQUFVLFVBQVUsWUFBWSxZQUFZLFlBQVksVUFBVSxVQUFVLFlBQVksVUFBVSxpQkFBaUIsTUFBTSxVQUFVLFlBQVksVUFBVSxVQUFVLFlBQVksWUFBWSxpQkFBaUIsTUFBTSxVQUFVLFVBQVUsWUFBWSxVQUFVLFVBQVUsWUFBWSxpQkFBaUIsTUFBTSxZQUFZLFlBQVksVUFBVSxZQUFZLGlCQUFpQixNQUFNLFVBQVUsWUFBWSxlQUFlLE1BQU0sVUFBVSxVQUFVLFVBQVUsWUFBWSxVQUFVLFlBQVksVUFBVSxZQUFZLFVBQVUsZUFBZSxNQUFNLGFBQWEsaUJBQWlCLE1BQU0sV0FBVyxpQkFBaUIsTUFBTSxVQUFVLFlBQVksWUFBWSxZQUFZLFlBQVksWUFBWSxVQUFVLFVBQVUsWUFBWSxlQUFlLE1BQU0sVUFBVSxpQkFBaUIsTUFBTSxZQUFZLGlCQUFpQixNQUFNLGFBQWEsWUFBWSxVQUFVLFlBQVksVUFBVSxpQkFBaUIsTUFBTSxr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RUFBRSxDQUFDLGFBQVksQ0FBTTt3QkFDeFAsZUFBZSxLQUFLLEtBQUssSUFBSSxDQUFDLEVBQUUsRUFBRSxJQUFJLG9FQUFLLFNBQVMsRUFBQyx5QkFBeUI7NEJBQUMseUZBQTBCOzRCQUFBLHNFQUFPLElBQUksRUFBQyxPQUFPLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLG1DQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLEVBQUUsUUFBUSxFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUMsZUFBZSxDQUFDLElBQUksRUFBRSxHQUFHLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBSTs0QkFBQTtnQ0FBSSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLG1DQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO29DQUFNLENBQU0sQ0FDalY7aUJBQUEsQ0FBQyxDQUNOLENBQ047UUFDRixPQUFPLElBQUksb0VBQUssU0FBUyxFQUFDLHlCQUF5QjtZQUFDLHFFQUFPO1lBQUEscUdBQWlDLENBQU07UUFDbkc7WUFBUSxxRUFBTSxTQUFTLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBUztZQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsNEJBQTRCLENBQUMsQ0FBQyxDQUFDLG9CQUFvQixDQUFVLENBQ3JJO0FBQ1IsQ0FBQztBQUVELGlFQUFlLE1BQU0iLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9leGItY2xpZW50Ly4veW91ci1leHRlbnNpb25zL3dpZGdldHMvc2VsZWN0b3ItaW1hZ2VuZXMtZHJvbmUvc3JjL3J1bnRpbWUvc3R5bGUuc2NzcyIsIndlYnBhY2s6Ly9leGItY2xpZW50Ly4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly9leGItY2xpZW50Ly4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vZXhiLWNsaWVudC8uL3lvdXItZXh0ZW5zaW9ucy93aWRnZXRzL3NlbGVjdG9yLWltYWdlbmVzLWRyb25lL3NyYy9ydW50aW1lL3N0eWxlLnNjc3M/ZTM2ZiIsIndlYnBhY2s6Ly9leGItY2xpZW50Ly4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL2V4Yi1jbGllbnQvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL2V4Yi1jbGllbnQvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vZXhiLWNsaWVudC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9leGItY2xpZW50Ly4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vZXhiLWNsaWVudC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL2V4Yi1jbGllbnQvLi95b3VyLWV4dGVuc2lvbnMvd2lkZ2V0cy9zZWxlY3Rvci1pbWFnZW5lcy1kcm9uZS9zcmMvcnVudGltZS9kcm9uZS11dGlscy50cyIsIndlYnBhY2s6Ly9leGItY2xpZW50L2V4dGVybmFsIHN5c3RlbSBcImppbXUtYXJjZ2lzXCIiLCJ3ZWJwYWNrOi8vZXhiLWNsaWVudC9leHRlcm5hbCBzeXN0ZW0gXCJqaW11LWNvcmVcIiIsIndlYnBhY2s6Ly9leGItY2xpZW50L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2V4Yi1jbGllbnQvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vZXhiLWNsaWVudC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vZXhiLWNsaWVudC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2V4Yi1jbGllbnQvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9leGItY2xpZW50L3dlYnBhY2svcnVudGltZS9wdWJsaWNQYXRoIiwid2VicGFjazovL2V4Yi1jbGllbnQvd2VicGFjay9ydW50aW1lL25vbmNlIiwid2VicGFjazovL2V4Yi1jbGllbnQvLi9qaW11LWNvcmUvbGliL3NldC1wdWJsaWMtcGF0aC50cyIsIndlYnBhY2s6Ly9leGItY2xpZW50Ly4veW91ci1leHRlbnNpb25zL3dpZGdldHMvc2VsZWN0b3ItaW1hZ2VuZXMtZHJvbmUvc3JjL3J1bnRpbWUvd2lkZ2V0LnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIi5kcm9uZS1zZWxlY3RvciB7XFxuICAtLXRlYWw6ICMwODdmODY7XFxuICAtLW5hdnk6ICMxODM5NGI7XFxuICAtLWxpbmU6ICNkY2U1ZTk7XFxuICAtLW11dGVkOiAjNzE4NzkzO1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGhlaWdodDogMTAwJTtcXG4gIG1pbi1oZWlnaHQ6IDM2MHB4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxuICBjb2xvcjogIzMzNGY1ZjtcXG4gIGJhY2tncm91bmQ6ICNmNmY4Zjk7XFxuICBmb250LWZhbWlseTogLWFwcGxlLXN5c3RlbSwgQmxpbmtNYWNTeXN0ZW1Gb250LCBcXFwiU2Vnb2UgVUlcXFwiLCBzYW5zLXNlcmlmOyB9XFxuICAuZHJvbmUtc2VsZWN0b3IgKiB7XFxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7IH1cXG4gIC5kcm9uZS1zZWxlY3RvciBoZWFkZXIge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBwYWRkaW5nOiAyMHB4IDIwcHggMTdweDtcXG4gICAgZmxleDogMCAwIGF1dG87XFxuICAgIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxuICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCB2YXIoLS1saW5lKTtcXG4gICAgYmFja2dyb3VuZDogI2ZmZjsgfVxcbiAgICAuZHJvbmUtc2VsZWN0b3IgaGVhZGVyIHNwYW4ge1xcbiAgICAgIGNvbG9yOiB2YXIoLS10ZWFsKTtcXG4gICAgICBmb250LXNpemU6IDlweDtcXG4gICAgICBmb250LXdlaWdodDogODAwO1xcbiAgICAgIGxldHRlci1zcGFjaW5nOiAuMTRlbTsgfVxcbiAgICAuZHJvbmUtc2VsZWN0b3IgaGVhZGVyIGgyIHtcXG4gICAgICBtYXJnaW46IDNweCAwIDFweDtcXG4gICAgICBjb2xvcjogdmFyKC0tbmF2eSk7XFxuICAgICAgZm9udC1zaXplOiAyMXB4O1xcbiAgICAgIGxpbmUtaGVpZ2h0OiAxLjE1OyB9XFxuICAgIC5kcm9uZS1zZWxlY3RvciBoZWFkZXIgcCB7XFxuICAgICAgbWFyZ2luOiAwO1xcbiAgICAgIGNvbG9yOiB2YXIoLS1tdXRlZCk7XFxuICAgICAgZm9udC1zaXplOiAxMHB4OyB9XFxuICAgIC5kcm9uZS1zZWxlY3RvciBoZWFkZXIgYnV0dG9uIHtcXG4gICAgICB3aWR0aDogMzRweDtcXG4gICAgICBoZWlnaHQ6IDM0cHg7XFxuICAgICAgYm9yZGVyOiAxcHggc29saWQgI2M4ZDZkYztcXG4gICAgICBib3JkZXItcmFkaXVzOiA3cHg7XFxuICAgICAgY29sb3I6IHZhcigtLXRlYWwpO1xcbiAgICAgIGJhY2tncm91bmQ6ICNmZmY7XFxuICAgICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICAgIGZvbnQtc2l6ZTogMTlweDsgfVxcbiAgICAuZHJvbmUtc2VsZWN0b3IgaGVhZGVyIGJ1dHRvbjpob3ZlciB7XFxuICAgICAgYm9yZGVyLWNvbG9yOiB2YXIoLS10ZWFsKTtcXG4gICAgICBiYWNrZ3JvdW5kOiAjZjBmYWZhOyB9XFxuICAuZHJvbmUtc2VsZWN0b3JfX3Rvb2xzIHtcXG4gICAgcGFkZGluZzogMTNweCAxNnB4IDEwcHg7XFxuICAgIGZsZXg6IDAgMCBhdXRvO1xcbiAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgdmFyKC0tbGluZSk7XFxuICAgIGJhY2tncm91bmQ6ICNmZmY7IH1cXG4gIC5kcm9uZS1zZWxlY3Rvcl9fdGFicyB7XFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxuICAgIG1pbi1oZWlnaHQ6IDQzcHg7XFxuICAgIGZsZXg6IDAgMCBhdXRvO1xcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmciAxZnI7XFxuICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCB2YXIoLS1saW5lKTtcXG4gICAgYmFja2dyb3VuZDogI2ZmZjsgfVxcbiAgICAuZHJvbmUtc2VsZWN0b3JfX3RhYnMgYnV0dG9uIHtcXG4gICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgICAgYm9yZGVyOiAwO1xcbiAgICAgIGNvbG9yOiAjNzE4NjkxO1xcbiAgICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xcbiAgICAgIGN1cnNvcjogcG9pbnRlcjtcXG4gICAgICBmb250LXNpemU6IDEwcHg7XFxuICAgICAgZm9udC13ZWlnaHQ6IDcwMDsgfVxcbiAgICAuZHJvbmUtc2VsZWN0b3JfX3RhYnMgYnV0dG9uOjphZnRlciB7XFxuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICAgIHJpZ2h0OiAxMnB4O1xcbiAgICAgIGJvdHRvbTogLTFweDtcXG4gICAgICBsZWZ0OiAxMnB4O1xcbiAgICAgIGhlaWdodDogM3B4O1xcbiAgICAgIGJvcmRlci1yYWRpdXM6IDNweCAzcHggMCAwO1xcbiAgICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xcbiAgICAgIGNvbnRlbnQ6IFxcXCJcXFwiOyB9XFxuICAgIC5kcm9uZS1zZWxlY3Rvcl9fdGFicyBidXR0b24uaXMtYWN0aXZlIHtcXG4gICAgICBjb2xvcjogdmFyKC0tdGVhbCk7IH1cXG4gICAgLmRyb25lLXNlbGVjdG9yX190YWJzIGJ1dHRvbi5pcy1hY3RpdmU6OmFmdGVyIHtcXG4gICAgICBiYWNrZ3JvdW5kOiB2YXIoLS10ZWFsKTsgfVxcbiAgICAuZHJvbmUtc2VsZWN0b3JfX3RhYnMgYiB7XFxuICAgICAgZGlzcGxheTogaW5saW5lLWdyaWQ7XFxuICAgICAgbWluLXdpZHRoOiAxOXB4O1xcbiAgICAgIGhlaWdodDogMTlweDtcXG4gICAgICBtYXJnaW4tbGVmdDogNHB4O1xcbiAgICAgIHBsYWNlLWl0ZW1zOiBjZW50ZXI7XFxuICAgICAgYm9yZGVyLXJhZGl1czogMTBweDtcXG4gICAgICBjb2xvcjogIzY4ODA4YjtcXG4gICAgICBiYWNrZ3JvdW5kOiAjZWRmM2Y1O1xcbiAgICAgIGZvbnQtc2l6ZTogOHB4OyB9XFxuICAuZHJvbmUtc2VsZWN0b3JfX3NlYXJjaCB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGhlaWdodDogMzhweDtcXG4gICAgcGFkZGluZzogMCAxMHB4O1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBnYXA6IDdweDtcXG4gICAgYm9yZGVyOiAxcHggc29saWQgI2JkY2RkNDtcXG4gICAgYm9yZGVyLXJhZGl1czogN3B4O1xcbiAgICBiYWNrZ3JvdW5kOiAjZmZmOyB9XFxuICAgIC5kcm9uZS1zZWxlY3Rvcl9fc2VhcmNoIHNwYW4ge1xcbiAgICAgIGNvbG9yOiAjNjk4MThkO1xcbiAgICAgIGZvbnQtc2l6ZTogMTlweDsgfVxcbiAgICAuZHJvbmUtc2VsZWN0b3JfX3NlYXJjaCBpbnB1dCB7XFxuICAgICAgbWluLXdpZHRoOiAwO1xcbiAgICAgIGhlaWdodDogMTAwJTtcXG4gICAgICBmbGV4OiAxO1xcbiAgICAgIGJvcmRlcjogMDtcXG4gICAgICBvdXRsaW5lOiAwO1xcbiAgICAgIGNvbG9yOiAjMjk0NzU3O1xcbiAgICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xcbiAgICAgIGZvbnQtc2l6ZTogMTJweDsgfVxcbiAgICAuZHJvbmUtc2VsZWN0b3JfX3NlYXJjaCBidXR0b24ge1xcbiAgICAgIGJvcmRlcjogMDtcXG4gICAgICBjb2xvcjogIzdhOGQ5NztcXG4gICAgICBiYWNrZ3JvdW5kOiBub25lO1xcbiAgICAgIGN1cnNvcjogcG9pbnRlcjtcXG4gICAgICBmb250LXNpemU6IDE4cHg7IH1cXG4gICAgLmRyb25lLXNlbGVjdG9yX19zZWFyY2g6Zm9jdXMtd2l0aGluIHtcXG4gICAgICBib3JkZXItY29sb3I6IHZhcigtLXRlYWwpO1xcbiAgICAgIGJveC1zaGFkb3c6IDAgMCAwIDNweCByZ2JhKDgsIDEyNywgMTM0LCAwLjEpOyB9XFxuICAuZHJvbmUtc2VsZWN0b3JfX2ZpbHRlcnMge1xcbiAgICBkaXNwbGF5OiBncmlkO1xcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmciAxZnIgMS4wNWZyO1xcbiAgICBnYXA6IDZweDtcXG4gICAgbWFyZ2luLXRvcDogOHB4OyB9XFxuICAgIC5kcm9uZS1zZWxlY3Rvcl9fZmlsdGVycyBzZWxlY3Qge1xcbiAgICAgIG1pbi13aWR0aDogMDtcXG4gICAgICBoZWlnaHQ6IDMycHg7XFxuICAgICAgcGFkZGluZzogMCA1cHg7XFxuICAgICAgYm9yZGVyOiAxcHggc29saWQgI2NjZDlkZTtcXG4gICAgICBib3JkZXItcmFkaXVzOiA1cHg7XFxuICAgICAgY29sb3I6ICM0OTY1NzM7XFxuICAgICAgYmFja2dyb3VuZDogI2ZiZmNmYztcXG4gICAgICBmb250LXNpemU6IDlweDsgfVxcbiAgLmRyb25lLXNlbGVjdG9yX19zdW1tYXJ5IHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgbWluLWhlaWdodDogMjZweDtcXG4gICAgcGFkZGluZy10b3A6IDlweDtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgZ2FwOiAxMnB4O1xcbiAgICBjb2xvcjogIzc4OGQ5NztcXG4gICAgZm9udC1zaXplOiA5cHg7IH1cXG4gICAgLmRyb25lLXNlbGVjdG9yX19zdW1tYXJ5IHN0cm9uZyB7XFxuICAgICAgY29sb3I6IHZhcigtLW5hdnkpO1xcbiAgICAgIGZvbnQtc2l6ZTogMTJweDsgfVxcbiAgICAuZHJvbmUtc2VsZWN0b3JfX3N1bW1hcnkgYiB7XFxuICAgICAgY29sb3I6IHZhcigtLXRlYWwpOyB9XFxuICAgIC5kcm9uZS1zZWxlY3Rvcl9fc3VtbWFyeSBidXR0b24ge1xcbiAgICAgIG1hcmdpbi1sZWZ0OiBhdXRvO1xcbiAgICAgIHBhZGRpbmc6IDA7XFxuICAgICAgYm9yZGVyOiAwO1xcbiAgICAgIGNvbG9yOiB2YXIoLS10ZWFsKTtcXG4gICAgICBiYWNrZ3JvdW5kOiBub25lO1xcbiAgICAgIGN1cnNvcjogcG9pbnRlcjtcXG4gICAgICBmb250LXNpemU6IDlweDtcXG4gICAgICBmb250LXdlaWdodDogNzAwOyB9XFxuICAuZHJvbmUtc2VsZWN0b3JfX2FuYWx5c2lzIHtcXG4gICAgZmxleDogMCAwIGF1dG87XFxuICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCB2YXIoLS1saW5lKTtcXG4gICAgYmFja2dyb3VuZDogI2YwZjVmNjsgfVxcbiAgLmRyb25lLXNlbGVjdG9yX19hbmFseXNpcy10b2dnbGUge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgbWluLWhlaWdodDogMzRweDtcXG4gICAgcGFkZGluZzogMCAxNnB4O1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxuICAgIGJvcmRlcjogMDtcXG4gICAgY29sb3I6ICM0MTYxNmU7XFxuICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxuICAgIGZvbnQtc2l6ZTogMTBweDtcXG4gICAgZm9udC13ZWlnaHQ6IDcwMDsgfVxcbiAgLmRyb25lLXNlbGVjdG9yX19hbmFseXNpcy1ib2R5IHtcXG4gICAgcGFkZGluZzogMCAxNnB4IDEycHg7IH1cXG4gICAgLmRyb25lLXNlbGVjdG9yX19hbmFseXNpcy1ib2R5ID4gcCB7XFxuICAgICAgbWFyZ2luOiA4cHggMCAwO1xcbiAgICAgIGNvbG9yOiAjNzY4YTk0O1xcbiAgICAgIGZvbnQtc2l6ZTogOXB4OyB9XFxuICAuZHJvbmUtc2VsZWN0b3JfX2twaXMge1xcbiAgICBkaXNwbGF5OiBncmlkO1xcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgzLCAxZnIpO1xcbiAgICBnYXA6IDZweDsgfVxcbiAgICAuZHJvbmUtc2VsZWN0b3JfX2twaXMgZGl2IHtcXG4gICAgICBwYWRkaW5nOiA4cHg7XFxuICAgICAgYm9yZGVyOiAxcHggc29saWQgI2Q5ZTVlODtcXG4gICAgICBib3JkZXItcmFkaXVzOiA2cHg7XFxuICAgICAgYmFja2dyb3VuZDogI2ZmZjtcXG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7IH1cXG4gICAgLmRyb25lLXNlbGVjdG9yX19rcGlzIHN0cm9uZywgLmRyb25lLXNlbGVjdG9yX19rcGlzIHNwYW4ge1xcbiAgICAgIGRpc3BsYXk6IGJsb2NrOyB9XFxuICAgIC5kcm9uZS1zZWxlY3Rvcl9fa3BpcyBzdHJvbmcge1xcbiAgICAgIGNvbG9yOiB2YXIoLS10ZWFsKTtcXG4gICAgICBmb250LXNpemU6IDE2cHg7IH1cXG4gICAgLmRyb25lLXNlbGVjdG9yX19rcGlzIHNwYW4ge1xcbiAgICAgIGNvbG9yOiAjODI5NDljO1xcbiAgICAgIGZvbnQtc2l6ZTogOHB4O1xcbiAgICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7IH1cXG4gIC5kcm9uZS1zZWxlY3Rvcl9fY29tcGFyZSB7XFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogbWlubWF4KDAsIDFmcikgOTBweCBtaW5tYXgoMCwgMWZyKTtcXG4gICAgbWFyZ2luLXRvcDogOXB4O1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBnYXA6IDZweDsgfVxcbiAgICAuZHJvbmUtc2VsZWN0b3JfX2NvbXBhcmUgc3BhbiB7XFxuICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gICAgICBjb2xvcjogIzQwNWY2YztcXG4gICAgICBmb250LXNpemU6IDhweDtcXG4gICAgICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcXG4gICAgICB3aGl0ZS1zcGFjZTogbm93cmFwOyB9XFxuICAgIC5kcm9uZS1zZWxlY3Rvcl9fY29tcGFyZSBzcGFuOmxhc3QtY2hpbGQge1xcbiAgICAgIHRleHQtYWxpZ246IHJpZ2h0OyB9XFxuICAgIC5kcm9uZS1zZWxlY3Rvcl9fY29tcGFyZSBpbnB1dCB7XFxuICAgICAgd2lkdGg6IDEwMCU7XFxuICAgICAgYWNjZW50LWNvbG9yOiB2YXIoLS10ZWFsKTsgfVxcbiAgLmRyb25lLXNlbGVjdG9yX19zd2lwZS1jb250cm9scyB7XFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyIDFmcjtcXG4gICAgbWFyZ2luLXRvcDogOXB4O1xcbiAgICBnYXA6IDZweDsgfVxcbiAgICAuZHJvbmUtc2VsZWN0b3JfX3N3aXBlLWNvbnRyb2xzIHNwYW4ge1xcbiAgICAgIHBhZGRpbmc6IDZweDtcXG4gICAgICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgICAgIGJvcmRlci1yYWRpdXM6IDVweDtcXG4gICAgICBjb2xvcjogIzQwNWY2YztcXG4gICAgICBiYWNrZ3JvdW5kOiAjZmZmO1xcbiAgICAgIGZvbnQtc2l6ZTogOHB4O1xcbiAgICAgIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xcbiAgICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7IH1cXG4gICAgLmRyb25lLXNlbGVjdG9yX19zd2lwZS1jb250cm9scyBidXR0b24ge1xcbiAgICAgIGdyaWQtY29sdW1uOiAxIC8gLTE7XFxuICAgICAgbWluLWhlaWdodDogMzFweDtcXG4gICAgICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS10ZWFsKTtcXG4gICAgICBib3JkZXItcmFkaXVzOiA1cHg7XFxuICAgICAgY29sb3I6ICNmZmY7XFxuICAgICAgYmFja2dyb3VuZDogdmFyKC0tdGVhbCk7XFxuICAgICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICAgIGZvbnQtc2l6ZTogMTBweDtcXG4gICAgICBmb250LXdlaWdodDogNzAwOyB9XFxuICAuZHJvbmUtc2VsZWN0b3JfX2lubGluZS1lcnJvciB7XFxuICAgIG1hcmdpbi10b3A6IDhweDtcXG4gICAgcGFkZGluZzogN3B4O1xcbiAgICBib3JkZXItcmFkaXVzOiA1cHg7XFxuICAgIGNvbG9yOiAjOGQzNzM3O1xcbiAgICBiYWNrZ3JvdW5kOiAjZmZmMGYwO1xcbiAgICBmb250LXNpemU6IDlweDsgfVxcbiAgLmRyb25lLXNlbGVjdG9yX19saXN0IHtcXG4gICAgbWluLWhlaWdodDogMDtcXG4gICAgZmxleDogMSAxIGF1dG87XFxuICAgIG92ZXJmbG93OiBhdXRvO1xcbiAgICBiYWNrZ3JvdW5kOiAjZmZmOyB9XFxuICAuZHJvbmUtc2VsZWN0b3IgYXJ0aWNsZSB7XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgZGlzcGxheTogZ3JpZDtcXG4gICAgbWluLWhlaWdodDogNzJweDtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAzNXB4IG1pbm1heCgwLCAxZnIpIGF1dG87XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZTJlOWVjO1xcbiAgICBiYWNrZ3JvdW5kOiAjZmZmO1xcbiAgICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kIC4xNXMsIGJveC1zaGFkb3cgLjE1czsgfVxcbiAgICAuZHJvbmUtc2VsZWN0b3IgYXJ0aWNsZTo6YmVmb3JlIHtcXG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgICAgdG9wOiAwO1xcbiAgICAgIGJvdHRvbTogMDtcXG4gICAgICBsZWZ0OiAwO1xcbiAgICAgIHdpZHRoOiA0cHg7XFxuICAgICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XFxuICAgICAgY29udGVudDogXFxcIlxcXCI7IH1cXG4gICAgLmRyb25lLXNlbGVjdG9yIGFydGljbGU6aG92ZXIge1xcbiAgICAgIGJhY2tncm91bmQ6ICNmN2ZhZmI7IH1cXG4gICAgLmRyb25lLXNlbGVjdG9yIGFydGljbGUuaXMtdmlzaWJsZSB7XFxuICAgICAgYmFja2dyb3VuZDogI2VkZjhmODsgfVxcbiAgICAgIC5kcm9uZS1zZWxlY3RvciBhcnRpY2xlLmlzLXZpc2libGU6OmJlZm9yZSB7XFxuICAgICAgICBiYWNrZ3JvdW5kOiB2YXIoLS10ZWFsKTsgfVxcbiAgICAuZHJvbmUtc2VsZWN0b3IgYXJ0aWNsZS5pcy1jb21wYXJpbmcge1xcbiAgICAgIGJveC1zaGFkb3c6IGluc2V0IDAgMCAwIDFweCAjZTdhOTNkOyB9XFxuICAuZHJvbmUtc2VsZWN0b3JfX2V5ZSB7XFxuICAgIHdpZHRoOiAzMHB4O1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxuICAgIGJvcmRlcjogMDtcXG4gICAgY29sb3I6ICM5MmE0YWM7XFxuICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxuICAgIGZvbnQtc2l6ZTogMTZweDsgfVxcbiAgLmlzLXZpc2libGUgLmRyb25lLXNlbGVjdG9yX19leWUge1xcbiAgICBjb2xvcjogdmFyKC0tdGVhbCk7IH1cXG4gIC5kcm9uZS1zZWxlY3Rvcl9fZmxpZ2h0IHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgbWluLXdpZHRoOiAwO1xcbiAgICBwYWRkaW5nOiAxMHB4IDNweDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XFxuICAgIGJvcmRlcjogMDtcXG4gICAgY29sb3I6IGluaGVyaXQ7XFxuICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxuICAgIHRleHQtYWxpZ246IGxlZnQ7IH1cXG4gICAgLmRyb25lLXNlbGVjdG9yX19mbGlnaHQgc3Ryb25nIHtcXG4gICAgICB3aWR0aDogMTAwJTtcXG4gICAgICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgICAgIGNvbG9yOiAjMjk0OTU4O1xcbiAgICAgIGZvbnQtc2l6ZTogMTJweDtcXG4gICAgICBsaW5lLWhlaWdodDogMS4yNTtcXG4gICAgICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcXG4gICAgICB3aGl0ZS1zcGFjZTogbm93cmFwOyB9XFxuICAgIC5kcm9uZS1zZWxlY3Rvcl9fZmxpZ2h0IHNtYWxsIHtcXG4gICAgICB3aWR0aDogMTAwJTtcXG4gICAgICBtYXJnaW4tdG9wOiAzcHg7XFxuICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gICAgICBjb2xvcjogIzg0OTY5ZjtcXG4gICAgICBmb250LXNpemU6IDhweDtcXG4gICAgICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcXG4gICAgICB3aGl0ZS1zcGFjZTogbm93cmFwOyB9XFxuICAuZHJvbmUtc2VsZWN0b3JfX2RhdGUge1xcbiAgICBtYXJnaW4tYm90dG9tOiAzcHg7XFxuICAgIGNvbG9yOiB2YXIoLS10ZWFsKTtcXG4gICAgZm9udC1zaXplOiA4cHg7XFxuICAgIGZvbnQtd2VpZ2h0OiA3NTA7XFxuICAgIGxldHRlci1zcGFjaW5nOiAuMDZlbTsgfVxcbiAgLmRyb25lLXNlbGVjdG9yX19hY3Rpb25zIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgcGFkZGluZy1yaWdodDogOHB4O1xcbiAgICBnYXA6IDJweDsgfVxcbiAgICAuZHJvbmUtc2VsZWN0b3JfX2FjdGlvbnMgYnV0dG9uIHtcXG4gICAgICBkaXNwbGF5OiBncmlkO1xcbiAgICAgIHdpZHRoOiAyN3B4O1xcbiAgICAgIGhlaWdodDogMjdweDtcXG4gICAgICBwbGFjZS1pdGVtczogY2VudGVyO1xcbiAgICAgIGJvcmRlcjogMDtcXG4gICAgICBib3JkZXItcmFkaXVzOiA1cHg7XFxuICAgICAgY29sb3I6ICM2Zjg1OGY7XFxuICAgICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XFxuICAgICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICAgIGZvbnQtc2l6ZTogMTNweDsgfVxcbiAgICAuZHJvbmUtc2VsZWN0b3JfX2FjdGlvbnMgYnV0dG9uOmhvdmVyLCAuZHJvbmUtc2VsZWN0b3JfX2FjdGlvbnMgYnV0dG9uLmlzLWFjdGl2ZSB7XFxuICAgICAgY29sb3I6IHZhcigtLXRlYWwpO1xcbiAgICAgIGJhY2tncm91bmQ6ICNkZmYxZjE7IH1cXG4gICAgLmRyb25lLXNlbGVjdG9yX19hY3Rpb25zIGJ1dHRvbi5pcy1hY3RpdmUge1xcbiAgICAgIGNvbG9yOiAjYTc2YjAwO1xcbiAgICAgIGJhY2tncm91bmQ6ICNmZmYxZDg7IH1cXG4gIC5kcm9uZS1zZWxlY3Rvcl9fb3BhY2l0eSB7XFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxuICAgIG1pbi1oZWlnaHQ6IDM4cHg7XFxuICAgIHBhZGRpbmc6IDVweCAxMnB4IDhweCAzOXB4O1xcbiAgICBncmlkLWNvbHVtbjogMSAvIC0xO1xcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDc2cHggMWZyIDM0cHg7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGdhcDogOHB4O1xcbiAgICBjb2xvcjogIzZlODM4ZTtcXG4gICAgYmFja2dyb3VuZDogI2Y0ZjhmOTtcXG4gICAgZm9udC1zaXplOiA4cHg7IH1cXG4gICAgLmRyb25lLXNlbGVjdG9yX19vcGFjaXR5IGlucHV0IHtcXG4gICAgICB3aWR0aDogMTAwJTtcXG4gICAgICBhY2NlbnQtY29sb3I6IHZhcigtLXRlYWwpOyB9XFxuICAgIC5kcm9uZS1zZWxlY3Rvcl9fb3BhY2l0eSBiIHtcXG4gICAgICBjb2xvcjogdmFyKC0tdGVhbCk7XFxuICAgICAgdGV4dC1hbGlnbjogcmlnaHQ7IH1cXG4gIC5kcm9uZS1zZWxlY3Rvcl9fdmVjdG9yLWhlbHAge1xcbiAgICBwYWRkaW5nOiAxMXB4IDE2cHg7XFxuICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCB2YXIoLS1saW5lKTtcXG4gICAgY29sb3I6ICM3MTg2OTE7XFxuICAgIGJhY2tncm91bmQ6ICNmNWY4Zjk7XFxuICAgIGZvbnQtc2l6ZTogOXB4O1xcbiAgICBsaW5lLWhlaWdodDogMS40OyB9XFxuICAuZHJvbmUtc2VsZWN0b3JfX3ZlY3Rvci1saXN0IGFydGljbGUge1xcbiAgICBtaW4taGVpZ2h0OiA2MXB4OyB9XFxuICAuZHJvbmUtc2VsZWN0b3JfX2VtcHR5LCAuZHJvbmUtc2VsZWN0b3JfX25vLXJlc3VsdHMge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBwYWRkaW5nOiA0NXB4IDI1cHg7XFxuICAgIGZsZXg6IDE7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICBjb2xvcjogIzdjOTA5OTtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyOyB9XFxuICAgIC5kcm9uZS1zZWxlY3Rvcl9fZW1wdHkgaSwgLmRyb25lLXNlbGVjdG9yX19uby1yZXN1bHRzIGkge1xcbiAgICAgIGNvbG9yOiB2YXIoLS10ZWFsKTtcXG4gICAgICBmb250LXNpemU6IDMwcHg7XFxuICAgICAgZm9udC1zdHlsZTogbm9ybWFsOyB9XFxuICAgIC5kcm9uZS1zZWxlY3Rvcl9fZW1wdHkgc3Ryb25nLCAuZHJvbmUtc2VsZWN0b3JfX25vLXJlc3VsdHMgc3Ryb25nIHtcXG4gICAgICBtYXJnaW4tdG9wOiA4cHg7XFxuICAgICAgY29sb3I6IHZhcigtLW5hdnkpO1xcbiAgICAgIGZvbnQtc2l6ZTogMTRweDsgfVxcbiAgICAuZHJvbmUtc2VsZWN0b3JfX2VtcHR5IHAsIC5kcm9uZS1zZWxlY3Rvcl9fbm8tcmVzdWx0cyBwIHtcXG4gICAgICBtYXgtd2lkdGg6IDI2MHB4O1xcbiAgICAgIG1hcmdpbjogNXB4IDAgMTNweDtcXG4gICAgICBmb250LXNpemU6IDEwcHg7IH1cXG4gICAgLmRyb25lLXNlbGVjdG9yX19lbXB0eSBidXR0b24sIC5kcm9uZS1zZWxlY3Rvcl9fbm8tcmVzdWx0cyBidXR0b24ge1xcbiAgICAgIHBhZGRpbmc6IDdweCAxMXB4O1xcbiAgICAgIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLXRlYWwpO1xcbiAgICAgIGJvcmRlci1yYWRpdXM6IDVweDtcXG4gICAgICBjb2xvcjogdmFyKC0tdGVhbCk7XFxuICAgICAgYmFja2dyb3VuZDogI2ZmZjtcXG4gICAgICBjdXJzb3I6IHBvaW50ZXI7XFxuICAgICAgZm9udC1zaXplOiAxMHB4OyB9XFxuICAuZHJvbmUtc2VsZWN0b3JfX2FsZXJ0IHtcXG4gICAgbWFyZ2luOiAxNnB4O1xcbiAgICBwYWRkaW5nOiAxNHB4O1xcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjZTdiNmI2O1xcbiAgICBib3JkZXItcmFkaXVzOiA3cHg7XFxuICAgIGNvbG9yOiAjOGIzZDNkO1xcbiAgICBiYWNrZ3JvdW5kOiAjZmZmNGY0OyB9XFxuICAgIC5kcm9uZS1zZWxlY3Rvcl9fYWxlcnQgc3Ryb25nLCAuZHJvbmUtc2VsZWN0b3JfX2FsZXJ0IHNwYW4ge1xcbiAgICAgIGRpc3BsYXk6IGJsb2NrOyB9XFxuICAgIC5kcm9uZS1zZWxlY3Rvcl9fYWxlcnQgc3Ryb25nIHtcXG4gICAgICBmb250LXNpemU6IDEycHg7IH1cXG4gICAgLmRyb25lLXNlbGVjdG9yX19hbGVydCBzcGFuIHtcXG4gICAgICBtYXJnaW4tdG9wOiAzcHg7XFxuICAgICAgZm9udC1zaXplOiAxMHB4OyB9XFxuICAgIC5kcm9uZS1zZWxlY3Rvcl9fYWxlcnQgYnV0dG9uIHtcXG4gICAgICBtYXJnaW4tdG9wOiA5cHg7XFxuICAgICAgYm9yZGVyOiAwO1xcbiAgICAgIGNvbG9yOiAjOGIzZDNkO1xcbiAgICAgIGJhY2tncm91bmQ6IG5vbmU7XFxuICAgICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICAgIGZvbnQtc2l6ZTogMTBweDtcXG4gICAgICBmb250LXdlaWdodDogNzAwOyB9XFxuICAuZHJvbmUtc2VsZWN0b3JfX2xvYWRpbmcge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHotaW5kZXg6IDU7XFxuICAgIHJpZ2h0OiAxMnB4O1xcbiAgICBib3R0b206IDMxcHg7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIHBhZGRpbmc6IDdweCAxMHB4O1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBnYXA6IDdweDtcXG4gICAgYm9yZGVyOiAxcHggc29saWQgI2M5ZGFkZDtcXG4gICAgYm9yZGVyLXJhZGl1czogMjBweDtcXG4gICAgY29sb3I6ICM1MDZjNzg7XFxuICAgIGJhY2tncm91bmQ6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC45NSk7XFxuICAgIGJveC1zaGFkb3c6IDAgNHB4IDEycHggcmdiYSgzMCwgNjAsIDcwLCAwLjEyKTtcXG4gICAgZm9udC1zaXplOiA5cHg7IH1cXG4gICAgLmRyb25lLXNlbGVjdG9yX19sb2FkaW5nIGkge1xcbiAgICAgIHdpZHRoOiAxMnB4O1xcbiAgICAgIGhlaWdodDogMTJweDtcXG4gICAgICBib3JkZXI6IDJweCBzb2xpZCAjYzZkZGRkO1xcbiAgICAgIGJvcmRlci10b3AtY29sb3I6IHZhcigtLXRlYWwpO1xcbiAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcXG4gICAgICBhbmltYXRpb246IGRyb25lLXNwaW4gLjc1cyBsaW5lYXIgaW5maW5pdGU7IH1cXG4gIC5kcm9uZS1zZWxlY3RvciBmb290ZXIge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBtaW4taGVpZ2h0OiAyOHB4O1xcbiAgICBwYWRkaW5nOiAwIDE2cHg7XFxuICAgIGZsZXg6IDAgMCBhdXRvO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBnYXA6IDZweDtcXG4gICAgYm9yZGVyLXRvcDogMXB4IHNvbGlkIHZhcigtLWxpbmUpO1xcbiAgICBjb2xvcjogIzgyOTQ5YztcXG4gICAgYmFja2dyb3VuZDogI2ZhZmNmYztcXG4gICAgZm9udC1zaXplOiA4cHg7IH1cXG4gICAgLmRyb25lLXNlbGVjdG9yIGZvb3RlciBzcGFuIHtcXG4gICAgICB3aWR0aDogNnB4O1xcbiAgICAgIGhlaWdodDogNnB4O1xcbiAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcXG4gICAgICBiYWNrZ3JvdW5kOiAjYjBiY2MxOyB9XFxuICAgIC5kcm9uZS1zZWxlY3RvciBmb290ZXIgc3Bhbi5pcy1yZWFkeSB7XFxuICAgICAgYmFja2dyb3VuZDogIzJhOWI3MztcXG4gICAgICBib3gtc2hhZG93OiAwIDAgMCAzcHggcmdiYSg0MiwgMTU1LCAxMTUsIDAuMTIpOyB9XFxuXFxuQGtleWZyYW1lcyBkcm9uZS1zcGluIHtcXG4gIHRvIHtcXG4gICAgdHJhbnNmb3JtOiByb3RhdGUoMzYwZGVnKTsgfSB9XFxuXFxuQG1lZGlhIChtYXgtd2lkdGg6IDM1MHB4KSB7XFxuICAuZHJvbmUtc2VsZWN0b3JfX2ZpbHRlcnMge1xcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmciAxZnI7IH1cXG4gICAgLmRyb25lLXNlbGVjdG9yX19maWx0ZXJzIHNlbGVjdDpsYXN0LWNoaWxkIHtcXG4gICAgICBncmlkLWNvbHVtbjogMSAvIC0xOyB9XFxuICAuZHJvbmUtc2VsZWN0b3JfX2FjdGlvbnMgYnV0dG9uOmZpcnN0LWNoaWxkIHtcXG4gICAgZGlzcGxheTogbm9uZTsgfSB9XFxuXCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4veW91ci1leHRlbnNpb25zL3dpZGdldHMvc2VsZWN0b3ItaW1hZ2VuZXMtZHJvbmUvc3JjL3J1bnRpbWUvc3R5bGUuc2Nzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtFQUNFLGVBQU87RUFBVSxlQUFPO0VBQVUsZUFBTztFQUFVLGdCQUFRO0VBQzNELGtCQUFrQjtFQUFFLGFBQWE7RUFBRSxZQUFZO0VBQUUsaUJBQWlCO0VBQUUsc0JBQXNCO0VBQUUsZ0JBQWdCO0VBQzVHLGNBQWM7RUFBRSxtQkFBbUI7RUFBRSxzRUFBc0UsRUFBQTtFQUg3RztJQUlNLHNCQUFzQixFQUFBO0VBSjVCO0lBS1csYUFBYTtJQUFFLHVCQUF1QjtJQUFFLGNBQWM7SUFBRSx1QkFBdUI7SUFBRSw4QkFBOEI7SUFBRSxvQ0FBb0M7SUFBRSxnQkFBZ0IsRUFBQTtJQUxsTDtNQU1XLGtCQUFrQjtNQUFFLGNBQWM7TUFBRSxnQkFBZ0I7TUFBRSxxQkFBcUIsRUFBQTtJQU50RjtNQU9TLGlCQUFpQjtNQUFFLGtCQUFrQjtNQUFFLGVBQWU7TUFB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LDZCQUE2QjtNQUFFLGtCQUFrQjtNQUFFLDBDQUEwQyxFQUFBO0VBNUYzSjtJQThGVyxhQUFhO0lBQUUsZ0JBQWdCO0lBQUUsZUFBZTtJQUFFLGNBQWM7SUFBRSxtQkFBbUI7SUFBRSxRQUFRO0lBQUUsaUNBQWlDO0lBQUUsY0FBYztJQUFFLG1CQUFtQjtJQUFFLGNBQWMsRUFBQTtJQTlGbE07TUErRlcsVUFBVTtNQUFFLFdBQVc7TUFBRSxrQkFBa0I7TUFBRSxtQkFBbUIsRUFBQTtJQS9GM0U7TUFnR29CLG1CQUFtQjtNQUFFLDhDQUEwQyxFQUFBOztBQUluRjtFQUF3QjtJQUFLLHlCQUF5QixFQUFBLEVBQUE7O0FBRXREO0VBQ0U7SUFBMkIsOEJBQThCLEVBQUE7SUFBekQ7TUFBK0UsbUJBQW1CLEVBQUE7RUFDbEc7SUFBOEMsYUFBYSxFQUFBLEVBQUlcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLmRyb25lLXNlbGVjdG9yIHtcXG4gIC0tdGVhbDogIzA4N2Y4NjsgLS1uYXZ5OiAjMTgzOTRiOyAtLWxpbmU6ICNkY2U1ZTk7IC0tbXV0ZWQ6ICM3MTg3OTM7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7IGRpc3BsYXk6IGZsZXg7IGhlaWdodDogMTAwJTsgbWluLWhlaWdodDogMzYwcHg7IGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47IG92ZXJmbG93OiBoaWRkZW47XFxuICBjb2xvcjogIzMzNGY1ZjsgYmFja2dyb3VuZDogI2Y2ZjhmOTsgZm9udC1mYW1pbHk6IC1hcHBsZS1zeXN0ZW0sIEJsaW5rTWFjU3lzdGVtRm9udCwgXFxcIlNlZ29lIFVJXFxcIiwgc2Fucy1zZXJpZjtcXG4gICogeyBib3gtc2l6aW5nOiBib3JkZXItYm94OyB9XFxuICBoZWFkZXIgeyBkaXNwbGF5OiBmbGV4OyBwYWRkaW5nOiAyMHB4IDIwcHggMTdweDsgZmxleDogMCAwIGF1dG87IGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0OyBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47IGJvcmRlci1ib3R0b206IDFweCBzb2xpZCB2YXIoLS1saW5lKTsgYmFja2dyb3VuZDogI2ZmZjtcXG4gICAgc3BhbiB7IGNvbG9yOiB2YXIoLS10ZWFsKTsgZm9udC1zaXplOiA5cHg7IGZvbnQtd2VpZ2h0OiA4MDA7IGxldHRlci1zcGFjaW5nOiAuMTRlbTsgfVxcbiAgICBoMiB7IG1hcmdpbjogM3B4IDAgMXB4OyBjb2xvcjogdmFyKC0tbmF2eSk7IGZvbnQtc2l6ZTogMjFweDsgbGluZS1oZWlnaHQ6IDEuMTU7IH1cXG4gICAgcCB7IG1hcmdpbjogMDsgY29sb3I6IHZhcigtLW11dGVkKTsgZm9udC1zaXplOiAxMHB4OyB9XFxuICAgIGJ1dHRvbiB7IHdpZHRoOiAzNHB4OyBoZWlnaHQ6IDM0cHg7IGJvcmRlcjogMXB4IHNvbGlkICNjOGQ2ZGM7IGJvcmRlci1yYWRpdXM6IDdweDsgY29sb3I6IHZhcigtLXRlYWwpOyBiYWNrZ3JvdW5kOiAjZmZmOyBjdXJzb3I6IHBvaW50ZXI7IGZvbnQtc2l6ZTogMTlweDsgfVxcbiAgICBidXR0b246aG92ZXIgeyBib3JkZXItY29sb3I6IHZhcigtLXRlYWwpOyBiYWNrZ3JvdW5kOiAjZjBmYWZhOyB9XFxuICB9XFxuICAmX190b29scyB7IHBhZGRpbmc6IDEzcHggMTZweCAxMHB4OyBmbGV4OiAwIDAgYXV0bzsgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIHZhcigtLWxpbmUpOyBiYWNrZ3JvdW5kOiAjZmZmOyB9XFxuICAmX190YWJzIHsgZGlzcGxheTogZ3JpZDsgbWluLWhlaWdodDogNDNweDsgZmxleDogMCAwIGF1dG87IGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyIDFmcjsgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIHZhcigtLWxpbmUpOyBiYWNrZ3JvdW5kOiAjZmZmO1xcbiAgICBidXR0b24geyBwb3NpdGlvbjogcmVsYXRpdmU7IGJvcmRlcjogMDsgY29sb3I6ICM3MTg2OTE7IGJhY2tncm91bmQ6IHRyYW5zcGFyZW50OyBjdXJzb3I6IHBvaW50ZXI7IGZvbnQtc2l6ZTogMTBweDsgZm9udC13ZWlnaHQ6IDcwMDsgfVxcbiAgICBidXR0b246OmFmdGVyIHsgcG9zaXRpb246IGFic29sdXRlOyByaWdodDogMTJweDsgYm90dG9tOiAtMXB4OyBsZWZ0OiAxMnB4OyBoZWlnaHQ6IDNweDsgYm9yZGVyLXJhZGl1czogM3B4IDNweCAwIDA7IGJhY2tncm91bmQ6IHRyYW5zcGFyZW50OyBjb250ZW50OiBcXFwiXFxcIjsgfVxcbiAgICBidXR0b24uaXMtYWN0aXZlIHsgY29sb3I6IHZhcigtLXRlYWwpOyB9XFxuICAgIGJ1dHRvbi5pcy1hY3RpdmU6OmFmdGVyIHsgYmFja2dyb3VuZDogdmFyKC0tdGVhbCk7IH1cXG4gICAgYiB7IGRpc3BsYXk6IGlubGluZS1ncmlkOyBtaW4td2lkdGg6IDE5cHg7IGhlaWdodDogMTlweDsgbWFyZ2luLWxlZnQ6IDRweDsgcGxhY2UtaXRlbXM6IGNlbnRlcjsgYm9yZGVyLXJhZGl1czogMTBweDsgY29sb3I6ICM2ODgwOGI7IGJhY2tncm91bmQ6ICNlZGYzZjU7IGZvbnQtc2l6ZTogOHB4OyB9XFxuICB9XFxuICAmX19zZWFyY2ggeyBkaXNwbGF5OiBmbGV4OyBoZWlnaHQ6IDM4cHg7IHBhZGRpbmc6IDAgMTBweDsgYWxpZ24taXRlbXM6IGNlbnRlcjsgZ2FwOiA3cHg7IGJvcmRlcjogMXB4IHNvbGlkICNiZGNkZDQ7IGJvcmRlci1yYWRpdXM6IDdweDsgYmFja2dyb3VuZDogI2ZmZjtcXG4gICAgc3BhbiB7IGNvbG9yOiAjNjk4MThkOyBmb250LXNpemU6IDE5cHg7IH1cXG4gICAgaW5wdXQgeyBtaW4td2lkdGg6IDA7IGhlaWdodDogMTAwJTsgZmxleDogMTsgYm9yZGVyOiAwOyBvdXRsaW5lOiAwOyBjb2xvcjogIzI5NDc1NzsgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7IGZvbnQtc2l6ZTogMTJweDsgfVxcbiAgICBidXR0b24geyBib3JkZXI6IDA7IGNvbG9yOiAjN2E4ZDk3OyBiYWNrZ3JvdW5kOiBub25lOyBjdXJzb3I6IHBvaW50ZXI7IGZvbnQtc2l6ZTogMThweDsgfVxcbiAgICAmOmZvY3VzLXdpdGhpbiB7IGJvcmRlci1jb2xvcjogdmFyKC0tdGVhbCk7IGJveC1zaGFkb3c6IDAgMCAwIDNweCByZ2JhKDgsMTI3LDEzNCwuMSk7IH1cXG4gIH1cXG4gICZfX2ZpbHRlcnMgeyBkaXNwbGF5OiBncmlkOyBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmciAxZnIgMS4wNWZyOyBnYXA6IDZweDsgbWFyZ2luLXRvcDogOHB4O1xcbiAgICBzZWxlY3QgeyBtaW4td2lkdGg6IDA7IGhlaWdodDogMzJweDsgcGFkZGluZzogMCA1cHg7IGJvcmRlcjogMXB4IHNvbGlkICNjY2Q5ZGU7IGJvcmRlci1yYWRpdXM6IDVweDsgY29sb3I6ICM0OTY1NzM7IGJhY2tncm91bmQ6ICNmYmZjZmM7IGZvbnQtc2l6ZTogOXB4OyB9XFxuICB9XFxuICAmX19zdW1tYXJ5IHsgZGlzcGxheTogZmxleDsgbWluLWhlaWdodDogMjZweDsgcGFkZGluZy10b3A6IDlweDsgYWxpZ24taXRlbXM6IGNlbnRlcjsgZ2FwOiAxMnB4OyBjb2xvcjogIzc4OGQ5NzsgZm9udC1zaXplOiA5cHg7XFxuICAgIHN0cm9uZyB7IGNvbG9yOiB2YXIoLS1uYXZ5KTsgZm9udC1zaXplOiAxMnB4OyB9XFxuICAgIGIgeyBjb2xvcjogdmFyKC0tdGVhbCk7IH1cXG4gICAgYnV0dG9uIHsgbWFyZ2luLWxlZnQ6IGF1dG87IHBhZGRpbmc6IDA7IGJvcmRlcjogMDsgY29sb3I6IHZhcigtLXRlYWwpOyBiYWNrZ3JvdW5kOiBub25lOyBjdXJzb3I6IHBvaW50ZXI7IGZvbnQtc2l6ZTogOXB4OyBmb250LXdlaWdodDogNzAwOyB9XFxuICB9XFxuICAmX19hbmFseXNpcyB7IGZsZXg6IDAgMCBhdXRvOyBib3JkZXItYm90dG9tOiAxcHggc29saWQgdmFyKC0tbGluZSk7IGJhY2tncm91bmQ6ICNmMGY1ZjY7IH1cXG4gICZfX2FuYWx5c2lzLXRvZ2dsZSB7IGRpc3BsYXk6IGZsZXg7IHdpZHRoOiAxMDAlOyBtaW4taGVpZ2h0OiAzNHB4OyBwYWRkaW5nOiAwIDE2cHg7IGFsaWduLWl0ZW1zOiBjZW50ZXI7IGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjsgYm9yZGVyOiAwOyBjb2xvcjogIzQxNjE2ZTsgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7IGN1cnNvcjogcG9pbnRlcjsgZm9udC1zaXplOiAxMHB4OyBmb250LXdlaWdodDogNzAwOyB9XFxuICAmX19hbmFseXNpcy1ib2R5IHsgcGFkZGluZzogMCAxNnB4IDEycHg7XFxuICAgID4gcCB7IG1hcmdpbjogOHB4IDAgMDsgY29sb3I6ICM3NjhhOTQ7IGZvbnQtc2l6ZTogOXB4OyB9XFxuICB9XFxuICAmX19rcGlzIHsgZGlzcGxheTogZ3JpZDsgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMywgMWZyKTsgZ2FwOiA2cHg7XFxuICAgIGRpdiB7IHBhZGRpbmc6IDhweDsgYm9yZGVyOiAxcHggc29saWQgI2Q5ZTVlODsgYm9yZGVyLXJhZGl1czogNnB4OyBiYWNrZ3JvdW5kOiAjZmZmOyB0ZXh0LWFsaWduOiBjZW50ZXI7IH1cXG4gICAgc3Ryb25nLCBzcGFuIHsgZGlzcGxheTogYmxvY2s7IH1cXG4gICAgc3Ryb25nIHsgY29sb3I6IHZhcigtLXRlYWwpOyBmb250LXNpemU6IDE2cHg7IH1cXG4gICAgc3BhbiB7IGNvbG9yOiAjODI5NDljOyBmb250LXNpemU6IDhweDsgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTsgfVxcbiAgfVxcbiAgJl9fY29tcGFyZSB7IGRpc3BsYXk6IGdyaWQ7IGdyaWQtdGVtcGxhdGUtY29sdW1uczogbWlubWF4KDAsMWZyKSA5MHB4IG1pbm1heCgwLDFmcik7IG1hcmdpbi10b3A6IDlweDsgYWxpZ24taXRlbXM6IGNlbnRlcjsgZ2FwOiA2cHg7XFxuICAgIHNwYW4geyBvdmVyZmxvdzogaGlkZGVuOyBjb2xvcjogIzQwNWY2YzsgZm9udC1zaXplOiA4cHg7IHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzOyB3aGl0ZS1zcGFjZTogbm93cmFwOyB9XFxuICAgIHNwYW46bGFzdC1jaGlsZCB7IHRleHQtYWxpZ246IHJpZ2h0OyB9XFxuICAgIGlucHV0IHsgd2lkdGg6IDEwMCU7IGFjY2VudC1jb2xvcjogdmFyKC0tdGVhbCk7IH1cXG4gIH1cXG4gICZfX3N3aXBlLWNvbnRyb2xzIHsgZGlzcGxheTogZ3JpZDsgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgMWZyOyBtYXJnaW4tdG9wOiA5cHg7IGdhcDogNnB4O1xcbiAgICBzcGFuIHsgcGFkZGluZzogNnB4OyBvdmVyZmxvdzogaGlkZGVuOyBib3JkZXItcmFkaXVzOiA1cHg7IGNvbG9yOiAjNDA1ZjZjOyBiYWNrZ3JvdW5kOiAjZmZmOyBmb250LXNpemU6IDhweDsgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7IHdoaXRlLXNwYWNlOiBub3dyYXA7IH1cXG4gICAgYnV0dG9uIHsgZ3JpZC1jb2x1bW46IDEgLyAtMTsgbWluLWhlaWdodDogMzFweDsgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tdGVhbCk7IGJvcmRlci1yYWRpdXM6IDVweDsgY29sb3I6ICNmZmY7IGJhY2tncm91bmQ6IHZhcigtLXRlYWwpOyBjdXJzb3I6IHBvaW50ZXI7IGZvbnQtc2l6ZTogMTBweDsgZm9udC13ZWlnaHQ6IDcwMDsgfVxcbiAgfVxcbiAgJl9faW5saW5lLWVycm9yIHsgbWFyZ2luLXRvcDogOHB4OyBwYWRkaW5nOiA3cHg7IGJvcmRlci1yYWRpdXM6IDVweDsgY29sb3I6ICM4ZDM3Mzc7IGJhY2tncm91bmQ6ICNmZmYwZjA7IGZvbnQtc2l6ZTogOXB4OyB9XFxuICAmX19saXN0IHsgbWluLWhlaWdodDogMDsgZmxleDogMSAxIGF1dG87IG92ZXJmbG93OiBhdXRvOyBiYWNrZ3JvdW5kOiAjZmZmOyB9XFxuICBhcnRpY2xlIHsgcG9zaXRpb246IHJlbGF0aXZlOyBkaXNwbGF5OiBncmlkOyBtaW4taGVpZ2h0OiA3MnB4OyBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDM1cHggbWlubWF4KDAsMWZyKSBhdXRvOyBhbGlnbi1pdGVtczogY2VudGVyOyBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2UyZTllYzsgYmFja2dyb3VuZDogI2ZmZjsgdHJhbnNpdGlvbjogYmFja2dyb3VuZCAuMTVzLCBib3gtc2hhZG93IC4xNXM7XFxuICAgICY6OmJlZm9yZSB7IHBvc2l0aW9uOiBhYnNvbHV0ZTsgdG9wOiAwOyBib3R0b206IDA7IGxlZnQ6IDA7IHdpZHRoOiA0cHg7IGJhY2tncm91bmQ6IHRyYW5zcGFyZW50OyBjb250ZW50OiBcXFwiXFxcIjsgfVxcbiAgICAmOmhvdmVyIHsgYmFja2dyb3VuZDogI2Y3ZmFmYjsgfVxcbiAgICAmLmlzLXZpc2libGUgeyBiYWNrZ3JvdW5kOiAjZWRmOGY4OyAmOjpiZWZvcmUgeyBiYWNrZ3JvdW5kOiB2YXIoLS10ZWFsKTsgfSB9XFxuICAgICYuaXMtY29tcGFyaW5nIHsgYm94LXNoYWRvdzogaW5zZXQgMCAwIDAgMXB4ICNlN2E5M2Q7IH1cXG4gIH1cXG4gICZfX2V5ZSB7IHdpZHRoOiAzMHB4OyBoZWlnaHQ6IDEwMCU7IGJvcmRlcjogMDsgY29sb3I6ICM5MmE0YWM7IGJhY2tncm91bmQ6IHRyYW5zcGFyZW50OyBjdXJzb3I6IHBvaW50ZXI7IGZvbnQtc2l6ZTogMTZweDsgfVxcbiAgLmlzLXZpc2libGUgJl9fZXllIHsgY29sb3I6IHZhcigtLXRlYWwpOyB9XFxuICAmX19mbGlnaHQgeyBkaXNwbGF5OiBmbGV4OyBtaW4td2lkdGg6IDA7IHBhZGRpbmc6IDEwcHggM3B4OyBmbGV4LWRpcmVjdGlvbjogY29sdW1uOyBhbGlnbi1pdGVtczogZmxleC1zdGFydDsgYm9yZGVyOiAwOyBjb2xvcjogaW5oZXJpdDsgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7IGN1cnNvcjogcG9pbnRlcjsgdGV4dC1hbGlnbjogbGVmdDtcXG4gICAgc3Ryb25nIHsgd2lkdGg6IDEwMCU7IG92ZXJmbG93OiBoaWRkZW47IGNvbG9yOiAjMjk0OTU4OyBmb250LXNpemU6IDEycHg7IGxpbmUtaGVpZ2h0OiAxLjI1OyB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpczsgd2hpdGUtc3BhY2U6IG5vd3JhcDsgfVxcbiAgICBzbWFsbCB7IHdpZHRoOiAxMDAlOyBtYXJnaW4tdG9wOiAzcHg7IG92ZXJmbG93OiBoaWRkZW47IGNvbG9yOiAjODQ5NjlmOyBmb250LXNpemU6IDhweDsgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7IHdoaXRlLXNwYWNlOiBub3dyYXA7IH1cXG4gIH1cXG4gICZfX2RhdGUgeyBtYXJnaW4tYm90dG9tOiAzcHg7IGNvbG9yOiB2YXIoLS10ZWFsKTsgZm9udC1zaXplOiA4cHg7IGZvbnQtd2VpZ2h0OiA3NTA7IGxldHRlci1zcGFjaW5nOiAuMDZlbTsgfVxcbiAgJl9fYWN0aW9ucyB7IGRpc3BsYXk6IGZsZXg7IHBhZGRpbmctcmlnaHQ6IDhweDsgZ2FwOiAycHg7XFxuICAgIGJ1dHRvbiB7IGRpc3BsYXk6IGdyaWQ7IHdpZHRoOiAyN3B4OyBoZWlnaHQ6IDI3cHg7IHBsYWNlLWl0ZW1zOiBjZW50ZXI7IGJvcmRlcjogMDsgYm9yZGVyLXJhZGl1czogNXB4OyBjb2xvcjogIzZmODU4ZjsgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7IGN1cnNvcjogcG9pbnRlcjsgZm9udC1zaXplOiAxM3B4OyB9XFxuICAgIGJ1dHRvbjpob3ZlciwgYnV0dG9uLmlzLWFjdGl2ZSB7IGNvbG9yOiB2YXIoLS10ZWFsKTsgYmFja2dyb3VuZDogI2RmZjFmMTsgfVxcbiAgICBidXR0b24uaXMtYWN0aXZlIHsgY29sb3I6ICNhNzZiMDA7IGJhY2tncm91bmQ6ICNmZmYxZDg7IH1cXG4gIH1cXG4gICZfX29wYWNpdHkgeyBkaXNwbGF5OiBncmlkOyBtaW4taGVpZ2h0OiAzOHB4OyBwYWRkaW5nOiA1cHggMTJweCA4cHggMzlweDsgZ3JpZC1jb2x1bW46IDEgLyAtMTsgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiA3NnB4IDFmciAzNHB4OyBhbGlnbi1pdGVtczogY2VudGVyOyBnYXA6IDhweDsgY29sb3I6ICM2ZTgzOGU7IGJhY2tncm91bmQ6ICNmNGY4Zjk7IGZvbnQtc2l6ZTogOHB4O1xcbiAgICBpbnB1dCB7IHdpZHRoOiAxMDAlOyBhY2NlbnQtY29sb3I6IHZhcigtLXRlYWwpOyB9XFxuICAgIGIgeyBjb2xvcjogdmFyKC0tdGVhbCk7IHRleHQtYWxpZ246IHJpZ2h0OyB9XFxuICB9XFxuICAmX192ZWN0b3ItaGVscCB7IHBhZGRpbmc6IDExcHggMTZweDsgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIHZhcigtLWxpbmUpOyBjb2xvcjogIzcxODY5MTsgYmFja2dyb3VuZDogI2Y1ZjhmOTsgZm9udC1zaXplOiA5cHg7IGxpbmUtaGVpZ2h0OiAxLjQ7IH1cXG4gICZfX3ZlY3Rvci1saXN0IGFydGljbGUgeyBtaW4taGVpZ2h0OiA2MXB4OyB9XFxuICAmX19lbXB0eSwgJl9fbm8tcmVzdWx0cyB7IGRpc3BsYXk6IGZsZXg7IHBhZGRpbmc6IDQ1cHggMjVweDsgZmxleDogMTsgZmxleC1kaXJlY3Rpb246IGNvbHVtbjsgYWxpZ24taXRlbXM6IGNlbnRlcjsganVzdGlmeS1jb250ZW50OiBjZW50ZXI7IGNvbG9yOiAjN2M5MDk5OyB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgIGkgeyBjb2xvcjogdmFyKC0tdGVhbCk7IGZvbnQtc2l6ZTogMzBweDsgZm9udC1zdHlsZTogbm9ybWFsOyB9XFxuICAgIHN0cm9uZyB7IG1hcmdpbi10b3A6IDhweDsgY29sb3I6IHZhcigtLW5hdnkpOyBmb250LXNpemU6IDE0cHg7IH1cXG4gICAgcCB7IG1heC13aWR0aDogMjYwcHg7IG1hcmdpbjogNXB4IDAgMTNweDsgZm9udC1zaXplOiAxMHB4OyB9XFxuICAgIGJ1dHRvbiB7IHBhZGRpbmc6IDdweCAxMXB4OyBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS10ZWFsKTsgYm9yZGVyLXJhZGl1czogNXB4OyBjb2xvcjogdmFyKC0tdGVhbCk7IGJhY2tncm91bmQ6ICNmZmY7IGN1cnNvcjogcG9pbnRlcjsgZm9udC1zaXplOiAxMHB4OyB9XFxuICB9XFxuICAmX19hbGVydCB7IG1hcmdpbjogMTZweDsgcGFkZGluZzogMTRweDsgYm9yZGVyOiAxcHggc29saWQgI2U3YjZiNjsgYm9yZGVyLXJhZGl1czogN3B4OyBjb2xvcjogIzhiM2QzZDsgYmFja2dyb3VuZDogI2ZmZjRmNDtcXG4gICAgc3Ryb25nLCBzcGFuIHsgZGlzcGxheTogYmxvY2s7IH1cXG4gICAgc3Ryb25nIHsgZm9udC1zaXplOiAxMnB4OyB9IHNwYW4geyBtYXJnaW4tdG9wOiAzcHg7IGZvbnQtc2l6ZTogMTBweDsgfVxcbiAgICBidXR0b24geyBtYXJnaW4tdG9wOiA5cHg7IGJvcmRlcjogMDsgY29sb3I6ICM4YjNkM2Q7IGJhY2tncm91bmQ6IG5vbmU7IGN1cnNvcjogcG9pbnRlcjsgZm9udC1zaXplOiAxMHB4OyBmb250LXdlaWdodDogNzAwOyB9XFxuICB9XFxuICAmX19sb2FkaW5nIHsgcG9zaXRpb246IGFic29sdXRlOyB6LWluZGV4OiA1OyByaWdodDogMTJweDsgYm90dG9tOiAzMXB4OyBkaXNwbGF5OiBmbGV4OyBwYWRkaW5nOiA3cHggMTBweDsgYWxpZ24taXRlbXM6IGNlbnRlcjsgZ2FwOiA3cHg7IGJvcmRlcjogMXB4IHNvbGlkICNjOWRhZGQ7IGJvcmRlci1yYWRpdXM6IDIwcHg7IGNvbG9yOiAjNTA2Yzc4OyBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwyNTUsMjU1LC45NSk7IGJveC1zaGFkb3c6IDAgNHB4IDEycHggcmdiYSgzMCw2MCw3MCwuMTIpOyBmb250LXNpemU6IDlweDtcXG4gICAgaSB7IHdpZHRoOiAxMnB4OyBoZWlnaHQ6IDEycHg7IGJvcmRlcjogMnB4IHNvbGlkICNjNmRkZGQ7IGJvcmRlci10b3AtY29sb3I6IHZhcigtLXRlYWwpOyBib3JkZXItcmFkaXVzOiA1MCU7IGFuaW1hdGlvbjogZHJvbmUtc3BpbiAuNzVzIGxpbmVhciBpbmZpbml0ZTsgfVxcbiAgfVxcbiAgZm9vdGVyIHsgZGlzcGxheTogZmxleDsgbWluLWhlaWdodDogMjhweDsgcGFkZGluZzogMCAxNnB4OyBmbGV4OiAwIDAgYXV0bzsgYWxpZ24taXRlbXM6IGNlbnRlcjsgZ2FwOiA2cHg7IGJvcmRlci10b3A6IDFweCBzb2xpZCB2YXIoLS1saW5lKTsgY29sb3I6ICM4Mjk0OWM7IGJhY2tncm91bmQ6ICNmYWZjZmM7IGZvbnQtc2l6ZTogOHB4O1xcbiAgICBzcGFuIHsgd2lkdGg6IDZweDsgaGVpZ2h0OiA2cHg7IGJvcmRlci1yYWRpdXM6IDUwJTsgYmFja2dyb3VuZDogI2IwYmNjMTsgfVxcbiAgICBzcGFuLmlzLXJlYWR5IHsgYmFja2dyb3VuZDogIzJhOWI3MzsgYm94LXNoYWRvdzogMCAwIDAgM3B4IHJnYmEoNDIsMTU1LDExNSwuMTIpOyB9XFxuICB9XFxufVxcblxcbkBrZXlmcmFtZXMgZHJvbmUtc3BpbiB7IHRvIHsgdHJhbnNmb3JtOiByb3RhdGUoMzYwZGVnKTsgfSB9XFxuXFxuQG1lZGlhIChtYXgtd2lkdGg6IDM1MHB4KSB7XFxuICAuZHJvbmUtc2VsZWN0b3JfX2ZpbHRlcnMgeyBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmciAxZnI7IHNlbGVjdDpsYXN0LWNoaWxkIHsgZ3JpZC1jb2x1bW46IDEgLyAtMTsgfSB9XFxuICAuZHJvbmUtc2VsZWN0b3JfX2FjdGlvbnMgYnV0dG9uOmZpcnN0LWNoaWxkIHsgZGlzcGxheTogbm9uZTsgfVxcbn1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107IC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcblxuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcblxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9OyAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuXG5cbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cblxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG5cbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcblxuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuXG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuXG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG5cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHZhciBzb3VyY2VVUkxzID0gY3NzTWFwcGluZy5zb3VyY2VzLm1hcChmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgICByZXR1cm4gXCIvKiMgc291cmNlVVJMPVwiLmNvbmNhdChjc3NNYXBwaW5nLnNvdXJjZVJvb3QgfHwgXCJcIikuY29uY2F0KHNvdXJjZSwgXCIgKi9cIik7XG4gICAgfSk7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoc291cmNlVVJMcykuY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuXG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcz8/cnVsZVNldFsxXS5ydWxlc1szXS51c2VbMV0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Jlc29sdmUtdXJsLWxvYWRlci9pbmRleC5qcz8/cnVsZVNldFsxXS5ydWxlc1szXS51c2VbMl0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2Rpc3QvY2pzLmpzPz9ydWxlU2V0WzFdLnJ1bGVzWzNdLnVzZVszXSEuL3N0eWxlLnNjc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcz8/cnVsZVNldFsxXS5ydWxlc1szXS51c2VbMV0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Jlc29sdmUtdXJsLWxvYWRlci9pbmRleC5qcz8/cnVsZVNldFsxXS5ydWxlc1szXS51c2VbMl0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2Rpc3QvY2pzLmpzPz9ydWxlU2V0WzFdLnJ1bGVzWzNdLnVzZVszXSEuL3N0eWxlLnNjc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5cbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuXG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuXG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cblxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcblxuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gdXBkYXRlcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cblxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG5cbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcblxuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcblxuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcblxuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7IC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG5cbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cblxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcblxuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cblxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG5cbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuXG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cblxuICBjc3MgKz0gb2JqLmNzcztcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcblxuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH0gLy8gRm9yIG9sZCBJRVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cblxuXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuXG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiZXhwb3J0IGludGVyZmFjZSBQYXJzZWRGbGlnaHROYW1lIHtcbiAgZGF0ZTogRGF0ZSB8IG51bGxcbiAgZGF0ZUtleTogc3RyaW5nXG4gIHllYXI6IHN0cmluZ1xuICBtb250aDogc3RyaW5nXG4gIHBsYWNlOiBzdHJpbmdcbiAgbGFiZWw6IHN0cmluZ1xufVxuXG5jb25zdCBNT05USFMgPSBbJ0VuZXJvJywgJ0ZlYnJlcm8nLCAnTWFyem8nLCAnQWJyaWwnLCAnTWF5bycsICdKdW5pbycsICdKdWxpbycsICdBZ29zdG8nLCAnU2VwdGllbWJyZScsICdPY3R1YnJlJywgJ05vdmllbWJyZScsICdEaWNpZW1icmUnXVxuXG5leHBvcnQgY29uc3Qgbm9ybWFsaXplVGV4dCA9ICh2YWx1ZTogdW5rbm93bik6IHN0cmluZyA9PiBTdHJpbmcodmFsdWUgPz8gJycpXG4gIC5ub3JtYWxpemUoJ05GRCcpLnJlcGxhY2UoL1tcXHUwMzAwLVxcdTAzNmZdL2csICcnKS50b0xvd2VyQ2FzZSgpLnRyaW0oKVxuXG5leHBvcnQgY29uc3QgcGFyc2VGbGlnaHROYW1lID0gKHRpdGxlOiBzdHJpbmcpOiBQYXJzZWRGbGlnaHROYW1lID0+IHtcbiAgY29uc3QgcmF3ID0gU3RyaW5nKHRpdGxlIHx8ICcnKS50cmltKClcbiAgY29uc3QgbWF0Y2ggPSByYXcubWF0Y2goL14oXFxkezJ9fFxcZHs0fSlbXy1dKFxcZHsxLDJ9KVtfLV0oXFxkezEsMn0pKD86W18tXSspPyguKikkLylcbiAgaWYgKCFtYXRjaCkgcmV0dXJuIHsgZGF0ZTogbnVsbCwgZGF0ZUtleTogJycsIHllYXI6ICdTaW4gZmVjaGEnLCBtb250aDogJ1NpbiBmZWNoYScsIHBsYWNlOiByYXcsIGxhYmVsOiByYXcgfVxuICBjb25zdCB5ZWFyTnVtYmVyID0gbWF0Y2hbMV0ubGVuZ3RoID09PSAyID8gMjAwMCArIE51bWJlcihtYXRjaFsxXSkgOiBOdW1iZXIobWF0Y2hbMV0pXG4gIGNvbnN0IG1vbnRoTnVtYmVyID0gTnVtYmVyKG1hdGNoWzJdKVxuICBjb25zdCBkYXlOdW1iZXIgPSBOdW1iZXIobWF0Y2hbM10pXG4gIGNvbnN0IGNhbmRpZGF0ZSA9IG5ldyBEYXRlKHllYXJOdW1iZXIsIG1vbnRoTnVtYmVyIC0gMSwgZGF5TnVtYmVyKVxuICBjb25zdCB2YWxpZCA9IGNhbmRpZGF0ZS5nZXRGdWxsWWVhcigpID09PSB5ZWFyTnVtYmVyICYmIGNhbmRpZGF0ZS5nZXRNb250aCgpID09PSBtb250aE51bWJlciAtIDEgJiYgY2FuZGlkYXRlLmdldERhdGUoKSA9PT0gZGF5TnVtYmVyXG4gIGNvbnN0IHBsYWNlID0gKG1hdGNoWzRdIHx8ICdWdWVsbyBzaW4gc2VjdG9yJykucmVwbGFjZSgvW18tXSsvZywgJyAnKS5yZXBsYWNlKC9cXHMrL2csICcgJykudHJpbSgpXG4gIGlmICghdmFsaWQpIHJldHVybiB7IGRhdGU6IG51bGwsIGRhdGVLZXk6ICcnLCB5ZWFyOiAnU2luIGZlY2hhJywgbW9udGg6ICdTaW4gZmVjaGEnLCBwbGFjZSwgbGFiZWw6IGAke3Jhd30gwrcgZmVjaGEgbm8gdsOhbGlkYWAgfVxuICBjb25zdCBkYXRlS2V5ID0gYCR7eWVhck51bWJlcn0tJHtTdHJpbmcobW9udGhOdW1iZXIpLnBhZFN0YXJ0KDIsICcwJyl9LSR7U3RyaW5nKGRheU51bWJlcikucGFkU3RhcnQoMiwgJzAnKX1gXG4gIHJldHVybiB7XG4gICAgZGF0ZTogY2FuZGlkYXRlLFxuICAgIGRhdGVLZXksXG4gICAgeWVhcjogU3RyaW5nKHllYXJOdW1iZXIpLFxuICAgIG1vbnRoOiBNT05USFNbbW9udGhOdW1iZXIgLSAxXSxcbiAgICBwbGFjZSxcbiAgICBsYWJlbDogYCR7U3RyaW5nKGRheU51bWJlcikucGFkU3RhcnQoMiwgJzAnKX0gJHtNT05USFNbbW9udGhOdW1iZXIgLSAxXS5zbGljZSgwLCAzKS50b0xvd2VyQ2FzZSgpfSAke3llYXJOdW1iZXJ9IMK3ICR7cGxhY2V9YFxuICB9XG59XG5cbmV4cG9ydCBjb25zdCBtYXRjaGVzR3JvdXBUaXRsZSA9IChjYW5kaWRhdGU6IHN0cmluZywgZXhwZWN0ZWQ6IHN0cmluZyk6IGJvb2xlYW4gPT4ge1xuICBjb25zdCBncm91cEtleSA9ICh2YWx1ZTogc3RyaW5nKSA9PiBub3JtYWxpemVUZXh0KHZhbHVlKVxuICAgIC5yZXBsYWNlKC9cXGIoZGV8ZGVsfGxhfGxhc3xlbHxsb3MpXFxiL2csICcgJylcbiAgICAucmVwbGFjZSgvW15hLXowLTldKy9nLCAnICcpXG4gICAgLnJlcGxhY2UoL1xccysvZywgJyAnKVxuICAgIC50cmltKClcbiAgY29uc3QgbGVmdCA9IGdyb3VwS2V5KGNhbmRpZGF0ZSlcbiAgY29uc3QgcmlnaHQgPSBncm91cEtleShleHBlY3RlZCB8fCAnSW1hZ2VuZXMgZGUgRHJvbmUnKVxuICByZXR1cm4gbGVmdCA9PT0gcmlnaHQgfHwgbGVmdC5pbmNsdWRlcyhyaWdodClcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9qaW11X2FyY2dpc19fOyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9qaW11X2NvcmVfXzsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5jID0gdW5kZWZpbmVkOyIsIi8qKlxyXG4gKiBXZWJwYWNrIHdpbGwgcmVwbGFjZSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyB3aXRoIF9fd2VicGFja19yZXF1aXJlX18ucCB0byBzZXQgdGhlIHB1YmxpYyBwYXRoIGR5bmFtaWNhbGx5LlxyXG4gKiBUaGUgcmVhc29uIHdoeSB3ZSBjYW4ndCBzZXQgdGhlIHB1YmxpY1BhdGggaW4gd2VicGFjayBjb25maWcgaXM6IHdlIGNoYW5nZSB0aGUgcHVibGljUGF0aCB3aGVuIGRvd25sb2FkLlxyXG4gKiAqL1xyXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcclxuLy8gQHRzLWlnbm9yZVxyXG5fX3dlYnBhY2tfcHVibGljX3BhdGhfXyA9IHdpbmRvdy5qaW11Q29uZmlnLmJhc2VVcmxcclxuIiwiaW1wb3J0IHsgUmVhY3QsIEFsbFdpZGdldFByb3BzIH0gZnJvbSAnamltdS1jb3JlJ1xuaW1wb3J0IHsgSmltdU1hcFZpZXcsIEppbXVNYXBWaWV3Q29tcG9uZW50LCBsb2FkQXJjR0lTSlNBUElNb2R1bGVzIH0gZnJvbSAnamltdS1hcmNnaXMnXG5pbXBvcnQgeyBJTUNvbmZpZyB9IGZyb20gJy4uL2NvbmZpZydcbmltcG9ydCB7IG1hdGNoZXNHcm91cFRpdGxlLCBub3JtYWxpemVUZXh0LCBwYXJzZUZsaWdodE5hbWUsIFBhcnNlZEZsaWdodE5hbWUgfSBmcm9tICcuL2Ryb25lLXV0aWxzJ1xuaW1wb3J0ICcuL3N0eWxlLnNjc3MnXG5cbmludGVyZmFjZSBGbGlnaHRJdGVtIGV4dGVuZHMgUGFyc2VkRmxpZ2h0TmFtZSB7XG4gIGlkOiBzdHJpbmdcbiAgdGl0bGU6IHN0cmluZ1xuICBwYXJlbnRUaXRsZTogc3RyaW5nXG4gIGxheWVyOiBhbnlcbiAgdmlzaWJsZTogYm9vbGVhblxufVxuXG5pbnRlcmZhY2UgVmVjdG9ySXRlbSB7XG4gIGlkOiBzdHJpbmdcbiAgdGl0bGU6IHN0cmluZ1xuICB0eXBlOiBzdHJpbmdcbiAgbGF5ZXI6IGFueVxuICB2aXNpYmxlOiBib29sZWFuXG59XG5cbnR5cGUgU29ydE1vZGUgPSAnbmV3ZXN0JyB8ICdvbGRlc3QnIHwgJ25hbWUnXG5cbmNvbnN0IGNvbGxlY3RMZWFmTGF5ZXJzID0gKGdyb3VwOiBhbnksIHBhcmVudFRpdGxlOiBzdHJpbmcpOiBGbGlnaHRJdGVtW10gPT4ge1xuICBjb25zdCByZXN1bHQ6IEZsaWdodEl0ZW1bXSA9IFtdXG4gIGNvbnN0IHZpc2l0ID0gKGxheWVyOiBhbnksIHBhcmVudDogc3RyaW5nKSA9PiB7XG4gICAgY29uc3QgY2hpbGRyZW4gPSBsYXllcj8ubGF5ZXJzIHx8IGxheWVyPy5zdWJsYXllcnNcbiAgICBjb25zdCB0aXRsZSA9IFN0cmluZyhsYXllcj8udGl0bGUgfHwgbGF5ZXI/Lm5hbWUgfHwgJycpXG4gICAgaWYgKGNoaWxkcmVuPy5sZW5ndGgpIHtcbiAgICAgIGNoaWxkcmVuLmZvckVhY2goKGNoaWxkOiBhbnkpID0+IHZpc2l0KGNoaWxkLCB0aXRsZSB8fCBwYXJlbnQpKVxuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIGlmICghbGF5ZXIpIHJldHVyblxuICAgIHJlc3VsdC5wdXNoKHtcbiAgICAgIGlkOiBTdHJpbmcobGF5ZXIuaWQgfHwgbGF5ZXIudWlkIHx8IGAke3BhcmVudH0tJHtsYXllci50aXRsZX1gKSxcbiAgICAgIHRpdGxlOiB0aXRsZSB8fCAnVnVlbG8gc2luIG5vbWJyZScsXG4gICAgICBwYXJlbnRUaXRsZTogcGFyZW50LFxuICAgICAgbGF5ZXIsXG4gICAgICB2aXNpYmxlOiBCb29sZWFuKGxheWVyLnZpc2libGUpLFxuICAgICAgLi4ucGFyc2VGbGlnaHROYW1lKHRpdGxlKVxuICAgIH0pXG4gIH1cbiAgY29uc3QgY2hpbGRyZW4gPSBncm91cD8ubGF5ZXJzIHx8IGdyb3VwPy5zdWJsYXllcnNcbiAgY2hpbGRyZW4/LmZvckVhY2goKGxheWVyOiBhbnkpID0+IHZpc2l0KGxheWVyLCBncm91cC50aXRsZSB8fCBncm91cC5uYW1lIHx8IHBhcmVudFRpdGxlKSlcbiAgcmV0dXJuIHJlc3VsdFxufVxuXG5jb25zdCBjaGlsZHJlbk9mID0gKGl0ZW06IGFueSk6IGFueSA9PiBpdGVtPy5sYXllcnMgfHwgaXRlbT8uc3VibGF5ZXJzXG5jb25zdCBpdGVtVGl0bGUgPSAoaXRlbTogYW55KTogc3RyaW5nID0+IFN0cmluZyhpdGVtPy50aXRsZSB8fCBpdGVtPy5uYW1lIHx8ICcnKVxuXG5jb25zdCBmaW5kUmVjdXJzaXZlID0gKGNvbGxlY3Rpb246IGFueSwgdGl0bGU6IHN0cmluZyk6IGFueSA9PiB7XG4gIGxldCBmb3VuZDogYW55ID0gbnVsbFxuICBjb2xsZWN0aW9uPy5mb3JFYWNoKChpdGVtOiBhbnkpID0+IHtcbiAgICBpZiAoZm91bmQpIHJldHVyblxuICAgIGlmIChtYXRjaGVzR3JvdXBUaXRsZShpdGVtVGl0bGUoaXRlbSksIHRpdGxlKSkgZm91bmQgPSBpdGVtXG4gICAgZWxzZSBmb3VuZCA9IGZpbmRSZWN1cnNpdmUoY2hpbGRyZW5PZihpdGVtKSwgdGl0bGUpXG4gIH0pXG4gIHJldHVybiBmb3VuZFxufVxuXG5jb25zdCBmaW5kQ2F0YWxvZyA9IGFzeW5jIChtYXA6IGFueSwgdGl0bGU6IHN0cmluZyk6IFByb21pc2U8YW55PiA9PiB7XG4gIGNvbnN0IHBhdGggPSBTdHJpbmcodGl0bGUgfHwgJ1Z1ZWxvcyBEcm9uZSBQQU8vSW1hZ2VuZXMgRHJvbmUnKVxuICAgIC5zcGxpdCgvWy8+XS8pLm1hcChwYXJ0ID0+IHBhcnQudHJpbSgpKS5maWx0ZXIoQm9vbGVhbilcbiAgY29uc3Qgcm9vdHMgPSBtYXA/LmxheWVyc1xuICBjb25zdCBsb2FkUHJvbWlzZXM6IFByb21pc2U8YW55PltdID0gW11cbiAgcm9vdHM/LmZvckVhY2goKHJvb3Q6IGFueSkgPT4ge1xuICAgIGNvbnN0IGxvYWRlciA9IHJvb3Q/LmxvYWRBbGwgfHwgcm9vdD8ubG9hZFxuICAgIGlmIChsb2FkZXIpIGxvYWRQcm9taXNlcy5wdXNoKFByb21pc2UucmVzb2x2ZShsb2FkZXIuY2FsbChyb290KSkuY2F0Y2goKCkgPT4gbnVsbCkpXG4gIH0pXG4gIGF3YWl0IFByb21pc2UuYWxsKGxvYWRQcm9taXNlcylcblxuICBsZXQgY3VycmVudCA9IGZpbmRSZWN1cnNpdmUocm9vdHMsIHBhdGhbMF0pXG4gIGZvciAoY29uc3Qgc2VnbWVudCBvZiBwYXRoLnNsaWNlKDEpKSB7XG4gICAgY3VycmVudCA9IGZpbmRSZWN1cnNpdmUoY2hpbGRyZW5PZihjdXJyZW50KSwgc2VnbWVudClcbiAgICBpZiAoIWN1cnJlbnQpIGJyZWFrXG4gIH1cbiAgaWYgKGN1cnJlbnQpIHJldHVybiBjdXJyZW50XG5cbiAgY29uc3QgbGVhZlRpdGxlID0gcGF0aFtwYXRoLmxlbmd0aCAtIDFdIHx8IHRpdGxlXG4gIHJldHVybiBmaW5kUmVjdXJzaXZlKHJvb3RzLCBsZWFmVGl0bGUpXG59XG5cbmNvbnN0IFdpZGdldCA9IChwcm9wczogQWxsV2lkZ2V0UHJvcHM8SU1Db25maWc+KSA9PiB7XG4gIGNvbnN0IFtqaW11TWFwVmlldywgc2V0SmltdU1hcFZpZXddID0gUmVhY3QudXNlU3RhdGU8SmltdU1hcFZpZXc+KG51bGwpXG4gIGNvbnN0IFtmbGlnaHRzLCBzZXRGbGlnaHRzXSA9IFJlYWN0LnVzZVN0YXRlPEZsaWdodEl0ZW1bXT4oW10pXG4gIGNvbnN0IFtncm91cEZvdW5kLCBzZXRHcm91cEZvdW5kXSA9IFJlYWN0LnVzZVN0YXRlKGZhbHNlKVxuICBjb25zdCBbbG9hZGluZywgc2V0TG9hZGluZ10gPSBSZWFjdC51c2VTdGF0ZShmYWxzZSlcbiAgY29uc3QgW2Vycm9yLCBzZXRFcnJvcl0gPSBSZWFjdC51c2VTdGF0ZSgnJylcbiAgY29uc3QgW3F1ZXJ5LCBzZXRRdWVyeV0gPSBSZWFjdC51c2VTdGF0ZSgnJylcbiAgY29uc3QgW3llYXIsIHNldFllYXJdID0gUmVhY3QudXNlU3RhdGUoJycpXG4gIGNvbnN0IFttb250aCwgc2V0TW9udGhdID0gUmVhY3QudXNlU3RhdGUoJycpXG4gIGNvbnN0IFtzb3J0LCBzZXRTb3J0XSA9IFJlYWN0LnVzZVN0YXRlPFNvcnRNb2RlPignbmV3ZXN0JylcbiAgY29uc3QgW2FuYWx5c2lzT3Blbiwgc2V0QW5hbHlzaXNPcGVuXSA9IFJlYWN0LnVzZVN0YXRlKGZhbHNlKVxuICBjb25zdCBbY29tcGFyZUlkcywgc2V0Q29tcGFyZUlkc10gPSBSZWFjdC51c2VTdGF0ZTxzdHJpbmdbXT4oW10pXG4gIGNvbnN0IFtzd2lwZUFjdGl2ZSwgc2V0U3dpcGVBY3RpdmVdID0gUmVhY3QudXNlU3RhdGUoZmFsc2UpXG4gIGNvbnN0IFtzd2lwZUVycm9yLCBzZXRTd2lwZUVycm9yXSA9IFJlYWN0LnVzZVN0YXRlKCcnKVxuICBjb25zdCBbYWN0aXZlVGFiLCBzZXRBY3RpdmVUYWJdID0gUmVhY3QudXNlU3RhdGU8J2ltYWdlcnknIHwgJ3ZlY3RvcnMnPignaW1hZ2VyeScpXG4gIGNvbnN0IFt2ZWN0b3JzLCBzZXRWZWN0b3JzXSA9IFJlYWN0LnVzZVN0YXRlPFZlY3Rvckl0ZW1bXT4oW10pXG4gIGNvbnN0IFtvcGFjaXR5RWRpdG9ySWQsIHNldE9wYWNpdHlFZGl0b3JJZF0gPSBSZWFjdC51c2VTdGF0ZSgnJylcbiAgY29uc3QgaGFuZGxlcyA9IFJlYWN0LnVzZVJlZjxhbnlbXT4oW10pXG4gIGNvbnN0IGluaXRpYWxpemVkQ2F0YWxvZyA9IFJlYWN0LnVzZVJlZignJylcbiAgY29uc3Qgc3dpcGVSZWYgPSBSZWFjdC51c2VSZWY8YW55PihudWxsKVxuICBjb25zdCBzd2lwZUNsb25lc1JlZiA9IFJlYWN0LnVzZVJlZjxhbnlbXT4oW10pXG5cbiAgY29uc3QgY2xlYXJIYW5kbGVzID0gKCkgPT4ge1xuICAgIGhhbmRsZXMuY3VycmVudC5mb3JFYWNoKGhhbmRsZSA9PiBoYW5kbGU/LnJlbW92ZT8uKCkpXG4gICAgaGFuZGxlcy5jdXJyZW50ID0gW11cbiAgfVxuXG4gIGNvbnN0IHNjYW5NYXAgPSBSZWFjdC51c2VDYWxsYmFjayhhc3luYyAoKSA9PiB7XG4gICAgaWYgKCFqaW11TWFwVmlldz8udmlldz8ubWFwKSByZXR1cm5cbiAgICBzZXRMb2FkaW5nKHRydWUpXG4gICAgc2V0RXJyb3IoJycpXG4gICAgY2xlYXJIYW5kbGVzKClcbiAgICB0cnkge1xuICAgICAgYXdhaXQgamltdU1hcFZpZXcudmlldy53aGVuKClcbiAgICAgIGNvbnN0IGNvbmZpZ3VyZWRUaXRsZSA9IHByb3BzLmNvbmZpZy5ncm91cFRpdGxlIHx8ICdWdWVsb3MgRHJvbmUgUEFPL0ltYWdlbmVzIERyb25lJ1xuICAgICAgY29uc3QgZ3JvdXAgPSBhd2FpdCBmaW5kQ2F0YWxvZyhqaW11TWFwVmlldy52aWV3Lm1hcCwgY29uZmlndXJlZFRpdGxlKVxuICAgICAgc2V0R3JvdXBGb3VuZChCb29sZWFuKGdyb3VwKSlcbiAgICAgIGlmICghZ3JvdXApIHtcbiAgICAgICAgc2V0RmxpZ2h0cyhbXSlcbiAgICAgICAgc2V0RXJyb3IoYE5vIHNlIGVuY29udHLDsyBlbCBncnVwbyDigJwke2NvbmZpZ3VyZWRUaXRsZX3igJ0gZW4gZWwgbWFwYS5gKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIGNvbnN0IGl0ZW1zID0gY29sbGVjdExlYWZMYXllcnMoZ3JvdXAsIGNvbmZpZ3VyZWRUaXRsZSlcbiAgICAgIGlmIChpbml0aWFsaXplZENhdGFsb2cuY3VycmVudCAhPT0gY29uZmlndXJlZFRpdGxlKSB7XG4gICAgICAgIGl0ZW1zLmZvckVhY2goaXRlbSA9PiB7IGl0ZW0ubGF5ZXIudmlzaWJsZSA9IGZhbHNlIH0pXG4gICAgICAgIGluaXRpYWxpemVkQ2F0YWxvZy5jdXJyZW50ID0gY29uZmlndXJlZFRpdGxlXG4gICAgICB9XG4gICAgICBzZXRGbGlnaHRzKGl0ZW1zKVxuICAgICAgY29uc3QgY2F0YWxvZ1Jvb3QgPSBncm91cC5sYXllciB8fCBncm91cFxuICAgICAgY29uc3QgdmVjdG9ySXRlbXM6IFZlY3Rvckl0ZW1bXSA9IFtdXG4gICAgICBqaW11TWFwVmlldy52aWV3Lm1hcC5sYXllcnM/LmZvckVhY2goKGxheWVyOiBhbnkpID0+IHtcbiAgICAgICAgaWYgKGxheWVyID09PSBjYXRhbG9nUm9vdCB8fCBsYXllci50eXBlID09PSAnaW1hZ2VyeScpIHJldHVyblxuICAgICAgICB2ZWN0b3JJdGVtcy5wdXNoKHtcbiAgICAgICAgICBpZDogU3RyaW5nKGxheWVyLmlkIHx8IGxheWVyLnVpZCB8fCBsYXllci50aXRsZSksXG4gICAgICAgICAgdGl0bGU6IGl0ZW1UaXRsZShsYXllcikgfHwgJ0NhcGEgc2luIG5vbWJyZScsXG4gICAgICAgICAgdHlwZTogU3RyaW5nKGxheWVyLnR5cGUgfHwgJ2xheWVyJyksXG4gICAgICAgICAgbGF5ZXIsXG4gICAgICAgICAgdmlzaWJsZTogQm9vbGVhbihsYXllci52aXNpYmxlKVxuICAgICAgICB9KVxuICAgICAgfSlcbiAgICAgIHNldFZlY3RvcnModmVjdG9ySXRlbXMpXG4gICAgICBpdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICBpZiAoaXRlbS5sYXllcj8ud2F0Y2gpIHtcbiAgICAgICAgICBoYW5kbGVzLmN1cnJlbnQucHVzaChpdGVtLmxheWVyLndhdGNoKCd2aXNpYmxlJywgKHZpc2libGU6IGJvb2xlYW4pID0+IHtcbiAgICAgICAgICAgIHNldEZsaWdodHMoY3VycmVudCA9PiBjdXJyZW50Lm1hcChmbGlnaHQgPT4gZmxpZ2h0LmlkID09PSBpdGVtLmlkID8geyAuLi5mbGlnaHQsIHZpc2libGUgfSA6IGZsaWdodCkpXG4gICAgICAgICAgfSkpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICB2ZWN0b3JJdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICBpZiAoaXRlbS5sYXllcj8ud2F0Y2gpIHtcbiAgICAgICAgICBoYW5kbGVzLmN1cnJlbnQucHVzaChpdGVtLmxheWVyLndhdGNoKCd2aXNpYmxlJywgKHZpc2libGU6IGJvb2xlYW4pID0+IHtcbiAgICAgICAgICAgIHNldFZlY3RvcnMoY3VycmVudCA9PiBjdXJyZW50Lm1hcChsYXllciA9PiBsYXllci5pZCA9PT0gaXRlbS5pZCA/IHsgLi4ubGF5ZXIsIHZpc2libGUgfSA6IGxheWVyKSlcbiAgICAgICAgICB9KSlcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIGNvbnN0IGdyb3VwQ2hpbGRyZW4gPSBjaGlsZHJlbk9mKGdyb3VwKVxuICAgICAgaWYgKGdyb3VwQ2hpbGRyZW4/Lm9uKSBoYW5kbGVzLmN1cnJlbnQucHVzaChncm91cENoaWxkcmVuLm9uKCdjaGFuZ2UnLCBzY2FuTWFwKSlcbiAgICAgIGlmICghaXRlbXMubGVuZ3RoKSBzZXRFcnJvcignRWwgZ3J1cG8gZXhpc3RlLCBwZXJvIG5vIGNvbnRpZW5lIGNhcGFzIGRlIHZ1ZWxvLicpXG4gICAgfSBjYXRjaCAoZXhjZXB0aW9uKSB7XG4gICAgICBzZXRFcnJvcihleGNlcHRpb24gaW5zdGFuY2VvZiBFcnJvciA/IGV4Y2VwdGlvbi5tZXNzYWdlIDogJ05vIGZ1ZSBwb3NpYmxlIGxlZXIgbGFzIGNhcGFzIGRlbCBtYXBhLicpXG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHNldExvYWRpbmcoZmFsc2UpXG4gICAgfVxuICB9LCBbamltdU1hcFZpZXcsIHByb3BzLmNvbmZpZy5ncm91cFRpdGxlXSlcblxuICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xuICAgIHNjYW5NYXAoKVxuICAgIHJldHVybiBjbGVhckhhbmRsZXNcbiAgfSwgW3NjYW5NYXBdKVxuXG4gIGNvbnN0IHllYXJzID0gUmVhY3QudXNlTWVtbygoKSA9PiBBcnJheS5mcm9tKG5ldyBTZXQoZmxpZ2h0cy5tYXAoaXRlbSA9PiBpdGVtLnllYXIpKSkuc29ydCgpLnJldmVyc2UoKSwgW2ZsaWdodHNdKVxuICBjb25zdCBtb250aHMgPSBSZWFjdC51c2VNZW1vKCgpID0+IEFycmF5LmZyb20obmV3IFNldChmbGlnaHRzLmZpbHRlcihpdGVtID0+ICF5ZWFyIHx8IGl0ZW0ueWVhciA9PT0geWVhcikubWFwKGl0ZW0gPT4gaXRlbS5tb250aCkpKSwgW2ZsaWdodHMsIHllYXJdKVxuICBjb25zdCBmaWx0ZXJlZCA9IFJlYWN0LnVzZU1lbW8oKCkgPT4ge1xuICAgIGNvbnN0IG5lZWRsZSA9IG5vcm1hbGl6ZVRleHQocXVlcnkpXG4gICAgcmV0dXJuIGZsaWdodHMuZmlsdGVyKGl0ZW0gPT5cbiAgICAgICghbmVlZGxlIHx8IG5vcm1hbGl6ZVRleHQoYCR7aXRlbS50aXRsZX0gJHtpdGVtLnBsYWNlfSAke2l0ZW0ucGFyZW50VGl0bGV9ICR7aXRlbS5kYXRlS2V5fWApLmluY2x1ZGVzKG5lZWRsZSkpICYmXG4gICAgICAoIXllYXIgfHwgaXRlbS55ZWFyID09PSB5ZWFyKSAmJiAoIW1vbnRoIHx8IGl0ZW0ubW9udGggPT09IG1vbnRoKVxuICAgICkuc29ydCgoYSwgYikgPT4ge1xuICAgICAgaWYgKHNvcnQgPT09ICduYW1lJykgcmV0dXJuIGEucGxhY2UubG9jYWxlQ29tcGFyZShiLnBsYWNlKVxuICAgICAgY29uc3QgbGVmdCA9IGEuZGF0ZT8uZ2V0VGltZSgpIHx8IDBcbiAgICAgIGNvbnN0IHJpZ2h0ID0gYi5kYXRlPy5nZXRUaW1lKCkgfHwgMFxuICAgICAgcmV0dXJuIHNvcnQgPT09ICduZXdlc3QnID8gcmlnaHQgLSBsZWZ0IDogbGVmdCAtIHJpZ2h0XG4gICAgfSlcbiAgfSwgW2ZsaWdodHMsIHF1ZXJ5LCB5ZWFyLCBtb250aCwgc29ydF0pXG5cbiAgY29uc3QgdmlzaWJsZUNvdW50ID0gZmxpZ2h0cy5maWx0ZXIoaXRlbSA9PiBpdGVtLnZpc2libGUpLmxlbmd0aFxuXG4gIGNvbnN0IHpvb21UbyA9IGFzeW5jIChpdGVtOiBGbGlnaHRJdGVtKSA9PiB7XG4gICAgaWYgKCFqaW11TWFwVmlldz8udmlldyB8fCAhaXRlbS5sYXllcikgcmV0dXJuXG4gICAgdHJ5IHtcbiAgICAgIGxldCB0YXJnZXQgPSBpdGVtLmxheWVyLmZ1bGxFeHRlbnQgfHwgaXRlbS5sYXllci5leHRlbnRcbiAgICAgIGlmICghdGFyZ2V0ICYmIGl0ZW0ubGF5ZXIucXVlcnlFeHRlbnQpIHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgaXRlbS5sYXllci5xdWVyeUV4dGVudCgpXG4gICAgICAgIHRhcmdldCA9IHJlc3VsdD8uZXh0ZW50XG4gICAgICB9XG4gICAgICBpZiAodGFyZ2V0KSBhd2FpdCBqaW11TWFwVmlldy52aWV3LmdvVG8odGFyZ2V0LmV4cGFuZCA/IHRhcmdldC5leHBhbmQoMS4xNSkgOiB0YXJnZXQpXG4gICAgfSBjYXRjaCAoXykge31cbiAgfVxuXG4gIGNvbnN0IHRvZ2dsZVZpc2liaWxpdHkgPSBhc3luYyAoaXRlbTogRmxpZ2h0SXRlbSkgPT4ge1xuICAgIGNvbnN0IG5leHQgPSAhaXRlbS5sYXllci52aXNpYmxlXG4gICAgaWYgKG5leHQgJiYgcHJvcHMuY29uZmlnLmV4Y2x1c2l2ZVZpc2liaWxpdHkgIT09IGZhbHNlKSB7XG4gICAgICBmbGlnaHRzLmZvckVhY2goY2FuZGlkYXRlID0+IHsgY2FuZGlkYXRlLmxheWVyLnZpc2libGUgPSBjYW5kaWRhdGUuaWQgPT09IGl0ZW0uaWQgfSlcbiAgICB9IGVsc2Uge1xuICAgICAgaXRlbS5sYXllci52aXNpYmxlID0gbmV4dFxuICAgIH1cbiAgICBzZXRGbGlnaHRzKGN1cnJlbnQgPT4gY3VycmVudC5tYXAoY2FuZGlkYXRlID0+ICh7IC4uLmNhbmRpZGF0ZSwgdmlzaWJsZTogQm9vbGVhbihjYW5kaWRhdGUubGF5ZXIudmlzaWJsZSkgfSkpKVxuICAgIGlmIChuZXh0ICYmIHByb3BzLmNvbmZpZy56b29tT25TZWxlY3QgIT09IGZhbHNlKSBhd2FpdCB6b29tVG8oaXRlbSlcbiAgfVxuXG4gIGNvbnN0IHRvZ2dsZUNvbXBhcmUgPSAoaXRlbTogRmxpZ2h0SXRlbSkgPT4ge1xuICAgIHNldENvbXBhcmVJZHMoY3VycmVudCA9PiB7XG4gICAgICBpZiAoY3VycmVudC5pbmNsdWRlcyhpdGVtLmlkKSkgcmV0dXJuIGN1cnJlbnQuZmlsdGVyKGlkID0+IGlkICE9PSBpdGVtLmlkKVxuICAgICAgaWYgKGN1cnJlbnQubGVuZ3RoID49IDIpIHJldHVybiBbY3VycmVudFsxXSwgaXRlbS5pZF1cbiAgICAgIHJldHVybiBbLi4uY3VycmVudCwgaXRlbS5pZF1cbiAgICB9KVxuICB9XG5cbiAgY29uc3QgY2xvc2VTd2lwZSA9IFJlYWN0LnVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBpZiAoc3dpcGVSZWYuY3VycmVudCAmJiBqaW11TWFwVmlldz8udmlldykge1xuICAgICAgamltdU1hcFZpZXcudmlldy51aS5yZW1vdmUoc3dpcGVSZWYuY3VycmVudClcbiAgICAgIHN3aXBlUmVmLmN1cnJlbnQuZGVzdHJveT8uKClcbiAgICB9XG4gICAgc3dpcGVSZWYuY3VycmVudCA9IG51bGxcbiAgICBzd2lwZUNsb25lc1JlZi5jdXJyZW50LmZvckVhY2gobGF5ZXIgPT4gamltdU1hcFZpZXc/LnZpZXc/Lm1hcD8ucmVtb3ZlKGxheWVyKSlcbiAgICBzd2lwZUNsb25lc1JlZi5jdXJyZW50ID0gW11cbiAgICBzZXRTd2lwZUFjdGl2ZShmYWxzZSlcbiAgfSwgW2ppbXVNYXBWaWV3XSlcblxuICBjb25zdCBzaG93T25seVN1YmxheWVyID0gKGNvbGxlY3Rpb246IGFueSwgdGFyZ2V0SWQ6IHN0cmluZyk6IGJvb2xlYW4gPT4ge1xuICAgIGxldCBjb2xsZWN0aW9uSGFzVGFyZ2V0ID0gZmFsc2VcbiAgICBjb2xsZWN0aW9uPy5mb3JFYWNoKChpdGVtOiBhbnkpID0+IHtcbiAgICAgIGNvbnN0IGNoaWxkcmVuID0gY2hpbGRyZW5PZihpdGVtKVxuICAgICAgY29uc3QgaGFzVGFyZ2V0ID0gY2hpbGRyZW4/Lmxlbmd0aFxuICAgICAgICA/IHNob3dPbmx5U3VibGF5ZXIoY2hpbGRyZW4sIHRhcmdldElkKVxuICAgICAgICA6IFN0cmluZyhpdGVtLmlkKSA9PT0gdGFyZ2V0SWRcbiAgICAgIGl0ZW0udmlzaWJsZSA9IGhhc1RhcmdldFxuICAgICAgY29sbGVjdGlvbkhhc1RhcmdldCA9IGNvbGxlY3Rpb25IYXNUYXJnZXQgfHwgaGFzVGFyZ2V0XG4gICAgfSlcbiAgICByZXR1cm4gY29sbGVjdGlvbkhhc1RhcmdldFxuICB9XG5cbiAgY29uc3Qgc3RhcnRTd2lwZSA9IGFzeW5jICgpID0+IHtcbiAgICBpZiAoY29tcGFyZUlkcy5sZW5ndGggIT09IDIgfHwgIWppbXVNYXBWaWV3Py52aWV3KSByZXR1cm5cbiAgICBjbG9zZVN3aXBlKClcbiAgICBzZXRTd2lwZUVycm9yKCcnKVxuICAgIHRyeSB7XG4gICAgICBjb25zdCBmaXJzdCA9IGZsaWdodHMuZmluZChpdGVtID0+IGl0ZW0uaWQgPT09IGNvbXBhcmVJZHNbMF0pXG4gICAgICBjb25zdCBzZWNvbmQgPSBmbGlnaHRzLmZpbmQoaXRlbSA9PiBpdGVtLmlkID09PSBjb21wYXJlSWRzWzFdKVxuICAgICAgY29uc3QgZmlyc3RTb3VyY2UgPSBmaXJzdD8ubGF5ZXI/LmxheWVyXG4gICAgICBjb25zdCBzZWNvbmRTb3VyY2UgPSBzZWNvbmQ/LmxheWVyPy5sYXllclxuICAgICAgaWYgKCFmaXJzdCB8fCAhc2Vjb25kIHx8ICFmaXJzdFNvdXJjZT8uY2xvbmUgfHwgIXNlY29uZFNvdXJjZT8uY2xvbmUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdMYXMgY2FwYXMgc2VsZWNjaW9uYWRhcyBubyBwZXJ0ZW5lY2VuIGEgdW4gTWFwSW1hZ2VMYXllciBjb21wYXRpYmxlLicpXG4gICAgICB9XG4gICAgICBjb25zdCBmaXJzdENsb25lID0gZmlyc3RTb3VyY2UuY2xvbmUoKVxuICAgICAgY29uc3Qgc2Vjb25kQ2xvbmUgPSBzZWNvbmRTb3VyY2UuY2xvbmUoKVxuICAgICAgZmlyc3RDbG9uZS50aXRsZSA9IGBDb21wYXJhY2nDs24gQSDCtyAke2ZpcnN0LnBsYWNlfWBcbiAgICAgIHNlY29uZENsb25lLnRpdGxlID0gYENvbXBhcmFjacOzbiBCIMK3ICR7c2Vjb25kLnBsYWNlfWBcbiAgICAgIGF3YWl0IFByb21pc2UuYWxsKFtmaXJzdENsb25lLmxvYWQoKSwgc2Vjb25kQ2xvbmUubG9hZCgpXSlcbiAgICAgIHNob3dPbmx5U3VibGF5ZXIoZmlyc3RDbG9uZS5zdWJsYXllcnMsIGZpcnN0LmlkKVxuICAgICAgc2hvd09ubHlTdWJsYXllcihzZWNvbmRDbG9uZS5zdWJsYXllcnMsIHNlY29uZC5pZClcbiAgICAgIGZpcnN0Q2xvbmUubGlzdE1vZGUgPSAnaGlkZSdcbiAgICAgIHNlY29uZENsb25lLmxpc3RNb2RlID0gJ2hpZGUnXG4gICAgICBqaW11TWFwVmlldy52aWV3Lm1hcC5hZGRNYW55KFtmaXJzdENsb25lLCBzZWNvbmRDbG9uZV0pXG4gICAgICBzd2lwZUNsb25lc1JlZi5jdXJyZW50ID0gW2ZpcnN0Q2xvbmUsIHNlY29uZENsb25lXVxuICAgICAgY29uc3QgW1N3aXBlXSA9IGF3YWl0IGxvYWRBcmNHSVNKU0FQSU1vZHVsZXMoWydlc3JpL3dpZGdldHMvU3dpcGUnXSlcbiAgICAgIGNvbnN0IHN3aXBlID0gbmV3IFN3aXBlKHtcbiAgICAgICAgdmlldzogamltdU1hcFZpZXcudmlldyxcbiAgICAgICAgbGVhZGluZ0xheWVyczogW2ZpcnN0Q2xvbmVdLFxuICAgICAgICB0cmFpbGluZ0xheWVyczogW3NlY29uZENsb25lXSxcbiAgICAgICAgZGlyZWN0aW9uOiAnaG9yaXpvbnRhbCcsXG4gICAgICAgIHBvc2l0aW9uOiA1MFxuICAgICAgfSlcbiAgICAgIGppbXVNYXBWaWV3LnZpZXcudWkuYWRkKHN3aXBlKVxuICAgICAgc3dpcGVSZWYuY3VycmVudCA9IHN3aXBlXG4gICAgICBzZXRTd2lwZUFjdGl2ZSh0cnVlKVxuICAgICAgZmlyc3QubGF5ZXIudmlzaWJsZSA9IGZhbHNlXG4gICAgICBzZWNvbmQubGF5ZXIudmlzaWJsZSA9IGZhbHNlXG4gICAgfSBjYXRjaCAoZXhjZXB0aW9uKSB7XG4gICAgICBjbG9zZVN3aXBlKClcbiAgICAgIHNldFN3aXBlRXJyb3IoZXhjZXB0aW9uIGluc3RhbmNlb2YgRXJyb3IgPyBleGNlcHRpb24ubWVzc2FnZSA6ICdObyBmdWUgcG9zaWJsZSBpbmljaWFyIGxhIGNvbXBhcmFjacOzbiBTd2lwZS4nKVxuICAgIH1cbiAgfVxuXG4gIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiAoKSA9PiB7XG4gICAgaWYgKHN3aXBlUmVmLmN1cnJlbnQgJiYgamltdU1hcFZpZXc/LnZpZXcpIGppbXVNYXBWaWV3LnZpZXcudWkucmVtb3ZlKHN3aXBlUmVmLmN1cnJlbnQpXG4gICAgc3dpcGVSZWYuY3VycmVudD8uZGVzdHJveT8uKClcbiAgICBzd2lwZUNsb25lc1JlZi5jdXJyZW50LmZvckVhY2gobGF5ZXIgPT4gamltdU1hcFZpZXc/LnZpZXc/Lm1hcD8ucmVtb3ZlKGxheWVyKSlcbiAgfSwgW2ppbXVNYXBWaWV3XSlcblxuICBjb25zdCBzZXRMYXllck9wYWNpdHkgPSAoaXRlbTogeyBsYXllcjogYW55IH0sIHZhbHVlOiBudW1iZXIpID0+IHtcbiAgICBpdGVtLmxheWVyLm9wYWNpdHkgPSB2YWx1ZSAvIDEwMFxuICAgIHNldEZsaWdodHMoY3VycmVudCA9PiBbLi4uY3VycmVudF0pXG4gICAgc2V0VmVjdG9ycyhjdXJyZW50ID0+IFsuLi5jdXJyZW50XSlcbiAgfVxuXG4gIGNvbnN0IHRvZ2dsZVZlY3RvciA9IChpdGVtOiBWZWN0b3JJdGVtKSA9PiB7XG4gICAgaXRlbS5sYXllci52aXNpYmxlID0gIWl0ZW0ubGF5ZXIudmlzaWJsZVxuICAgIHNldFZlY3RvcnMoY3VycmVudCA9PiBjdXJyZW50Lm1hcChsYXllciA9PiBsYXllci5pZCA9PT0gaXRlbS5pZCA/IHsgLi4ubGF5ZXIsIHZpc2libGU6IGl0ZW0ubGF5ZXIudmlzaWJsZSB9IDogbGF5ZXIpKVxuICB9XG5cbiAgY29uc3QgY2xlYXJGaWx0ZXJzID0gKCkgPT4geyBzZXRRdWVyeSgnJyk7IHNldFllYXIoJycpOyBzZXRNb250aCgnJykgfVxuICBjb25zdCB1bmNvbmZpZ3VyZWQgPSAhcHJvcHMudXNlTWFwV2lkZ2V0SWRzPy5sZW5ndGhcblxuICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJkcm9uZS1zZWxlY3RvclwiPlxuICAgIHtwcm9wcy51c2VNYXBXaWRnZXRJZHM/LlswXSAmJiA8SmltdU1hcFZpZXdDb21wb25lbnQgdXNlTWFwV2lkZ2V0SWQ9e3Byb3BzLnVzZU1hcFdpZGdldElkc1swXX0gb25BY3RpdmVWaWV3Q2hhbmdlPXtzZXRKaW11TWFwVmlld30gLz59XG4gICAgPGhlYWRlcj5cbiAgICAgIDxkaXY+PHNwYW4+SU3DgUdFTkVTIEHDiVJFQVM8L3NwYW4+PGgyPlZ1ZWxvcyBEcm9uZSBQQU88L2gyPjxwPkV4cGxvcmFjacOzbiB0ZW1wb3JhbCB5IGNvbXBhcmFjacOzbiB2aXN1YWw8L3A+PC9kaXY+XG4gICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiB0aXRsZT1cIkFjdHVhbGl6YXIgY2FwYXNcIiBvbkNsaWNrPXtzY2FuTWFwfSBkaXNhYmxlZD17bG9hZGluZ30+4oa7PC9idXR0b24+XG4gICAgPC9oZWFkZXI+XG5cbiAgICB7dW5jb25maWd1cmVkICYmIDxkaXYgY2xhc3NOYW1lPVwiZHJvbmUtc2VsZWN0b3JfX2VtcHR5XCI+PGk+4oyWPC9pPjxzdHJvbmc+Q29uZmlndXJlIHVuIG1hcGE8L3N0cm9uZz48cD5BYnJhIGxvcyBhanVzdGVzIGRlbCB3aWRnZXQgeSBzZWxlY2Npb25lIGVsIE1hcCBXaWRnZXQuPC9wPjwvZGl2Pn1cbiAgICB7IXVuY29uZmlndXJlZCAmJiBlcnJvciAmJiA8ZGl2IGNsYXNzTmFtZT1cImRyb25lLXNlbGVjdG9yX19hbGVydFwiPjxzdHJvbmc+Tm8gc2UgcHVkbyBjYXJnYXIgZWwgY2F0w6Fsb2dvPC9zdHJvbmc+PHNwYW4+e2Vycm9yfTwvc3Bhbj48YnV0dG9uIG9uQ2xpY2s9e3NjYW5NYXB9PlJlaW50ZW50YXI8L2J1dHRvbj48L2Rpdj59XG5cbiAgICB7IXVuY29uZmlndXJlZCAmJiBncm91cEZvdW5kICYmIDw+XG4gICAgICA8bmF2IGNsYXNzTmFtZT1cImRyb25lLXNlbGVjdG9yX190YWJzXCI+XG4gICAgICAgIDxidXR0b24gY2xhc3NOYW1lPXthY3RpdmVUYWIgPT09ICdpbWFnZXJ5JyA/ICdpcy1hY3RpdmUnIDogJyd9IG9uQ2xpY2s9eygpID0+IHNldEFjdGl2ZVRhYignaW1hZ2VyeScpfT5JbcOhZ2VuZXMgPGI+e2ZsaWdodHMubGVuZ3RofTwvYj48L2J1dHRvbj5cbiAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9e2FjdGl2ZVRhYiA9PT0gJ3ZlY3RvcnMnID8gJ2lzLWFjdGl2ZScgOiAnJ30gb25DbGljaz17KCkgPT4gc2V0QWN0aXZlVGFiKCd2ZWN0b3JzJyl9PkNhcGFzIHZlY3RvcmlhbGVzIDxiPnt2ZWN0b3JzLmxlbmd0aH08L2I+PC9idXR0b24+XG4gICAgICA8L25hdj5cblxuICAgICAge2FjdGl2ZVRhYiA9PT0gJ2ltYWdlcnknICYmIDw+PHNlY3Rpb24gY2xhc3NOYW1lPVwiZHJvbmUtc2VsZWN0b3JfX3Rvb2xzXCI+XG4gICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJkcm9uZS1zZWxlY3Rvcl9fc2VhcmNoXCI+PHNwYW4+4oyVPC9zcGFuPjxpbnB1dCBhcmlhLWxhYmVsPVwiQnVzY2FyIHZ1ZWxvc1wiIHZhbHVlPXtxdWVyeX0gcGxhY2Vob2xkZXI9XCJCdXNjYXIgc2VjdG9yLCB2dWVsbyBvIGZlY2hh4oCmXCIgb25DaGFuZ2U9e2V2ZW50ID0+IHNldFF1ZXJ5KGV2ZW50LnRhcmdldC52YWx1ZSl9IC8+e3F1ZXJ5ICYmIDxidXR0b24gb25DbGljaz17KCkgPT4gc2V0UXVlcnkoJycpfT7DlzwvYnV0dG9uPn08L2xhYmVsPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRyb25lLXNlbGVjdG9yX19maWx0ZXJzXCI+XG4gICAgICAgICAgPHNlbGVjdCBhcmlhLWxhYmVsPVwiQcOxb1wiIHZhbHVlPXt5ZWFyfSBvbkNoYW5nZT17ZXZlbnQgPT4geyBzZXRZZWFyKGV2ZW50LnRhcmdldC52YWx1ZSk7IHNldE1vbnRoKCcnKSB9fT48b3B0aW9uIHZhbHVlPVwiXCI+VG9kb3MgbG9zIGHDsW9zPC9vcHRpb24+e3llYXJzLm1hcCh2YWx1ZSA9PiA8b3B0aW9uIGtleT17dmFsdWV9Pnt2YWx1ZX08L29wdGlvbj4pfTwvc2VsZWN0PlxuICAgICAgICAgIDxzZWxlY3QgYXJpYS1sYWJlbD1cIk1lc1wiIHZhbHVlPXttb250aH0gb25DaGFuZ2U9e2V2ZW50ID0+IHNldE1vbnRoKGV2ZW50LnRhcmdldC52YWx1ZSl9PjxvcHRpb24gdmFsdWU9XCJcIj5Ub2RvcyBsb3MgbWVzZXM8L29wdGlvbj57bW9udGhzLm1hcCh2YWx1ZSA9PiA8b3B0aW9uIGtleT17dmFsdWV9Pnt2YWx1ZX08L29wdGlvbj4pfTwvc2VsZWN0PlxuICAgICAgICAgIDxzZWxlY3QgYXJpYS1sYWJlbD1cIk9yZGVuXCIgdmFsdWU9e3NvcnR9IG9uQ2hhbmdlPXtldmVudCA9PiBzZXRTb3J0KGV2ZW50LnRhcmdldC52YWx1ZSBhcyBTb3J0TW9kZSl9PjxvcHRpb24gdmFsdWU9XCJuZXdlc3RcIj5Nw6FzIHJlY2llbnRlczwvb3B0aW9uPjxvcHRpb24gdmFsdWU9XCJvbGRlc3RcIj5Nw6FzIGFudGlndW9zPC9vcHRpb24+PG9wdGlvbiB2YWx1ZT1cIm5hbWVcIj5Qb3Igc2VjdG9yPC9vcHRpb24+PC9zZWxlY3Q+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRyb25lLXNlbGVjdG9yX19zdW1tYXJ5XCI+PHNwYW4+PHN0cm9uZz57ZmlsdGVyZWQubGVuZ3RofTwvc3Ryb25nPiBkZSB7ZmxpZ2h0cy5sZW5ndGh9IHZ1ZWxvczwvc3Bhbj48c3Bhbj48Yj57dmlzaWJsZUNvdW50fTwvYj4gdmlzaWJsZXM8L3NwYW4+eyhxdWVyeSB8fCB5ZWFyIHx8IG1vbnRoKSAmJiA8YnV0dG9uIG9uQ2xpY2s9e2NsZWFyRmlsdGVyc30+TGltcGlhciBmaWx0cm9zPC9idXR0b24+fTwvZGl2PlxuICAgICAgPC9zZWN0aW9uPlxuXG4gICAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJkcm9uZS1zZWxlY3Rvcl9fYW5hbHlzaXNcIj5cbiAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJkcm9uZS1zZWxlY3Rvcl9fYW5hbHlzaXMtdG9nZ2xlXCIgb25DbGljaz17KCkgPT4gc2V0QW5hbHlzaXNPcGVuKHZhbHVlID0+ICF2YWx1ZSl9PjxzcGFuPuKWpSBSZXN1bWVuIHkgY29tcGFyYWNpw7NuPC9zcGFuPjxiPnthbmFseXNpc09wZW4gPyAn4oiSJyA6ICcrJ308L2I+PC9idXR0b24+XG4gICAgICAgIHthbmFseXNpc09wZW4gJiYgPGRpdiBjbGFzc05hbWU9XCJkcm9uZS1zZWxlY3Rvcl9fYW5hbHlzaXMtYm9keVwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZHJvbmUtc2VsZWN0b3JfX2twaXNcIj48ZGl2PjxzdHJvbmc+e3llYXJzLmZpbHRlcih2YWx1ZSA9PiB2YWx1ZSAhPT0gJ1NpbiBmZWNoYScpLmxlbmd0aH08L3N0cm9uZz48c3Bhbj5Bw7Fvczwvc3Bhbj48L2Rpdj48ZGl2PjxzdHJvbmc+e25ldyBTZXQoZmxpZ2h0cy5tYXAoaXRlbSA9PiBpdGVtLnBsYWNlKSkuc2l6ZX08L3N0cm9uZz48c3Bhbj5TZWN0b3Jlczwvc3Bhbj48L2Rpdj48ZGl2PjxzdHJvbmc+e2NvbXBhcmVJZHMubGVuZ3RofS8yPC9zdHJvbmc+PHNwYW4+Q29tcGFyYXI8L3NwYW4+PC9kaXY+PC9kaXY+XG4gICAgICAgICAgPHA+U2VsZWNjaW9uZSBkb3MgdnVlbG9zIGNvbiDih4QgeSBhY3RpdmUgbGEgY29ydGluYSBTd2lwZS48L3A+XG4gICAgICAgICAge2NvbXBhcmVJZHMubGVuZ3RoID09PSAyICYmIDxkaXYgY2xhc3NOYW1lPVwiZHJvbmUtc2VsZWN0b3JfX3N3aXBlLWNvbnRyb2xzXCI+XG4gICAgICAgICAgICA8c3Bhbj57ZmxpZ2h0cy5maW5kKGl0ZW0gPT4gaXRlbS5pZCA9PT0gY29tcGFyZUlkc1swXSk/LnBsYWNlfTwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuPntmbGlnaHRzLmZpbmQoaXRlbSA9PiBpdGVtLmlkID09PSBjb21wYXJlSWRzWzFdKT8ucGxhY2V9PC9zcGFuPlxuICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXtzd2lwZUFjdGl2ZSA/IGNsb3NlU3dpcGUgOiBzdGFydFN3aXBlfT57c3dpcGVBY3RpdmUgPyAnQ2VycmFyIFN3aXBlJyA6ICdJbmljaWFyIFN3aXBlJ308L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj59XG4gICAgICAgICAge3N3aXBlRXJyb3IgJiYgPGRpdiBjbGFzc05hbWU9XCJkcm9uZS1zZWxlY3Rvcl9faW5saW5lLWVycm9yXCI+e3N3aXBlRXJyb3J9PC9kaXY+fVxuICAgICAgICA8L2Rpdj59XG4gICAgICA8L3NlY3Rpb24+XG5cbiAgICAgIDxtYWluIGNsYXNzTmFtZT1cImRyb25lLXNlbGVjdG9yX19saXN0XCIgYXJpYS1idXN5PXtsb2FkaW5nfT5cbiAgICAgICAge2ZpbHRlcmVkLm1hcChpdGVtID0+IDxhcnRpY2xlIGtleT17aXRlbS5pZH0gY2xhc3NOYW1lPXtgJHtpdGVtLnZpc2libGUgPyAnaXMtdmlzaWJsZScgOiAnJ30gJHtjb21wYXJlSWRzLmluY2x1ZGVzKGl0ZW0uaWQpID8gJ2lzLWNvbXBhcmluZycgOiAnJ31gfT5cbiAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImRyb25lLXNlbGVjdG9yX19leWVcIiB0aXRsZT17aXRlbS52aXNpYmxlID8gJ09jdWx0YXIgdnVlbG8nIDogJ01vc3RyYXIgdnVlbG8nfSBhcmlhLWxhYmVsPXtpdGVtLnZpc2libGUgPyAnT2N1bHRhciB2dWVsbycgOiAnTW9zdHJhciB2dWVsbyd9IG9uQ2xpY2s9eygpID0+IHRvZ2dsZVZpc2liaWxpdHkoaXRlbSl9PntpdGVtLnZpc2libGUgPyAn4peJJyA6ICfil4snfTwvYnV0dG9uPlxuICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiZHJvbmUtc2VsZWN0b3JfX2ZsaWdodFwiIG9uQ2xpY2s9eygpID0+IHRvZ2dsZVZpc2liaWxpdHkoaXRlbSl9PlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZHJvbmUtc2VsZWN0b3JfX2RhdGVcIj57aXRlbS5kYXRlID8gaXRlbS5kYXRlS2V5LnNwbGl0KCctJykucmV2ZXJzZSgpLmpvaW4oJy8nKSA6ICdTSU4gRkVDSEEnfTwvc3Bhbj5cbiAgICAgICAgICAgIDxzdHJvbmc+e2l0ZW0ucGxhY2V9PC9zdHJvbmc+PHNtYWxsIHRpdGxlPXtpdGVtLnRpdGxlfT57aXRlbS5wYXJlbnRUaXRsZX08L3NtYWxsPlxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZHJvbmUtc2VsZWN0b3JfX2FjdGlvbnNcIj48YnV0dG9uIHRpdGxlPVwiQ29tcGFyYXJcIiBjbGFzc05hbWU9e2NvbXBhcmVJZHMuaW5jbHVkZXMoaXRlbS5pZCkgPyAnaXMtYWN0aXZlJyA6ICcnfSBvbkNsaWNrPXsoKSA9PiB0b2dnbGVDb21wYXJlKGl0ZW0pfT7ih4Q8L2J1dHRvbj48YnV0dG9uIHRpdGxlPVwiVHJhbnNwYXJlbmNpYVwiIGNsYXNzTmFtZT17b3BhY2l0eUVkaXRvcklkID09PSBpdGVtLmlkID8gJ2lzLWFjdGl2ZScgOiAnJ30gb25DbGljaz17KCkgPT4gc2V0T3BhY2l0eUVkaXRvcklkKGN1cnJlbnQgPT4gY3VycmVudCA9PT0gaXRlbS5pZCA/ICcnIDogaXRlbS5pZCl9PuKXkDwvYnV0dG9uPjxidXR0b24gdGl0bGU9XCJBY2VyY2FyXCIgb25DbGljaz17KCkgPT4gem9vbVRvKGl0ZW0pfT7ijJY8L2J1dHRvbj48L2Rpdj5cbiAgICAgICAgICB7b3BhY2l0eUVkaXRvcklkID09PSBpdGVtLmlkICYmIDxkaXYgY2xhc3NOYW1lPVwiZHJvbmUtc2VsZWN0b3JfX29wYWNpdHlcIj48c3Bhbj5UcmFuc3BhcmVuY2lhPC9zcGFuPjxpbnB1dCB0eXBlPVwicmFuZ2VcIiBtaW49XCIwXCIgbWF4PVwiMTAwXCIgdmFsdWU9e01hdGgucm91bmQoKDEgLSAoaXRlbS5sYXllci5vcGFjaXR5ID8/IDEpKSAqIDEwMCl9IG9uQ2hhbmdlPXtldmVudCA9PiBzZXRMYXllck9wYWNpdHkoaXRlbSwgMTAwIC0gTnVtYmVyKGV2ZW50LnRhcmdldC52YWx1ZSkpfSAvPjxiPntNYXRoLnJvdW5kKCgxIC0gKGl0ZW0ubGF5ZXIub3BhY2l0eSA/PyAxKSkgKiAxMDApfSU8L2I+PC9kaXY+fVxuICAgICAgICA8L2FydGljbGU+KX1cbiAgICAgICAgeyFsb2FkaW5nICYmICFmaWx0ZXJlZC5sZW5ndGggJiYgPGRpdiBjbGFzc05hbWU9XCJkcm9uZS1zZWxlY3Rvcl9fbm8tcmVzdWx0c1wiPjxzdHJvbmc+U2luIGNvaW5jaWRlbmNpYXM8L3N0cm9uZz48cD5QcnVlYmUgb3RyYSBmZWNoYSBvIHTDqXJtaW5vIGRlIGLDunNxdWVkYS48L3A+PGJ1dHRvbiBvbkNsaWNrPXtjbGVhckZpbHRlcnN9PlJlc3RhYmxlY2VyIGZpbHRyb3M8L2J1dHRvbj48L2Rpdj59XG4gICAgICA8L21haW4+PC8+fVxuXG4gICAgICB7YWN0aXZlVGFiID09PSAndmVjdG9ycycgJiYgPG1haW4gY2xhc3NOYW1lPVwiZHJvbmUtc2VsZWN0b3JfX2xpc3QgZHJvbmUtc2VsZWN0b3JfX3ZlY3Rvci1saXN0XCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZHJvbmUtc2VsZWN0b3JfX3ZlY3Rvci1oZWxwXCI+RW5jaWVuZGEsIGFwYWd1ZSB5IGFqdXN0ZSBsYSB0cmFuc3BhcmVuY2lhIGRlIGxhcyBjYXBhcyBvcGVyYWNpb25hbGVzIGRlbCB3ZWIgbWFwLjwvZGl2PlxuICAgICAgICB7dmVjdG9ycy5tYXAoaXRlbSA9PiA8YXJ0aWNsZSBrZXk9e2l0ZW0uaWR9IGNsYXNzTmFtZT17aXRlbS52aXNpYmxlID8gJ2lzLXZpc2libGUnIDogJyd9PlxuICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiZHJvbmUtc2VsZWN0b3JfX2V5ZVwiIG9uQ2xpY2s9eygpID0+IHRvZ2dsZVZlY3RvcihpdGVtKX0+e2l0ZW0udmlzaWJsZSA/ICfil4knIDogJ+KXiyd9PC9idXR0b24+XG4gICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJkcm9uZS1zZWxlY3Rvcl9fZmxpZ2h0XCIgb25DbGljaz17KCkgPT4gdG9nZ2xlVmVjdG9yKGl0ZW0pfT48c3Ryb25nPntpdGVtLnRpdGxlfTwvc3Ryb25nPjxzbWFsbD57aXRlbS50eXBlfTwvc21hbGw+PC9idXR0b24+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkcm9uZS1zZWxlY3Rvcl9fYWN0aW9uc1wiPjxidXR0b24gdGl0bGU9XCJUcmFuc3BhcmVuY2lhXCIgY2xhc3NOYW1lPXtvcGFjaXR5RWRpdG9ySWQgPT09IGB2LSR7aXRlbS5pZH1gID8gJ2lzLWFjdGl2ZScgOiAnJ30gb25DbGljaz17KCkgPT4gc2V0T3BhY2l0eUVkaXRvcklkKGN1cnJlbnQgPT4gY3VycmVudCA9PT0gYHYtJHtpdGVtLmlkfWAgPyAnJyA6IGB2LSR7aXRlbS5pZH1gKX0+4peQPC9idXR0b24+PC9kaXY+XG4gICAgICAgICAge29wYWNpdHlFZGl0b3JJZCA9PT0gYHYtJHtpdGVtLmlkfWAgJiYgPGRpdiBjbGFzc05hbWU9XCJkcm9uZS1zZWxlY3Rvcl9fb3BhY2l0eVwiPjxzcGFuPlRyYW5zcGFyZW5jaWE8L3NwYW4+PGlucHV0IHR5cGU9XCJyYW5nZVwiIG1pbj1cIjBcIiBtYXg9XCIxMDBcIiB2YWx1ZT17TWF0aC5yb3VuZCgoMSAtIChpdGVtLmxheWVyLm9wYWNpdHkgPz8gMSkpICogMTAwKX0gb25DaGFuZ2U9e2V2ZW50ID0+IHNldExheWVyT3BhY2l0eShpdGVtLCAxMDAgLSBOdW1iZXIoZXZlbnQudGFyZ2V0LnZhbHVlKSl9IC8+PGI+e01hdGgucm91bmQoKDEgLSAoaXRlbS5sYXllci5vcGFjaXR5ID8/IDEpKSAqIDEwMCl9JTwvYj48L2Rpdj59XG4gICAgICAgIDwvYXJ0aWNsZT4pfVxuICAgICAgPC9tYWluPn1cbiAgICA8Lz59XG4gICAge2xvYWRpbmcgJiYgPGRpdiBjbGFzc05hbWU9XCJkcm9uZS1zZWxlY3Rvcl9fbG9hZGluZ1wiPjxpPjwvaT48c3Bhbj5BY3R1YWxpemFuZG8gdnVlbG9z4oCmPC9zcGFuPjwvZGl2Pn1cbiAgICA8Zm9vdGVyPjxzcGFuIGNsYXNzTmFtZT17Z3JvdXBGb3VuZCA/ICdpcy1yZWFkeScgOiAnJ30+PC9zcGFuPntncm91cEZvdW5kID8gJ0NhdMOhbG9nbyBjb25lY3RhZG8gYWwgbWFwYScgOiAnRXNwZXJhbmRvIGNhdMOhbG9nbyd9PC9mb290ZXI+XG4gIDwvZGl2PlxufVxuXG5leHBvcnQgZGVmYXVsdCBXaWRnZXRcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==