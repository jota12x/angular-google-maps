/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject, from, timer } from 'rxjs';
import { flatMap, map, sample, switchMap, shareReplay } from 'rxjs/operators';
import { MapsAPILoader } from './maps-api-loader/maps-api-loader';
/**
 * @record
 */
export function FitBoundsDetails() { }
/** @type {?} */
FitBoundsDetails.prototype.latLng;
/** @typedef {?} */
var BoundsMap;
export { BoundsMap };
/**
 * Class to implement when you what to be able to make it work with the auto fit bounds feature
 * of AGM.
 * @abstract
 */
var /**
 * Class to implement when you what to be able to make it work with the auto fit bounds feature
 * of AGM.
 * @abstract
 */
FitBoundsAccessor = /** @class */ (function () {
    function FitBoundsAccessor() {
    }
    return FitBoundsAccessor;
}());
/**
 * Class to implement when you what to be able to make it work with the auto fit bounds feature
 * of AGM.
 * @abstract
 */
export { FitBoundsAccessor };
if (false) {
    /**
     * @abstract
     * @return {?}
     */
    FitBoundsAccessor.prototype.getFitBoundsDetails$ = function () { };
}
/**
 * The FitBoundsService is responsible for computing the bounds of the a single map.
 */
var FitBoundsService = /** @class */ (function () {
    function FitBoundsService(loader) {
        var _this = this;
        this._boundsChangeSampleTime$ = new BehaviorSubject(200);
        this._includeInBounds$ = new BehaviorSubject(new Map());
        this.bounds$ = from(loader.load()).pipe(flatMap(function () { return _this._includeInBounds$; }), sample(this._boundsChangeSampleTime$.pipe(switchMap(function (time) { return timer(0, time); }))), map(function (includeInBounds) { return _this._generateBounds(includeInBounds); }), shareReplay(1));
    }
    /**
     * @param {?} includeInBounds
     * @return {?}
     */
    FitBoundsService.prototype._generateBounds = /**
     * @param {?} includeInBounds
     * @return {?}
     */
    function (includeInBounds) {
        /** @type {?} */
        var bounds = /** @type {?} */ (new google.maps.LatLngBounds());
        includeInBounds.forEach(function (b) { return bounds.extend(b); });
        return bounds;
    };
    /**
     * @param {?} latLng
     * @return {?}
     */
    FitBoundsService.prototype.addToBounds = /**
     * @param {?} latLng
     * @return {?}
     */
    function (latLng) {
        /** @type {?} */
        var id = this._createIdentifier(latLng);
        if (this._includeInBounds$.value.has(id)) {
            return;
        }
        /** @type {?} */
        var map = this._includeInBounds$.value;
        map.set(id, latLng);
        this._includeInBounds$.next(map);
    };
    /**
     * @param {?} latLng
     * @return {?}
     */
    FitBoundsService.prototype.removeFromBounds = /**
     * @param {?} latLng
     * @return {?}
     */
    function (latLng) {
        /** @type {?} */
        var map = this._includeInBounds$.value;
        map.delete(this._createIdentifier(latLng));
        this._includeInBounds$.next(map);
    };
    /**
     * @param {?} timeMs
     * @return {?}
     */
    FitBoundsService.prototype.changeFitBoundsChangeSampleTime = /**
     * @param {?} timeMs
     * @return {?}
     */
    function (timeMs) {
        this._boundsChangeSampleTime$.next(timeMs);
    };
    /**
     * @return {?}
     */
    FitBoundsService.prototype.getBounds$ = /**
     * @return {?}
     */
    function () {
        return this.bounds$;
    };
    /**
     * @param {?} latLng
     * @return {?}
     */
    FitBoundsService.prototype._createIdentifier = /**
     * @param {?} latLng
     * @return {?}
     */
    function (latLng) {
        return latLng.lat + "+" + latLng.lng;
    };
    FitBoundsService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    FitBoundsService.ctorParameters = function () { return [
        { type: MapsAPILoader }
    ]; };
    return FitBoundsService;
}());
export { FitBoundsService };
if (false) {
    /** @type {?} */
    FitBoundsService.prototype.bounds$;
    /** @type {?} */
    FitBoundsService.prototype._boundsChangeSampleTime$;
    /** @type {?} */
    FitBoundsService.prototype._includeInBounds$;
}
//# sourceMappingURL=fit-bounds.js.map