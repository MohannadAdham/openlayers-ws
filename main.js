import 'ol/ol.css';
import GeoJSON from 'ol/format/GeoJSON';
import Map from 'ol/Map';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import View from 'ol/View';
import sync from 'ol-hashed';


const map = new Map({
    target: 'map-container',
    layers:[
        new VectorLayer({
            source: new VectorSource({
                format: new GeoJSON(),
                url: './data/countries.json'
            })
        })
    ],
    view: new View({
        center: [0, 0], 
        zoom: 2
    })
});

// use the sync function to remember restore
// the extent from the last session when reloading
sync(map);