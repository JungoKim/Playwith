var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var mui = require('material-ui');

var {
  CircularProgress,
  RaisedButton } = mui;


var Map = React.createClass({
  getInitialState: function() {
    return {
    };
  },

  componentWillMount: function () {
    console.log("componentWillMount");
  },

  componentDidMount: function () {
    console.log("componentDidMount");
    this.createMap();
  },

  render: function() {
    var styles = {
      root: {
        marginTop: 48,
        marginLeft: 'auto',
        marginRight: 'auto',
        width: "100%",
        maxWidth : 650,
        height: window.innerHeight-48
      },
      searchButton : {
        position : 'fixed',
        bottom: 30,
        left: (window.innerWidth-124)/2
      }
    };

    return (
      <div>
        <div id='map' style={styles.root}>
        </div>
        <RaisedButton
          label={window.textSet.searchInArea}
          style={styles.searchButton}
          primary={true} />
      </div>
    );
  },

  createMap: function() {
    var mapOptions = {
      center: new naver.maps.LatLng(window.curLat, window.curLng),
       zoom: 7
    };
    var map = new naver.maps.Map('map', mapOptions);
  },


});

Map.contextTypes = {
  router: React.PropTypes.func
};

module.exports = Map;
