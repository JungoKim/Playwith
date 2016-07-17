var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var mui = require('material-ui');

var {
  Card,
  FlatButton,
  IconButton,
  TextField,
  Paper,
  Snackbar,
  Toolbar,
  ToolbarGroup,
  ToolbarTitle,
  RaisedButton } = mui;
var { Colors, Spacing, Typography } = mui.Styles;

var PlayList = require('./play_list.js');

var Search = React.createClass({
  getInitialState: function() {
    return {
      result : '',
      data:[],
    };
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
      },
      textFieldStyle: {
        width: 'calc(100% - 30px)',
        marginLeft: 15,
        marginRight: 15,
      },
    };

    return (
      <div style={styles.root}>
        <TextField
            ref="searchField"
            style={styles.textFieldStyle}
            hintStyle={{fontSize : 13}}
            hintText="# 검색"
            underlineFocusStyle={{borderColor: Colors.grey500}}
            multiLine={false} />
        <PlayList />
        <Snackbar
          ref="snackbar"
          autoHideDuration={1500}
          message={this.state.result} />
      </div>
    );
  }
});

Search.contextTypes = {
  router: React.PropTypes.func
};

module.exports = Search;
