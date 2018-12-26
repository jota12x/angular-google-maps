"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AgmSnazzyInfoWindow = void 0;

var _core = require("@angular/core");

var _core2 = require("@agm/core");

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var AgmSnazzyInfoWindow =
/** @class */
function () {
  function AgmSnazzyInfoWindow(_marker, _wrapper, _manager, _loader) {
    this._marker = _marker;
    this._wrapper = _wrapper;
    this._manager = _manager;
    this._loader = _loader;
    /**
     * Changes the open status of the snazzy info window.
     */

    this.isOpen = false;
    /**
     * Emits when the open status changes.
     */

    this.isOpenChange = new _core.EventEmitter();
    /**
     * Choose where you want the info window to be displayed, relative to the marker.
     */

    this.placement = 'top';
    /**
     * The max width in pixels of the info window.
     */

    this.maxWidth = 200;
    /**
     * The max height in pixels of the info window.
     */

    this.maxHeight = 200;
    /**
     * Determines if the info window will open when the marker is clicked.
     * An internal listener is added to the Google Maps click event which calls the open() method.
     */

    this.openOnMarkerClick = true;
    /**
     * Determines if the info window will close when the map is clicked. An internal listener is added to the Google Maps click event which calls the close() method.
     * This will not activate on the Google Maps drag event when the user is panning the map.
     */

    this.closeOnMapClick = true;
    /**
     * Determines if the info window will close when any other Snazzy Info Window is opened.
     */

    this.closeWhenOthersOpen = false;
    /**
     * Determines if the info window will show a close button.
     */

    this.showCloseButton = true;
    /**
     * Determines if the info window will be panned into view when opened.
     */

    this.panOnOpen = true;
    /**
     * Emits before the info window opens.
     */

    this.beforeOpen = new _core.EventEmitter();
    /**
     * Emits before the info window closes.
     */

    this.afterClose = new _core.EventEmitter();
    this._snazzyInfoWindowInitialized = null;
  }
  /**
   * @internal
   */

  /**
   * \@internal
   * @param {?} changes
   * @return {?}
   */


  AgmSnazzyInfoWindow.prototype.ngOnChanges =
  /**
  * \@internal
  * @param {?} changes
  * @return {?}
  */
  function (changes) {
    if (this._nativeSnazzyInfoWindow == null) {
      return;
    }

    if ('isOpen' in changes && this.isOpen) {
      this._openInfoWindow();
    } else if ('isOpen' in changes && !this.isOpen) {
      this._closeInfoWindow();
    }

    if (('latitude' in changes || 'longitude' in changes) && this._marker == null) {
      this._updatePosition();
    }
  };
  /**
   * @internal
   */

  /**
   * \@internal
   * @return {?}
   */


  AgmSnazzyInfoWindow.prototype.ngAfterViewInit =
  /**
  * \@internal
  * @return {?}
  */
  function () {
    var _this = this;
    /** @type {?} */


    var m = this._manager != null ? this._manager.getNativeMarker(this._marker) : null;
    this._snazzyInfoWindowInitialized = this._loader.load().then(function () {
      return require('snazzy-info-window');
    }).then(function (module) {
      return Promise.all([module, m, _this._wrapper.getNativeMap()]);
    }).then(function (elems) {
      /** @type {?} */
      var options = {
        map: elems[2],
        content: '',
        placement: _this.placement,
        maxWidth: _this.maxWidth,
        maxHeight: _this.maxHeight,
        backgroundColor: _this.backgroundColor,
        padding: _this.padding,
        border: _this.border,
        borderRadius: _this.borderRadius,
        fontColor: _this.fontColor,
        pointer: _this.pointer,
        shadow: _this.shadow,
        closeOnMapClick: _this.closeOnMapClick,
        openOnMarkerClick: _this.openOnMarkerClick,
        closeWhenOthersOpen: _this.closeWhenOthersOpen,
        showCloseButton: _this.showCloseButton,
        panOnOpen: _this.panOnOpen,
        wrapperClass: _this.wrapperClass,
        callbacks: {
          beforeOpen: function beforeOpen() {
            _this._createViewContent();

            _this.beforeOpen.emit();
          },
          afterOpen: function afterOpen() {
            _this.isOpenChange.emit(_this.openStatus());
          },
          afterClose: function afterClose() {
            _this.afterClose.emit();

            _this.isOpenChange.emit(_this.openStatus());
          }
        }
      };

      if (elems[1] != null) {
        options.marker = elems[1];
      } else {
        options.position = {
          lat: _this.latitude,
          lng: _this.longitude
        };
      }

      _this._nativeSnazzyInfoWindow = new elems[0](options);
    });

    this._snazzyInfoWindowInitialized.then(function () {
      if (_this.isOpen) {
        _this._openInfoWindow();
      }
    });
  };
  /**
   * @return {?}
   */


  AgmSnazzyInfoWindow.prototype._openInfoWindow =
  /**
  * @return {?}
  */
  function () {
    var _this = this;

    this._snazzyInfoWindowInitialized.then(function () {
      _this._createViewContent();

      _this._nativeSnazzyInfoWindow.open();
    });
  };
  /**
   * @return {?}
   */


  AgmSnazzyInfoWindow.prototype._closeInfoWindow =
  /**
  * @return {?}
  */
  function () {
    var _this = this;

    this._snazzyInfoWindowInitialized.then(function () {
      _this._nativeSnazzyInfoWindow.close();
    });
  };
  /**
   * @return {?}
   */


  AgmSnazzyInfoWindow.prototype._createViewContent =
  /**
  * @return {?}
  */
  function () {
    if (this._viewContainerRef.length === 1) {
      return;
    }
    /** @type {?} */


    var evr = this._viewContainerRef.createEmbeddedView(this._templateRef);

    this._nativeSnazzyInfoWindow.setContent(this._outerWrapper.nativeElement); // we have to run this in a separate cycle.


    setTimeout(function () {
      evr.detectChanges();
    });
  };
  /**
   * @return {?}
   */


  AgmSnazzyInfoWindow.prototype._updatePosition =
  /**
  * @return {?}
  */
  function () {
    this._nativeSnazzyInfoWindow.setPosition({
      lat: this.latitude,
      lng: this.longitude
    });
  };
  /**
   * Returns true when the Snazzy Info Window is initialized and open.
   */

  /**
   * Returns true when the Snazzy Info Window is initialized and open.
   * @return {?}
   */


  AgmSnazzyInfoWindow.prototype.openStatus =
  /**
  * Returns true when the Snazzy Info Window is initialized and open.
  * @return {?}
  */
  function () {
    return this._nativeSnazzyInfoWindow && this._nativeSnazzyInfoWindow.isOpen();
  };
  /**
   * @internal
   */

  /**
   * \@internal
   * @return {?}
   */


  AgmSnazzyInfoWindow.prototype.ngOnDestroy =
  /**
  * \@internal
  * @return {?}
  */
  function () {
    if (this._nativeSnazzyInfoWindow) {
      this._nativeSnazzyInfoWindow.destroy();
    }
  };

  AgmSnazzyInfoWindow.decorators = [{
    type: _core.Component,
    args: [{
      // tslint:disable-next-line:component-selector
      selector: 'agm-snazzy-info-window',
      template: '<div #outerWrapper><div #viewContainer></div></div><ng-content></ng-content>'
    }]
  }];
  /** @nocollapse */

  AgmSnazzyInfoWindow.ctorParameters = function () {
    return [{
      type: _core2.AgmMarker,
      decorators: [{
        type: _core.Optional
      }, {
        type: _core.Host
      }, {
        type: _core.SkipSelf
      }]
    }, {
      type: _core2.GoogleMapsAPIWrapper
    }, {
      type: _core2.MarkerManager
    }, {
      type: _core2.MapsAPILoader
    }];
  };

  AgmSnazzyInfoWindow.propDecorators = {
    latitude: [{
      type: _core.Input
    }],
    longitude: [{
      type: _core.Input
    }],
    isOpen: [{
      type: _core.Input
    }],
    isOpenChange: [{
      type: _core.Output
    }],
    placement: [{
      type: _core.Input
    }],
    maxWidth: [{
      type: _core.Input
    }],
    maxHeight: [{
      type: _core.Input
    }],
    backgroundColor: [{
      type: _core.Input
    }],
    padding: [{
      type: _core.Input
    }],
    border: [{
      type: _core.Input
    }],
    borderRadius: [{
      type: _core.Input
    }],
    fontColor: [{
      type: _core.Input
    }],
    fontSize: [{
      type: _core.Input
    }],
    pointer: [{
      type: _core.Input
    }],
    shadow: [{
      type: _core.Input
    }],
    openOnMarkerClick: [{
      type: _core.Input
    }],
    closeOnMapClick: [{
      type: _core.Input
    }],
    wrapperClass: [{
      type: _core.Input
    }],
    closeWhenOthersOpen: [{
      type: _core.Input
    }],
    showCloseButton: [{
      type: _core.Input
    }],
    panOnOpen: [{
      type: _core.Input
    }],
    beforeOpen: [{
      type: _core.Output
    }],
    afterClose: [{
      type: _core.Output
    }],
    _outerWrapper: [{
      type: _core.ViewChild,
      args: ['outerWrapper', {
        read: _core.ElementRef
      }]
    }],
    _viewContainerRef: [{
      type: _core.ViewChild,
      args: ['viewContainer', {
        read: _core.ViewContainerRef
      }]
    }],
    _templateRef: [{
      type: _core.ContentChild,
      args: [_core.TemplateRef]
    }]
  };
  return AgmSnazzyInfoWindow;
}();

exports.AgmSnazzyInfoWindow = AgmSnazzyInfoWindow;

if (false) {
  /**
   * The latitude and longitude where the info window is anchored.
   * The offset will default to 0px when using this option. Only required/used if you are not using a agm-marker.
   * @type {?}
   */
  AgmSnazzyInfoWindow.prototype.latitude;
  /**
   * The longitude where the info window is anchored.
   * The offset will default to 0px when using this option. Only required/used if you are not using a agm-marker.
   * @type {?}
   */

  AgmSnazzyInfoWindow.prototype.longitude;
  /**
   * Changes the open status of the snazzy info window.
   * @type {?}
   */

  AgmSnazzyInfoWindow.prototype.isOpen;
  /**
   * Emits when the open status changes.
   * @type {?}
   */

  AgmSnazzyInfoWindow.prototype.isOpenChange;
  /**
   * Choose where you want the info window to be displayed, relative to the marker.
   * @type {?}
   */

  AgmSnazzyInfoWindow.prototype.placement;
  /**
   * The max width in pixels of the info window.
   * @type {?}
   */

  AgmSnazzyInfoWindow.prototype.maxWidth;
  /**
   * The max height in pixels of the info window.
   * @type {?}
   */

  AgmSnazzyInfoWindow.prototype.maxHeight;
  /**
   * The color to use for the background of the info window.
   * @type {?}
   */

  AgmSnazzyInfoWindow.prototype.backgroundColor;
  /**
   * A custom padding size around the content of the info window.
   * @type {?}
   */

  AgmSnazzyInfoWindow.prototype.padding;
  /**
   * A custom border around the info window. Set to false to completely remove the border.
   * The units used for border should be the same as pointer.
   * @type {?}
   */

  AgmSnazzyInfoWindow.prototype.border;
  /**
   * A custom CSS border radius property to specify the rounded corners of the info window.
   * @type {?}
   */

  AgmSnazzyInfoWindow.prototype.borderRadius;
  /**
   * The font color to use for the content inside the body of the info window.
   * @type {?}
   */

  AgmSnazzyInfoWindow.prototype.fontColor;
  /**
   * The font size to use for the content inside the body of the info window.
   * @type {?}
   */

  AgmSnazzyInfoWindow.prototype.fontSize;
  /**
   * The height of the pointer from the info window to the marker.
   * Set to false to completely remove the pointer.
   * The units used for pointer should be the same as border.
   * @type {?}
   */

  AgmSnazzyInfoWindow.prototype.pointer;
  /**
   * The CSS properties for the shadow of the info window.
   * Set to false to completely remove the shadow.
   * @type {?}
   */

  AgmSnazzyInfoWindow.prototype.shadow;
  /**
   * Determines if the info window will open when the marker is clicked.
   * An internal listener is added to the Google Maps click event which calls the open() method.
   * @type {?}
   */

  AgmSnazzyInfoWindow.prototype.openOnMarkerClick;
  /**
   * Determines if the info window will close when the map is clicked. An internal listener is added to the Google Maps click event which calls the close() method.
   * This will not activate on the Google Maps drag event when the user is panning the map.
   * @type {?}
   */

  AgmSnazzyInfoWindow.prototype.closeOnMapClick;
  /**
   * An optional CSS class to assign to the wrapper container of the info window.
   * Can be used for applying custom CSS to the info window.
   * @type {?}
   */

  AgmSnazzyInfoWindow.prototype.wrapperClass;
  /**
   * Determines if the info window will close when any other Snazzy Info Window is opened.
   * @type {?}
   */

  AgmSnazzyInfoWindow.prototype.closeWhenOthersOpen;
  /**
   * Determines if the info window will show a close button.
   * @type {?}
   */

  AgmSnazzyInfoWindow.prototype.showCloseButton;
  /**
   * Determines if the info window will be panned into view when opened.
   * @type {?}
   */

  AgmSnazzyInfoWindow.prototype.panOnOpen;
  /**
   * Emits before the info window opens.
   * @type {?}
   */

  AgmSnazzyInfoWindow.prototype.beforeOpen;
  /**
   * Emits before the info window closes.
   * @type {?}
   */

  AgmSnazzyInfoWindow.prototype.afterClose;
  /**
   * \@internal
   * @type {?}
   */

  AgmSnazzyInfoWindow.prototype._outerWrapper;
  /**
   * \@internal
   * @type {?}
   */

  AgmSnazzyInfoWindow.prototype._viewContainerRef;
  /**
   * \@internal
   * @type {?}
   */

  AgmSnazzyInfoWindow.prototype._templateRef;
  /** @type {?} */

  AgmSnazzyInfoWindow.prototype._nativeSnazzyInfoWindow;
  /** @type {?} */

  AgmSnazzyInfoWindow.prototype._snazzyInfoWindowInitialized;
  /** @type {?} */

  AgmSnazzyInfoWindow.prototype._marker;
  /** @type {?} */

  AgmSnazzyInfoWindow.prototype._wrapper;
  /** @type {?} */

  AgmSnazzyInfoWindow.prototype._manager;
  /** @type {?} */

  AgmSnazzyInfoWindow.prototype._loader;
}