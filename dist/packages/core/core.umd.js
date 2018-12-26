(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs'), require('rxjs/operators')) :
    typeof define === 'function' && define.amd ? define(['exports', '@angular/core', 'rxjs', 'rxjs/operators'], factory) :
    (factory((global.ngmaps = global.ngmaps || {}, global.ngmaps.core = {}),global.ng.core,null,null));
}(this, (function (exports,core,rxjs,operators) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * @abstract
     */
    var MapsAPILoader = /** @class */ (function () {
        function MapsAPILoader() {
        }
        MapsAPILoader.decorators = [
            { type: core.Injectable }
        ];
        return MapsAPILoader;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Wrapper class that handles the communication with the Google Maps Javascript
     * API v3
     */
    var GoogleMapsAPIWrapper = /** @class */ (function () {
        function GoogleMapsAPIWrapper(_loader, _zone) {
            var _this = this;
            this._loader = _loader;
            this._zone = _zone;
            this._map =
                new Promise(function (resolve) { _this._mapResolver = resolve; });
        }
        /**
         * @param {?} el
         * @param {?} mapOptions
         * @return {?}
         */
        GoogleMapsAPIWrapper.prototype.createMap = /**
         * @param {?} el
         * @param {?} mapOptions
         * @return {?}
         */
        function (el, mapOptions) {
            var _this = this;
            return this._zone.runOutsideAngular(function () {
                return _this._loader.load().then(function () {
                    /** @type {?} */
                    var map = new google.maps.Map(el, mapOptions);
                    _this._mapResolver(/** @type {?} */ (map));
                    return;
                });
            });
        };
        /**
         * @param {?} options
         * @return {?}
         */
        GoogleMapsAPIWrapper.prototype.setMapOptions = /**
         * @param {?} options
         * @return {?}
         */
        function (options) {
            this._map.then(function (m) { m.setOptions(options); });
        };
        /**
         * Creates a google map marker with the map context
         */
        /**
         * Creates a google map marker with the map context
         * @param {?=} options
         * @param {?=} addToMap
         * @return {?}
         */
        GoogleMapsAPIWrapper.prototype.createMarker = /**
         * Creates a google map marker with the map context
         * @param {?=} options
         * @param {?=} addToMap
         * @return {?}
         */
        function (options, addToMap) {
            if (options === void 0) { options = /** @type {?} */ ({}); }
            if (addToMap === void 0) { addToMap = true; }
            return this._map.then(function (map) {
                if (addToMap) {
                    options.map = map;
                }
                return new google.maps.Marker(options);
            });
        };
        /**
         * @param {?=} options
         * @return {?}
         */
        GoogleMapsAPIWrapper.prototype.createInfoWindow = /**
         * @param {?=} options
         * @return {?}
         */
        function (options) {
            return this._map.then(function () { return new google.maps.InfoWindow(options); });
        };
        /**
         * Creates a google.map.Circle for the current map.
         */
        /**
         * Creates a google.map.Circle for the current map.
         * @param {?} options
         * @return {?}
         */
        GoogleMapsAPIWrapper.prototype.createCircle = /**
         * Creates a google.map.Circle for the current map.
         * @param {?} options
         * @return {?}
         */
        function (options) {
            return this._map.then(function (map) {
                options.map = map;
                return new google.maps.Circle(options);
            });
        };
        /**
         * Creates a google.map.Rectangle for the current map.
         */
        /**
         * Creates a google.map.Rectangle for the current map.
         * @param {?} options
         * @return {?}
         */
        GoogleMapsAPIWrapper.prototype.createRectangle = /**
         * Creates a google.map.Rectangle for the current map.
         * @param {?} options
         * @return {?}
         */
        function (options) {
            return this._map.then(function (map) {
                options.map = map;
                return new google.maps.Rectangle(options);
            });
        };
        /**
         * @param {?} options
         * @return {?}
         */
        GoogleMapsAPIWrapper.prototype.createPolyline = /**
         * @param {?} options
         * @return {?}
         */
        function (options) {
            return this.getNativeMap().then(function (map) {
                /** @type {?} */
                var line = new google.maps.Polyline(options);
                line.setMap(map);
                return line;
            });
        };
        /**
         * @param {?} options
         * @return {?}
         */
        GoogleMapsAPIWrapper.prototype.createPolygon = /**
         * @param {?} options
         * @return {?}
         */
        function (options) {
            return this.getNativeMap().then(function (map) {
                /** @type {?} */
                var polygon = new google.maps.Polygon(options);
                polygon.setMap(map);
                return polygon;
            });
        };
        /**
         * Creates a new google.map.Data layer for the current map
         */
        /**
         * Creates a new google.map.Data layer for the current map
         * @param {?=} options
         * @return {?}
         */
        GoogleMapsAPIWrapper.prototype.createDataLayer = /**
         * Creates a new google.map.Data layer for the current map
         * @param {?=} options
         * @return {?}
         */
        function (options) {
            return this._map.then(function (m) {
                /** @type {?} */
                var data = new google.maps.Data(options);
                data.setMap(m);
                return data;
            });
        };
        /**
         * Determines if given coordinates are insite a Polygon path.
         */
        /**
         * Determines if given coordinates are insite a Polygon path.
         * @param {?} latLng
         * @param {?} polygon
         * @return {?}
         */
        GoogleMapsAPIWrapper.prototype.containsLocation = /**
         * Determines if given coordinates are insite a Polygon path.
         * @param {?} latLng
         * @param {?} polygon
         * @return {?}
         */
        function (latLng, polygon) {
            return google.maps.geometry.poly.containsLocation(latLng, polygon);
        };
        /**
         * @template E
         * @param {?} eventName
         * @return {?}
         */
        GoogleMapsAPIWrapper.prototype.subscribeToMapEvent = /**
         * @template E
         * @param {?} eventName
         * @return {?}
         */
        function (eventName) {
            var _this = this;
            return new rxjs.Observable(function (observer) {
                _this._map.then(function (m) {
                    m.addListener(eventName, function (arg) { _this._zone.run(function () { return observer.next(arg); }); });
                });
            });
        };
        /**
         * @return {?}
         */
        GoogleMapsAPIWrapper.prototype.clearInstanceListeners = /**
         * @return {?}
         */
        function () {
            this._map.then(function (map) {
                google.maps.event.clearInstanceListeners(map);
            });
        };
        /**
         * @param {?} latLng
         * @return {?}
         */
        GoogleMapsAPIWrapper.prototype.setCenter = /**
         * @param {?} latLng
         * @return {?}
         */
        function (latLng) {
            return this._map.then(function (map) { return map.setCenter(latLng); });
        };
        /**
         * @return {?}
         */
        GoogleMapsAPIWrapper.prototype.getZoom = /**
         * @return {?}
         */
        function () { return this._map.then(function (map) { return map.getZoom(); }); };
        /**
         * @return {?}
         */
        GoogleMapsAPIWrapper.prototype.getBounds = /**
         * @return {?}
         */
        function () {
            return this._map.then(function (map) { return map.getBounds(); });
        };
        /**
         * @return {?}
         */
        GoogleMapsAPIWrapper.prototype.getMapTypeId = /**
         * @return {?}
         */
        function () {
            return this._map.then(function (map) { return map.getMapTypeId(); });
        };
        /**
         * @param {?} zoom
         * @return {?}
         */
        GoogleMapsAPIWrapper.prototype.setZoom = /**
         * @param {?} zoom
         * @return {?}
         */
        function (zoom) {
            return this._map.then(function (map) { return map.setZoom(zoom); });
        };
        /**
         * @return {?}
         */
        GoogleMapsAPIWrapper.prototype.getCenter = /**
         * @return {?}
         */
        function () {
            return this._map.then(function (map) { return map.getCenter(); });
        };
        /**
         * @param {?} latLng
         * @return {?}
         */
        GoogleMapsAPIWrapper.prototype.panTo = /**
         * @param {?} latLng
         * @return {?}
         */
        function (latLng) {
            return this._map.then(function (map) { return map.panTo(latLng); });
        };
        /**
         * @param {?} x
         * @param {?} y
         * @return {?}
         */
        GoogleMapsAPIWrapper.prototype.panBy = /**
         * @param {?} x
         * @param {?} y
         * @return {?}
         */
        function (x, y) {
            return this._map.then(function (map) { return map.panBy(x, y); });
        };
        /**
         * @param {?} latLng
         * @return {?}
         */
        GoogleMapsAPIWrapper.prototype.fitBounds = /**
         * @param {?} latLng
         * @return {?}
         */
        function (latLng) {
            return this._map.then(function (map) { return map.fitBounds(latLng); });
        };
        /**
         * @param {?} latLng
         * @return {?}
         */
        GoogleMapsAPIWrapper.prototype.panToBounds = /**
         * @param {?} latLng
         * @return {?}
         */
        function (latLng) {
            return this._map.then(function (map) { return map.panToBounds(latLng); });
        };
        /**
         * Returns the native Google Maps Map instance. Be careful when using this instance directly.
         */
        /**
         * Returns the native Google Maps Map instance. Be careful when using this instance directly.
         * @return {?}
         */
        GoogleMapsAPIWrapper.prototype.getNativeMap = /**
         * Returns the native Google Maps Map instance. Be careful when using this instance directly.
         * @return {?}
         */
        function () { return this._map; };
        /**
         * Triggers the given event name on the map instance.
         */
        /**
         * Triggers the given event name on the map instance.
         * @param {?} eventName
         * @return {?}
         */
        GoogleMapsAPIWrapper.prototype.triggerMapEvent = /**
         * Triggers the given event name on the map instance.
         * @param {?} eventName
         * @return {?}
         */
        function (eventName) {
            return this._map.then(function (m) { return google.maps.event.trigger(m, eventName); });
        };
        GoogleMapsAPIWrapper.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        GoogleMapsAPIWrapper.ctorParameters = function () { return [
            { type: MapsAPILoader },
            { type: core.NgZone }
        ]; };
        return GoogleMapsAPIWrapper;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var CircleManager = /** @class */ (function () {
        function CircleManager(_apiWrapper, _zone) {
            this._apiWrapper = _apiWrapper;
            this._zone = _zone;
            this._circles = new Map();
        }
        /**
         * @param {?} circle
         * @return {?}
         */
        CircleManager.prototype.addCircle = /**
         * @param {?} circle
         * @return {?}
         */
        function (circle) {
            this._circles.set(circle, this._apiWrapper.createCircle({
                center: { lat: circle.latitude, lng: circle.longitude },
                clickable: circle.clickable,
                draggable: circle.draggable,
                editable: circle.editable,
                fillColor: circle.fillColor,
                fillOpacity: circle.fillOpacity,
                radius: circle.radius,
                strokeColor: circle.strokeColor,
                strokeOpacity: circle.strokeOpacity,
                strokePosition: circle.strokePosition,
                strokeWeight: circle.strokeWeight,
                visible: circle.visible,
                zIndex: circle.zIndex
            }));
        };
        /**
         * Removes the given circle from the map.
         */
        /**
         * Removes the given circle from the map.
         * @param {?} circle
         * @return {?}
         */
        CircleManager.prototype.removeCircle = /**
         * Removes the given circle from the map.
         * @param {?} circle
         * @return {?}
         */
        function (circle) {
            var _this = this;
            return this._circles.get(circle).then(function (c) {
                c.setMap(null);
                _this._circles.delete(circle);
            });
        };
        /**
         * @param {?} circle
         * @param {?} options
         * @return {?}
         */
        CircleManager.prototype.setOptions = /**
         * @param {?} circle
         * @param {?} options
         * @return {?}
         */
        function (circle, options) {
            return this._circles.get(circle).then(function (c) { return c.setOptions(options); });
        };
        /**
         * @param {?} circle
         * @return {?}
         */
        CircleManager.prototype.getBounds = /**
         * @param {?} circle
         * @return {?}
         */
        function (circle) {
            return this._circles.get(circle).then(function (c) { return c.getBounds(); });
        };
        /**
         * @param {?} circle
         * @return {?}
         */
        CircleManager.prototype.getCenter = /**
         * @param {?} circle
         * @return {?}
         */
        function (circle) {
            return this._circles.get(circle).then(function (c) { return c.getCenter(); });
        };
        /**
         * @param {?} circle
         * @return {?}
         */
        CircleManager.prototype.getRadius = /**
         * @param {?} circle
         * @return {?}
         */
        function (circle) {
            return this._circles.get(circle).then(function (c) { return c.getRadius(); });
        };
        /**
         * @param {?} circle
         * @return {?}
         */
        CircleManager.prototype.setCenter = /**
         * @param {?} circle
         * @return {?}
         */
        function (circle) {
            return this._circles.get(circle).then(function (c) { return c.setCenter({ lat: circle.latitude, lng: circle.longitude }); });
        };
        /**
         * @param {?} circle
         * @return {?}
         */
        CircleManager.prototype.setEditable = /**
         * @param {?} circle
         * @return {?}
         */
        function (circle) {
            return this._circles.get(circle).then(function (c) { return c.setEditable(circle.editable); });
        };
        /**
         * @param {?} circle
         * @return {?}
         */
        CircleManager.prototype.setDraggable = /**
         * @param {?} circle
         * @return {?}
         */
        function (circle) {
            return this._circles.get(circle).then(function (c) { return c.setDraggable(circle.draggable); });
        };
        /**
         * @param {?} circle
         * @return {?}
         */
        CircleManager.prototype.setVisible = /**
         * @param {?} circle
         * @return {?}
         */
        function (circle) {
            return this._circles.get(circle).then(function (c) { return c.setVisible(circle.visible); });
        };
        /**
         * @param {?} circle
         * @return {?}
         */
        CircleManager.prototype.setRadius = /**
         * @param {?} circle
         * @return {?}
         */
        function (circle) {
            return this._circles.get(circle).then(function (c) { return c.setRadius(circle.radius); });
        };
        /**
         * @template T
         * @param {?} eventName
         * @param {?} circle
         * @return {?}
         */
        CircleManager.prototype.createEventObservable = /**
         * @template T
         * @param {?} eventName
         * @param {?} circle
         * @return {?}
         */
        function (eventName, circle) {
            var _this = this;
            return new rxjs.Observable(function (observer) {
                /** @type {?} */
                var listener = null;
                _this._circles.get(circle).then(function (c) {
                    listener = c.addListener(eventName, function (e) { return _this._zone.run(function () { return observer.next(e); }); });
                });
                return function () {
                    if (listener !== null) {
                        listener.remove();
                    }
                };
            });
        };
        CircleManager.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        CircleManager.ctorParameters = function () { return [
            { type: GoogleMapsAPIWrapper },
            { type: core.NgZone }
        ]; };
        return CircleManager;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var RectangleManager = /** @class */ (function () {
        function RectangleManager(_apiWrapper, _zone) {
            this._apiWrapper = _apiWrapper;
            this._zone = _zone;
            this._rectangles = new Map();
        }
        /**
         * @param {?} rectangle
         * @return {?}
         */
        RectangleManager.prototype.addRectangle = /**
         * @param {?} rectangle
         * @return {?}
         */
        function (rectangle) {
            this._rectangles.set(rectangle, this._apiWrapper.createRectangle({
                bounds: {
                    north: rectangle.north,
                    east: rectangle.east,
                    south: rectangle.south,
                    west: rectangle.west
                },
                clickable: rectangle.clickable,
                draggable: rectangle.draggable,
                editable: rectangle.editable,
                fillColor: rectangle.fillColor,
                fillOpacity: rectangle.fillOpacity,
                strokeColor: rectangle.strokeColor,
                strokeOpacity: rectangle.strokeOpacity,
                strokePosition: rectangle.strokePosition,
                strokeWeight: rectangle.strokeWeight,
                visible: rectangle.visible,
                zIndex: rectangle.zIndex
            }));
        };
        /**
         * Removes the given rectangle from the map.
         */
        /**
         * Removes the given rectangle from the map.
         * @param {?} rectangle
         * @return {?}
         */
        RectangleManager.prototype.removeRectangle = /**
         * Removes the given rectangle from the map.
         * @param {?} rectangle
         * @return {?}
         */
        function (rectangle) {
            var _this = this;
            return this._rectangles.get(rectangle).then(function (r) {
                r.setMap(null);
                _this._rectangles.delete(rectangle);
            });
        };
        /**
         * @param {?} rectangle
         * @param {?} options
         * @return {?}
         */
        RectangleManager.prototype.setOptions = /**
         * @param {?} rectangle
         * @param {?} options
         * @return {?}
         */
        function (rectangle, options) {
            return this._rectangles.get(rectangle).then(function (r) { return r.setOptions(options); });
        };
        /**
         * @param {?} rectangle
         * @return {?}
         */
        RectangleManager.prototype.getBounds = /**
         * @param {?} rectangle
         * @return {?}
         */
        function (rectangle) {
            return this._rectangles.get(rectangle).then(function (r) { return r.getBounds(); });
        };
        /**
         * @param {?} rectangle
         * @return {?}
         */
        RectangleManager.prototype.setBounds = /**
         * @param {?} rectangle
         * @return {?}
         */
        function (rectangle) {
            return this._rectangles.get(rectangle).then(function (r) {
                return r.setBounds({
                    north: rectangle.north,
                    east: rectangle.east,
                    south: rectangle.south,
                    west: rectangle.west
                });
            });
        };
        /**
         * @param {?} rectangle
         * @return {?}
         */
        RectangleManager.prototype.setEditable = /**
         * @param {?} rectangle
         * @return {?}
         */
        function (rectangle) {
            return this._rectangles.get(rectangle).then(function (r) {
                return r.setEditable(rectangle.editable);
            });
        };
        /**
         * @param {?} rectangle
         * @return {?}
         */
        RectangleManager.prototype.setDraggable = /**
         * @param {?} rectangle
         * @return {?}
         */
        function (rectangle) {
            return this._rectangles.get(rectangle).then(function (r) {
                return r.setDraggable(rectangle.draggable);
            });
        };
        /**
         * @param {?} rectangle
         * @return {?}
         */
        RectangleManager.prototype.setVisible = /**
         * @param {?} rectangle
         * @return {?}
         */
        function (rectangle) {
            return this._rectangles.get(rectangle).then(function (r) {
                return r.setVisible(rectangle.visible);
            });
        };
        /**
         * @template T
         * @param {?} eventName
         * @param {?} rectangle
         * @return {?}
         */
        RectangleManager.prototype.createEventObservable = /**
         * @template T
         * @param {?} eventName
         * @param {?} rectangle
         * @return {?}
         */
        function (eventName, rectangle) {
            var _this = this;
            return rxjs.Observable.create(function (observer) {
                /** @type {?} */
                var listener = null;
                _this._rectangles.get(rectangle).then(function (r) {
                    listener = r.addListener(eventName, function (e) { return _this._zone.run(function () { return observer.next(e); }); });
                });
                return function () {
                    if (listener !== null) {
                        listener.remove();
                    }
                };
            });
        };
        RectangleManager.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        RectangleManager.ctorParameters = function () { return [
            { type: GoogleMapsAPIWrapper },
            { type: core.NgZone }
        ]; };
        return RectangleManager;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
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
            return new rxjs.Observable(function (observer) {
                _this._markers.get(marker).then(function (m) {
                    m.addListener(eventName, function (e) { return _this._zone.run(function () { return observer.next(e); }); });
                });
            });
        };
        MarkerManager.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        MarkerManager.ctorParameters = function () { return [
            { type: GoogleMapsAPIWrapper },
            { type: core.NgZone }
        ]; };
        return MarkerManager;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var InfoWindowManager = /** @class */ (function () {
        function InfoWindowManager(_mapsWrapper, _zone, _markerManager) {
            this._mapsWrapper = _mapsWrapper;
            this._zone = _zone;
            this._markerManager = _markerManager;
            this._infoWindows = new Map();
        }
        /**
         * @param {?} infoWindow
         * @return {?}
         */
        InfoWindowManager.prototype.deleteInfoWindow = /**
         * @param {?} infoWindow
         * @return {?}
         */
        function (infoWindow) {
            var _this = this;
            /** @type {?} */
            var iWindow = this._infoWindows.get(infoWindow);
            if (iWindow == null) {
                // info window already deleted
                return Promise.resolve();
            }
            return iWindow.then(function (i) {
                return _this._zone.run(function () {
                    i.close();
                    _this._infoWindows.delete(infoWindow);
                });
            });
        };
        /**
         * @param {?} infoWindow
         * @return {?}
         */
        InfoWindowManager.prototype.setPosition = /**
         * @param {?} infoWindow
         * @return {?}
         */
        function (infoWindow) {
            return this._infoWindows.get(infoWindow).then(function (i) { return i.setPosition({
                lat: infoWindow.latitude,
                lng: infoWindow.longitude
            }); });
        };
        /**
         * @param {?} infoWindow
         * @return {?}
         */
        InfoWindowManager.prototype.setZIndex = /**
         * @param {?} infoWindow
         * @return {?}
         */
        function (infoWindow) {
            return this._infoWindows.get(infoWindow)
                .then(function (i) { return i.setZIndex(infoWindow.zIndex); });
        };
        /**
         * @param {?} infoWindow
         * @return {?}
         */
        InfoWindowManager.prototype.open = /**
         * @param {?} infoWindow
         * @return {?}
         */
        function (infoWindow) {
            var _this = this;
            return this._infoWindows.get(infoWindow).then(function (w) {
                if (infoWindow.hostMarker != null) {
                    return _this._markerManager.getNativeMarker(infoWindow.hostMarker).then(function (marker) {
                        return _this._mapsWrapper.getNativeMap().then(function (map) { return w.open(map, marker); });
                    });
                }
                return _this._mapsWrapper.getNativeMap().then(function (map) { return w.open(map); });
            });
        };
        /**
         * @param {?} infoWindow
         * @return {?}
         */
        InfoWindowManager.prototype.close = /**
         * @param {?} infoWindow
         * @return {?}
         */
        function (infoWindow) {
            return this._infoWindows.get(infoWindow).then(function (w) { return w.close(); });
        };
        /**
         * @param {?} infoWindow
         * @param {?} options
         * @return {?}
         */
        InfoWindowManager.prototype.setOptions = /**
         * @param {?} infoWindow
         * @param {?} options
         * @return {?}
         */
        function (infoWindow, options) {
            return this._infoWindows.get(infoWindow).then(function (i) { return i.setOptions(options); });
        };
        /**
         * @param {?} infoWindow
         * @return {?}
         */
        InfoWindowManager.prototype.addInfoWindow = /**
         * @param {?} infoWindow
         * @return {?}
         */
        function (infoWindow) {
            /** @type {?} */
            var options = {
                content: infoWindow.content,
                maxWidth: infoWindow.maxWidth,
                zIndex: infoWindow.zIndex,
                disableAutoPan: infoWindow.disableAutoPan
            };
            if (typeof infoWindow.latitude === 'number' && typeof infoWindow.longitude === 'number') {
                options.position = { lat: infoWindow.latitude, lng: infoWindow.longitude };
            }
            /** @type {?} */
            var infoWindowPromise = this._mapsWrapper.createInfoWindow(options);
            this._infoWindows.set(infoWindow, infoWindowPromise);
        };
        /**
         * Creates a Google Maps event listener for the given InfoWindow as an Observable
         */
        /**
         * Creates a Google Maps event listener for the given InfoWindow as an Observable
         * @template T
         * @param {?} eventName
         * @param {?} infoWindow
         * @return {?}
         */
        InfoWindowManager.prototype.createEventObservable = /**
         * Creates a Google Maps event listener for the given InfoWindow as an Observable
         * @template T
         * @param {?} eventName
         * @param {?} infoWindow
         * @return {?}
         */
        function (eventName, infoWindow) {
            var _this = this;
            return new rxjs.Observable(function (observer) {
                _this._infoWindows.get(infoWindow).then(function (i) {
                    i.addListener(eventName, function (e) { return _this._zone.run(function () { return observer.next(e); }); });
                });
            });
        };
        InfoWindowManager.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        InfoWindowManager.ctorParameters = function () { return [
            { type: GoogleMapsAPIWrapper },
            { type: core.NgZone },
            { type: MarkerManager }
        ]; };
        return InfoWindowManager;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var PolygonManager = /** @class */ (function () {
        function PolygonManager(_mapsWrapper, _zone) {
            this._mapsWrapper = _mapsWrapper;
            this._zone = _zone;
            this._polygons = new Map();
        }
        /**
         * @param {?} path
         * @return {?}
         */
        PolygonManager.prototype.addPolygon = /**
         * @param {?} path
         * @return {?}
         */
        function (path) {
            /** @type {?} */
            var polygonPromise = this._mapsWrapper.createPolygon({
                clickable: path.clickable,
                draggable: path.draggable,
                editable: path.editable,
                fillColor: path.fillColor,
                fillOpacity: path.fillOpacity,
                geodesic: path.geodesic,
                paths: path.paths,
                strokeColor: path.strokeColor,
                strokeOpacity: path.strokeOpacity,
                strokeWeight: path.strokeWeight,
                visible: path.visible,
                zIndex: path.zIndex,
            });
            this._polygons.set(path, polygonPromise);
        };
        /**
         * @param {?} polygon
         * @return {?}
         */
        PolygonManager.prototype.updatePolygon = /**
         * @param {?} polygon
         * @return {?}
         */
        function (polygon) {
            var _this = this;
            /** @type {?} */
            var m = this._polygons.get(polygon);
            if (m == null) {
                return Promise.resolve();
            }
            return m.then(function (l) { return _this._zone.run(function () { l.setPaths(polygon.paths); }); });
        };
        /**
         * @param {?} path
         * @param {?} options
         * @return {?}
         */
        PolygonManager.prototype.setPolygonOptions = /**
         * @param {?} path
         * @param {?} options
         * @return {?}
         */
        function (path, options) {
            return this._polygons.get(path).then(function (l) { l.setOptions(options); });
        };
        /**
         * @param {?} paths
         * @return {?}
         */
        PolygonManager.prototype.deletePolygon = /**
         * @param {?} paths
         * @return {?}
         */
        function (paths) {
            var _this = this;
            /** @type {?} */
            var m = this._polygons.get(paths);
            if (m == null) {
                return Promise.resolve();
            }
            return m.then(function (l) {
                return _this._zone.run(function () {
                    l.setMap(null);
                    _this._polygons.delete(paths);
                });
            });
        };
        /**
         * @template T
         * @param {?} eventName
         * @param {?} path
         * @return {?}
         */
        PolygonManager.prototype.createEventObservable = /**
         * @template T
         * @param {?} eventName
         * @param {?} path
         * @return {?}
         */
        function (eventName, path) {
            var _this = this;
            return new rxjs.Observable(function (observer) {
                _this._polygons.get(path).then(function (l) {
                    l.addListener(eventName, function (e) { return _this._zone.run(function () { return observer.next(e); }); });
                });
            });
        };
        PolygonManager.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        PolygonManager.ctorParameters = function () { return [
            { type: GoogleMapsAPIWrapper },
            { type: core.NgZone }
        ]; };
        return PolygonManager;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var PolylineManager = /** @class */ (function () {
        function PolylineManager(_mapsWrapper, _zone) {
            this._mapsWrapper = _mapsWrapper;
            this._zone = _zone;
            this._polylines = new Map();
        }
        /**
         * @param {?} line
         * @return {?}
         */
        PolylineManager._convertPoints = /**
         * @param {?} line
         * @return {?}
         */
        function (line) {
            /** @type {?} */
            var path = line._getPoints().map(function (point) {
                return /** @type {?} */ ({ lat: point.latitude, lng: point.longitude });
            });
            return path;
        };
        /**
         * @param {?} line
         * @return {?}
         */
        PolylineManager.prototype.addPolyline = /**
         * @param {?} line
         * @return {?}
         */
        function (line) {
            /** @type {?} */
            var path = PolylineManager._convertPoints(line);
            /** @type {?} */
            var polylinePromise = this._mapsWrapper.createPolyline({
                clickable: line.clickable,
                draggable: line.draggable,
                editable: line.editable,
                geodesic: line.geodesic,
                strokeColor: line.strokeColor,
                strokeOpacity: line.strokeOpacity,
                strokeWeight: line.strokeWeight,
                visible: line.visible,
                zIndex: line.zIndex,
                path: path
            });
            this._polylines.set(line, polylinePromise);
        };
        /**
         * @param {?} line
         * @return {?}
         */
        PolylineManager.prototype.updatePolylinePoints = /**
         * @param {?} line
         * @return {?}
         */
        function (line) {
            var _this = this;
            /** @type {?} */
            var path = PolylineManager._convertPoints(line);
            /** @type {?} */
            var m = this._polylines.get(line);
            if (m == null) {
                return Promise.resolve();
            }
            return m.then(function (l) { return _this._zone.run(function () { l.setPath(path); }); });
        };
        /**
         * @param {?} line
         * @param {?} options
         * @return {?}
         */
        PolylineManager.prototype.setPolylineOptions = /**
         * @param {?} line
         * @param {?} options
         * @return {?}
         */
        function (line, options) {
            return this._polylines.get(line).then(function (l) { l.setOptions(options); });
        };
        /**
         * @param {?} line
         * @return {?}
         */
        PolylineManager.prototype.deletePolyline = /**
         * @param {?} line
         * @return {?}
         */
        function (line) {
            var _this = this;
            /** @type {?} */
            var m = this._polylines.get(line);
            if (m == null) {
                return Promise.resolve();
            }
            return m.then(function (l) {
                return _this._zone.run(function () {
                    l.setMap(null);
                    _this._polylines.delete(line);
                });
            });
        };
        /**
         * @template T
         * @param {?} eventName
         * @param {?} line
         * @return {?}
         */
        PolylineManager.prototype.createEventObservable = /**
         * @template T
         * @param {?} eventName
         * @param {?} line
         * @return {?}
         */
        function (eventName, line) {
            var _this = this;
            return new rxjs.Observable(function (observer) {
                _this._polylines.get(line).then(function (l) {
                    l.addListener(eventName, function (e) { return _this._zone.run(function () { return observer.next(e); }); });
                });
            });
        };
        PolylineManager.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        PolylineManager.ctorParameters = function () { return [
            { type: GoogleMapsAPIWrapper },
            { type: core.NgZone }
        ]; };
        return PolylineManager;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
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
            return new rxjs.Observable(function (observer) {
                _this._layers.get(layer).then(function (m) {
                    m.addListener(eventName, function (e) { return _this._zone.run(function () { return observer.next(e); }); });
                });
            });
        };
        KmlLayerManager.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        KmlLayerManager.ctorParameters = function () { return [
            { type: GoogleMapsAPIWrapper },
            { type: core.NgZone }
        ]; };
        return KmlLayerManager;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Manages all Data Layers for a Google Map instance.
     */
    var DataLayerManager = /** @class */ (function () {
        function DataLayerManager(_wrapper, _zone) {
            this._wrapper = _wrapper;
            this._zone = _zone;
            this._layers = new Map();
        }
        /**
         * Adds a new Data Layer to the map.
         */
        /**
         * Adds a new Data Layer to the map.
         * @param {?} layer
         * @return {?}
         */
        DataLayerManager.prototype.addDataLayer = /**
         * Adds a new Data Layer to the map.
         * @param {?} layer
         * @return {?}
         */
        function (layer) {
            var _this = this;
            /** @type {?} */
            var newLayer = this._wrapper.createDataLayer(/** @type {?} */ ({
                style: layer.style
            }))
                .then(function (d) {
                if (layer.geoJson) {
                    _this.getDataFeatures(d, layer.geoJson).then(function (features) { return d.features = features; });
                }
                return d;
            });
            this._layers.set(layer, newLayer);
        };
        /**
         * @param {?} layer
         * @return {?}
         */
        DataLayerManager.prototype.deleteDataLayer = /**
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
         * @param {?} layer
         * @param {?} geoJson
         * @return {?}
         */
        DataLayerManager.prototype.updateGeoJson = /**
         * @param {?} layer
         * @param {?} geoJson
         * @return {?}
         */
        function (layer, geoJson) {
            var _this = this;
            this._layers.get(layer).then(function (l) {
                l.forEach(function (feature) {
                    l.remove(feature);
                    /** @type {?} */
                    var index = l.features.indexOf(feature, 0);
                    if (index > -1) {
                        l.features.splice(index, 1);
                    }
                });
                _this.getDataFeatures(l, geoJson).then(function (features) { return l.features = features; });
            });
        };
        /**
         * @param {?} layer
         * @param {?} options
         * @return {?}
         */
        DataLayerManager.prototype.setDataOptions = /**
         * @param {?} layer
         * @param {?} options
         * @return {?}
         */
        function (layer, options) {
            this._layers.get(layer).then(function (l) {
                l.setControlPosition(options.controlPosition);
                l.setControls(options.controls);
                l.setDrawingMode(options.drawingMode);
                l.setStyle(options.style);
            });
        };
        /**
         * Creates a Google Maps event listener for the given DataLayer as an Observable
         */
        /**
         * Creates a Google Maps event listener for the given DataLayer as an Observable
         * @template T
         * @param {?} eventName
         * @param {?} layer
         * @return {?}
         */
        DataLayerManager.prototype.createEventObservable = /**
         * Creates a Google Maps event listener for the given DataLayer as an Observable
         * @template T
         * @param {?} eventName
         * @param {?} layer
         * @return {?}
         */
        function (eventName, layer) {
            var _this = this;
            return new rxjs.Observable(function (observer) {
                _this._layers.get(layer).then(function (d) {
                    d.addListener(eventName, function (e) { return _this._zone.run(function () { return observer.next(e); }); });
                });
            });
        };
        /**
         * Extract features from a geoJson using google.maps Data Class
         * @param d : google.maps.Data class instance
         * @param geoJson : url or geojson object
         */
        /**
         * Extract features from a geoJson using google.maps Data Class
         * @param {?} d : google.maps.Data class instance
         * @param {?} geoJson : url or geojson object
         * @return {?}
         */
        DataLayerManager.prototype.getDataFeatures = /**
         * Extract features from a geoJson using google.maps Data Class
         * @param {?} d : google.maps.Data class instance
         * @param {?} geoJson : url or geojson object
         * @return {?}
         */
        function (d, geoJson) {
            return new Promise(function (resolve, reject) {
                if (typeof geoJson === 'object') {
                    try {
                        /** @type {?} */
                        var features = d.addGeoJson(geoJson);
                        resolve(features);
                    }
                    catch (e) {
                        reject(e);
                    }
                }
                else if (typeof geoJson === 'string') {
                    d.loadGeoJson(geoJson, null, resolve);
                }
                else {
                    reject("Impossible to extract features from geoJson: wrong argument type");
                }
            });
        };
        DataLayerManager.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        DataLayerManager.ctorParameters = function () { return [
            { type: GoogleMapsAPIWrapper },
            { type: core.NgZone }
        ]; };
        return DataLayerManager;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Class to implement when you what to be able to make it work with the auto fit bounds feature
     * of AGM.
     * @abstract
     */
    var  /**
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
     * The FitBoundsService is responsible for computing the bounds of the a single map.
     */
    var FitBoundsService = /** @class */ (function () {
        function FitBoundsService(loader) {
            var _this = this;
            this._boundsChangeSampleTime$ = new rxjs.BehaviorSubject(200);
            this._includeInBounds$ = new rxjs.BehaviorSubject(new Map());
            this.bounds$ = rxjs.from(loader.load()).pipe(operators.flatMap(function () { return _this._includeInBounds$; }), operators.sample(this._boundsChangeSampleTime$.pipe(operators.switchMap(function (time) { return rxjs.timer(0, time); }))), operators.map(function (includeInBounds) { return _this._generateBounds(includeInBounds); }), operators.shareReplay(1));
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
            { type: core.Injectable }
        ];
        /** @nocollapse */
        FitBoundsService.ctorParameters = function () { return [
            { type: MapsAPILoader }
        ]; };
        return FitBoundsService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * AgmMap renders a Google Map.
     * **Important note**: To be able see a map in the browser, you have to define a height for the
     * element `agm-map`.
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
     *    </agm-map>
     *  `
     * })
     * ```
     */
    var AgmMap = /** @class */ (function () {
        function AgmMap(_elem, _mapsWrapper, _fitBoundsService) {
            this._elem = _elem;
            this._mapsWrapper = _mapsWrapper;
            this._fitBoundsService = _fitBoundsService;
            /**
             * The longitude that defines the center of the map.
             */
            this.longitude = 0;
            /**
             * The latitude that defines the center of the map.
             */
            this.latitude = 0;
            /**
             * The zoom level of the map. The default zoom level is 8.
             */
            this.zoom = 8;
            /**
             * Enables/disables if map is draggable.
             */
            this.draggable = true;
            /**
             * Enables/disables zoom and center on double click. Enabled by default.
             */
            this.disableDoubleClickZoom = false;
            /**
             * Enables/disables all default UI of the Google map. Please note: When the map is created, this
             * value cannot get updated.
             */
            this.disableDefaultUI = false;
            /**
             * If false, disables scrollwheel zooming on the map. The scrollwheel is enabled by default.
             */
            this.scrollwheel = true;
            /**
             * If false, prevents the map from being controlled by the keyboard. Keyboard shortcuts are
             * enabled by default.
             */
            this.keyboardShortcuts = true;
            /**
             * The enabled/disabled state of the Zoom control.
             */
            this.zoomControl = true;
            /**
             * Styles to apply to each of the default map types. Note that for Satellite/Hybrid and Terrain
             * modes, these styles will only apply to labels and geometry.
             */
            this.styles = [];
            /**
             * When true and the latitude and/or longitude values changes, the Google Maps panTo method is
             * used to
             * center the map. See: https://developers.google.com/maps/documentation/javascript/reference#Map
             */
            this.usePanning = false;
            /**
             * The initial enabled/disabled state of the Street View Pegman control.
             * This control is part of the default UI, and should be set to false when displaying a map type
             * on which the Street View road overlay should not appear (e.g. a non-Earth map type).
             */
            this.streetViewControl = true;
            /**
             * Sets the viewport to contain the given bounds.
             * If this option to `true`, the bounds get automatically computed from all elements that use the {\@link AgmFitBounds} directive.
             */
            this.fitBounds = false;
            /**
             * The initial enabled/disabled state of the Scale control. This is disabled by default.
             */
            this.scaleControl = false;
            /**
             * The initial enabled/disabled state of the Map type control.
             */
            this.mapTypeControl = false;
            /**
             * The initial enabled/disabled state of the Pan control.
             */
            this.panControl = false;
            /**
             * The initial enabled/disabled state of the Rotate control.
             */
            this.rotateControl = false;
            /**
             * The initial enabled/disabled state of the Fullscreen control.
             */
            this.fullscreenControl = false;
            /**
             * The map mapTypeId. Defaults to 'roadmap'.
             */
            this.mapTypeId = 'roadmap';
            /**
             * When false, map icons are not clickable. A map icon represents a point of interest,
             * also known as a POI. By default map icons are clickable.
             */
            this.clickableIcons = true;
            /**
             * This setting controls how gestures on the map are handled.
             * Allowed values:
             * - 'cooperative' (Two-finger touch gestures pan and zoom the map. One-finger touch gestures are not handled by the map.)
             * - 'greedy'      (All touch gestures pan or zoom the map.)
             * - 'none'        (The map cannot be panned or zoomed by user gestures.)
             * - 'auto'        [default] (Gesture handling is either cooperative or greedy, depending on whether the page is scrollable or not.
             */
            this.gestureHandling = 'auto';
            this._observableSubscriptions = [];
            /**
             * This event emitter gets emitted when the user clicks on the map (but not when they click on a
             * marker or infoWindow).
             */
            this.mapClick = new core.EventEmitter();
            /**
             * This event emitter gets emitted when the user right-clicks on the map (but not when they click
             * on a marker or infoWindow).
             */
            this.mapRightClick = new core.EventEmitter();
            /**
             * This event emitter gets emitted when the user double-clicks on the map (but not when they click
             * on a marker or infoWindow).
             */
            this.mapDblClick = new core.EventEmitter();
            /**
             * This event emitter is fired when the map center changes.
             */
            this.centerChange = new core.EventEmitter();
            /**
             * This event is fired when the viewport bounds have changed.
             */
            this.boundsChange = new core.EventEmitter();
            /**
             * This event is fired when the mapTypeId property changes.
             */
            this.mapTypeIdChange = new core.EventEmitter();
            /**
             * This event is fired when the map becomes idle after panning or zooming.
             */
            this.idle = new core.EventEmitter();
            /**
             * This event is fired when the zoom level has changed.
             */
            this.zoomChange = new core.EventEmitter();
            /**
             * This event is fired when the google map is fully initialized.
             * You get the google.maps.Map instance as a result of this EventEmitter.
             */
            this.mapReady = new core.EventEmitter();
        }
        /** @internal */
        /**
         * \@internal
         * @return {?}
         */
        AgmMap.prototype.ngOnInit = /**
         * \@internal
         * @return {?}
         */
        function () {
            /** @type {?} */
            var container = this._elem.nativeElement.querySelector('.agm-map-container-inner');
            this._initMapInstance(container);
        };
        /**
         * @param {?} el
         * @return {?}
         */
        AgmMap.prototype._initMapInstance = /**
         * @param {?} el
         * @return {?}
         */
        function (el) {
            var _this = this;
            this._mapsWrapper.createMap(el, {
                center: { lat: this.latitude || 0, lng: this.longitude || 0 },
                zoom: this.zoom,
                minZoom: this.minZoom,
                maxZoom: this.maxZoom,
                disableDefaultUI: this.disableDefaultUI,
                disableDoubleClickZoom: this.disableDoubleClickZoom,
                scrollwheel: this.scrollwheel,
                backgroundColor: this.backgroundColor,
                draggable: this.draggable,
                draggableCursor: this.draggableCursor,
                draggingCursor: this.draggingCursor,
                keyboardShortcuts: this.keyboardShortcuts,
                styles: this.styles,
                zoomControl: this.zoomControl,
                zoomControlOptions: this.zoomControlOptions,
                streetViewControl: this.streetViewControl,
                streetViewControlOptions: this.streetViewControlOptions,
                scaleControl: this.scaleControl,
                scaleControlOptions: this.scaleControlOptions,
                mapTypeControl: this.mapTypeControl,
                mapTypeControlOptions: this.mapTypeControlOptions,
                panControl: this.panControl,
                panControlOptions: this.panControlOptions,
                rotateControl: this.rotateControl,
                rotateControlOptions: this.rotateControlOptions,
                fullscreenControl: this.fullscreenControl,
                fullscreenControlOptions: this.fullscreenControlOptions,
                mapTypeId: this.mapTypeId,
                clickableIcons: this.clickableIcons,
                gestureHandling: this.gestureHandling
            })
                .then(function () { return _this._mapsWrapper.getNativeMap(); })
                .then(function (map) { return _this.mapReady.emit(map); });
            // register event listeners
            this._handleMapCenterChange();
            this._handleMapZoomChange();
            this._handleMapMouseEvents();
            this._handleBoundsChange();
            this._handleMapTypeIdChange();
            this._handleIdleEvent();
        };
        /** @internal */
        /**
         * \@internal
         * @return {?}
         */
        AgmMap.prototype.ngOnDestroy = /**
         * \@internal
         * @return {?}
         */
        function () {
            // unsubscribe all registered observable subscriptions
            this._observableSubscriptions.forEach(function (s) { return s.unsubscribe(); });
            // remove all listeners from the map instance
            this._mapsWrapper.clearInstanceListeners();
            if (this._fitBoundsSubscription) {
                this._fitBoundsSubscription.unsubscribe();
            }
        };
        /* @internal */
        /**
         * @param {?} changes
         * @return {?}
         */
        AgmMap.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
        function (changes) {
            this._updateMapOptionsChanges(changes);
            this._updatePosition(changes);
        };
        /**
         * @param {?} changes
         * @return {?}
         */
        AgmMap.prototype._updateMapOptionsChanges = /**
         * @param {?} changes
         * @return {?}
         */
        function (changes) {
            /** @type {?} */
            var options = {};
            /** @type {?} */
            var optionKeys = Object.keys(changes).filter(function (k) { return AgmMap._mapOptionsAttributes.indexOf(k) !== -1; });
            optionKeys.forEach(function (k) { options[k] = changes[k].currentValue; });
            this._mapsWrapper.setMapOptions(options);
        };
        /**
         * Triggers a resize event on the google map instance.
         * When recenter is true, the of the google map gets called with the current lat/lng values or fitBounds value to recenter the map.
         * Returns a promise that gets resolved after the event was triggered.
         */
        /**
         * Triggers a resize event on the google map instance.
         * When recenter is true, the of the google map gets called with the current lat/lng values or fitBounds value to recenter the map.
         * Returns a promise that gets resolved after the event was triggered.
         * @param {?=} recenter
         * @return {?}
         */
        AgmMap.prototype.triggerResize = /**
         * Triggers a resize event on the google map instance.
         * When recenter is true, the of the google map gets called with the current lat/lng values or fitBounds value to recenter the map.
         * Returns a promise that gets resolved after the event was triggered.
         * @param {?=} recenter
         * @return {?}
         */
        function (recenter) {
            var _this = this;
            if (recenter === void 0) { recenter = true; }
            // Note: When we would trigger the resize event and show the map in the same turn (which is a
            // common case for triggering a resize event), then the resize event would not
            // work (to show the map), so we trigger the event in a timeout.
            return new Promise(function (resolve) {
                setTimeout(function () {
                    return _this._mapsWrapper.triggerMapEvent('resize').then(function () {
                        if (recenter) {
                            _this.fitBounds != null ? _this._fitBounds() : _this._setCenter();
                        }
                        resolve();
                    });
                });
            });
        };
        /**
         * @param {?} changes
         * @return {?}
         */
        AgmMap.prototype._updatePosition = /**
         * @param {?} changes
         * @return {?}
         */
        function (changes) {
            if (changes['latitude'] == null && changes['longitude'] == null &&
                !changes['fitBounds']) {
                // no position update needed
                return;
            }
            // we prefer fitBounds in changes
            if ('fitBounds' in changes) {
                this._fitBounds();
                return;
            }
            if (typeof this.latitude !== 'number' || typeof this.longitude !== 'number') {
                return;
            }
            this._setCenter();
        };
        /**
         * @return {?}
         */
        AgmMap.prototype._setCenter = /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var newCenter = {
                lat: this.latitude,
                lng: this.longitude,
            };
            if (this.usePanning) {
                this._mapsWrapper.panTo(newCenter);
            }
            else {
                this._mapsWrapper.setCenter(newCenter);
            }
        };
        /**
         * @return {?}
         */
        AgmMap.prototype._fitBounds = /**
         * @return {?}
         */
        function () {
            switch (this.fitBounds) {
                case true:
                    this._subscribeToFitBoundsUpdates();
                    break;
                case false:
                    if (this._fitBoundsSubscription) {
                        this._fitBoundsSubscription.unsubscribe();
                    }
                    break;
                default:
                    this._updateBounds(this.fitBounds);
            }
        };
        /**
         * @return {?}
         */
        AgmMap.prototype._subscribeToFitBoundsUpdates = /**
         * @return {?}
         */
        function () {
            var _this = this;
            this._fitBoundsSubscription = this._fitBoundsService.getBounds$().subscribe(function (b) { return _this._updateBounds(b); });
        };
        /**
         * @param {?} bounds
         * @return {?}
         */
        AgmMap.prototype._updateBounds = /**
         * @param {?} bounds
         * @return {?}
         */
        function (bounds) {
            if (this._isLatLngBoundsLiteral(bounds) && google && google.maps) {
                /** @type {?} */
                var newBounds = new google.maps.LatLngBounds();
                newBounds.union(bounds);
                bounds = newBounds;
            }
            if (this.usePanning) {
                this._mapsWrapper.panToBounds(bounds);
                return;
            }
            this._mapsWrapper.fitBounds(bounds);
        };
        /**
         * @param {?} bounds
         * @return {?}
         */
        AgmMap.prototype._isLatLngBoundsLiteral = /**
         * @param {?} bounds
         * @return {?}
         */
        function (bounds) {
            return bounds != null && (/** @type {?} */ (bounds)).extend === undefined;
        };
        /**
         * @return {?}
         */
        AgmMap.prototype._handleMapCenterChange = /**
         * @return {?}
         */
        function () {
            var _this = this;
            /** @type {?} */
            var s = this._mapsWrapper.subscribeToMapEvent('center_changed').subscribe(function () {
                _this._mapsWrapper.getCenter().then(function (center) {
                    _this.latitude = center.lat();
                    _this.longitude = center.lng();
                    _this.centerChange.emit(/** @type {?} */ ({ lat: _this.latitude, lng: _this.longitude }));
                });
            });
            this._observableSubscriptions.push(s);
        };
        /**
         * @return {?}
         */
        AgmMap.prototype._handleBoundsChange = /**
         * @return {?}
         */
        function () {
            var _this = this;
            /** @type {?} */
            var s = this._mapsWrapper.subscribeToMapEvent('bounds_changed').subscribe(function () {
                _this._mapsWrapper.getBounds().then(function (bounds) { _this.boundsChange.emit(bounds); });
            });
            this._observableSubscriptions.push(s);
        };
        /**
         * @return {?}
         */
        AgmMap.prototype._handleMapTypeIdChange = /**
         * @return {?}
         */
        function () {
            var _this = this;
            /** @type {?} */
            var s = this._mapsWrapper.subscribeToMapEvent('maptypeid_changed').subscribe(function () {
                _this._mapsWrapper.getMapTypeId().then(function (mapTypeId) { _this.mapTypeIdChange.emit(mapTypeId); });
            });
            this._observableSubscriptions.push(s);
        };
        /**
         * @return {?}
         */
        AgmMap.prototype._handleMapZoomChange = /**
         * @return {?}
         */
        function () {
            var _this = this;
            /** @type {?} */
            var s = this._mapsWrapper.subscribeToMapEvent('zoom_changed').subscribe(function () {
                _this._mapsWrapper.getZoom().then(function (z) {
                    _this.zoom = z;
                    _this.zoomChange.emit(z);
                });
            });
            this._observableSubscriptions.push(s);
        };
        /**
         * @return {?}
         */
        AgmMap.prototype._handleIdleEvent = /**
         * @return {?}
         */
        function () {
            var _this = this;
            /** @type {?} */
            var s = this._mapsWrapper.subscribeToMapEvent('idle').subscribe(function () { _this.idle.emit(void 0); });
            this._observableSubscriptions.push(s);
        };
        /**
         * @return {?}
         */
        AgmMap.prototype._handleMapMouseEvents = /**
         * @return {?}
         */
        function () {
            var _this = this;
            /** @type {?} */
            var events = [
                { name: 'click', emitter: this.mapClick },
                { name: 'rightclick', emitter: this.mapRightClick },
                { name: 'dblclick', emitter: this.mapDblClick },
            ];
            events.forEach(function (e) {
                /** @type {?} */
                var s = _this._mapsWrapper.subscribeToMapEvent(e.name).subscribe(function (event) {
                    /** @type {?} */
                    var value = /** @type {?} */ ({ coords: { lat: event.latLng.lat(), lng: event.latLng.lng() } });
                    e.emitter.emit(value);
                });
                _this._observableSubscriptions.push(s);
            });
        };
        /**
         * Map option attributes that can change over time
         */
        AgmMap._mapOptionsAttributes = [
            'disableDoubleClickZoom', 'scrollwheel', 'draggable', 'draggableCursor', 'draggingCursor',
            'keyboardShortcuts', 'zoomControl', 'zoomControlOptions', 'styles', 'streetViewControl',
            'streetViewControlOptions', 'zoom', 'mapTypeControl', 'mapTypeControlOptions', 'minZoom',
            'maxZoom', 'panControl', 'panControlOptions', 'rotateControl', 'rotateControlOptions',
            'fullscreenControl', 'fullscreenControlOptions', 'scaleControl', 'scaleControlOptions',
            'mapTypeId', 'clickableIcons', 'gestureHandling'
        ];
        AgmMap.decorators = [
            { type: core.Component, args: [{
                        selector: 'agm-map',
                        providers: [
                            GoogleMapsAPIWrapper, MarkerManager, InfoWindowManager, CircleManager, RectangleManager,
                            PolylineManager, PolygonManager, KmlLayerManager, DataLayerManager, DataLayerManager,
                            FitBoundsService
                        ],
                        host: {
                            // todo: deprecated - we will remove it with the next version
                            '[class.sebm-google-map-container]': 'true'
                        },
                        template: "\n    <div class='agm-map-container-inner sebm-google-map-container-inner'></div>\n    <div class='agm-map-content'>\n      <ng-content></ng-content>\n    </div>\n  ",
                        styles: ["\n    .agm-map-container-inner {\n      width: inherit;\n      height: inherit;\n    }\n    .agm-map-content {\n      display:none;\n    }\n  "]
                    }] }
        ];
        /** @nocollapse */
        AgmMap.ctorParameters = function () { return [
            { type: core.ElementRef },
            { type: GoogleMapsAPIWrapper },
            { type: FitBoundsService }
        ]; };
        AgmMap.propDecorators = {
            longitude: [{ type: core.Input }],
            latitude: [{ type: core.Input }],
            zoom: [{ type: core.Input }],
            minZoom: [{ type: core.Input }],
            maxZoom: [{ type: core.Input }],
            draggable: [{ type: core.Input, args: ['mapDraggable',] }],
            disableDoubleClickZoom: [{ type: core.Input }],
            disableDefaultUI: [{ type: core.Input }],
            scrollwheel: [{ type: core.Input }],
            backgroundColor: [{ type: core.Input }],
            draggableCursor: [{ type: core.Input }],
            draggingCursor: [{ type: core.Input }],
            keyboardShortcuts: [{ type: core.Input }],
            zoomControl: [{ type: core.Input }],
            zoomControlOptions: [{ type: core.Input }],
            styles: [{ type: core.Input }],
            usePanning: [{ type: core.Input }],
            streetViewControl: [{ type: core.Input }],
            streetViewControlOptions: [{ type: core.Input }],
            fitBounds: [{ type: core.Input }],
            scaleControl: [{ type: core.Input }],
            scaleControlOptions: [{ type: core.Input }],
            mapTypeControl: [{ type: core.Input }],
            mapTypeControlOptions: [{ type: core.Input }],
            panControl: [{ type: core.Input }],
            panControlOptions: [{ type: core.Input }],
            rotateControl: [{ type: core.Input }],
            rotateControlOptions: [{ type: core.Input }],
            fullscreenControl: [{ type: core.Input }],
            fullscreenControlOptions: [{ type: core.Input }],
            mapTypeId: [{ type: core.Input }],
            clickableIcons: [{ type: core.Input }],
            gestureHandling: [{ type: core.Input }],
            mapClick: [{ type: core.Output }],
            mapRightClick: [{ type: core.Output }],
            mapDblClick: [{ type: core.Output }],
            centerChange: [{ type: core.Output }],
            boundsChange: [{ type: core.Output }],
            mapTypeIdChange: [{ type: core.Output }],
            idle: [{ type: core.Output }],
            zoomChange: [{ type: core.Output }],
            mapReady: [{ type: core.Output }]
        };
        return AgmMap;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var AgmCircle = /** @class */ (function () {
        function AgmCircle(_manager) {
            this._manager = _manager;
            /**
             * Indicates whether this Circle handles mouse events. Defaults to true.
             */
            this.clickable = true;
            /**
             * If set to true, the user can drag this circle over the map. Defaults to false.
             */
            this.draggable = false;
            /**
             * If set to true, the user can edit this circle by dragging the control points shown at
             * the center and around the circumference of the circle. Defaults to false.
             */
            this.editable = false;
            /**
             * The radius in meters on the Earth's surface.
             */
            this.radius = 0;
            /**
             * The stroke position. Defaults to CENTER.
             * This property is not supported on Internet Explorer 8 and earlier.
             */
            this.strokePosition = 'CENTER';
            /**
             * The stroke width in pixels.
             */
            this.strokeWeight = 0;
            /**
             * Whether this circle is visible on the map. Defaults to true.
             */
            this.visible = true;
            /**
             * This event is fired when the circle's center is changed.
             */
            this.centerChange = new core.EventEmitter();
            /**
             * This event emitter gets emitted when the user clicks on the circle.
             */
            this.circleClick = new core.EventEmitter();
            /**
             * This event emitter gets emitted when the user clicks on the circle.
             */
            this.circleDblClick = new core.EventEmitter();
            /**
             * This event is repeatedly fired while the user drags the circle.
             */
            this.drag = new core.EventEmitter();
            /**
             * This event is fired when the user stops dragging the circle.
             */
            this.dragEnd = new core.EventEmitter();
            /**
             * This event is fired when the user starts dragging the circle.
             */
            this.dragStart = new core.EventEmitter();
            /**
             * This event is fired when the DOM mousedown event is fired on the circle.
             */
            this.mouseDown = new core.EventEmitter();
            /**
             * This event is fired when the DOM mousemove event is fired on the circle.
             */
            this.mouseMove = new core.EventEmitter();
            /**
             * This event is fired on circle mouseout.
             */
            this.mouseOut = new core.EventEmitter();
            /**
             * This event is fired on circle mouseover.
             */
            this.mouseOver = new core.EventEmitter();
            /**
             * This event is fired when the DOM mouseup event is fired on the circle.
             */
            this.mouseUp = new core.EventEmitter();
            /**
             * This event is fired when the circle's radius is changed.
             */
            this.radiusChange = new core.EventEmitter();
            /**
             * This event is fired when the circle is right-clicked on.
             */
            this.rightClick = new core.EventEmitter();
            this._circleAddedToManager = false;
            this._eventSubscriptions = [];
        }
        /** @internal */
        /**
         * \@internal
         * @return {?}
         */
        AgmCircle.prototype.ngOnInit = /**
         * \@internal
         * @return {?}
         */
        function () {
            this._manager.addCircle(this);
            this._circleAddedToManager = true;
            this._registerEventListeners();
        };
        /** @internal */
        /**
         * \@internal
         * @param {?} changes
         * @return {?}
         */
        AgmCircle.prototype.ngOnChanges = /**
         * \@internal
         * @param {?} changes
         * @return {?}
         */
        function (changes) {
            if (!this._circleAddedToManager) {
                return;
            }
            if (changes['latitude'] || changes['longitude']) {
                this._manager.setCenter(this);
            }
            if (changes['editable']) {
                this._manager.setEditable(this);
            }
            if (changes['draggable']) {
                this._manager.setDraggable(this);
            }
            if (changes['visible']) {
                this._manager.setVisible(this);
            }
            if (changes['radius']) {
                this._manager.setRadius(this);
            }
            this._updateCircleOptionsChanges(changes);
        };
        /**
         * @param {?} changes
         * @return {?}
         */
        AgmCircle.prototype._updateCircleOptionsChanges = /**
         * @param {?} changes
         * @return {?}
         */
        function (changes) {
            /** @type {?} */
            var options = {};
            /** @type {?} */
            var optionKeys = Object.keys(changes).filter(function (k) { return AgmCircle._mapOptions.indexOf(k) !== -1; });
            optionKeys.forEach(function (k) { options[k] = changes[k].currentValue; });
            if (optionKeys.length > 0) {
                this._manager.setOptions(this, options);
            }
        };
        /**
         * @return {?}
         */
        AgmCircle.prototype._registerEventListeners = /**
         * @return {?}
         */
        function () {
            var _this = this;
            /** @type {?} */
            var events = new Map();
            events.set('center_changed', this.centerChange);
            events.set('click', this.circleClick);
            events.set('dblclick', this.circleDblClick);
            events.set('drag', this.drag);
            events.set('dragend', this.dragEnd);
            events.set('dragStart', this.dragStart);
            events.set('mousedown', this.mouseDown);
            events.set('mousemove', this.mouseMove);
            events.set('mouseout', this.mouseOut);
            events.set('mouseover', this.mouseOver);
            events.set('mouseup', this.mouseUp);
            events.set('radius_changed', this.radiusChange);
            events.set('rightclick', this.rightClick);
            events.forEach(function (eventEmitter, eventName) {
                _this._eventSubscriptions.push(_this._manager.createEventObservable(eventName, _this).subscribe(function (value) {
                    switch (eventName) {
                        case 'radius_changed':
                            _this._manager.getRadius(_this).then(function (radius) { return eventEmitter.emit(radius); });
                            break;
                        case 'center_changed':
                            _this._manager.getCenter(_this).then(function (center) {
                                return eventEmitter.emit(/** @type {?} */ ({ lat: center.lat(), lng: center.lng() }));
                            });
                            break;
                        default:
                            eventEmitter.emit(/** @type {?} */ ({ coords: { lat: value.latLng.lat(), lng: value.latLng.lng() } }));
                    }
                }));
            });
        };
        /** @internal */
        /**
         * \@internal
         * @return {?}
         */
        AgmCircle.prototype.ngOnDestroy = /**
         * \@internal
         * @return {?}
         */
        function () {
            this._eventSubscriptions.forEach(function (s) { s.unsubscribe(); });
            this._eventSubscriptions = null;
            this._manager.removeCircle(this);
        };
        /**
         * Gets the LatLngBounds of this Circle.
         */
        /**
         * Gets the LatLngBounds of this Circle.
         * @return {?}
         */
        AgmCircle.prototype.getBounds = /**
         * Gets the LatLngBounds of this Circle.
         * @return {?}
         */
        function () { return this._manager.getBounds(this); };
        /**
         * @return {?}
         */
        AgmCircle.prototype.getCenter = /**
         * @return {?}
         */
        function () { return this._manager.getCenter(this); };
        AgmCircle._mapOptions = [
            'fillColor', 'fillOpacity', 'strokeColor', 'strokeOpacity', 'strokePosition', 'strokeWeight',
            'visible', 'zIndex', 'clickable'
        ];
        AgmCircle.decorators = [
            { type: core.Directive, args: [{
                        selector: 'agm-circle'
                    },] }
        ];
        /** @nocollapse */
        AgmCircle.ctorParameters = function () { return [
            { type: CircleManager }
        ]; };
        AgmCircle.propDecorators = {
            latitude: [{ type: core.Input }],
            longitude: [{ type: core.Input }],
            clickable: [{ type: core.Input }],
            draggable: [{ type: core.Input, args: ['circleDraggable',] }],
            editable: [{ type: core.Input }],
            fillColor: [{ type: core.Input }],
            fillOpacity: [{ type: core.Input }],
            radius: [{ type: core.Input }],
            strokeColor: [{ type: core.Input }],
            strokeOpacity: [{ type: core.Input }],
            strokePosition: [{ type: core.Input }],
            strokeWeight: [{ type: core.Input }],
            visible: [{ type: core.Input }],
            zIndex: [{ type: core.Input }],
            centerChange: [{ type: core.Output }],
            circleClick: [{ type: core.Output }],
            circleDblClick: [{ type: core.Output }],
            drag: [{ type: core.Output }],
            dragEnd: [{ type: core.Output }],
            dragStart: [{ type: core.Output }],
            mouseDown: [{ type: core.Output }],
            mouseMove: [{ type: core.Output }],
            mouseOut: [{ type: core.Output }],
            mouseOver: [{ type: core.Output }],
            mouseUp: [{ type: core.Output }],
            radiusChange: [{ type: core.Output }],
            rightClick: [{ type: core.Output }]
        };
        return AgmCircle;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var AgmRectangle = /** @class */ (function () {
        function AgmRectangle(_manager) {
            this._manager = _manager;
            /**
             * Indicates whether this Rectangle handles mouse events. Defaults to true.
             */
            this.clickable = true;
            /**
             * If set to true, the user can drag this rectangle over the map. Defaults to false.
             */
            this.draggable = false;
            /**
             * If set to true, the user can edit this rectangle by dragging the control points shown at
             * the center and around the circumference of the rectangle. Defaults to false.
             */
            this.editable = false;
            /**
             * The stroke position. Defaults to CENTER.
             * This property is not supported on Internet Explorer 8 and earlier.
             */
            this.strokePosition = 'CENTER';
            /**
             * The stroke width in pixels.
             */
            this.strokeWeight = 0;
            /**
             * Whether this rectangle is visible on the map. Defaults to true.
             */
            this.visible = true;
            /**
             * This event is fired when the rectangle's is changed.
             */
            this.boundsChange = new core.EventEmitter();
            /**
             * This event emitter gets emitted when the user clicks on the rectangle.
             */
            this.rectangleClick = new core.EventEmitter();
            /**
             * This event emitter gets emitted when the user clicks on the rectangle.
             */
            this.rectangleDblClick = new core.EventEmitter();
            /**
             * This event is repeatedly fired while the user drags the rectangle.
             */
            this.drag = new core.EventEmitter();
            /**
             * This event is fired when the user stops dragging the rectangle.
             */
            this.dragEnd = new core.EventEmitter();
            /**
             * This event is fired when the user starts dragging the rectangle.
             */
            this.dragStart = new core.EventEmitter();
            /**
             * This event is fired when the DOM mousedown event is fired on the rectangle.
             */
            this.mouseDown = new core.EventEmitter();
            /**
             * This event is fired when the DOM mousemove event is fired on the rectangle.
             */
            this.mouseMove = new core.EventEmitter();
            /**
             * This event is fired on rectangle mouseout.
             */
            this.mouseOut = new core.EventEmitter();
            /**
             * This event is fired on rectangle mouseover.
             */
            this.mouseOver = new core.EventEmitter();
            /**
             * This event is fired when the DOM mouseup event is fired on the rectangle.
             */
            this.mouseUp = new core.EventEmitter();
            /**
             * This event is fired when the rectangle is right-clicked on.
             */
            this.rightClick = new core.EventEmitter();
            this._rectangleAddedToManager = false;
            this._eventSubscriptions = [];
        }
        /** @internal */
        /**
         * \@internal
         * @return {?}
         */
        AgmRectangle.prototype.ngOnInit = /**
         * \@internal
         * @return {?}
         */
        function () {
            this._manager.addRectangle(this);
            this._rectangleAddedToManager = true;
            this._registerEventListeners();
        };
        /** @internal */
        /**
         * \@internal
         * @param {?} changes
         * @return {?}
         */
        AgmRectangle.prototype.ngOnChanges = /**
         * \@internal
         * @param {?} changes
         * @return {?}
         */
        function (changes) {
            if (!this._rectangleAddedToManager) {
                return;
            }
            if (changes['north'] ||
                changes['east'] ||
                changes['south'] ||
                changes['west']) {
                this._manager.setBounds(this);
            }
            if (changes['editable']) {
                this._manager.setEditable(this);
            }
            if (changes['draggable']) {
                this._manager.setDraggable(this);
            }
            if (changes['visible']) {
                this._manager.setVisible(this);
            }
            this._updateRectangleOptionsChanges(changes);
        };
        /**
         * @param {?} changes
         * @return {?}
         */
        AgmRectangle.prototype._updateRectangleOptionsChanges = /**
         * @param {?} changes
         * @return {?}
         */
        function (changes) {
            /** @type {?} */
            var options = {};
            /** @type {?} */
            var optionKeys = Object.keys(changes).filter(function (k) { return AgmRectangle._mapOptions.indexOf(k) !== -1; });
            optionKeys.forEach(function (k) {
                options[k] = changes[k].currentValue;
            });
            if (optionKeys.length > 0) {
                this._manager.setOptions(this, options);
            }
        };
        /**
         * @return {?}
         */
        AgmRectangle.prototype._registerEventListeners = /**
         * @return {?}
         */
        function () {
            var _this = this;
            /** @type {?} */
            var events = new Map();
            events.set('bounds_changed', this.boundsChange);
            events.set('click', this.rectangleClick);
            events.set('dblclick', this.rectangleDblClick);
            events.set('drag', this.drag);
            events.set('dragend', this.dragEnd);
            events.set('dragStart', this.dragStart);
            events.set('mousedown', this.mouseDown);
            events.set('mousemove', this.mouseMove);
            events.set('mouseout', this.mouseOut);
            events.set('mouseover', this.mouseOver);
            events.set('mouseup', this.mouseUp);
            events.set('rightclick', this.rightClick);
            events.forEach(function (eventEmitter, eventName) {
                _this._eventSubscriptions.push(_this._manager
                    .createEventObservable(eventName, _this)
                    .subscribe(function (value) {
                    switch (eventName) {
                        case 'bounds_changed':
                            _this._manager.getBounds(_this).then(function (bounds) {
                                return eventEmitter.emit(/** @type {?} */ ({
                                    north: bounds.getNorthEast().lat(),
                                    east: bounds.getNorthEast().lng(),
                                    south: bounds.getSouthWest().lat(),
                                    west: bounds.getSouthWest().lng()
                                }));
                            });
                            break;
                        default:
                            eventEmitter.emit(/** @type {?} */ ({
                                coords: { lat: value.latLng.lat(), lng: value.latLng.lng() }
                            }));
                    }
                }));
            });
        };
        /** @internal */
        /**
         * \@internal
         * @return {?}
         */
        AgmRectangle.prototype.ngOnDestroy = /**
         * \@internal
         * @return {?}
         */
        function () {
            this._eventSubscriptions.forEach(function (s) {
                s.unsubscribe();
            });
            this._eventSubscriptions = null;
            this._manager.removeRectangle(this);
        };
        /**
         * Gets the LatLngBounds of this Rectangle.
         */
        /**
         * Gets the LatLngBounds of this Rectangle.
         * @return {?}
         */
        AgmRectangle.prototype.getBounds = /**
         * Gets the LatLngBounds of this Rectangle.
         * @return {?}
         */
        function () {
            return this._manager.getBounds(this);
        };
        AgmRectangle._mapOptions = [
            'fillColor',
            'fillOpacity',
            'strokeColor',
            'strokeOpacity',
            'strokePosition',
            'strokeWeight',
            'visible',
            'zIndex',
            'clickable'
        ];
        AgmRectangle.decorators = [
            { type: core.Directive, args: [{
                        selector: 'agm-rectangle'
                    },] }
        ];
        /** @nocollapse */
        AgmRectangle.ctorParameters = function () { return [
            { type: RectangleManager }
        ]; };
        AgmRectangle.propDecorators = {
            north: [{ type: core.Input }],
            east: [{ type: core.Input }],
            south: [{ type: core.Input }],
            west: [{ type: core.Input }],
            clickable: [{ type: core.Input }],
            draggable: [{ type: core.Input, args: ['rectangleDraggable',] }],
            editable: [{ type: core.Input }],
            fillColor: [{ type: core.Input }],
            fillOpacity: [{ type: core.Input }],
            strokeColor: [{ type: core.Input }],
            strokeOpacity: [{ type: core.Input }],
            strokePosition: [{ type: core.Input }],
            strokeWeight: [{ type: core.Input }],
            visible: [{ type: core.Input }],
            zIndex: [{ type: core.Input }],
            boundsChange: [{ type: core.Output }],
            rectangleClick: [{ type: core.Output }],
            rectangleDblClick: [{ type: core.Output }],
            drag: [{ type: core.Output }],
            dragEnd: [{ type: core.Output }],
            dragStart: [{ type: core.Output }],
            mouseDown: [{ type: core.Output }],
            mouseMove: [{ type: core.Output }],
            mouseOut: [{ type: core.Output }],
            mouseOver: [{ type: core.Output }],
            mouseUp: [{ type: core.Output }],
            rightClick: [{ type: core.Output }]
        };
        return AgmRectangle;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
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
            this.infoWindowClose = new core.EventEmitter();
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
            { type: core.Component, args: [{
                        selector: 'agm-info-window',
                        template: "<div class='agm-info-window-content'>\n      <ng-content></ng-content>\n    </div>\n  "
                    }] }
        ];
        /** @nocollapse */
        AgmInfoWindow.ctorParameters = function () { return [
            { type: InfoWindowManager },
            { type: core.ElementRef }
        ]; };
        AgmInfoWindow.propDecorators = {
            latitude: [{ type: core.Input }],
            longitude: [{ type: core.Input }],
            disableAutoPan: [{ type: core.Input }],
            zIndex: [{ type: core.Input }],
            maxWidth: [{ type: core.Input }],
            isOpen: [{ type: core.Input }],
            infoWindowClose: [{ type: core.Output }]
        };
        return AgmInfoWindow;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
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
            this.layerClick = new core.EventEmitter();
            /**
             * This event is fired when the KML layers default viewport has changed.
             */
            this.defaultViewportChange = new core.EventEmitter();
            /**
             * This event is fired when the KML layer has finished loading.
             * At this point it is safe to read the status property to determine if the layer loaded
             * successfully.
             */
            this.statusChange = new core.EventEmitter();
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
            { type: core.Directive, args: [{
                        selector: 'agm-kml-layer'
                    },] }
        ];
        /** @nocollapse */
        AgmKmlLayer.ctorParameters = function () { return [
            { type: KmlLayerManager }
        ]; };
        AgmKmlLayer.propDecorators = {
            clickable: [{ type: core.Input }],
            preserveViewport: [{ type: core.Input }],
            screenOverlays: [{ type: core.Input }],
            suppressInfoWindows: [{ type: core.Input }],
            url: [{ type: core.Input }],
            zIndex: [{ type: core.Input }],
            layerClick: [{ type: core.Output }],
            defaultViewportChange: [{ type: core.Output }],
            statusChange: [{ type: core.Output }]
        };
        return AgmKmlLayer;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /** @type {?} */
    var layerId$1 = 0;
    /**
     * AgmDataLayer enables the user to add data layers to the map.
     *
     * ### Example
     * ```typescript
     * import { Component } from 'angular2/core';
     * import { AgmMap, AgmDataLayer } from
     * 'angular-google-maps/core';
     *
     * \@Component({
     *  selector: 'my-map-cmp',
     *  directives: [AgmMap, AgmDataLayer],
     *  styles: [`
     *    .agm-container {
     *      height: 300px;
     *    }
     * `],
     *  template: `
     * <agm-map [latitude]="lat" [longitude]="lng" [zoom]="zoom">
     * 	  <agm-data-layer [geoJson]="geoJsonObject" (layerClick)="clicked($event)" [style]="styleFunc">
     * 	  </agm-data-layer>
     * </agm-map>
     *  `
     * })
     * export class MyMapCmp {
     *   lat: number = -25.274449;
     *   lng: number = 133.775060;
     *   zoom: number = 5;
     *
     * clicked(clickEvent) {
     *    console.log(clickEvent);
     *  }
     *
     *  styleFunc(feature) {
     *    return ({
     *      clickable: false,
     *      fillColor: feature.getProperty('color'),
     *      strokeWeight: 1
     *    });
     *  }
     *
     *  geoJsonObject: Object = {
     *    "type": "FeatureCollection",
     *    "features": [
     *      {
     *        "type": "Feature",
     *        "properties": {
     *          "letter": "G",
     *          "color": "blue",
     *          "rank": "7",
     *          "ascii": "71"
     *        },
     *        "geometry": {
     *          "type": "Polygon",
     *          "coordinates": [
     *            [
     *              [123.61, -22.14], [122.38, -21.73], [121.06, -21.69], [119.66, -22.22], [119.00, -23.40],
     *              [118.65, -24.76], [118.43, -26.07], [118.78, -27.56], [119.22, -28.57], [120.23, -29.49],
     *              [121.77, -29.87], [123.57, -29.64], [124.45, -29.03], [124.71, -27.95], [124.80, -26.70],
     *              [124.80, -25.60], [123.61, -25.64], [122.56, -25.64], [121.72, -25.72], [121.81, -26.62],
     *              [121.86, -26.98], [122.60, -26.90], [123.57, -27.05], [123.57, -27.68], [123.35, -28.18],
     *              [122.51, -28.38], [121.77, -28.26], [121.02, -27.91], [120.49, -27.21], [120.14, -26.50],
     *              [120.10, -25.64], [120.27, -24.52], [120.67, -23.68], [121.72, -23.32], [122.43, -23.48],
     *              [123.04, -24.04], [124.54, -24.28], [124.58, -23.20], [123.61, -22.14]
     *            ]
     *          ]
     *        }
     *      },
     *      {
     *        "type": "Feature",
     *        "properties": {
     *          "letter": "o",
     *          "color": "red",
     *          "rank": "15",
     *          "ascii": "111"
     *        },
     *        "geometry": {
     *          "type": "Polygon",
     *          "coordinates": [
     *            [
     *              [128.84, -25.76], [128.18, -25.60], [127.96, -25.52], [127.88, -25.52], [127.70, -25.60],
     *              [127.26, -25.79], [126.60, -26.11], [126.16, -26.78], [126.12, -27.68], [126.21, -28.42],
     *              [126.69, -29.49], [127.74, -29.80], [128.80, -29.72], [129.41, -29.03], [129.72, -27.95],
     *              [129.68, -27.21], [129.33, -26.23], [128.84, -25.76]
     *            ],
     *            [
     *              [128.45, -27.44], [128.32, -26.94], [127.70, -26.82], [127.35, -27.05], [127.17, -27.80],
     *              [127.57, -28.22], [128.10, -28.42], [128.49, -27.80], [128.45, -27.44]
     *            ]
     *          ]
     *        }
     *      },
     *      {
     *        "type": "Feature",
     *        "properties": {
     *          "letter": "o",
     *          "color": "yellow",
     *          "rank": "15",
     *          "ascii": "111"
     *        },
     *        "geometry": {
     *          "type": "Polygon",
     *          "coordinates": [
     *            [
     *              [131.87, -25.76], [131.35, -26.07], [130.95, -26.78], [130.82, -27.64], [130.86, -28.53],
     *              [131.26, -29.22], [131.92, -29.76], [132.45, -29.87], [133.06, -29.76], [133.72, -29.34],
     *              [134.07, -28.80], [134.20, -27.91], [134.07, -27.21], [133.81, -26.31], [133.37, -25.83],
     *              [132.71, -25.64], [131.87, -25.76]
     *            ],
     *            [
     *              [133.15, -27.17], [132.71, -26.86], [132.09, -26.90], [131.74, -27.56], [131.79, -28.26],
     *              [132.36, -28.45], [132.93, -28.34], [133.15, -27.76], [133.15, -27.17]
     *            ]
     *          ]
     *        }
     *      },
     *      {
     *        "type": "Feature",
     *        "properties": {
     *          "letter": "g",
     *          "color": "blue",
     *          "rank": "7",
     *          "ascii": "103"
     *        },
     *        "geometry": {
     *          "type": "Polygon",
     *          "coordinates": [
     *            [
     *              [138.12, -25.04], [136.84, -25.16], [135.96, -25.36], [135.26, -25.99], [135, -26.90],
     *              [135.04, -27.91], [135.26, -28.88], [136.05, -29.45], [137.02, -29.49], [137.81, -29.49],
     *              [137.94, -29.99], [137.90, -31.20], [137.85, -32.24], [136.88, -32.69], [136.45, -32.36],
     *              [136.27, -31.80], [134.95, -31.84], [135.17, -32.99], [135.52, -33.43], [136.14, -33.76],
     *              [137.06, -33.83], [138.12, -33.65], [138.86, -33.21], [139.30, -32.28], [139.30, -31.24],
     *              [139.30, -30.14], [139.21, -28.96], [139.17, -28.22], [139.08, -27.41], [139.08, -26.47],
     *              [138.99, -25.40], [138.73, -25.00], [138.12, -25.04]
     *            ],
     *            [
     *              [137.50, -26.54], [136.97, -26.47], [136.49, -26.58], [136.31, -27.13], [136.31, -27.72],
     *              [136.58, -27.99], [137.50, -28.03], [137.68, -27.68], [137.59, -26.78], [137.50, -26.54]
     *            ]
     *          ]
     *        }
     *      },
     *      {
     *        "type": "Feature",
     *        "properties": {
     *          "letter": "l",
     *          "color": "green",
     *          "rank": "12",
     *          "ascii": "108"
     *        },
     *        "geometry": {
     *          "type": "Polygon",
     *          "coordinates": [
     *            [
     *              [140.14, -21.04], [140.31, -29.42], [141.67, -29.49], [141.59, -20.92], [140.14, -21.04]
     *            ]
     *          ]
     *        }
     *      },
     *      {
     *        "type": "Feature",
     *        "properties": {
     *          "letter": "e",
     *          "color": "red",
     *          "rank": "5",
     *          "ascii": "101"
     *        },
     *        "geometry": {
     *          "type": "Polygon",
     *          "coordinates": [
     *            [
     *              [144.14, -27.41], [145.67, -27.52], [146.86, -27.09], [146.82, -25.64], [146.25, -25.04],
     *              [145.45, -24.68], [144.66, -24.60], [144.09, -24.76], [143.43, -25.08], [142.99, -25.40],
     *              [142.64, -26.03], [142.64, -27.05], [142.64, -28.26], [143.30, -29.11], [144.18, -29.57],
     *              [145.41, -29.64], [146.46, -29.19], [146.64, -28.72], [146.82, -28.14], [144.84, -28.42],
     *              [144.31, -28.26], [144.14, -27.41]
     *            ],
     *            [
     *              [144.18, -26.39], [144.53, -26.58], [145.19, -26.62], [145.72, -26.35], [145.81, -25.91],
     *              [145.41, -25.68], [144.97, -25.68], [144.49, -25.64], [144, -25.99], [144.18, -26.39]
     *            ]
     *          ]
     *        }
     *      }
     *    ]
     *  };
     * }
     * ```
     */
    var AgmDataLayer = /** @class */ (function () {
        function AgmDataLayer(_manager) {
            this._manager = _manager;
            this._addedToManager = false;
            this._id = (layerId$1++).toString();
            this._subscriptions = [];
            /**
             * This event is fired when a feature in the layer is clicked.
             */
            this.layerClick = new core.EventEmitter();
            /**
             * The geoJson to be displayed
             */
            this.geoJson = null;
        }
        /**
         * @return {?}
         */
        AgmDataLayer.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            if (this._addedToManager) {
                return;
            }
            this._manager.addDataLayer(this);
            this._addedToManager = true;
            this._addEventListeners();
        };
        /**
         * @return {?}
         */
        AgmDataLayer.prototype._addEventListeners = /**
         * @return {?}
         */
        function () {
            var _this = this;
            /** @type {?} */
            var listeners = [
                { name: 'click', handler: function (ev) { return _this.layerClick.emit(ev); } },
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
        AgmDataLayer.prototype.id = /**
         * \@internal
         * @return {?}
         */
        function () { return this._id; };
        /** @internal */
        /**
         * \@internal
         * @return {?}
         */
        AgmDataLayer.prototype.toString = /**
         * \@internal
         * @return {?}
         */
        function () { return "AgmDataLayer-" + this._id.toString(); };
        /** @internal */
        /**
         * \@internal
         * @return {?}
         */
        AgmDataLayer.prototype.ngOnDestroy = /**
         * \@internal
         * @return {?}
         */
        function () {
            this._manager.deleteDataLayer(this);
            // unsubscribe all registered observable subscriptions
            this._subscriptions.forEach(function (s) { return s.unsubscribe(); });
        };
        /** @internal */
        /**
         * \@internal
         * @param {?} changes
         * @return {?}
         */
        AgmDataLayer.prototype.ngOnChanges = /**
         * \@internal
         * @param {?} changes
         * @return {?}
         */
        function (changes) {
            var _this = this;
            if (!this._addedToManager) {
                return;
            }
            /** @type {?} */
            var geoJsonChange = changes['geoJson'];
            if (geoJsonChange) {
                this._manager.updateGeoJson(this, geoJsonChange.currentValue);
            }
            /** @type {?} */
            var dataOptions = {};
            AgmDataLayer._dataOptionsAttributes.forEach(function (k) { return (/** @type {?} */ (dataOptions))[k] = changes.hasOwnProperty(k) ? changes[k].currentValue : (/** @type {?} */ (_this))[k]; });
            this._manager.setDataOptions(this, dataOptions);
        };
        AgmDataLayer._dataOptionsAttributes = ['style'];
        AgmDataLayer.decorators = [
            { type: core.Directive, args: [{
                        selector: 'agm-data-layer'
                    },] }
        ];
        /** @nocollapse */
        AgmDataLayer.ctorParameters = function () { return [
            { type: DataLayerManager }
        ]; };
        AgmDataLayer.propDecorators = {
            layerClick: [{ type: core.Output }],
            geoJson: [{ type: core.Input }],
            style: [{ type: core.Input }]
        };
        return AgmDataLayer;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /** @type {?} */
    var markerId = 0;
    /**
     * AgmMarker renders a map marker inside a {\@link AgmMap}.
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
     *      </agm-marker>
     *    </agm-map>
     *  `
     * })
     * ```
     */
    var AgmMarker = /** @class */ (function () {
        function AgmMarker(_markerManager) {
            this._markerManager = _markerManager;
            /**
             * If true, the marker can be dragged. Default value is false.
             */
            this.draggable = false;
            /**
             * If true, the marker is visible
             */
            this.visible = true;
            /**
             * Whether to automatically open the child info window when the marker is clicked.
             */
            this.openInfoWindow = true;
            /**
             * The marker's opacity between 0.0 and 1.0.
             */
            this.opacity = 1;
            /**
             * All markers are displayed on the map in order of their zIndex, with higher values displaying in
             * front of markers with lower values. By default, markers are displayed according to their
             * vertical position on screen, with lower markers appearing in front of markers further up the
             * screen.
             */
            this.zIndex = 1;
            /**
             * If true, the marker can be clicked. Default value is true.
             */
            this.clickable = true;
            /**
             * This event emitter gets emitted when the user clicks on the marker.
             */
            this.markerClick = new core.EventEmitter();
            /**
             * This event is fired when the user rightclicks on the marker.
             */
            this.markerRightClick = new core.EventEmitter();
            /**
             * This event is fired when the user stops dragging the marker.
             */
            this.dragEnd = new core.EventEmitter();
            /**
             * This event is fired when the user mouses over the marker.
             */
            this.mouseOver = new core.EventEmitter();
            /**
             * This event is fired when the user mouses outside the marker.
             */
            this.mouseOut = new core.EventEmitter();
            /**
             * \@internal
             */
            this.infoWindow = new core.QueryList();
            this._markerAddedToManger = false;
            this._observableSubscriptions = [];
            this._fitBoundsDetails$ = new rxjs.ReplaySubject(1);
            this._id = (markerId++).toString();
        }
        /* @internal */
        /**
         * @return {?}
         */
        AgmMarker.prototype.ngAfterContentInit = /**
         * @return {?}
         */
        function () {
            var _this = this;
            this.handleInfoWindowUpdate();
            this.infoWindow.changes.subscribe(function () { return _this.handleInfoWindowUpdate(); });
        };
        /**
         * @return {?}
         */
        AgmMarker.prototype.handleInfoWindowUpdate = /**
         * @return {?}
         */
        function () {
            var _this = this;
            if (this.infoWindow.length > 1) {
                throw new Error('Expected no more than one info window.');
            }
            this.infoWindow.forEach(function (marker) {
                marker.hostMarker = _this;
            });
        };
        /** @internal */
        /**
         * \@internal
         * @param {?} changes
         * @return {?}
         */
        AgmMarker.prototype.ngOnChanges = /**
         * \@internal
         * @param {?} changes
         * @return {?}
         */
        function (changes) {
            if (typeof this.latitude === 'string') {
                this.latitude = Number(this.latitude);
            }
            if (typeof this.longitude === 'string') {
                this.longitude = Number(this.longitude);
            }
            if (typeof this.latitude !== 'number' || typeof this.longitude !== 'number') {
                return;
            }
            if (!this._markerAddedToManger) {
                this._markerManager.addMarker(this);
                this._updateFitBoundsDetails();
                this._markerAddedToManger = true;
                this._addEventListeners();
                return;
            }
            if (changes['latitude'] || changes['longitude']) {
                this._markerManager.updateMarkerPosition(this);
                this._updateFitBoundsDetails();
            }
            if (changes['title']) {
                this._markerManager.updateTitle(this);
            }
            if (changes['label']) {
                this._markerManager.updateLabel(this);
            }
            if (changes['draggable']) {
                this._markerManager.updateDraggable(this);
            }
            if (changes['iconUrl']) {
                this._markerManager.updateIcon(this);
            }
            if (changes['opacity']) {
                this._markerManager.updateOpacity(this);
            }
            if (changes['visible']) {
                this._markerManager.updateVisible(this);
            }
            if (changes['zIndex']) {
                this._markerManager.updateZIndex(this);
            }
            if (changes['clickable']) {
                this._markerManager.updateClickable(this);
            }
            if (changes['animation']) {
                this._markerManager.updateAnimation(this);
            }
        };
        /**
         * @internal
         */
        /**
         * \@internal
         * @return {?}
         */
        AgmMarker.prototype.getFitBoundsDetails$ = /**
         * \@internal
         * @return {?}
         */
        function () {
            return this._fitBoundsDetails$.asObservable();
        };
        /**
         * @return {?}
         */
        AgmMarker.prototype._updateFitBoundsDetails = /**
         * @return {?}
         */
        function () {
            this._fitBoundsDetails$.next({ latLng: { lat: this.latitude, lng: this.longitude } });
        };
        /**
         * @return {?}
         */
        AgmMarker.prototype._addEventListeners = /**
         * @return {?}
         */
        function () {
            var _this = this;
            /** @type {?} */
            var cs = this._markerManager.createEventObservable('click', this).subscribe(function () {
                if (_this.openInfoWindow) {
                    _this.infoWindow.forEach(function (infoWindow) { return infoWindow.open(); });
                }
                _this.markerClick.emit(_this);
            });
            this._observableSubscriptions.push(cs);
            /** @type {?} */
            var rc = this._markerManager.createEventObservable('rightclick', this).subscribe(function () {
                _this.markerRightClick.emit(null);
            });
            this._observableSubscriptions.push(rc);
            /** @type {?} */
            var ds = this._markerManager.createEventObservable('dragend', this)
                .subscribe(function (e) {
                _this.dragEnd.emit(/** @type {?} */ ({ coords: { lat: e.latLng.lat(), lng: e.latLng.lng() } }));
            });
            this._observableSubscriptions.push(ds);
            /** @type {?} */
            var mover = this._markerManager.createEventObservable('mouseover', this)
                .subscribe(function (e) {
                _this.mouseOver.emit(/** @type {?} */ ({ coords: { lat: e.latLng.lat(), lng: e.latLng.lng() } }));
            });
            this._observableSubscriptions.push(mover);
            /** @type {?} */
            var mout = this._markerManager.createEventObservable('mouseout', this)
                .subscribe(function (e) {
                _this.mouseOut.emit(/** @type {?} */ ({ coords: { lat: e.latLng.lat(), lng: e.latLng.lng() } }));
            });
            this._observableSubscriptions.push(mout);
        };
        /** @internal */
        /**
         * \@internal
         * @return {?}
         */
        AgmMarker.prototype.id = /**
         * \@internal
         * @return {?}
         */
        function () { return this._id; };
        /** @internal */
        /**
         * \@internal
         * @return {?}
         */
        AgmMarker.prototype.toString = /**
         * \@internal
         * @return {?}
         */
        function () { return 'AgmMarker-' + this._id.toString(); };
        /** @internal */
        /**
         * \@internal
         * @return {?}
         */
        AgmMarker.prototype.ngOnDestroy = /**
         * \@internal
         * @return {?}
         */
        function () {
            this._markerManager.deleteMarker(this);
            // unsubscribe all registered observable subscriptions
            this._observableSubscriptions.forEach(function (s) { return s.unsubscribe(); });
        };
        AgmMarker.decorators = [
            { type: core.Directive, args: [{
                        selector: 'agm-marker',
                        providers: [
                            { provide: FitBoundsAccessor, useExisting: core.forwardRef(function () { return AgmMarker; }) }
                        ],
                        inputs: [
                            'latitude', 'longitude', 'title', 'label', 'draggable: markerDraggable', 'iconUrl',
                            'openInfoWindow', 'opacity', 'visible', 'zIndex', 'animation'
                        ],
                        outputs: ['markerClick', 'dragEnd', 'mouseOver', 'mouseOut']
                    },] }
        ];
        /** @nocollapse */
        AgmMarker.ctorParameters = function () { return [
            { type: MarkerManager }
        ]; };
        AgmMarker.propDecorators = {
            latitude: [{ type: core.Input }],
            longitude: [{ type: core.Input }],
            title: [{ type: core.Input }],
            label: [{ type: core.Input }],
            draggable: [{ type: core.Input, args: ['markerDraggable',] }],
            iconUrl: [{ type: core.Input }],
            visible: [{ type: core.Input }],
            openInfoWindow: [{ type: core.Input }],
            opacity: [{ type: core.Input }],
            zIndex: [{ type: core.Input }],
            clickable: [{ type: core.Input, args: ['markerClickable',] }],
            markerClick: [{ type: core.Output }],
            markerRightClick: [{ type: core.Output }],
            dragEnd: [{ type: core.Output }],
            mouseOver: [{ type: core.Output }],
            mouseOut: [{ type: core.Output }],
            infoWindow: [{ type: core.ContentChildren, args: [AgmInfoWindow,] }]
        };
        return AgmMarker;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
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
            this.polyClick = new core.EventEmitter();
            /**
             * This event is fired when the DOM dblclick event is fired on the Polygon.
             */
            this.polyDblClick = new core.EventEmitter();
            /**
             * This event is repeatedly fired while the user drags the polygon.
             */
            this.polyDrag = new core.EventEmitter();
            /**
             * This event is fired when the user stops dragging the polygon.
             */
            this.polyDragEnd = new core.EventEmitter();
            /**
             * This event is fired when the user starts dragging the polygon.
             */
            this.polyDragStart = new core.EventEmitter();
            /**
             * This event is fired when the DOM mousedown event is fired on the Polygon.
             */
            this.polyMouseDown = new core.EventEmitter();
            /**
             * This event is fired when the DOM mousemove event is fired on the Polygon.
             */
            this.polyMouseMove = new core.EventEmitter();
            /**
             * This event is fired on Polygon mouseout.
             */
            this.polyMouseOut = new core.EventEmitter();
            /**
             * This event is fired on Polygon mouseover.
             */
            this.polyMouseOver = new core.EventEmitter();
            /**
             * This event is fired whe the DOM mouseup event is fired on the Polygon
             */
            this.polyMouseUp = new core.EventEmitter();
            /**
             * This even is fired when the Polygon is right-clicked on.
             */
            this.polyRightClick = new core.EventEmitter();
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
            { type: core.Directive, args: [{
                        selector: 'agm-polygon'
                    },] }
        ];
        /** @nocollapse */
        AgmPolygon.ctorParameters = function () { return [
            { type: PolygonManager }
        ]; };
        AgmPolygon.propDecorators = {
            clickable: [{ type: core.Input }],
            draggable: [{ type: core.Input, args: ['polyDraggable',] }],
            editable: [{ type: core.Input }],
            fillColor: [{ type: core.Input }],
            fillOpacity: [{ type: core.Input }],
            geodesic: [{ type: core.Input }],
            paths: [{ type: core.Input }],
            strokeColor: [{ type: core.Input }],
            strokeOpacity: [{ type: core.Input }],
            strokeWeight: [{ type: core.Input }],
            visible: [{ type: core.Input }],
            zIndex: [{ type: core.Input }],
            polyClick: [{ type: core.Output }],
            polyDblClick: [{ type: core.Output }],
            polyDrag: [{ type: core.Output }],
            polyDragEnd: [{ type: core.Output }],
            polyDragStart: [{ type: core.Output }],
            polyMouseDown: [{ type: core.Output }],
            polyMouseMove: [{ type: core.Output }],
            polyMouseOut: [{ type: core.Output }],
            polyMouseOver: [{ type: core.Output }],
            polyMouseUp: [{ type: core.Output }],
            polyRightClick: [{ type: core.Output }]
        };
        return AgmPolygon;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * AgmPolylinePoint represents one element of a polyline within a  {\@link
     * SembGoogleMapPolyline}
     */
    var AgmPolylinePoint = /** @class */ (function () {
        function AgmPolylinePoint() {
            /**
             * This event emitter gets emitted when the position of the point changed.
             */
            this.positionChanged = new core.EventEmitter();
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
            { type: core.Directive, args: [{ selector: 'agm-polyline-point' },] }
        ];
        /** @nocollapse */
        AgmPolylinePoint.ctorParameters = function () { return []; };
        AgmPolylinePoint.propDecorators = {
            latitude: [{ type: core.Input }],
            longitude: [{ type: core.Input }],
            positionChanged: [{ type: core.Output }]
        };
        return AgmPolylinePoint;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
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
            this.lineClick = new core.EventEmitter();
            /**
             * This event is fired when the DOM dblclick event is fired on the Polyline.
             */
            this.lineDblClick = new core.EventEmitter();
            /**
             * This event is repeatedly fired while the user drags the polyline.
             */
            this.lineDrag = new core.EventEmitter();
            /**
             * This event is fired when the user stops dragging the polyline.
             */
            this.lineDragEnd = new core.EventEmitter();
            /**
             * This event is fired when the user starts dragging the polyline.
             */
            this.lineDragStart = new core.EventEmitter();
            /**
             * This event is fired when the DOM mousedown event is fired on the Polyline.
             */
            this.lineMouseDown = new core.EventEmitter();
            /**
             * This event is fired when the DOM mousemove event is fired on the Polyline.
             */
            this.lineMouseMove = new core.EventEmitter();
            /**
             * This event is fired on Polyline mouseout.
             */
            this.lineMouseOut = new core.EventEmitter();
            /**
             * This event is fired on Polyline mouseover.
             */
            this.lineMouseOver = new core.EventEmitter();
            /**
             * This event is fired whe the DOM mouseup event is fired on the Polyline
             */
            this.lineMouseUp = new core.EventEmitter();
            /**
             * This even is fired when the Polyline is right-clicked on.
             */
            this.lineRightClick = new core.EventEmitter();
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
            { type: core.Directive, args: [{
                        selector: 'agm-polyline'
                    },] }
        ];
        /** @nocollapse */
        AgmPolyline.ctorParameters = function () { return [
            { type: PolylineManager }
        ]; };
        AgmPolyline.propDecorators = {
            clickable: [{ type: core.Input }],
            draggable: [{ type: core.Input, args: ['polylineDraggable',] }],
            editable: [{ type: core.Input }],
            geodesic: [{ type: core.Input }],
            strokeColor: [{ type: core.Input }],
            strokeOpacity: [{ type: core.Input }],
            strokeWeight: [{ type: core.Input }],
            visible: [{ type: core.Input }],
            zIndex: [{ type: core.Input }],
            lineClick: [{ type: core.Output }],
            lineDblClick: [{ type: core.Output }],
            lineDrag: [{ type: core.Output }],
            lineDragEnd: [{ type: core.Output }],
            lineDragStart: [{ type: core.Output }],
            lineMouseDown: [{ type: core.Output }],
            lineMouseMove: [{ type: core.Output }],
            lineMouseOut: [{ type: core.Output }],
            lineMouseOver: [{ type: core.Output }],
            lineMouseUp: [{ type: core.Output }],
            lineRightClick: [{ type: core.Output }],
            points: [{ type: core.ContentChildren, args: [AgmPolylinePoint,] }]
        };
        return AgmPolyline;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
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
            this._destroyed$ = new rxjs.Subject();
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
                .pipe(operators.distinctUntilChanged(function (x, y) {
                return x.latLng.lat === y.latLng.lng;
            }), operators.takeUntil(this._destroyed$))
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
            { type: core.Directive, args: [{
                        selector: '[agmFitBounds]'
                    },] }
        ];
        /** @nocollapse */
        AgmFitBounds.ctorParameters = function () { return [
            { type: FitBoundsAccessor, decorators: [{ type: core.Self }] },
            { type: FitBoundsService }
        ]; };
        AgmFitBounds.propDecorators = {
            agmFitBounds: [{ type: core.Input }]
        };
        return AgmFitBounds;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var WindowRef = /** @class */ (function () {
        function WindowRef() {
        }
        /**
         * @return {?}
         */
        WindowRef.prototype.getNativeWindow = /**
         * @return {?}
         */
        function () { return window; };
        return WindowRef;
    }());
    var DocumentRef = /** @class */ (function () {
        function DocumentRef() {
        }
        /**
         * @return {?}
         */
        DocumentRef.prototype.getNativeDocument = /**
         * @return {?}
         */
        function () { return document; };
        return DocumentRef;
    }());
    /** @type {?} */
    var BROWSER_GLOBALS_PROVIDERS = [WindowRef, DocumentRef];

    var __extends = (undefined && undefined.__extends) || (function () {
        var extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    /** @enum {number} */
    var GoogleMapsScriptProtocol = {
        HTTP: 1,
        HTTPS: 2,
        AUTO: 3,
    };
    GoogleMapsScriptProtocol[GoogleMapsScriptProtocol.HTTP] = 'HTTP';
    GoogleMapsScriptProtocol[GoogleMapsScriptProtocol.HTTPS] = 'HTTPS';
    GoogleMapsScriptProtocol[GoogleMapsScriptProtocol.AUTO] = 'AUTO';
    /** *
     * Token for the config of the LazyMapsAPILoader. Please provide an object of type {\@link
     * LazyMapsAPILoaderConfig}.
      @type {?} */
    var LAZY_MAPS_API_CONFIG = new core.InjectionToken('angular-google-maps LAZY_MAPS_API_CONFIG');
    var LazyMapsAPILoader = /** @class */ (function (_super) {
        __extends(LazyMapsAPILoader, _super);
        function LazyMapsAPILoader(config, w, d) {
            if (config === void 0) { config = null; }
            var _this = _super.call(this) || this;
            _this._SCRIPT_ID = 'agmGoogleMapsApiScript';
            _this.callbackName = "agmLazyMapsAPILoader";
            _this._config = config || {};
            _this._windowRef = w;
            _this._documentRef = d;
            return _this;
        }
        /**
         * @return {?}
         */
        LazyMapsAPILoader.prototype.load = /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var window = /** @type {?} */ (this._windowRef.getNativeWindow());
            if (window.google && window.google.maps) {
                // Google maps already loaded on the page.
                return Promise.resolve();
            }
            if (this._scriptLoadingPromise) {
                return this._scriptLoadingPromise;
            }
            /** @type {?} */
            var scriptOnPage = this._documentRef.getNativeDocument().getElementById(this._SCRIPT_ID);
            if (scriptOnPage) {
                this._assignScriptLoadingPromise(scriptOnPage);
                return this._scriptLoadingPromise;
            }
            /** @type {?} */
            var script = this._documentRef.getNativeDocument().createElement('script');
            script.type = 'text/javascript';
            script.async = true;
            script.defer = true;
            script.id = this._SCRIPT_ID;
            script.src = this._getScriptSrc(this.callbackName);
            this._assignScriptLoadingPromise(script);
            this._documentRef.getNativeDocument().body.appendChild(script);
            return this._scriptLoadingPromise;
        };
        /**
         * @param {?} scriptElem
         * @return {?}
         */
        LazyMapsAPILoader.prototype._assignScriptLoadingPromise = /**
         * @param {?} scriptElem
         * @return {?}
         */
        function (scriptElem) {
            var _this = this;
            this._scriptLoadingPromise = new Promise(function (resolve, reject) {
                (/** @type {?} */ (_this._windowRef.getNativeWindow()))[_this.callbackName] = function () {
                    resolve();
                };
                scriptElem.onerror = function (error) {
                    reject(error);
                };
            });
        };
        /**
         * @param {?} callbackName
         * @return {?}
         */
        LazyMapsAPILoader.prototype._getScriptSrc = /**
         * @param {?} callbackName
         * @return {?}
         */
        function (callbackName) {
            /** @type {?} */
            var protocolType = (this._config && this._config.protocol) || GoogleMapsScriptProtocol.HTTPS;
            /** @type {?} */
            var protocol;
            switch (protocolType) {
                case GoogleMapsScriptProtocol.AUTO:
                    protocol = '';
                    break;
                case GoogleMapsScriptProtocol.HTTP:
                    protocol = 'http:';
                    break;
                case GoogleMapsScriptProtocol.HTTPS:
                    protocol = 'https:';
                    break;
            }
            /** @type {?} */
            var hostAndPath = this._config.hostAndPath || 'maps.googleapis.com/maps/api/js';
            /** @type {?} */
            var queryParams = {
                v: this._config.apiVersion || '3',
                callback: callbackName,
                key: this._config.apiKey,
                client: this._config.clientId,
                channel: this._config.channel,
                libraries: this._config.libraries,
                region: this._config.region,
                language: this._config.language
            };
            /** @type {?} */
            var params = Object.keys(queryParams)
                .filter(function (k) { return queryParams[k] != null; })
                .filter(function (k) {
                // remove empty arrays
                return !Array.isArray(queryParams[k]) ||
                    (Array.isArray(queryParams[k]) && queryParams[k].length > 0);
            })
                .map(function (k) {
                /** @type {?} */
                var i = queryParams[k];
                if (Array.isArray(i)) {
                    return { key: k, value: i.join(',') };
                }
                return { key: k, value: queryParams[k] };
            })
                .map(function (entry) {
                return entry.key + "=" + entry.value;
            })
                .join('&');
            return protocol + "//" + hostAndPath + "?" + params;
        };
        LazyMapsAPILoader.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        LazyMapsAPILoader.ctorParameters = function () { return [
            { type: undefined, decorators: [{ type: core.Optional }, { type: core.Inject, args: [LAZY_MAPS_API_CONFIG,] }] },
            { type: WindowRef },
            { type: DocumentRef }
        ]; };
        return LazyMapsAPILoader;
    }(MapsAPILoader));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * When using the NoOpMapsAPILoader, the Google Maps API must be added to the page via a `<script>`
     * Tag.
     * It's important that the Google Maps API script gets loaded first on the page.
     */
    var  /**
     * When using the NoOpMapsAPILoader, the Google Maps API must be added to the page via a `<script>`
     * Tag.
     * It's important that the Google Maps API script gets loaded first on the page.
     */
    NoOpMapsAPILoader = /** @class */ (function () {
        function NoOpMapsAPILoader() {
        }
        /**
         * @return {?}
         */
        NoOpMapsAPILoader.prototype.load = /**
         * @return {?}
         */
        function () {
            if (!(/** @type {?} */ (window)).google || !(/** @type {?} */ (window)).google.maps) {
                throw new Error('Google Maps API not loaded on page. Make sure window.google.maps is available!');
            }
            return Promise.resolve();
        };
        return NoOpMapsAPILoader;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * \@internal
     * @return {?}
     */
    function coreDirectives() {
        return [
            AgmMap, AgmMarker, AgmInfoWindow, AgmCircle, AgmRectangle,
            AgmPolygon, AgmPolyline, AgmPolylinePoint, AgmKmlLayer,
            AgmDataLayer, AgmFitBounds
        ];
    }
    /**
     * The angular-google-maps core module. Contains all Directives/Services/Pipes
     * of the core module. Please use `AgmCoreModule.forRoot()` in your app module.
     */
    var AgmCoreModule = /** @class */ (function () {
        function AgmCoreModule() {
        }
        /**
         * Please use this method when you register the module at the root level.
         */
        /**
         * Please use this method when you register the module at the root level.
         * @param {?=} lazyMapsAPILoaderConfig
         * @return {?}
         */
        AgmCoreModule.forRoot = /**
         * Please use this method when you register the module at the root level.
         * @param {?=} lazyMapsAPILoaderConfig
         * @return {?}
         */
        function (lazyMapsAPILoaderConfig) {
            return {
                ngModule: AgmCoreModule,
                providers: BROWSER_GLOBALS_PROVIDERS.concat([
                    { provide: MapsAPILoader, useClass: LazyMapsAPILoader },
                    { provide: LAZY_MAPS_API_CONFIG, useValue: lazyMapsAPILoaderConfig }
                ]),
            };
        };
        AgmCoreModule.decorators = [
            { type: core.NgModule, args: [{ declarations: coreDirectives(), exports: coreDirectives() },] }
        ];
        return AgmCoreModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */

    exports.AgmCoreModule = AgmCoreModule;
    exports.AgmMap = AgmMap;
    exports.AgmCircle = AgmCircle;
    exports.AgmRectangle = AgmRectangle;
    exports.AgmInfoWindow = AgmInfoWindow;
    exports.AgmKmlLayer = AgmKmlLayer;
    exports.AgmDataLayer = AgmDataLayer;
    exports.AgmMarker = AgmMarker;
    exports.AgmPolygon = AgmPolygon;
    exports.AgmPolyline = AgmPolyline;
    exports.AgmPolylinePoint = AgmPolylinePoint;
    exports.AgmFitBounds = AgmFitBounds;
    exports.GoogleMapsAPIWrapper = GoogleMapsAPIWrapper;
    exports.CircleManager = CircleManager;
    exports.RectangleManager = RectangleManager;
    exports.InfoWindowManager = InfoWindowManager;
    exports.MarkerManager = MarkerManager;
    exports.PolygonManager = PolygonManager;
    exports.PolylineManager = PolylineManager;
    exports.KmlLayerManager = KmlLayerManager;
    exports.DataLayerManager = DataLayerManager;
    exports.GoogleMapsScriptProtocol = GoogleMapsScriptProtocol;
    exports.LAZY_MAPS_API_CONFIG = LAZY_MAPS_API_CONFIG;
    exports.LazyMapsAPILoader = LazyMapsAPILoader;
    exports.MapsAPILoader = MapsAPILoader;
    exports.NoOpMapsAPILoader = NoOpMapsAPILoader;
    exports.FitBoundsAccessor = FitBoundsAccessor;
    exports.ɵb = coreDirectives;
    exports.ɵa = FitBoundsService;
    exports.ɵe = BROWSER_GLOBALS_PROVIDERS;
    exports.ɵd = DocumentRef;
    exports.ɵc = WindowRef;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
