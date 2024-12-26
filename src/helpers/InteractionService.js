import { Vector } from "ol/layer";
import { Overlay } from "ol";

/**
 * Initializes a click interaction on the map to handle feature selection and optional popups.
 *
 * @param {Object} params - Parameters for the click interaction.
 * @param {Map} params.map - The OpenLayers map instance.
 * @param {Function} params.onFeatureClick - Callback to handle clicked feature information.
 * @param {boolean} [params.selectFeature=false] - Whether to mark the clicked feature as selected by adding a `selected` property.
 * @param {HTMLElement} [params.popupTargetElement=null] - The HTML element used for the popup.
 */
export function setupClickInteraction({
  map,
  onFeatureClick,
  selectFeature = false,
  popupTargetElement = null,
}) {
  const overlay = popupTargetElement
    ? setupPopupOverlay(map, popupTargetElement)
    : null;

  map.on("singleclick", (event) => {
    clearSelectedFeatures(map);

    const clickedFeatures = getClickedFeatures(map, event.pixel);
    if (clickedFeatures.length > 0) {
      handleFeatureClick({
        feature: clickedFeatures[0],
        overlay,
        popupTargetElement,
        onFeatureClick,
        selectFeature,
      });
    } else if (overlay) {
      hidePopup(popupTargetElement, overlay);
      if (typeof onFeatureClick === "function") {
        onFeatureClick(null);
      }
    } else {
      if (typeof onFeatureClick === "function") {
        onFeatureClick(null);
      }
    }
  });
}

/**
 * Sets up a popup overlay for the map.
 *
 * @param {Map} map - The OpenLayers map instance.
 * @param {HTMLElement} popupTargetElement - The HTML element used for the popup.
 * @returns {Overlay} - The created overlay instance.
 */
function setupPopupOverlay(map, popupTargetElement) {
  const overlay = new Overlay({
    element: popupTargetElement,
  });
  map.addOverlay(overlay);
  return overlay;
}

/**
 * Clears the `selected` property from all features in vector layers on the map.
 *
 * @param {Map} map - The OpenLayers map instance.
 */
function clearSelectedFeatures(map) {
  map.getLayers().forEach((layer) => {
    if (layer instanceof Vector) {
      layer
        .getSource()
        .getFeatures()
        .forEach((feature) => {
          if (feature.get("selected")) {
            feature.set("selected", false);
          }
        });
    }
  });
}

/**
 * Retrieves features at the clicked pixel location.
 *
 * @param {Map} map - The OpenLayers map instance.
 * @param {Array} pixel - The pixel coordinates of the click event.
 * @returns {Array<Feature>} - Array of features at the clicked location.
 */
function getClickedFeatures(map, pixel) {
  const clickedFeatures = [];
  map.forEachFeatureAtPixel(pixel, (feature) => {
    clickedFeatures.push(feature);
  });
  return clickedFeatures;
}

/**
 * Handles the logic for clicking a feature, including selection, callback invocation, and popup display.
 *
 * @param {Object} params - Parameters for the feature click handling.
 * @param {Feature} params.feature - The clicked feature.
 * @param {Overlay} [params.overlay] - The popup overlay (if any).
 * @param {HTMLElement} [params.popupTargetElement] - The HTML element used for the popup.
 * @param {Function} params.onFeatureClick - Callback to handle clicked feature information.
 * @param {boolean} params.selectFeature - Whether to mark the feature as selected.
 */
function handleFeatureClick({
  feature,
  overlay,
  popupTargetElement,
  onFeatureClick,
  selectFeature,
}) {
  if (selectFeature) {
    feature.set("selected", true);
  }

  if (overlay && popupTargetElement) {
    showPopup({
      popupTargetElement,
      overlay,
      coordinates: feature.getGeometry().getCoordinates(),
    });
  }

  if (typeof onFeatureClick === "function") {
    onFeatureClick(feature.getProperties());
  }
}

/**
 * Displays a popup with the given content at the specified coordinates.
 *
 * @param {Object} params - Parameters for displaying the popup.
 * @param {HTMLElement} params.popupTargetElement - The HTML element used for the popup.
 * @param {Overlay} params.overlay - The popup overlay.
 * @param {Array<number>} params.coordinates - The coordinates to position the popup.
 */
function showPopup({ popupTargetElement, overlay, coordinates }) {
  popupTargetElement.style.display = "block";
  overlay.setPosition(coordinates);
}

/**
 * Hides the popup overlay.
 *
 * @param {HTMLElement} popupTargetElement - The HTML element used for the popup.
 * @param {Overlay} overlay - The popup overlay.
 */
function hidePopup(popupTargetElement, overlay) {
  popupTargetElement.style.display = "none";
  overlay.setPosition(undefined);
}
