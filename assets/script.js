let map;
let sanfranciscoLatLong = { lat: 37.773972, lng: -122.431297 }; 
const sanjoseLatLong = { lat: 37.338207, lng: -121.886330 };

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: sanfranciscoLatLong,
    zoom: 8,
  });
}

function addMarkerToSanJose() {
    const marker = new google.maps.Marker({
        position: sanjoseLatLong, 
        map: map,
    });
}
