/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { KmlLayerManager } from './../services/managers/kml-layer-manager';
/** @type {?} */
var layerId = 0;
var AgmKmlLayer = /** @class */ (function () {
    function AgmKmlLayer(_manager) {
        this._manager = _manager;
        this._addedToManager = false;
        this._id = (layerId++).toString();
        this._subscriptions = [];
        /**
         * If true, the layer receives mouse events. Default value is true.
         */
        this.clickable = true;
        /**
         * By default, the input map is centered and zoomed to the bounding box of the contents of the
         * layer.
         * If this option is set to true, the viewport is left unchanged, unless the map's center and zoom
         * were never set.
         */
        this.preserveViewport = false;
        /**
         * Whether to render the screen overlays. Default true.
         */
        this.screenOverlays = true;
        /**
         * Suppress the rendering of info windows when layer features are clicked.
         */
        this.suppressInfoWindows = false;
        /**
         * The URL of the KML document to display.
         */
        this.url = null;
        /**
         * The z-index of the layer.
         */
        this.zIndex = null;
        /**
         * This event is fired when a feature in the layer is clicked.
         */
        this.layerClick = new EventEmitter();
        /**
         * This event is fired when the KML layers default viewport has changed.
         */
        this.defaultViewportChange = new EventEmitter();
        /**
         * This event is fired when the KML layer has finished loading.
         * At this point it is safe to read the status property to determine if the layer loaded
         * successfully.
         */
        this.statusChange = new EventEmitter();
    }
    /**
     * @return {?}
     */
    AgmKmlLayer.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        if (this._addedToManager) {
            return;
        }
        this._manager.addKmlLayer(this);
        this._addedToManager = true;
        this._addEventListeners();
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    AgmKmlLayer.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (!this._addedToManager) {
            return;
        }
        this._updatePolygonOptions(changes);
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    AgmKmlLayer.prototype._updatePolygonOptions = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        /** @type {?} */
        var options = Object.keys(changes)
            .filter(function (k) { return AgmKmlLayer._kmlLayerOptions.indexOf(k) !== -1; })
            .reduce(function (obj, k) {
            obj[k] = changes[k].currentValue;
            return obj;
        }, {});
        if (Object.keys(options).length > 0) {
            this._manager.setOptions(this, options);
        }
    };
    /**
     * @return {?}
     */
    AgmKmlLayer.prototype._addEventListeners = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var listeners = [
            { name: 'click', handler: function (ev) { return _this.layerClick.emit(ev); } },
            { name: 'defaultviewport_changed', handler: function () { return _this.defaultViewportChange.emit(); } },
            { name: 'status_changed', handler: function () { return _this.statusChange.emit(); } },
        ];
        listeners.forEach(function (obj) {
            /** @type {?} */
            var os = _this._manager.createEventObservable(obj.name, _this).subscribe(obj.handler);
            _this._subscriptions.push(os);
        });
    };
    /** @internal */
    /**
     * \@internal
     * @return {?}
     */
    AgmKmlLayer.prototype.id = /**
     * \@internal
     * @return {?}
     */
    function () { return this._id; };
    /** @internal */
    /**
     * \@internal
     * @return {?}
     */
    AgmKmlLayer.prototype.toString = /**
     * \@internal
     * @return {?}
     */
    function () { return "AgmKmlLayer-" + this._id.toString(); };
    /** @internal */
    /**
     * \@internal
     * @return {?}
     */
    AgmKmlLayer.prototype.ngOnDestroy = /**
     * \@internal
     * @return {?}
     */
    function () {
        this._manager.deleteKmlLayer(this);
        // unsubscribe all registered observable subscriptions
        this._subscriptions.forEach(function (s) { return s.unsubscribe(); });
    };
    AgmKmlLayer._kmlLayerOptions = ['clickable', 'preserveViewport', 'screenOverlays', 'suppressInfoWindows', 'url', 'zIndex'];
    AgmKmlLayer.decorators = [
        { type: Directive, args: [{
                    selector: 'agm-kml-layer'
                },] }
    ];
    /** @nocollapse */
    AgmKmlLayer.ctorParameters = function () { return [
        { type: KmlLayerManager }
    ]; };
    AgmKmlLayer.propDecorators = {
        clickable: [{ type: Input }],
        preserveViewport: [{ type: Input }],
        screenOverlays: [{ type: Input }],
        suppressInfoWindows: [{ type: Input }],
        url: [{ type: Input }],
        zIndex: [{ type: Input }],
        layerClick: [{ type: Output }],
        defaultViewportChange: [{ type: Output }],
        statusChange: [{ type: Output }]
    };
    return AgmKmlLayer;
}());
export { AgmKmlLayer };
if (false) {
    /** @type {?} */
    AgmKmlLayer._kmlLayerOptions;
    /** @type {?} */
    AgmKmlLayer.prototype._addedToManager;
    /** @type {?} */
    AgmKmlLayer.prototype._id;
    /** @type {?} */
    AgmKmlLayer.prototype._subscriptions;
    /**
     * If true, the layer receives mouse events. Default value is true.
     * @type {?}
     */
    AgmKmlLayer.prototype.clickable;
    /**
     * By default, the input map is centered and zoomed to the bounding box of the contents of the
     * layer.
     * If this option is set to true, the viewport is left unchanged, unless the map's center and zoom
     * were never set.
     * @type {?}
     */
    AgmKmlLayer.prototype.preserveViewport;
    /**
     * Whether to render the screen overlays. Default true.
     * @type {?}
     */
    AgmKmlLayer.prototype.screenOverlays;
    /**
     * Suppress the rendering of info windows when layer features are clicked.
     * @type {?}
     */
    AgmKmlLayer.prototype.suppressInfoWindows;
    /**
     * The URL of the KML document to display.
     * @type {?}
     */
    AgmKmlLayer.prototype.url;
    /**
     * The z-index of the layer.
     * @type {?}
     */
    AgmKmlLayer.prototype.zIndex;
    /**
     * This event is fired when a feature in the layer is clicked.
     * @type {?}
     */
    AgmKmlLayer.prototype.layerClick;
    /**
     * This event is fired when the KML layers default viewport has changed.
     * @type {?}
     */
    AgmKmlLayer.prototype.defaultViewportChange;
    /**
     * This event is fired when the KML layer has finished loading.
     * At this point it is safe to read the status property to determine if the layer loaded
     * successfully.
     * @type {?}
     */
    AgmKmlLayer.prototype.statusChange;
    /** @type {?} */
    AgmKmlLayer.prototype._manager;
}
//# sourceMappingURL=kml-layer.js.map