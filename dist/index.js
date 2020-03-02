module.exports =
/******/ (function(modules, runtime) { // webpackBootstrap
/******/ 	"use strict";
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
/******/ 	__webpack_require__.ab = __dirname + "/";
/******/
/******/ 	// the startup function
/******/ 	function startup() {
/******/ 		// Load entry module and return exports
/******/ 		return __webpack_require__(655);
/******/ 	};
/******/
/******/ 	// run startup
/******/ 	return startup();
/******/ })
/************************************************************************/
/******/ ({

/***/ 655:
/***/ (function() {

System.register(["@actions/core", "./authenticate", "./download", "./setup"], function (exports_1, context_1) {
    "use strict";
    var core, authenticate_1, download_1, setup_1;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (core_1) {
                core = core_1;
            },
            function (authenticate_1_1) {
                authenticate_1 = authenticate_1_1;
            },
            function (download_1_1) {
                download_1 = download_1_1;
            },
            function (setup_1_1) {
                setup_1 = setup_1_1;
            }
        ],
        execute: async function () {
            /**
             * Install the Google Cloud SDK.
             */
            try {
                await download_1.download();
                await setup_1.setup();
                await authenticate_1.authenticate();
            }
            catch (exception) {
                core.setFailed(exception.message);
            }
        }
    };
});


/***/ })

/******/ });