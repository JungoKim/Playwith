function getTextSetByLanguege(language) {
  var text = {};
  switch(language) {
    case "kr" :
      text.login = "로그인";
      text.kakaoLogin = "카카오톡 로그인";
      text.facebookLogin = "페이스북 로그인";
      text.dialogClose = "닫기";
      text.loginToast = "안녕하세요, ";
      text.createPlay = "Play 생성하기";
      text.playInfo = "Play 상세정보";
      text.back = "뒤로가기";
      text.join = "참여하기";
      text.create = "생성";
      text.description = "설명";
      text.eventSelect = "종목";
      text.filterSelect = "정렬";
      text.location = "장소";
      text.search = "# 검색";
      text.doSearch = "검색하기";
      text.maxMember = "정원";
      text.date = "날짜";
      text.time = "시간";
      text.mapSelect = "지도에서 선택";
      text.more = "더보기";
      text.myPlay = "나의 Play 목록";
      text.joinPlay = "참여한 Play 목록";
      text.logout = "로그아웃";
      text.memberLeft = "명 참여가능";
      text.searchInArea = "이 지역에서 검색";
      text.selectComplete = "선택완료";
      text.joinCancel = "참여취소";
      text.edit = "수정하기";
      text.refresh = "새로고침";
      text.modifyPlay = "Play 수정하기";
      text.modify = "수정";
      break;
    case "en" :
      text.login = "Sign in";
      text.kakaoLogin = "Login with kakaotalk";
      text.facebookLogin = "Login with facebook";
      text.dialogClose = "close";
      text.loginToast = "Hi, ";
      text.createPlay = "Create Play";
      text.playInfo = "Play Detail";
      text.back = "Back";
      text.join = "Join";
      text.create = "Create";
      text.description = "desc";
      text.eventSelect = "Select sports";
      text.filterSelect = "Filter";
      text.location = "Location";
      text.search = "# Search";
      text.doSearch = "Search";
      text.maxMember = "Member";
      text.date = "Date";
      text.time = "Time";
      text.mapSelect = "Select from map";
      text.more = "more";
      text.myPlay = "My Play";
      text.joinPlay = "Join Play";
      text.logout = "Logout";
      text.memberLeft = " spots left";
      break;
    default:
      console.log("Please check language parameter!")
      break;
  }
  return text;
}
