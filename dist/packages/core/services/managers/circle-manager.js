/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { GoogleMapsAPIWrapper } from '../google-maps-api-wrapper';
var CircleManager = /** @class */ (function () {
    function CircleManager(_apiWrapper, _zone) {
        this._apiWrapper = _apiWrapper;
        this._zone = _zone;
        this._circles = new Map();
    }
    /**
     * @param {?} circle
     * @return {?}
     */
    CircleManager.prototype.addCircle = /**
     * @param {?} circle
     * @return {?}
     */
    function (circle) {
        this._circles.set(circle, this._apiWrapper.createCircle({
            center: { lat: circle.latitude, lng: circle.longitude },
            clickable: circle.clickable,
            draggable: circle.draggable,
            editable: circle.editable,
            fillColor: circle.fillColor,
            fillOpacity: circle.fillOpacity,
            radius: circle.radius,
            strokeColor: circle.strokeColor,
            strokeOpacity: circle.strokeOpacity,
            strokePosition: circle.strokePosition,
            strokeWeight: circle.strokeWeight,
            visible: circle.visible,
            zIndex: circle.zIndex
        }));
    };
    /**
     * Removes the given circle from the map.
     */
    /**
     * Removes the given circle from the map.
     * @param {?} circle
     * @return {?}
     */
    CircleManager.prototype.removeCircle = /**
     * Removes the given circle from the map.
     * @param {?} circle
     * @return {?}
     */
    function (circle) {
        var _this = this;
        return this._circles.get(circle).then(function (c) {
            c.setMap(null);
            _this._circles.delete(circle);
        });
    };
    /**
     * @param {?} circle
     * @param {?} options
     * @return {?}
     */
    CircleManager.prototype.setOptions = /**
     * @param {?} circle
     * @param {?} options
     * @return {?}
     */
    function (circle, options) {
        return this._circles.get(circle).then(function (c) { return c.setOptions(options); });
    };
    /**
     * @param {?} circle
     * @return {?}
     */
    CircleManager.prototype.getBounds = /**
     * @param {?} circle
     * @return {?}
     */
    function (circle) {
        return this._circles.get(circle).then(function (c) { return c.getBounds(); });
    };
    /**
     * @param {?} circle
     * @return {?}
     */
    CircleManager.prototype.getCenter = /**
     * @param {?} circle
     * @return {?}
     */
    function (circle) {
        return this._circles.get(circle).then(function (c) { return c.getCenter(); });
    };
    /**
     * @param {?} circle
     * @return {?}
     */
    CircleManager.prototype.getRadius = /**
     * @param {?} circle
     * @return {?}
     */
    function (circle) {
        return this._circles.get(circle).then(function (c) { return c.getRadius(); });
    };
    /**
     * @param {?} circle
     * @return {?}
     */
    CircleManager.prototype.setCenter = /**
     * @param {?} circle
     * @return {?}
     */
    function (circle) {
        return this._circles.get(circle).then(function (c) { return c.setCenter({ lat: circle.latitude, lng: circle.longitude }); });
    };
    /**
     * @param {?} circle
     * @return {?}
     */
    CircleManager.prototype.setEditable = /**
     * @param {?} circle
     * @return {?}
     */
    function (circle) {
        return this._circles.get(circle).then(function (c) { return c.setEditable(circle.editable); });
    };
    /**
     * @param {?} circle
     * @return {?}
     */
    CircleManager.prototype.setDraggable = /**
     * @param {?} circle
     * @return {?}
     */
    function (circle) {
        return this._circles.get(circle).then(function (c) { return c.setDraggable(circle.draggable); });
    };
    /**
     * @param {?} circle
     * @return {?}
     */
    CircleManager.prototype.setVisible = /**
     * @param {?} circle
     * @return {?}
     */
    function (circle) {
        return this._circles.get(circle).then(function (c) { return c.setVisible(circle.visible); });
    };
    /**
     * @param {?} circle
     * @return {?}
     */
    CircleManager.prototype.setRadius = /**
     * @param {?} circle
     * @return {?}
     */
    function (circle) {
        return this._circles.get(circle).then(function (c) { return c.setRadius(circle.radius); });
    };
    /**
     * @template T
     * @param {?} eventName
     * @param {?} circle
     * @return {?}
     */
    CircleManager.prototype.createEventObservable = /**
     * @template T
     * @param {?} eventName
     * @param {?} circle
     * @return {?}
     */
    function (eventName, circle) {
        var _this = this;
        return new Observable(function (observer) {
            /** @type {?} */
            var listener = null;
            _this._circles.get(circle).then(function (c) {
                listener = c.addListener(eventName, function (e) { return _this._zone.run(function () { return observer.next(e); }); });
            });
            return function () {
                if (listener !== null) {
                    listener.remove();
                }
            };
        });
    };
    CircleManager.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    CircleManager.ctorParameters = function () { return [
        { type: GoogleMapsAPIWrapper },
        { type: NgZone }
    ]; };
    return CircleManager;
}());
export { CircleManager };
if (false) {
    /** @type {?} */
    CircleManager.prototype._circles;
    /** @type {?} */
    CircleManager.prototype._apiWrapper;
    /** @type {?} */
    CircleManager.prototype._zone;
}
//# sourceMappingURL=circle-manager.js.map