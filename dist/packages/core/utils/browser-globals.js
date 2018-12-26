/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var WindowRef = /** @class */ (function () {
    function WindowRef() {
    }
    /**
     * @return {?}
     */
    WindowRef.prototype.getNativeWindow = /**
     * @return {?}
     */
    function () { return window; };
    return WindowRef;
}());
export { WindowRef };
var DocumentRef = /** @class */ (function () {
    function DocumentRef() {
    }
    /**
     * @return {?}
     */
    DocumentRef.prototype.getNativeDocument = /**
     * @return {?}
     */
    function () { return document; };
    return DocumentRef;
}());
export { DocumentRef };
/** @type {?} */
export var BROWSER_GLOBALS_PROVIDERS = [WindowRef, DocumentRef];
//# sourceMappingURL=browser-globals.js.map