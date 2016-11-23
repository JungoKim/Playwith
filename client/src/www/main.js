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

var sportsClass = [
  "축구",
  "야구",
  "골프",
  "자전거",
  "농구",
  "테니스",
  "배드민턴",
  "수영",
  "탁구",
  "당구",
  "스키",
  "배구",
  "볼링",
  "복싱",
  "스케이트",
  "양궁",
  "마라톤",
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

var fineImagebyClass = function(className) {
    var image;
    switch(className) {
    case "축구" :
      image = "./image/soccer.png";
      break;
    case "야구" :
      image = "./image/basketball.png";
      break;
    case "골프" :
      image = "./image/golf.png";
      break;
    case "자전거" :
      image = "./image/bicycle.png";
      break;
    case "농구" :
      image = "./image/basketball.png";
      break;
    case "테니스" :
      image = "./image/tennis.png";
      break;
    case "배드민턴" :
      image = "./image/badminton.png";
      break;
    case "수영" :
      image = "./image/swimming.png";
      break;
    case "탁구" :
      image = "./image/tabletennis.png";
      break;
    case "당구" :
      image = "./image/billiards.png";
      break;
    case "스키" :
      image = "./image/skiing.png";
      break;
    case "배구" :
      image = "./image/volleyball.png";
      break;
    case "볼링" :
      image = "./image/bowling.png";
      break;
    case "복싱" :
      image = "./image/boxing.png";
      break;
    case "스케이트" :
      image = "./image/skating.png";
      break;
    case "양궁" :
      image = "./image/archery.png";
      break;
    case "마라톤" :
      image = "./image/marathon.png";
      break;
    case "하키" :
      image = "./image/hockey.png";
      break;
    case "승마" :
      image = "./image/horse_riding.png";
      break;
    case "격투기" :
      image = "./image/martial_arts.png";
      break;
    case "요트" :
      image = "./image/yacht.png";
      break;
    case "족구" :
      image = "./image/foot_volleyball.png";
      break;
    case "조정" :
      image = "./image/rowing.png";
      break;
    case "클라이밍" :
      image = "./image/climbing.png";
      break;
    case "사격" :
      image = "./image/shooting.png";
      break;
    case "펜싱" :
      image = "./image/fencing.png";
      break;
    case "경주" :
      image = "./image/moter_race.png";
      break;
    case "럭비" :
      image = "./image/rugby.png";
      break;
    case "게이트볼" :
      image = "./image/gateball.png";
      break;
    case "수구" :
      image = "./image/water_polo.png";
      break;
    default:
      console.log("Please check className parameter!")
      break;
  }
  return image;
}