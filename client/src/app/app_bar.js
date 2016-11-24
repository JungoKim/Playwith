var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var mui = require('material-ui');
var {Colors, Spacing, Typography} = mui.Styles;
var { IconButton } = require('material-ui');

var HomeButton = require('./svg/home_button.js');
var SearchButton = require('./svg/search_button.js');
var MapButton = require('./svg/map_button.js');
var UserButton = require('./svg/user_button.js');
var LoginSel = require('./login_select.js');

var AppBar = React.createClass({
  getInitialState: function() {
    return {
      appBarButtonSelect : window.location.href.split('/#/')[1],
      dialOpen : false,
    };
  },

  render: function() {
    var styles = {
      appBar: {
        backgroundColor: Colors.cyan400,
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

    var Home = this.state.appBarButtonSelect === "home" ? <HomeButton color="#ffffff" /> : <HomeButton color="#ffffff" opacity="0.4" />;
    var Map = this.state.appBarButtonSelect === "map" ? <MapButton color="#ffffff" /> : <MapButton color="#ffffff" opacity="0.4" />;
    var Search = this.state.appBarButtonSelect === "search" ? <SearchButton color="#ffffff" /> : <SearchButton color="#ffffff" opacity="0.4" />;
    var User = this.state.appBarButtonSelect === "user" ? <UserButton color="#ffffff" /> : <UserButton color="#ffffff" opacity="0.4" />;

    return (
      <div style={styles.appBar}>
        <div style={styles.appBarIconButtonContainer}>
          <IconButton
            style={styles.appBarIconButton}
            onTouchTap={this.handleAppBarHomeButtonTouchTap} >
            {Home}
          </IconButton>
        </div>
        <div style={styles.appBarIconButtonContainer}>
          <IconButton
            style={styles.appBarIconButton}
            onTouchTap={this.handleAppBarMapButtonTouchTap} >
            {Map}
          </IconButton>
        </div>
        <div style={styles.appBarIconButtonContainer}>
          <IconButton
            style={styles.appBarIconButton}
            onTouchTap={this.handleAppBarSearchButtonTouchTap} >
            {Search}
          </IconButton>
        </div>
        <div style={styles.appBarIconButtonContainer}>
          <IconButton
           style={styles.appBarIconButton}
            onTouchTap={this.handleAppBarUserButtonTouchTap} >
            {User}
          </IconButton>
        </div>
        <LoginSel
          openstate={this.state.dialOpen}
          close={this._loginClose}>
        </LoginSel>
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
    if (document.user !== undefined) {
      this.setState({appBarButtonSelect : 'user'});
      this.context.router.transitionTo('user');
    }
    else {
      this._loginOpen();
    }
  },

  _loginOpen: function() {
    this.setState({dialOpen: true});
  },

  _loginClose: function() {
    this.setState({dialOpen: false});
  },

});

AppBar.contextTypes = {
  router: React.PropTypes.func
};

module.exports = AppBar;
