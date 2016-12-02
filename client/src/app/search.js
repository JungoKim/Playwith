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

var SearchMiniButtion = require('./svg/search_mini_button.js');
var PlayList = require('./play_list.js');
var MoreButton = require('./more-button.js');

searchPlayList = [];
lastSearchTag = "";

var Search = React.createClass({
  getInitialState: function() {
    return {
      playListData:[],
      snackbarOpen : false,
      snackbarMsg : "",
      showSpinner : false
    };
  },
  componentWillMount: function () {
    console.log('Search componentWillMount called');
    this.setState({playListData: searchPlayList});
  },

  componentDidMount: function () {
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
        marginLeft: 15,
      },
      sendButtonStyle: {
        top : 7
      },
      playListContainer: {
      },
      spinner: {
        margin: '-10px auto',
        display: 'block',
        marginTop: 5,
        paddingRight: 10
      },
    };

    var moreButton = this.state.playListData.length > 0 ?
      <MoreButton
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
        <div style={styles.playListContainer}>
          <PlayList
            data={this.state.playListData} />
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
    console.log("search text : " + this.refs.searchField.getValue());
    if (this.refs.searchField.getValue().length < 1) {
      this.setState({snackbarOpen: true, snackbarMsg: "검색어를 입력해주세요."});
      return;
    }
    this.setState({showSpinner: true});
    this.clearPlayList();
    lastSearchTag = this.refs.searchField.getValue();
    this.getPlayByTag(lastSearchTag);
  },

  _handleSearchButtonTouchTap: function(e) {
    console.log("search text : " + this.refs.searchField.getValue());
    if (this.refs.searchField.getValue().length < 1) {
      this.setState({snackbarOpen: true, snackbarMsg: "검색어를 입력해주세요."});
      return;
    }
    this.setState({showSpinner: true});
    this.clearPlayList();
    lastSearchTag = this.refs.searchField.getValue();
    this.getPlayByTag(lastSearchTag);
  },

  getPlayByTag: function(tag, dateTime) {
    console.log('getPlay called');
    var query = {};
    var now = new Date().getTime();
    query.tag = '#'+tag;
    query.date = dateTime ? dateTime : now;

    $.ajax({
      url: window.server.url+'/getPlayByTag',
      dataType: 'json',
      data : query,
      type: 'POST',
      cache: false,
      success: function (recievedData) {
        console.log(recievedData);
        if (recievedData !== undefined) {
          if (recievedData.Count === 0) {
            setTimeout( function() {
              if (this.refs.moreButton) {
                this.refs.moreButton.showButton();
                this.setState({showSpinner: false});
              } else {
                this.setState({showSpinner: false, snackbarOpen: true, snackbarMsg: "검색된 Play가 없습니다."});
              }
            }.bind(this), 1000);
          } else if (recievedData.Items) {
            searchPlayList = searchPlayList.concat(recievedData.Items);
            setTimeout( function() {
              if (this.refs.moreButton)
                this.refs.moreButton.showButton();
              this.setState({showSpinner: false, playListData: searchPlayList});
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
    searchPlayList = [];
    this.setState({playListData: searchPlayList});
  },

  _handleMoreButtonTouchTap: function() {
    console.log("handleMoreButtonTouchTap");
    console.log(searchPlayList);
    console.log(searchPlayList.length);

    this.refs.moreButton.showSpinner();
    if (searchPlayList.length > 0) {
      this.getPlayByTag(lastSearchTag, searchPlayList[searchPlayList.length-1].date.S);
    } else {
      this.getPlayByTag(lastSearchTag, new Date().getTime().toString());
    }
  },
});

Search.contextTypes = {
  router: React.PropTypes.func
};

module.exports = Search;
