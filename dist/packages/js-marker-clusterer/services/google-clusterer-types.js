/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @record
 */
export function CalculatorResult() { }
/** @type {?} */
CalculatorResult.prototype.text;
/** @type {?} */
CalculatorResult.prototype.index;
/** @typedef {?} */
var CalculateFunction;
export { CalculateFunction };
/**
 * @record
 */
export function MarkerClustererInstance() { }
/** @type {?} */
MarkerClustererInstance.prototype.zoomOnClick_;
/** @type {?} */
MarkerClustererInstance.prototype.averageCenter_;
/** @type {?} */
MarkerClustererInstance.prototype.imagePath_;
/** @type {?} */
MarkerClustererInstance.prototype.minimumClusterSize_;
/** @type {?} */
MarkerClustererInstance.prototype.imageExtension_;
/* TODO: handle strange member:
new(map: GoogleMap, marker: Marker[], options: ClusterOptions): MarkerClustererInstance;
*/
/** @type {?} */
MarkerClustererInstance.prototype.addMarker;
/** @type {?} */
MarkerClustererInstance.prototype.addMarkers;
/** @type {?} */
MarkerClustererInstance.prototype.clearMarkers;
/** @type {?} */
MarkerClustererInstance.prototype.getCalculator;
/** @type {?} */
MarkerClustererInstance.prototype.getExtendedBounds;
/** @type {?} */
MarkerClustererInstance.prototype.getGridSize;
/** @type {?} */
MarkerClustererInstance.prototype.getMap;
/** @type {?} */
MarkerClustererInstance.prototype.getMarkers;
/** @type {?} */
MarkerClustererInstance.prototype.getStyles;
/** @type {?} */
MarkerClustererInstance.prototype.getTotalClusters;
/** @type {?} */
MarkerClustererInstance.prototype.getTotalMarkers;
/** @type {?} */
MarkerClustererInstance.prototype.isZoomOnClick;
/** @type {?} */
MarkerClustererInstance.prototype.redraw;
/** @type {?} */
MarkerClustererInstance.prototype.removeMarker;
/** @type {?} */
MarkerClustererInstance.prototype.resetViewport;
/** @type {?} */
MarkerClustererInstance.prototype.setCalculator;
/** @type {?} */
MarkerClustererInstance.prototype.setGridSize;
/** @type {?} */
MarkerClustererInstance.prototype.setMap;
/** @type {?} */
MarkerClustererInstance.prototype.setMaxZoom;
/** @type {?} */
MarkerClustererInstance.prototype.setStyles;
/**
 * @record
 */
export function ClusterOptions() { }
/**
 * The grid size of a cluster in pixels.
 * @type {?|undefined}
 */
ClusterOptions.prototype.gridSize;
/**
 * The maximum zoom level that a marker can be part of a cluster.
 * @type {?|undefined}
 */
ClusterOptions.prototype.maxZoom;
/**
 * Whether the default behaviour of clicking on a cluster is to zoom into it.
 * @type {?|undefined}
 */
ClusterOptions.prototype.zoomOnClick;
/**
 * Whether the center of each cluster should be the average of all markers in the cluster.
 * @type {?|undefined}
 */
ClusterOptions.prototype.averageCenter;
/**
 * The minimum number of markers to be in a cluster before the markers are hidden and a count is shown.
 * @type {?|undefined}
 */
ClusterOptions.prototype.minimumClusterSize;
/**
 * An object that has style properties.
 * @type {?|undefined}
 */
ClusterOptions.prototype.styles;
/** @type {?|undefined} */
ClusterOptions.prototype.imagePath;
/** @type {?|undefined} */
ClusterOptions.prototype.imageExtension;
/**
 * @record
 */
export function ClusterStyle() { }
/**
 * The image url.
 * @type {?|undefined}
 */
ClusterStyle.prototype.url;
/**
 * The image height.
 * @type {?|undefined}
 */
ClusterStyle.prototype.height;
/**
 * The image width.
 * @type {?|undefined}
 */
ClusterStyle.prototype.width;
/**
 * The anchor position of the label text.
 * @type {?|undefined}
 */
ClusterStyle.prototype.anchor;
/**
 * The text color.
 * @type {?|undefined}
 */
ClusterStyle.prototype.textColor;
/**
 * The text size.
 * @type {?|undefined}
 */
ClusterStyle.prototype.textSize;
/**
 * The position of the backgound x, y.
 * @type {?|undefined}
 */
ClusterStyle.prototype.backgroundPosition;
/**
 * The anchor position of the icon x, y.
 * @type {?|undefined}
 */
ClusterStyle.prototype.iconAnchor;
//# sourceMappingURL=google-clusterer-types.js.map