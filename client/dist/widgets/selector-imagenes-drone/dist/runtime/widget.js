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
___CSS_LOADER_EXPORT___.push([module.id, ".drone-selector {\n  --teal: #087f86;\n  --navy: #18394b;\n  --line: #dce5e9;\n  --muted: #718793;\n  position: relative;\n  display: flex;\n  height: 100%;\n  min-height: 360px;\n  flex-direction: column;\n  overflow: hidden;\n  color: #334f5f;\n  background: #f6f8f9;\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif; }\n  .drone-selector * {\n    box-sizing: border-box; }\n  .drone-selector header {\n    display: flex;\n    padding: 20px 20px 17px;\n    flex: 0 0 auto;\n    align-items: flex-start;\n    justify-content: space-between;\n    border-bottom: 1px solid var(--line);\n    background: #fff; }\n    .drone-selector header span {\n      color: var(--teal);\n      font-size: 9px;\n      font-weight: 800;\n      letter-spacing: .14em; }\n    .drone-selector header h2 {\n      margin: 3px 0 1px;\n      color: var(--navy);\n      font-size: 21px;\n      line-height: 1.15; }\n    .drone-selector header p {\n      margin: 0;\n      color: var(--muted);\n      font-size: 10px; }\n    .drone-selector header button {\n      width: 34px;\n      height: 34px;\n      border: 1px solid #c8d6dc;\n      border-radius: 7px;\n      color: var(--teal);\n      background: #fff;\n      cursor: pointer;\n      font-size: 19px; }\n    .drone-selector header button:hover {\n      border-color: var(--teal);\n      background: #f0fafa; }\n  .drone-selector__tools {\n    padding: 13px 16px 10px;\n    flex: 0 0 auto;\n    border-bottom: 1px solid var(--line);\n    background: #fff; }\n  .drone-selector__search {\n    display: flex;\n    height: 38px;\n    padding: 0 10px;\n    align-items: center;\n    gap: 7px;\n    border: 1px solid #bdcdd4;\n    border-radius: 7px;\n    background: #fff; }\n    .drone-selector__search span {\n      color: #69818d;\n      font-size: 19px; }\n    .drone-selector__search input {\n      min-width: 0;\n      height: 100%;\n      flex: 1;\n      border: 0;\n      outline: 0;\n      color: #294757;\n      background: transparent;\n      font-size: 12px; }\n    .drone-selector__search button {\n      border: 0;\n      color: #7a8d97;\n      background: none;\n      cursor: pointer;\n      font-size: 18px; }\n    .drone-selector__search:focus-within {\n      border-color: var(--teal);\n      box-shadow: 0 0 0 3px rgba(8, 127, 134, 0.1); }\n  .drone-selector__filters {\n    display: grid;\n    grid-template-columns: 1fr 1fr 1.05fr;\n    gap: 6px;\n    margin-top: 8px; }\n    .drone-selector__filters select {\n      min-width: 0;\n      height: 32px;\n      padding: 0 5px;\n      border: 1px solid #ccd9de;\n      border-radius: 5px;\n      color: #496573;\n      background: #fbfcfc;\n      font-size: 9px; }\n  .drone-selector__summary {\n    display: flex;\n    min-height: 26px;\n    padding-top: 9px;\n    align-items: center;\n    gap: 12px;\n    color: #788d97;\n    font-size: 9px; }\n    .drone-selector__summary strong {\n      color: var(--navy);\n      font-size: 12px; }\n    .drone-selector__summary b {\n      color: var(--teal); }\n    .drone-selector__summary button {\n      margin-left: auto;\n      padding: 0;\n      border: 0;\n      color: var(--teal);\n      background: none;\n      cursor: pointer;\n      font-size: 9px;\n      font-weight: 700; }\n  .drone-selector__analysis {\n    flex: 0 0 auto;\n    border-bottom: 1px solid var(--line);\n    background: #f0f5f6; }\n  .drone-selector__analysis-toggle {\n    display: flex;\n    width: 100%;\n    min-height: 34px;\n    padding: 0 16px;\n    align-items: center;\n    justify-content: space-between;\n    border: 0;\n    color: #41616e;\n    background: transparent;\n    cursor: pointer;\n    font-size: 10px;\n    font-weight: 700; }\n  .drone-selector__analysis-body {\n    padding: 0 16px 12px; }\n    .drone-selector__analysis-body > p {\n      margin: 8px 0 0;\n      color: #768a94;\n      font-size: 9px; }\n  .drone-selector__kpis {\n    display: grid;\n    grid-template-columns: repeat(3, 1fr);\n    gap: 6px; }\n    .drone-selector__kpis div {\n      padding: 8px;\n      border: 1px solid #d9e5e8;\n      border-radius: 6px;\n      background: #fff;\n      text-align: center; }\n    .drone-selector__kpis strong, .drone-selector__kpis span {\n      display: block; }\n    .drone-selector__kpis strong {\n      color: var(--teal);\n      font-size: 16px; }\n    .drone-selector__kpis span {\n      color: #82949c;\n      font-size: 8px;\n      text-transform: uppercase; }\n  .drone-selector__compare {\n    display: grid;\n    grid-template-columns: minmax(0, 1fr) 90px minmax(0, 1fr);\n    margin-top: 9px;\n    align-items: center;\n    gap: 6px; }\n    .drone-selector__compare span {\n      overflow: hidden;\n      color: #405f6c;\n      font-size: 8px;\n      text-overflow: ellipsis;\n      white-space: nowrap; }\n    .drone-selector__compare span:last-child {\n      text-align: right; }\n    .drone-selector__compare input {\n      width: 100%;\n      accent-color: var(--teal); }\n  .drone-selector__list {\n    min-height: 0;\n    flex: 1 1 auto;\n    overflow: auto;\n    background: #fff; }\n  .drone-selector article {\n    position: relative;\n    display: grid;\n    min-height: 72px;\n    grid-template-columns: 35px minmax(0, 1fr) auto;\n    align-items: center;\n    border-bottom: 1px solid #e2e9ec;\n    background: #fff;\n    transition: background .15s, box-shadow .15s; }\n    .drone-selector article::before {\n      position: absolute;\n      top: 0;\n      bottom: 0;\n      left: 0;\n      width: 4px;\n      background: transparent;\n      content: \"\"; }\n    .drone-selector article:hover {\n      background: #f7fafb; }\n    .drone-selector article.is-visible {\n      background: #edf8f8; }\n      .drone-selector article.is-visible::before {\n        background: var(--teal); }\n    .drone-selector article.is-comparing {\n      box-shadow: inset 0 0 0 1px #e7a93d; }\n  .drone-selector__eye {\n    width: 30px;\n    height: 100%;\n    border: 0;\n    color: #92a4ac;\n    background: transparent;\n    cursor: pointer;\n    font-size: 16px; }\n  .is-visible .drone-selector__eye {\n    color: var(--teal); }\n  .drone-selector__flight {\n    display: flex;\n    min-width: 0;\n    padding: 10px 3px;\n    flex-direction: column;\n    align-items: flex-start;\n    border: 0;\n    color: inherit;\n    background: transparent;\n    cursor: pointer;\n    text-align: left; }\n    .drone-selector__flight strong {\n      width: 100%;\n      overflow: hidden;\n      color: #294958;\n      font-size: 12px;\n      line-height: 1.25;\n      text-overflow: ellipsis;\n      white-space: nowrap; }\n    .drone-selector__flight small {\n      width: 100%;\n      margin-top: 3px;\n      overflow: hidden;\n      color: #84969f;\n      font-size: 8px;\n      text-overflow: ellipsis;\n      white-space: nowrap; }\n  .drone-selector__date {\n    margin-bottom: 3px;\n    color: var(--teal);\n    font-size: 8px;\n    font-weight: 750;\n    letter-spacing: .06em; }\n  .drone-selector__actions {\n    display: flex;\n    padding-right: 8px;\n    gap: 2px; }\n    .drone-selector__actions button {\n      display: grid;\n      width: 27px;\n      height: 27px;\n      place-items: center;\n      border: 0;\n      border-radius: 5px;\n      color: #6f858f;\n      background: transparent;\n      cursor: pointer;\n      font-size: 13px; }\n    .drone-selector__actions button:hover, .drone-selector__actions button.is-active {\n      color: var(--teal);\n      background: #dff1f1; }\n    .drone-selector__actions button.is-active {\n      color: #a76b00;\n      background: #fff1d8; }\n  .drone-selector__empty, .drone-selector__no-results {\n    display: flex;\n    padding: 45px 25px;\n    flex: 1;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n    color: #7c9099;\n    text-align: center; }\n    .drone-selector__empty i, .drone-selector__no-results i {\n      color: var(--teal);\n      font-size: 30px;\n      font-style: normal; }\n    .drone-selector__empty strong, .drone-selector__no-results strong {\n      margin-top: 8px;\n      color: var(--navy);\n      font-size: 14px; }\n    .drone-selector__empty p, .drone-selector__no-results p {\n      max-width: 260px;\n      margin: 5px 0 13px;\n      font-size: 10px; }\n    .drone-selector__empty button, .drone-selector__no-results button {\n      padding: 7px 11px;\n      border: 1px solid var(--teal);\n      border-radius: 5px;\n      color: var(--teal);\n      background: #fff;\n      cursor: pointer;\n      font-size: 10px; }\n  .drone-selector__alert {\n    margin: 16px;\n    padding: 14px;\n    border: 1px solid #e7b6b6;\n    border-radius: 7px;\n    color: #8b3d3d;\n    background: #fff4f4; }\n    .drone-selector__alert strong, .drone-selector__alert span {\n      display: block; }\n    .drone-selector__alert strong {\n      font-size: 12px; }\n    .drone-selector__alert span {\n      margin-top: 3px;\n      font-size: 10px; }\n    .drone-selector__alert button {\n      margin-top: 9px;\n      border: 0;\n      color: #8b3d3d;\n      background: none;\n      cursor: pointer;\n      font-size: 10px;\n      font-weight: 700; }\n  .drone-selector__loading {\n    position: absolute;\n    z-index: 5;\n    right: 12px;\n    bottom: 31px;\n    display: flex;\n    padding: 7px 10px;\n    align-items: center;\n    gap: 7px;\n    border: 1px solid #c9dadd;\n    border-radius: 20px;\n    color: #506c78;\n    background: rgba(255, 255, 255, 0.95);\n    box-shadow: 0 4px 12px rgba(30, 60, 70, 0.12);\n    font-size: 9px; }\n    .drone-selector__loading i {\n      width: 12px;\n      height: 12px;\n      border: 2px solid #c6dddd;\n      border-top-color: var(--teal);\n      border-radius: 50%;\n      animation: drone-spin .75s linear infinite; }\n  .drone-selector footer {\n    display: flex;\n    min-height: 28px;\n    padding: 0 16px;\n    flex: 0 0 auto;\n    align-items: center;\n    gap: 6px;\n    border-top: 1px solid var(--line);\n    color: #82949c;\n    background: #fafcfc;\n    font-size: 8px; }\n    .drone-selector footer span {\n      width: 6px;\n      height: 6px;\n      border-radius: 50%;\n      background: #b0bcc1; }\n    .drone-selector footer span.is-ready {\n      background: #2a9b73;\n      box-shadow: 0 0 0 3px rgba(42, 155, 115, 0.12); }\n\n@keyframes drone-spin {\n  to {\n    transform: rotate(360deg); } }\n\n@media (max-width: 350px) {\n  .drone-selector__filters {\n    grid-template-columns: 1fr 1fr; }\n    .drone-selector__filters select:last-child {\n      grid-column: 1 / -1; }\n  .drone-selector__actions button:first-child {\n    display: none; } }\n", "",{"version":3,"sources":["webpack://./your-extensions/widgets/selector-imagenes-drone/src/runtime/style.scss"],"names":[],"mappings":"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","sourcesContent":[".drone-selector {\n  --teal: #087f86; --navy: #18394b; --line: #dce5e9; --muted: #718793;\n  position: relative; display: flex; height: 100%; min-height: 360px; flex-direction: column; overflow: hidden;\n  color: #334f5f; background: #f6f8f9; font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif;\n  * { box-sizing: border-box; }\n  header { display: flex; padding: 20px 20px 17px; flex: 0 0 auto; align-items: flex-start; justify-content: space-between; border-bottom: 1px solid var(--line); background: #fff;\n    span { color: var(--teal); font-size: 9px; font-weight: 800; letter-spacing: .14em; }\n    h2 { margin: 3px 0 1px; color: var(--navy); font-size: 21px; line-height: 1.15; }\n    p { margin: 0; color: var(--muted); font-size: 10px; }\n    button { width: 34px; height: 34px; border: 1px solid #c8d6dc; border-radius: 7px; color: var(--teal); background: #fff; cursor: pointer; font-size: 19px; }\n    button:hover { border-color: var(--teal); background: #f0fafa; }\n  }\n  &__tools { padding: 13px 16px 10px; flex: 0 0 auto; border-bottom: 1px solid var(--line); background: #fff; }\n  &__search { display: flex; height: 38px; padding: 0 10px; align-items: center; gap: 7px; border: 1px solid #bdcdd4; border-radius: 7px; background: #fff;\n    span { color: #69818d; font-size: 19px; }\n    input { min-width: 0; height: 100%; flex: 1; border: 0; outline: 0; color: #294757; background: transparent; font-size: 12px; }\n    button { border: 0; color: #7a8d97; background: none; cursor: pointer; font-size: 18px; }\n    &:focus-within { border-color: var(--teal); box-shadow: 0 0 0 3px rgba(8,127,134,.1); }\n  }\n  &__filters { display: grid; grid-template-columns: 1fr 1fr 1.05fr; gap: 6px; margin-top: 8px;\n    select { min-width: 0; height: 32px; padding: 0 5px; border: 1px solid #ccd9de; border-radius: 5px; color: #496573; background: #fbfcfc; font-size: 9px; }\n  }\n  &__summary { display: flex; min-height: 26px; padding-top: 9px; align-items: center; gap: 12px; color: #788d97; font-size: 9px;\n    strong { color: var(--navy); font-size: 12px; }\n    b { color: var(--teal); }\n    button { margin-left: auto; padding: 0; border: 0; color: var(--teal); background: none; cursor: pointer; font-size: 9px; font-weight: 700; }\n  }\n  &__analysis { flex: 0 0 auto; border-bottom: 1px solid var(--line); background: #f0f5f6; }\n  &__analysis-toggle { display: flex; width: 100%; min-height: 34px; padding: 0 16px; align-items: center; justify-content: space-between; border: 0; color: #41616e; background: transparent; cursor: pointer; font-size: 10px; font-weight: 700; }\n  &__analysis-body { padding: 0 16px 12px;\n    > p { margin: 8px 0 0; color: #768a94; font-size: 9px; }\n  }\n  &__kpis { display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px;\n    div { padding: 8px; border: 1px solid #d9e5e8; border-radius: 6px; background: #fff; text-align: center; }\n    strong, span { display: block; }\n    strong { color: var(--teal); font-size: 16px; }\n    span { color: #82949c; font-size: 8px; text-transform: uppercase; }\n  }\n  &__compare { display: grid; grid-template-columns: minmax(0,1fr) 90px minmax(0,1fr); margin-top: 9px; align-items: center; gap: 6px;\n    span { overflow: hidden; color: #405f6c; font-size: 8px; text-overflow: ellipsis; white-space: nowrap; }\n    span:last-child { text-align: right; }\n    input { width: 100%; accent-color: var(--teal); }\n  }\n  &__list { min-height: 0; flex: 1 1 auto; overflow: auto; background: #fff; }\n  article { position: relative; display: grid; min-height: 72px; grid-template-columns: 35px minmax(0,1fr) auto; align-items: center; border-bottom: 1px solid #e2e9ec; background: #fff; transition: background .15s, box-shadow .15s;\n    &::before { position: absolute; top: 0; bottom: 0; left: 0; width: 4px; background: transparent; content: \"\"; }\n    &:hover { background: #f7fafb; }\n    &.is-visible { background: #edf8f8; &::before { background: var(--teal); } }\n    &.is-comparing { box-shadow: inset 0 0 0 1px #e7a93d; }\n  }\n  &__eye { width: 30px; height: 100%; border: 0; color: #92a4ac; background: transparent; cursor: pointer; font-size: 16px; }\n  .is-visible &__eye { color: var(--teal); }\n  &__flight { display: flex; min-width: 0; padding: 10px 3px; flex-direction: column; align-items: flex-start; border: 0; color: inherit; background: transparent; cursor: pointer; text-align: left;\n    strong { width: 100%; overflow: hidden; color: #294958; font-size: 12px; line-height: 1.25; text-overflow: ellipsis; white-space: nowrap; }\n    small { width: 100%; margin-top: 3px; overflow: hidden; color: #84969f; font-size: 8px; text-overflow: ellipsis; white-space: nowrap; }\n  }\n  &__date { margin-bottom: 3px; color: var(--teal); font-size: 8px; font-weight: 750; letter-spacing: .06em; }\n  &__actions { display: flex; padding-right: 8px; gap: 2px;\n    button { display: grid; width: 27px; height: 27px; place-items: center; border: 0; border-radius: 5px; color: #6f858f; background: transparent; cursor: pointer; font-size: 13px; }\n    button:hover, button.is-active { color: var(--teal); background: #dff1f1; }\n    button.is-active { color: #a76b00; background: #fff1d8; }\n  }\n  &__empty, &__no-results { display: flex; padding: 45px 25px; flex: 1; flex-direction: column; align-items: center; justify-content: center; color: #7c9099; text-align: center;\n    i { color: var(--teal); font-size: 30px; font-style: normal; }\n    strong { margin-top: 8px; color: var(--navy); font-size: 14px; }\n    p { max-width: 260px; margin: 5px 0 13px; font-size: 10px; }\n    button { padding: 7px 11px; border: 1px solid var(--teal); border-radius: 5px; color: var(--teal); background: #fff; cursor: pointer; font-size: 10px; }\n  }\n  &__alert { margin: 16px; padding: 14px; border: 1px solid #e7b6b6; border-radius: 7px; color: #8b3d3d; background: #fff4f4;\n    strong, span { display: block; }\n    strong { font-size: 12px; } span { margin-top: 3px; font-size: 10px; }\n    button { margin-top: 9px; border: 0; color: #8b3d3d; background: none; cursor: pointer; font-size: 10px; font-weight: 700; }\n  }\n  &__loading { position: absolute; z-index: 5; right: 12px; bottom: 31px; display: flex; padding: 7px 10px; align-items: center; gap: 7px; border: 1px solid #c9dadd; border-radius: 20px; color: #506c78; background: rgba(255,255,255,.95); box-shadow: 0 4px 12px rgba(30,60,70,.12); font-size: 9px;\n    i { width: 12px; height: 12px; border: 2px solid #c6dddd; border-top-color: var(--teal); border-radius: 50%; animation: drone-spin .75s linear infinite; }\n  }\n  footer { display: flex; min-height: 28px; padding: 0 16px; flex: 0 0 auto; align-items: center; gap: 6px; border-top: 1px solid var(--line); color: #82949c; background: #fafcfc; font-size: 8px;\n    span { width: 6px; height: 6px; border-radius: 50%; background: #b0bcc1; }\n    span.is-ready { background: #2a9b73; box-shadow: 0 0 0 3px rgba(42,155,115,.12); }\n  }\n}\n\n@keyframes drone-spin { to { transform: rotate(360deg); } }\n\n@media (max-width: 350px) {\n  .drone-selector__filters { grid-template-columns: 1fr 1fr; select:last-child { grid-column: 1 / -1; } }\n  .drone-selector__actions button:first-child { display: none; }\n}\n"],"sourceRoot":""}]);
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
    var _a;
    const result = [];
    const visit = (layer, parent) => {
        if ((layer === null || layer === void 0 ? void 0 : layer.type) === 'group' && layer.layers) {
            layer.layers.forEach((child) => visit(child, layer.title || parent));
            return;
        }
        if (!layer)
            return;
        result.push(Object.assign({ id: String(layer.id || layer.uid || `${parent}-${layer.title}`), title: String(layer.title || 'Vuelo sin nombre'), parentTitle: parent, layer, visible: Boolean(layer.visible) }, (0,_drone_utils__WEBPACK_IMPORTED_MODULE_2__.parseFlightName)(String(layer.title || ''))));
    };
    (_a = group.layers) === null || _a === void 0 ? void 0 : _a.forEach((layer) => visit(layer, group.title || parentTitle));
    return result;
};
const findGroup = (map, title) => {
    var _a, _b;
    const path = String(title || 'Vuelos Drone PAO/Imagenes de Drone')
        .split(/[/>]/).map(part => part.trim()).filter(Boolean);
    let collection = map === null || map === void 0 ? void 0 : map.layers;
    let pathMatch = null;
    for (const segment of path) {
        pathMatch = ((_a = collection === null || collection === void 0 ? void 0 : collection.find) === null || _a === void 0 ? void 0 : _a.call(collection, (layer) => (layer === null || layer === void 0 ? void 0 : layer.type) === 'group' && (0,_drone_utils__WEBPACK_IMPORTED_MODULE_2__.matchesGroupTitle)(layer.title, segment))) || null;
        if (!pathMatch)
            break;
        collection = pathMatch.layers;
    }
    if (pathMatch && path.length)
        return pathMatch;
    const leafTitle = path[path.length - 1] || title;
    let match = null;
    (_b = map === null || map === void 0 ? void 0 : map.allLayers) === null || _b === void 0 ? void 0 : _b.forEach((layer) => {
        if (!match && (layer === null || layer === void 0 ? void 0 : layer.type) === 'group' && (0,_drone_utils__WEBPACK_IMPORTED_MODULE_2__.matchesGroupTitle)(layer.title, leafTitle))
            match = layer;
    });
    return match;
};
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
    const [compareValue, setCompareValue] = jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.useState(50);
    const handles = jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.useRef([]);
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
            const configuredTitle = props.config.groupTitle || 'Vuelos Drone PAO/Imagenes de Drone';
            const group = findGroup(jimuMapView.view.map, configuredTitle);
            setGroupFound(Boolean(group));
            if (!group) {
                setFlights([]);
                setError(`No se encontró el grupo “${configuredTitle}” en el mapa.`);
                return;
            }
            const items = collectLeafLayers(group, configuredTitle);
            setFlights(items);
            items.forEach(item => {
                var _a;
                if ((_a = item.layer) === null || _a === void 0 ? void 0 : _a.watch) {
                    handles.current.push(item.layer.watch('visible', (visible) => {
                        setFlights(current => current.map(flight => flight.id === item.id ? Object.assign(Object.assign({}, flight), { visible }) : flight));
                    }));
                }
            });
            if ((_f = group.layers) === null || _f === void 0 ? void 0 : _f.on)
                handles.current.push(group.layers.on('change', scanMap));
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
            const target = item.layer.fullExtent || item.layer.extent;
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
    jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.useEffect(() => {
        if (compareIds.length !== 2)
            return;
        const first = flights.find(item => item.id === compareIds[0]);
        const second = flights.find(item => item.id === compareIds[1]);
        if (first === null || first === void 0 ? void 0 : first.layer) {
            first.layer.visible = true;
            first.layer.opacity = (100 - compareValue) / 100;
        }
        if (second === null || second === void 0 ? void 0 : second.layer) {
            second.layer.visible = true;
            second.layer.opacity = compareValue / 100;
        }
    }, [compareIds, compareValue, flights]);
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
                    jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement("p", null, "Use el bot\u00F3n \u21C4 de dos vuelos para compararlos por transparencia."),
                    compareIds.length === 2 && jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement("div", { className: "drone-selector__compare" },
                        jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement("span", null, (_c = flights.find(item => item.id === compareIds[0])) === null || _c === void 0 ? void 0 : _c.place),
                        jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement("input", { type: "range", min: "0", max: "100", value: compareValue, onChange: event => setCompareValue(Number(event.target.value)) }),
                        jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement("span", null, (_d = flights.find(item => item.id === compareIds[1])) === null || _d === void 0 ? void 0 : _d.place)))),
            jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement("main", { className: "drone-selector__list", "aria-busy": loading },
                filtered.map(item => jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement("article", { key: item.id, className: `${item.visible ? 'is-visible' : ''} ${compareIds.includes(item.id) ? 'is-comparing' : ''}` },
                    jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement("button", { className: "drone-selector__eye", title: item.visible ? 'Ocultar vuelo' : 'Mostrar vuelo', "aria-label": item.visible ? 'Ocultar vuelo' : 'Mostrar vuelo', onClick: () => toggleVisibility(item) }, item.visible ? '◉' : '○'),
                    jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement("button", { className: "drone-selector__flight", onClick: () => toggleVisibility(item) },
                        jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement("span", { className: "drone-selector__date" }, item.date ? item.dateKey.split('-').reverse().join('/') : 'SIN FECHA'),
                        jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement("strong", null, item.place),
                        jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement("small", { title: item.title }, item.parentTitle)),
                    jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement("div", { className: "drone-selector__actions" },
                        jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement("button", { title: "Comparar", className: compareIds.includes(item.id) ? 'is-active' : '', onClick: () => toggleCompare(item) }, "\u21C4"),
                        jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement("button", { title: "Acercar", onClick: () => zoomTo(item) }, "\u2316")))),
                !loading && !filtered.length && jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement("div", { className: "drone-selector__no-results" },
                    jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement("strong", null, "Sin coincidencias"),
                    jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement("p", null, "Pruebe otra fecha o t\u00E9rmino de b\u00FAsqueda."),
                    jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement("button", { onClick: clearFilters }, "Restablecer filtros")))),
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lkZ2V0cy9zZWxlY3Rvci1pbWFnZW5lcy1kcm9uZS9kaXN0L3J1bnRpbWUvd2lkZ2V0LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDc0g7QUFDakI7QUFDckcsOEJBQThCLG1GQUEyQixDQUFDLDRGQUFxQztBQUMvRjtBQUNBLDJEQUEyRCxvQkFBb0Isb0JBQW9CLG9CQUFvQixxQkFBcUIsdUJBQXVCLGtCQUFrQixpQkFBaUIsc0JBQXNCLDJCQUEyQixxQkFBcUIsbUJBQW1CLHdCQUF3QiwrRUFBK0UsdUJBQXVCLCtCQUErQiw0QkFBNEIsb0JBQW9CLDhCQUE4QixxQkFBcUIsOEJBQThCLHFDQUFxQywyQ0FBMkMseUJBQXlCLG1DQUFtQywyQkFBMkIsdUJBQXVCLHlCQUF5QixnQ0FBZ0MsaUNBQWlDLDBCQUEwQiwyQkFBMkIsd0JBQXdCLDRCQUE0QixnQ0FBZ0Msa0JBQWtCLDRCQUE0QiwwQkFBMEIscUNBQXFDLG9CQUFvQixxQkFBcUIsa0NBQWtDLDJCQUEyQiwyQkFBMkIseUJBQXlCLHdCQUF3QiwwQkFBMEIsMkNBQTJDLGtDQUFrQyw4QkFBOEIsNEJBQTRCLDhCQUE4QixxQkFBcUIsMkNBQTJDLHlCQUF5Qiw2QkFBNkIsb0JBQW9CLG1CQUFtQixzQkFBc0IsMEJBQTBCLGVBQWUsZ0NBQWdDLHlCQUF5Qix5QkFBeUIsb0NBQW9DLHVCQUF1QiwwQkFBMEIscUNBQXFDLHFCQUFxQixxQkFBcUIsZ0JBQWdCLGtCQUFrQixtQkFBbUIsdUJBQXVCLGdDQUFnQywwQkFBMEIsc0NBQXNDLGtCQUFrQix1QkFBdUIseUJBQXlCLHdCQUF3QiwwQkFBMEIsNENBQTRDLGtDQUFrQyx1REFBdUQsOEJBQThCLG9CQUFvQiw0Q0FBNEMsZUFBZSx3QkFBd0IsdUNBQXVDLHFCQUFxQixxQkFBcUIsdUJBQXVCLGtDQUFrQywyQkFBMkIsdUJBQXVCLDRCQUE0Qix5QkFBeUIsOEJBQThCLG9CQUFvQix1QkFBdUIsdUJB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WUFBWSxpQkFBaUIsTUFBTSxnQkFBZ0IsTUFBTSxZQUFZLGVBQWUsTUFBTSxVQUFVLFVBQVUsaUJBQWlCLE1BQU0sVUFBVSxZQUFZLFVBQVUsWUFBWSxlQUFlLE1BQU0sWUFBWSxVQUFVLFVBQVUsWUFBWSxpQkFBaUIsTUFBTSxrQkFBa0IsTUFBTSxVQUFVLGlCQUFpQixNQUFNLFVBQVUsVUFBVSxVQUFVLGlCQUFpQixPQUFPLGFBQWEsVUFBVSxZQUFZLFlBQVksWUFBWSxZQUFZLFlBQVksaUJBQWlCLE9BQU8sY0FBYyxVQUFVLFVBQVUsVUFBVSxVQUFVLFlBQVksZUFBZSxPQUFPLGtCQUFrQixPQUFPLG1CQUFtQixPQUFPLG1CQUFtQixPQUFPLG1CQUFtQixNQUFNLFVBQVUsVUFBVSxVQUFVLFVBQVUsWUFBWSxVQUFVLGVBQWUsTUFBTSxrQkFBa0IsTUFBTSxVQUFVLFVBQVUsWUFBWSxZQUFZLFlBQVksVUFBVSxVQUFVLFlBQVksVUFBVSxpQkFBaUIsTUFBTSxVQUFVLFlBQVksVUFBVSxVQUFVLFlBQVksWUFBWSxpQkFBaUIsTUFBTSxVQUFVLFVBQVUsWUFBWSxVQUFVLFVBQVUsWUFBWSxpQkFBaUIsTUFBTSxZQUFZLFlBQVksVUFBVSxZQUFZLGlCQUFpQixNQUFNLFVBQVUsWUFBWSxlQUFlLE1BQU0sVUFBVSxVQUFVLFVBQVUsWUFBWSxVQUFVLFlBQVksVUFBVSxZQUFZLFVBQVUsZUFBZSxNQUFNLGFBQWEsaUJBQWlCLE1BQU0sV0FBVyxpQkFBaUIsTUFBTSxXQUFXLFlBQVksVUFBVSxZQUFZLFlBQVksWUFBWSxVQUFVLGlCQUFpQixNQUFNLFlBQVksVUFBVSxpQkFBaUIsTUFBTSxVQUFVLFlBQVksZUFBZSxNQUFNLFlBQVksWUFBWSxlQUFlLE1BQU0sWUFBWSxZQUFZLFlBQVksWUFBWSxZQUFZLFVBQVUsZUFBZSxNQUFNLFVBQVUsVUFBVSxZQUFZLFlBQVksVUFBVSxpQkFBaUIsTUFBTSxnQkFBZ0IsTUFBTSxlQUFlLE1BQU0sV0FBVyxlQUFlLE1BQU0sVUFBVSxVQUFVLFVBQVUsWUFBWSxVQUFV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USxLQUFLLEVBQUMsVUFBVSxFQUFDLFNBQVMsRUFBRSxVQUFVLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsYUFBWTt3QkFBQSx1RUFBUSxLQUFLLEVBQUMsU0FBUyxFQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQVksQ0FBTSxDQUN6TyxDQUFDO2dCQUNWLENBQUMsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sSUFBSSxvRUFBSyxTQUFTLEVBQUMsNEJBQTRCO29CQUFDLCtGQUFrQztvQkFBQSwySEFBK0M7b0JBQUEsdUVBQVEsT0FBTyxFQUFFLFlBQVksMEJBQThCLENBQU0sQ0FDMU4sQ0FDTjtRQUNGLE9BQU8sSUFBSSxvRUFBSyxTQUFTLEVBQUMseUJBQXlCO1lBQUMscUVBQU87WUFBQSxxR0FBaUMsQ0FBTTtRQUNuRztZQUFRLHFFQUFNLFNBQVMsRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFTO1lBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDLENBQUMsb0JBQW9CLENBQVUsQ0FDckk7QUFDUixDQUFDO0FBRUQsaUVBQWUsTUFBTSIsInNvdXJjZXMiOlsid2VicGFjazovL2V4Yi1jbGllbnQvLi95b3VyLWV4dGVuc2lvbnMvd2lkZ2V0cy9zZWxlY3Rvci1pbWFnZW5lcy1kcm9uZS9zcmMvcnVudGltZS9zdHlsZS5zY3NzIiwid2VicGFjazovL2V4Yi1jbGllbnQvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL2V4Yi1jbGllbnQvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly9leGItY2xpZW50Ly4veW91ci1leHRlbnNpb25zL3dpZGdldHMvc2VsZWN0b3ItaW1hZ2VuZXMtZHJvbmUvc3JjL3J1bnRpbWUvc3R5bGUuc2Nzcz9lMzZmIiwid2VicGFjazovL2V4Yi1jbGllbnQvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vZXhiLWNsaWVudC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vZXhiLWNsaWVudC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9leGItY2xpZW50Ly4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL2V4Yi1jbGllbnQvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly9leGItY2xpZW50Ly4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vZXhiLWNsaWVudC8uL3lvdXItZXh0ZW5zaW9ucy93aWRnZXRzL3NlbGVjdG9yLWltYWdlbmVzLWRyb25lL3NyYy9ydW50aW1lL2Ryb25lLXV0aWxzLnRzIiwid2VicGFjazovL2V4Yi1jbGllbnQvZXh0ZXJuYWwgc3lzdGVtIFwiamltdS1hcmNnaXNcIiIsIndlYnBhY2s6Ly9leGItY2xpZW50L2V4dGVybmFsIHN5c3RlbSBcImppbXUtY29yZVwiIiwid2VicGFjazovL2V4Yi1jbGllbnQvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZXhiLWNsaWVudC93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9leGItY2xpZW50L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9leGItY2xpZW50L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vZXhiLWNsaWVudC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2V4Yi1jbGllbnQvd2VicGFjay9ydW50aW1lL3B1YmxpY1BhdGgiLCJ3ZWJwYWNrOi8vZXhiLWNsaWVudC93ZWJwYWNrL3J1bnRpbWUvbm9uY2UiLCJ3ZWJwYWNrOi8vZXhiLWNsaWVudC8uL2ppbXUtY29yZS9saWIvc2V0LXB1YmxpYy1wYXRoLnRzIiwid2VicGFjazovL2V4Yi1jbGllbnQvLi95b3VyLWV4dGVuc2lvbnMvd2lkZ2V0cy9zZWxlY3Rvci1pbWFnZW5lcy1kcm9uZS9zcmMvcnVudGltZS93aWRnZXQudHN4Il0sInNvdXJjZXNDb250ZW50IjpbIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiLmRyb25lLXNlbGVjdG9yIHtcXG4gIC0tdGVhbDogIzA4N2Y4NjtcXG4gIC0tbmF2eTogIzE4Mzk0YjtcXG4gIC0tbGluZTogI2RjZTVlOTtcXG4gIC0tbXV0ZWQ6ICM3MTg3OTM7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgbWluLWhlaWdodDogMzYwcHg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gIGNvbG9yOiAjMzM0ZjVmO1xcbiAgYmFja2dyb3VuZDogI2Y2ZjhmOTtcXG4gIGZvbnQtZmFtaWx5OiAtYXBwbGUtc3lzdGVtLCBCbGlua01hY1N5c3RlbUZvbnQsIFxcXCJTZWdvZSBVSVxcXCIsIHNhbnMtc2VyaWY7IH1cXG4gIC5kcm9uZS1zZWxlY3RvciAqIHtcXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDsgfVxcbiAgLmRyb25lLXNlbGVjdG9yIGhlYWRlciB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIHBhZGRpbmc6IDIwcHggMjBweCAxN3B4O1xcbiAgICBmbGV4OiAwIDAgYXV0bztcXG4gICAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XFxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG4gICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIHZhcigtLWxpbmUpO1xcbiAgICBiYWNrZ3JvdW5kOiAjZmZmOyB9XFxuICAgIC5kcm9uZS1zZWxlY3RvciBoZWFkZXIgc3BhbiB7XFxuICAgICAgY29sb3I6IHZhcigtLXRlYWwpO1xcbiAgICAgIGZvbnQtc2l6ZTogOXB4O1xcbiAgICAgIGZvbnQtd2VpZ2h0OiA4MDA7XFxuICAgICAgbGV0dGVyLXNwYWNpbmc6IC4xNGVtOyB9XFxuICAgIC5kcm9uZS1zZWxlY3RvciBoZWFkZXIgaDIge1xcbiAgICAgIG1hcmdpbjogM3B4IDAgMXB4O1xcbiAgICAgIGNvbG9yOiB2YXIoLS1uYXZ5KTtcXG4gICAgICBmb250LXNpemU6IDIxcHg7XFxuICAgICAgbGluZS1oZWlnaHQ6IDEuMTU7IH1cXG4gICAgLmRyb25lLXNlbGVjdG9yIGhlYWRlciBwIHtcXG4gICAgICBtYXJnaW46IDA7XFxuICAgICAgY29sb3I6IHZhcigtLW11dGVkKTtcXG4gICAgICBmb250LXNpemU6IDEwcHg7IH1cXG4gICAgLmRyb25lLXNlbGVjdG9yIGhlYWRlciBidXR0b24ge1xcbiAgICAgIHdpZHRoOiAzNHB4O1xcbiAgICAgIGhlaWdodDogMzRweDtcXG4gICAgICBib3JkZXI6IDFweCBzb2xpZCAjYzhkNmRjO1xcbiAgICAgIGJvcmRlci1yYWRpdXM6IDdweDtcXG4gICAgICBjb2xvcjogdmFyKC0tdGVhbCk7XFxuICAgICAgYmFja2dyb3VuZDogI2ZmZjtcXG4gICAgICBjdXJzb3I6IHBvaW50ZXI7XFxuICAgICAgZm9udC1zaXplOiAxOXB4OyB9XFxuICAgIC5kcm9uZS1zZWxlY3RvciBoZWFkZXIgYnV0dG9uOmhvdmVyIHtcXG4gICAgICBib3JkZXItY29sb3I6IHZhcigtLXRlYWwpO1xcbiAgICAgIGJhY2tncm91bmQ6ICNmMGZhZmE7IH1cXG4gIC5kcm9uZS1zZWxlY3Rvcl9fdG9vbHMge1xcbiAgICBwYWRkaW5nOiAxM3B4IDE2cHggMTBweDtcXG4gICAgZmxleDogMCAwIGF1dG87XFxuICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCB2YXIoLS1saW5lKTtcXG4gICAgYmFja2dyb3VuZDogI2ZmZjsgfVxcbiAgLmRyb25lLXNlbGVjdG9yX19zZWFyY2gge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBoZWlnaHQ6IDM4cHg7XFxuICAgIHBhZGRpbmc6IDAgMTBweDtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgZ2FwOiA3cHg7XFxuICAgIGJvcmRlcjogMXB4IHNvbGlkICNiZGNkZDQ7XFxuICAgIGJvcmRlci1yYWRpdXM6IDdweDtcXG4gICAgYmFja2dyb3VuZDogI2ZmZjsgfVxcbiAgICAuZHJvbmUtc2VsZWN0b3JfX3NlYXJjaCBzcGFuIHtcXG4gICAgICBjb2xvcjogIzY5ODE4ZDtcXG4gICAgICBmb250LXNpemU6IDE5cHg7IH1cXG4gICAgLmRyb25lLXNlbGVjdG9yX19zZWFyY2ggaW5wdXQge1xcbiAgICAgIG1pbi13aWR0aDogMDtcXG4gICAgICBoZWlnaHQ6IDEwMCU7XFxuICAgICAgZmxleDogMTtcXG4gICAgICBib3JkZXI6IDA7XFxuICAgICAgb3V0bGluZTogMDtcXG4gICAgICBjb2xvcjogIzI5NDc1NztcXG4gICAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcXG4gICAgICBmb250LXNpemU6IDEycHg7IH1cXG4gICAgLmRyb25lLXNlbGVjdG9yX19zZWFyY2ggYnV0dG9uIHtcXG4gICAgICBib3JkZXI6IDA7XFxuICAgICAgY29sb3I6ICM3YThkOTc7XFxuICAgICAgYmFja2dyb3VuZDogbm9uZTtcXG4gICAgICBjdXJzb3I6IHBvaW50ZXI7XFxuICAgICAgZm9udC1zaXplOiAxOHB4OyB9XFxuICAgIC5kcm9uZS1zZWxlY3Rvcl9fc2VhcmNoOmZvY3VzLXdpdGhpbiB7XFxuICAgICAgYm9yZGVyLWNvbG9yOiB2YXIoLS10ZWFsKTtcXG4gICAgICBib3gtc2hhZG93OiAwIDAgMCAzcHggcmdiYSg4LCAxMjcsIDEzNCwgMC4xKTsgfVxcbiAgLmRyb25lLXNlbGVjdG9yX19maWx0ZXJzIHtcXG4gICAgZGlzcGxheTogZ3JpZDtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgMWZyIDEuMDVmcjtcXG4gICAgZ2FwOiA2cHg7XFxuICAgIG1hcmdpbi10b3A6IDhweDsgfVxcbiAgICAuZHJvbmUtc2VsZWN0b3JfX2ZpbHRlcnMgc2VsZWN0IHtcXG4gICAgICBtaW4td2lkdGg6IDA7XFxuICAgICAgaGVpZ2h0OiAzMnB4O1xcbiAgICAgIHBhZGRpbmc6IDAgNXB4O1xcbiAgICAgIGJvcmRlcjogMXB4IHNvbGlkICNjY2Q5ZGU7XFxuICAgICAgYm9yZGVyLXJhZGl1czogNXB4O1xcbiAgICAgIGNvbG9yOiAjNDk2NTczO1xcbiAgICAgIGJhY2tncm91bmQ6ICNmYmZjZmM7XFxuICAgICAgZm9udC1zaXplOiA5cHg7IH1cXG4gIC5kcm9uZS1zZWxlY3Rvcl9fc3VtbWFyeSB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIG1pbi1oZWlnaHQ6IDI2cHg7XFxuICAgIHBhZGRpbmctdG9wOiA5cHg7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGdhcDogMTJweDtcXG4gICAgY29sb3I6ICM3ODhkOTc7XFxuICAgIGZvbnQtc2l6ZTogOXB4OyB9XFxuICAgIC5kcm9uZS1zZWxlY3Rvcl9fc3VtbWFyeSBzdHJvbmcge1xcbiAgICAgIGNvbG9yOiB2YXIoLS1uYXZ5KTtcXG4gICAgICBmb250LXNpemU6IDEycHg7IH1cXG4gICAgLmRyb25lLXNlbGVjdG9yX19zdW1tYXJ5IGIge1xcbiAgICAgIGNvbG9yOiB2YXIoLS10ZWFsKTsgfVxcbiAgICAuZHJvbmUtc2VsZWN0b3JfX3N1bW1hcnkgYnV0dG9uIHtcXG4gICAgICBtYXJnaW4tbGVmdDogYXV0bztcXG4gICAgICBwYWRkaW5nOiAwO1xcbiAgICAgIGJvcmRlcjogMDtcXG4gICAgICBjb2xvcjogdmFyKC0tdGVhbCk7XFxuICAgICAgYmFja2dyb3VuZDogbm9uZTtcXG4gICAgICBjdXJzb3I6IHBvaW50ZXI7XFxuICAgICAgZm9udC1zaXplOiA5cHg7XFxuICAgICAgZm9udC13ZWlnaHQ6IDcwMDsgfVxcbiAgLmRyb25lLXNlbGVjdG9yX19hbmFseXNpcyB7XFxuICAgIGZsZXg6IDAgMCBhdXRvO1xcbiAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgdmFyKC0tbGluZSk7XFxuICAgIGJhY2tncm91bmQ6ICNmMGY1ZjY7IH1cXG4gIC5kcm9uZS1zZWxlY3Rvcl9fYW5hbHlzaXMtdG9nZ2xlIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIG1pbi1oZWlnaHQ6IDM0cHg7XFxuICAgIHBhZGRpbmc6IDAgMTZweDtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcbiAgICBib3JkZXI6IDA7XFxuICAgIGNvbG9yOiAjNDE2MTZlO1xcbiAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICBmb250LXNpemU6IDEwcHg7XFxuICAgIGZvbnQtd2VpZ2h0OiA3MDA7IH1cXG4gIC5kcm9uZS1zZWxlY3Rvcl9fYW5hbHlzaXMtYm9keSB7XFxuICAgIHBhZGRpbmc6IDAgMTZweCAxMnB4OyB9XFxuICAgIC5kcm9uZS1zZWxlY3Rvcl9fYW5hbHlzaXMtYm9keSA+IHAge1xcbiAgICAgIG1hcmdpbjogOHB4IDAgMDtcXG4gICAgICBjb2xvcjogIzc2OGE5NDtcXG4gICAgICBmb250LXNpemU6IDlweDsgfVxcbiAgLmRyb25lLXNlbGVjdG9yX19rcGlzIHtcXG4gICAgZGlzcGxheTogZ3JpZDtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMywgMWZyKTtcXG4gICAgZ2FwOiA2cHg7IH1cXG4gICAgLmRyb25lLXNlbGVjdG9yX19rcGlzIGRpdiB7XFxuICAgICAgcGFkZGluZzogOHB4O1xcbiAgICAgIGJvcmRlcjogMXB4IHNvbGlkICNkOWU1ZTg7XFxuICAgICAgYm9yZGVyLXJhZGl1czogNnB4O1xcbiAgICAgIGJhY2tncm91bmQ6ICNmZmY7XFxuICAgICAgdGV4dC1hbGlnbjogY2VudGVyOyB9XFxuICAgIC5kcm9uZS1zZWxlY3Rvcl9fa3BpcyBzdHJvbmcsIC5kcm9uZS1zZWxlY3Rvcl9fa3BpcyBzcGFuIHtcXG4gICAgICBkaXNwbGF5OiBibG9jazsgfVxcbiAgICAuZHJvbmUtc2VsZWN0b3JfX2twaXMgc3Ryb25nIHtcXG4gICAgICBjb2xvcjogdmFyKC0tdGVhbCk7XFxuICAgICAgZm9udC1zaXplOiAxNnB4OyB9XFxuICAgIC5kcm9uZS1zZWxlY3Rvcl9fa3BpcyBzcGFuIHtcXG4gICAgICBjb2xvcjogIzgyOTQ5YztcXG4gICAgICBmb250LXNpemU6IDhweDtcXG4gICAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlOyB9XFxuICAuZHJvbmUtc2VsZWN0b3JfX2NvbXBhcmUge1xcbiAgICBkaXNwbGF5OiBncmlkO1xcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IG1pbm1heCgwLCAxZnIpIDkwcHggbWlubWF4KDAsIDFmcik7XFxuICAgIG1hcmdpbi10b3A6IDlweDtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgZ2FwOiA2cHg7IH1cXG4gICAgLmRyb25lLXNlbGVjdG9yX19jb21wYXJlIHNwYW4ge1xcbiAgICAgIG92ZXJmbG93OiBoaWRkZW47XFxuICAgICAgY29sb3I6ICM0MDVmNmM7XFxuICAgICAgZm9udC1zaXplOiA4cHg7XFxuICAgICAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XFxuICAgICAgd2hpdGUtc3BhY2U6IG5vd3JhcDsgfVxcbiAgICAuZHJvbmUtc2VsZWN0b3JfX2NvbXBhcmUgc3BhbjpsYXN0LWNoaWxkIHtcXG4gICAgICB0ZXh0LWFsaWduOiByaWdodDsgfVxcbiAgICAuZHJvbmUtc2VsZWN0b3JfX2NvbXBhcmUgaW5wdXQge1xcbiAgICAgIHdpZHRoOiAxMDAlO1xcbiAgICAgIGFjY2VudC1jb2xvcjogdmFyKC0tdGVhbCk7IH1cXG4gIC5kcm9uZS1zZWxlY3Rvcl9fbGlzdCB7XFxuICAgIG1pbi1oZWlnaHQ6IDA7XFxuICAgIGZsZXg6IDEgMSBhdXRvO1xcbiAgICBvdmVyZmxvdzogYXV0bztcXG4gICAgYmFja2dyb3VuZDogI2ZmZjsgfVxcbiAgLmRyb25lLXNlbGVjdG9yIGFydGljbGUge1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxuICAgIG1pbi1oZWlnaHQ6IDcycHg7XFxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMzVweCBtaW5tYXgoMCwgMWZyKSBhdXRvO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2UyZTllYztcXG4gICAgYmFja2dyb3VuZDogI2ZmZjtcXG4gICAgdHJhbnNpdGlvbjogYmFja2dyb3VuZCAuMTVzLCBib3gtc2hhZG93IC4xNXM7IH1cXG4gICAgLmRyb25lLXNlbGVjdG9yIGFydGljbGU6OmJlZm9yZSB7XFxuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICAgIHRvcDogMDtcXG4gICAgICBib3R0b206IDA7XFxuICAgICAgbGVmdDogMDtcXG4gICAgICB3aWR0aDogNHB4O1xcbiAgICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xcbiAgICAgIGNvbnRlbnQ6IFxcXCJcXFwiOyB9XFxuICAgIC5kcm9uZS1zZWxlY3RvciBhcnRpY2xlOmhvdmVyIHtcXG4gICAgICBiYWNrZ3JvdW5kOiAjZjdmYWZiOyB9XFxuICAgIC5kcm9uZS1zZWxlY3RvciBhcnRpY2xlLmlzLXZpc2libGUge1xcbiAgICAgIGJhY2tncm91bmQ6ICNlZGY4Zjg7IH1cXG4gICAgICAuZHJvbmUtc2VsZWN0b3IgYXJ0aWNsZS5pcy12aXNpYmxlOjpiZWZvcmUge1xcbiAgICAgICAgYmFja2dyb3VuZDogdmFyKC0tdGVhbCk7IH1cXG4gICAgLmRyb25lLXNlbGVjdG9yIGFydGljbGUuaXMtY29tcGFyaW5nIHtcXG4gICAgICBib3gtc2hhZG93OiBpbnNldCAwIDAgMCAxcHggI2U3YTkzZDsgfVxcbiAgLmRyb25lLXNlbGVjdG9yX19leWUge1xcbiAgICB3aWR0aDogMzBweDtcXG4gICAgaGVpZ2h0OiAxMDAlO1xcbiAgICBib3JkZXI6IDA7XFxuICAgIGNvbG9yOiAjOTJhNGFjO1xcbiAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICBmb250LXNpemU6IDE2cHg7IH1cXG4gIC5pcy12aXNpYmxlIC5kcm9uZS1zZWxlY3Rvcl9fZXllIHtcXG4gICAgY29sb3I6IHZhcigtLXRlYWwpOyB9XFxuICAuZHJvbmUtc2VsZWN0b3JfX2ZsaWdodCB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIG1pbi13aWR0aDogMDtcXG4gICAgcGFkZGluZzogMTBweCAzcHg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xcbiAgICBib3JkZXI6IDA7XFxuICAgIGNvbG9yOiBpbmhlcml0O1xcbiAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICB0ZXh0LWFsaWduOiBsZWZ0OyB9XFxuICAgIC5kcm9uZS1zZWxlY3Rvcl9fZmxpZ2h0IHN0cm9uZyB7XFxuICAgICAgd2lkdGg6IDEwMCU7XFxuICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gICAgICBjb2xvcjogIzI5NDk1ODtcXG4gICAgICBmb250LXNpemU6IDEycHg7XFxuICAgICAgbGluZS1oZWlnaHQ6IDEuMjU7XFxuICAgICAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XFxuICAgICAgd2hpdGUtc3BhY2U6IG5vd3JhcDsgfVxcbiAgICAuZHJvbmUtc2VsZWN0b3JfX2ZsaWdodCBzbWFsbCB7XFxuICAgICAgd2lkdGg6IDEwMCU7XFxuICAgICAgbWFyZ2luLXRvcDogM3B4O1xcbiAgICAgIG92ZXJmbG93OiBoaWRkZW47XFxuICAgICAgY29sb3I6ICM4NDk2OWY7XFxuICAgICAgZm9udC1zaXplOiA4cHg7XFxuICAgICAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XFxuICAgICAgd2hpdGUtc3BhY2U6IG5vd3JhcDsgfVxcbiAgLmRyb25lLXNlbGVjdG9yX19kYXRlIHtcXG4gICAgbWFyZ2luLWJvdHRvbTogM3B4O1xcbiAgICBjb2xvcjogdmFyKC0tdGVhbCk7XFxuICAgIGZvbnQtc2l6ZTogOHB4O1xcbiAgICBmb250LXdlaWdodDogNzUwO1xcbiAgICBsZXR0ZXItc3BhY2luZzogLjA2ZW07IH1cXG4gIC5kcm9uZS1zZWxlY3Rvcl9fYWN0aW9ucyB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIHBhZGRpbmctcmlnaHQ6IDhweDtcXG4gICAgZ2FwOiAycHg7IH1cXG4gICAgLmRyb25lLXNlbGVjdG9yX19hY3Rpb25zIGJ1dHRvbiB7XFxuICAgICAgZGlzcGxheTogZ3JpZDtcXG4gICAgICB3aWR0aDogMjdweDtcXG4gICAgICBoZWlnaHQ6IDI3cHg7XFxuICAgICAgcGxhY2UtaXRlbXM6IGNlbnRlcjtcXG4gICAgICBib3JkZXI6IDA7XFxuICAgICAgYm9yZGVyLXJhZGl1czogNXB4O1xcbiAgICAgIGNvbG9yOiAjNmY4NThmO1xcbiAgICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xcbiAgICAgIGN1cnNvcjogcG9pbnRlcjtcXG4gICAgICBmb250LXNpemU6IDEzcHg7IH1cXG4gICAgLmRyb25lLXNlbGVjdG9yX19hY3Rpb25zIGJ1dHRvbjpob3ZlciwgLmRyb25lLXNlbGVjdG9yX19hY3Rpb25zIGJ1dHRvbi5pcy1hY3RpdmUge1xcbiAgICAgIGNvbG9yOiB2YXIoLS10ZWFsKTtcXG4gICAgICBiYWNrZ3JvdW5kOiAjZGZmMWYxOyB9XFxuICAgIC5kcm9uZS1zZWxlY3Rvcl9fYWN0aW9ucyBidXR0b24uaXMtYWN0aXZlIHtcXG4gICAgICBjb2xvcjogI2E3NmIwMDtcXG4gICAgICBiYWNrZ3JvdW5kOiAjZmZmMWQ4OyB9XFxuICAuZHJvbmUtc2VsZWN0b3JfX2VtcHR5LCAuZHJvbmUtc2VsZWN0b3JfX25vLXJlc3VsdHMge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBwYWRkaW5nOiA0NXB4IDI1cHg7XFxuICAgIGZsZXg6IDE7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICBjb2xvcjogIzdjOTA5OTtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyOyB9XFxuICAgIC5kcm9uZS1zZWxlY3Rvcl9fZW1wdHkgaSwgLmRyb25lLXNlbGVjdG9yX19uby1yZXN1bHRzIGkge1xcbiAgICAgIGNvbG9yOiB2YXIoLS10ZWFsKTtcXG4gICAgICBmb250LXNpemU6IDMwcHg7XFxuICAgICAgZm9udC1zdHlsZTogbm9ybWFsOyB9XFxuICAgIC5kcm9uZS1zZWxlY3Rvcl9fZW1wdHkgc3Ryb25nLCAuZHJvbmUtc2VsZWN0b3JfX25vLXJlc3VsdHMgc3Ryb25nIHtcXG4gICAgICBtYXJnaW4tdG9wOiA4cHg7XFxuICAgICAgY29sb3I6IHZhcigtLW5hdnkpO1xcbiAgICAgIGZvbnQtc2l6ZTogMTRweDsgfVxcbiAgICAuZHJvbmUtc2VsZWN0b3JfX2VtcHR5IHAsIC5kcm9uZS1zZWxlY3Rvcl9fbm8tcmVzdWx0cyBwIHtcXG4gICAgICBtYXgtd2lkdGg6IDI2MHB4O1xcbiAgICAgIG1hcmdpbjogNXB4IDAgMTNweDtcXG4gICAgICBmb250LXNpemU6IDEwcHg7IH1cXG4gICAgLmRyb25lLXNlbGVjdG9yX19lbXB0eSBidXR0b24sIC5kcm9uZS1zZWxlY3Rvcl9fbm8tcmVzdWx0cyBidXR0b24ge1xcbiAgICAgIHBhZGRpbmc6IDdweCAxMXB4O1xcbiAgICAgIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLXRlYWwpO1xcbiAgICAgIGJvcmRlci1yYWRpdXM6IDVweDtcXG4gICAgICBjb2xvcjogdmFyKC0tdGVhbCk7XFxuICAgICAgYmFja2dyb3VuZDogI2ZmZjtcXG4gICAgICBjdXJzb3I6IHBvaW50ZXI7XFxuICAgICAgZm9udC1zaXplOiAxMHB4OyB9XFxuICAuZHJvbmUtc2VsZWN0b3JfX2FsZXJ0IHtcXG4gICAgbWFyZ2luOiAxNnB4O1xcbiAgICBwYWRkaW5nOiAxNHB4O1xcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjZTdiNmI2O1xcbiAgICBib3JkZXItcmFkaXVzOiA3cHg7XFxuICAgIGNvbG9yOiAjOGIzZDNkO1xcbiAgICBiYWNrZ3JvdW5kOiAjZmZmNGY0OyB9XFxuICAgIC5kcm9uZS1zZWxlY3Rvcl9fYWxlcnQgc3Ryb25nLCAuZHJvbmUtc2VsZWN0b3JfX2FsZXJ0IHNwYW4ge1xcbiAgICAgIGRpc3BsYXk6IGJsb2NrOyB9XFxuICAgIC5kcm9uZS1zZWxlY3Rvcl9fYWxlcnQgc3Ryb25nIHtcXG4gICAgICBmb250LXNpemU6IDEycHg7IH1cXG4gICAgLmRyb25lLXNlbGVjdG9yX19hbGVydCBzcGFuIHtcXG4gICAgICBtYXJnaW4tdG9wOiAzcHg7XFxuICAgICAgZm9udC1zaXplOiAxMHB4OyB9XFxuICAgIC5kcm9uZS1zZWxlY3Rvcl9fYWxlcnQgYnV0dG9uIHtcXG4gICAgICBtYXJnaW4tdG9wOiA5cHg7XFxuICAgICAgYm9yZGVyOiAwO1xcbiAgICAgIGNvbG9yOiAjOGIzZDNkO1xcbiAgICAgIGJhY2tncm91bmQ6IG5vbmU7XFxuICAgICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICAgIGZvbnQtc2l6ZTogMTBweDtcXG4gICAgICBmb250LXdlaWdodDogNzAwOyB9XFxuICAuZHJvbmUtc2VsZWN0b3JfX2xvYWRpbmcge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHotaW5kZXg6IDU7XFxuICAgIHJpZ2h0OiAxMnB4O1xcbiAgICBib3R0b206IDMxcHg7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIHBhZGRpbmc6IDdweCAxMHB4O1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBnYXA6IDdweDtcXG4gICAgYm9yZGVyOiAxcHggc29saWQgI2M5ZGFkZDtcXG4gICAgYm9yZGVyLXJhZGl1czogMjBweDtcXG4gICAgY29sb3I6ICM1MDZjNzg7XFxuICAgIGJhY2tncm91bmQ6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC45NSk7XFxuICAgIGJveC1zaGFkb3c6IDAgNHB4IDEycHggcmdiYSgzMCwgNjAsIDcwLCAwLjEyKTtcXG4gICAgZm9udC1zaXplOiA5cHg7IH1cXG4gICAgLmRyb25lLXNlbGVjdG9yX19sb2FkaW5nIGkge1xcbiAgICAgIHdpZHRoOiAxMnB4O1xcbiAgICAgIGhlaWdodDogMTJweDtcXG4gICAgICBib3JkZXI6IDJweCBzb2xpZCAjYzZkZGRkO1xcbiAgICAgIGJvcmRlci10b3AtY29sb3I6IHZhcigtLXRlYWwpO1xcbiAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcXG4gICAgICBhbmltYXRpb246IGRyb25lLXNwaW4gLjc1cyBsaW5lYXIgaW5maW5pdGU7IH1cXG4gIC5kcm9uZS1zZWxlY3RvciBmb290ZXIge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBtaW4taGVpZ2h0OiAyOHB4O1xcbiAgICBwYWRkaW5nOiAwIDE2cHg7XFxuICAgIGZsZXg6IDAgMCBhdXRvO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBnYXA6IDZweDtcXG4gICAgYm9yZGVyLXRvcDogMXB4IHNvbGlkIHZhcigtLWxpbmUpO1xcbiAgICBjb2xvcjogIzgyOTQ5YztcXG4gICAgYmFja2dyb3VuZDogI2ZhZmNmYztcXG4gICAgZm9udC1zaXplOiA4cHg7IH1cXG4gICAgLmRyb25lLXNlbGVjdG9yIGZvb3RlciBzcGFuIHtcXG4gICAgICB3aWR0aDogNnB4O1xcbiAgICAgIGhlaWdodDogNnB4O1xcbiAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcXG4gICAgICBiYWNrZ3JvdW5kOiAjYjBiY2MxOyB9XFxuICAgIC5kcm9uZS1zZWxlY3RvciBmb290ZXIgc3Bhbi5pcy1yZWFkeSB7XFxuICAgICAgYmFja2dyb3VuZDogIzJhOWI3MztcXG4gICAgICBib3gtc2hhZG93OiAwIDAgMCAzcHggcmdiYSg0MiwgMTU1LCAxMTUsIDAuMTIpOyB9XFxuXFxuQGtleWZyYW1lcyBkcm9uZS1zcGluIHtcXG4gIHRvIHtcXG4gICAgdHJhbnNmb3JtOiByb3RhdGUoMzYwZGVnKTsgfSB9XFxuXFxuQG1lZGlhIChtYXgtd2lkdGg6IDM1MHB4KSB7XFxuICAuZHJvbmUtc2VsZWN0b3JfX2ZpbHRlcnMge1xcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmciAxZnI7IH1cXG4gICAgLmRyb25lLXNlbGVjdG9yX19maWx0ZXJzIHNlbGVjdDpsYXN0LWNoaWxkIHtcXG4gICAgICBncmlkLWNvbHVtbjogMSAvIC0xOyB9XFxuICAuZHJvbmUtc2VsZWN0b3JfX2FjdGlvbnMgYnV0dG9uOmZpcnN0LWNoaWxkIHtcXG4gICAgZGlzcGxheTogbm9uZTsgfSB9XFxuXCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4veW91ci1leHRlbnNpb25zL3dpZGdldHMvc2VsZWN0b3ItaW1hZ2VuZXMtZHJvbmUvc3JjL3J1bnRpbWUvc3R5bGUuc2Nzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtFQUNFLGVBQU87RUFBVSxlQUFPO0VBQVUsZUFBTztFQUFVLGdCQUFRO0VBQzNELGtCQUFrQjtFQUFFLGFBQWE7RUFBRSxZQUFZO0VBQUUsaUJBQWlCO0VBQUUsc0JBQXNCO0VBQUUsZ0JBQWdCO0VBQzVHLGNBQWM7RUFBRSxtQkFBbUI7RUFBRSxzRUFBc0UsRUFBQTtFQUg3RztJQUlNLHNCQUFzQixFQUFBO0VBSjVCO0lBS1csYUFBYTtJQUFFLHVCQUF1QjtJQUFFLGNBQWM7SUFBRSx1QkFBdUI7SUFBRSw4QkFBOEI7SUFBRSxvQ0FBb0M7SUFBRSxnQkFBZ0IsRUFBQTtJQUxsTDtNQU1XLGtCQUFrQjtNQUFFLGNBQWM7TUFBRSxnQkFBZ0I7TUFBRSxxQkFBcUIsRUFBQTtJQU50RjtNQU9TLGlCQUFpQjtNQUFFLGtCQUFrQjtNQUFFLGVBQWU7TUFBRSxpQkFBaUIsRUFBQTtJQVBsRjtNQVFRLFNBQVM7TUFBRSxtQkFBbUI7TUFBRSxlQUFlLEVBQUE7SUFSdkQ7TUFTYSxXQUFXO01BQUUsWUFBWTtNQUFFLHlCQUF5QjtNQUFFLGtCQUFrQjtNQUFFLGtCQUFrQjtNQUFFLGdCQUFnQjtNQUFFLGVBQWU7TUFBRSxlQUFlLEVBQUE7SUFUN0o7TUFVbUIseUJBQXlCO01BQUUsbUJBQW1CLEVB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OEMsYUFBYSxFQUFBLEVBQUlcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLmRyb25lLXNlbGVjdG9yIHtcXG4gIC0tdGVhbDogIzA4N2Y4NjsgLS1uYXZ5OiAjMTgzOTRiOyAtLWxpbmU6ICNkY2U1ZTk7IC0tbXV0ZWQ6ICM3MTg3OTM7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7IGRpc3BsYXk6IGZsZXg7IGhlaWdodDogMTAwJTsgbWluLWhlaWdodDogMzYwcHg7IGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47IG92ZXJmbG93OiBoaWRkZW47XFxuICBjb2xvcjogIzMzNGY1ZjsgYmFja2dyb3VuZDogI2Y2ZjhmOTsgZm9udC1mYW1pbHk6IC1hcHBsZS1zeXN0ZW0sIEJsaW5rTWFjU3lzdGVtRm9udCwgXFxcIlNlZ29lIFVJXFxcIiwgc2Fucy1zZXJpZjtcXG4gICogeyBib3gtc2l6aW5nOiBib3JkZXItYm94OyB9XFxuICBoZWFkZXIgeyBkaXNwbGF5OiBmbGV4OyBwYWRkaW5nOiAyMHB4IDIwcHggMTdweDsgZmxleDogMCAwIGF1dG87IGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0OyBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47IGJvcmRlci1ib3R0b206IDFweCBzb2xpZCB2YXIoLS1saW5lKTsgYmFja2dyb3VuZDogI2ZmZjtcXG4gICAgc3BhbiB7IGNvbG9yOiB2YXIoLS10ZWFsKTsgZm9udC1zaXplOiA5cHg7IGZvbnQtd2VpZ2h0OiA4MDA7IGxldHRlci1zcGFjaW5nOiAuMTRlbTsgfVxcbiAgICBoMiB7IG1hcmdpbjogM3B4IDAgMXB4OyBjb2xvcjogdmFyKC0tbmF2eSk7IGZvbnQtc2l6ZTogMjFweDsgbGluZS1oZWlnaHQ6IDEuMTU7IH1cXG4gICAgcCB7IG1hcmdpbjogMDsgY29sb3I6IHZhcigtLW11dGVkKTsgZm9udC1zaXplOiAxMHB4OyB9XFxuICAgIGJ1dHRvbiB7IHdpZHRoOiAzNHB4OyBoZWlnaHQ6IDM0cHg7IGJvcmRlcjogMXB4IHNvbGlkICNjOGQ2ZGM7IGJvcmRlci1yYWRpdXM6IDdweDsgY29sb3I6IHZhcigtLXRlYWwpOyBiYWNrZ3JvdW5kOiAjZmZmOyBjdXJzb3I6IHBvaW50ZXI7IGZvbnQtc2l6ZTogMTlweDsgfVxcbiAgICBidXR0b246aG92ZXIgeyBib3JkZXItY29sb3I6IHZhcigtLXRlYWwpOyBiYWNrZ3JvdW5kOiAjZjBmYWZhOyB9XFxuICB9XFxuICAmX190b29scyB7IHBhZGRpbmc6IDEzcHggMTZweCAxMHB4OyBmbGV4OiAwIDAgYXV0bzsgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIHZhcigtLWxpbmUpOyBiYWNrZ3JvdW5kOiAjZmZmOyB9XFxuICAmX19zZWFyY2ggeyBkaXNwbGF5OiBmbGV4OyBoZWlnaHQ6IDM4cHg7IHBhZGRpbmc6IDAgMTBweDsgYWxpZ24taXRlbXM6IGNlbnRlcjsgZ2FwOiA3cHg7IGJvcmRlcjogMXB4IHNvbGlkICNiZGNkZDQ7IGJvcmRlci1yYWRpdXM6IDdweDsgYmFja2dyb3VuZDogI2ZmZjtcXG4gICAgc3BhbiB7IGNvbG9yOiAjNjk4MThkOyBmb250LXNpemU6IDE5cHg7IH1cXG4gICAgaW5wdXQgeyBtaW4td2lkdGg6IDA7IGhlaWdodDogMTAwJTsgZmxleDogMTsgYm9yZGVyOiAwOyBvdXRsaW5lOiAwOyBjb2xvcjogIzI5NDc1NzsgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7IGZvbnQtc2l6ZTogMTJweDsgfVxcbiAgICBidXR0b24geyBib3JkZXI6IDA7IGNvbG9yOiAjN2E4ZDk3OyBiYWNrZ3JvdW5kOiBub25lOyBjdXJzb3I6IHBvaW50ZXI7IGZvbnQtc2l6ZTogMThweDsgfVxcbiAgICAmOmZvY3VzLXdpdGhpbiB7IGJvcmRlci1jb2xvcjogdmFyKC0tdGVhbCk7IGJveC1zaGFkb3c6IDAgMCAwIDNweCByZ2JhKDgsMTI3LDEzNCwuMSk7IH1cXG4gIH1cXG4gICZfX2ZpbHRlcnMgeyBkaXNwbGF5OiBncmlkOyBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmciAxZnIgMS4wNWZyOyBnYXA6IDZweDsgbWFyZ2luLXRvcDogOHB4O1xcbiAgICBzZWxlY3QgeyBtaW4td2lkdGg6IDA7IGhlaWdodDogMzJweDsgcGFkZGluZzogMCA1cHg7IGJvcmRlcjogMXB4IHNvbGlkICNjY2Q5ZGU7IGJvcmRlci1yYWRpdXM6IDVweDsgY29sb3I6ICM0OTY1NzM7IGJhY2tncm91bmQ6ICNmYmZjZmM7IGZvbnQtc2l6ZTogOXB4OyB9XFxuICB9XFxuICAmX19zdW1tYXJ5IHsgZGlzcGxheTogZmxleDsgbWluLWhlaWdodDogMjZweDsgcGFkZGluZy10b3A6IDlweDsgYWxpZ24taXRlbXM6IGNlbnRlcjsgZ2FwOiAxMnB4OyBjb2xvcjogIzc4OGQ5NzsgZm9udC1zaXplOiA5cHg7XFxuICAgIHN0cm9uZyB7IGNvbG9yOiB2YXIoLS1uYXZ5KTsgZm9udC1zaXplOiAxMnB4OyB9XFxuICAgIGIgeyBjb2xvcjogdmFyKC0tdGVhbCk7IH1cXG4gICAgYnV0dG9uIHsgbWFyZ2luLWxlZnQ6IGF1dG87IHBhZGRpbmc6IDA7IGJvcmRlcjogMDsgY29sb3I6IHZhcigtLXRlYWwpOyBiYWNrZ3JvdW5kOiBub25lOyBjdXJzb3I6IHBvaW50ZXI7IGZvbnQtc2l6ZTogOXB4OyBmb250LXdlaWdodDogNzAwOyB9XFxuICB9XFxuICAmX19hbmFseXNpcyB7IGZsZXg6IDAgMCBhdXRvOyBib3JkZXItYm90dG9tOiAxcHggc29saWQgdmFyKC0tbGluZSk7IGJhY2tncm91bmQ6ICNmMGY1ZjY7IH1cXG4gICZfX2FuYWx5c2lzLXRvZ2dsZSB7IGRpc3BsYXk6IGZsZXg7IHdpZHRoOiAxMDAlOyBtaW4taGVpZ2h0OiAzNHB4OyBwYWRkaW5nOiAwIDE2cHg7IGFsaWduLWl0ZW1zOiBjZW50ZXI7IGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjsgYm9yZGVyOiAwOyBjb2xvcjogIzQxNjE2ZTsgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7IGN1cnNvcjogcG9pbnRlcjsgZm9udC1zaXplOiAxMHB4OyBmb250LXdlaWdodDogNzAwOyB9XFxuICAmX19hbmFseXNpcy1ib2R5IHsgcGFkZGluZzogMCAxNnB4IDEycHg7XFxuICAgID4gcCB7IG1hcmdpbjogOHB4IDAgMDsgY29sb3I6ICM3NjhhOTQ7IGZvbnQtc2l6ZTogOXB4OyB9XFxuICB9XFxuICAmX19rcGlzIHsgZGlzcGxheTogZ3JpZDsgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMywgMWZyKTsgZ2FwOiA2cHg7XFxuICAgIGRpdiB7IHBhZGRpbmc6IDhweDsgYm9yZGVyOiAxcHggc29saWQgI2Q5ZTVlODsgYm9yZGVyLXJhZGl1czogNnB4OyBiYWNrZ3JvdW5kOiAjZmZmOyB0ZXh0LWFsaWduOiBjZW50ZXI7IH1cXG4gICAgc3Ryb25nLCBzcGFuIHsgZGlzcGxheTogYmxvY2s7IH1cXG4gICAgc3Ryb25nIHsgY29sb3I6IHZhcigtLXRlYWwpOyBmb250LXNpemU6IDE2cHg7IH1cXG4gICAgc3BhbiB7IGNvbG9yOiAjODI5NDljOyBmb250LXNpemU6IDhweDsgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTsgfVxcbiAgfVxcbiAgJl9fY29tcGFyZSB7IGRpc3BsYXk6IGdyaWQ7IGdyaWQtdGVtcGxhdGUtY29sdW1uczogbWlubWF4KDAsMWZyKSA5MHB4IG1pbm1heCgwLDFmcik7IG1hcmdpbi10b3A6IDlweDsgYWxpZ24taXRlbXM6IGNlbnRlcjsgZ2FwOiA2cHg7XFxuICAgIHNwYW4geyBvdmVyZmxvdzogaGlkZGVuOyBjb2xvcjogIzQwNWY2YzsgZm9udC1zaXplOiA4cHg7IHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzOyB3aGl0ZS1zcGFjZTogbm93cmFwOyB9XFxuICAgIHNwYW46bGFzdC1jaGlsZCB7IHRleHQtYWxpZ246IHJpZ2h0OyB9XFxuICAgIGlucHV0IHsgd2lkdGg6IDEwMCU7IGFjY2VudC1jb2xvcjogdmFyKC0tdGVhbCk7IH1cXG4gIH1cXG4gICZfX2xpc3QgeyBtaW4taGVpZ2h0OiAwOyBmbGV4OiAxIDEgYXV0bzsgb3ZlcmZsb3c6IGF1dG87IGJhY2tncm91bmQ6ICNmZmY7IH1cXG4gIGFydGljbGUgeyBwb3NpdGlvbjogcmVsYXRpdmU7IGRpc3BsYXk6IGdyaWQ7IG1pbi1oZWlnaHQ6IDcycHg7IGdyaWQtdGVtcGxhdGUtY29sdW1uczogMzVweCBtaW5tYXgoMCwxZnIpIGF1dG87IGFsaWduLWl0ZW1zOiBjZW50ZXI7IGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZTJlOWVjOyBiYWNrZ3JvdW5kOiAjZmZmOyB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kIC4xNXMsIGJveC1zaGFkb3cgLjE1cztcXG4gICAgJjo6YmVmb3JlIHsgcG9zaXRpb246IGFic29sdXRlOyB0b3A6IDA7IGJvdHRvbTogMDsgbGVmdDogMDsgd2lkdGg6IDRweDsgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7IGNvbnRlbnQ6IFxcXCJcXFwiOyB9XFxuICAgICY6aG92ZXIgeyBiYWNrZ3JvdW5kOiAjZjdmYWZiOyB9XFxuICAgICYuaXMtdmlzaWJsZSB7IGJhY2tncm91bmQ6ICNlZGY4Zjg7ICY6OmJlZm9yZSB7IGJhY2tncm91bmQ6IHZhcigtLXRlYWwpOyB9IH1cXG4gICAgJi5pcy1jb21wYXJpbmcgeyBib3gtc2hhZG93OiBpbnNldCAwIDAgMCAxcHggI2U3YTkzZDsgfVxcbiAgfVxcbiAgJl9fZXllIHsgd2lkdGg6IDMwcHg7IGhlaWdodDogMTAwJTsgYm9yZGVyOiAwOyBjb2xvcjogIzkyYTRhYzsgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7IGN1cnNvcjogcG9pbnRlcjsgZm9udC1zaXplOiAxNnB4OyB9XFxuICAuaXMtdmlzaWJsZSAmX19leWUgeyBjb2xvcjogdmFyKC0tdGVhbCk7IH1cXG4gICZfX2ZsaWdodCB7IGRpc3BsYXk6IGZsZXg7IG1pbi13aWR0aDogMDsgcGFkZGluZzogMTBweCAzcHg7IGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47IGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0OyBib3JkZXI6IDA7IGNvbG9yOiBpbmhlcml0OyBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDsgY3Vyc29yOiBwb2ludGVyOyB0ZXh0LWFsaWduOiBsZWZ0O1xcbiAgICBzdHJvbmcgeyB3aWR0aDogMTAwJTsgb3ZlcmZsb3c6IGhpZGRlbjsgY29sb3I6ICMyOTQ5NTg7IGZvbnQtc2l6ZTogMTJweDsgbGluZS1oZWlnaHQ6IDEuMjU7IHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzOyB3aGl0ZS1zcGFjZTogbm93cmFwOyB9XFxuICAgIHNtYWxsIHsgd2lkdGg6IDEwMCU7IG1hcmdpbi10b3A6IDNweDsgb3ZlcmZsb3c6IGhpZGRlbjsgY29sb3I6ICM4NDk2OWY7IGZvbnQtc2l6ZTogOHB4OyB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpczsgd2hpdGUtc3BhY2U6IG5vd3JhcDsgfVxcbiAgfVxcbiAgJl9fZGF0ZSB7IG1hcmdpbi1ib3R0b206IDNweDsgY29sb3I6IHZhcigtLXRlYWwpOyBmb250LXNpemU6IDhweDsgZm9udC13ZWlnaHQ6IDc1MDsgbGV0dGVyLXNwYWNpbmc6IC4wNmVtOyB9XFxuICAmX19hY3Rpb25zIHsgZGlzcGxheTogZmxleDsgcGFkZGluZy1yaWdodDogOHB4OyBnYXA6IDJweDtcXG4gICAgYnV0dG9uIHsgZGlzcGxheTogZ3JpZDsgd2lkdGg6IDI3cHg7IGhlaWdodDogMjdweDsgcGxhY2UtaXRlbXM6IGNlbnRlcjsgYm9yZGVyOiAwOyBib3JkZXItcmFkaXVzOiA1cHg7IGNvbG9yOiAjNmY4NThmOyBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDsgY3Vyc29yOiBwb2ludGVyOyBmb250LXNpemU6IDEzcHg7IH1cXG4gICAgYnV0dG9uOmhvdmVyLCBidXR0b24uaXMtYWN0aXZlIHsgY29sb3I6IHZhcigtLXRlYWwpOyBiYWNrZ3JvdW5kOiAjZGZmMWYxOyB9XFxuICAgIGJ1dHRvbi5pcy1hY3RpdmUgeyBjb2xvcjogI2E3NmIwMDsgYmFja2dyb3VuZDogI2ZmZjFkODsgfVxcbiAgfVxcbiAgJl9fZW1wdHksICZfX25vLXJlc3VsdHMgeyBkaXNwbGF5OiBmbGV4OyBwYWRkaW5nOiA0NXB4IDI1cHg7IGZsZXg6IDE7IGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47IGFsaWduLWl0ZW1zOiBjZW50ZXI7IGp1c3RpZnktY29udGVudDogY2VudGVyOyBjb2xvcjogIzdjOTA5OTsgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICBpIHsgY29sb3I6IHZhcigtLXRlYWwpOyBmb250LXNpemU6IDMwcHg7IGZvbnQtc3R5bGU6IG5vcm1hbDsgfVxcbiAgICBzdHJvbmcgeyBtYXJnaW4tdG9wOiA4cHg7IGNvbG9yOiB2YXIoLS1uYXZ5KTsgZm9udC1zaXplOiAxNHB4OyB9XFxuICAgIHAgeyBtYXgtd2lkdGg6IDI2MHB4OyBtYXJnaW46IDVweCAwIDEzcHg7IGZvbnQtc2l6ZTogMTBweDsgfVxcbiAgICBidXR0b24geyBwYWRkaW5nOiA3cHggMTFweDsgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tdGVhbCk7IGJvcmRlci1yYWRpdXM6IDVweDsgY29sb3I6IHZhcigtLXRlYWwpOyBiYWNrZ3JvdW5kOiAjZmZmOyBjdXJzb3I6IHBvaW50ZXI7IGZvbnQtc2l6ZTogMTBweDsgfVxcbiAgfVxcbiAgJl9fYWxlcnQgeyBtYXJnaW46IDE2cHg7IHBhZGRpbmc6IDE0cHg7IGJvcmRlcjogMXB4IHNvbGlkICNlN2I2YjY7IGJvcmRlci1yYWRpdXM6IDdweDsgY29sb3I6ICM4YjNkM2Q7IGJhY2tncm91bmQ6ICNmZmY0ZjQ7XFxuICAgIHN0cm9uZywgc3BhbiB7IGRpc3BsYXk6IGJsb2NrOyB9XFxuICAgIHN0cm9uZyB7IGZvbnQtc2l6ZTogMTJweDsgfSBzcGFuIHsgbWFyZ2luLXRvcDogM3B4OyBmb250LXNpemU6IDEwcHg7IH1cXG4gICAgYnV0dG9uIHsgbWFyZ2luLXRvcDogOXB4OyBib3JkZXI6IDA7IGNvbG9yOiAjOGIzZDNkOyBiYWNrZ3JvdW5kOiBub25lOyBjdXJzb3I6IHBvaW50ZXI7IGZvbnQtc2l6ZTogMTBweDsgZm9udC13ZWlnaHQ6IDcwMDsgfVxcbiAgfVxcbiAgJl9fbG9hZGluZyB7IHBvc2l0aW9uOiBhYnNvbHV0ZTsgei1pbmRleDogNTsgcmlnaHQ6IDEycHg7IGJvdHRvbTogMzFweDsgZGlzcGxheTogZmxleDsgcGFkZGluZzogN3B4IDEwcHg7IGFsaWduLWl0ZW1zOiBjZW50ZXI7IGdhcDogN3B4OyBib3JkZXI6IDFweCBzb2xpZCAjYzlkYWRkOyBib3JkZXItcmFkaXVzOiAyMHB4OyBjb2xvcjogIzUwNmM3ODsgYmFja2dyb3VuZDogcmdiYSgyNTUsMjU1LDI1NSwuOTUpOyBib3gtc2hhZG93OiAwIDRweCAxMnB4IHJnYmEoMzAsNjAsNzAsLjEyKTsgZm9udC1zaXplOiA5cHg7XFxuICAgIGkgeyB3aWR0aDogMTJweDsgaGVpZ2h0OiAxMnB4OyBib3JkZXI6IDJweCBzb2xpZCAjYzZkZGRkOyBib3JkZXItdG9wLWNvbG9yOiB2YXIoLS10ZWFsKTsgYm9yZGVyLXJhZGl1czogNTAlOyBhbmltYXRpb246IGRyb25lLXNwaW4gLjc1cyBsaW5lYXIgaW5maW5pdGU7IH1cXG4gIH1cXG4gIGZvb3RlciB7IGRpc3BsYXk6IGZsZXg7IG1pbi1oZWlnaHQ6IDI4cHg7IHBhZGRpbmc6IDAgMTZweDsgZmxleDogMCAwIGF1dG87IGFsaWduLWl0ZW1zOiBjZW50ZXI7IGdhcDogNnB4OyBib3JkZXItdG9wOiAxcHggc29saWQgdmFyKC0tbGluZSk7IGNvbG9yOiAjODI5NDljOyBiYWNrZ3JvdW5kOiAjZmFmY2ZjOyBmb250LXNpemU6IDhweDtcXG4gICAgc3BhbiB7IHdpZHRoOiA2cHg7IGhlaWdodDogNnB4OyBib3JkZXItcmFkaXVzOiA1MCU7IGJhY2tncm91bmQ6ICNiMGJjYzE7IH1cXG4gICAgc3Bhbi5pcy1yZWFkeSB7IGJhY2tncm91bmQ6ICMyYTliNzM7IGJveC1zaGFkb3c6IDAgMCAwIDNweCByZ2JhKDQyLDE1NSwxMTUsLjEyKTsgfVxcbiAgfVxcbn1cXG5cXG5Aa2V5ZnJhbWVzIGRyb25lLXNwaW4geyB0byB7IHRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7IH0gfVxcblxcbkBtZWRpYSAobWF4LXdpZHRoOiAzNTBweCkge1xcbiAgLmRyb25lLXNlbGVjdG9yX19maWx0ZXJzIHsgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgMWZyOyBzZWxlY3Q6bGFzdC1jaGlsZCB7IGdyaWQtY29sdW1uOiAxIC8gLTE7IH0gfVxcbiAgLmRyb25lLXNlbGVjdG9yX19hY3Rpb25zIGJ1dHRvbjpmaXJzdC1jaGlsZCB7IGRpc3BsYXk6IG5vbmU7IH1cXG59XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdOyAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG5cbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuXG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuXG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG5cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTsgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcblxuXG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG5cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuXG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG5cbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcblxuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcblxuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuXG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICB2YXIgc291cmNlVVJMcyA9IGNzc01hcHBpbmcuc291cmNlcy5tYXAoZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgICAgcmV0dXJuIFwiLyojIHNvdXJjZVVSTD1cIi5jb25jYXQoY3NzTWFwcGluZy5zb3VyY2VSb290IHx8IFwiXCIpLmNvbmNhdChzb3VyY2UsIFwiICovXCIpO1xuICAgIH0pO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KHNvdXJjZVVSTHMpLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cblxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanM/P3J1bGVTZXRbMV0ucnVsZXNbM10udXNlWzFdIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9yZXNvbHZlLXVybC1sb2FkZXIvaW5kZXguanM/P3J1bGVTZXRbMV0ucnVsZXNbM10udXNlWzJdIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9kaXN0L2Nqcy5qcz8/cnVsZVNldFsxXS5ydWxlc1szXS51c2VbM10hLi9zdHlsZS5zY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanM/P3J1bGVTZXRbMV0ucnVsZXNbM10udXNlWzFdIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9yZXNvbHZlLXVybC1sb2FkZXIvaW5kZXguanM/P3J1bGVTZXRbMV0ucnVsZXNbM10udXNlWzJdIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9kaXN0L2Nqcy5qcz8/cnVsZVNldFsxXS5ydWxlc1szXS51c2VbM10hLi9zdHlsZS5zY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuXG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcblxuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cblxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG5cbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG5cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuXG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG5cbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG5cbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG5cbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpOyAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG5cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG5cbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG5cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuXG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cblxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG5cbiAgY3NzICs9IG9iai5jc3M7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG5cbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9IC8vIEZvciBvbGQgSUVcblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG5cblxuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cblxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyIsImV4cG9ydCBpbnRlcmZhY2UgUGFyc2VkRmxpZ2h0TmFtZSB7XG4gIGRhdGU6IERhdGUgfCBudWxsXG4gIGRhdGVLZXk6IHN0cmluZ1xuICB5ZWFyOiBzdHJpbmdcbiAgbW9udGg6IHN0cmluZ1xuICBwbGFjZTogc3RyaW5nXG4gIGxhYmVsOiBzdHJpbmdcbn1cblxuY29uc3QgTU9OVEhTID0gWydFbmVybycsICdGZWJyZXJvJywgJ01hcnpvJywgJ0FicmlsJywgJ01heW8nLCAnSnVuaW8nLCAnSnVsaW8nLCAnQWdvc3RvJywgJ1NlcHRpZW1icmUnLCAnT2N0dWJyZScsICdOb3ZpZW1icmUnLCAnRGljaWVtYnJlJ11cblxuZXhwb3J0IGNvbnN0IG5vcm1hbGl6ZVRleHQgPSAodmFsdWU6IHVua25vd24pOiBzdHJpbmcgPT4gU3RyaW5nKHZhbHVlID8/ICcnKVxuICAubm9ybWFsaXplKCdORkQnKS5yZXBsYWNlKC9bXFx1MDMwMC1cXHUwMzZmXS9nLCAnJykudG9Mb3dlckNhc2UoKS50cmltKClcblxuZXhwb3J0IGNvbnN0IHBhcnNlRmxpZ2h0TmFtZSA9ICh0aXRsZTogc3RyaW5nKTogUGFyc2VkRmxpZ2h0TmFtZSA9PiB7XG4gIGNvbnN0IHJhdyA9IFN0cmluZyh0aXRsZSB8fCAnJykudHJpbSgpXG4gIGNvbnN0IG1hdGNoID0gcmF3Lm1hdGNoKC9eKFxcZHsyfXxcXGR7NH0pW18tXShcXGR7MSwyfSlbXy1dKFxcZHsxLDJ9KSg/OltfLV0rKT8oLiopJC8pXG4gIGlmICghbWF0Y2gpIHJldHVybiB7IGRhdGU6IG51bGwsIGRhdGVLZXk6ICcnLCB5ZWFyOiAnU2luIGZlY2hhJywgbW9udGg6ICdTaW4gZmVjaGEnLCBwbGFjZTogcmF3LCBsYWJlbDogcmF3IH1cbiAgY29uc3QgeWVhck51bWJlciA9IG1hdGNoWzFdLmxlbmd0aCA9PT0gMiA/IDIwMDAgKyBOdW1iZXIobWF0Y2hbMV0pIDogTnVtYmVyKG1hdGNoWzFdKVxuICBjb25zdCBtb250aE51bWJlciA9IE51bWJlcihtYXRjaFsyXSlcbiAgY29uc3QgZGF5TnVtYmVyID0gTnVtYmVyKG1hdGNoWzNdKVxuICBjb25zdCBjYW5kaWRhdGUgPSBuZXcgRGF0ZSh5ZWFyTnVtYmVyLCBtb250aE51bWJlciAtIDEsIGRheU51bWJlcilcbiAgY29uc3QgdmFsaWQgPSBjYW5kaWRhdGUuZ2V0RnVsbFllYXIoKSA9PT0geWVhck51bWJlciAmJiBjYW5kaWRhdGUuZ2V0TW9udGgoKSA9PT0gbW9udGhOdW1iZXIgLSAxICYmIGNhbmRpZGF0ZS5nZXREYXRlKCkgPT09IGRheU51bWJlclxuICBjb25zdCBwbGFjZSA9IChtYXRjaFs0XSB8fCAnVnVlbG8gc2luIHNlY3RvcicpLnJlcGxhY2UoL1tfLV0rL2csICcgJykucmVwbGFjZSgvXFxzKy9nLCAnICcpLnRyaW0oKVxuICBpZiAoIXZhbGlkKSByZXR1cm4geyBkYXRlOiBudWxsLCBkYXRlS2V5OiAnJywgeWVhcjogJ1NpbiBmZWNoYScsIG1vbnRoOiAnU2luIGZlY2hhJywgcGxhY2UsIGxhYmVsOiBgJHtyYXd9IMK3IGZlY2hhIG5vIHbDoWxpZGFgIH1cbiAgY29uc3QgZGF0ZUtleSA9IGAke3llYXJOdW1iZXJ9LSR7U3RyaW5nKG1vbnRoTnVtYmVyKS5wYWRTdGFydCgyLCAnMCcpfS0ke1N0cmluZyhkYXlOdW1iZXIpLnBhZFN0YXJ0KDIsICcwJyl9YFxuICByZXR1cm4ge1xuICAgIGRhdGU6IGNhbmRpZGF0ZSxcbiAgICBkYXRlS2V5LFxuICAgIHllYXI6IFN0cmluZyh5ZWFyTnVtYmVyKSxcbiAgICBtb250aDogTU9OVEhTW21vbnRoTnVtYmVyIC0gMV0sXG4gICAgcGxhY2UsXG4gICAgbGFiZWw6IGAke1N0cmluZyhkYXlOdW1iZXIpLnBhZFN0YXJ0KDIsICcwJyl9ICR7TU9OVEhTW21vbnRoTnVtYmVyIC0gMV0uc2xpY2UoMCwgMykudG9Mb3dlckNhc2UoKX0gJHt5ZWFyTnVtYmVyfSDCtyAke3BsYWNlfWBcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgbWF0Y2hlc0dyb3VwVGl0bGUgPSAoY2FuZGlkYXRlOiBzdHJpbmcsIGV4cGVjdGVkOiBzdHJpbmcpOiBib29sZWFuID0+IHtcbiAgY29uc3QgZ3JvdXBLZXkgPSAodmFsdWU6IHN0cmluZykgPT4gbm9ybWFsaXplVGV4dCh2YWx1ZSlcbiAgICAucmVwbGFjZSgvXFxiKGRlfGRlbHxsYXxsYXN8ZWx8bG9zKVxcYi9nLCAnICcpXG4gICAgLnJlcGxhY2UoL1teYS16MC05XSsvZywgJyAnKVxuICAgIC5yZXBsYWNlKC9cXHMrL2csICcgJylcbiAgICAudHJpbSgpXG4gIGNvbnN0IGxlZnQgPSBncm91cEtleShjYW5kaWRhdGUpXG4gIGNvbnN0IHJpZ2h0ID0gZ3JvdXBLZXkoZXhwZWN0ZWQgfHwgJ0ltYWdlbmVzIGRlIERyb25lJylcbiAgcmV0dXJuIGxlZnQgPT09IHJpZ2h0IHx8IGxlZnQuaW5jbHVkZXMocmlnaHQpXG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfamltdV9hcmNnaXNfXzsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfamltdV9jb3JlX187IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5uYyA9IHVuZGVmaW5lZDsiLCIvKipcclxuICogV2VicGFjayB3aWxsIHJlcGxhY2UgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gd2l0aCBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgdG8gc2V0IHRoZSBwdWJsaWMgcGF0aCBkeW5hbWljYWxseS5cclxuICogVGhlIHJlYXNvbiB3aHkgd2UgY2FuJ3Qgc2V0IHRoZSBwdWJsaWNQYXRoIGluIHdlYnBhY2sgY29uZmlnIGlzOiB3ZSBjaGFuZ2UgdGhlIHB1YmxpY1BhdGggd2hlbiBkb3dubG9hZC5cclxuICogKi9cclxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXHJcbi8vIEB0cy1pZ25vcmVcclxuX193ZWJwYWNrX3B1YmxpY19wYXRoX18gPSB3aW5kb3cuamltdUNvbmZpZy5iYXNlVXJsXHJcbiIsImltcG9ydCB7IFJlYWN0LCBBbGxXaWRnZXRQcm9wcyB9IGZyb20gJ2ppbXUtY29yZSdcbmltcG9ydCB7IEppbXVNYXBWaWV3LCBKaW11TWFwVmlld0NvbXBvbmVudCB9IGZyb20gJ2ppbXUtYXJjZ2lzJ1xuaW1wb3J0IHsgSU1Db25maWcgfSBmcm9tICcuLi9jb25maWcnXG5pbXBvcnQgeyBtYXRjaGVzR3JvdXBUaXRsZSwgbm9ybWFsaXplVGV4dCwgcGFyc2VGbGlnaHROYW1lLCBQYXJzZWRGbGlnaHROYW1lIH0gZnJvbSAnLi9kcm9uZS11dGlscydcbmltcG9ydCAnLi9zdHlsZS5zY3NzJ1xuXG5pbnRlcmZhY2UgRmxpZ2h0SXRlbSBleHRlbmRzIFBhcnNlZEZsaWdodE5hbWUge1xuICBpZDogc3RyaW5nXG4gIHRpdGxlOiBzdHJpbmdcbiAgcGFyZW50VGl0bGU6IHN0cmluZ1xuICBsYXllcjogYW55XG4gIHZpc2libGU6IGJvb2xlYW5cbn1cblxudHlwZSBTb3J0TW9kZSA9ICduZXdlc3QnIHwgJ29sZGVzdCcgfCAnbmFtZSdcblxuY29uc3QgY29sbGVjdExlYWZMYXllcnMgPSAoZ3JvdXA6IGFueSwgcGFyZW50VGl0bGU6IHN0cmluZyk6IEZsaWdodEl0ZW1bXSA9PiB7XG4gIGNvbnN0IHJlc3VsdDogRmxpZ2h0SXRlbVtdID0gW11cbiAgY29uc3QgdmlzaXQgPSAobGF5ZXI6IGFueSwgcGFyZW50OiBzdHJpbmcpID0+IHtcbiAgICBpZiAobGF5ZXI/LnR5cGUgPT09ICdncm91cCcgJiYgbGF5ZXIubGF5ZXJzKSB7XG4gICAgICBsYXllci5sYXllcnMuZm9yRWFjaCgoY2hpbGQ6IGFueSkgPT4gdmlzaXQoY2hpbGQsIGxheWVyLnRpdGxlIHx8IHBhcmVudCkpXG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgaWYgKCFsYXllcikgcmV0dXJuXG4gICAgcmVzdWx0LnB1c2goe1xuICAgICAgaWQ6IFN0cmluZyhsYXllci5pZCB8fCBsYXllci51aWQgfHwgYCR7cGFyZW50fS0ke2xheWVyLnRpdGxlfWApLFxuICAgICAgdGl0bGU6IFN0cmluZyhsYXllci50aXRsZSB8fCAnVnVlbG8gc2luIG5vbWJyZScpLFxuICAgICAgcGFyZW50VGl0bGU6IHBhcmVudCxcbiAgICAgIGxheWVyLFxuICAgICAgdmlzaWJsZTogQm9vbGVhbihsYXllci52aXNpYmxlKSxcbiAgICAgIC4uLnBhcnNlRmxpZ2h0TmFtZShTdHJpbmcobGF5ZXIudGl0bGUgfHwgJycpKVxuICAgIH0pXG4gIH1cbiAgZ3JvdXAubGF5ZXJzPy5mb3JFYWNoKChsYXllcjogYW55KSA9PiB2aXNpdChsYXllciwgZ3JvdXAudGl0bGUgfHwgcGFyZW50VGl0bGUpKVxuICByZXR1cm4gcmVzdWx0XG59XG5cbmNvbnN0IGZpbmRHcm91cCA9IChtYXA6IGFueSwgdGl0bGU6IHN0cmluZyk6IGFueSA9PiB7XG4gIGNvbnN0IHBhdGggPSBTdHJpbmcodGl0bGUgfHwgJ1Z1ZWxvcyBEcm9uZSBQQU8vSW1hZ2VuZXMgZGUgRHJvbmUnKVxuICAgIC5zcGxpdCgvWy8+XS8pLm1hcChwYXJ0ID0+IHBhcnQudHJpbSgpKS5maWx0ZXIoQm9vbGVhbilcbiAgbGV0IGNvbGxlY3Rpb24gPSBtYXA/LmxheWVyc1xuICBsZXQgcGF0aE1hdGNoOiBhbnkgPSBudWxsXG4gIGZvciAoY29uc3Qgc2VnbWVudCBvZiBwYXRoKSB7XG4gICAgcGF0aE1hdGNoID0gY29sbGVjdGlvbj8uZmluZD8uKChsYXllcjogYW55KSA9PiBsYXllcj8udHlwZSA9PT0gJ2dyb3VwJyAmJiBtYXRjaGVzR3JvdXBUaXRsZShsYXllci50aXRsZSwgc2VnbWVudCkpIHx8IG51bGxcbiAgICBpZiAoIXBhdGhNYXRjaCkgYnJlYWtcbiAgICBjb2xsZWN0aW9uID0gcGF0aE1hdGNoLmxheWVyc1xuICB9XG4gIGlmIChwYXRoTWF0Y2ggJiYgcGF0aC5sZW5ndGgpIHJldHVybiBwYXRoTWF0Y2hcblxuICBjb25zdCBsZWFmVGl0bGUgPSBwYXRoW3BhdGgubGVuZ3RoIC0gMV0gfHwgdGl0bGVcbiAgbGV0IG1hdGNoOiBhbnkgPSBudWxsXG4gIG1hcD8uYWxsTGF5ZXJzPy5mb3JFYWNoKChsYXllcjogYW55KSA9PiB7XG4gICAgaWYgKCFtYXRjaCAmJiBsYXllcj8udHlwZSA9PT0gJ2dyb3VwJyAmJiBtYXRjaGVzR3JvdXBUaXRsZShsYXllci50aXRsZSwgbGVhZlRpdGxlKSkgbWF0Y2ggPSBsYXllclxuICB9KVxuICByZXR1cm4gbWF0Y2hcbn1cblxuY29uc3QgV2lkZ2V0ID0gKHByb3BzOiBBbGxXaWRnZXRQcm9wczxJTUNvbmZpZz4pID0+IHtcbiAgY29uc3QgW2ppbXVNYXBWaWV3LCBzZXRKaW11TWFwVmlld10gPSBSZWFjdC51c2VTdGF0ZTxKaW11TWFwVmlldz4obnVsbClcbiAgY29uc3QgW2ZsaWdodHMsIHNldEZsaWdodHNdID0gUmVhY3QudXNlU3RhdGU8RmxpZ2h0SXRlbVtdPihbXSlcbiAgY29uc3QgW2dyb3VwRm91bmQsIHNldEdyb3VwRm91bmRdID0gUmVhY3QudXNlU3RhdGUoZmFsc2UpXG4gIGNvbnN0IFtsb2FkaW5nLCBzZXRMb2FkaW5nXSA9IFJlYWN0LnVzZVN0YXRlKGZhbHNlKVxuICBjb25zdCBbZXJyb3IsIHNldEVycm9yXSA9IFJlYWN0LnVzZVN0YXRlKCcnKVxuICBjb25zdCBbcXVlcnksIHNldFF1ZXJ5XSA9IFJlYWN0LnVzZVN0YXRlKCcnKVxuICBjb25zdCBbeWVhciwgc2V0WWVhcl0gPSBSZWFjdC51c2VTdGF0ZSgnJylcbiAgY29uc3QgW21vbnRoLCBzZXRNb250aF0gPSBSZWFjdC51c2VTdGF0ZSgnJylcbiAgY29uc3QgW3NvcnQsIHNldFNvcnRdID0gUmVhY3QudXNlU3RhdGU8U29ydE1vZGU+KCduZXdlc3QnKVxuICBjb25zdCBbYW5hbHlzaXNPcGVuLCBzZXRBbmFseXNpc09wZW5dID0gUmVhY3QudXNlU3RhdGUoZmFsc2UpXG4gIGNvbnN0IFtjb21wYXJlSWRzLCBzZXRDb21wYXJlSWRzXSA9IFJlYWN0LnVzZVN0YXRlPHN0cmluZ1tdPihbXSlcbiAgY29uc3QgW2NvbXBhcmVWYWx1ZSwgc2V0Q29tcGFyZVZhbHVlXSA9IFJlYWN0LnVzZVN0YXRlKDUwKVxuICBjb25zdCBoYW5kbGVzID0gUmVhY3QudXNlUmVmPGFueVtdPihbXSlcblxuICBjb25zdCBjbGVhckhhbmRsZXMgPSAoKSA9PiB7XG4gICAgaGFuZGxlcy5jdXJyZW50LmZvckVhY2goaGFuZGxlID0+IGhhbmRsZT8ucmVtb3ZlPy4oKSlcbiAgICBoYW5kbGVzLmN1cnJlbnQgPSBbXVxuICB9XG5cbiAgY29uc3Qgc2Nhbk1hcCA9IFJlYWN0LnVzZUNhbGxiYWNrKGFzeW5jICgpID0+IHtcbiAgICBpZiAoIWppbXVNYXBWaWV3Py52aWV3Py5tYXApIHJldHVyblxuICAgIHNldExvYWRpbmcodHJ1ZSlcbiAgICBzZXRFcnJvcignJylcbiAgICBjbGVhckhhbmRsZXMoKVxuICAgIHRyeSB7XG4gICAgICBhd2FpdCBqaW11TWFwVmlldy52aWV3LndoZW4oKVxuICAgICAgY29uc3QgY29uZmlndXJlZFRpdGxlID0gcHJvcHMuY29uZmlnLmdyb3VwVGl0bGUgfHwgJ1Z1ZWxvcyBEcm9uZSBQQU8vSW1hZ2VuZXMgZGUgRHJvbmUnXG4gICAgICBjb25zdCBncm91cCA9IGZpbmRHcm91cChqaW11TWFwVmlldy52aWV3Lm1hcCwgY29uZmlndXJlZFRpdGxlKVxuICAgICAgc2V0R3JvdXBGb3VuZChCb29sZWFuKGdyb3VwKSlcbiAgICAgIGlmICghZ3JvdXApIHtcbiAgICAgICAgc2V0RmxpZ2h0cyhbXSlcbiAgICAgICAgc2V0RXJyb3IoYE5vIHNlIGVuY29udHLDsyBlbCBncnVwbyDigJwke2NvbmZpZ3VyZWRUaXRsZX3igJ0gZW4gZWwgbWFwYS5gKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIGNvbnN0IGl0ZW1zID0gY29sbGVjdExlYWZMYXllcnMoZ3JvdXAsIGNvbmZpZ3VyZWRUaXRsZSlcbiAgICAgIHNldEZsaWdodHMoaXRlbXMpXG4gICAgICBpdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICBpZiAoaXRlbS5sYXllcj8ud2F0Y2gpIHtcbiAgICAgICAgICBoYW5kbGVzLmN1cnJlbnQucHVzaChpdGVtLmxheWVyLndhdGNoKCd2aXNpYmxlJywgKHZpc2libGU6IGJvb2xlYW4pID0+IHtcbiAgICAgICAgICAgIHNldEZsaWdodHMoY3VycmVudCA9PiBjdXJyZW50Lm1hcChmbGlnaHQgPT4gZmxpZ2h0LmlkID09PSBpdGVtLmlkID8geyAuLi5mbGlnaHQsIHZpc2libGUgfSA6IGZsaWdodCkpXG4gICAgICAgICAgfSkpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICBpZiAoZ3JvdXAubGF5ZXJzPy5vbikgaGFuZGxlcy5jdXJyZW50LnB1c2goZ3JvdXAubGF5ZXJzLm9uKCdjaGFuZ2UnLCBzY2FuTWFwKSlcbiAgICAgIGlmICghaXRlbXMubGVuZ3RoKSBzZXRFcnJvcignRWwgZ3J1cG8gZXhpc3RlLCBwZXJvIG5vIGNvbnRpZW5lIGNhcGFzIGRlIHZ1ZWxvLicpXG4gICAgfSBjYXRjaCAoZXhjZXB0aW9uKSB7XG4gICAgICBzZXRFcnJvcihleGNlcHRpb24gaW5zdGFuY2VvZiBFcnJvciA/IGV4Y2VwdGlvbi5tZXNzYWdlIDogJ05vIGZ1ZSBwb3NpYmxlIGxlZXIgbGFzIGNhcGFzIGRlbCBtYXBhLicpXG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHNldExvYWRpbmcoZmFsc2UpXG4gICAgfVxuICB9LCBbamltdU1hcFZpZXcsIHByb3BzLmNvbmZpZy5ncm91cFRpdGxlXSlcblxuICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xuICAgIHNjYW5NYXAoKVxuICAgIHJldHVybiBjbGVhckhhbmRsZXNcbiAgfSwgW3NjYW5NYXBdKVxuXG4gIGNvbnN0IHllYXJzID0gUmVhY3QudXNlTWVtbygoKSA9PiBBcnJheS5mcm9tKG5ldyBTZXQoZmxpZ2h0cy5tYXAoaXRlbSA9PiBpdGVtLnllYXIpKSkuc29ydCgpLnJldmVyc2UoKSwgW2ZsaWdodHNdKVxuICBjb25zdCBtb250aHMgPSBSZWFjdC51c2VNZW1vKCgpID0+IEFycmF5LmZyb20obmV3IFNldChmbGlnaHRzLmZpbHRlcihpdGVtID0+ICF5ZWFyIHx8IGl0ZW0ueWVhciA9PT0geWVhcikubWFwKGl0ZW0gPT4gaXRlbS5tb250aCkpKSwgW2ZsaWdodHMsIHllYXJdKVxuICBjb25zdCBmaWx0ZXJlZCA9IFJlYWN0LnVzZU1lbW8oKCkgPT4ge1xuICAgIGNvbnN0IG5lZWRsZSA9IG5vcm1hbGl6ZVRleHQocXVlcnkpXG4gICAgcmV0dXJuIGZsaWdodHMuZmlsdGVyKGl0ZW0gPT5cbiAgICAgICghbmVlZGxlIHx8IG5vcm1hbGl6ZVRleHQoYCR7aXRlbS50aXRsZX0gJHtpdGVtLnBsYWNlfSAke2l0ZW0ucGFyZW50VGl0bGV9ICR7aXRlbS5kYXRlS2V5fWApLmluY2x1ZGVzKG5lZWRsZSkpICYmXG4gICAgICAoIXllYXIgfHwgaXRlbS55ZWFyID09PSB5ZWFyKSAmJiAoIW1vbnRoIHx8IGl0ZW0ubW9udGggPT09IG1vbnRoKVxuICAgICkuc29ydCgoYSwgYikgPT4ge1xuICAgICAgaWYgKHNvcnQgPT09ICduYW1lJykgcmV0dXJuIGEucGxhY2UubG9jYWxlQ29tcGFyZShiLnBsYWNlKVxuICAgICAgY29uc3QgbGVmdCA9IGEuZGF0ZT8uZ2V0VGltZSgpIHx8IDBcbiAgICAgIGNvbnN0IHJpZ2h0ID0gYi5kYXRlPy5nZXRUaW1lKCkgfHwgMFxuICAgICAgcmV0dXJuIHNvcnQgPT09ICduZXdlc3QnID8gcmlnaHQgLSBsZWZ0IDogbGVmdCAtIHJpZ2h0XG4gICAgfSlcbiAgfSwgW2ZsaWdodHMsIHF1ZXJ5LCB5ZWFyLCBtb250aCwgc29ydF0pXG5cbiAgY29uc3QgdmlzaWJsZUNvdW50ID0gZmxpZ2h0cy5maWx0ZXIoaXRlbSA9PiBpdGVtLnZpc2libGUpLmxlbmd0aFxuXG4gIGNvbnN0IHpvb21UbyA9IGFzeW5jIChpdGVtOiBGbGlnaHRJdGVtKSA9PiB7XG4gICAgaWYgKCFqaW11TWFwVmlldz8udmlldyB8fCAhaXRlbS5sYXllcikgcmV0dXJuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHRhcmdldCA9IGl0ZW0ubGF5ZXIuZnVsbEV4dGVudCB8fCBpdGVtLmxheWVyLmV4dGVudFxuICAgICAgaWYgKHRhcmdldCkgYXdhaXQgamltdU1hcFZpZXcudmlldy5nb1RvKHRhcmdldC5leHBhbmQgPyB0YXJnZXQuZXhwYW5kKDEuMTUpIDogdGFyZ2V0KVxuICAgIH0gY2F0Y2ggKF8pIHt9XG4gIH1cblxuICBjb25zdCB0b2dnbGVWaXNpYmlsaXR5ID0gYXN5bmMgKGl0ZW06IEZsaWdodEl0ZW0pID0+IHtcbiAgICBjb25zdCBuZXh0ID0gIWl0ZW0ubGF5ZXIudmlzaWJsZVxuICAgIGlmIChuZXh0ICYmIHByb3BzLmNvbmZpZy5leGNsdXNpdmVWaXNpYmlsaXR5ICE9PSBmYWxzZSkge1xuICAgICAgZmxpZ2h0cy5mb3JFYWNoKGNhbmRpZGF0ZSA9PiB7IGNhbmRpZGF0ZS5sYXllci52aXNpYmxlID0gY2FuZGlkYXRlLmlkID09PSBpdGVtLmlkIH0pXG4gICAgfSBlbHNlIHtcbiAgICAgIGl0ZW0ubGF5ZXIudmlzaWJsZSA9IG5leHRcbiAgICB9XG4gICAgc2V0RmxpZ2h0cyhjdXJyZW50ID0+IGN1cnJlbnQubWFwKGNhbmRpZGF0ZSA9PiAoeyAuLi5jYW5kaWRhdGUsIHZpc2libGU6IEJvb2xlYW4oY2FuZGlkYXRlLmxheWVyLnZpc2libGUpIH0pKSlcbiAgICBpZiAobmV4dCAmJiBwcm9wcy5jb25maWcuem9vbU9uU2VsZWN0ICE9PSBmYWxzZSkgYXdhaXQgem9vbVRvKGl0ZW0pXG4gIH1cblxuICBjb25zdCB0b2dnbGVDb21wYXJlID0gKGl0ZW06IEZsaWdodEl0ZW0pID0+IHtcbiAgICBzZXRDb21wYXJlSWRzKGN1cnJlbnQgPT4ge1xuICAgICAgaWYgKGN1cnJlbnQuaW5jbHVkZXMoaXRlbS5pZCkpIHJldHVybiBjdXJyZW50LmZpbHRlcihpZCA9PiBpZCAhPT0gaXRlbS5pZClcbiAgICAgIGlmIChjdXJyZW50Lmxlbmd0aCA+PSAyKSByZXR1cm4gW2N1cnJlbnRbMV0sIGl0ZW0uaWRdXG4gICAgICByZXR1cm4gWy4uLmN1cnJlbnQsIGl0ZW0uaWRdXG4gICAgfSlcbiAgfVxuXG4gIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKGNvbXBhcmVJZHMubGVuZ3RoICE9PSAyKSByZXR1cm5cbiAgICBjb25zdCBmaXJzdCA9IGZsaWdodHMuZmluZChpdGVtID0+IGl0ZW0uaWQgPT09IGNvbXBhcmVJZHNbMF0pXG4gICAgY29uc3Qgc2Vjb25kID0gZmxpZ2h0cy5maW5kKGl0ZW0gPT4gaXRlbS5pZCA9PT0gY29tcGFyZUlkc1sxXSlcbiAgICBpZiAoZmlyc3Q/LmxheWVyKSB7IGZpcnN0LmxheWVyLnZpc2libGUgPSB0cnVlOyBmaXJzdC5sYXllci5vcGFjaXR5ID0gKDEwMCAtIGNvbXBhcmVWYWx1ZSkgLyAxMDAgfVxuICAgIGlmIChzZWNvbmQ/LmxheWVyKSB7IHNlY29uZC5sYXllci52aXNpYmxlID0gdHJ1ZTsgc2Vjb25kLmxheWVyLm9wYWNpdHkgPSBjb21wYXJlVmFsdWUgLyAxMDAgfVxuICB9LCBbY29tcGFyZUlkcywgY29tcGFyZVZhbHVlLCBmbGlnaHRzXSlcblxuICBjb25zdCBjbGVhckZpbHRlcnMgPSAoKSA9PiB7IHNldFF1ZXJ5KCcnKTsgc2V0WWVhcignJyk7IHNldE1vbnRoKCcnKSB9XG4gIGNvbnN0IHVuY29uZmlndXJlZCA9ICFwcm9wcy51c2VNYXBXaWRnZXRJZHM/Lmxlbmd0aFxuXG4gIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cImRyb25lLXNlbGVjdG9yXCI+XG4gICAge3Byb3BzLnVzZU1hcFdpZGdldElkcz8uWzBdICYmIDxKaW11TWFwVmlld0NvbXBvbmVudCB1c2VNYXBXaWRnZXRJZD17cHJvcHMudXNlTWFwV2lkZ2V0SWRzWzBdfSBvbkFjdGl2ZVZpZXdDaGFuZ2U9e3NldEppbXVNYXBWaWV3fSAvPn1cbiAgICA8aGVhZGVyPlxuICAgICAgPGRpdj48c3Bhbj5JTcOBR0VORVMgQcOJUkVBUzwvc3Bhbj48aDI+VnVlbG9zIERyb25lIFBBTzwvaDI+PHA+RXhwbG9yYWNpw7NuIHRlbXBvcmFsIHkgY29tcGFyYWNpw7NuIHZpc3VhbDwvcD48L2Rpdj5cbiAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIHRpdGxlPVwiQWN0dWFsaXphciBjYXBhc1wiIG9uQ2xpY2s9e3NjYW5NYXB9IGRpc2FibGVkPXtsb2FkaW5nfT7ihrs8L2J1dHRvbj5cbiAgICA8L2hlYWRlcj5cblxuICAgIHt1bmNvbmZpZ3VyZWQgJiYgPGRpdiBjbGFzc05hbWU9XCJkcm9uZS1zZWxlY3Rvcl9fZW1wdHlcIj48aT7ijJY8L2k+PHN0cm9uZz5Db25maWd1cmUgdW4gbWFwYTwvc3Ryb25nPjxwPkFicmEgbG9zIGFqdXN0ZXMgZGVsIHdpZGdldCB5IHNlbGVjY2lvbmUgZWwgTWFwIFdpZGdldC48L3A+PC9kaXY+fVxuICAgIHshdW5jb25maWd1cmVkICYmIGVycm9yICYmIDxkaXYgY2xhc3NOYW1lPVwiZHJvbmUtc2VsZWN0b3JfX2FsZXJ0XCI+PHN0cm9uZz5ObyBzZSBwdWRvIGNhcmdhciBlbCBjYXTDoWxvZ288L3N0cm9uZz48c3Bhbj57ZXJyb3J9PC9zcGFuPjxidXR0b24gb25DbGljaz17c2Nhbk1hcH0+UmVpbnRlbnRhcjwvYnV0dG9uPjwvZGl2Pn1cblxuICAgIHshdW5jb25maWd1cmVkICYmIGdyb3VwRm91bmQgJiYgPD5cbiAgICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cImRyb25lLXNlbGVjdG9yX190b29sc1wiPlxuICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiZHJvbmUtc2VsZWN0b3JfX3NlYXJjaFwiPjxzcGFuPuKMlTwvc3Bhbj48aW5wdXQgYXJpYS1sYWJlbD1cIkJ1c2NhciB2dWVsb3NcIiB2YWx1ZT17cXVlcnl9IHBsYWNlaG9sZGVyPVwiQnVzY2FyIHNlY3RvciwgdnVlbG8gbyBmZWNoYeKAplwiIG9uQ2hhbmdlPXtldmVudCA9PiBzZXRRdWVyeShldmVudC50YXJnZXQudmFsdWUpfSAvPntxdWVyeSAmJiA8YnV0dG9uIG9uQ2xpY2s9eygpID0+IHNldFF1ZXJ5KCcnKX0+w5c8L2J1dHRvbj59PC9sYWJlbD5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkcm9uZS1zZWxlY3Rvcl9fZmlsdGVyc1wiPlxuICAgICAgICAgIDxzZWxlY3QgYXJpYS1sYWJlbD1cIkHDsW9cIiB2YWx1ZT17eWVhcn0gb25DaGFuZ2U9e2V2ZW50ID0+IHsgc2V0WWVhcihldmVudC50YXJnZXQudmFsdWUpOyBzZXRNb250aCgnJykgfX0+PG9wdGlvbiB2YWx1ZT1cIlwiPlRvZG9zIGxvcyBhw7Fvczwvb3B0aW9uPnt5ZWFycy5tYXAodmFsdWUgPT4gPG9wdGlvbiBrZXk9e3ZhbHVlfT57dmFsdWV9PC9vcHRpb24+KX08L3NlbGVjdD5cbiAgICAgICAgICA8c2VsZWN0IGFyaWEtbGFiZWw9XCJNZXNcIiB2YWx1ZT17bW9udGh9IG9uQ2hhbmdlPXtldmVudCA9PiBzZXRNb250aChldmVudC50YXJnZXQudmFsdWUpfT48b3B0aW9uIHZhbHVlPVwiXCI+VG9kb3MgbG9zIG1lc2VzPC9vcHRpb24+e21vbnRocy5tYXAodmFsdWUgPT4gPG9wdGlvbiBrZXk9e3ZhbHVlfT57dmFsdWV9PC9vcHRpb24+KX08L3NlbGVjdD5cbiAgICAgICAgICA8c2VsZWN0IGFyaWEtbGFiZWw9XCJPcmRlblwiIHZhbHVlPXtzb3J0fSBvbkNoYW5nZT17ZXZlbnQgPT4gc2V0U29ydChldmVudC50YXJnZXQudmFsdWUgYXMgU29ydE1vZGUpfT48b3B0aW9uIHZhbHVlPVwibmV3ZXN0XCI+TcOhcyByZWNpZW50ZXM8L29wdGlvbj48b3B0aW9uIHZhbHVlPVwib2xkZXN0XCI+TcOhcyBhbnRpZ3Vvczwvb3B0aW9uPjxvcHRpb24gdmFsdWU9XCJuYW1lXCI+UG9yIHNlY3Rvcjwvb3B0aW9uPjwvc2VsZWN0PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkcm9uZS1zZWxlY3Rvcl9fc3VtbWFyeVwiPjxzcGFuPjxzdHJvbmc+e2ZpbHRlcmVkLmxlbmd0aH08L3N0cm9uZz4gZGUge2ZsaWdodHMubGVuZ3RofSB2dWVsb3M8L3NwYW4+PHNwYW4+PGI+e3Zpc2libGVDb3VudH08L2I+IHZpc2libGVzPC9zcGFuPnsocXVlcnkgfHwgeWVhciB8fCBtb250aCkgJiYgPGJ1dHRvbiBvbkNsaWNrPXtjbGVhckZpbHRlcnN9PkxpbXBpYXIgZmlsdHJvczwvYnV0dG9uPn08L2Rpdj5cbiAgICAgIDwvc2VjdGlvbj5cblxuICAgICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwiZHJvbmUtc2VsZWN0b3JfX2FuYWx5c2lzXCI+XG4gICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiZHJvbmUtc2VsZWN0b3JfX2FuYWx5c2lzLXRvZ2dsZVwiIG9uQ2xpY2s9eygpID0+IHNldEFuYWx5c2lzT3Blbih2YWx1ZSA9PiAhdmFsdWUpfT48c3Bhbj7ilqUgUmVzdW1lbiB5IGNvbXBhcmFjacOzbjwvc3Bhbj48Yj57YW5hbHlzaXNPcGVuID8gJ+KIkicgOiAnKyd9PC9iPjwvYnV0dG9uPlxuICAgICAgICB7YW5hbHlzaXNPcGVuICYmIDxkaXYgY2xhc3NOYW1lPVwiZHJvbmUtc2VsZWN0b3JfX2FuYWx5c2lzLWJvZHlcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRyb25lLXNlbGVjdG9yX19rcGlzXCI+PGRpdj48c3Ryb25nPnt5ZWFycy5maWx0ZXIodmFsdWUgPT4gdmFsdWUgIT09ICdTaW4gZmVjaGEnKS5sZW5ndGh9PC9zdHJvbmc+PHNwYW4+QcOxb3M8L3NwYW4+PC9kaXY+PGRpdj48c3Ryb25nPntuZXcgU2V0KGZsaWdodHMubWFwKGl0ZW0gPT4gaXRlbS5wbGFjZSkpLnNpemV9PC9zdHJvbmc+PHNwYW4+U2VjdG9yZXM8L3NwYW4+PC9kaXY+PGRpdj48c3Ryb25nPntjb21wYXJlSWRzLmxlbmd0aH0vMjwvc3Ryb25nPjxzcGFuPkNvbXBhcmFyPC9zcGFuPjwvZGl2PjwvZGl2PlxuICAgICAgICAgIDxwPlVzZSBlbCBib3TDs24g4oeEIGRlIGRvcyB2dWVsb3MgcGFyYSBjb21wYXJhcmxvcyBwb3IgdHJhbnNwYXJlbmNpYS48L3A+XG4gICAgICAgICAge2NvbXBhcmVJZHMubGVuZ3RoID09PSAyICYmIDxkaXYgY2xhc3NOYW1lPVwiZHJvbmUtc2VsZWN0b3JfX2NvbXBhcmVcIj48c3Bhbj57ZmxpZ2h0cy5maW5kKGl0ZW0gPT4gaXRlbS5pZCA9PT0gY29tcGFyZUlkc1swXSk/LnBsYWNlfTwvc3Bhbj48aW5wdXQgdHlwZT1cInJhbmdlXCIgbWluPVwiMFwiIG1heD1cIjEwMFwiIHZhbHVlPXtjb21wYXJlVmFsdWV9IG9uQ2hhbmdlPXtldmVudCA9PiBzZXRDb21wYXJlVmFsdWUoTnVtYmVyKGV2ZW50LnRhcmdldC52YWx1ZSkpfSAvPjxzcGFuPntmbGlnaHRzLmZpbmQoaXRlbSA9PiBpdGVtLmlkID09PSBjb21wYXJlSWRzWzFdKT8ucGxhY2V9PC9zcGFuPjwvZGl2Pn1cbiAgICAgICAgPC9kaXY+fVxuICAgICAgPC9zZWN0aW9uPlxuXG4gICAgICA8bWFpbiBjbGFzc05hbWU9XCJkcm9uZS1zZWxlY3Rvcl9fbGlzdFwiIGFyaWEtYnVzeT17bG9hZGluZ30+XG4gICAgICAgIHtmaWx0ZXJlZC5tYXAoaXRlbSA9PiA8YXJ0aWNsZSBrZXk9e2l0ZW0uaWR9IGNsYXNzTmFtZT17YCR7aXRlbS52aXNpYmxlID8gJ2lzLXZpc2libGUnIDogJyd9ICR7Y29tcGFyZUlkcy5pbmNsdWRlcyhpdGVtLmlkKSA/ICdpcy1jb21wYXJpbmcnIDogJyd9YH0+XG4gICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJkcm9uZS1zZWxlY3Rvcl9fZXllXCIgdGl0bGU9e2l0ZW0udmlzaWJsZSA/ICdPY3VsdGFyIHZ1ZWxvJyA6ICdNb3N0cmFyIHZ1ZWxvJ30gYXJpYS1sYWJlbD17aXRlbS52aXNpYmxlID8gJ09jdWx0YXIgdnVlbG8nIDogJ01vc3RyYXIgdnVlbG8nfSBvbkNsaWNrPXsoKSA9PiB0b2dnbGVWaXNpYmlsaXR5KGl0ZW0pfT57aXRlbS52aXNpYmxlID8gJ+KXiScgOiAn4peLJ308L2J1dHRvbj5cbiAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImRyb25lLXNlbGVjdG9yX19mbGlnaHRcIiBvbkNsaWNrPXsoKSA9PiB0b2dnbGVWaXNpYmlsaXR5KGl0ZW0pfT5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImRyb25lLXNlbGVjdG9yX19kYXRlXCI+e2l0ZW0uZGF0ZSA/IGl0ZW0uZGF0ZUtleS5zcGxpdCgnLScpLnJldmVyc2UoKS5qb2luKCcvJykgOiAnU0lOIEZFQ0hBJ308L3NwYW4+XG4gICAgICAgICAgICA8c3Ryb25nPntpdGVtLnBsYWNlfTwvc3Ryb25nPjxzbWFsbCB0aXRsZT17aXRlbS50aXRsZX0+e2l0ZW0ucGFyZW50VGl0bGV9PC9zbWFsbD5cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRyb25lLXNlbGVjdG9yX19hY3Rpb25zXCI+PGJ1dHRvbiB0aXRsZT1cIkNvbXBhcmFyXCIgY2xhc3NOYW1lPXtjb21wYXJlSWRzLmluY2x1ZGVzKGl0ZW0uaWQpID8gJ2lzLWFjdGl2ZScgOiAnJ30gb25DbGljaz17KCkgPT4gdG9nZ2xlQ29tcGFyZShpdGVtKX0+4oeEPC9idXR0b24+PGJ1dHRvbiB0aXRsZT1cIkFjZXJjYXJcIiBvbkNsaWNrPXsoKSA9PiB6b29tVG8oaXRlbSl9PuKMljwvYnV0dG9uPjwvZGl2PlxuICAgICAgICA8L2FydGljbGU+KX1cbiAgICAgICAgeyFsb2FkaW5nICYmICFmaWx0ZXJlZC5sZW5ndGggJiYgPGRpdiBjbGFzc05hbWU9XCJkcm9uZS1zZWxlY3Rvcl9fbm8tcmVzdWx0c1wiPjxzdHJvbmc+U2luIGNvaW5jaWRlbmNpYXM8L3N0cm9uZz48cD5QcnVlYmUgb3RyYSBmZWNoYSBvIHTDqXJtaW5vIGRlIGLDunNxdWVkYS48L3A+PGJ1dHRvbiBvbkNsaWNrPXtjbGVhckZpbHRlcnN9PlJlc3RhYmxlY2VyIGZpbHRyb3M8L2J1dHRvbj48L2Rpdj59XG4gICAgICA8L21haW4+XG4gICAgPC8+fVxuICAgIHtsb2FkaW5nICYmIDxkaXYgY2xhc3NOYW1lPVwiZHJvbmUtc2VsZWN0b3JfX2xvYWRpbmdcIj48aT48L2k+PHNwYW4+QWN0dWFsaXphbmRvIHZ1ZWxvc+KApjwvc3Bhbj48L2Rpdj59XG4gICAgPGZvb3Rlcj48c3BhbiBjbGFzc05hbWU9e2dyb3VwRm91bmQgPyAnaXMtcmVhZHknIDogJyd9Pjwvc3Bhbj57Z3JvdXBGb3VuZCA/ICdDYXTDoWxvZ28gY29uZWN0YWRvIGFsIG1hcGEnIDogJ0VzcGVyYW5kbyBjYXTDoWxvZ28nfTwvZm9vdGVyPlxuICA8L2Rpdj5cbn1cblxuZXhwb3J0IGRlZmF1bHQgV2lkZ2V0XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=