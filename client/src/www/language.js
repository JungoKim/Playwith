function getTextSetByLanguege(language) {
  var text = {};
  switch(language) {
    case "kr" :
      text.login = "로그인";
      text.kakaoLogin = "카카오톡 로그인";
      text.facebookLogin = "페이스북 로그인";
      text.dialogClose = "닫기";
      text.loginToast = "안녕하세요, ";
      text.createPlay = "Play 작성하기";
      text.playInfo = "게임 상세정보";
      text.back = "뒤로가기";
      text.join = "참여하기";
      break;
    case "en" :
      text.login = "Sign in";
      text.kakaoLogin = "Login with kakaotalk";
      text.facebookLogin = "Login with facebook";
      text.dialogClose = "close";
      text.loginToast = "Hi, ";
      text.createPlay = "Create Play";
      text.playInfo = "Game Detail";
      text.back = "Back";
      text.join = "JOIN";
      break;
    default:
      console.log("Please check language parameter!")
      break;
  }
  return text;
}
