var map;
var marker;
var infowindow;
var messagewindow;

function initMap() {
    var california = {lat: 37.4419, lng: -122.1419};
    map = new google.maps.Map(document.getElementById('map'), {
      center: california,
      zoom: 13
    });

    infowindow = new google.maps.InfoWindow({
      content: document.getElementById('form')
    });

    messagewindow = new google.maps.InfoWindow({
      content: document.getElementById('message')
    });

    google.maps.event.addListener(map, 'click', function(event) {
           placeMarker(event.latLng);

      google.maps.event.addListener(marker, 'click', function() {
        infowindow.open(map, marker);
      });
    });
}

function saveCrag() {
  var name = document.getElementById("name").value;
  var type = document.getElementById("type").value;
  var lat = marker.getPosition().lat();
  var lng = marker.getPosition().lng();
  var latlng = {lat: lat, lng: lng};
  $.ajax({
    url: '/crags',
    type: 'POST',
    data: { crag: { marker: JSON.stringify(latlng), name: name } }
  });
}

function placeMarker(location) {
  if ( marker ) {
    marker.setPosition(location);
  } else {
    marker = new google.maps.Marker({
      position: location,
      map: map
    });
  }
}
