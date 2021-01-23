import React, { useRef } from 'react';
import useEffectAsync from './utils/useEffectAsync'
import mapboxgl from 'mapbox-gl';
import './Map.css';

import Tooltip from './components/Tooltip';
import ReactDOM from 'react-dom';

import appConfig from "./config/app-config.json"
import axios from 'axios'

import polyline from '@mapbox/polyline'
import turf from "turf"
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions'
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css'
import booleanDisjoint from "@turf/boolean-disjoint"

mapboxgl.accessToken =
  'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';

const Map = () => {
  const mapContainerRef = useRef(null);

  const tooltipRef = useRef(new mapboxgl.Popup({ offset: 15 }));

  // Initialize map when component mounts
  useEffectAsync(async () => {

    let floodLevelColor = appConfig.floodLevelColor

    console.log(mapContainerRef.current)
    const mapboxMap = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/light-v10',
      center: [-95.517883, 29.839453],
      zoom: 11
    });

    let nav = new mapboxgl.NavigationControl();

    let directions = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
      unit: 'metric',
      profile: 'mapbox/driving',
      alternatives: 'false',
      geometries: 'geojson'
    });

    mapboxMap.scrollZoom.enable();

    mapboxMap.addControl(directions, 'top-right');

    let mockData = await axios.get(appConfig.mockDataUrl)
    let obstacle = mockData.data

    console.log(obstacle)
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
          'fill-color': floodLevelColor.lightskyblue,
          'fill-opacity': 0.5,
          'fill-outline-color': floodLevelColor.aliceblue
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
        let clear = booleanDisjoint(obstacle, routeLine)
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



    // change cursor to pointer when user hovers over a clickable feature
    mapboxMap.on('mouseenter', e => {
      if (e.features.length) {
        mapboxMap.getCanvas().style.cursor = 'pointer';
      }
    });

    // reset cursor to default when user is no longer hovering over a clickable feature
    mapboxMap.on('mouseleave', () => {
      mapboxMap.getCanvas().style.cursor = '';
    });

    // add tooltip when users mouse move over a point
    mapboxMap.on('mousemove', e => {
      const features = mapboxMap.queryRenderedFeatures(e.point);
      if (features.length) {
        const feature = features[0];

        // Create tooltip node
        const tooltipNode = document.createElement('div');
        ReactDOM.render(<Tooltip feature={feature} />, tooltipNode);

        // Set tooltip on mapboxMap
        tooltipRef.current
          .setLngLat(e.lngLat)
          .setDOMContent(tooltipNode)
          .addTo(mapboxMap);
      }
    });

    // Clean up on unmount
    return () => mapboxMap.remove();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <div className='map-container' ref={mapContainerRef} />
      <div className="sidebar">
        <div className="heading">
          <h1>Routes</h1>
        </div>
        <div id="reports" className="reports"></div>
      </div>
    </div>
  );
};

export default Map;
