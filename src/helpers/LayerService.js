import { Vector as VectorSource, Cluster } from 'ol/source'
import { Vector as VectorLayer } from 'ol/layer'
import { GeoJSON } from 'ol/format'

/**
 * Note: The following methods are available on layers for additional customization:
 * - `setZIndex(zIndex)` - Sets the z-index of the layer.
 * - `addLayer(layer)` - Adds a new layer to the map.
 * - `removeLayer(layer)` - Removes a layer from the map.
 */

/**
 * Creates a new vector layer with the specified source and style.
 *
 * @param {Object} params - Parameters for creating the vector layer.
 * @param {Vector} params.source - The vector source for the layer.
 * @param {Style} params.style - The style to apply to the vector layer.
 * @returns {Vector} - The created vector layer instance.
 */
export function createVectorLayer({ source, style }) {
    return new VectorLayer({
        source: source,
        style: (feature) => {
            const isCluster = feature.values_?.features?.length > 1 || false
            const geometryType = isCluster ? 'Cluster' : feature.getGeometry().getType()
            const isSelected = feature.values_.selected || false
            const styleFunctionOrObject = style[`${geometryType}${isSelected ? '_selected' : ''}`]

            // Check if the style is a function; if so, execute it with the feature
            if (typeof styleFunctionOrObject === 'function') {
                if (isCluster) {
                    let count = feature.get('features').length
                    return styleFunctionOrObject(count)
                }
                return styleFunctionOrObject(feature)
            }

            // If the style is an ol.style.Style object, return it directly
            return styleFunctionOrObject || null
        }
    })
}

/**
 * Creates a new cluster source for grouping features based on proximity.
 *
 * @param {Object} params - Parameters for creating the cluster source.
 * @param {Object} params.geoData - GeoJSON data used to populate the source.
 * @param {number} params.distance - Distance between features to be clustered (in pixels).
 * @param {number} [params.minDistance] - Minimum distance between clusters (optional).
 * @returns {Cluster} - The created cluster source instance.
 */
export function createClusterSource({ geoData, distance = 14, minDistance = 14 }) {
    return new Cluster({
        source: createVectorSource(geoData),
        distance: distance,
        minDistance: minDistance
    })
}

/**
 * Creates a new vector source from GeoJSON data.
 *
 * @param {Object} geoData - GeoJSON data used to create features.
 * @returns {Vector} - The created vector source instance.
 */
export function createVectorSource(geoData) {
    return new VectorSource({
        features: new GeoJSON().readFeatures(geoData)
    })
}
