var React = require('react');
var Router = require('react-router');

var mui = require('material-ui');
var { Card,
  CardHeader,
  CardText,
  CardActions,
  Divider,
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

var Tooltip = require("react-tooltip");

var Back = require('./svg/back.js');
var LocationIcon = require('./svg/location_icon.js');
var TimeIcon = require('./svg/time_icon.js');
var LoginSel = require('./login_select.js');
var Chat = require('./chat.js');
var SharePlay = require('./share_play.js');

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
      joinClosedButton: {
        margin:'6px 0px 0px 0px',
        pointerEvents: 'none',
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
      descContainer: {
        color: Colors.black,
        pointerEvents: 'none',
        fontSize: 15,
        width: '100%'
      },
    };

    var button = function () {
      if (this.state.playInfoData.state.S === 'close'
       && document.user.id !== this.state.playInfoData.userId.S) {
        return (
          <RaisedButton
            label={window.textSet.closed}
            primary={true}
            style={styles.joinClosedButton} />
        );
      }

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

    var joinMembers = this.state.playInfoData.joinList ?
    this.state.playInfoData.joinList.SS.map(function (joinMember) {
      if (!joinMember)
        return;

      var profile = joinMember.split('__')[2];
      var name = joinMember.split('__')[1];
      return (
        <div>
          <Avatar
            src={profile}
            style={styles.joinMemberAvatar}
            data-tip data-for={joinMember} >
          </Avatar>
          <Tooltip id={joinMember} effect="solid" delayShow={500}>{name}</Tooltip>
        </div>
      );
    }) : null;

    var distKM = window.calcDistKM(this.state.playInfoData.locationLat.S, this.state.playInfoData.locationLng.S) + "km";
    var dispDate = window.displayDate(this.state.playInfoData.playDate.S);
    var joinMemberNumber = this.state.playInfoData.joinList ? this.state.playInfoData.joinList.SS.length : 0;

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
            avatar={<Avatar src={this.state.playInfoData.playEventImage.S} style={styles.leftAvataIcon}></Avatar>}>
            <SharePlay
              playusIndex={this.state.playInfoData.index.S}
              event={this.state.playInfoData.playEvent.S}
              desc={this.state.playInfoData.desc.S}
              location={this.state.playInfoData.location.S}
              date={dispDate} />
          </CardHeader>
          <CardText style={styles.cardText}>
            <TextField
              defaultValue={this.state.playInfoData.desc.S}
              style={styles.descContainer}
              underlineShow={false}
              rows={1}
              rowsMax={100}
              multiLine={true} />
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
            <div style={styles.joinStatus}>{parseInt(this.state.playInfoData.maxJoin.N) - joinMemberNumber}{window.textSet.memberLeft}</div>
            {joinMembers}
          </div>
          <CardText style={styles.lastCardText}>
          </CardText>
          <Divider style={{height: 2}} />
          <Chat />
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
    var joinInfo = {};
    joinInfo.playusIndex = this.state.playInfoData.index.S;
    joinInfo.userId = document.user.id;
    this.joinCancel(joinInfo);
  },

  _handleEditButtonTouchTap: function(e) {
    console.log('_handleEditButtonTouchTap');
    this.context.router.transitionTo('edit_play');
  },

  checkAlreadyJoin: function(userId) {
    if (!this.state.playInfoData.joinList) {
      return false;
    }

    var result = this.state.playInfoData.joinList.SS.find(function(user){
      if (user)
        return user.split('__')[0] === userId;
      else
        return false;
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
            window.joinPlayListState = "UpdateNeeded";
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

  joinCancel: function(joinInfo) {
    if (this.state.joinCancelSent === true) {
      console.log('cancel duplicate call');
      return;
    }

    this.setState({joinCancelSent: true});
    var url = window.server.url+'/joinCancel';

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
            this.setState({snackbarOpen: true, snackbarMsg: "참여하기가 취소되었습니다.", playInfoData: recievedData.Item});
            window.playListState = "UpdateNeeded";
            window.joinPlayListState = "UpdateNeeded";
          } else {
            if (recievedData === '{"result" : "Error, playusJoinIndex is not found"}')
              this.setState({snackbarOpen: true, snackbarMsg: "참여취소 실패..."});
          }
        }
        this.setState({joinCancelSent: false});
      }.bind(this),
      error: function (xhr, status, err) {
        this.setState({snackbarOpen: true, snackbarMsg: "참여취소 실패..."});
        this.setState({joinCancelSent: false});
      }.bind(this),
    });
  },
});

PlayInfo.contextTypes = {
  router: React.PropTypes.func
};

module.exports = PlayInfo;
