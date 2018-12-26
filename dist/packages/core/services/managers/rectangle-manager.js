/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { GoogleMapsAPIWrapper } from '../google-maps-api-wrapper';
var RectangleManager = /** @class */ (function () {
    function RectangleManager(_apiWrapper, _zone) {
        this._apiWrapper = _apiWrapper;
        this._zone = _zone;
        this._rectangles = new Map();
    }
    /**
     * @param {?} rectangle
     * @return {?}
     */
    RectangleManager.prototype.addRectangle = /**
     * @param {?} rectangle
     * @return {?}
     */
    function (rectangle) {
        this._rectangles.set(rectangle, this._apiWrapper.createRectangle({
            bounds: {
                north: rectangle.north,
                east: rectangle.east,
                south: rectangle.south,
                west: rectangle.west
            },
            clickable: rectangle.clickable,
            draggable: rectangle.draggable,
            editable: rectangle.editable,
            fillColor: rectangle.fillColor,
            fillOpacity: rectangle.fillOpacity,
            strokeColor: rectangle.strokeColor,
            strokeOpacity: rectangle.strokeOpacity,
            strokePosition: rectangle.strokePosition,
            strokeWeight: rectangle.strokeWeight,
            visible: rectangle.visible,
            zIndex: rectangle.zIndex
        }));
    };
    /**
     * Removes the given rectangle from the map.
     */
    /**
     * Removes the given rectangle from the map.
     * @param {?} rectangle
     * @return {?}
     */
    RectangleManager.prototype.removeRectangle = /**
     * Removes the given rectangle from the map.
     * @param {?} rectangle
     * @return {?}
     */
    function (rectangle) {
        var _this = this;
        return this._rectangles.get(rectangle).then(function (r) {
            r.setMap(null);
            _this._rectangles.delete(rectangle);
        });
    };
    /**
     * @param {?} rectangle
     * @param {?} options
     * @return {?}
     */
    RectangleManager.prototype.setOptions = /**
     * @param {?} rectangle
     * @param {?} options
     * @return {?}
     */
    function (rectangle, options) {
        return this._rectangles.get(rectangle).then(function (r) { return r.setOptions(options); });
    };
    /**
     * @param {?} rectangle
     * @return {?}
     */
    RectangleManager.prototype.getBounds = /**
     * @param {?} rectangle
     * @return {?}
     */
    function (rectangle) {
        return this._rectangles.get(rectangle).then(function (r) { return r.getBounds(); });
    };
    /**
     * @param {?} rectangle
     * @return {?}
     */
    RectangleManager.prototype.setBounds = /**
     * @param {?} rectangle
     * @return {?}
     */
    function (rectangle) {
        return this._rectangles.get(rectangle).then(function (r) {
            return r.setBounds({
                north: rectangle.north,
                east: rectangle.east,
                south: rectangle.south,
                west: rectangle.west
            });
        });
    };
    /**
     * @param {?} rectangle
     * @return {?}
     */
    RectangleManager.prototype.setEditable = /**
     * @param {?} rectangle
     * @return {?}
     */
    function (rectangle) {
        return this._rectangles.get(rectangle).then(function (r) {
            return r.setEditable(rectangle.editable);
        });
    };
    /**
     * @param {?} rectangle
     * @return {?}
     */
    RectangleManager.prototype.setDraggable = /**
     * @param {?} rectangle
     * @return {?}
     */
    function (rectangle) {
        return this._rectangles.get(rectangle).then(function (r) {
            return r.setDraggable(rectangle.draggable);
        });
    };
    /**
     * @param {?} rectangle
     * @return {?}
     */
    RectangleManager.prototype.setVisible = /**
     * @param {?} rectangle
     * @return {?}
     */
    function (rectangle) {
        return this._rectangles.get(rectangle).then(function (r) {
            return r.setVisible(rectangle.visible);
        });
    };
    /**
     * @template T
     * @param {?} eventName
     * @param {?} rectangle
     * @return {?}
     */
    RectangleManager.prototype.createEventObservable = /**
     * @template T
     * @param {?} eventName
     * @param {?} rectangle
     * @return {?}
     */
    function (eventName, rectangle) {
        var _this = this;
        return Observable.create(function (observer) {
            /** @type {?} */
            var listener = null;
            _this._rectangles.get(rectangle).then(function (r) {
                listener = r.addListener(eventName, function (e) { return _this._zone.run(function () { return observer.next(e); }); });
            });
            return function () {
                if (listener !== null) {
                    listener.remove();
                }
            };
        });
    };
    RectangleManager.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    RectangleManager.ctorParameters = function () { return [
        { type: GoogleMapsAPIWrapper },
        { type: NgZone }
    ]; };
    return RectangleManager;
}());
export { RectangleManager };
if (false) {
    /** @type {?} */
    RectangleManager.prototype._rectangles;
    /** @type {?} */
    RectangleManager.prototype._apiWrapper;
    /** @type {?} */
    RectangleManager.prototype._zone;
}
//# sourceMappingURL=rectangle-manager.js.map