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

var SelectTarget = require('./select_target.js');
var PlayList = require('./play_list.js');
var WriteButton = require('./write_button.js');

playList = [
  {
    index: { S : "userId0_1471575141450"},
    userId: { S : "userId0"},
    userProfile: { S : "http://graph.facebook.com/834827176637705/picture?type=small"},
    date: { S : "1471575141450"},
    location: { S : "잠원동"},
    gps: { S : "1.3 km"},
    playDate: { S : "3일 6시간"},
    playClass: { S : "배구"},
    playImage: { S : "./img/volleyball.png"},
    state: { S : "open"},
    joinList: ["userId1", "userId2"],
    maxJoin: { S : "99" },
    content: { S : "아번 주 일요일 아침 6시 보라매공원에서 테니스 복식 같이 쳐요 아번 주 일요일 아침 6시 보라매공원에서 테니스 복식 같이 쳐요 아번 주 일요일 아침 6시 보라매공원에서 테니스 복식 같이 쳐요" },
    profileImage: { S : "A" },
  },
  {
    index: { S : "userId1_1471575141450"},
    userId: { S : "userId1"},
    userProfile: { S : "http://mud-kage.kakao.co.kr/14/dn/btqcNBAWzFM/DKAymcsOYtzBQNKoeGYZ91/o.jpg"},
    date: { S : "1471575141450"},
    location: { S : "잠원동"},
    gps: { S : "1.3 km"},
    playDate: { S : "3일 6시간"},
    playClass: { S : "테니스"},
    playImage: { S : "../img/tennis.png"},
    state: { S : "open"},
    joinList: ["userId1", "userId2"],
    maxJoin: { S : "99" },
    content : { S : "아번 주 일요일 아침 6시 보라매공원에서 테니스 복식 같이 쳐요" }
  },
  {
    index: { S : "userId2_1471575141450"},
    userId: { S : "userId2"},
    userProfile: { S : "http://graph.facebook.com/834827176637705/picture?type=small"},
    date: { S : "1471575141450"},
    location: { S : "잠원동"},
    gps: { S : "1.3 km"},
    playDate: { S : "3일 6시간"},
    playClass: { S : "축구"},
    playImage: { S : "./img/soccer.png"},
    state: { S : "open"},
    joinList: ["userId1", "userId2"],
    maxJoin: { S : "99" },
    content : { S : "아번 주 일요일 아침 6시 보라매공원에서 테니스 복식 같이 쳐요" }
  },
  {
    index: { S : "userId3_1471575141450"},
    userId: { S : "userId3"},
    userProfile: { S : "http://graph.facebook.com/834827176637705/picture?type=small"},
    date: { S : "1471575141450"},
    location: { S : "잠원동"},
    gps: { S : "1.3 km"},
    playDate: { S : "3일 6시간"},
    playClass: { S : "자전거"},
    playImage: { S : "./img/bicycle.png"},
    state: { S : "open"},
    joinList: ["userId1", "userId2"],
    maxJoin: { S : "99" },
    content : { S : "아번 주 일요일 아침 6시 보라매공원에서 테니스 복식 같이 쳐요" }
  },
  {
    index: { S : "userId4_1471575141450"},
    userId: { S : "userId4"},
    userProfile: { S : "http://graph.facebook.com/834827176637705/picture?type=small"},
    date: { S : "1471575141450"},
    location: { S : "잠원동"},
    gps: { S : "1.3 km"},
    playDate: { S : "3일 6시간"},
    playClass: { S : "야구"},
    playImage: { S : "../img/baseball.png"},
    state: { S : "open"},
    joinList: ["userId1", "userId2"],
    maxJoin: { S : "99" },
    content : { S : "아번 주 일요일 아침 6시 보라매공원에서 테니스 복식 같이 쳐요" }
  },
];

selectedPlay = playList[0];

var Home = React.createClass({
  getInitialState: function() {
    return {
      playListData: playList,
    };
  },

  render: function() {
    var styles = {
      root: {
        marginTop: 48,
        marginLeft: 'auto',
        marginRight: 'auto',
        width: "100%",
        maxWidth : 650,
      }
    };

    return (
      <div style={styles.root}>
        <SelectTarget />
        <PlayList
          data={this.state.playListData} />
        <WriteButton />
      </div>
    );
  }
});

Home.contextTypes = {
  router: React.PropTypes.func
};

module.exports = Home;
