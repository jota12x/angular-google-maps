/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { ContentChildren, Directive, EventEmitter, QueryList, Input, Output } from '@angular/core';
import { PolylineManager } from '../services/managers/polyline-manager';
import { AgmPolylinePoint } from './polyline-point';
/** @type {?} */
var polylineId = 0;
/**
 * AgmPolyline renders a polyline on a {\@link AgmMap}
 *
 * ### Example
 * ```typescript
 * import { Component } from '\@angular/core';
 *
 * \@Component({
 *  selector: 'my-map-cmp',
 *  styles: [`
 *    .agm-map-container {
 *      height: 300px;
 *    }
 * `],
 *  template: `
 *    <agm-map [latitude]="lat" [longitude]="lng" [zoom]="zoom">
 *      <agm-polyline>
 *          <agm-polyline-point [latitude]="latA" [longitude]="lngA">
 *          </agm-polyline-point>
 *          <agm-polyline-point [latitude]="latB" [longitude]="lngB">
 *          </agm-polyline-point>
 *      </agm-polyline>
 *    </agm-map>
 *  `
 * })
 * ```
 */
var AgmPolyline = /** @class */ (function () {
    function AgmPolyline(_polylineManager) {
        this._polylineManager = _polylineManager;
        /**
         * Indicates whether this Polyline handles mouse events. Defaults to true.
         */
        this.clickable = true;
        /**
         * If set to true, the user can drag this shape over the map. The geodesic property defines the
         * mode of dragging. Defaults to false.
         */
        this.draggable = false;
        /**
         * If set to true, the user can edit this shape by dragging the control points shown at the
         * vertices and on each segment. Defaults to false.
         */
        this.editable = false;
        /**
         * When true, edges of the polygon are interpreted as geodesic and will follow the curvature of
         * the Earth. When false, edges of the polygon are rendered as straight lines in screen space.
         * Note that the shape of a geodesic polygon may appear to change when dragged, as the dimensions
         * are maintained relative to the surface of the earth. Defaults to false.
         */
        this.geodesic = false;
        /**
         * Whether this polyline is visible on the map. Defaults to true.
         */
        this.visible = true;
        /**
         * This event is fired when the DOM click event is fired on the Polyline.
         */
        this.lineClick = new EventEmitter();
        /**
         * This event is fired when the DOM dblclick event is fired on the Polyline.
         */
        this.lineDblClick = new EventEmitter();
        /**
         * This event is repeatedly fired while the user drags the polyline.
         */
        this.lineDrag = new EventEmitter();
        /**
         * This event is fired when the user stops dragging the polyline.
         */
        this.lineDragEnd = new EventEmitter();
        /**
         * This event is fired when the user starts dragging the polyline.
         */
        this.lineDragStart = new EventEmitter();
        /**
         * This event is fired when the DOM mousedown event is fired on the Polyline.
         */
        this.lineMouseDown = new EventEmitter();
        /**
         * This event is fired when the DOM mousemove event is fired on the Polyline.
         */
        this.lineMouseMove = new EventEmitter();
        /**
         * This event is fired on Polyline mouseout.
         */
        this.lineMouseOut = new EventEmitter();
        /**
         * This event is fired on Polyline mouseover.
         */
        this.lineMouseOver = new EventEmitter();
        /**
         * This event is fired whe the DOM mouseup event is fired on the Polyline
         */
        this.lineMouseUp = new EventEmitter();
        /**
         * This even is fired when the Polyline is right-clicked on.
         */
        this.lineRightClick = new EventEmitter();
        this._polylineAddedToManager = false;
        this._subscriptions = [];
        this._id = (polylineId++).toString();
    }
    /** @internal */
    /**
     * \@internal
     * @return {?}
     */
    AgmPolyline.prototype.ngAfterContentInit = /**
     * \@internal
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.points.length) {
            this.points.forEach(function (point) {
                /** @type {?} */
                var s = point.positionChanged.subscribe(function () { _this._polylineManager.updatePolylinePoints(_this); });
                _this._subscriptions.push(s);
            });
        }
        if (!this._polylineAddedToManager) {
            this._init();
        }
        /** @type {?} */
        var s = this.points.changes.subscribe(function () { return _this._polylineManager.updatePolylinePoints(_this); });
        this._subscriptions.push(s);
        this._polylineManager.updatePolylinePoints(this);
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    AgmPolyline.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (!this._polylineAddedToManager) {
            this._init();
            return;
        }
        /** @type {?} */
        var options = {};
        /** @type {?} */
        var optionKeys = Object.keys(changes).filter(function (k) { return AgmPolyline._polylineOptionsAttributes.indexOf(k) !== -1; });
        optionKeys.forEach(function (k) { return options[k] = changes[k].currentValue; });
        this._polylineManager.setPolylineOptions(this, options);
    };
    /**
     * @return {?}
     */
    AgmPolyline.prototype._init = /**
     * @return {?}
     */
    function () {
        this._polylineManager.addPolyline(this);
        this._polylineAddedToManager = true;
        this._addEventListeners();
    };
    /**
     * @return {?}
     */
    AgmPolyline.prototype._addEventListeners = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var handlers = [
            { name: 'click', handler: function (ev) { return _this.lineClick.emit(ev); } },
            { name: 'dblclick', handler: function (ev) { return _this.lineDblClick.emit(ev); } },
            { name: 'drag', handler: function (ev) { return _this.lineDrag.emit(ev); } },
            { name: 'dragend', handler: function (ev) { return _this.lineDragEnd.emit(ev); } },
            { name: 'dragstart', handler: function (ev) { return _this.lineDragStart.emit(ev); } },
            { name: 'mousedown', handler: function (ev) { return _this.lineMouseDown.emit(ev); } },
            { name: 'mousemove', handler: function (ev) { return _this.lineMouseMove.emit(ev); } },
            { name: 'mouseout', handler: function (ev) { return _this.lineMouseOut.emit(ev); } },
            { name: 'mouseover', handler: function (ev) { return _this.lineMouseOver.emit(ev); } },
            { name: 'mouseup', handler: function (ev) { return _this.lineMouseUp.emit(ev); } },
            { name: 'rightclick', handler: function (ev) { return _this.lineRightClick.emit(ev); } },
        ];
        handlers.forEach(function (obj) {
            /** @type {?} */
            var os = _this._polylineManager.createEventObservable(obj.name, _this).subscribe(obj.handler);
            _this._subscriptions.push(os);
        });
    };
    /** @internal */
    /**
     * \@internal
     * @return {?}
     */
    AgmPolyline.prototype._getPoints = /**
     * \@internal
     * @return {?}
     */
    function () {
        if (this.points) {
            return this.points.toArray();
        }
        return [];
    };
    /** @internal */
    /**
     * \@internal
     * @return {?}
     */
    AgmPolyline.prototype.id = /**
     * \@internal
     * @return {?}
     */
    function () { return this._id; };
    /** @internal */
    /**
     * \@internal
     * @return {?}
     */
    AgmPolyline.prototype.ngOnDestroy = /**
     * \@internal
     * @return {?}
     */
    function () {
        this._polylineManager.deletePolyline(this);
        // unsubscribe all registered observable subscriptions
        this._subscriptions.forEach(function (s) { return s.unsubscribe(); });
    };
    AgmPolyline._polylineOptionsAttributes = [
        'draggable', 'editable', 'visible', 'geodesic', 'strokeColor', 'strokeOpacity', 'strokeWeight',
        'zIndex'
    ];
    AgmPolyline.decorators = [
        { type: Directive, args: [{
                    selector: 'agm-polyline'
                },] }
    ];
    /** @nocollapse */
    AgmPolyline.ctorParameters = function () { return [
        { type: PolylineManager }
    ]; };
    AgmPolyline.propDecorators = {
        clickable: [{ type: Input }],
        draggable: [{ type: Input, args: ['polylineDraggable',] }],
        editable: [{ type: Input }],
        geodesic: [{ type: Input }],
        strokeColor: [{ type: Input }],
        strokeOpacity: [{ type: Input }],
        strokeWeight: [{ type: Input }],
        visible: [{ type: Input }],
        zIndex: [{ type: Input }],
        lineClick: [{ type: Output }],
        lineDblClick: [{ type: Output }],
        lineDrag: [{ type: Output }],
        lineDragEnd: [{ type: Output }],
        lineDragStart: [{ type: Output }],
        lineMouseDown: [{ type: Output }],
        lineMouseMove: [{ type: Output }],
        lineMouseOut: [{ type: Output }],
        lineMouseOver: [{ type: Output }],
        lineMouseUp: [{ type: Output }],
        lineRightClick: [{ type: Output }],
        points: [{ type: ContentChildren, args: [AgmPolylinePoint,] }]
    };
    return AgmPolyline;
}());
export { AgmPolyline };
if (false) {
    /** @type {?} */
    AgmPolyline._polylineOptionsAttributes;
    /**
     * Indicates whether this Polyline handles mouse events. Defaults to true.
     * @type {?}
     */
    AgmPolyline.prototype.clickable;
    /**
     * If set to true, the user can drag this shape over the map. The geodesic property defines the
     * mode of dragging. Defaults to false.
     * @type {?}
     */
    AgmPolyline.prototype.draggable;
    /**
     * If set to true, the user can edit this shape by dragging the control points shown at the
     * vertices and on each segment. Defaults to false.
     * @type {?}
     */
    AgmPolyline.prototype.editable;
    /**
     * When true, edges of the polygon are interpreted as geodesic and will follow the curvature of
     * the Earth. When false, edges of the polygon are rendered as straight lines in screen space.
     * Note that the shape of a geodesic polygon may appear to change when dragged, as the dimensions
     * are maintained relative to the surface of the earth. Defaults to false.
     * @type {?}
     */
    AgmPolyline.prototype.geodesic;
    /**
     * The stroke color. All CSS3 colors are supported except for extended named colors.
     * @type {?}
     */
    AgmPolyline.prototype.strokeColor;
    /**
     * The stroke opacity between 0.0 and 1.0.
     * @type {?}
     */
    AgmPolyline.prototype.strokeOpacity;
    /**
     * The stroke width in pixels.
     * @type {?}
     */
    AgmPolyline.prototype.strokeWeight;
    /**
     * Whether this polyline is visible on the map. Defaults to true.
     * @type {?}
     */
    AgmPolyline.prototype.visible;
    /**
     * The zIndex compared to other polys.
     * @type {?}
     */
    AgmPolyline.prototype.zIndex;
    /**
     * This event is fired when the DOM click event is fired on the Polyline.
     * @type {?}
     */
    AgmPolyline.prototype.lineClick;
    /**
     * This event is fired when the DOM dblclick event is fired on the Polyline.
     * @type {?}
     */
    AgmPolyline.prototype.lineDblClick;
    /**
     * This event is repeatedly fired while the user drags the polyline.
     * @type {?}
     */
    AgmPolyline.prototype.lineDrag;
    /**
     * This event is fired when the user stops dragging the polyline.
     * @type {?}
     */
    AgmPolyline.prototype.lineDragEnd;
    /**
     * This event is fired when the user starts dragging the polyline.
     * @type {?}
     */
    AgmPolyline.prototype.lineDragStart;
    /**
     * This event is fired when the DOM mousedown event is fired on the Polyline.
     * @type {?}
     */
    AgmPolyline.prototype.lineMouseDown;
    /**
     * This event is fired when the DOM mousemove event is fired on the Polyline.
     * @type {?}
     */
    AgmPolyline.prototype.lineMouseMove;
    /**
     * This event is fired on Polyline mouseout.
     * @type {?}
     */
    AgmPolyline.prototype.lineMouseOut;
    /**
     * This event is fired on Polyline mouseover.
     * @type {?}
     */
    AgmPolyline.prototype.lineMouseOver;
    /**
     * This event is fired whe the DOM mouseup event is fired on the Polyline
     * @type {?}
     */
    AgmPolyline.prototype.lineMouseUp;
    /**
     * This even is fired when the Polyline is right-clicked on.
     * @type {?}
     */
    AgmPolyline.prototype.lineRightClick;
    /**
     * \@internal
     * @type {?}
     */
    AgmPolyline.prototype.points;
    /** @type {?} */
    AgmPolyline.prototype._id;
    /** @type {?} */
    AgmPolyline.prototype._polylineAddedToManager;
    /** @type {?} */
    AgmPolyline.prototype._subscriptions;
    /** @type {?} */
    AgmPolyline.prototype._polylineManager;
}
//# sourceMappingURL=polyline.js.map