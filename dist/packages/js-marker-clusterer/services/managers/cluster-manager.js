var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable, NgZone } from '@angular/core';
import 'js-marker-clusterer';
import { MarkerManager } from '../../../core/services/managers/marker-manager';
import { GoogleMapsAPIWrapper } from '../../../core/services/google-maps-api-wrapper';
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
        { type: Injectable }
    ];
    /** @nocollapse */
    ClusterManager.ctorParameters = function () { return [
        { type: GoogleMapsAPIWrapper },
        { type: NgZone }
    ]; };
    return ClusterManager;
}(MarkerManager));
export { ClusterManager };
if (false) {
    /** @type {?} */
    ClusterManager.prototype._clustererInstance;
    /** @type {?} */
    ClusterManager.prototype._resolver;
    /** @type {?} */
    ClusterManager.prototype._mapsWrapper;
    /** @type {?} */
    ClusterManager.prototype._zone;
}
//# sourceMappingURL=cluster-manager.js.map