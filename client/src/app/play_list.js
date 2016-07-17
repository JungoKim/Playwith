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
  CircularProgress
} = require('material-ui');

var Spinner = require('./spinner.js');
var LocationIcon = require('./svg/location_icon.js');
var TimeIcon = require('./svg/time_icon.js');

var PlayList = React.createClass({

  render: function() {
    var styles = {
      root: {
        marginLeft: 'auto',
        marginRight: 'auto',
        width: "100%",
        maxWidth : 650,
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
      rightDiv: {
        padding : '0px',
        width : 48,
        height : 80,
        top: 3,
        right: 0,
      },
      rightSportsIcon: {
        width: 48,
        height: 48,
      },
      rightJoinStatus: {
        width: 48,
        height: 20,
        paddingTop: 6,
        color: Colors.white,
        fontSize: 13,
        textAlign: 'center',
        borderRadius: 13,
        background: Colors.brown300,
      }
    };

    return (
      <div style={styles.root}>
       <List style={{paddingTop: 0}} >
          <ListDivider />
          <ListItem
            style={{paddingRight: 16}}
            leftAvatar={<Avatar>A</Avatar>}
            rightIcon={
              <div style={styles.rightDiv}>
                <img src="./img/volleyball.png" style={styles.rightSportsIcon} />
                <div style={styles.rightJoinStatus}>55 / 99</div>
              </div>
            }
            primaryText={
               <span>
                 배구 <br/>
                 <span style={{color: Colors.lightBlack, fontSize: 14}}></span>
               </span>
            }
            secondaryText={
              <span>
                <span style={{color: Colors.darkBlack}}><LocationIcon style={styles.location} /> 잠원동, 1.3 km</span><br/>
                <span style={{color: Colors.darkBlack}}><TimeIcon style={styles.time} /> 3일 6시간 남음</span>
              </span>
            }
            secondaryTextLines={2} />
          <ListDivider />
          <ListItem
            style={{paddingRight: 16}}
            leftAvatar={<Avatar>A</Avatar>}
            rightIcon={
              <div style={styles.rightDiv}>
                <img src="./img/tennis.png" style={styles.rightSportsIcon} />
                <div style={styles.rightJoinStatus}>2 / 4</div>
              </div>
            }
            primaryText={
               <span>
                 테니스 <br/>
                 <span style={{color: Colors.lightBlack, fontSize: 14}}>아번 주 일요일 아침 6시 보라매공원에서 테니스 복식 같이 쳐요 그래요 그랭 그렇게 해요 그렇게 하시면 됩니다.</span>
               </span>
            }
            secondaryText={
              <span>
                <span style={{color: Colors.darkBlack}}><LocationIcon style={styles.location} /> 잠원동, 1.3 km</span><br/>
                <span style={{color: Colors.darkBlack}}><TimeIcon style={styles.time} /> 3일 6시간 남음</span>
              </span>
            }
            secondaryTextLines={2} />
          <ListDivider />
          <ListItem
            style={{paddingRight: 16}}
            leftAvatar={<Avatar>A</Avatar>}
            rightIcon={
              <div style={styles.rightDiv}>
                <img src="./img/soccer.png" style={styles.rightSportsIcon} />
                <div style={styles.rightJoinStatus}>2 / 4</div>
              </div>
            }
            primaryText={
               <span>
                 축구 <br/>
                 <span style={{color: Colors.lightBlack, fontSize: 14}}>아번 주 일요일 아침 6시 보라매공원에서 테니스 복식 같이 쳐요 그래요 그랭 그렇게 해요 그렇게 하시면 됩니다.</span>
               </span>
            }
            secondaryText={
              <span>
                <span style={{color: Colors.darkBlack}}><LocationIcon style={styles.location} /> 잠원동, 1.3 km</span><br/>
                <span style={{color: Colors.darkBlack}}><TimeIcon style={styles.time} /> 3일 6시간 남음</span>
              </span>
            }
            secondaryTextLines={2} />
          <ListDivider />
          <ListItem
            style={{paddingRight: 16}}
            leftAvatar={<Avatar>A</Avatar>}
            rightIcon={
              <div style={styles.rightDiv}>
                <img src="./img/bicycle.png" style={styles.rightSportsIcon} />
                <div style={styles.rightJoinStatus}>2 / 4</div>
              </div>
            }
            primaryText={
               <span>
                 자전거 <br/>
                 <span style={{color: Colors.lightBlack, fontSize: 14}}>아번 주 일요일 아침 6시 보라매공원에서 테니스 복식 같이 쳐요 그래요 그랭 그렇게 해요 그렇게 하시면 됩니다.</span>
               </span>
            }
            secondaryText={
              <span>
                <span style={{color: Colors.darkBlack}}><LocationIcon style={styles.location} /> 잠원동, 1.3 km</span><br/>
                <span style={{color: Colors.darkBlack}}><TimeIcon style={styles.time} /> 3일 6시간 남음</span>
              </span>
            }
            secondaryTextLines={2} />
          <ListDivider />
          <ListItem
            style={{paddingRight: 16}}
            leftAvatar={<Avatar>A</Avatar>}
            rightIcon={
              <div style={styles.rightDiv}>
                <img src="./img/baseball.png" style={styles.rightSportsIcon} />
                <div style={styles.rightJoinStatus}>2 / 4</div>
              </div>
            }
            primaryText={
               <span>
                 야구 <br/>
                 <span style={{color: Colors.lightBlack, fontSize: 14}}>아번 주 일요일 아침 6시 보라매공원에서 테니스 복식 같이 쳐요 그래요 그랭 그렇게 해요 그렇게 하시면 됩니다.</span>
               </span>
            }
            secondaryText={
              <span>
                <span style={{color: Colors.darkBlack}}><LocationIcon style={styles.location} /> 잠원동, 1.3 km</span><br/>
                <span style={{color: Colors.darkBlack}}><TimeIcon style={styles.time} /> 3일 6시간 남음</span>
              </span>
            }
            secondaryTextLines={2} />
          <ListDivider />
          <ListItem
            style={{paddingRight: 16}}
            leftAvatar={<Avatar>A</Avatar>}
            rightIcon={
              <div style={styles.rightDiv}>
                <img src="./img/basketball.png" style={styles.rightSportsIcon} />
                <div style={styles.rightJoinStatus}>2 / 4</div>
              </div>
            }
            primaryText={
               <span>
                 농구 <br/>
                 <span style={{color: Colors.lightBlack, fontSize: 14}}>아번 주 일요일 아침 6시 보라매공원에서 테니스 복식 같이 쳐요 그래요 그랭 그렇게 해요 그렇게 하시면 됩니다.</span>
               </span>
            }
            secondaryText={
              <span>
                <span style={{color: Colors.darkBlack}}><LocationIcon style={styles.location} /> 잠원동, 1.3 km</span><br/>
                <span style={{color: Colors.darkBlack}}><TimeIcon style={styles.time} /> 3일 6시간 남음</span>
              </span>
            }
            secondaryTextLines={2} />
          <ListDivider />
        </List>
      </div>
    );
  }
});

PlayList.contextTypes = {
  router: React.PropTypes.func
};

module.exports = PlayList;
