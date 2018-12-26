/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { GoogleMapsAPIWrapper } from './../google-maps-api-wrapper';
var MarkerManager = /** @class */ (function () {
    function MarkerManager(_mapsWrapper, _zone) {
        this._mapsWrapper = _mapsWrapper;
        this._zone = _zone;
        this._markers = new Map();
    }
    /**
     * @param {?} marker
     * @return {?}
     */
    MarkerManager.prototype.deleteMarker = /**
     * @param {?} marker
     * @return {?}
     */
    function (marker) {
        var _this = this;
        /** @type {?} */
        var m = this._markers.get(marker);
        if (m == null) {
            // marker already deleted
            return Promise.resolve();
        }
        return m.then(function (m) {
            return _this._zone.run(function () {
                m.setMap(null);
                _this._markers.delete(marker);
            });
        });
    };
    /**
     * @param {?} marker
     * @return {?}
     */
    MarkerManager.prototype.updateMarkerPosition = /**
     * @param {?} marker
     * @return {?}
     */
    function (marker) {
        return this._markers.get(marker).then(function (m) { return m.setPosition({ lat: marker.latitude, lng: marker.longitude }); });
    };
    /**
     * @param {?} marker
     * @return {?}
     */
    MarkerManager.prototype.updateTitle = /**
     * @param {?} marker
     * @return {?}
     */
    function (marker) {
        return this._markers.get(marker).then(function (m) { return m.setTitle(marker.title); });
    };
    /**
     * @param {?} marker
     * @return {?}
     */
    MarkerManager.prototype.updateLabel = /**
     * @param {?} marker
     * @return {?}
     */
    function (marker) {
        return this._markers.get(marker).then(function (m) { m.setLabel(marker.label); });
    };
    /**
     * @param {?} marker
     * @return {?}
     */
    MarkerManager.prototype.updateDraggable = /**
     * @param {?} marker
     * @return {?}
     */
    function (marker) {
        return this._markers.get(marker).then(function (m) { return m.setDraggable(marker.draggable); });
    };
    /**
     * @param {?} marker
     * @return {?}
     */
    MarkerManager.prototype.updateIcon = /**
     * @param {?} marker
     * @return {?}
     */
    function (marker) {
        return this._markers.get(marker).then(function (m) { return m.setIcon(marker.iconUrl); });
    };
    /**
     * @param {?} marker
     * @return {?}
     */
    MarkerManager.prototype.updateOpacity = /**
     * @param {?} marker
     * @return {?}
     */
    function (marker) {
        return this._markers.get(marker).then(function (m) { return m.setOpacity(marker.opacity); });
    };
    /**
     * @param {?} marker
     * @return {?}
     */
    MarkerManager.prototype.updateVisible = /**
     * @param {?} marker
     * @return {?}
     */
    function (marker) {
        return this._markers.get(marker).then(function (m) { return m.setVisible(marker.visible); });
    };
    /**
     * @param {?} marker
     * @return {?}
     */
    MarkerManager.prototype.updateZIndex = /**
     * @param {?} marker
     * @return {?}
     */
    function (marker) {
        return this._markers.get(marker).then(function (m) { return m.setZIndex(marker.zIndex); });
    };
    /**
     * @param {?} marker
     * @return {?}
     */
    MarkerManager.prototype.updateClickable = /**
     * @param {?} marker
     * @return {?}
     */
    function (marker) {
        return this._markers.get(marker).then(function (m) { return m.setClickable(marker.clickable); });
    };
    /**
     * @param {?} marker
     * @return {?}
     */
    MarkerManager.prototype.updateAnimation = /**
     * @param {?} marker
     * @return {?}
     */
    function (marker) {
        return this._markers.get(marker).then(function (m) {
            if (typeof marker.animation === 'string') {
                m.setAnimation(google.maps.Animation[marker.animation]);
            }
            else {
                m.setAnimation(marker.animation);
            }
        });
    };
    /**
     * @param {?} marker
     * @return {?}
     */
    MarkerManager.prototype.addMarker = /**
     * @param {?} marker
     * @return {?}
     */
    function (marker) {
        /** @type {?} */
        var markerPromise = this._mapsWrapper.createMarker({
            position: { lat: marker.latitude, lng: marker.longitude },
            label: marker.label,
            draggable: marker.draggable,
            icon: marker.iconUrl,
            opacity: marker.opacity,
            visible: marker.visible,
            zIndex: marker.zIndex,
            title: marker.title,
            clickable: marker.clickable,
            animation: (typeof marker.animation === 'string') ? google.maps.Animation[marker.animation] : marker.animation
        });
        this._markers.set(marker, markerPromise);
    };
    /**
     * @param {?} marker
     * @return {?}
     */
    MarkerManager.prototype.getNativeMarker = /**
     * @param {?} marker
     * @return {?}
     */
    function (marker) {
        return this._markers.get(marker);
    };
    /**
     * @template T
     * @param {?} eventName
     * @param {?} marker
     * @return {?}
     */
    MarkerManager.prototype.createEventObservable = /**
     * @template T
     * @param {?} eventName
     * @param {?} marker
     * @return {?}
     */
    function (eventName, marker) {
        var _this = this;
        return new Observable(function (observer) {
            _this._markers.get(marker).then(function (m) {
                m.addListener(eventName, function (e) { return _this._zone.run(function () { return observer.next(e); }); });
            });
        });
    };
    MarkerManager.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    MarkerManager.ctorParameters = function () { return [
        { type: GoogleMapsAPIWrapper },
        { type: NgZone }
    ]; };
    return MarkerManager;
}());
export { MarkerManager };
if (false) {
    /** @type {?} */
    MarkerManager.prototype._markers;
    /** @type {?} */
    MarkerManager.prototype._mapsWrapper;
    /** @type {?} */
    MarkerManager.prototype._zone;
}
//# sourceMappingURL=marker-manager.js.map