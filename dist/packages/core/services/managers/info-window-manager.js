/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Observable } from 'rxjs';
import { Injectable, NgZone } from '@angular/core';
import { GoogleMapsAPIWrapper } from '../google-maps-api-wrapper';
import { MarkerManager } from './marker-manager';
var InfoWindowManager = /** @class */ (function () {
    function InfoWindowManager(_mapsWrapper, _zone, _markerManager) {
        this._mapsWrapper = _mapsWrapper;
        this._zone = _zone;
        this._markerManager = _markerManager;
        this._infoWindows = new Map();
    }
    /**
     * @param {?} infoWindow
     * @return {?}
     */
    InfoWindowManager.prototype.deleteInfoWindow = /**
     * @param {?} infoWindow
     * @return {?}
     */
    function (infoWindow) {
        var _this = this;
        /** @type {?} */
        var iWindow = this._infoWindows.get(infoWindow);
        if (iWindow == null) {
            // info window already deleted
            return Promise.resolve();
        }
        return iWindow.then(function (i) {
            return _this._zone.run(function () {
                i.close();
                _this._infoWindows.delete(infoWindow);
            });
        });
    };
    /**
     * @param {?} infoWindow
     * @return {?}
     */
    InfoWindowManager.prototype.setPosition = /**
     * @param {?} infoWindow
     * @return {?}
     */
    function (infoWindow) {
        return this._infoWindows.get(infoWindow).then(function (i) { return i.setPosition({
            lat: infoWindow.latitude,
            lng: infoWindow.longitude
        }); });
    };
    /**
     * @param {?} infoWindow
     * @return {?}
     */
    InfoWindowManager.prototype.setZIndex = /**
     * @param {?} infoWindow
     * @return {?}
     */
    function (infoWindow) {
        return this._infoWindows.get(infoWindow)
            .then(function (i) { return i.setZIndex(infoWindow.zIndex); });
    };
    /**
     * @param {?} infoWindow
     * @return {?}
     */
    InfoWindowManager.prototype.open = /**
     * @param {?} infoWindow
     * @return {?}
     */
    function (infoWindow) {
        var _this = this;
        return this._infoWindows.get(infoWindow).then(function (w) {
            if (infoWindow.hostMarker != null) {
                return _this._markerManager.getNativeMarker(infoWindow.hostMarker).then(function (marker) {
                    return _this._mapsWrapper.getNativeMap().then(function (map) { return w.open(map, marker); });
                });
            }
            return _this._mapsWrapper.getNativeMap().then(function (map) { return w.open(map); });
        });
    };
    /**
     * @param {?} infoWindow
     * @return {?}
     */
    InfoWindowManager.prototype.close = /**
     * @param {?} infoWindow
     * @return {?}
     */
    function (infoWindow) {
        return this._infoWindows.get(infoWindow).then(function (w) { return w.close(); });
    };
    /**
     * @param {?} infoWindow
     * @param {?} options
     * @return {?}
     */
    InfoWindowManager.prototype.setOptions = /**
     * @param {?} infoWindow
     * @param {?} options
     * @return {?}
     */
    function (infoWindow, options) {
        return this._infoWindows.get(infoWindow).then(function (i) { return i.setOptions(options); });
    };
    /**
     * @param {?} infoWindow
     * @return {?}
     */
    InfoWindowManager.prototype.addInfoWindow = /**
     * @param {?} infoWindow
     * @return {?}
     */
    function (infoWindow) {
        /** @type {?} */
        var options = {
            content: infoWindow.content,
            maxWidth: infoWindow.maxWidth,
            zIndex: infoWindow.zIndex,
            disableAutoPan: infoWindow.disableAutoPan
        };
        if (typeof infoWindow.latitude === 'number' && typeof infoWindow.longitude === 'number') {
            options.position = { lat: infoWindow.latitude, lng: infoWindow.longitude };
        }
        /** @type {?} */
        var infoWindowPromise = this._mapsWrapper.createInfoWindow(options);
        this._infoWindows.set(infoWindow, infoWindowPromise);
    };
    /**
     * Creates a Google Maps event listener for the given InfoWindow as an Observable
     */
    /**
     * Creates a Google Maps event listener for the given InfoWindow as an Observable
     * @template T
     * @param {?} eventName
     * @param {?} infoWindow
     * @return {?}
     */
    InfoWindowManager.prototype.createEventObservable = /**
     * Creates a Google Maps event listener for the given InfoWindow as an Observable
     * @template T
     * @param {?} eventName
     * @param {?} infoWindow
     * @return {?}
     */
    function (eventName, infoWindow) {
        var _this = this;
        return new Observable(function (observer) {
            _this._infoWindows.get(infoWindow).then(function (i) {
                i.addListener(eventName, function (e) { return _this._zone.run(function () { return observer.next(e); }); });
            });
        });
    };
    InfoWindowManager.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    InfoWindowManager.ctorParameters = function () { return [
        { type: GoogleMapsAPIWrapper },
        { type: NgZone },
        { type: MarkerManager }
    ]; };
    return InfoWindowManager;
}());
export { InfoWindowManager };
if (false) {
    /** @type {?} */
    InfoWindowManager.prototype._infoWindows;
    /** @type {?} */
    InfoWindowManager.prototype._mapsWrapper;
    /** @type {?} */
    InfoWindowManager.prototype._zone;
    /** @type {?} */
    InfoWindowManager.prototype._markerManager;
}
//# sourceMappingURL=info-window-manager.js.map