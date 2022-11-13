import request from "supertest";
import app from "../app";
import config from "../config";

/*
[POST] /notice
*/
describe("[POST] /notice", () => {
  const req = request(app);

  //201 CREATED - 푸시알림 시간 설정 성공
  it("푸시알림 시간 설정 테스트", async () => {
    const noticeData = {
      time: "PM 05:55",
    };

    const res = await req.post("/notice").send(noticeData).set("Content-Type", "application/json").set("userId", "1");
    expect(res.status).toBe(201);
  });

  //400 Bad Request - 헤더에 userId 없음
  it("푸시알림 시간 설정 테스트(헤더에 userId 없음)", async () => {
    const noticeData = {
      time: "PM 05:55",
    };

    const res = await req.post("/notice").send(noticeData).set("Content-Type", "application/json");
    expect(res.status).toBe(400);
    expect(res.body.message).toEqual("필요한 값이 없습니다.");
  });

  //400 Bad Request - 해당 Fcm 토큰으로 이미 시간 설정을 한 경우
  it("푸시알림 시간 설정 테스트(해당 Fcm 토큰으로 이미 시간 설정 함)", async () => {
    const noticeData = {
      time: "PM 05:55",
    };

    const res = await req.post("/notice").send(noticeData).set("Content-Type", "application/json").set("userId", "1");
    expect(res.status).toBe(400);
    expect(res.body.message).toEqual("해당 토큰으로 이미 시간 설정됨");
  });

  //404 Not Found - 헤더에 1 이외의 userId가 들어감
  it("푸시알림 시간 설정 테스트(헤더에 1 이외의 userId)", async () => {
    const noticeData = {
      time: "PM 05:55",
    };

    const res = await req.post("/notice").send(noticeData).set("Content-Type", "application/json").set("userId", "2");
    expect(res.status).toBe(404);
    expect(res.body.message).toEqual("존재하지 않는 유저 또는 FCM 토큰");
  });

  //404 Not Found - 존재하지 않는 fcm_token
  it("푸시알림 시간 설정 테스트(존재하지 않는 fcm_token)", async () => {
    const noticeData = {
      fcm_token: "11111",
      time: "PM 05:55",
    };

    const res = await req.post("/notice").send(noticeData).set("Content-Type", "application/json").set("userId", "1");
    expect(res.status).toBe(404);
    expect(res.body.message).toEqual("존재하지 않는 유저 또는 FCM 토큰");
  });

  /*
  //Internal Server Error - 서버 내부 오류
  it("푸시알림 시간 설정 테스트", async () => {
    const recordData = {
      title: "aaaaabbbbbcccccdddddeeeee",
      date: "2022-07-19T10:00:49.196",
      content: null,
      emotion: null,
      dream_color: null,
      genre: [1, 2, 10],
      note: null,
      writer: "62c9cf068094605c781a2fb9",
      voice: null,
    };

    const res = await req.post("/record").send(recordData).set("Content-Type", "application/json").set("userId", "1");
    expect(res.status).toBe(500);
    expect(res.body.message).toEqual("서버 내부 오류");
  });
  */
});
