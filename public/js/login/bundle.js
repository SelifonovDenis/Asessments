/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./public/js/login/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./public/js/login/EventManager.js":
/*!*****************************************!*\
  !*** ./public/js/login/EventManager.js ***!
  \*****************************************/
/*! exports provided: auth */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"auth\", function() { return auth; });\n/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./component */ \"./public/js/login/component.js\");\n\r\n\r\nfunction auth(){\r\n    //клик по кнопке \"войти\"\r\n    $$(\"Auth\").attachEvent(\"onItemClick\",function(){\r\n        Object(_component__WEBPACK_IMPORTED_MODULE_0__[\"login\"])();\r\n    });\r\n}\n\n//# sourceURL=webpack:///./public/js/login/EventManager.js?");

/***/ }),

/***/ "./public/js/login/Provider.js":
/*!*************************************!*\
  !*** ./public/js/login/Provider.js ***!
  \*************************************/
/*! exports provided: loginJSON */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"loginJSON\", function() { return loginJSON; });\n/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./component */ \"./public/js/login/component.js\");\n\r\n\r\nfunction loginJSON(data)\r\n{\r\n    var url = 'login';\r\n\r\n    fetch(url, {\r\n        method: 'POST', // или 'PUT'\r\n        body: JSON.stringify(data), // data может быть типа `string` или {object}!\r\n        headers:{\r\n            'Content-Type': 'application/json'\r\n        }\r\n    }).then(res => res.json())\r\n        .then(response => Object(_component__WEBPACK_IMPORTED_MODULE_0__[\"loginResult\"])(JSON.stringify(response)))\r\n        .catch(error => alert('Ошибка:', error));\r\n\r\n}\r\n\r\n\r\n\n\n//# sourceURL=webpack:///./public/js/login/Provider.js?");

/***/ }),

/***/ "./public/js/login/component.js":
/*!**************************************!*\
  !*** ./public/js/login/component.js ***!
  \**************************************/
/*! exports provided: login, loginResult */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"login\", function() { return login; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"loginResult\", function() { return loginResult; });\n/* harmony import */ var _Provider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Provider */ \"./public/js/login/Provider.js\");\n\r\n\r\nfunction login() {\r\n    var str = {login: $$(\"login\").getValue(), password: $$(\"password\").getValue()};\r\n    Object(_Provider__WEBPACK_IMPORTED_MODULE_0__[\"loginJSON\"])(str);\r\n}\r\n\r\nfunction loginResult(user){\r\n    user = JSON.parse(user);\r\n    if (typeof user['Message'] == \"undefined\") {\r\n        if(user.Id!=\"0\") {\r\n            var url = \"/candidates\";\r\n            document.location.href = url;\r\n        }\r\n        else{\r\n            alert(\"Неверный логин и/или пароль\")\r\n        }\r\n    }\r\n    else {\r\n        alert(user.Message)\r\n    }\r\n\r\n}\n\n//# sourceURL=webpack:///./public/js/login/component.js?");

/***/ }),

/***/ "./public/js/login/main.js":
/*!*********************************!*\
  !*** ./public/js/login/main.js ***!
  \*********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./view */ \"./public/js/login/view.js\");\n/* harmony import */ var _EventManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EventManager */ \"./public/js/login/EventManager.js\");\n\r\n\r\n\r\nwebix.ready(function () {\r\n    Object(_view__WEBPACK_IMPORTED_MODULE_0__[\"welcome\"])();\r\n    Object(_EventManager__WEBPACK_IMPORTED_MODULE_1__[\"auth\"])();\r\n})\r\n\r\n\n\n//# sourceURL=webpack:///./public/js/login/main.js?");

/***/ }),

/***/ "./public/js/login/view.js":
/*!*********************************!*\
  !*** ./public/js/login/view.js ***!
  \*********************************/
/*! exports provided: welcome */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"welcome\", function() { return welcome; });\n\r\nfunction welcome() {\r\n    webix.ui({\r\n        view: \"window\",\r\n        id: \"loginWindow\",\r\n        position: \"center\",\r\n        width: 500,\r\n        head: \"Добро пожаловать\",\r\n        body: {\r\n            type: \"space\",\r\n            rows: [\r\n                {view: \"text\", id: \"login\", label: \"Логин\"},\r\n                {view: \"text\", id: \"password\", label: \"Пароль\"},\r\n                {height: 20},\r\n                {view: \"button\", id: \"Auth\", value: \"Войти\"}\r\n            ]\r\n        }\r\n\r\n    }).show();\r\n}\r\n\r\n\r\n\n\n//# sourceURL=webpack:///./public/js/login/view.js?");

/***/ })

/******/ });