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
/******/ 	return __webpack_require__(__webpack_require__.s = "./public/js/index/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./public/js/index/EventManager.js":
/*!*****************************************!*\
  !*** ./public/js/index/EventManager.js ***!
  \*****************************************/
/*! exports provided: Manager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Manager\", function() { return Manager; });\n/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./component */ \"./public/js/index/component.js\");\n\r\n\r\n\r\n\r\n\r\n\r\n\r\nfunction Manager(){\r\n    //клик по кнопке \"справочная информация\"\r\n    $$(\"redirect\").attachEvent(\"onItemClick\",function(){\r\n        Object(_component__WEBPACK_IMPORTED_MODULE_0__[\"redirect\"])(\"workers.html\")\r\n    });\r\n    $$(\"redirect2\").attachEvent(\"onItemClick\",function(){\r\n        Object(_component__WEBPACK_IMPORTED_MODULE_0__[\"redirect\"])(\"asessments.html\");\r\n    });\r\n    //клик по кнопке \"добавить кандидата\" на тулбаре\r\n    $$(\"viewAdd\").attachEvent(\"onItemClick\",function(){\r\n        Object(_component__WEBPACK_IMPORTED_MODULE_0__[\"viewAdd\"])()\r\n    });\r\n//клик по кнопке \"изменить\" на тулбаре\r\n    $$(\"changeButton\").attachEvent(\"onItemClick\",function(){\r\n        Object(_component__WEBPACK_IMPORTED_MODULE_0__[\"windowchange\"])();\r\n        Object(_component__WEBPACK_IMPORTED_MODULE_0__[\"viewChange\"])();\r\n    });\r\n//клик по элементу таблицы\r\n    $$(\"datatable\").attachEvent(\"onItemClick\",function(id){\r\n        Object(_component__WEBPACK_IMPORTED_MODULE_0__[\"view\"])(this.data.pull[id.row].id);\r\n    });\r\n    //клик по кнопке \"назначить дату собеседования\"\r\n    $$(\"butAddDate\").attachEvent(\"onItemClick\",function(){\r\n        Object(_component__WEBPACK_IMPORTED_MODULE_0__[\"viewAddDate\"])();\r\n    });\r\n}\r\n\n\n//# sourceURL=webpack:///./public/js/index/EventManager.js?");

/***/ }),

/***/ "./public/js/index/component.js":
/*!**************************************!*\
  !*** ./public/js/index/component.js ***!
  \**************************************/
/*! exports provided: redirect, viewAdd, windowchange, viewChange, view, viewAddDate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"redirect\", function() { return redirect; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"viewAdd\", function() { return viewAdd; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"windowchange\", function() { return windowchange; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"viewChange\", function() { return viewChange; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"view\", function() { return view; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"viewAddDate\", function() { return viewAddDate; });\n\r\nfunction redirect(str){\r\n    window.location.href = str;\r\n}\r\n\r\nfunction viewAdd(){\r\n    $$(\"add\").show();\r\n}\r\n\r\nfunction windowchange() {\r\n    $$(\"changeWindow\").show();\r\n}\r\n\r\n//отображение атрибутов кандидата в окне изменения\r\nfunction viewChange(){\r\n    $$(\"changeFamily\").setValue($$(\"rfamily\").getValue());\r\n    $$(\"changeName\").setValue($$(\"rname\").getValue());\r\n    $$(\"changeSubname\").setValue($$(\"rsubname\").getValue());\r\n    $$(\"changePhone\").setValue($$(\"rphone\").getValue());\r\n    $$(\"changeEmail\").setValue($$(\"remail\").getValue());\r\n    $$(\"changeStatus\").setValue($$(\"rstatus\").getValue());\r\n    $$(\"changeDate\").setValue($$(\"rdate\").getValue());\r\n}\r\n\r\n//отображение атрибутов выбранного кандидата в правой части\r\nfunction view(id){\r\n    $$(\"changeButton\").enable();\r\n    $$(\"butAddDate\").enable();\r\n    candidate.forEach(function(elem, index){\r\n        if(id === elem.id)\r\n        {\r\n            $$(\"rfamily\").setValue(elem.family);\r\n            $$(\"rname\").setValue(elem.name);\r\n            $$(\"rsubname\").setValue(elem.subname);\r\n            $$(\"rphone\").setValue(elem.phone);\r\n            $$(\"remail\").setValue(elem.email);\r\n            $$(\"rstatus\").setValue(elem.status);\r\n            $$(\"rdate\").setValue(elem.date);\r\n        }\r\n    });\r\n}\r\n\r\nfunction viewAddDate(){\r\n    $$(\"addDate\").show();\r\n}\r\n\n\n//# sourceURL=webpack:///./public/js/index/component.js?");

/***/ }),

/***/ "./public/js/index/main.js":
/*!*********************************!*\
  !*** ./public/js/index/main.js ***!
  \*********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./view */ \"./public/js/index/view.js\");\n/* harmony import */ var _EventManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EventManager */ \"./public/js/index/EventManager.js\");\n\r\n\r\n\r\nwebix.ready(function () {\r\n    Object(_view__WEBPACK_IMPORTED_MODULE_0__[\"welcome\"])();\r\n    Object(_EventManager__WEBPACK_IMPORTED_MODULE_1__[\"Manager\"])();\r\n\r\n})\r\n\n\n//# sourceURL=webpack:///./public/js/index/main.js?");

/***/ }),

/***/ "./public/js/index/view.js":
/*!*********************************!*\
  !*** ./public/js/index/view.js ***!
  \*********************************/
/*! exports provided: welcome */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"welcome\", function() { return welcome; });\n//Кандидаты\r\nvar candidate = [];\r\n\tcandidate [0] = {\r\n\t\tid: 1,\r\n\t\tactive:0,\r\n\t\tfamily: \"Иванов\",\r\n\t\tname: \"Иван\",\r\n\t\tsubname:\"Иванович\",\r\n\t\tphone:\"8 800 555 35 35\",\r\n\t\temail:\"Ivan@mail.ru\",\r\n\t\tstatus:\"Назначено собеседование\",\r\n\t\tdate:\"25.07.19\"\r\n\t}\r\n\tcandidate [1] = {\r\n\t\tid: 2,\r\n\t\tactive:0,\r\n\t\tfamily: \"Петров\",\r\n\t\tname: \"Петр\",\r\n\t\tsubname:\"Петрович\",\r\n\t\tphone:\"8 500 444 44 44\",\r\n\t\temail:\"petya@mail.ru\",\r\n\t\tstatus:\"Принят на стажировку\",\r\n\t\tdate:\"\"\r\n\t}\r\n\tcandidate [2] = {\r\n\t\tid: 3,\r\n\t\tactive:0,\r\n\t\tfamily: \"Николаев\",\r\n\t\tname: \"Игорь\",\r\n\t\tsubname:\"Николаевич\",\r\n\t\tphone:\"8 333 333 22 22\",\r\n\t\temail:\"Ivan@mail.ru\",\r\n\t\tstatus:\"Отправлен оффер\",\r\n\t\tdate:\"25.07.19\"\r\n\t}\r\n\r\n\r\n\r\nfunction welcome(){\r\n\tvar heightScreen = document.body.clientHeight;\r\n\tvar widthScreen = document.body.clientWidth;\r\n    webix.ui({\r\n\t\ttype:\"clean\",\r\n\t\tcontainer:\"leftPart\",\r\n\t\tcols:[\r\n\t\t\t{ rows:[\r\n\t\t\t\t{\r\n\t\t\t\t\tview:\"toolbar\", elements:[\r\n\t\t\t\t\t\t{view:\"button\", value:\"Меню\", width:60, popup:\"menu\"},\r\n\t\t\t\t\t\t{view:\"label\",type:\"clean\", label:\"Учёт кандидатов\", height:40, css:\"logo\", align:\"center\", margin:0},\r\n\t\t\t\t\t],\r\n\t\t\t\t\tcss:\"nav\"\r\n\t\t\t\t},\r\n\t\t\t\t{view:\"toolbar\", elements:[\r\n\t\t\t\t\t\r\n\t\t\t\t\t\t{view:\"button\", value:\"Кандидаты\"},\r\n\t\t\t\t\t\t{view:\"button\", value:\"Добавить кандидата\", height:50, id:\"viewAdd\"},\r\n\t\t\t\t\t\t{view:\"button\", id:\"changeButton\", value:\"Изменить\", disabled:true},\r\n\t\t\t\t\t\t{view:\"button\", value:\"Архив\"},\r\n\t\t\t\t\t\t{view:\"button\", value:\"Пройдено успешно\"},\r\n\t\t\t\t\t\t{view:\"button\", value:\"Пройдено не успешно\"}\r\n\t\t\t\t\t],\r\n\t\t\t\t\tcss:\"nav\"\r\n\t\t\t\t},\r\n\t\t\t\t{\r\n\t\t\t\t\tcols:[\r\n\t\t\t\t\t\t{view:\"accordion\",\r\n\t\t\t\t\t\tmulti:true,\r\n\t\t\t\t\t\tcollapsed: true,\r\n\t\t\t\t\t\tcols:[ //or rows \r\n\t\t\t\t\t\t\t{ header:\"Поиск\", body:{\r\n\t\t\t\t\t\t\t\t\t\t\t\ttype:\"space\",\t\r\n\t\t\t\t\t\t\t\t\t\t\t\trows:[\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t{view:\"text\", id:\"searchFamily\", label:\"Фамилия\"},\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t{view:\"text\", id:\"searchName\", label:\"Имя\"},\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t{view:\"text\", id:\"searchSubname\", label:\"Отчество\"},\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t{view:\"text\", id:\"searchPhone\", label:\"Телефон\"},\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t{view:\"text\", id:\"searchEmail\", label:\"Почта\"},\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t{view:\"text\", id:\"searchStatus\", label:\"Статус\"},\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t{view:\"text\", id:\"searchDate\", label:\"Дата собеседования\", labelWidth: 150},\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t{height:20},\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t{view:\"button\", value:\"Найти\"},\t\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t]\r\n\t\t\t\t\t\t\t\t\t\t\t\t},\t\t\t\t\r\n\t\t\t\t\t\t\twidth: widthScreen*0.2 \r\n\t\t\t\t\t\t\t}\r\n\t\t\t\t\t\t]},\r\n\t\t\t\t\t\t{\r\n\t\t\t\t\t\t\tview:\"datatable\",\r\n\t\t\t\t\t\t\tid:\"datatable\",\r\n\t\t\t\t\t\t\tcolumns:[\r\n\t\t\t\t\t\t\t\t{ id:\"active\", header: \"\", template:\"{common.checkbox()}\", width:30},\r\n\t\t\t\t\t\t\t\t{ id:\"id\",    header:\"Id\", width:30},\r\n\t\t\t\t\t\t\t\t{ id:\"family\", header:\"Фамилия\",fillspace:true},\r\n\t\t\t\t\t\t\t\t{ id:\"name\", header:\"Имя\",fillspace:true},\r\n\t\t\t\t\t\t\t\t{ id:\"subname\", header:\"Отчество\",fillspace:true},\r\n\t\t\t\t\t\t\t\t{ id:\"status\", header:[\"Статус\", {content:\"selectFilter\"}], width:250},\r\n\t\t\t\t\t\t\t\t{ id:\"date\", header:[\"Дата собеседования\", {content:\"selectFilter\"}], width:200}\r\n\t\t\t\t\t\t\t],\r\n\t\t\t\t\t\t\tdata: candidate,\r\n\t\t\t\t\t\t\tselect:\"row\",\r\n\t\t\t\t\t\t\theight: heightScreen-100\t\r\n\t\t\t\t\t\t}\r\n\t\t\t\t\t]\r\n\t\t\t\t\r\n\t\t\t\t}\r\n\t\t\t], width: widthScreen*0.75},\r\n\t\t\t{\r\n\t\t\t\trows:[\t\t\t\t\r\n\t\t\t\t\t{view:\"label\", label:\"<img src=\\\"../../../public/img/logo.png\\\">\",height:101, align:\"center\", css:\"logotype\"},\t\r\n\t\t\t\t\t{\r\n\t\t\t\t\t\ttype:\"space\",\r\n\t\t\t\t\t\trows:[\r\n\t\t\t\t\t\t\t{view:\"text\", id:\"rfamily\", label:\"Фамилия\", readonly:true},\r\n\t\t\t\t\t\t\t{view:\"text\", id:\"rname\", label:\"Имя\", readonly:true},\r\n\t\t\t\t\t\t\t{view:\"text\", id:\"rsubname\", label:\"Отчество\", readonly:true},\r\n\t\t\t\t\t\t\t{view:\"text\", id:\"rphone\", label:\"Телефон\", readonly:true},\r\n\t\t\t\t\t\t\t{view:\"text\", id:\"remail\", label:\"Почта\", readonly:true},\r\n\t\t\t\t\t\t\t{view:\"text\", id:\"rstatus\", label:\"Статус\", readonly:true},\r\n\t\t\t\t\t\t\t{view:\"text\", id:\"rdate\", label:\"Дата собеседования\", labelWidth: 150, readonly:true},\r\n\t\t\t\t\t\t\t{height:40},\r\n\t\t\t\t\t\t\t{view:\"button\",id:\"butAddDate\", value:\"Назначить дату собеседования\", disabled:true},\r\n\t\t\t\t\t\t\t{view:\"button\", value:\"Переместить в архив\"},\r\n\t\t\t\t\t\t\t{view:\"button\", value:\"Удалить кандидата\"},\r\n\r\n\t\t\t\t\t\t],\r\n\t\t\t\t\t\theight:heightScreen-101\r\n\t\t\t\t\t}\t\r\n\t\t\t\t]\r\n\t\t\t}\r\n\t\t]\r\n\t});\r\n\r\n\t//меню\r\n\twebix.ui({\r\n\t\tview:\"popup\",\r\n\t\tid:\"menu\",\r\n\t\theight:250,\r\n\t\twidth:300,\r\n\t\tbody:{\r\n\t\t\trows:[\r\n\t\t\t\t{view:\"button\", value:\"Учёт сотрудников\", id:\"redirect\"},\r\n\t\t\t\t{view:\"button\", value:\"Собеседования\", id:\"redirect2\"},\r\n\t\t\t\t{view:\"button\", value:\"Выход\", id:\"out\"},\r\n\t\t\t]\r\n\t\t}\r\n\t}).hide();\r\n\r\n\t//всплывающее окно \"изменить\"\r\n\twebix.ui({\r\n\t\tview:\"window\",\r\n\t\tid:\"changeWindow\",\r\n\t\tposition:\"center\",\r\n\t\twidth: 500,\r\n\t\tmodal: true,\r\n\t\thead:\"Изменить\",\r\n\t\tclose:true,\r\n\t\tbody:{\r\n\t\t\ttype:\"space\",\r\n\t\t\trows:[\r\n\t\t\t\t{view:\"text\", id:\"changeFamily\", label:\"Фамилия\"},\r\n\t\t\t\t{view:\"text\", id:\"changeName\", label:\"Имя\"},\r\n\t\t\t\t{view:\"text\", id:\"changeSubname\", label:\"Отчество\"},\r\n\t\t\t\t{view:\"text\", id:\"changePhone\", label:\"Телефон\"},\r\n\t\t\t\t{view:\"text\", id:\"changeEmail\", label:\"Почта\"},\r\n\t\t\t\t{\r\n\t\t\t\t\tview:\"combo\",\r\n\t\t\t\t\tid:\"changeStatus\",\r\n\t\t\t\t\tvalue:\"\",\r\n\t\t\t\t\tlabel: 'Статус',\r\n\t\t\t\t\toptions:[\"Ожидаем ответа\",\"Назначено собеседование\", \"Принят на стажировку\", \"Отправлен оффер\", \"Не принят на стажировку\"]\r\n\t\t\t\t},\r\n\t\t\t\t{view:\"text\", id:\"changeDate\", label:\"Дата собеседования\", labelWidth: 150},\r\n\t\t\t\t{height:20},\r\n\t\t\t\t{view:\"button\", value:\"Назначить дату собеседования\"},\r\n\t\t\t\t{view:\"button\", value:\"Сохранить изменения\"},\r\n\t\t\t]\r\n\t\t}\r\n\t}).hide();\r\n\r\n\twebix.Date.startOnMonday = true;\r\n\t//добаить дату\r\n\twebix.ui({\r\n\t\tview:\"window\",\r\n\t\tposition:\"center\",\r\n\t\tid:\"addDate\",\r\n\t\twidth: 500,\r\n\t\tmodal: true,\r\n\t\thead:\"Добавить\",\r\n\t\tclose:true,\r\n\t\tbody:{\r\n\t\t\ttype:\"space\",\r\n\t\t\trows:[\r\n\t\t\t\t{\r\n\t\t\t\t\tview:\"calendar\",\r\n\t\t\t\t\tid:\"my_calendar\",\r\n\t\t\t\t\tdate:new Date(),\r\n\t\t\t\t\tweekHeader:true,\r\n\t\t\t\t\tevents:webix.Date.isHoliday,\r\n\t\t\t\t\twidth:300,\r\n\t\t\t\t\theight:250\r\n\t\t\t\t},\r\n\t\t\t\t{height:20},\r\n\t\t\t\t{view:\"button\", value:\"Добавить дату\"},\r\n\t\t\t]\r\n\t\t}\r\n\t}).hide();\r\n\r\n\t//всплывающее окно \"Добавить кандидата\"\r\n\twebix.ui({\r\n\t\tview:\"window\",\r\n\t\tposition:\"center\",\r\n\t\tid:\"add\",\r\n\t\twidth: 500,\r\n\t\tmodal: true,\r\n\t\thead:\"Добавить\",\r\n\t\tclose:true,\r\n\t\tbody:{\r\n\t\t\ttype:\"space\",\r\n\t\t\trows:[\r\n\t\t\t\t{view:\"text\", name:\"family\", label:\"Фамилия\"},\r\n\t\t\t\t{view:\"text\", name:\"name\", label:\"Имя\"},\r\n\t\t\t\t{view:\"text\", name:\"subname\", label:\"Отчество\"},\r\n\t\t\t\t{view:\"text\", name:\"phone\", label:\"Телефон\"},\r\n\t\t\t\t{view:\"text\", name:\"address\", label:\"Почта\"},\r\n\t\t\t\t{\r\n\t\t\t\t\tview:\"combo\",\r\n\t\t\t\t\tlabel: 'Статус',\r\n\t\t\t\t\tid:\"status\",\r\n\t\t\t\t\toptions:[\"Ожидаем ответа\",\"Назначено собеседование\", \"Принят на стажировку\", \"Отправлен оффер\", \"Не принят на стажировку\"]\r\n\t\t\t\t},\r\n\t\t\t\t{view:\"text\", name:\"date\", label:\"Дата собеседования\", labelWidth: 150},\r\n\t\t\t\t{height:20},\r\n\t\t\t\t{view:\"button\", value:\"Назначить дату собеседования\"},\r\n\t\t\t\t{view:\"button\", value:\"Добавить кандидата\"},\r\n\t\t\t]\r\n\t\t}\r\n\t}).hide();\r\n}\r\n\r\n\r\n\r\n\r\n\r\n\t\r\n\n\n//# sourceURL=webpack:///./public/js/index/view.js?");

/***/ })

/******/ });