// import Vue from 'vue'
import mapboxgl from "mapbox-gl"
import turf from "turf"

// import TOKEN from "@/config/token.json"

import appConfig from "@/config/app-config.json"
import polyline from "@mapbox/polyline"

// for issues https://github.com/mapbox/mapbox-gl-directions/issues/157
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions'
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css'


import axios from 'axios'

export default {
  name: "BaseMap",
  data() {
    return {
      mockData: null,
      accessToken: "pk.eyJ1IjoiZGl5YTAwMCIsImEiOiJja2s5MThsNG0wdGE5Mm5xbzlpNHkwZzh3In0.NjC_1ozBXfqMkduiE_NmGg",
      // mapboxMap: null,
    }
  },
  created() {

  },
  async mounted() {
    mapboxgl.accessToken = this.accessToken

    this.mockData = await axios.get(appConfig.mockDataUrl)

    let floodLevelColor = appConfig.floodLevelColor

    let mapboxMap = new mapboxgl.Map({
      container: "mapContainer",
      style: 'mapbox://styles/mapbox/light-v10',
      center: [103.811279, 1.345399],
      zoom: 11,
    })

    let nav = new mapboxgl.NavigationControl();

    let directions = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
      unit: 'metric',
      profile: 'mapbox/driving',
      alternatives: 'true',
      geometries: 'geojson'
    });

    mapboxMap.scrollZoom.enable();

    mapboxMap.addControl(directions, 'top-right');

    let obstacle = this.mockData.data
    console.log(obstacle)

    // let obstacles = turf.combine()
    // turf.buffer(clearances, 0.25, { units: 'kilometers' })

    mapboxMap.on('load', (error) => {

      // mapboxMap.addSource('mockObstacles', {
      //   type: 'geojson',
      //   data: appConfig.mockDataUrl,
      //   cluster: true,
      //   clusterMaxZoom: 14,
      //   clusterRadius: 50
      // })

      mapboxMap.addLayer({
        id: 'clearances',
        type: 'fill',
        source: {
          type: "geojson",
          data: obstacle
        },
        // source: "mockObstacles",
        layout: {},
        paint: {
          'fill-color': floodLevelColor.aliceblue,
          'fill-opacity': 0.5,
          'fill-outline-color': floodLevelColor.lightskyblue
        }
      })

      for (let i = 0; i <= 2; i++) {
        console.log("adding route")
        mapboxMap.addSource('route' + i, {
          type: 'geojson',
          data: {
            type: 'Feature'
          }
        });

        mapboxMap.addLayer({
          id: 'route' + i,
          type: 'line',
          source: 'route' + i,
          layout: {
            'line-join': 'round',
            'line-cap': 'round'
          },
          paint: {
            'line-color': '#cccccc',
            'line-opacity': 0.5,
            'line-width': 13,
            'line-blur': 0.5
          }
        })
      }
    })

    const geoLocate = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true
    });

    mapboxMap.addControl(geoLocate, "top-right")



    directions.on('route', (e) => {
      let reports = document.getElementById('reports');
      reports.innerHTML = '';
      let report = reports.appendChild(document.createElement('div'));
      let routes = e.route;
      for (let i = 0; i < 3; i++) {
        mapboxMap.setLayoutProperty('route' + i, 'visibility', 'none');
      }

      routes.forEach((route, i) => {
        route.id = i;
      })

      routes.forEach(e => {
        //Make each route visible, by setting the opacity to 50%.
        mapboxMap.setLayoutProperty('route' + e.id, 'visibility', 'visible');

        //Get GeoJson LineString feature of route
        let routeLine = polyline.toGeoJSON(e.geometry);

        //Update the data for the route, updating the visual.
        mapboxMap.getSource('route' + e.id).setData(routeLine);

        let collision = ''
        let emoji = ''
        let clear = turf.booleanDisjoint(obstacle, routeLine)
        let detail = ''

        if (clear == true) {
          collision = 'is good!';
          detail = 'does not go';
          emoji = '✔️';
          report.className = 'item';
          mapboxMap.setPaintProperty('route' + e.id, 'line-color', '#74c476');
        } else {
          collision = 'is bad.';
          detail = 'goes';
          emoji = '⚠️';
          report.className = 'item warning';
          mapboxMap.setPaintProperty('route' + e.id, 'line-color', '#de2d26');
        }

        //Add a new report section to the sidebar.
        // Assign a unique `id` to the report.
        report.id = 'report-' + e.id;

        // Add the response to the individual report created above.
        var heading = report.appendChild(document.createElement('h3'));

        // Set the class type based on clear value.
        if (clear == true) {
          heading.className = 'title';
        } else {
          heading.className = 'warning';
        }

        heading.innerHTML = emoji + ' Route ' + (e.id + 1) + ' ' + collision;

        // Add details to the individual report.
        var details = report.appendChild(document.createElement('div'));
        details.innerHTML =
          'This route ' + detail + ' through an avoidance area.';
        report.appendChild(document.createElement('hr'));
      })
    })

  },
  methods: {

  }
}
