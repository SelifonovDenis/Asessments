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
/******/ 	return __webpack_require__(__webpack_require__.s = "./public/js/workers/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./public/js/workers/EventManager.js":
/*!*******************************************!*\
  !*** ./public/js/workers/EventManager.js ***!
  \*******************************************/
/*! exports provided: Manager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Manager\", function() { return Manager; });\n/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./component */ \"./public/js/workers/component.js\");\n\r\n\r\n\r\n\r\n\r\n\r\nfunction Manager(){\r\n\r\n    $$(\"redirect\").attachEvent(\"onItemClick\",function(){\r\n        Object(_component__WEBPACK_IMPORTED_MODULE_0__[\"redirect\"])(\"index.html\")\r\n    });\r\n    $$(\"redirect2\").attachEvent(\"onItemClick\",function(){\r\n        Object(_component__WEBPACK_IMPORTED_MODULE_0__[\"redirect\"])(\"asessments.html\");\r\n    });\r\n    //клик по кнопке \"добавить кандидата\" на тулбаре\r\n    $$(\"viewAdd\").attachEvent(\"onItemClick\",function(){\r\n        Object(_component__WEBPACK_IMPORTED_MODULE_0__[\"viewAdd\"])();\r\n    });\r\n//клик по кнопке \"изменить\" на тулбаре\r\n    $$(\"changeButton\").attachEvent(\"onItemClick\",function(){\r\n        Object(_component__WEBPACK_IMPORTED_MODULE_0__[\"viewChange\"])($$(\"datatable\").getSelectedItem().id);\r\n    });\r\n//клик по элементу таблицы\r\n    $$(\"datatable\").attachEvent(\"onItemClick\",function(id){\r\n        Object(_component__WEBPACK_IMPORTED_MODULE_0__[\"view\"])(this.data.pull[id.row].id);\r\n    });\r\n    //клик по кнопке \"назначить дату собеседования\"\r\n    $$(\"butAddDate\").attachEvent(\"onItemClick\",function(){\r\n        Object(_component__WEBPACK_IMPORTED_MODULE_0__[\"viewAddDate\"])();\r\n    });\r\n}\r\n\n\n//# sourceURL=webpack:///./public/js/workers/EventManager.js?");

/***/ }),

/***/ "./public/js/workers/component.js":
/*!****************************************!*\
  !*** ./public/js/workers/component.js ***!
  \****************************************/
/*! exports provided: viewAdd, viewAddDate, redirect, viewChange, asessment, view */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"viewAdd\", function() { return viewAdd; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"viewAddDate\", function() { return viewAddDate; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"redirect\", function() { return redirect; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"viewChange\", function() { return viewChange; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"asessment\", function() { return asessment; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"view\", function() { return view; });\n/* harmony import */ var _view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./view */ \"./public/js/workers/view.js\");\n\r\nfunction viewAdd(){\r\n    $$(\"add\").show();\r\n}\r\nfunction viewAddDate(){\r\n    $$(\"addDate\").show();\r\n}\r\nfunction redirect(str){\r\n    window.location.href = str;\r\n}\r\n\r\n//отображение атрибутов кандидата в окне изменения\r\nfunction viewChange(id){\r\n    _view__WEBPACK_IMPORTED_MODULE_0__[\"worker\"].forEach(function(elem, index){\r\n        if(id === elem.id)\r\n        {\r\n            $$(\"changeFamily\").setValue(elem.family);\r\n            $$(\"changeName\").setValue(elem.name);\r\n            $$(\"changeSubname\").setValue(elem.subname);\r\n            $$(\"changePhone\").setValue(elem.phone);\r\n            $$(\"changeEmail\").setValue(elem.email);\r\n            $$(\"changeWindow\").show();\r\n        }\r\n    });\r\n\r\n}\r\nvar asessment = [];\r\nasessment [0] = {\r\n    id: 1,\r\n    active:0,\r\n    date:\"25.06.19\",\r\n    room:\"2\",\r\n    id_worker:3,\r\n}\r\nasessment [1] = {\r\n    id: 2,\r\n    active:0,\r\n    date:\"25.07.19\",\r\n    room:\"3\",\r\n    id_worker:2,\r\n}\r\nasessment [2] = {\r\n    id: 3,\r\n    active:0,\r\n    date:\"25.08.19\",\r\n    room:\"4\",\r\n    id_worker:1,\r\n}\r\n//отображение назначенных дат собеседований выбранного сотрудника в правой части\r\nfunction view(id){\r\n    $$(\"changeButton\").enable();\r\n    $$(\"butAddDate\").enable();\r\n    $$(\"dates\").clearAll();\r\n    _view__WEBPACK_IMPORTED_MODULE_0__[\"worker\"].forEach(function(elem, index){\r\n        if(id === elem.id)\r\n        {\r\n            asessment.forEach(function(aseselem){\r\n                if (elem.id === aseselem.id_worker) {\r\n                    $$(\"dates\").add({\r\n                        id: aseselem.id,\r\n                        title: aseselem.date,\r\n                    },0)\r\n                }\r\n\r\n            })\r\n\r\n        }\r\n    });\r\n}\r\n\n\n//# sourceURL=webpack:///./public/js/workers/component.js?");

/***/ }),

/***/ "./public/js/workers/main.js":
/*!***********************************!*\
  !*** ./public/js/workers/main.js ***!
  \***********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./view */ \"./public/js/workers/view.js\");\n/* harmony import */ var _EventManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EventManager */ \"./public/js/workers/EventManager.js\");\n\r\n\r\n\r\nwebix.ready(function () {\r\n    Object(_view__WEBPACK_IMPORTED_MODULE_0__[\"welcome\"])();\r\n    Object(_EventManager__WEBPACK_IMPORTED_MODULE_1__[\"Manager\"])();\r\n})\r\n\n\n//# sourceURL=webpack:///./public/js/workers/main.js?");

/***/ }),

/***/ "./public/js/workers/view.js":
/*!***********************************!*\
  !*** ./public/js/workers/view.js ***!
  \***********************************/
/*! exports provided: worker, welcome */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"worker\", function() { return worker; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"welcome\", function() { return welcome; });\n//Сотрудники\r\nvar worker = [];\r\nworker [0] = {\r\n\tid: 1,\r\n\tactive:0,\r\n\tfamily: \"Иванов\",\r\n\tname: \"Иван\",\r\n\tsubname:\"Иванович\",\r\n\tphone:\"8 800 555 35 35\",\r\n\temail:\"Ivan@mail.ru\",\r\n}\r\nworker [1] = {\r\n\tid: 2,\r\n\tactive:0,\r\n\tfamily: \"Петров\",\r\n\tname: \"Петр\",\r\n\tsubname:\"Петрович\",\r\n\tphone:\"8 500 444 44 44\",\r\n\temail:\"petya@mail.ru\",\r\n}\r\nworker [2] = {\r\n\tid: 3,\r\n\tactive:0,\r\n\tfamily: \"Николаев\",\r\n\tname: \"Игорь\",\r\n\tsubname:\"Николаевич\",\r\n\tphone:\"8 333 333 22 22\",\r\n\temail:\"Ivan@mail.ru\",\r\n}\r\n\r\n\r\n\r\nfunction welcome(){\r\n\tvar heightScreen = document.body.clientHeight;\r\n\tvar widthScreen = document.body.clientWidth;\r\n\t//Левая часть\r\n    webix.ui({\r\n\t\ttype:\"clean\",\r\n\t\tcontainer:\"leftPart\",\r\n\t\tcols:[\r\n\t\t\t{ rows:[\r\n\t\t\t\t{\r\n\t\t\t\t\tview:\"toolbar\", elements:[\r\n\t\t\t\t\t\t{view:\"button\", value:\"Меню\", width:60, popup:\"menus\"},\r\n\t\t\t\t\t\t{view:\"label\",type:\"clean\", label:\"Сотрудники\", height:40, css:\"logo\", align:\"center\", margin:0},\r\n\t\t\t\t\t],\r\n\t\t\t\t\tcss:\"nav\"\r\n\t\t\t\t},\r\n\t\t\t\t{view:\"toolbar\", elements:[\r\n\t\t\t\t\t\t{view:\"button\", value:\"Сотрудники\"},\r\n\t\t\t\t\t\t{view:\"button\", value:\"Добавить сотрудника\", height:50, id:\"viewAdd\"},\r\n\t\t\t\t\t\t{view:\"button\", id:\"changeButton\", value:\"Изменить\", disabled:true},\r\n\t\t\t\t\t\t{view:\"button\", value:\"Удалить\"},\r\n\t\t\t\t\t],\r\n\t\t\t\t\tcss:\"nav\"\r\n\t\t\t\t},\r\n\t\t\t\t{\r\n\t\t\t\t\tcols:[\r\n\t\t\t\t\t\t{view:\"accordion\",\r\n\t\t\t\t\t\tmulti:true,\r\n\t\t\t\t\t\tcollapsed: true,\r\n\t\t\t\t\t\tcols:[\r\n\t\t\t\t\t\t\t{ header:\"Поиск\", body:{\r\n\t\t\t\t\t\t\t\ttype:\"space\",\t\r\n\t\t\t\t\t\t\t\trows:[\r\n\t\t\t\t\t\t\t\t\t\t{view:\"text\", id:\"searchFamily\", label:\"Фамилия\"},\r\n\t\t\t\t\t\t\t\t\t\t{view:\"text\", id:\"searchName\", label:\"Имя\"},\r\n\t\t\t\t\t\t\t\t\t\t{view:\"text\", id:\"searchSubname\", label:\"Отчество\"},\r\n\t\t\t\t\t\t\t\t\t\t{view:\"text\", id:\"searchPhone\", label:\"Телефон\"},\r\n\t\t\t\t\t\t\t\t\t\t{view:\"text\", id:\"searchEmail\", label:\"Почта\"},\r\n\t\t\t\t\t\t\t\t\t\t{view:\"text\", id:\"searchDate\", label:\"Дата собеседования\", labelWidth: 150},\r\n\t\t\t\t\t\t\t\t\t\t{height:20},\r\n\t\t\t\t\t\t\t\t\t\t{view:\"button\", value:\"Найти\"},\t\r\n\t\t\t\t\t\t\t\t\t]\r\n\t\t\t\t\t\t\t\t},\t\t\t\t\r\n\t\t\t\t\t\t\twidth: widthScreen*0.2 \r\n\t\t\t\t\t\t\t}\r\n\t\t\t\t\t\t]},\r\n\t\t\t\t\t\t{\r\n\t\t\t\t\t\t\tview:\"datatable\",\r\n\t\t\t\t\t\t\tid:\"datatable\",\r\n\t\t\t\t\t\t\tcolumns:[\r\n\t\t\t\t\t\t\t\t{ id:\"active\", header: \"\", template:\"{common.checkbox()}\", width:30},\r\n\t\t\t\t\t\t\t\t{ id:\"id\",    header:\"Id\", width:30},\r\n\t\t\t\t\t\t\t\t{ id:\"family\", header:\"Фамилия\",fillspace:true},\r\n\t\t\t\t\t\t\t\t{ id:\"name\", header:\"Имя\",fillspace:true},\r\n\t\t\t\t\t\t\t\t{ id:\"subname\", header:\"Отчество\",fillspace:true},\r\n\t\t\t\t\t\t\t\t{ id:\"phone\", header:\"Телефон\", width:250},\r\n\t\t\t\t\t\t\t\t{ id:\"email\", header:\"Почта\", width:200}\r\n\t\t\t\t\t\t\t],\r\n\t\t\t\t\t\t\tdata: worker,\r\n\t\t\t\t\t\t\tselect:\"row\",\r\n\t\t\t\t\t\t\theight: heightScreen-100\t\r\n\t\t\t\t\t\t}\r\n\t\t\t\t\t]\r\n\t\t\t\t\r\n\t\t\t\t}\r\n\t\t\t], width: widthScreen*0.75},\r\n\t\t\t{\r\n\t\t\t\trows:[\t\t\t\t\r\n\t\t\t\t\t{view:\"label\", label:\"<img src=\\\"../../../public/img/logo.png\\\">\",height:101, align:\"center\", css:\"logotype\"},\r\n\t\t\t\t\t{\r\n\t\t\t\t\t\ttype:\"space\",\r\n\t\t\t\t\t\trows:[\r\n\t\t\t\t\t\t\t{view:\"label\", label:\"Даты собеседований\", height:20},\r\n\t\t\t\t\t\t\t{\r\n\t\t\t\t\t\t\t\tview:\"list\",\r\n\t\t\t\t\t\t\t\theight:400,\r\n\t\t\t\t\t\t\t\ttemplate:\"#title#\",\r\n\t\t\t\t\t\t\t\tselect:true,\r\n\t\t\t\t\t\t\t\tid:\"dates\"\r\n\t\t\t\t\t\t\t},\r\n\t\t\t\t\t\t\t{height:40},\r\n\t\t\t\t\t\t\t{view:\"button\", id:\"butAddDate\",value:\"Добавить дату собеседования\", disabled:true},\r\n\t\t\t\t\t\t\t{view:\"button\", value:\"Удалить дату\"},\r\n\t\t\t\t\t\t],\r\n\t\t\t\t\t\theight:heightScreen-101\r\n\t\t\t\t\t}\t\r\n\t\t\t\t]\r\n\t\t\t}\r\n\t\t]\r\n\t});\t\r\n\t\r\n\r\n\t//меню\r\n\twebix.ui({\r\n\t\tview:\"popup\",\r\n\t\tid:\"menus\",\r\n\t\theight:250,\r\n\t\twidth:300,\r\n\t\tbody:{\r\n\t\t\trows:[\r\n\t\t\t\t{view:\"button\", value:\"Учет кандидатов\", id:\"redirect\"},\r\n\t\t\t\t{view:\"button\", value:\"Собеседования\", id:\"redirect2\"},\r\n\t\t\t\t{view:\"button\", value:\"Выход\", id:\"out\"},\r\n\t\t\t]\r\n\t\t}\r\n\t}).hide();\r\n\t\r\n\t\r\n\t//всплывающее окно \"Добавить кандидата\"\r\n\twebix.ui({\r\n    view:\"window\",\r\n\tposition:\"center\",\r\n    id:\"add\",\r\n\twidth: 500,\r\n\tmodal: true,\r\n\thead:\"Добавить\",\r\n    close:true,\r\n    body:{\r\n\t\ttype:\"space\",\r\n\t\trows:[\r\n\t\t\t\t{view:\"text\", name:\"family\", label:\"Фамилия\"},\r\n\t\t\t\t{view:\"text\", name:\"name\", label:\"Имя\"},\r\n\t\t\t\t{view:\"text\", name:\"subname\", label:\"Отчество\"},\r\n\t\t\t\t{view:\"text\", name:\"phone\", label:\"Телефон\"},\r\n\t\t\t\t{view:\"text\", name:\"address\", label:\"Почта\"},\r\n\t\t\t\t{height:20},\r\n\t\t\t\t{view:\"button\", value:\"Добавить сотрудника\"},\r\n\t\t\t]\r\n\t\t}\r\n\t}).hide();\r\n\r\n\t//всплывающее окно \"изменить\"\r\n\twebix.ui({\r\n    view:\"window\",\r\n    id:\"changeWindow\",\r\n\tposition:\"center\",\r\n\twidth: 500,\r\n\tmodal: true,\r\n\thead:\"Изменить\",\r\n    close:true,\r\n    body:{\r\n\t\ttype:\"space\",\t\r\n\t\trows:[\r\n\t\t\t\t{view:\"text\", id:\"changeFamily\", label:\"Фамилия\"},\r\n\t\t\t\t{view:\"text\", id:\"changeName\", label:\"Имя\"},\r\n\t\t\t\t{view:\"text\", id:\"changeSubname\", label:\"Отчество\"},\r\n\t\t\t\t{view:\"text\", id:\"changePhone\", label:\"Телефон\"},\r\n\t\t\t\t{view:\"text\", id:\"changeEmail\", label:\"Почта\"},\r\n\t\t\t\t{height:20},\r\n\t\t\t\t{view:\"button\", value:\"Сохранить изменения\"},\r\n\t\t\t]\r\n\t\t}\r\n\t}).hide();\r\n\r\n//добаить дату\r\n\twebix.ui({\r\n\t\tview:\"window\",\r\n\t\tposition:\"center\",\r\n\t\tid:\"addDate\",\r\n\t\twidth: 500,\r\n\t\tmodal: true,\r\n\t\thead:\"Добавить\",\r\n\t\tclose:true,\r\n\t\tbody:{\r\n\t\t\ttype:\"space\",\r\n\t\t\trows:[\r\n\t\t\t\t\t{\r\n\t\t\t\t\t\tview:\"calendar\",\r\n\t\t\t\t\t\tid:\"my_calendar\",\r\n\t\t\t\t\t\tdate:new Date(),\r\n\t\t\t\t\t\tweekHeader:true,\r\n\t\t\t\t\t\tevents:webix.Date.isHoliday,\r\n\t\t\t\t\t\twidth:300,\r\n\t\t\t\t\t\theight:250\r\n\t\t\t\t\t},\r\n\t\t\t\t\t{height:20},\r\n\t\t\t\t\t{view:\"button\", value:\"Добавить дату\"},\r\n\t\t\t\t]\r\n\t\t\t}\r\n\t\t}).hide();\r\n}\r\n\r\n\r\n\r\n\r\n\r\n\r\n\t\r\n\r\n\r\n\r\n\n\n//# sourceURL=webpack:///./public/js/workers/view.js?");

/***/ })

/******/ });