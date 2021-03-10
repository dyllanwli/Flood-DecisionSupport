const avoidConditions = {


    /**
     * 
     * @param {GeoJson} geoJson 
     */
    avoidPolygonProperties: (geoJson) => {
        if (geoJson.properties) {
            if (geoJson.properties.avoidPolygon || geoJson.properties.Depth > 0) {
                // if the polygon geojson has avoidPolygon variable or water level is true
                return true
            }
        }
        return false
    }

}

export default avoidConditions