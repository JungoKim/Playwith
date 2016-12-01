var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var {
  Avatar,
  List,
  ListItem,
  ListDivider,
  CircularProgress
} = require('material-ui');

var MyPlay = require('./svg/my_play.js');
var JoinPlay = require('./svg/join_play.js');
var Logout = require('./svg/logout.js');

var User = React.createClass({

  componentWillMount: function () {
    if (document.user === undefined) {
      console.log("the user isn't logged yet");
      this.context.router.transitionTo('home');
      return;
    }
  },

  componentDidMount: function () {
  },

  componentWillUpdate: function(nextProps, nextState) {
  },

  render: function() {
    var styles = {
      root: {
        marginTop: 48,
        marginLeft: 'auto',
        marginRight: 'auto',
        width: "100%",
        maxWidth : 650,
      },
    };

    var userName = document.user.name;
    var profile = document.user.profile_image;

    return (
      <div style={styles.root}>
        <List>
          <ListItem
            primaryText={userName}
            leftAvatar={<Avatar src={profile} />} />
          <ListDivider />
          <ListItem
            onTouchTap={this._handleMyPlay}
            primaryText={window.textSet.myPlay}
            leftIcon={<MyPlay />} />
          <ListItem
            onTouchTap={this._handleJoinPlay}
            primaryText={window.textSet.joinPlay}
            leftIcon={<JoinPlay />} />
          <ListDivider />
          <ListItem
            primaryText={window.textSet.logout}
            leftIcon={<Logout />}
            onTouchTap={this._handleLogOut} />
        </List>
      </div>
    );
  },

  _handleLogOut: function() {
    console.log('FB Logout Click');
    this.context.router.transitionTo('home');
    FB.logout(function(response) {
      console.log(response);
    }.bind(this));
  },

  _handleMyPlay: function() {
    console.log('_handleMyPlay Click');
    this.context.router.transitionTo('my_play');
  },

  _handleJoinPlay: function() {
    console.log('_handleMyPlay Click');
    this.context.router.transitionTo('join_play');
  },
});

User.contextTypes = {
  router: React.PropTypes.func
};

module.exports = User;
