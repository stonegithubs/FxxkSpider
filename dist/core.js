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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/core/apis/index.ts":
/*!********************************!*\
  !*** ./src/core/apis/index.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nfunction __export(m) {\n    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];\n}\nObject.defineProperty(exports, \"__esModule\", { value: true });\n__export(__webpack_require__(/*! ./task */ \"./src/core/apis/task.ts\"));\n\n\n//# sourceURL=webpack:///./src/core/apis/index.ts?");

/***/ }),

/***/ "./src/core/apis/task.ts":
/*!*******************************!*\
  !*** ./src/core/apis/task.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(__dirname) {\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst moment = __webpack_require__(/*! moment */ \"moment\");\nconst services_1 = __webpack_require__(/*! ../services */ \"./src/core/services/index.ts\");\nconst model_1 = __webpack_require__(/*! ../model */ \"./src/core/model/index.ts\");\nconst xlsx = __webpack_require__(/*! better-xlsx */ \"better-xlsx\");\nconst fs = __webpack_require__(/*! fs */ \"fs\");\nexports.getGoodsListFromPage = async (gameName = \"csgo\", startPage = 1, endPage) => {\n    const desc = `于${moment().format(\"YYYY-MM-DD, h:mm:ss a\")}创建的爬取${gameName}，从第${startPage}页到第${endPage === -1 ? \"最后一\" : endPage}页的任务单`;\n    const task = await model_1.Task.create({\n        desc,\n    });\n    let res = [];\n    try {\n        (async () => {\n            let nowPage = 1;\n            const d = await services_1.getGoodsList(gameName, nowPage);\n            for (; nowPage <= endPage || endPage === -1; nowPage++) {\n                const goodsList = await services_1.getGoodsList(gameName, nowPage);\n                if (endPage === -1) {\n                    endPage = goodsList.data.total_page;\n                }\n                console.log(nowPage, goodsList.data.items.length);\n                res = [...res, ...goodsList.data.items.filter((g) => Number(g.sell_min_price) >= 2 && Number(g.sell_min_price) <= 3000)];\n            }\n            const rawResult = JSON.stringify(services_1.parseGoodsList(res));\n            const timeConsuming = `${(new Date().getTime() - new Date(task.createdAt).getTime()) / 1000}s`;\n            await task.update({ status: model_1.Status.success, rawResult, timeConsuming });\n        })();\n    }\n    catch (err) {\n        await task.update({ status: model_1.Status.fail });\n    }\n    return {\n        error: 0,\n        msg: \"成功\",\n        data: task,\n    };\n};\nexports.getTask = async (taskId) => {\n    return await model_1.Task.findOne({ _id: taskId }, \"-rawResult\");\n};\nexports.getTaskList = async () => {\n    try {\n        return await model_1.Task.find({}, \"-rawResult\")\n            .sort(\"-createdAt\");\n    }\n    catch (err) {\n        await model_1.Task.remove({});\n        return await model_1.Task.find({}, \"-rawResult\")\n            .sort(\"-createdAt\");\n    }\n};\nexports.taskResultExport = async (taskId) => {\n    const task = await model_1.Task.findOne({ _id: taskId });\n    const file = new xlsx.File();\n    const sheet = file.addSheet(\"DefaultSheet\");\n    const row = sheet.addRow();\n    const cell1 = row.addCell();\n    cell1.value = \"商品名\";\n    const cell2 = row.addCell();\n    cell2.value = \"Buff出售最低价（单位：元）\";\n    const cell3 = row.addCell();\n    cell3.value = \"steam出售价格（单位：元）\";\n    const cell4 = row.addCell();\n    cell4.value = \"倍数\";\n    const cell5 = row.addCell();\n    cell5.value = \"Buff在售数量\";\n    const cell6 = row.addCell();\n    cell6.value = \"原始折扣价（百分比）\";\n    const cell7 = row.addCell();\n    cell7.value = \"原始转回利润（百分比）\";\n    const cell8 = row.addCell();\n    cell8.value = \"Buff商品链接\";\n    const rawResult = JSON.parse(task.rawResult);\n    rawResult.forEach((r) => {\n        const dataRow = sheet.addRow();\n        const dataCell1 = dataRow.addCell();\n        const dataCell2 = dataRow.addCell();\n        const dataCell3 = dataRow.addCell();\n        const dataCell4 = dataRow.addCell();\n        const dataCell5 = dataRow.addCell();\n        const dataCell6 = dataRow.addCell();\n        const dataCell7 = dataRow.addCell();\n        const dataCell8 = dataRow.addCell();\n        dataCell1.value = r.name;\n        dataCell2.value = r.sell_min_price;\n        dataCell3.value = r.steam_price_cny;\n        dataCell4.value = r.diff_price;\n        dataCell5.value = r.sell_num;\n        dataCell6.value = r.original_discount_price;\n        dataCell7.value = r.original_profit;\n        dataCell8.value = r.buff_goods_url;\n    });\n    const fileName = `${Math.random() * 1000000}.xlsx`;\n    file\n        .saveAs()\n        .pipe(fs.createWriteStream(__dirname + `/../export/${fileName}`));\n    await task.update({ resultUrl: fileName });\n    return {\n        error: 0,\n        msg: \"成功\",\n        data: {},\n    };\n};\n\n/* WEBPACK VAR INJECTION */}.call(this, \"src/core/apis\"))\n\n//# sourceURL=webpack:///./src/core/apis/task.ts?");

/***/ }),

/***/ "./src/core/model/conn.ts":
/*!********************************!*\
  !*** ./src/core/model/conn.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\nconst config_1 = __webpack_require__(/*! ../../http/config */ \"./src/http/config/index.ts\");\nswitch (config_1.default.NAME) {\n    case \"development\":\n        mongoose.connect(`mongodb://${config_1.default.DBHOST}:${config_1.default.DBPORT}/${config_1.default.DBNAME}`, { useNewUrlParser: true })\n            .then()\n            .catch((err) => console.log(err));\n        break;\n}\nmongoose.connection\n    .once(\"error\", (err) => console.error(`mongodb connect error:\\n${err}`))\n    .once(\"open\", () => {\n    console.log(\"mongodb connect success\");\n});\nexports.default = mongoose;\n\n\n//# sourceURL=webpack:///./src/core/model/conn.ts?");

/***/ }),

/***/ "./src/core/model/index.ts":
/*!*********************************!*\
  !*** ./src/core/model/index.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nfunction __export(m) {\n    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];\n}\nObject.defineProperty(exports, \"__esModule\", { value: true });\n__export(__webpack_require__(/*! ./task */ \"./src/core/model/task.ts\"));\n\n\n//# sourceURL=webpack:///./src/core/model/index.ts?");

/***/ }),

/***/ "./src/core/model/task.ts":
/*!********************************!*\
  !*** ./src/core/model/task.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst conn_1 = __webpack_require__(/*! ./conn */ \"./src/core/model/conn.ts\");\nconst { Schema } = conn_1.default;\nvar StatusType;\n(function (StatusType) {\n    StatusType[StatusType[\"pending\"] = -1] = \"pending\";\n    StatusType[StatusType[\"fail\"] = 0] = \"fail\";\n    StatusType[StatusType[\"success\"] = 1] = \"success\";\n})(StatusType || (StatusType = {}));\nexports.StatusType = StatusType;\nconst Status = {\n    pending: -1,\n    fail: 0,\n    success: 1,\n};\nexports.Status = Status;\nconst taskSchema = new Schema({\n    status: {\n        type: Number,\n        required: true,\n        default: StatusType.pending,\n    },\n    resultUrl: {\n        type: String,\n        required: false,\n    },\n    rawResult: {\n        type: String,\n        required: false,\n    },\n    desc: {\n        type: String,\n        required: true,\n    },\n    timeConsuming: {\n        type: String,\n        required: false,\n    },\n}, { timestamps: true });\nconst Task = conn_1.default.model(\"Task\", taskSchema);\nexports.Task = Task;\n\n\n//# sourceURL=webpack:///./src/core/model/task.ts?");

/***/ }),

/***/ "./src/core/services/buff/goods.ts":
/*!*****************************************!*\
  !*** ./src/core/services/buff/goods.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst axios_1 = __webpack_require__(/*! axios */ \"axios\");\nconst math = __webpack_require__(/*! mathjs */ \"mathjs\");\nexports.getGoodsList = async (gameName, pageNum) => {\n    const res = await axios_1.default.get(`https://buff.163.com/api/market/goods?game=${gameName}&page_num=${pageNum}&page_size=2000`);\n    return res.data;\n};\nexports.getGoodsBillOrder = async (gameName, goodsId) => {\n    const res = await axios_1.default.get(`https://buff.163.com/api/market/goods/bill_order?game=${gameName}&goods_id=${goodsId}`);\n    return res.data;\n};\nexports.parseGoodsList = (goodsList) => goodsList.map((g) => ({\n    id: g.id,\n    name: g.name,\n    sell_min_price: g.sell_min_price,\n    sell_num: g.sell_num,\n    steam_market_url: g.steam_market_url,\n    icon_url: g.goods_info.icon_url,\n    steam_price: g.goods_info.steam_price,\n    steam_price_cny: g.goods_info.steam_price_cny,\n    diff_price: math.eval(`${g.sell_min_price} / ${g.goods_info.steam_price_cny}`),\n    original_discount_price: math.eval(`${g.sell_min_price} * 1.15 / ${g.goods_info.steam_price_cny} * 100`),\n    original_profit: math.eval(`((${g.sell_min_price} * ${1 - (g.game === \"dota2\" ? 0.018 : 0.025)} - ${g.goods_info.steam_price_cny} * 0.82) / ${g.goods_info.steam_price_cny} * 0.82) * 100`),\n    buff_goods_url: `https://buff.163.com/market/goods?goods_id=${g.id}`,\n}));\n\n\n//# sourceURL=webpack:///./src/core/services/buff/goods.ts?");

/***/ }),

/***/ "./src/core/services/buff/index.ts":
/*!*****************************************!*\
  !*** ./src/core/services/buff/index.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nfunction __export(m) {\n    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];\n}\nObject.defineProperty(exports, \"__esModule\", { value: true });\n__export(__webpack_require__(/*! ./goods */ \"./src/core/services/buff/goods.ts\"));\n\n\n//# sourceURL=webpack:///./src/core/services/buff/index.ts?");

/***/ }),

/***/ "./src/core/services/index.ts":
/*!************************************!*\
  !*** ./src/core/services/index.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nfunction __export(m) {\n    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];\n}\nObject.defineProperty(exports, \"__esModule\", { value: true });\n__export(__webpack_require__(/*! ./buff */ \"./src/core/services/buff/index.ts\"));\n\n\n//# sourceURL=webpack:///./src/core/services/index.ts?");

/***/ }),

/***/ "./src/http/app.ts":
/*!*************************!*\
  !*** ./src/http/app.ts ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(__dirname) {\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst Koa = __webpack_require__(/*! koa */ \"koa\");\nconst serve = __webpack_require__(/*! koa-static */ \"koa-static\");\nconst ms = __webpack_require__(/*! ms */ \"ms\");\n__webpack_require__(/*! reflect-metadata */ \"reflect-metadata\");\nconst routing_controllers_1 = __webpack_require__(/*! routing-controllers */ \"routing-controllers\");\nconst config_1 = __webpack_require__(/*! ./config */ \"./src/http/config/index.ts\");\nconst task_1 = __webpack_require__(/*! ./controllers/task */ \"./src/http/controllers/task.ts\");\nconst createHttpServer = async () => {\n    const koa = new Koa();\n    koa.use(serve(__dirname + \"/../page/dist\", {\n        maxAge: config_1.default.NAME === \"production\" ? ms(\"20d\") : 0,\n    }));\n    koa.use(serve(__dirname + \"/../core/export\"));\n    routing_controllers_1.useKoaServer(koa, {\n        routePrefix: \"/api\",\n        controllers: [\n            task_1.default,\n        ],\n        classTransformer: false,\n    });\n    return koa;\n};\nexports.default = createHttpServer;\n\n/* WEBPACK VAR INJECTION */}.call(this, \"src/http\"))\n\n//# sourceURL=webpack:///./src/http/app.ts?");

/***/ }),

/***/ "./src/http/config/config.dev.ts":
/*!***************************************!*\
  !*** ./src/http/config/config.dev.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.default = {\n    NAME: \"development\",\n    PORT: 9998,\n    DBHOST: \"localhost\",\n    DBPORT: 27017,\n    DBNAME: \"fxxkSpider\",\n};\n\n\n//# sourceURL=webpack:///./src/http/config/config.dev.ts?");

/***/ }),

/***/ "./src/http/config/config.prod.ts":
/*!****************************************!*\
  !*** ./src/http/config/config.prod.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.default = {\n    NAME: \"production\",\n    PORT: 9999,\n    DBHOST: \"localhost\",\n    DBPORT: 27017,\n    DBNAME: \"fxxkSpider\",\n};\n\n\n//# sourceURL=webpack:///./src/http/config/config.prod.ts?");

/***/ }),

/***/ "./src/http/config/index.ts":
/*!**********************************!*\
  !*** ./src/http/config/index.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst config_dev_1 = __webpack_require__(/*! ./config.dev */ \"./src/http/config/config.dev.ts\");\nconst config_prod_1 = __webpack_require__(/*! ./config.prod */ \"./src/http/config/config.prod.ts\");\nconst config =  true ? config_dev_1.default : undefined;\nexports.default = config;\n\n\n//# sourceURL=webpack:///./src/http/config/index.ts?");

/***/ }),

/***/ "./src/http/controllers/task.ts":
/*!**************************************!*\
  !*** ./src/http/controllers/task.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nvar __metadata = (this && this.__metadata) || function (k, v) {\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\n};\nvar __param = (this && this.__param) || function (paramIndex, decorator) {\n    return function (target, key) { decorator(target, key, paramIndex); }\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst routing_controllers_1 = __webpack_require__(/*! routing-controllers */ \"routing-controllers\");\nconst apis_1 = __webpack_require__(/*! ../../core/apis */ \"./src/core/apis/index.ts\");\nlet TaskController = class TaskController {\n    async createTask(gameName, startPage, endPage) {\n        return await apis_1.getGoodsListFromPage(gameName, startPage, endPage);\n    }\n    async getTask(id) {\n        return await apis_1.getTask(id);\n    }\n    async exportTaskResult(id) {\n        return await apis_1.taskResultExport(id);\n    }\n    async getTaskList() {\n        return await apis_1.getTaskList();\n    }\n};\n__decorate([\n    routing_controllers_1.Post(\"/task\"),\n    __param(0, routing_controllers_1.BodyParam(\"gameName\", { required: true })),\n    __param(1, routing_controllers_1.BodyParam(\"startPage\", { required: true })),\n    __param(2, routing_controllers_1.BodyParam(\"endPage\", { required: true })),\n    __metadata(\"design:type\", Function),\n    __metadata(\"design:paramtypes\", [String, Number, Number]),\n    __metadata(\"design:returntype\", Promise)\n], TaskController.prototype, \"createTask\", null);\n__decorate([\n    routing_controllers_1.Get(\"/task/:id\"),\n    __param(0, routing_controllers_1.Param(\"id\")),\n    __metadata(\"design:type\", Function),\n    __metadata(\"design:paramtypes\", [String]),\n    __metadata(\"design:returntype\", Promise)\n], TaskController.prototype, \"getTask\", null);\n__decorate([\n    routing_controllers_1.Get(\"/task/:id/export\"),\n    __param(0, routing_controllers_1.Param(\"id\")),\n    __metadata(\"design:type\", Function),\n    __metadata(\"design:paramtypes\", [String]),\n    __metadata(\"design:returntype\", Promise)\n], TaskController.prototype, \"exportTaskResult\", null);\n__decorate([\n    routing_controllers_1.Get(\"/task\"),\n    __metadata(\"design:type\", Function),\n    __metadata(\"design:paramtypes\", []),\n    __metadata(\"design:returntype\", Promise)\n], TaskController.prototype, \"getTaskList\", null);\nTaskController = __decorate([\n    routing_controllers_1.JsonController()\n], TaskController);\nexports.default = TaskController;\n\n\n//# sourceURL=webpack:///./src/http/controllers/task.ts?");

/***/ }),

/***/ "./src/http/index.ts":
/*!***************************!*\
  !*** ./src/http/index.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst app_1 = __webpack_require__(/*! ./app */ \"./src/http/app.ts\");\nexports.createHttpServer = app_1.default;\n\n\n//# sourceURL=webpack:///./src/http/index.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst http_1 = __webpack_require__(/*! ./http */ \"./src/http/index.ts\");\nconst config_1 = __webpack_require__(/*! ./http/config */ \"./src/http/config/index.ts\");\n(async () => {\n    try {\n        const app = await http_1.createHttpServer();\n        app.listen(config_1.default.PORT, async () => {\n            console.log(`Server is listening on ${config_1.default.PORT}`);\n        });\n    }\n    catch (e) {\n        console.log(e);\n    }\n})();\n\n\n//# sourceURL=webpack:///./src/index.ts?");

/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"axios\");\n\n//# sourceURL=webpack:///external_%22axios%22?");

/***/ }),

/***/ "better-xlsx":
/*!******************************!*\
  !*** external "better-xlsx" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"better-xlsx\");\n\n//# sourceURL=webpack:///external_%22better-xlsx%22?");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"fs\");\n\n//# sourceURL=webpack:///external_%22fs%22?");

/***/ }),

/***/ "koa":
/*!**********************!*\
  !*** external "koa" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"koa\");\n\n//# sourceURL=webpack:///external_%22koa%22?");

/***/ }),

/***/ "koa-static":
/*!*****************************!*\
  !*** external "koa-static" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"koa-static\");\n\n//# sourceURL=webpack:///external_%22koa-static%22?");

/***/ }),

/***/ "mathjs":
/*!*************************!*\
  !*** external "mathjs" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"mathjs\");\n\n//# sourceURL=webpack:///external_%22mathjs%22?");

/***/ }),

/***/ "moment":
/*!*************************!*\
  !*** external "moment" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"moment\");\n\n//# sourceURL=webpack:///external_%22moment%22?");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"mongoose\");\n\n//# sourceURL=webpack:///external_%22mongoose%22?");

/***/ }),

/***/ "ms":
/*!*********************!*\
  !*** external "ms" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"ms\");\n\n//# sourceURL=webpack:///external_%22ms%22?");

/***/ }),

/***/ "reflect-metadata":
/*!***********************************!*\
  !*** external "reflect-metadata" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"reflect-metadata\");\n\n//# sourceURL=webpack:///external_%22reflect-metadata%22?");

/***/ }),

/***/ "routing-controllers":
/*!**************************************!*\
  !*** external "routing-controllers" ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"routing-controllers\");\n\n//# sourceURL=webpack:///external_%22routing-controllers%22?");

/***/ })

/******/ });