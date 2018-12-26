/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { PolygonManager } from '../services/managers/polygon-manager';
/**
 * AgmPolygon renders a polygon on a {\@link AgmMap}
 *
 * ### Example
 * ```typescript
 * import { Component } from '\@angular/core';
 *
 * \@Component({
 *  selector: 'my-map-cmp',
 *  styles: [`
 *    agm-map {
 *      height: 300px;
 *    }
 * `],
 *  template: `
 *    <agm-map [latitude]="lat" [longitude]="lng" [zoom]="zoom">
 *      <agm-polygon [paths]="paths">
 *      </agm-polygon>
 *    </agm-map>
 *  `
 * })
 * export class MyMapCmp {
 *   lat: number = 0;
 *   lng: number = 0;
 *   zoom: number = 10;
 *   paths: Array<LatLngLiteral> = [
 *     { lat: 0,  lng: 10 },
 *     { lat: 0,  lng: 20 },
 *     { lat: 10, lng: 20 },
 *     { lat: 10, lng: 10 },
 *     { lat: 0,  lng: 10 }
 *   ]
 *   // Nesting paths will create a hole where they overlap;
 *   nestedPaths: Array<Array<LatLngLiteral>> = [[
 *     { lat: 0,  lng: 10 },
 *     { lat: 0,  lng: 20 },
 *     { lat: 10, lng: 20 },
 *     { lat: 10, lng: 10 },
 *     { lat: 0,  lng: 10 }
 *   ], [
 *     { lat: 0, lng: 15 },
 *     { lat: 0, lng: 20 },
 *     { lat: 5, lng: 20 },
 *     { lat: 5, lng: 15 },
 *     { lat: 0, lng: 15 }
 *   ]]
 * }
 * ```
 */
var AgmPolygon = /** @class */ (function () {
    function AgmPolygon(_polygonManager) {
        this._polygonManager = _polygonManager;
        /**
         * Indicates whether this Polygon handles mouse events. Defaults to true.
         */
        this.clickable = true;
        /**
         * If set to true, the user can drag this shape over the map. The geodesic
         * property defines the mode of dragging. Defaults to false.
         */
        this.draggable = false;
        /**
         * If set to true, the user can edit this shape by dragging the control
         * points shown at the vertices and on each segment. Defaults to false.
         */
        this.editable = false;
        /**
         * When true, edges of the polygon are interpreted as geodesic and will
         * follow the curvature of the Earth. When false, edges of the polygon are
         * rendered as straight lines in screen space. Note that the shape of a
         * geodesic polygon may appear to change when dragged, as the dimensions
         * are maintained relative to the surface of the earth. Defaults to false.
         */
        this.geodesic = false;
        /**
         * The ordered sequence of coordinates that designates a closed loop.
         * Unlike polylines, a polygon may consist of one or more paths.
         *  As a result, the paths property may specify one or more arrays of
         * LatLng coordinates. Paths are closed automatically; do not repeat the
         * first vertex of the path as the last vertex. Simple polygons may be
         * defined using a single array of LatLngs. More complex polygons may
         * specify an array of arrays. Any simple arrays are converted into Arrays.
         * Inserting or removing LatLngs from the Array will automatically update
         * the polygon on the map.
         */
        this.paths = [];
        /**
         * This event is fired when the DOM click event is fired on the Polygon.
         */
        this.polyClick = new EventEmitter();
        /**
         * This event is fired when the DOM dblclick event is fired on the Polygon.
         */
        this.polyDblClick = new EventEmitter();
        /**
         * This event is repeatedly fired while the user drags the polygon.
         */
        this.polyDrag = new EventEmitter();
        /**
         * This event is fired when the user stops dragging the polygon.
         */
        this.polyDragEnd = new EventEmitter();
        /**
         * This event is fired when the user starts dragging the polygon.
         */
        this.polyDragStart = new EventEmitter();
        /**
         * This event is fired when the DOM mousedown event is fired on the Polygon.
         */
        this.polyMouseDown = new EventEmitter();
        /**
         * This event is fired when the DOM mousemove event is fired on the Polygon.
         */
        this.polyMouseMove = new EventEmitter();
        /**
         * This event is fired on Polygon mouseout.
         */
        this.polyMouseOut = new EventEmitter();
        /**
         * This event is fired on Polygon mouseover.
         */
        this.polyMouseOver = new EventEmitter();
        /**
         * This event is fired whe the DOM mouseup event is fired on the Polygon
         */
        this.polyMouseUp = new EventEmitter();
        /**
         * This even is fired when the Polygon is right-clicked on.
         */
        this.polyRightClick = new EventEmitter();
        this._polygonAddedToManager = false;
        this._subscriptions = [];
    }
    /** @internal */
    /**
     * \@internal
     * @return {?}
     */
    AgmPolygon.prototype.ngAfterContentInit = /**
     * \@internal
     * @return {?}
     */
    function () {
        if (!this._polygonAddedToManager) {
            this._init();
        }
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    AgmPolygon.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (!this._polygonAddedToManager) {
            this._init();
            return;
        }
        this._polygonManager.setPolygonOptions(this, this._updatePolygonOptions(changes));
    };
    /**
     * @return {?}
     */
    AgmPolygon.prototype._init = /**
     * @return {?}
     */
    function () {
        this._polygonManager.addPolygon(this);
        this._polygonAddedToManager = true;
        this._addEventListeners();
    };
    /**
     * @return {?}
     */
    AgmPolygon.prototype._addEventListeners = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var handlers = [
            { name: 'click', handler: function (ev) { return _this.polyClick.emit(ev); } },
            { name: 'dblclick', handler: function (ev) { return _this.polyDblClick.emit(ev); } },
            { name: 'drag', handler: function (ev) { return _this.polyDrag.emit(ev); } },
            { name: 'dragend', handler: function (ev) { return _this.polyDragEnd.emit(ev); } },
            { name: 'dragstart', handler: function (ev) { return _this.polyDragStart.emit(ev); } },
            { name: 'mousedown', handler: function (ev) { return _this.polyMouseDown.emit(ev); } },
            { name: 'mousemove', handler: function (ev) { return _this.polyMouseMove.emit(ev); } },
            { name: 'mouseout', handler: function (ev) { return _this.polyMouseOut.emit(ev); } },
            { name: 'mouseover', handler: function (ev) { return _this.polyMouseOver.emit(ev); } },
            { name: 'mouseup', handler: function (ev) { return _this.polyMouseUp.emit(ev); } },
            { name: 'rightclick', handler: function (ev) { return _this.polyRightClick.emit(ev); } },
        ];
        handlers.forEach(function (obj) {
            /** @type {?} */
            var os = _this._polygonManager.createEventObservable(obj.name, _this).subscribe(obj.handler);
            _this._subscriptions.push(os);
        });
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    AgmPolygon.prototype._updatePolygonOptions = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        return Object.keys(changes)
            .filter(function (k) { return AgmPolygon._polygonOptionsAttributes.indexOf(k) !== -1; })
            .reduce(function (obj, k) {
            obj[k] = changes[k].currentValue;
            return obj;
        }, {});
    };
    /** @internal */
    /**
     * \@internal
     * @return {?}
     */
    AgmPolygon.prototype.id = /**
     * \@internal
     * @return {?}
     */
    function () { return this._id; };
    /** @internal */
    /**
     * \@internal
     * @return {?}
     */
    AgmPolygon.prototype.ngOnDestroy = /**
     * \@internal
     * @return {?}
     */
    function () {
        this._polygonManager.deletePolygon(this);
        // unsubscribe all registered observable subscriptions
        this._subscriptions.forEach(function (s) { return s.unsubscribe(); });
    };
    AgmPolygon._polygonOptionsAttributes = [
        'clickable', 'draggable', 'editable', 'fillColor', 'fillOpacity', 'geodesic', 'icon', 'map',
        'paths', 'strokeColor', 'strokeOpacity', 'strokeWeight', 'visible', 'zIndex', 'draggable',
        'editable', 'visible'
    ];
    AgmPolygon.decorators = [
        { type: Directive, args: [{
                    selector: 'agm-polygon'
                },] }
    ];
    /** @nocollapse */
    AgmPolygon.ctorParameters = function () { return [
        { type: PolygonManager }
    ]; };
    AgmPolygon.propDecorators = {
        clickable: [{ type: Input }],
        draggable: [{ type: Input, args: ['polyDraggable',] }],
        editable: [{ type: Input }],
        fillColor: [{ type: Input }],
        fillOpacity: [{ type: Input }],
        geodesic: [{ type: Input }],
        paths: [{ type: Input }],
        strokeColor: [{ type: Input }],
        strokeOpacity: [{ type: Input }],
        strokeWeight: [{ type: Input }],
        visible: [{ type: Input }],
        zIndex: [{ type: Input }],
        polyClick: [{ type: Output }],
        polyDblClick: [{ type: Output }],
        polyDrag: [{ type: Output }],
        polyDragEnd: [{ type: Output }],
        polyDragStart: [{ type: Output }],
        polyMouseDown: [{ type: Output }],
        polyMouseMove: [{ type: Output }],
        polyMouseOut: [{ type: Output }],
        polyMouseOver: [{ type: Output }],
        polyMouseUp: [{ type: Output }],
        polyRightClick: [{ type: Output }]
    };
    return AgmPolygon;
}());
export { AgmPolygon };
if (false) {
    /** @type {?} */
    AgmPolygon._polygonOptionsAttributes;
    /**
     * Indicates whether this Polygon handles mouse events. Defaults to true.
     * @type {?}
     */
    AgmPolygon.prototype.clickable;
    /**
     * If set to true, the user can drag this shape over the map. The geodesic
     * property defines the mode of dragging. Defaults to false.
     * @type {?}
     */
    AgmPolygon.prototype.draggable;
    /**
     * If set to true, the user can edit this shape by dragging the control
     * points shown at the vertices and on each segment. Defaults to false.
     * @type {?}
     */
    AgmPolygon.prototype.editable;
    /**
     * The fill color. All CSS3 colors are supported except for extended
     * named colors.
     * @type {?}
     */
    AgmPolygon.prototype.fillColor;
    /**
     * The fill opacity between 0.0 and 1.0
     * @type {?}
     */
    AgmPolygon.prototype.fillOpacity;
    /**
     * When true, edges of the polygon are interpreted as geodesic and will
     * follow the curvature of the Earth. When false, edges of the polygon are
     * rendered as straight lines in screen space. Note that the shape of a
     * geodesic polygon may appear to change when dragged, as the dimensions
     * are maintained relative to the surface of the earth. Defaults to false.
     * @type {?}
     */
    AgmPolygon.prototype.geodesic;
    /**
     * The ordered sequence of coordinates that designates a closed loop.
     * Unlike polylines, a polygon may consist of one or more paths.
     *  As a result, the paths property may specify one or more arrays of
     * LatLng coordinates. Paths are closed automatically; do not repeat the
     * first vertex of the path as the last vertex. Simple polygons may be
     * defined using a single array of LatLngs. More complex polygons may
     * specify an array of arrays. Any simple arrays are converted into Arrays.
     * Inserting or removing LatLngs from the Array will automatically update
     * the polygon on the map.
     * @type {?}
     */
    AgmPolygon.prototype.paths;
    /**
     * The stroke color. All CSS3 colors are supported except for extended
     * named colors.
     * @type {?}
     */
    AgmPolygon.prototype.strokeColor;
    /**
     * The stroke opacity between 0.0 and 1.0
     * @type {?}
     */
    AgmPolygon.prototype.strokeOpacity;
    /**
     * The stroke width in pixels.
     * @type {?}
     */
    AgmPolygon.prototype.strokeWeight;
    /**
     * Whether this polygon is visible on the map. Defaults to true.
     * @type {?}
     */
    AgmPolygon.prototype.visible;
    /**
     * The zIndex compared to other polys.
     * @type {?}
     */
    AgmPolygon.prototype.zIndex;
    /**
     * This event is fired when the DOM click event is fired on the Polygon.
     * @type {?}
     */
    AgmPolygon.prototype.polyClick;
    /**
     * This event is fired when the DOM dblclick event is fired on the Polygon.
     * @type {?}
     */
    AgmPolygon.prototype.polyDblClick;
    /**
     * This event is repeatedly fired while the user drags the polygon.
     * @type {?}
     */
    AgmPolygon.prototype.polyDrag;
    /**
     * This event is fired when the user stops dragging the polygon.
     * @type {?}
     */
    AgmPolygon.prototype.polyDragEnd;
    /**
     * This event is fired when the user starts dragging the polygon.
     * @type {?}
     */
    AgmPolygon.prototype.polyDragStart;
    /**
     * This event is fired when the DOM mousedown event is fired on the Polygon.
     * @type {?}
     */
    AgmPolygon.prototype.polyMouseDown;
    /**
     * This event is fired when the DOM mousemove event is fired on the Polygon.
     * @type {?}
     */
    AgmPolygon.prototype.polyMouseMove;
    /**
     * This event is fired on Polygon mouseout.
     * @type {?}
     */
    AgmPolygon.prototype.polyMouseOut;
    /**
     * This event is fired on Polygon mouseover.
     * @type {?}
     */
    AgmPolygon.prototype.polyMouseOver;
    /**
     * This event is fired whe the DOM mouseup event is fired on the Polygon
     * @type {?}
     */
    AgmPolygon.prototype.polyMouseUp;
    /**
     * This even is fired when the Polygon is right-clicked on.
     * @type {?}
     */
    AgmPolygon.prototype.polyRightClick;
    /** @type {?} */
    AgmPolygon.prototype._id;
    /** @type {?} */
    AgmPolygon.prototype._polygonAddedToManager;
    /** @type {?} */
    AgmPolygon.prototype._subscriptions;
    /** @type {?} */
    AgmPolygon.prototype._polygonManager;
}
//# sourceMappingURL=polygon.js.map