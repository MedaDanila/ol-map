import "ol/ol.css";
import { Map, View } from "ol";
import { Tile as TileLayer } from "ol/layer";
import { OSM } from "ol/source";
import { useGeographic } from "ol/proj";
import { easeOut } from "ol/easing";

/**
 * Initializes and creates a new OpenLayers map instance.
 *
 * @param {Object} params - Parameters for initializing the map.
 * @param {HTMLElement} params.targetElement - The HTML element where the map will be rendered.
 * @param {Array} [params.center=[43.984506, 56.305298]] - Array with the [longitude, latitude] of the map's center.
 * @param {number} [params.zoom=11] - Initial zoom level for the map.
 * @param {number} [params.minZoom=10] - Minimum allowed zoom level for the map.
 * @returns {Map} - The created OpenLayers map instance.
 */
export function initializeMap({
  targetElement,
  center = [43.984506, 56.305298],
  zoom = 11,
  minZoom = 2,
  maxZoom = 15,
}) {
  useGeographic();
  return new Map({
    moveTolerance: 5,
    renderer: "webgl",
    target: targetElement,
    layers: [
      new TileLayer({
        source: new OSM(),
        className: "base-layer-my-map-ol",
      }),
    ],
    view: new View({
      center: center,
      zoom: zoom,
      minZoom: minZoom,
      maxZoom: maxZoom,
    }),
  });
}

/**
 * Applies a dark mode effect to the map by adjusting the tile layer styles.
 * @param {Map} map - The OpenLayers map instance to apply dark mode on.
 */
export function enableDarkMode(map) {
  map.on("postcompose", function () {
    const canvas = map
      .getViewport()
      .getElementsByClassName("base-layer-my-map-ol")[0];
    if (canvas) {
      canvas.style.filter = "invert(100%) grayscale(100%)";
    }
  });
}

/**
 * Animates the map view to a specified center and zoom level.
 *
 * @param {Object} params - Parameters for the animation.
 * @param {Map} params.map - The OpenLayers map instance to animate.
 * @param {Array} params.center - Array with the [longitude, latitude] for the new center of the map.
 * @param {number} [params.duration=1000] - Duration of the animation in milliseconds.
 * @param {number} [params.zoom=13] - The zoom level to animate to.
 */
export function animateMapView({ map, center, duration = 500, zoom = 15 }) {
  map.getView().animate({
    center: center,
    duration: duration,
    zoom: zoom,
    easeOut: easeOut,
  });
}

/**
 * Changes the zoom level of the map by a specified value.
 *
 * @param {Map} map - The OpenLayers map instance.
 * @param {number} value - The amount by which to adjust the zoom level (positive or negative).
 */
export function changeZoom({ map, value }) {
  const view = map.getView();
  view.setZoom(view.getZoom() + value);
}
