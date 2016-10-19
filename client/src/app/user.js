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

    return (
      <div style={styles.root}>
        <List>
          <ListItem
            primaryText="Jungo Kim"
            leftAvatar={<Avatar src="http://graph.facebook.com/834827176637705/picture?type=small" />} />
          <ListDivider />
          <ListItem primaryText={window.textSet.myPlay} leftIcon={<MyPlay />} />
          <ListItem primaryText={window.textSet.joinPlay} leftIcon={<JoinPlay />} />
          <ListDivider />
          <ListItem primaryText={window.textSet.logout} leftIcon={<Logout />} />
        </List>
      </div>
    );
  }
});

User.contextTypes = {
  router: React.PropTypes.func
};

module.exports = User;
