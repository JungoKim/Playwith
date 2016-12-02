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
  CircularProgress,
  IconButton,
  SelectField,
  Styles,
  Toolbar,
  ToolbarGroup,
  ToolbarTitle,
} = require('material-ui');

var Back = require('./svg/back.js');
var PlayList = require('./play_list.js');
var MoreButton = require('./more-button.js');

joinPlayList = [];

var JoinPlay = React.createClass({
  getInitialState: function() {
    return {
      playListData: joinPlayList,
    };
  },

  componentWillMount: function () {
    console.log('myPlay componentWillMount called');
    console.log('window.joinPlayListState is ', window.joinPlayListState);

    if (document.user === undefined) {
      console.log("the user isn't logged yet");
      this.context.router.transitionTo('home');
      return;
    }

    if (window.joinPlayListState === undefined || window.joinPlayListState === "UpdateNeeded") {
      window.joinPlayListState === "Updating";
      this.clearPlayList();
      this.getMyJoinPlay();
    } else if (window.joinPlayListState === "Updated"){
      this.setState({playListData: joinPlayList});
    }
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
      spinner: {
        margin: '-10px auto',
        display: 'block',
        marginTop: 5,
        paddingRight: 10
      },
      toolbar: {
        padding : '0px 10px 0px 10px',
        height: 48,
      },
      iconButton: {
        marginRight: 40,
      },
      toolbarTitle: {
        fontSize: 16,
        color: Colors.grey700,
        textAlign: 'center',
        width: 'calc(100% - 177px)',
        height:  48,
        paddingRight: 0,
        marginTop: -3,
      },
    };

    var moreButton = this.state.playListData.length > 0 ?
        <MoreButton
          ref='moreButton'
          label={window.textSet.more}
          onTouchTap={this._handleMoreButtonTouchTap} />
        : window.joinPlayListState === undefined || window.joinPlayListState !== 'Updated' ?
          <CircularProgress
            style={styles.spinner}
            mode="indeterminate"
            color={Colors.cyan400}
            size={0.5} />
          : <MoreButton
              ref='moreButton'
              label={window.textSet.refresh}
              onTouchTap={this._handleMoreButtonTouchTap} />;

    return (
      <div style={styles.root}>
        <Toolbar style={styles.toolbar}>
        <ToolbarGroup
          style={{marginLeft: -12}}
          firstChild={true}
          float="left" >
          <IconButton
            style={styles.iconButton}
            tooltip={window.textSet.back}
            onTouchTap={this._handleBackButtonTouchTap} >
            <Back />
          </IconButton>
        </ToolbarGroup>
        <ToolbarTitle
          text={window.textSet.joinPlay}
          style={styles.toolbarTitle} />
        </Toolbar>
        <PlayList
          data={this.state.playListData} />
        {moreButton}
      </div>
    );
  },

  _handleMoreButtonTouchTap: function() {
    console.log("handleMoreButtonTouchTap");
    console.log(joinPlayList);
    console.log(joinPlayList.length);

    this.refs.moreButton.showSpinner();
    if (joinPlayList.length > 0) {
      this.getMyJoinPlay(joinPlayList[joinPlayList.length-1].date.S);
    } else {
      this.getMyJoinPlay(new Date().getTime().toString());
    }
  },

  getMyJoinPlay: function(dateTime) {
    console.log('getPlay called');
    var query = {};
    var now = new Date().getTime();
    query.userId = document.user.id;
    query.date = dateTime ? dateTime : now;

    $.ajax({
      url: window.server.url+'/getMyJoinPlay',
      dataType: 'json',
      data : query,
      type: 'POST',
      cache: false,
      success: function (recievedData) {
        console.log(recievedData);
        if (recievedData !== undefined) {
          if (recievedData.Items) {
            joinPlayList = joinPlayList.concat(recievedData.Items);
            setTimeout( function() {
              if (this.refs.moreButton)
                this.refs.moreButton.showButton();
              window.joinPlayListState = "Updated";
              this.setState({playListData: joinPlayList});
            }.bind(this), 1000);
          }
        }
      }.bind(this),
      error: function (xhr, status, erro) {
        if (this.refs.moreButton)
          this.refs.moreButton.showButton();
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  clearPlayList: function() {
    joinPlayList = [];
    this.setState({playListData: joinPlayList});
  },

  _handleBackButtonTouchTap: function(e) {
    window.history.back();
  },
});

JoinPlay.contextTypes = {
  router: React.PropTypes.func
};

module.exports = JoinPlay;
