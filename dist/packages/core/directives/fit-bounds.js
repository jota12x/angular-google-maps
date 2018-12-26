/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Directive, Self, Input } from '@angular/core';
import { FitBoundsService, FitBoundsAccessor } from '../services/fit-bounds';
import { Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
/**
 * Adds the given directive to the auto fit bounds feature when the value is true.
 * To make it work with you custom AGM component, you also have to implement the {\@link FitBoundsAccessor} abstract class.
 * \@example
 * <agm-marker [agmFitBounds]="true"></agm-marker>
 */
var AgmFitBounds = /** @class */ (function () {
    function AgmFitBounds(_fitBoundsAccessor, _fitBoundsService) {
        this._fitBoundsAccessor = _fitBoundsAccessor;
        this._fitBoundsService = _fitBoundsService;
        /**
         * If the value is true, the element gets added to the bounds of the map.
         * Default: true.
         */
        this.agmFitBounds = true;
        this._destroyed$ = new Subject();
        this._latestFitBoundsDetails = null;
    }
    /**
     * @internal
     */
    /**
     * \@internal
     * @param {?} changes
     * @return {?}
     */
    AgmFitBounds.prototype.ngOnChanges = /**
     * \@internal
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        this._updateBounds();
    };
    /**
     * @internal
     */
    /**
     * \@internal
     * @return {?}
     */
    AgmFitBounds.prototype.ngOnInit = /**
     * \@internal
     * @return {?}
     */
    function () {
        var _this = this;
        this._fitBoundsAccessor
            .getFitBoundsDetails$()
            .pipe(distinctUntilChanged(function (x, y) {
            return x.latLng.lat === y.latLng.lng;
        }), takeUntil(this._destroyed$))
            .subscribe(function (details) { return _this._updateBounds(details); });
    };
    /**
     * @param {?=} newFitBoundsDetails
     * @return {?}
     */
    AgmFitBounds.prototype._updateBounds = /**
     * @param {?=} newFitBoundsDetails
     * @return {?}
     */
    function (newFitBoundsDetails) {
        if (newFitBoundsDetails) {
            this._latestFitBoundsDetails = newFitBoundsDetails;
        }
        if (!this._latestFitBoundsDetails) {
            return;
        }
        if (this.agmFitBounds) {
            this._fitBoundsService.addToBounds(this._latestFitBoundsDetails.latLng);
        }
        else {
            this._fitBoundsService.removeFromBounds(this._latestFitBoundsDetails.latLng);
        }
    };
    /**
     * @internal
     */
    /**
     * \@internal
     * @return {?}
     */
    AgmFitBounds.prototype.ngOnDestroy = /**
     * \@internal
     * @return {?}
     */
    function () {
        this._destroyed$.next();
        this._destroyed$.complete();
        if (this._latestFitBoundsDetails !== null) {
            this._fitBoundsService.removeFromBounds(this._latestFitBoundsDetails.latLng);
        }
    };
    AgmFitBounds.decorators = [
        { type: Directive, args: [{
                    selector: '[agmFitBounds]'
                },] }
    ];
    /** @nocollapse */
    AgmFitBounds.ctorParameters = function () { return [
        { type: FitBoundsAccessor, decorators: [{ type: Self }] },
        { type: FitBoundsService }
    ]; };
    AgmFitBounds.propDecorators = {
        agmFitBounds: [{ type: Input }]
    };
    return AgmFitBounds;
}());
export { AgmFitBounds };
if (false) {
    /**
     * If the value is true, the element gets added to the bounds of the map.
     * Default: true.
     * @type {?}
     */
    AgmFitBounds.prototype.agmFitBounds;
    /** @type {?} */
    AgmFitBounds.prototype._destroyed$;
    /** @type {?} */
    AgmFitBounds.prototype._latestFitBoundsDetails;
    /** @type {?} */
    AgmFitBounds.prototype._fitBoundsAccessor;
    /** @type {?} */
    AgmFitBounds.prototype._fitBoundsService;
}
//# sourceMappingURL=fit-bounds.js.map