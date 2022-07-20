const message = {
  NULL_VALUE: "필요한 값이 없습니다.",
  NOT_FOUND: "존재하지 않는 자원",
  BAD_REQUEST: "잘못된 요청",
  INTERNAL_SERVER_ERROR: "서버 내부 오류",

  // 유저
  UPDATE_NICKNAME_FAIL: "닉네임 수정 실패",
  UPDATE_NICKNAME_SUCCESS: "닉네임 수정 성공",
  READ_USER_SUCCESS: "회원 정보 조회 성공",
  CHANGE_TOGGLE_SUCCESS: "푸시알림 여부 변경 성공",
  UPDATE_FCM_TOKEN_SUCCESS: "fcm 토큰 refresh 성공",

  // 레코드
  CREATE_RECORD_SUCCESS: "꿈 기록 작성 성공",
  CREATE_RECORD_NUMBER_FAIL: "감정, 색깔, 장르 범위 오류입니다",
  CREATE_RECORD_TITLE_FAIL: "제목이 없거나 길이를 초과하였습니다",
  UPDATE_RECORD_FORM_FAIL: "제목 오류 또는 음성/작성자 수정 시도",
  UPDATE_RECORD_NUMBER_FAIL: "감정, 색깔, 장르 범위 오류입니다",
  READ_RECORD_SUCCESS: "꿈 기록 조회 성공",
  UPDATE_RECORD_SUCCESS: "꿈 기록 수정 성공",
  DELETE_RECORD_SUCCESS: "꿈 기록 삭제 성공",
  READ_RECORD_LIST_SUCCESS: "꿈 기록 목록(홈) 조회 성공",
  READ_RECORD_STORAGE_SUCCESS: "꿈 기록 목록(보관함) 조회 성공",
  SEARCH_RECORD_SUCCESS: "꿈 기록 검색 성공",

  //voice
  UPLOAD_VOICE_SUCCESS: "음성 녹음 업로드 성공",
  UPLOAD_VOICE_FORM_FAIL: "음성 녹음 실패 (잘못된 폼 데이터입니다.)",
  PLAY_VOICE_SUCCESS: "음성 녹음 재생 성공",

  // 푸시알림
  POST_NOTICE_SUCCESS: "푸시알림 시간 설정 성공",
  POST_NOTICE_FAIL: "푸시알림 시간 설정 실패",
  UPDATE_NOTICE_SUCCESS: "푸시알림 시간 수정 성공",
  UPDATE_NOTICE_FAIL: "푸시알림 시간 수정 실패",
};

export default message;
