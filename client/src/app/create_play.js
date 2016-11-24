var React = require('react');
var Router = require('react-router');

var mui = require('material-ui');
var { Card,
  CardHeader,
  CardText,
  CardActions,
  Avatar,
  DatePicker,
  TimePicker,
  FlatButton,
  IconButton,
  TextField,
  Toolbar,
  ToolbarGroup,
  ToolbarTitle,
  SelectField,
  Snackbar,
  RaisedButton } = mui;

var { Colors, Spacing, Typography } = mui.Styles;

var Back = require('./svg/back.js');
var LocationIcon = require('./svg/location_icon.js');
var TimeIcon = require('./svg/time_icon.js');
var MapLocation = require('./svg/map_location.js');

var selectMap;
var selectLat;
var selectLng;
var selectDate;
var selectTime;

var CreatePlay = React.createClass({

  getInitialState: function() {
    return {
      sent : false,
      gameValue: '1',
      maxMemberValue: '1',
      timeValue: null,
      dateValue: null,
      mapSelectText : window.textSet.mapSelect,
      snackbarOpen : false,
      snackbarMsg : ""
    };
  },

  componentWillMount: function () {
    if (document.user === undefined) {
      console.log("the user isn't logged yet");
      this.context.router.transitionTo('home');
      return;
    }

    this.gameItems = [];
    for (var i = 0; i < window.sportsClass.length; i++) {
      this.gameItems[i] = { payload: (i+1)+'', text: window.sportsClass[i] };
    }

    this.maxMemberItems = [];
    for (var i = 0; i < 49; i++) {
      this.maxMemberItems[i] = { payload: (i+1)+'', text: (i+2)+'명' };
    }
  },

  componentDidMount: function () {

    var mapOptions = {
      center: new naver.maps.LatLng(window.curLat, window.curLng),
      zoom: 7
    };
    selectMap = new naver.maps.Map('searchInMap', mapOptions);
  },

  componentWillUpdate: function(nextProps, nextState) {
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
      createButton: {
        margin:'6px 0px 0px 0px',
      },
      card: {
        margin: 5
      },
      cardTitleText: {
        fontSize: 16,
        height: 40,
        paddingTop: 14
      },
      cardText: {
        paddingTop: 8,
        paddingBottom: 0,
        fontSize: 15
      },
      descriptionCardText: {
        paddingTop: 8,
        paddingBottom: 0,
        fontSize: 15,
        marginTop: -26
      },
      locationCardText: {
        paddingTop: 8,
        paddingBottom: 0,
        fontSize: 15,
        overflow: 'hidden'
      },
      lastCardText: {
        paddingTop: 8,
        paddingBottom: 8,
        fontSize: 15,
        overflow: 'auto'
      },
      gameSelectField: {
        width : 'calc(50% - 15px)',
        marginRight: 30,
      },
      maxMemberSelectField: {
        width : 'calc(50% - 15px)',
      },
      descriptionTextField: {
        width : "100%",
      },
      locationTextField: {
        width : "calc(100% - 100px)",
        float: 'left',
      },
      mapSelectText: this.state.mapSelectText == window.textSet.mapSelect ?
      {
        fontSize: 11,
        marginTop : -16,
        textAlign: 'center',
        color:"rgba(0,0,0,0.3)"
      }
      : {
        fontSize: 11,
        marginTop : -16,
        textAlign: 'center',
        color: Colors.black
      },
      datePicker: {
        width : 'calc(50% - 15px)',
        marginRight: 30,
        float: 'left'
      },
      timePicker: {
        width : 'calc(50% - 15px)',
        float: 'left'
      },
      map : {
        width: 'calc(100% - 32px)',
        marginRight: 16,
        marginLeft: 16,
        marginBottom : 32,
        height: 400
      },
      searchButton : {
        position : 'absolute',
        top: 'calc(50% - 82px)',
        left: 'calc(50% - 54px)',
        zIndex: 2
      },
      mapMarker : {
        position : 'absolute',
        top: 'calc(50% - 48px)',
        left: 'calc(50% - 24px)',
        zIndex: 2,
      },
    };

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
            text={window.textSet.createPlay}
            style={styles.toolbarTitle} />
          <ToolbarGroup float="right">
            <RaisedButton
              label={window.textSet.create}
              secondary={true}
              style={styles.createButton}
              onTouchTap={this._handleCreateButtonTouchTap} />
          </ToolbarGroup>
        </Toolbar>
        <Card style={styles.card}>
          <CardText style={styles.cardText}>
            <SelectField
              ref="gameSelectField"
              style={styles.gameSelectField}
              maxHeight={300}
              value={this.state.gameValue}
              floatingLabelStyle={{color: "rgba(0,0,0,0.3)"}}
              floatingLabelText={window.textSet.gameSelect}
              onChange={this._handleSelectValuechange.bind(null, 'gameValue')}
              menuItems={this.gameItems} />
            <SelectField
              ref="maxMemberSelectField"
              style={styles.maxMemberSelectField}
              maxHeight={300}
              value={this.state.maxMemberValue}
              floatingLabelStyle={{color: "rgba(0,0,0,0.3)"}}
              floatingLabelText={window.textSet.maxMember}
              onChange={this._handleSelectValuechange.bind(null, 'maxMemberValue')}
              menuItems={this.maxMemberItems} />
          </CardText>
          <CardText style={styles.descriptionCardText}>
            <TextField
              style={styles.descriptionTextField}
              floatingLabelStyle={{color: "rgba(0,0,0,0.3)"}}
              underlineFocusStyle={{borderColor: Colors.grey500}}
              ref="descriptionField"
              rows={1}
              rowsMax={7}
              floatingLabelText={window.textSet.description}
              multiLine={true} />
          </CardText>
          <CardText style={styles.locationCardText}>
            <div>
              <TextField
                style={styles.locationTextField}
                floatingLabelStyle={{color: "rgba(0,0,0,0.3)"}}
                underlineFocusStyle={{borderColor: Colors.grey500}}
                ref="locationField"
                floatingLabelText={window.textSet.location}
                multiLine={false} />
              <div style={{float: 'left', width: 90, height: 70, marginTop: 4, marginLeft: 10}}>
                <IconButton
                  style={{width: 60, height: 60, marginLeft: 15}}
                  onTouchTap={this._handleSearchInMap} >
                  <MapLocation color="rgba(0,0,0,0.7)"/>
                </IconButton>
                <div
                  style={styles.mapSelectText}
                  ref="mapSelectText">
                  {this.state.mapSelectText}
                </div>
              </div>
            </div>
          </CardText>
          <CardText style={styles.lastCardText}>
            <DatePicker
              hintText={window.textSet.date}
              ref="datePicker"
              onChange={this._handleDatePickerChange}
              formatDate={this.formatDate}
              textFieldStyle={styles.datePicker} />
            <TimePicker
              format="ampm"
              onChange={this._handleTimePickerChange}
              hintText={window.textSet.time}
              ref="timePicker"
              textFieldStyle={styles.timePicker} />
          </CardText>
          {this.mapContainer}
          <div id='searchInMap' style={styles.map}>
            <RaisedButton
              label={window.textSet.mapSelect}
              style={styles.searchButton}
              onTouchTap={this._handleSearchInMapComplete}
              primary={true} />
            <img
              style={styles.mapMarker}
              src="./img/map_marker.png" />
          </div>
        </Card>
        <Snackbar
          ref="snackbar"
          open={this.state.snackbarOpen}
          onRequestClose={this._handleSnackBarClose}
          message={this.state.snackbarMsg}
          autoHideDuration={1500} />
      </div>
    );
  },
  _handleBackButtonTouchTap: function(e) {
    window.history.back();
  },

  _handleSelectValuechange: function(name, e) {
    var change = {};
    change[name] = e.target.value;
    this.setState(change);
  },

  getGame: function() {
    return this.gameItems[parseInt(this.state.gameValue)-1].text;
  },

  getMaxMember: function() {
    return this.maxMemberItems[parseInt(this.state.maxMemberValue)-1].text;
  },

  formatDate: function(date) {
    return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
  },

  _handleDatePickerChange: function(event, date) {
    selectDate = date;
  },

  _handleTimePickerChange: function(event, date) {
    selectTime = date;
  },

  _handleSearchInMap: function() {
    this.setState({mapSelectText : window.textSet.mapSelect});

    if (selectLat || selectLng) {
      this.setState({snackbarOpen: true, snackbarMsg: "지도에서 상세위치를 다시 선택해주세요"});
      return;
    }

    selectLat = null;
    selectLng = null;
    window.scrollTo(0, 200);
  },

  _handleSearchInMapComplete: function() {
    this.setState({mapSelectText : window.textSet.selectComplete, snackbarOpen: true, snackbarMsg: "해당 위치로 선택되었습니다"});
    selectLat = selectMap.getCenter()._lat;
    selectLng = selectMap.getCenter()._lng;
    console.log(selectLat+", "+selectLng);
    window.scrollTo(0, 0);
  },

  _handleCreateButtonTouchTap: function() {
    if (this.refs.descriptionField.getValue().length < 1) {
      this.setState({snackbarOpen: true, snackbarMsg: "설명을 입력하세요"});
      return;
    }

    if (this.refs.locationField.getValue().length < 1) {
      this.setState({snackbarOpen: true, snackbarMsg: "장소를 입력하세요"});
      return;
    }

    if (!selectLat || !selectLng) {
      this.setState({snackbarOpen: true, snackbarMsg: "지도에서 상세위치를 선택해주세요"});
      return;
    }

    if (!selectDate) {
      this.setState({snackbarOpen: true, snackbarMsg: "날짜를 입력해주세요"});
      return;
    }

    if (!selectTime) {
      this.setState({snackbarOpen: true, snackbarMsg: "시간을 입력해주세요"});
      return;
    }

    console.log(this.getGame());
    console.log(this.getMaxMember());
    console.log(this.refs.descriptionField.getValue());
    console.log(this.refs.locationField.getValue());
    console.log(selectLat + ", " + selectLng);

    var date = selectDate;
    date.setHours(selectTime.getHours());
    date.setMinutes(selectTime.getMinutes());

    console.log(date);
    console.log(date.getTime());

    var playInfo = {};
    playInfo.userId = "1471575141450";//document.user.id;
    playInfo.desc = this.refs.descriptionField.getValue().substring(0, 1000);
    playInfo.location = this.refs.locationField.getValue().substring(0, 1000);
    playInfo.locationLat = selectLat;
    playInfo.locationLng = selectLng;
    playInfo.playDate = date.getTime();
    playInfo.playEvent = this.getGame();
    playInfo.playEventImage = fineImagebyClass(playInfo.playEvent);
    playInfo.joinList = [ "https://graph.facebook.com/834827176637705/picture?type=small" ];
    playInfo.maxJoin = parseInt(this.getMaxMember().replace('명', ''));
    playInfo.profile = "https://graph.facebook.com/834827176637705/picture?type=small";//document.user.profile_image;

    this.createPlay(playInfo);
  },

  _handleSnackBarClose: function() {
     this.setState({snackbarOpen: false});
  },

  createPlay: function(playInfo) {
    console.log('createPlay called');

    if (this.state.sent === true) {
      console.log('cancel duplicate call');
      return;
    }

    this.setState({sent: true});
    var url = window.server.url+'/createPlay';

    console.log(playInfo);

    $.ajax({
      url: url,
      dataType: 'json',
      type: 'PUT',
      data: playInfo,
      success: function (res) {
        if (res.message === undefined) {
          this.setState({snackbarOpen: true, snackbarMsg: "새로운 Play를 생성하였습니다"});
          setTimeout(
            function(){
              this.context.router.transitionTo('home');
            }.bind(this)
            , 1000
          );
        }
        else {
          this.setState({snackbarOpen: true, snackbarMsg: "Play 생성을 실패하였습니다"});
        }
      }.bind(this),
      error: function (xhr, status, err) {
        this.setState({snackbarOpen: true, snackbarMsg: "Play 생성을 실패하였습니다"});
        this.setState({sent: false});
      }.bind(this),
    });
  },
});


CreatePlay.contextTypes = {
  router: React.PropTypes.func
};

module.exports = CreatePlay;
