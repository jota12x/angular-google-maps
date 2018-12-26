/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, ElementRef, EventEmitter, Output, Input } from '@angular/core';
import { InfoWindowManager } from '../services/managers/info-window-manager';
/** @type {?} */
var infoWindowId = 0;
/**
 * AgmInfoWindow renders a info window inside a {\@link AgmMarker} or standalone.
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
 *      <agm-marker [latitude]="lat" [longitude]="lng" [label]="'M'">
 *        <agm-info-window [disableAutoPan]="true">
 *          Hi, this is the content of the <strong>info window</strong>
 *        </agm-info-window>
 *      </agm-marker>
 *    </agm-map>
 *  `
 * })
 * ```
 */
var AgmInfoWindow = /** @class */ (function () {
    function AgmInfoWindow(_infoWindowManager, _el) {
        this._infoWindowManager = _infoWindowManager;
        this._el = _el;
        /**
         * Sets the open state for the InfoWindow. You can also call the open() and close() methods.
         */
        this.isOpen = false;
        /**
         * Emits an event when the info window is closed.
         */
        this.infoWindowClose = new EventEmitter();
        this._infoWindowAddedToManager = false;
        this._id = (infoWindowId++).toString();
    }
    /**
     * @return {?}
     */
    AgmInfoWindow.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.content = this._el.nativeElement.querySelector('.agm-info-window-content');
        this._infoWindowManager.addInfoWindow(this);
        this._infoWindowAddedToManager = true;
        this._updateOpenState();
        this._registerEventListeners();
    };
    /** @internal */
    /**
     * \@internal
     * @param {?} changes
     * @return {?}
     */
    AgmInfoWindow.prototype.ngOnChanges = /**
     * \@internal
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (!this._infoWindowAddedToManager) {
            return;
        }
        if ((changes['latitude'] || changes['longitude']) && typeof this.latitude === 'number' &&
            typeof this.longitude === 'number') {
            this._infoWindowManager.setPosition(this);
        }
        if (changes['zIndex']) {
            this._infoWindowManager.setZIndex(this);
        }
        if (changes['isOpen']) {
            this._updateOpenState();
        }
        this._setInfoWindowOptions(changes);
    };
    /**
     * @return {?}
     */
    AgmInfoWindow.prototype._registerEventListeners = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this._infoWindowManager.createEventObservable('closeclick', this).subscribe(function () {
            _this.isOpen = false;
            _this.infoWindowClose.emit();
        });
    };
    /**
     * @return {?}
     */
    AgmInfoWindow.prototype._updateOpenState = /**
     * @return {?}
     */
    function () {
        this.isOpen ? this.open() : this.close();
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    AgmInfoWindow.prototype._setInfoWindowOptions = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        /** @type {?} */
        var options = {};
        /** @type {?} */
        var optionKeys = Object.keys(changes).filter(function (k) { return AgmInfoWindow._infoWindowOptionsInputs.indexOf(k) !== -1; });
        optionKeys.forEach(function (k) { options[k] = changes[k].currentValue; });
        this._infoWindowManager.setOptions(this, options);
    };
    /**
     * Opens the info window.
     */
    /**
     * Opens the info window.
     * @return {?}
     */
    AgmInfoWindow.prototype.open = /**
     * Opens the info window.
     * @return {?}
     */
    function () { return this._infoWindowManager.open(this); };
    /**
     * Closes the info window.
     */
    /**
     * Closes the info window.
     * @return {?}
     */
    AgmInfoWindow.prototype.close = /**
     * Closes the info window.
     * @return {?}
     */
    function () {
        var _this = this;
        return this._infoWindowManager.close(this).then(function () { _this.infoWindowClose.emit(); });
    };
    /** @internal */
    /**
     * \@internal
     * @return {?}
     */
    AgmInfoWindow.prototype.id = /**
     * \@internal
     * @return {?}
     */
    function () { return this._id; };
    /** @internal */
    /**
     * \@internal
     * @return {?}
     */
    AgmInfoWindow.prototype.toString = /**
     * \@internal
     * @return {?}
     */
    function () { return 'AgmInfoWindow-' + this._id.toString(); };
    /** @internal */
    /**
     * \@internal
     * @return {?}
     */
    AgmInfoWindow.prototype.ngOnDestroy = /**
     * \@internal
     * @return {?}
     */
    function () { this._infoWindowManager.deleteInfoWindow(this); };
    AgmInfoWindow._infoWindowOptionsInputs = ['disableAutoPan', 'maxWidth'];
    AgmInfoWindow.decorators = [
        { type: Component, args: [{
                    selector: 'agm-info-window',
                    template: "<div class='agm-info-window-content'>\n      <ng-content></ng-content>\n    </div>\n  "
                }] }
    ];
    /** @nocollapse */
    AgmInfoWindow.ctorParameters = function () { return [
        { type: InfoWindowManager },
        { type: ElementRef }
    ]; };
    AgmInfoWindow.propDecorators = {
        latitude: [{ type: Input }],
        longitude: [{ type: Input }],
        disableAutoPan: [{ type: Input }],
        zIndex: [{ type: Input }],
        maxWidth: [{ type: Input }],
        isOpen: [{ type: Input }],
        infoWindowClose: [{ type: Output }]
    };
    return AgmInfoWindow;
}());
export { AgmInfoWindow };
if (false) {
    /** @type {?} */
    AgmInfoWindow._infoWindowOptionsInputs;
    /**
     * The latitude position of the info window (only usefull if you use it ouside of a {\@link
     * AgmMarker}).
     * @type {?}
     */
    AgmInfoWindow.prototype.latitude;
    /**
     * The longitude position of the info window (only usefull if you use it ouside of a {\@link
     * AgmMarker}).
     * @type {?}
     */
    AgmInfoWindow.prototype.longitude;
    /**
     * Disable auto-pan on open. By default, the info window will pan the map so that it is fully
     * visible when it opens.
     * @type {?}
     */
    AgmInfoWindow.prototype.disableAutoPan;
    /**
     * All InfoWindows are displayed on the map in order of their zIndex, with higher values
     * displaying in front of InfoWindows with lower values. By default, InfoWindows are displayed
     * according to their latitude, with InfoWindows of lower latitudes appearing in front of
     * InfoWindows at higher latitudes. InfoWindows are always displayed in front of markers.
     * @type {?}
     */
    AgmInfoWindow.prototype.zIndex;
    /**
     * Maximum width of the infowindow, regardless of content's width. This value is only considered
     * if it is set before a call to open. To change the maximum width when changing content, call
     * close, update maxWidth, and then open.
     * @type {?}
     */
    AgmInfoWindow.prototype.maxWidth;
    /**
     * Holds the marker that is the host of the info window (if available)
     * @type {?}
     */
    AgmInfoWindow.prototype.hostMarker;
    /**
     * Holds the native element that is used for the info window content.
     * @type {?}
     */
    AgmInfoWindow.prototype.content;
    /**
     * Sets the open state for the InfoWindow. You can also call the open() and close() methods.
     * @type {?}
     */
    AgmInfoWindow.prototype.isOpen;
    /**
     * Emits an event when the info window is closed.
     * @type {?}
     */
    AgmInfoWindow.prototype.infoWindowClose;
    /** @type {?} */
    AgmInfoWindow.prototype._infoWindowAddedToManager;
    /** @type {?} */
    AgmInfoWindow.prototype._id;
    /** @type {?} */
    AgmInfoWindow.prototype._infoWindowManager;
    /** @type {?} */
    AgmInfoWindow.prototype._el;
}
//# sourceMappingURL=info-window.js.map