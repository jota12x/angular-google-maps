/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { MapsAPILoader } from './maps-api-loader/maps-api-loader';
/**
 * Wrapper class that handles the communication with the Google Maps Javascript
 * API v3
 */
var GoogleMapsAPIWrapper = /** @class */ (function () {
    function GoogleMapsAPIWrapper(_loader, _zone) {
        var _this = this;
        this._loader = _loader;
        this._zone = _zone;
        this._map =
            new Promise(function (resolve) { _this._mapResolver = resolve; });
    }
    /**
     * @param {?} el
     * @param {?} mapOptions
     * @return {?}
     */
    GoogleMapsAPIWrapper.prototype.createMap = /**
     * @param {?} el
     * @param {?} mapOptions
     * @return {?}
     */
    function (el, mapOptions) {
        var _this = this;
        return this._zone.runOutsideAngular(function () {
            return _this._loader.load().then(function () {
                /** @type {?} */
                var map = new google.maps.Map(el, mapOptions);
                _this._mapResolver(/** @type {?} */ (map));
                return;
            });
        });
    };
    /**
     * @param {?} options
     * @return {?}
     */
    GoogleMapsAPIWrapper.prototype.setMapOptions = /**
     * @param {?} options
     * @return {?}
     */
    function (options) {
        this._map.then(function (m) { m.setOptions(options); });
    };
    /**
     * Creates a google map marker with the map context
     */
    /**
     * Creates a google map marker with the map context
     * @param {?=} options
     * @param {?=} addToMap
     * @return {?}
     */
    GoogleMapsAPIWrapper.prototype.createMarker = /**
     * Creates a google map marker with the map context
     * @param {?=} options
     * @param {?=} addToMap
     * @return {?}
     */
    function (options, addToMap) {
        if (options === void 0) { options = /** @type {?} */ ({}); }
        if (addToMap === void 0) { addToMap = true; }
        return this._map.then(function (map) {
            if (addToMap) {
                options.map = map;
            }
            return new google.maps.Marker(options);
        });
    };
    /**
     * @param {?=} options
     * @return {?}
     */
    GoogleMapsAPIWrapper.prototype.createInfoWindow = /**
     * @param {?=} options
     * @return {?}
     */
    function (options) {
        return this._map.then(function () { return new google.maps.InfoWindow(options); });
    };
    /**
     * Creates a google.map.Circle for the current map.
     */
    /**
     * Creates a google.map.Circle for the current map.
     * @param {?} options
     * @return {?}
     */
    GoogleMapsAPIWrapper.prototype.createCircle = /**
     * Creates a google.map.Circle for the current map.
     * @param {?} options
     * @return {?}
     */
    function (options) {
        return this._map.then(function (map) {
            options.map = map;
            return new google.maps.Circle(options);
        });
    };
    /**
     * Creates a google.map.Rectangle for the current map.
     */
    /**
     * Creates a google.map.Rectangle for the current map.
     * @param {?} options
     * @return {?}
     */
    GoogleMapsAPIWrapper.prototype.createRectangle = /**
     * Creates a google.map.Rectangle for the current map.
     * @param {?} options
     * @return {?}
     */
    function (options) {
        return this._map.then(function (map) {
            options.map = map;
            return new google.maps.Rectangle(options);
        });
    };
    /**
     * @param {?} options
     * @return {?}
     */
    GoogleMapsAPIWrapper.prototype.createPolyline = /**
     * @param {?} options
     * @return {?}
     */
    function (options) {
        return this.getNativeMap().then(function (map) {
            /** @type {?} */
            var line = new google.maps.Polyline(options);
            line.setMap(map);
            return line;
        });
    };
    /**
     * @param {?} options
     * @return {?}
     */
    GoogleMapsAPIWrapper.prototype.createPolygon = /**
     * @param {?} options
     * @return {?}
     */
    function (options) {
        return this.getNativeMap().then(function (map) {
            /** @type {?} */
            var polygon = new google.maps.Polygon(options);
            polygon.setMap(map);
            return polygon;
        });
    };
    /**
     * Creates a new google.map.Data layer for the current map
     */
    /**
     * Creates a new google.map.Data layer for the current map
     * @param {?=} options
     * @return {?}
     */
    GoogleMapsAPIWrapper.prototype.createDataLayer = /**
     * Creates a new google.map.Data layer for the current map
     * @param {?=} options
     * @return {?}
     */
    function (options) {
        return this._map.then(function (m) {
            /** @type {?} */
            var data = new google.maps.Data(options);
            data.setMap(m);
            return data;
        });
    };
    /**
     * Determines if given coordinates are insite a Polygon path.
     */
    /**
     * Determines if given coordinates are insite a Polygon path.
     * @param {?} latLng
     * @param {?} polygon
     * @return {?}
     */
    GoogleMapsAPIWrapper.prototype.containsLocation = /**
     * Determines if given coordinates are insite a Polygon path.
     * @param {?} latLng
     * @param {?} polygon
     * @return {?}
     */
    function (latLng, polygon) {
        return google.maps.geometry.poly.containsLocation(latLng, polygon);
    };
    /**
     * @template E
     * @param {?} eventName
     * @return {?}
     */
    GoogleMapsAPIWrapper.prototype.subscribeToMapEvent = /**
     * @template E
     * @param {?} eventName
     * @return {?}
     */
    function (eventName) {
        var _this = this;
        return new Observable(function (observer) {
            _this._map.then(function (m) {
                m.addListener(eventName, function (arg) { _this._zone.run(function () { return observer.next(arg); }); });
            });
        });
    };
    /**
     * @return {?}
     */
    GoogleMapsAPIWrapper.prototype.clearInstanceListeners = /**
     * @return {?}
     */
    function () {
        this._map.then(function (map) {
            google.maps.event.clearInstanceListeners(map);
        });
    };
    /**
     * @param {?} latLng
     * @return {?}
     */
    GoogleMapsAPIWrapper.prototype.setCenter = /**
     * @param {?} latLng
     * @return {?}
     */
    function (latLng) {
        return this._map.then(function (map) { return map.setCenter(latLng); });
    };
    /**
     * @return {?}
     */
    GoogleMapsAPIWrapper.prototype.getZoom = /**
     * @return {?}
     */
    function () { return this._map.then(function (map) { return map.getZoom(); }); };
    /**
     * @return {?}
     */
    GoogleMapsAPIWrapper.prototype.getBounds = /**
     * @return {?}
     */
    function () {
        return this._map.then(function (map) { return map.getBounds(); });
    };
    /**
     * @return {?}
     */
    GoogleMapsAPIWrapper.prototype.getMapTypeId = /**
     * @return {?}
     */
    function () {
        return this._map.then(function (map) { return map.getMapTypeId(); });
    };
    /**
     * @param {?} zoom
     * @return {?}
     */
    GoogleMapsAPIWrapper.prototype.setZoom = /**
     * @param {?} zoom
     * @return {?}
     */
    function (zoom) {
        return this._map.then(function (map) { return map.setZoom(zoom); });
    };
    /**
     * @return {?}
     */
    GoogleMapsAPIWrapper.prototype.getCenter = /**
     * @return {?}
     */
    function () {
        return this._map.then(function (map) { return map.getCenter(); });
    };
    /**
     * @param {?} latLng
     * @return {?}
     */
    GoogleMapsAPIWrapper.prototype.panTo = /**
     * @param {?} latLng
     * @return {?}
     */
    function (latLng) {
        return this._map.then(function (map) { return map.panTo(latLng); });
    };
    /**
     * @param {?} x
     * @param {?} y
     * @return {?}
     */
    GoogleMapsAPIWrapper.prototype.panBy = /**
     * @param {?} x
     * @param {?} y
     * @return {?}
     */
    function (x, y) {
        return this._map.then(function (map) { return map.panBy(x, y); });
    };
    /**
     * @param {?} latLng
     * @return {?}
     */
    GoogleMapsAPIWrapper.prototype.fitBounds = /**
     * @param {?} latLng
     * @return {?}
     */
    function (latLng) {
        return this._map.then(function (map) { return map.fitBounds(latLng); });
    };
    /**
     * @param {?} latLng
     * @return {?}
     */
    GoogleMapsAPIWrapper.prototype.panToBounds = /**
     * @param {?} latLng
     * @return {?}
     */
    function (latLng) {
        return this._map.then(function (map) { return map.panToBounds(latLng); });
    };
    /**
     * Returns the native Google Maps Map instance. Be careful when using this instance directly.
     */
    /**
     * Returns the native Google Maps Map instance. Be careful when using this instance directly.
     * @return {?}
     */
    GoogleMapsAPIWrapper.prototype.getNativeMap = /**
     * Returns the native Google Maps Map instance. Be careful when using this instance directly.
     * @return {?}
     */
    function () { return this._map; };
    /**
     * Triggers the given event name on the map instance.
     */
    /**
     * Triggers the given event name on the map instance.
     * @param {?} eventName
     * @return {?}
     */
    GoogleMapsAPIWrapper.prototype.triggerMapEvent = /**
     * Triggers the given event name on the map instance.
     * @param {?} eventName
     * @return {?}
     */
    function (eventName) {
        return this._map.then(function (m) { return google.maps.event.trigger(m, eventName); });
    };
    GoogleMapsAPIWrapper.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    GoogleMapsAPIWrapper.ctorParameters = function () { return [
        { type: MapsAPILoader },
        { type: NgZone }
    ]; };
    return GoogleMapsAPIWrapper;
}());
export { GoogleMapsAPIWrapper };
if (false) {
    /** @type {?} */
    GoogleMapsAPIWrapper.prototype._map;
    /** @type {?} */
    GoogleMapsAPIWrapper.prototype._mapResolver;
    /** @type {?} */
    GoogleMapsAPIWrapper.prototype._loader;
    /** @type {?} */
    GoogleMapsAPIWrapper.prototype._zone;
}
//# sourceMappingURL=google-maps-api-wrapper.js.map