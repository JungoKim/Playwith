var React = require('react');
var Router = require('react-router');

var mui = require('material-ui');
var { Card,
  CardHeader,
  CardText,
  CardActions,
  Avatar,
  FlatButton,
  IconButton,
  TextField,
  Toolbar,
  ToolbarGroup,
  ToolbarTitle,
  Snackbar,
  RaisedButton } = mui;

var { Colors, Spacing, Typography } = mui.Styles;

var Back = require('./svg/back.js');
var LocationIcon = require('./svg/location_icon.js');
var TimeIcon = require('./svg/time_icon.js');
var LoginSel = require('./login_select.js');

var PlayInfo = React.createClass({

  getInitialState: function() {
    return {
      playInfoData : selectedPlay,
      dialOpen : false,
      joinPlaySent : false,
      editPlaySend : false,
      joinCancelSent: false,
      snackbarOpen : false,
      snackbarMsg : ""
    };
  },

  componentWillMount: function () {
    if (this.state.playInfoData === undefined) {
      console.log("the this.state.playInfoData is undefined");
      this.context.router.transitionTo('home');
      return;
    }
  },

  componentDidMount: function () {
    var mapOptions = {
      center: new naver.maps.LatLng(this.state.playInfoData.locationLat.S, this.state.playInfoData.locationLng.S),
      zoom: 8
    };
    selectMap = new naver.maps.Map('locationInMap', mapOptions);

    var marker = new naver.maps.Marker({
      position: new naver.maps.LatLng(this.state.playInfoData.locationLat.S, this.state.playInfoData.locationLng.S),
      map: selectMap
    });
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
      joinButton: {
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
        paddingBottom: 8,
        fontSize: 15
      },
      lastCardText: {
        paddingTop: 8,
        paddingBottom: 8,
        fontSize: 15,
        marginBottom: 16
      },
      leftAvataIcon: {
        width: 42,
        height: 42,
        marginRight: 10
      },
      location: {
        width: 16,
        height: 16,
        marginTop : -2,
        verticalAlign: 'middle'
      },
      time: {
        width: 16,
        height: 16,
        marginTop : -2,
        verticalAlign: 'middle'
      },
      joinMemberContainer: {
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 16,
        paddingRight: 16,
        overflow: "auto"
      },
      joinStatus: {
        width: 120,
        height: 36,
        paddingTop: 0,
        textAlign: 'center',
        borderRadius: 36,
        color: Colors.white,
        background: Colors.grey500,
        lineHeight: 2.5,
        float: "left",
        fontSize: 15,
      },
      joinMemberAvatar: {
        float: "left",
        width: 36,
        height: 36,
        marginLeft: 5
      },
      map : {
        width: 'calc(100% - 32px)',
        marginRight: 16,
        marginLeft: 16,
        marginBottom : 10,
        height: 150
      },
    };

    var button = function () {
      if (document.user === undefined) {
        return (
          <RaisedButton
            label={window.textSet.join}
            secondary={true}
            style={styles.joinButton}
            onTouchTap={this._handleJoinButtonTouchTap} />
        );
      } else if (document.user.id === this.state.playInfoData.userId.S) {
        return (
          <RaisedButton
            label={window.textSet.edit}
            secondary={true}
            style={styles.joinButton}
            onTouchTap={this._handleEditButtonTouchTap} />
        );
      } else if (this.checkAlreadyJoin(document.user.id) === true) {
        return (
          <RaisedButton
            label={window.textSet.joinCancel}
            secondary={true}
            style={styles.joinButton}
            onTouchTap={this._handleJoinCancelButtonTouchTap} />
        );
      } else {
        return (
          <RaisedButton
            label={window.textSet.join}
            secondary={true}
            style={styles.joinButton}
            onTouchTap={this._handleJoinButtonTouchTap} />
        );
      }
    }.bind(this)();

    var joinMembers = this.state.playInfoData.joinList.SS.map(function (joinMember) {
      var profile = joinMember.split('__')[2];
      console.log(profile);
      return (
        <Avatar
          src={profile}
          style={styles.joinMemberAvatar}>
        </Avatar>
      );
    });

    var distKM = window.calcDistKM(this.state.playInfoData.locationLat.S, this.state.playInfoData.locationLng.S) + "km";
    var dispDate = window.displayDate(this.state.playInfoData.playDate.S);

    return (
      <div style={styles.root}>
        <Toolbar style={styles.toolbar}>
          <ToolbarGroup style={{marginLeft: -12}} firstChild={true} float="left">
            <IconButton style={styles.iconButton} tooltip={window.textSet.back} onTouchTap={this._handleBackButtonTouchTap} >
              <Back />
            </IconButton>
          </ToolbarGroup>
          <ToolbarTitle text={window.textSet.playInfo} style={styles.toolbarTitle} />
          <ToolbarGroup float="right">
            {button}
          </ToolbarGroup>
        </Toolbar>
        <Card style={styles.card}>
          <CardHeader
            title={
              <div style={styles.cardTitleText}>
               {this.state.playInfoData.playEvent.S}
              </div>
            }
            avatar={<Avatar src={this.state.playInfoData.playEventImage.S} style={styles.leftAvataIcon}></Avatar>}/>
          <CardText style={styles.cardText}>
            {this.state.playInfoData.desc.S}
          </CardText>
          <CardText style={styles.cardText}>
            <TimeIcon style={styles.time} /> {dispDate}
          </CardText>
          <CardText style={styles.cardText}>
            <LocationIcon style={styles.location} /> {this.state.playInfoData.location.S}, {distKM}
          </CardText>
          <div id='locationInMap' style={styles.map}>
          </div>
          <div style={styles.joinMemberContainer}>
            <div style={styles.joinStatus}>{parseInt(this.state.playInfoData.maxJoin.N) - this.state.playInfoData.joinList.SS.length}{window.textSet.memberLeft}</div>
            {joinMembers}
          </div>
          <CardText style={styles.lastCardText}>
          </CardText>
        </Card>
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

  _handleSnackBarClose: function() {
     this.setState({snackbarOpen: false});
  },

  _handleBackButtonTouchTap: function(e) {
    window.history.back();
  },

  _handleJoinButtonTouchTap: function(e) {
    if (document.user !== undefined) {
      console.log('_handleJoinButtonTouchTap');
      var joinInfo = {};
      joinInfo.playusIndex = this.state.playInfoData.index.S;
      joinInfo.userId = document.user.id;
      joinInfo.joinMember = document.user.id+'__'+document.user.name+'__'+document.user.profile_image;
      this.joinPlay(joinInfo);
    }
    else {
      this._loginOpen();
    }
  },

  _handleJoinCancelButtonTouchTap: function(e) {
    console.log('_handleJoinCancelButtonTouchTap');
  },

  _handleEditButtonTouchTap: function(e) {
    console.log('_handleEditButtonTouchTap');
  },

  checkAlreadyJoin: function(userId) {
    var result = this.state.playInfoData.joinList.SS.find(function(user){
      return user.split('__')[0] === userId;
    });
    if (result === undefined)
      return false;
    else
      return true;
  },

  _loginOpen: function() {
    this.setState({dialOpen: true});
  },

  _loginClose: function(joinInfo) {
    this.setState({dialOpen: false});
  },
  joinPlay: function(joinInfo) {
    if (this.state.joinPlaySent === true) {
      console.log('cancel duplicate call');
      return;
    }

    this.setState({joinPlaySent: true});
    var url = window.server.url+'/joinPlay';

    console.log(joinInfo);

    $.ajax({
      url: url,
      dataType: 'json',
      type: 'POST',
      data: joinInfo,
      success: function (recievedData) {
        console.log(recievedData);
        if (recievedData !== undefined) {
          if (recievedData.Item) {
            this.setState({snackbarOpen: true, snackbarMsg: "참여하기가 완료되었습니다.", playInfoData: recievedData.Item});
            window.playListState = "UpdateNeeded";
          } else {
            if (recievedData === '{"result" : "Error, Join list was full"}')
              this.setState({snackbarOpen: true, snackbarMsg: "정원초과로 참여할 수 없습니다."});
            else if (recievedData === '{"result" : "Error, Already join"}')
              this.setState({snackbarOpen: true, snackbarMsg: "이미 참여한 Play 입니다."});
          }
        }
        this.setState({joinPlaySent: false});
      }.bind(this),
      error: function (xhr, status, err) {
        this.setState({snackbarOpen: true, snackbarMsg: "참여하기 실패..."});
        this.setState({joinPlaySent: false});
      }.bind(this),
    });
  },
});

PlayInfo.contextTypes = {
  router: React.PropTypes.func
};

module.exports = PlayInfo;
