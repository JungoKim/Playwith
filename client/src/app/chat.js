var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var mui = require('material-ui');

var {
  Card,
  CircularProgress,
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

var Enter = require('./svg/enter.js');
var MoreButton = require('./more-button.js');
var ChatList = require('./chat_list.js');

chatListDataTest = [
  {
    "index" : { "S": "1" },
    "playusIndex" : { "S": "1" },
    "date" : { "S": "1일 전" },
    "user" : { "S": "1156050951181991__김정오__https://graph.facebook.com/1156050951181991/picture?type=small" },
    "comment" : { "S": "test 1test 1test 1test 1test 1test 1test 1test 1test 1test 1test 1test 1test 1test 1test 1test 1test 1test 1test 1test 1test 1test 1test 1" },
  },
  {
    "index" : { "S": "2" },
    "playusIndex" : { "S": "1" },
    "date" : { "S": "59초 전" },
    "user" : { "S": "1156050951181991__김정오__https://graph.facebook.com/1156050951181991/picture?type=small" },
    "comment" : { "S": "test 2" },
  },
  {
    "index" : { "S": "3" },
    "playusIndex" : { "S": "1" },
    "date" : { "S": "12달 전" },
    "user" : { "S": "1156050951181991__김정오__https://graph.facebook.com/1156050951181991/picture?type=small" },
    "comment" : { "S": "test 3" },
  },
];

var Chat = React.createClass({
  getInitialState: function() {
    return {
      chatListData:[],
      snackbarOpen : false,
      snackbarMsg : "",
      showSpinner : false
    };
  },
  componentWillMount: function () {
    console.log('Search componentWillMount called');
    this.setState({chatListData: chatListDataTest});
  },

  componentDidMount: function () {
  },

  render: function() {
    var styles = {
      root: {
        padding: 10,
        marginLeft: 'auto',
        marginRight: 'auto',
        width: 'calc(100% - 20px)',
        maxWidth : 650,
      },
      textFieldStyle: {
        width: 'calc(100% - 66px)',
        marginLeft: 15,
      },
      sendButtonStyle: {
        top : 7
      },
      chatListContainer: {
      },
      spinner: {
        margin: '-10px auto',
        display: 'block',
        marginTop: 5,
        paddingRight: 10
      },
    };

    var moreButton = this.state.chatListData.length > 0 ?
      <FlatButton
        style={{width: '100%'}}
        ref='moreButton'
        label={window.textSet.more}
        onTouchTap={this._handleMoreButtonTouchTap} />
      : null;

    var spinner = this.state.showSpinner === true ?
      <CircularProgress
        style={styles.spinner}
        mode="indeterminate"
        color={Colors.cyan400}
        size={0.5} />
      : null;

    return (
      <div style={styles.root}>
        <div>
          <TextField
            ref="chatField"
            style={styles.textFieldStyle}
            onChange={this._handleInputChange}
            onEnterKeyDown={this._handleEnterKeyDown}
            hintStyle={{fontSize : 13}}
            hintText={window.textSet.comment}
            underlineFocusStyle={{borderColor: Colors.grey500}}
            multiLine={false} />
          <IconButton
            style={styles.sendButtonStyle}
            tooltip={window.textSet.comment}
            onTouchTap={this._handleSendButtonTouchTap} >
            <Enter />
          </IconButton>
        </div>
        <div style={styles.chatListContainer}>
          <ChatList
            data={this.state.chatListData} />
          {moreButton}
          {spinner}
        </div>
        <Snackbar
          ref="snackbar"
          open={this.state.snackbarOpen}
          onRequestClose={this._handleSnackBarClose}
          message={this.state.snackbarMsg}
          autoHideDuration={1500} />
      </div>
    );
  },

  _handleSnackBarClose: function() {
     this.setState({snackbarOpen: false});
  },

  _handleInputChange: function(e) {
  },

  _handleEnterKeyDown: function(e) {
    console.log("chat text : " + this.refs.chatField.getValue());
  },

  _handleSendButtonTouchTap: function(e) {
    console.log("chat text : " + this.refs.chatField.getValue());
  },

  _handleMoreButtonTouchTap: function() {
  },
});

Chat.contextTypes = {
  router: React.PropTypes.func
};

module.exports = Chat;
