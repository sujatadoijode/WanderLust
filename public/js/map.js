maptilersdk.config.apiKey = mapToken;
maptilersdk.config.primaryLanguage = maptilersdk.Language.ENGLISH;

const map = new maptilersdk.Map({
    container: 'map', // container's id or the HTML element to render the mapstyle: maptilersdk.MapStyle.STREETS,
    style: maptilersdk.MapStyle.STREETS, // ✅ valid style URL
    center: coordinates, // starting position [lng, lat]
    zoom: 9, // starting zoom
    
});


console.log(coordinates);
// Set options
const marker = new maptilersdk.Marker({
color: "#ff0000",
}).setLngLat(coordinates)
.addTo(map);
