/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Directive, EventEmitter, Input, Output } from '@angular/core';
/**
 * AgmPolylinePoint represents one element of a polyline within a  {\@link
 * SembGoogleMapPolyline}
 */
var AgmPolylinePoint = /** @class */ (function () {
    function AgmPolylinePoint() {
        /**
         * This event emitter gets emitted when the position of the point changed.
         */
        this.positionChanged = new EventEmitter();
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    AgmPolylinePoint.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes['latitude'] || changes['longitude']) {
            /** @type {?} */
            var position = /** @type {?} */ ({
                lat: changes['latitude'].currentValue,
                lng: changes['longitude'].currentValue
            });
            this.positionChanged.emit(position);
        }
    };
    AgmPolylinePoint.decorators = [
        { type: Directive, args: [{ selector: 'agm-polyline-point' },] }
    ];
    /** @nocollapse */
    AgmPolylinePoint.ctorParameters = function () { return []; };
    AgmPolylinePoint.propDecorators = {
        latitude: [{ type: Input }],
        longitude: [{ type: Input }],
        positionChanged: [{ type: Output }]
    };
    return AgmPolylinePoint;
}());
export { AgmPolylinePoint };
if (false) {
    /**
     * The latitude position of the point.
     * @type {?}
     */
    AgmPolylinePoint.prototype.latitude;
    /**
     * The longitude position of the point;
     * @type {?}
     */
    AgmPolylinePoint.prototype.longitude;
    /**
     * This event emitter gets emitted when the position of the point changed.
     * @type {?}
     */
    AgmPolylinePoint.prototype.positionChanged;
}
//# sourceMappingURL=polyline-point.js.map