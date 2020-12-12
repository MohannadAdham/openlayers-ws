import 'ol/ol.css';
import GeoJSON from 'ol/format/GeoJSON';
import Map from 'ol/Map';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import View from 'ol/View';
import sync from 'ol-hashed';
import DragAndDrop from 'ol/interaction/DragAndDrop';
import Modify from 'ol/interaction/Modify';
import Draw from 'ol/interaction/Draw';
import Snap from 'ol/interaction/Snap';


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
}));

// creat a modify interaction and connect it 
// to the vector layer added by the user
map.addInteraction(new Modify({
    source: source
}));

// create a draw interaction
map.addInteraction(new Draw({
    type: 'Polygon',
    source: source
}));

// create a snap interaction
map.addInteraction(new Snap({
    source: source
}));

// add a listener for click to clear the data
// in the vector layer
const clear = document.getElementById('clear');
clear.addEventListener('click', function(){
    source.clear();
});

// on each changement in the vector layer
// create a geojson file and add it 
// as a href of the download button
const format = new GeoJSON({featureProjection: 'EPSG: 3857'});
const download = document.getElementById('download');
source.on('change', function(){
    const features = source.getFeatures();
    const json = format.writeFeatures(features);
    download.href = 'data:text/json;charset=utf-8,' + json;
});

// use the sync function to remember restore
// the extent from the last session when reloading
sync(map);