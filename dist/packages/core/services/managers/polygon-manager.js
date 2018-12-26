/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { GoogleMapsAPIWrapper } from '../google-maps-api-wrapper';
var PolygonManager = /** @class */ (function () {
    function PolygonManager(_mapsWrapper, _zone) {
        this._mapsWrapper = _mapsWrapper;
        this._zone = _zone;
        this._polygons = new Map();
    }
    /**
     * @param {?} path
     * @return {?}
     */
    PolygonManager.prototype.addPolygon = /**
     * @param {?} path
     * @return {?}
     */
    function (path) {
        /** @type {?} */
        var polygonPromise = this._mapsWrapper.createPolygon({
            clickable: path.clickable,
            draggable: path.draggable,
            editable: path.editable,
            fillColor: path.fillColor,
            fillOpacity: path.fillOpacity,
            geodesic: path.geodesic,
            paths: path.paths,
            strokeColor: path.strokeColor,
            strokeOpacity: path.strokeOpacity,
            strokeWeight: path.strokeWeight,
            visible: path.visible,
            zIndex: path.zIndex,
        });
        this._polygons.set(path, polygonPromise);
    };
    /**
     * @param {?} polygon
     * @return {?}
     */
    PolygonManager.prototype.updatePolygon = /**
     * @param {?} polygon
     * @return {?}
     */
    function (polygon) {
        var _this = this;
        /** @type {?} */
        var m = this._polygons.get(polygon);
        if (m == null) {
            return Promise.resolve();
        }
        return m.then(function (l) { return _this._zone.run(function () { l.setPaths(polygon.paths); }); });
    };
    /**
     * @param {?} path
     * @param {?} options
     * @return {?}
     */
    PolygonManager.prototype.setPolygonOptions = /**
     * @param {?} path
     * @param {?} options
     * @return {?}
     */
    function (path, options) {
        return this._polygons.get(path).then(function (l) { l.setOptions(options); });
    };
    /**
     * @param {?} paths
     * @return {?}
     */
    PolygonManager.prototype.deletePolygon = /**
     * @param {?} paths
     * @return {?}
     */
    function (paths) {
        var _this = this;
        /** @type {?} */
        var m = this._polygons.get(paths);
        if (m == null) {
            return Promise.resolve();
        }
        return m.then(function (l) {
            return _this._zone.run(function () {
                l.setMap(null);
                _this._polygons.delete(paths);
            });
        });
    };
    /**
     * @template T
     * @param {?} eventName
     * @param {?} path
     * @return {?}
     */
    PolygonManager.prototype.createEventObservable = /**
     * @template T
     * @param {?} eventName
     * @param {?} path
     * @return {?}
     */
    function (eventName, path) {
        var _this = this;
        return new Observable(function (observer) {
            _this._polygons.get(path).then(function (l) {
                l.addListener(eventName, function (e) { return _this._zone.run(function () { return observer.next(e); }); });
            });
        });
    };
    PolygonManager.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    PolygonManager.ctorParameters = function () { return [
        { type: GoogleMapsAPIWrapper },
        { type: NgZone }
    ]; };
    return PolygonManager;
}());
export { PolygonManager };
if (false) {
    /** @type {?} */
    PolygonManager.prototype._polygons;
    /** @type {?} */
    PolygonManager.prototype._mapsWrapper;
    /** @type {?} */
    PolygonManager.prototype._zone;
}
//# sourceMappingURL=polygon-manager.js.map