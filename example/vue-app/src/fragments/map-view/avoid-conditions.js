const avoidConditions = {


    /**
     * 
     * @param {GeoJson} geoJson 
     */
    avoidPolygonProperties: (geoJson) => {
        if (geoJson.properties) {
            if (geoJson.properties.avoidPolygon || geoJson.properties.mock_water_level > 0) {
                // if the polygon geojson has avoidPolygon variable or mock water level is true
                return true
            }
        }
        return false
    }

}

export default avoidConditions