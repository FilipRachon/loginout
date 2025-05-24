var latlng = new google.maps.LatLng(51.247588, 22.56651);
var options = {
  zoom: 10,
  center: latlng,
  mapTypeId: google.maps.MapTypeId.ROADMAP
};
var map = new google.maps.Map(document.getElementById("map"), options);