(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs'), require('js-marker-clusterer'), require('@agm/core')) :
    typeof define === 'function' && define.amd ? define(['exports', '@angular/core', 'rxjs', 'js-marker-clusterer', '@agm/core'], factory) :
    (factory((global.ngmaps = global.ngmaps || {}, global.ngmaps.jsMarkerClusterer = {}),global.ng.core,null,global.MarkerClusterer,global.ngmaps.core));
}(this, (function (exports,core,rxjs,jsMarkerClusterer,core$1) { 'use strict';

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
    var ClusterManager = /** @class */ (function (_super) {
        __extends(ClusterManager, _super);
        function ClusterManager(_mapsWrapper, _zone) {
            var _this = _super.call(this, _mapsWrapper, _zone) || this;
            _this._mapsWrapper = _mapsWrapper;
            _this._zone = _zone;
            _this._clustererInstance = new Promise(function (resolver) {
                _this._resolver = resolver;
            });
            return _this;
        }
        /**
         * @param {?} options
         * @return {?}
         */
        ClusterManager.prototype.init = /**
         * @param {?} options
         * @return {?}
         */
        function (options) {
            var _this = this;
            this._mapsWrapper.getNativeMap().then(function (map) {
                /** @type {?} */
                var clusterer = new MarkerClusterer(map, [], options);
                _this._resolver(clusterer);
            });
        };
        /**
         * @param {?} marker
         * @return {?}
         */
        ClusterManager.prototype.addMarker = /**
         * @param {?} marker
         * @return {?}
         */
        function (marker) {
            /** @type {?} */
            var clusterPromise = this._clustererInstance;
            /** @type {?} */
            var markerPromise = this._mapsWrapper
                .createMarker({
                position: {
                    lat: marker.latitude,
                    lng: marker.longitude
                },
                label: marker.label,
                draggable: marker.draggable,
                icon: marker.iconUrl,
                opacity: marker.opacity,
                visible: marker.visible,
                zIndex: marker.zIndex,
                title: marker.title,
                clickable: marker.clickable,
            }, false);
            Promise
                .all([clusterPromise, markerPromise])
                .then(function (_a) {
                var cluster = _a[0], marker = _a[1];
                return cluster.addMarker(marker);
            });
            this._markers.set(marker, markerPromise);
        };
        /**
         * @param {?} marker
         * @return {?}
         */
        ClusterManager.prototype.deleteMarker = /**
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
                _this._zone.run(function () {
                    m.setMap(null);
                    _this._clustererInstance.then(function (cluster) {
                        cluster.removeMarker(m);
                        _this._markers.delete(marker);
                    });
                });
            });
        };
        /**
         * @return {?}
         */
        ClusterManager.prototype.clearMarkers = /**
         * @return {?}
         */
        function () {
            return this._clustererInstance.then(function (cluster) {
                cluster.clearMarkers();
            });
        };
        /**
         * @param {?} c
         * @return {?}
         */
        ClusterManager.prototype.setGridSize = /**
         * @param {?} c
         * @return {?}
         */
        function (c) {
            this._clustererInstance.then(function (cluster) {
                cluster.setGridSize(c.gridSize);
            });
        };
        /**
         * @param {?} c
         * @return {?}
         */
        ClusterManager.prototype.setMaxZoom = /**
         * @param {?} c
         * @return {?}
         */
        function (c) {
            this._clustererInstance.then(function (cluster) {
                cluster.setMaxZoom(c.maxZoom);
            });
        };
        /**
         * @param {?} c
         * @return {?}
         */
        ClusterManager.prototype.setStyles = /**
         * @param {?} c
         * @return {?}
         */
        function (c) {
            this._clustererInstance.then(function (cluster) {
                cluster.setStyles(c.styles);
            });
        };
        /**
         * @param {?} c
         * @return {?}
         */
        ClusterManager.prototype.setZoomOnClick = /**
         * @param {?} c
         * @return {?}
         */
        function (c) {
            this._clustererInstance.then(function (cluster) {
                if (c.zoomOnClick !== undefined) {
                    cluster.zoomOnClick_ = c.zoomOnClick;
                }
            });
        };
        /**
         * @param {?} c
         * @return {?}
         */
        ClusterManager.prototype.setAverageCenter = /**
         * @param {?} c
         * @return {?}
         */
        function (c) {
            this._clustererInstance.then(function (cluster) {
                if (c.averageCenter !== undefined) {
                    cluster.averageCenter_ = c.averageCenter;
                }
            });
        };
        /**
         * @param {?} c
         * @return {?}
         */
        ClusterManager.prototype.setImagePath = /**
         * @param {?} c
         * @return {?}
         */
        function (c) {
            this._clustererInstance.then(function (cluster) {
                if (c.imagePath !== undefined) {
                    cluster.imagePath_ = c.imagePath;
                }
            });
        };
        /**
         * @param {?} c
         * @return {?}
         */
        ClusterManager.prototype.setMinimumClusterSize = /**
         * @param {?} c
         * @return {?}
         */
        function (c) {
            this._clustererInstance.then(function (cluster) {
                if (c.minimumClusterSize !== undefined) {
                    cluster.minimumClusterSize_ = c.minimumClusterSize;
                }
            });
        };
        /**
         * @param {?} c
         * @return {?}
         */
        ClusterManager.prototype.setImageExtension = /**
         * @param {?} c
         * @return {?}
         */
        function (c) {
            this._clustererInstance.then(function (cluster) {
                if (c.imageExtension !== undefined) {
                    cluster.imageExtension_ = c.imageExtension;
                }
            });
        };
        ClusterManager.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        ClusterManager.ctorParameters = function () { return [
            { type: GoogleMapsAPIWrapper },
            { type: core.NgZone }
        ]; };
        return ClusterManager;
    }(MarkerManager));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * AgmMarkerCluster clusters map marker if they are near together
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
     *      <agm-marker-cluster>
     *        <agm-marker [latitude]="lat" [longitude]="lng" [label]="'M'">
     *        </agm-marker>
     *        <agm-marker [latitude]="lat2" [longitude]="lng2" [label]="'N'">
     *        </agm-marker>
     *      </agm-marker-cluster>
     *    </agm-map>
     *  `
     * })
     * ```
     */
    var AgmMarkerCluster = /** @class */ (function () {
        function AgmMarkerCluster(_clusterManager) {
            this._clusterManager = _clusterManager;
        }
        /** @internal */
        /**
         * \@internal
         * @return {?}
         */
        AgmMarkerCluster.prototype.ngOnDestroy = /**
         * \@internal
         * @return {?}
         */
        function () {
            this._clusterManager.clearMarkers();
        };
        /** @internal */
        /**
         * \@internal
         * @param {?} changes
         * @return {?}
         */
        AgmMarkerCluster.prototype.ngOnChanges = /**
         * \@internal
         * @param {?} changes
         * @return {?}
         */
        function (changes) {
            if (changes['gridSize']) {
                this._clusterManager.setGridSize(this);
            }
            if (changes['maxZoom']) {
                this._clusterManager.setMaxZoom(this);
            }
            if (changes['styles']) {
                this._clusterManager.setStyles(this);
            }
            if (changes['zoomOnClick']) {
                this._clusterManager.setZoomOnClick(this);
            }
            if (changes['averageCenter']) {
                this._clusterManager.setAverageCenter(this);
            }
            if (changes['minimumClusterSize']) {
                this._clusterManager.setMinimumClusterSize(this);
            }
            if (changes['styles']) {
                this._clusterManager.setStyles(this);
            }
            if (changes['imagePath']) {
                this._clusterManager.setImagePath(this);
            }
            if (changes['imageExtension']) {
                this._clusterManager.setImageExtension(this);
            }
        };
        /** @internal */
        /**
         * \@internal
         * @return {?}
         */
        AgmMarkerCluster.prototype.ngOnInit = /**
         * \@internal
         * @return {?}
         */
        function () {
            this._clusterManager.init({
                gridSize: this.gridSize,
                maxZoom: this.maxZoom,
                zoomOnClick: this.zoomOnClick,
                averageCenter: this.averageCenter,
                minimumClusterSize: this.minimumClusterSize,
                styles: this.styles,
                imagePath: this.imagePath,
                imageExtension: this.imageExtension,
            });
        };
        AgmMarkerCluster.decorators = [
            { type: core.Directive, args: [{
                        selector: 'agm-marker-cluster',
                        providers: [
                            ClusterManager,
                            { provide: core$1.MarkerManager, useExisting: ClusterManager },
                            core$1.InfoWindowManager,
                        ]
                    },] }
        ];
        /** @nocollapse */
        AgmMarkerCluster.ctorParameters = function () { return [
            { type: ClusterManager }
        ]; };
        AgmMarkerCluster.propDecorators = {
            gridSize: [{ type: core.Input }],
            maxZoom: [{ type: core.Input }],
            zoomOnClick: [{ type: core.Input }],
            averageCenter: [{ type: core.Input }],
            minimumClusterSize: [{ type: core.Input }],
            styles: [{ type: core.Input }],
            imagePath: [{ type: core.Input }],
            imageExtension: [{ type: core.Input }]
        };
        return AgmMarkerCluster;
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
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var AgmJsMarkerClustererModule = /** @class */ (function () {
        function AgmJsMarkerClustererModule() {
        }
        AgmJsMarkerClustererModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [core$1.AgmCoreModule],
                        declarations: [AgmMarkerCluster],
                        exports: [AgmMarkerCluster]
                    },] }
        ];
        return AgmJsMarkerClustererModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */

    exports.AgmJsMarkerClustererModule = AgmJsMarkerClustererModule;
    exports.AgmMarkerCluster = AgmMarkerCluster;
    exports.ClusterManager = ClusterManager;
    exports.ɵb = GoogleMapsAPIWrapper;
    exports.ɵa = MarkerManager;
    exports.ɵc = MapsAPILoader;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
