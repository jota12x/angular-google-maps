/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { GoogleMapsAPIWrapper } from './../google-maps-api-wrapper';
/**
 * Manages all KML Layers for a Google Map instance.
 */
var KmlLayerManager = /** @class */ (function () {
    function KmlLayerManager(_wrapper, _zone) {
        this._wrapper = _wrapper;
        this._zone = _zone;
        this._layers = new Map();
    }
    /**
     * Adds a new KML Layer to the map.
     */
    /**
     * Adds a new KML Layer to the map.
     * @param {?} layer
     * @return {?}
     */
    KmlLayerManager.prototype.addKmlLayer = /**
     * Adds a new KML Layer to the map.
     * @param {?} layer
     * @return {?}
     */
    function (layer) {
        /** @type {?} */
        var newLayer = this._wrapper.getNativeMap().then(function (m) {
            return new google.maps.KmlLayer(/** @type {?} */ ({
                clickable: layer.clickable,
                map: m,
                preserveViewport: layer.preserveViewport,
                screenOverlays: layer.screenOverlays,
                suppressInfoWindows: layer.suppressInfoWindows,
                url: layer.url,
                zIndex: layer.zIndex
            }));
        });
        this._layers.set(layer, newLayer);
    };
    /**
     * @param {?} layer
     * @param {?} options
     * @return {?}
     */
    KmlLayerManager.prototype.setOptions = /**
     * @param {?} layer
     * @param {?} options
     * @return {?}
     */
    function (layer, options) {
        this._layers.get(layer).then(function (l) { return l.setOptions(options); });
    };
    /**
     * @param {?} layer
     * @return {?}
     */
    KmlLayerManager.prototype.deleteKmlLayer = /**
     * @param {?} layer
     * @return {?}
     */
    function (layer) {
        var _this = this;
        this._layers.get(layer).then(function (l) {
            l.setMap(null);
            _this._layers.delete(layer);
        });
    };
    /**
     * Creates a Google Maps event listener for the given KmlLayer as an Observable
     */
    /**
     * Creates a Google Maps event listener for the given KmlLayer as an Observable
     * @template T
     * @param {?} eventName
     * @param {?} layer
     * @return {?}
     */
    KmlLayerManager.prototype.createEventObservable = /**
     * Creates a Google Maps event listener for the given KmlLayer as an Observable
     * @template T
     * @param {?} eventName
     * @param {?} layer
     * @return {?}
     */
    function (eventName, layer) {
        var _this = this;
        return new Observable(function (observer) {
            _this._layers.get(layer).then(function (m) {
                m.addListener(eventName, function (e) { return _this._zone.run(function () { return observer.next(e); }); });
            });
        });
    };
    KmlLayerManager.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    KmlLayerManager.ctorParameters = function () { return [
        { type: GoogleMapsAPIWrapper },
        { type: NgZone }
    ]; };
    return KmlLayerManager;
}());
export { KmlLayerManager };
if (false) {
    /** @type {?} */
    KmlLayerManager.prototype._layers;
    /** @type {?} */
    KmlLayerManager.prototype._wrapper;
    /** @type {?} */
    KmlLayerManager.prototype._zone;
}
//# sourceMappingURL=kml-layer-manager.js.map