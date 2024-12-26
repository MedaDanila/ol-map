import { Circle as CircleStyle, Style, Icon, Fill, Text, Stroke } from "ol/style";

/**
 * Creates a style for Point geometry features.
 *
 * @param {Object} params - Parameters for the style.
 * @param {string} [params.fillColor='red'] - Fill color for the point.
 * @param {string} [params.strokeColor='black'] - Stroke color for the point.
 * @param {number} [params.radius=5] - Radius of the point.
 * @returns {Style} - Style for Point features.
 */
export function createPointStyle({ fillColor = "red", strokeColor = "black", radius = 5 } = {}) {
    return new Style({
        image: new CircleStyle({
            radius: radius,
            fill: new Fill({ color: fillColor }),
            stroke: new Stroke({ color: strokeColor, width: 1 }),
        }),
    });
}

/**
 * Creates a style for cluster points.
 * @param {Object} options - Options for customizing the style.
 * @param {number} [options.size=1] - Size of the cluster point.
 * @param {string} [options.color="#349BFA"] - Color of the cluster point.
 * @returns {Style} - OpenLayers style object for cluster points.
 */
export function createClusterPointStyle({ size = 2, fillColor = "red", color = "#fff" }) {
    return new Style({
        image: new CircleStyle({
            radius: 15,
            fill: new Fill({
                color: fillColor,
            }),
        }),
        text: new Text({
            text: size.toString(),
            scale: 1.5,
            fill: new Fill({
                color: color,
            }),
        }),
    });
}

/**
 * Creates a combined style with a circle and an icon.
 * @param {Object} options - Options for customizing the style.
 * @param {string} options.iconUrl - URL of the icon image.
 * @param {number} [options.iconScale=1] - Scale of the icon image.
 * @param {number} [options.circleRadius=15] - Radius of the circle.
 * @param {string} [options.circleColor='white'] - Color of the circle.
 * @param {number} [opacity.opacity='0.2'] - Transparency of the circle.
 * @returns {Style[]} - Array containing the circle style and the icon style.
 */
export function createCircleWithIconStyle({
    iconUrl,
    iconScale = 1,
    circleRadius = 15,
    circleColor = "#FF0000",
    // opacity = 0.1
} = {}) {
    const iconStyle = new Style({
        image: new Icon({
            src: iconUrl,
            scale: iconScale,
        }),
    });

    const circleStyle = new Style({
        image: new CircleStyle({
            radius: circleRadius,
            fill: new Fill({
                color: circleColor,
            }),
        }),
    });

    return [circleStyle, iconStyle];
}

/**
 * Creates a style for LineString geometry features.
 *
 * @param {Object} params - Parameters for the style.
 * @param {string} [params.strokeColor='blue'] - Stroke color for the line.
 * @param {number} [params.width=2] - Stroke width for the line.
 * @returns {Style} - Style for LineString features.
 */
export function createLineStringStyle({ strokeColor = "blue", width = 2 } = {}) {
    return new Style({
        stroke: new Stroke({
            color: strokeColor,
            width: width,
        }),
    });
}

/**
 * Creates a style for Polygon geometry features.
 *
 * @param {Object} params - Parameters for the style.
 * @param {string} [params.strokeColor='green'] - Stroke color for the polygon.
 * @param {string} [params.fillColor='rgba(0, 255, 0, 0.4)'] - Fill color for the polygon.
 * @param {number} [params.width=2] - Stroke width for the polygon.
 * @returns {Style} - Style for Polygon features.
 */
export function createPolygonStyle({
    strokeColor = "green",
    fillColor = "rgba(0, 255, 0, 0.4)",
    width = 2,
} = {}) {
    return new Style({
        stroke: new Stroke({
            color: strokeColor,
            width: width,
        }),
        fill: new Fill({
            color: fillColor,
        }),
    });
}

/**
 * Assembles a factory object for styles, combining all individual style functions.
 *
 * @returns {Object} - An object with style functions for each feature type.
 */
export function createStyleFactory() {
    return {
        Point: createPointStyle(),
        LineString: createLineStringStyle(),
        Polygon: createPolygonStyle(),
    };
}

/**
 * Applies opacity to a color in RGBA format.
 * @param {string} color - The color in HEX or RGB format.
 * @param {number} opacity - The opacity value (0.0 to 1.0).
 * @returns {string} - The color in RGBA format.
 */
function applyOpacityToColor(color, opacity) {
    if (color.startsWith("#")) {
        const bigint = parseInt(color.slice(1), 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;
        return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }
    return color;
}
