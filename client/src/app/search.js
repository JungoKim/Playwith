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

var SearchMiniButtion = require('./svg/search_mini_button.js');
var PlayList = require('./play_list.js');

searchList = [];

var Search = React.createClass({
  getInitialState: function() {
    return {
      result : '',
      searchListData:[],
    };
  },

  componentDidMount: function () {
    this.refs.searchField.focus();
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
      textFieldStyle: {
        width: 'calc(100% - 66px)',
        float: 'left',
        marginLeft: 15,
      },
      sendButtonStyle: {
        float: 'left',
      }
    };

    return (
      <div style={styles.root}>
        <div>
          <TextField
            ref="searchField"
            style={styles.textFieldStyle}
            onChange={this._handleInputChange}
            onEnterKeyDown={this._handleEnterKeyDown}
            hintStyle={{fontSize : 13}}
            hintText={window.textSet.search}
            underlineFocusStyle={{borderColor: Colors.grey500}}
            multiLine={false} />
          <IconButton
            style={styles.sendButtonStyle}
            tooltip={window.textSet.doSearch}
            onTouchTap={this._handleSearchButtonTouchTap} >
            <SearchMiniButtion />
          </IconButton>
        </div>
        <PlayList 
          data={this.state.searchListData} />
        <Snackbar
          ref="snackbar"
          autoHideDuration={1500}
          message={this.state.result} />
      </div>
    );
  },
  _handleInputChange: function(e) {
  },
  _handleEnterKeyDown: function(e) {
  },
  _handleSearchButtonTouchTap: function(e) {
  },
});

Search.contextTypes = {
  router: React.PropTypes.func
};

module.exports = Search;
