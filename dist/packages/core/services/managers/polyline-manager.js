/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { GoogleMapsAPIWrapper } from '../google-maps-api-wrapper';
var PolylineManager = /** @class */ (function () {
    function PolylineManager(_mapsWrapper, _zone) {
        this._mapsWrapper = _mapsWrapper;
        this._zone = _zone;
        this._polylines = new Map();
    }
    /**
     * @param {?} line
     * @return {?}
     */
    PolylineManager._convertPoints = /**
     * @param {?} line
     * @return {?}
     */
    function (line) {
        /** @type {?} */
        var path = line._getPoints().map(function (point) {
            return /** @type {?} */ ({ lat: point.latitude, lng: point.longitude });
        });
        return path;
    };
    /**
     * @param {?} line
     * @return {?}
     */
    PolylineManager.prototype.addPolyline = /**
     * @param {?} line
     * @return {?}
     */
    function (line) {
        /** @type {?} */
        var path = PolylineManager._convertPoints(line);
        /** @type {?} */
        var polylinePromise = this._mapsWrapper.createPolyline({
            clickable: line.clickable,
            draggable: line.draggable,
            editable: line.editable,
            geodesic: line.geodesic,
            strokeColor: line.strokeColor,
            strokeOpacity: line.strokeOpacity,
            strokeWeight: line.strokeWeight,
            visible: line.visible,
            zIndex: line.zIndex,
            path: path
        });
        this._polylines.set(line, polylinePromise);
    };
    /**
     * @param {?} line
     * @return {?}
     */
    PolylineManager.prototype.updatePolylinePoints = /**
     * @param {?} line
     * @return {?}
     */
    function (line) {
        var _this = this;
        /** @type {?} */
        var path = PolylineManager._convertPoints(line);
        /** @type {?} */
        var m = this._polylines.get(line);
        if (m == null) {
            return Promise.resolve();
        }
        return m.then(function (l) { return _this._zone.run(function () { l.setPath(path); }); });
    };
    /**
     * @param {?} line
     * @param {?} options
     * @return {?}
     */
    PolylineManager.prototype.setPolylineOptions = /**
     * @param {?} line
     * @param {?} options
     * @return {?}
     */
    function (line, options) {
        return this._polylines.get(line).then(function (l) { l.setOptions(options); });
    };
    /**
     * @param {?} line
     * @return {?}
     */
    PolylineManager.prototype.deletePolyline = /**
     * @param {?} line
     * @return {?}
     */
    function (line) {
        var _this = this;
        /** @type {?} */
        var m = this._polylines.get(line);
        if (m == null) {
            return Promise.resolve();
        }
        return m.then(function (l) {
            return _this._zone.run(function () {
                l.setMap(null);
                _this._polylines.delete(line);
            });
        });
    };
    /**
     * @template T
     * @param {?} eventName
     * @param {?} line
     * @return {?}
     */
    PolylineManager.prototype.createEventObservable = /**
     * @template T
     * @param {?} eventName
     * @param {?} line
     * @return {?}
     */
    function (eventName, line) {
        var _this = this;
        return new Observable(function (observer) {
            _this._polylines.get(line).then(function (l) {
                l.addListener(eventName, function (e) { return _this._zone.run(function () { return observer.next(e); }); });
            });
        });
    };
    PolylineManager.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    PolylineManager.ctorParameters = function () { return [
        { type: GoogleMapsAPIWrapper },
        { type: NgZone }
    ]; };
    return PolylineManager;
}());
export { PolylineManager };
if (false) {
    /** @type {?} */
    PolylineManager.prototype._polylines;
    /** @type {?} */
    PolylineManager.prototype._mapsWrapper;
    /** @type {?} */
    PolylineManager.prototype._zone;
}
//# sourceMappingURL=polyline-manager.js.map