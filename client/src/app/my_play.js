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

myPlayList = [];

var MyPlay = React.createClass({
  getInitialState: function() {
    return {
      playListData: myPlayList,
    };
  },

  componentWillMount: function () {
    console.log('myPlay componentWillMount called');
    console.log('window.myPlayListState is ', window.myPlayListState);

    if (document.user === undefined) {
      console.log("the user isn't logged yet");
      this.context.router.transitionTo('home');
      return;
    }

    if (window.myPlayListState === undefined || window.myPlayListState === "UpdateNeeded") {
      window.myPlayListState === "Updating";
      this.clearPlayList();
      this.getMyPlay();
    } else if (window.myPlayListState === "Updated"){
      this.setState({playListData: myPlayList});
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
        : window.myPlayListState === undefined || window.myPlayListState !== 'Updated' ?
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
          text={window.textSet.myPlay}
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
    console.log(myPlayList);
    console.log(myPlayList.length);

    this.refs.moreButton.showSpinner();
    if (myPlayList.length > 0) {
      this.getMyPlay(myPlayList[myPlayList.length-1].date.S);
    } else {
      this.getMyPlay(new Date().getTime().toString());
    }
  },

  getMyPlay: function(dateTime) {
    console.log('getPlay called');
    var query = {};
    var now = new Date().getTime();
    query.userId = document.user.id;
    query.date = dateTime ? dateTime : now;

    $.ajax({
      url: window.server.url+'/getMyPlay',
      dataType: 'json',
      data : query,
      type: 'POST',
      cache: false,
      success: function (recievedData) {
        console.log(recievedData.Items);
        if (recievedData.Items !== undefined) {
          myPlayList = myPlayList.concat(recievedData.Items);
          setTimeout( function() {
            if (this.refs.moreButton)
              this.refs.moreButton.showButton();
            window.myPlayListState = "Updated";
            this.setState({playListData: myPlayList});
          }.bind(this), 1000);
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
    myPlayList = [];
    this.setState({playListData: myPlayList});
  },

  _handleBackButtonTouchTap: function(e) {
    window.history.back();
  },
});

MyPlay.contextTypes = {
  router: React.PropTypes.func
};

module.exports = MyPlay;
