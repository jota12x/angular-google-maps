"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AgmSnazzyInfoWindowModule = void 0;

var _core = require("@angular/core");

var _snazzyInfoWindow = require("./directives/snazzy-info-window");

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var AgmSnazzyInfoWindowModule =
/** @class */
function () {
  function AgmSnazzyInfoWindowModule() {}

  AgmSnazzyInfoWindowModule.decorators = [{
    type: _core.NgModule,
    args: [{
      declarations: [_snazzyInfoWindow.AgmSnazzyInfoWindow],
      exports: [_snazzyInfoWindow.AgmSnazzyInfoWindow]
    }]
  }];
  return AgmSnazzyInfoWindowModule;
}();

exports.AgmSnazzyInfoWindowModule = AgmSnazzyInfoWindowModule;