var lat_dest = 37.768
var lng_dest = -122.511
var lat_org  = 37.77
var lng_org  = -122.447

function initMap(lat_dest, lng_dest, lat_org, lng_org) {
        var directionsDisplay = new google.maps.DirectionsRenderer;
        var directionsService = new google.maps.DirectionsService;
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 14,
          center: {lat: lat_org, lng: lng_org}
        });
        directionsDisplay.setMap(map);

        calculateAndDisplayRoute(directionsService, directionsDisplay, lat_dest, lng_dest, lat_org, lng_org);
      }

function calculateAndDisplayRoute(directionsService, directionsDisplay, lat_dest, lng_dest, lat_org, lng_org) {
    var selectedMode = "TRANSIT";
    directionsService.route({
      origin: {lat: lat_org, lng: lng_org},
      destination: {lat: lat_dest, lng: lng_dest},
      travelMode: google.maps.TravelMode[selectedMode]
    }, function(response, status) {
      if (status == 'OK') {
        directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
}