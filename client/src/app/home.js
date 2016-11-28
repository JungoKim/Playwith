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
  SelectField,
  Styles
} = require('material-ui');

var PlayList = require('./play_list.js');
var WriteButton = require('./write_button.js');
var MoreButton = require('./more-button.js');

playList = [];
sortedPlayList = [];
selectedPlay = playList[0];
lastEventValue = '1';
lastFilterValue = '1';

var Home = React.createClass({
  getInitialState: function() {
    return {
      playListData: playList,
      eventValue: lastEventValue,
      filterValue: lastFilterValue
    };
  },

  componentWillMount: function () {
    console.log('home componentWillMount called');
    console.log('window.playListState is ', window.playListState);

    this.eventItems = [ { payload: '1', text: '전체' }, ];
      for (var i = 1; i <= window.sportsEvent.length; i++) {
        this.eventItems[i] = { payload: (i+1)+'', text: window.sportsEvent[i-1] };
    }

    this.filterItems = [
      { payload: '1', text: '시간순' },
      { payload: '2', text: '거리순' },
    ];

    if (window.playListState === undefined || window.playListState === "UpdateNeeded") {
      playList = [];
      sortedPlayList = [];
      this.getPlay();
    } else if (window.playListState === "Updated"){
      if (this.state.filterValue === '1')
        this.setState({playListData: playList});
      else
        this.setState({playListData: sortedPlayList});
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
      selectFieldContainer:{
        width: 'calc(100% - 30px)',
        height: 80,
        marginLeft: 15,
        marginRight: 15,
      },
      eventSelectField: {
        width : 'calc(50% - 15px)',
        marginRight: 30,
        fontSize : 14,
      },
      filterSelectField: {
        width : 'calc(50% - 15px)',
        fontSize : 14,
      },
    };

    return (
      <div style={styles.root}>
        <div style={styles.selectFieldContainer}>
          <SelectField
            ref="eventSelectField"
            style={styles.eventSelectField}
            value={this.state.eventValue}
            floatingLabelText={window.textSet.eventSelect}
            onChange={this._handleEventSelectValuechange.bind(null, 'eventValue')}
            menuItems={this.eventItems} />
          <SelectField
            ref="filterSelectField"
            style={styles.filterSelectField}
            value={this.state.filterValue}
            floatingLabelText={window.textSet.filterSelect}
            onChange={this._handleFilterSelectValuechange.bind(null, 'filterValue')}
            menuItems={this.filterItems} />
        </div>
        <PlayList
          data={this.state.playListData} />
        <MoreButton
          ref='moreButton'
          onTouchTap={this._handleMoreButtonTouchTap} />
        <WriteButton />
      </div>
    );
  },
  _handleMoreButtonTouchTap: function() {
    console.log("handleMoreButtonTouchTap");
    console.log(playList);
    console.log(playList.length);

    this.refs.moreButton.showSpinner();
    if (playList.length > 0) {
      if (this.state.eventValue === '1')
        this.getPlay(playList[playList.length-1].playDate.S);
      else
        this.getPlayByEvent(this.getEvent(), playList[playList.length-1].playDate.S);
    } else {
      if (this.state.eventValue === '1')
        this.getPlay(new Date().getTime().toString());
      else
        this.getPlayByEvent(this.getEvent(), new Date().getTime().toString());
    }
  },
  getPlay: function(dateTime) {
    console.log('getPlay called');
    var query = {};
    var now = new Date().getTime();
    query.state = 'open';
    query.playDate = dateTime ? dateTime : now;

    $.ajax({
      url: window.server.url+'/getPlay',
      dataType: 'json',
      data : query,
      type: 'POST',
      cache: false,
      success: function (recievedData) {
        console.log(recievedData.Items);
        if (recievedData.Items !== undefined) {
          playList = playList.concat(recievedData.Items);
          this.sortPlaylistByDistance();
          setTimeout( function() {
            if (this.state.filterValue === '1')
              this.setState({playListData: playList});
            else
              this.setState({playListData: sortedPlayList});
          }.bind(this), 1000);
        }
        window.playListState = "Updated";
        setTimeout( function() {
          this.refs.moreButton.showButton();
        }.bind(this), 1000);
      }.bind(this),
      error: function (xhr, status, erro) {
        this.refs.moreButton.showButton();
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getPlayByEvent: function(playEvent, dateTime) {
    console.log('getPlay called');
    var query = {};
    var now = new Date().getTime();
    query.playEvent = playEvent;
    query.playDate = dateTime ? dateTime : now;

    $.ajax({
      url: window.server.url+'/getPlayByEvent',
      dataType: 'json',
      data : query,
      type: 'POST',
      cache: false,
      success: function (recievedData) {
        console.log(recievedData.Items);
        if (recievedData.Items !== undefined) {
          playList = playList.concat(recievedData.Items);
          this.sortPlaylistByDistance();
          setTimeout( function() {
            if (this.state.filterValue === '1')
              this.setState({playListData: playList});
            else
              this.setState({playListData: sortedPlayList});
          }.bind(this), 1000);
        }
        window.playListState = "Updated";
        setTimeout( function() {
          this.refs.moreButton.showButton();
        }.bind(this), 1000);
      }.bind(this),
      error: function (xhr, status, erro) {
        this.refs.moreButton.showButton();
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  _handleEventSelectValuechange: function(name, e) {
    var change = {};
    change[name] = e.target.value;
    playList = [];
    sortedPlayList = [];
    if (e.target.value === '1') {
      this.getPlay(new Date().getTime().toString());
    } else {
      this.getPlayByEvent(this.eventItems[parseInt(e.target.value)-1].text, new Date().getTime().toString());
    }
    lastEventValue = e.target.value;
    this.setState(change);
  },

  _handleFilterSelectValuechange: function(name, e) {
    var change = {};
    change[name] = e.target.value;
    console.log(e.target.value);
    if (e.target.value === '1') {
      change['playListData'] = playList;
    } else {
      change['playListData'] = sortedPlayList;
    }
    lastFilterValue  = e.target.value;
    this.setState(change);
  },

  getEvent: function() {
    return this.eventItems[parseInt(this.state.eventValue)-1].text;
  },

  getFilter: function() {
    return this.filterItems[parseInt(this.state.filterValue)-1].text.replace(" ", "");
  },

  sortPlaylistByDistance() {
    sortedPlayList = playList.slice();
    sortedPlayList.sort(function(a, b) {
      return window.calcDistKM(a.locationLat.S, a.locationLng.S) - window.calcDistKM(b.locationLat.S, b.locationLng.S);
    });
  },

});

Home.contextTypes = {
  router: React.PropTypes.func
};

module.exports = Home;
