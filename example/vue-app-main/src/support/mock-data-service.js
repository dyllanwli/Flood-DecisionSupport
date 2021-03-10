import axios from "axios"

const mockDataService = {

    /**
     * 
     * @param {*} mockDataUrl string
     * @returns {GeoJSON}
     */
    getMockData: async (mockDataUrl) => {
        // axios.get(mockDataUrl).then( (response) => {
        //     return response.data
        // }).catch((error) => {
        //     console.error(error)
        // })
        try {
            let res = await axios.get(mockDataUrl)
            return res.data
        } catch (error) {
            console.error(error)
        }
    }
}
export default mockDataService