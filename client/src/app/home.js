var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var mui = require('material-ui');
var {Colors, Spacing, Typography} = mui.Styles;

var {
  Avatar,
  List,
  ListItem,
  ListDivider,
  CircularProgress
} = require('material-ui');

var SelectTarget = require('./select_target.js');
var PlayList = require('./play_list.js');

var Home = React.createClass({

  render: function() {
    var styles = {
      root: {
        marginTop: 48,
        marginLeft: 'auto',
        marginRight: 'auto',
        width: "100%",
        maxWidth : 650,
      }
    };

    return (
      <div style={styles.root}>
        <SelectTarget />
        <PlayList />
      </div>
    );
  }
});

Home.contextTypes = {
  router: React.PropTypes.func
};

module.exports = Home;
