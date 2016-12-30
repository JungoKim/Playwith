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
var LoginSel = require('./login_select.js');

var chatUpdater;

var Chat = React.createClass({
  getInitialState: function() {
    return {
      chatListData:[],
      snackbarOpen : false,
      snackbarMsg : "",
      dialOpen : false,
    };
  },
  componentWillMount: function () {
    console.log('Chat componentWillMount called');
    var origin = new Date(0).getTime();
    var now = new Date().getTime();
    this.getComment(origin, now);

    this.addComentSent = false;
    this.getComentSent = false;
  },

  componentWillUnmount: function () {
    if (chatUpdater)
      clearInterval(chatUpdater);
  },

  componentDidMount: function () {
    if (chatUpdater)
      clearInterval(chatUpdater);

    chatUpdater = setInterval( function(){
      if (this.state.getComentSent === true)
        return;
      var origin = new Date(0).getTime();
      if (this.state.chatListData.length > 0) {
        origin = parseFloat(this.state.chatListData[0].date.S) + 1;
      }
      var now = new Date().getTime();
      this.getComment(origin, now);
    }.bind(this), 10000);
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
        </div>
        <LoginSel
          openstate={this.state.dialOpen}
          close={this._loginClose}>
        </LoginSel>
        <Snackbar
          ref="snackbar"
          open={this.state.snackbarOpen}
          onRequestClose={this._handleSnackBarClose}
          message={this.state.snackbarMsg}
          autoHideDuration={1500} />
      </div>
    );
  },

  _loginOpen: function() {
    this.setState({dialOpen: true});
  },

  _loginClose: function(joinInfo) {
    this.setState({dialOpen: false});
  },

  _handleSnackBarClose: function() {
     this.setState({snackbarOpen: false});
  },

  _handleInputChange: function(e) {
  },

  _handleEnterKeyDown: function(e) {
    console.log("chat text : " + this.refs.chatField.getValue());
    if (document.user !== undefined) {
      console.log('_handleEnterKeyDown');
      var commentInfo = {};
      commentInfo.playusIndex = selectedPlay.index.S;
      commentInfo.userId = document.user.id;
      commentInfo.user = document.user.id+'__'+document.user.name+'__'+document.user.profile_image;
      commentInfo.comment = this.refs.chatField.getValue();
      this.addComment(commentInfo);
    }
    else {
      this._loginOpen();
    }
  },

  _handleSendButtonTouchTap: function(e) {
    if (!this.refs.chatField.getValue()) {
      this.setState({snackbarOpen: true, snackbarMsg: "댓글을 입력해주세요~!"});
      return;
    }

    if (document.user !== undefined) {
      console.log('_handleEnterKeyDown');
      var commentInfo = {};
      commentInfo.playusIndex = selectedPlay.index.S;
      commentInfo.userId = document.user.id;
      commentInfo.user = document.user.id+'__'+document.user.name+'__'+document.user.profile_image;
      commentInfo.comment = this.refs.chatField.getValue();
      this.addComment(commentInfo);
    }
    else {
      this._loginOpen();
    }
  },

  _handleMoreButtonTouchTap: function() {
  },

  addComment: function(commentInfo) {
    console.log('addComment called');

    if (this.addComentSent === true) {
      console.log('cancel duplicate call');
      return;
    }

    this.addComentSent = true;
    var url = window.server.url+'/addComment';

    console.log(commentInfo);

    $.ajax({
      url: url,
      dataType: 'json',
      type: 'POST',
      data: commentInfo,
      success: function (res) {
        console.log(res);
        if (res == '{"result" : "New comment created"}') {
          var origin = new Date(0).getTime();
          if (this.state.chatListData.length > 0) {
            origin = parseFloat(this.state.chatListData[0].date.S) + 1;
          }
          var now = new Date().getTime();
          this.getComment(origin, now);

          this.refs.chatField.clearValue();
        }
        this.addComentSent = false;
      }.bind(this),
      error: function (xhr, status, err) {
        this.setState({snackbarOpen: true, snackbarMsg: "댓글 생성을 실패하였습니다"});
        this.addComentSent = true;
      }.bind(this),
    });
  },

  getComment: function(dateStart, dateEnd) {
    console.log('getComment called');

    if (this.getComentSent === true) {
      console.log('cancel duplicate call');
      return;
    }

    this.getComentSent = true;
    var query = {};
    var now = new Date().getTime();
    query.playusIndex = selectedPlay.index.S;
    query.dateStart = dateStart;
    query.dateEnd = dateEnd;

    $.ajax({
      url: window.server.url+'/getComment',
      dataType: 'json',
      data : query,
      type: 'POST',
      cache: false,
      success: function (recievedData) {
        console.log(recievedData.Items);
        if (recievedData.Items !== undefined) {
          chatList = recievedData.Items;
          chatList = chatList.concat(this.state.chatListData);
          this.setState({chatListData: chatList});
        }
        this.getComentSent = false;
      }.bind(this),
      error: function (xhr, status, erro) {
        console.log(this.props.url, status, err.toString());
        this.getComentSent = false;
      }.bind(this)
    });
  },
});

Chat.contextTypes = {
  router: React.PropTypes.func
};

module.exports = Chat;
