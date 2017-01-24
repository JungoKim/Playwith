var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var mui = require('material-ui');

var {
  CircularProgress,
  RaisedButton } = mui;

var {Colors, Spacing, Typography} = mui.Styles;

var searchMap;
var searchMapPlayList = [];
searchMapCenterLat = 0;
searchMapCenterLng = 0;
searchMapZoom = 6;

var Map = React.createClass({
  getInitialState: function() {
    return {
      showSpinner : false,
    };
  },

  componentWillMount: function () {
    console.log("componentWillMount");

    if (!searchMapCenterLat)
      searchMapCenterLat = window.curLat;

    if (!searchMapCenterLng)
      searchMapCenterLng = window.curLng;

    searchMapPlayList = [];
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
      },
      spinner : {
        position : 'fixed',
        bottom: 25,
        left: (window.innerWidth-40)/2
      }
    };

    var searchButton = this.state.showSpinner === true ?
          <CircularProgress
            style={styles.spinner}
            mode="indeterminate"
            color={Colors.pink400}
            size={0.5} />
          : <RaisedButton
              label={window.textSet.searchInArea}
              style={styles.searchButton}
              onTouchTap={this._handleSearchButtonTouchTap}
              primary={true} />;

    return (
      <div>
        <div id='map' style={styles.root}>
        </div>
       {searchButton}
      </div>
    );
  },

  createMap: function() {
    var mapOptions = {
      center: new naver.maps.LatLng(searchMapCenterLat, searchMapCenterLng),
       zoom: searchMapZoom
    };
    searchMap = new naver.maps.Map('map', mapOptions);

    naver.maps.Event.addListener(searchMap, 'bounds_changed', function(bounds) {
      console.log('bounds_changed');
      searchMapCenterLat = searchMap.getCenter()._lat;
      searchMapCenterLng = searchMap.getCenter()._lng;
    });

    naver.maps.Event.addListener(searchMap, 'zoom_changed', function(zoom) {
      console.log('zoom_changed');
      searchMapZoom = zoom;
    });
  },
  _handleSearchButtonTouchTap: function() {
    this.getPlayByLocation();
  },
  getPlayByLocation : function() {
    console.log(searchMap.getBounds());

    this.setState({showSpinner: true});

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

            if (searchMapPlayList.find(function(obj){return obj.index.S === play.index.S}) !== undefined) {
              return;
            } else {
              searchMapPlayList.push(play);
            }

            var marker = new naver.maps.Marker({
              position: new naver.maps.LatLng(play.locationLat.S, play.locationLng.S),
              map: searchMap,
              icon: {
                content: [
                  '<img height="42" style="z-index:100" width="42" id='+play.index.S+' src='+play.playEventImage.S+' />',
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
        setTimeout( function() {
          this.setState({showSpinner: false});
        }.bind(this), 1000);
      }.bind(this),
      error: function (xhr, status, erro) {
        console.error(this.props.url, status, err.toString());
        setTimeout( function() {
          this.setState({showSpinner: false});
        }.bind(this), 1000);
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
