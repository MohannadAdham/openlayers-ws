import 'ol/ol.css';
import GeoJSON from 'ol/format/GeoJSON';
import Map from 'ol/Map';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import View from 'ol/View';
import sync from 'ol-hashed';
import DragAndDrop from 'ol/interaction/DragAndDrop';


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

// add a vector source that will hold
// the vector data added by the user
const source = new VectorSource();

// Create a vector layer and add it to the map
const layer = new VectorLayer({
    source: source
});

map.addLayer(layer);

// create a drag and drop interaction
map.addInteraction(new DragAndDrop({
    source: source,
    formatConstructors: [GeoJSON]
}))
// use the sync function to remember restore
// the extent from the last session when reloading
sync(map);