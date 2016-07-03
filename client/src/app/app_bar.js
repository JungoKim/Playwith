var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var { IconButton } = require('material-ui');

var HomeBlack = require('./icon/home_black.js');
var HomeGray = require('./icon/home_gray.js');
var SearchBlack = require('./icon/search_black.js');
var SearchGray = require('./icon/search_gray.js');
var MapBlack = require('./icon/map_black.js');
var MapGray = require('./icon/map_gray.js');
var UserBlack = require('./icon/user_black.js');
var UserGray = require('./icon/user_gray.js');

var AppBar = React.createClass({
  getInitialState: function() {
    return {
      appBarButtonSelect : 'home',
    };
  },

  render: function() {
    var styles = {
      appBar: {
        backgroundColor: '#fafafa',
        position: 'fixed',
        height: 48,
        top: 0,
        right: 0,
        zIndex: 4,
        width: '100%'
      },
      appBarIconButton: {
        marginLeft : "calc((100% - 48px)/2)",
        padding : 8,
      },
      appBarIconButtonContainer: {
        width: '25%',
        float: 'left',
      }
    };

    var HomeButton = this.state.appBarButtonSelect === "home" ? <HomeBlack /> : <HomeGray />;
    var SearchButton = this.state.appBarButtonSelect === "search" ? <SearchBlack /> : <SearchGray />;
    var MapButton = this.state.appBarButtonSelect === "map" ? <MapBlack /> : <MapGray />;
    var UserButton = this.state.appBarButtonSelect === "user" ? <UserBlack /> : <UserGray />;

    return (
      <div style={styles.appBar}>
        <div style={styles.appBarIconButtonContainer}>
          <IconButton
            style={styles.appBarIconButton}
            onTouchTap={this.handleAppBarHomeButtonTouchTap} >
            {HomeButton}
          </IconButton>
        </div>
        <div style={styles.appBarIconButtonContainer}>
          <IconButton
            style={styles.appBarIconButton}
            onTouchTap={this.handleAppBarSearchButtonTouchTap} >
            {SearchButton}
          </IconButton>
        </div>
        <div style={styles.appBarIconButtonContainer}>
          <IconButton
            style={styles.appBarIconButton}
            onTouchTap={this.handleAppBarMapButtonTouchTap} >
            {MapButton}
          </IconButton>
        </div>
        <div style={styles.appBarIconButtonContainer}>
          <IconButton
           style={styles.appBarIconButton}
            onTouchTap={this.handleAppBarUserButtonTouchTap} >
            {UserButton}
          </IconButton>
        </div>
      </div>
    );
  },

  handleAppBarHomeButtonTouchTap : function() {
    console.log(this.state.appBarButtonSelect);
    this.setState({appBarButtonSelect : 'home'});
    this.context.router.transitionTo('home');
  },

  handleAppBarSearchButtonTouchTap : function() {
    this.setState({appBarButtonSelect : 'search'});
    this.context.router.transitionTo('search');
  },

  handleAppBarMapButtonTouchTap : function() {
    this.setState({appBarButtonSelect : 'map'});
    this.context.router.transitionTo('map');
  },

  handleAppBarUserButtonTouchTap : function() {
    this.setState({appBarButtonSelect : 'user'});
    this.context.router.transitionTo('user');
  },

});

AppBar.contextTypes = {
  router: React.PropTypes.func
};

module.exports = AppBar;
