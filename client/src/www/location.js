window.curLat = 37.5666805;
window.curLng = 126.9784147;

var showPosition = function(position) {
  window.curLat = position.coords.latitude;
  window.curLng = position.coords.longitude;
  console.log(this.curLat);
  console.log(this.curLng);
}

var getLocation = function() {
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition);
  } else {
      console.log("Geolocation is not supported by this browser.");
  }
}

