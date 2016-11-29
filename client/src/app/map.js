var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var mui = require('material-ui');

var {
  CircularProgress,
  RaisedButton } = mui;

var searchMap;

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
    this.getPlayByLocation();
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
          onTouchTap={this._handleSearchButtonTouchTap}
          primary={true} />
      </div>
    );
  },

  createMap: function() {
    var mapOptions = {
      center: new naver.maps.LatLng(window.curLat, window.curLng),
       zoom: 7
    };
    searchMap = new naver.maps.Map('map', mapOptions);
  },
  _handleSearchButtonTouchTap: function() {
    this.getPlayByLocation();
  },
  getPlayByLocation : function() {
    console.log(searchMap.getBounds());
    var lat1 = searchMap.getBounds()._min._lat;
    var lng1 = searchMap.getBounds()._min._lng;
    var lat2 = searchMap.getBounds()._max._lat;
    var lng2 = searchMap.getBounds()._max._lng;

    console.log(lat1);
    console.log(lng1);
    console.log(lat2);
    console.log(lng2);

    var query = {};
    query.state = 'open';
    query.locationLat1 = lat1;
    query.locationLat2 = lat2;
    query.locationLng1 = lng1;
    query.locationLng2 = lng2;

    $.ajax({
      url: window.server.url+'/getPlayByLocation',
      dataType: 'json',
      data : query,
      type: 'POST',
      cache: false,
      success: function (recievedData) {
        console.log(recievedData.Items);
        if (recievedData.Items !== undefined) {
          recievedData.Items.map(function (play) {
            if (play === null || play === undefined)
              return;

            var marker = new naver.maps.Marker({
              position: new naver.maps.LatLng(play.locationLat.S, play.locationLng.S),
              map: searchMap,
              icon: {
                content: [
                  '<img height="42" width="42" id='+play.index.S+' src='+play.playEventImage.S+' />',
                ].join(''),
                size: new naver.maps.Size(42, 42),
                anchor: new naver.maps.Point(21, 21),
              }
            });
            document.getElementById(play.index.S).addEventListener('click', function(){
              this._handlePlayInfoTouchTap(play);
            }.bind(this));
          }.bind(this));
        }
      }.bind(this),
      error: function (xhr, status, erro) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  _handlePlayInfoTouchTap : function(play) {
    console.log("_handlePlayInfoTouchTap");
    selectedPlay = play;
    this.context.router.transitionTo('play_info');
  },
});

Map.contextTypes = {
  router: React.PropTypes.func
};

module.exports = Map;
