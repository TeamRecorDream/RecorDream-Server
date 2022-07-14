const message = {
  NULL_VALUE: '필요한 값이 없습니다.',
  NOT_FOUND: '존재하지 않는 자원',
  BAD_REQUEST: '잘못된 요청',
  INTERNAL_SERVER_ERROR: '서버 내부 오류',

  // 유저
  UPDATE_NICKNAME_FAIL: '닉네임 수정 실패',
  UPDATE_NICKNAME_SUCCESS: '닉네임 수정 성공',
  READ_USER_SUCCESS: '회원 정보 조회 성공',
  CHANGE_TOGGLE_SUCCESS: '푸시알림 여부 변경 성공',

  // 레코드
  CREATE_RECORD_SUCCESS: '꿈 기록 작성 성공',
  CREATE_RECORD_FAIL: '제목이 필요합니다.',
  READ_RECORD_SUCCESS: '꿈 기록 조회 성공',

  //voice
  VOICE_UPLOAD_SUCCESS: '음성 녹음 업로드 성공',
  WRONG_VOICE_FORM: '음성 녹음 실패 (잘못된 폼 데이터입니다.)',
  VOICE_PLAY_SUCCESS: '음성 녹음 재생 성공',
};

export default message;
