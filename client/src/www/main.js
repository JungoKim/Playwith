function init() {

  var WebFontConfig = {
    google: { families: [ 'Roboto:400,300,500:latin' ] }
  };
  (function() {
    var wf = document.createElement('script');
    wf.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
  })();

  window.fbAsyncInit = function() {
    FB.init({
      appId      : '1695439927444429', //1695439927444429(locahost) 1695439260777829(playus.me)
      cookie     : true,  // enable cookies to allow the server to access the session
      xfbml      : true,  // parse social plugins on this page
      version    : 'v2.4', // use version 2.2
      status     : true,
      oauth      : true
    });
    console.log("FB.init called");

    FB.Event.subscribe('auth.login', function(response) {
      console.log('logged in');
    });

    FB.Event.subscribe('auth.logout', function(response) {
      console.log('logged out');
      var event = new CustomEvent("fbLogout", {
        detail: {
            res: response
        }
      });
      document.dispatchEvent(event);
      window.location.reload();
    });

    FB.Event.subscribe('auth.stateChange', function(response) {
      console.log('auth.stateChange : ' + response);
    });

    FB.getLoginStatus(function(response) {
      console.log("FB.getLoginStatus called");
      var event = new CustomEvent("fbLogin", {
        detail: {
            res: response
        }
      });
      document.dispatchEvent(event);
    }, true);
  };

    // Load the SDK asynchronously
  (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

  window.loginStatusCallback = function(response) {
    console.log('loginStatusCallback');
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      console.log('response.status is connected');
      var uid = response.authResponse.userID;
      var accessToken = response.authResponse.accessToken;
      console.log('uid is : ' + uid);
      console.log('accessToken is : ' + accessToken);

      document.fblogin = "connected";
      // Logged into your app and Facebook.

      FB.api('/me', {fields: 'id,name,email,age_range,gender'}, function(res) {
        console.log('Successful login for: ' + res.name);
        document.user = res;
        document.user.profile_image = "https://graph.facebook.com/"+document.user.id+"/picture?type=small";

        var event = new CustomEvent("fbUserInfo", {
          detail: {
              userInfo: res
          }
        });
        document.dispatchEvent(event);

        console.log(res);
      }.bind(this));

    } else if (response.status === 'not_authorized') {
      console.log("the user is logged in to Facebook, but has not authenticated your app");
      document.fblogin = "not_authorized";
    } else {
      console.log("the user isn't logged in to Facebook. Go login");
      document.fblogin = "not_logged";
    }
  }
}

window.curLat = 37.5666805;
window.curLng = 126.9784147;

var showPosition = function(position) {
  window.curLat = position.coords.latitude;
  window.curLng = position.coords.longitude;
  console.log(this.curLat);
  console.log(this.curLng);
}

var getLocation = function() {
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition);
  } else {
      console.log("Geolocation is not supported by this browser.");
  }
}

var sportsEvent = [
  "축구",
  "야구",
  "골프",
  "자전거",
  "농구",
  "테니스",
  "배드민턴",
  "조깅",
  "수영",
  "탁구",
  "당구",
  "스키",
  "배구",
  "볼링",
  "복싱",
  "스케이트",
  "양궁",
  "하키",
  "승마",
  "격투기",
  "요트",
  "족구",
  "조정",
  "클라이밍",
  "사격",
  "펜싱",
  "경주",
  "럭비",
  "게이트볼",
  "수구"
]

var fineImagebyEvent = function(eventName) {
    var image;
    switch(eventName) {
    case "축구" :
      image = "./img/soccer.png";
      break;
    case "야구" :
      image = "./img/baseball.png";
      break;
    case "골프" :
      image = "./img/golf.png";
      break;
    case "자전거" :
      image = "./img/bicycle.png";
      break;
    case "농구" :
      image = "./img/basketball.png";
      break;
    case "테니스" :
      image = "./img/tennis.png";
      break;
    case "배드민턴" :
      image = "./img/badminton.png";
      break;
    case "수영" :
      image = "./img/swimming.png";
      break;
    case "탁구" :
      image = "./img/tabletennis.png";
      break;
    case "당구" :
      image = "./img/billiards.png";
      break;
    case "스키" :
      image = "./img/skiing.png";
      break;
    case "배구" :
      image = "./img/volleyball.png";
      break;
    case "볼링" :
      image = "./img/bowling.png";
      break;
    case "복싱" :
      image = "./img/boxing.png";
      break;
    case "스케이트" :
      image = "./img/skating.png";
      break;
    case "양궁" :
      image = "./img/archery.png";
      break;
    case "조깅" :
      image = "./img/jogging.png";
      break;
    case "하키" :
      image = "./img/hockey.png";
      break;
    case "승마" :
      image = "./img/horse_riding.png";
      break;
    case "격투기" :
      image = "./img/martial_arts.png";
      break;
    case "요트" :
      image = "./img/yacht.png";
      break;
    case "족구" :
      image = "./img/foot_volleyball.png";
      break;
    case "조정" :
      image = "./img/rowing.png";
      break;
    case "클라이밍" :
      image = "./img/climbing.png";
      break;
    case "사격" :
      image = "./img/shooting.png";
      break;
    case "펜싱" :
      image = "./img/fencing.png";
      break;
    case "경주" :
      image = "./img/moter_race.png";
      break;
    case "럭비" :
      image = "./img/rugby.png";
      break;
    case "게이트볼" :
      image = "./img/gateball.png";
      break;
    case "수구" :
      image = "./img/water_polo.png";
      break;
    default:
      console.log("Please check eventName parameter!")
      break;
  }
  return image;
}

function toRad(Value)
{
  return Value * Math.PI / 180;
}

function calcDistance(lat1, lon1, lat2, lon2)
{
  var R = 6371; // km
  var dLat = toRad(lat2-lat1);
  var dLon = toRad(lon2-lon1);
  var lat1 = toRad(lat1);
  var lat2 = toRad(lat2);

  var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c;
  return d;
}

function calcDistKM(lat, lng) {
  return calcDistance(window.curLat, window.curLng, lat, lng).toFixed(1);
}

function displayDate(playDate) {
  var date = new Date;
  date.setTime(playDate);

  var year = date.getFullYear();
  var month = date.getMonth()+1;
  var day = date.getDate();
  var dayLabel = date.getDay();
  var week = new Array('일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일');

  var hour = date.getHours();
  var minute = date.getMinutes();
  var ampm = hour > 12 ? '오후' : '오전';
  hour %= 12;
  minute = minute === 0 ? '' : minute + "분";

  return month+'월 '+day+'일 '+week[dayLabel]+", " +ampm+" "+hour+"시 "+minute;
}
