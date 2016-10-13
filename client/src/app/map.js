var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var { CircularProgress } = require('material-ui');

var Map = React.createClass({
  getInitialState: function() {
    return {
    };
  },

  componentWillMount: function () {
    console.log("componentWillMount");
    this.curLat = 37.3595704;
    this.curLng = 127.105399;
  },

  componentDidMount: function () {
    console.log("componentDidMount");
    this.getLocation();
  },

  render: function() {
    var tagLigeMarginTop = (window.innerHeight - 48) / 2;

    var styles = {
      root: {
        marginTop: 48,
        marginLeft: 'auto',
        marginRight: 'auto',
        width: "100%",
        maxWidth : 650,
        height: window.innerHeight-48
      },
    };

    return (
      <div id='map' style={styles.root}>
        Map
      </div>
    );
  },

  createMap: function() {
    var mapOptions = {
      center: new naver.maps.LatLng(this.curLat, this.curLng),
       zoom: 10
    };
    var map = new naver.maps.Map('map', mapOptions);
  },

  getLocation: function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.showPosition);
    } else {
        this.createMap();
        console.log("Geolocation is not supported by this browser.");
    }
  },

  showPosition: function(position) {
    this.curLat = position.coords.latitude;
    this.curLng = position.coords.longitude;
    this.createMap();
    console.log(this.curLat);
    console.log(this.curLng);
  }
});

Map.contextTypes = {
  router: React.PropTypes.func
};

module.exports = Map;
