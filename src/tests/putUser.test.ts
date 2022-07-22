import request from "supertest";
import app from "../app";
import config from "../config";

/*
PUT /user/:toggle
*/

describe("[PUT] /user/nickname", () => {
  const req = request(app);
  let updateNickname = "레코더림1111";
  let originalNickname = "레코드림";
  let updateData = {
    nickname: updateNickname,
  };
  let originalData = {
    nickname: originalNickname,
  };

  afterAll(async () => {
    const afterAllRes = await req
      .put("/user/nickname")
      .send(originalData)
      .set("Content-Type", "application/json")
      .set("userId", "1");
    expect(afterAllRes.status).toBe(200);
  });

  //200 OK
  it("유저 닉네임 수정 테스트", async () => {
    const res = await req.put("/user/nickname").send(updateData).set("Content-Type", "application/json").set("userId", "1");
    expect(res.status).toBe(200);
    expect(res.body.message).toEqual("닉네임 수정 성공");
  });

  //400 Bad Request - userId 빼고 리퀘스트
  it("유저 닉네임 수정 테스트(없는 id)", async () => {
    const res = await req.put("/user/nickname").send(updateData).set("Content-Type", "application/json");
    expect(res.status).toBe(400);
    expect(res.body.message).toEqual("닉네임 수정 실패");
  });

  //400 Bad Request - 닉네임을 입력하지 않음
  it("유저 닉네임 수정 테스트(닉네임을 입력하지 않음)", async () => {
    updateNickname = "";
    updateData = {
      nickname: updateNickname,
    };
    const res = await req.put("/user/nickname").send(updateData).set("Content-Type", "application/json").set("userId", "1");
    expect(res.status).toBe(400);
    expect(res.body.message).toEqual("닉네임 수정 실패");
  });

  //400 Bad Request - 8글자를 넘음
  it("유저 닉네임 수정 테스트(8글자를 넘음)", async () => {
    updateNickname = "레코더림 2222";
    updateData = {
      nickname: updateNickname,
    };
    const res = await req.put("/user/nickname").send(updateData).set("Content-Type", "application/json").set("userId", "1");
    expect(res.status).toBe(400);
    expect(res.body.message).toEqual("닉네임 수정 실패");
  });
});

/*
PUT /user/:toggle
*/
describe("[PUT] /user/:toggle", () => {
  const req = request(app);
  const fcm_token_ios = config.fcm_token_ios;
  let is_active = false;
  const tokenBody = {
    fcm_token: fcm_token_ios,
  };

  beforeAll(async () => {
    const beforeAllRes = await req
      .get("/user/" + fcm_token_ios)
      .set("Content-Type", "application/json")
      .set("userId", "1");
    expect(beforeAllRes.status).toBe(200);
    is_active = beforeAllRes.body.data.is_active;
  });

  afterAll(async () => {
    let toggle = "0";
    if (is_active) {
      toggle = "1";
    }
    const afterAllRes = await req
      .put("/user/" + toggle)
      .send(tokenBody)
      .set("Content-Type", "application/json")
      .set("userId", "1");
    expect(afterAllRes.status).toBe(200); //원래대로 돌려놓기
  });

  //200 OK - 유일 유저로
  it("푸시알림 여부 수정 테스트(성공)", async () => {
    const res = await req.put("/user/0").send(tokenBody).set("Content-Type", "application/json").set("userId", "1");
    expect(res.status).toBe(200);
    expect(res.body.message).toEqual("푸시알림 여부 변경 성공");
  });

  //400 Bad Request - userId 빼고 리퀘스트
  it("푸시알림 여부 수정 테스트(없는 id)", async () => {
    const res = await req.put("/user/1").send(tokenBody).set("Content-Type", "application/json");
    expect(res.status).toBe(400);
    expect(res.body.message).toEqual("필요한 값이 없습니다.");
  });

  //400 Bad Request - fcm_token 없는 경우
  it("푸시알림 여부 수정 테스트(fcm_token 없는 경우)", async () => {
    const res = await req.put("/user/1").set("Content-Type", "application/json").set("userId", "1");
    expect(res.status).toBe(400);
    expect(res.body.message).toEqual("필요한 값이 없습니다.");
  });

  //404 Not Found - 헤더에 1 이외의 userId가 들어간 경우
  it("푸시알림 여부 수정 테스트(헤더에 1 이외의 userId가 들어간 경우)", async () => {
    const res = await req.put("/user/1").send(tokenBody).set("Content-Type", "application/json").set("userId", "2");
    expect(res.status).toBe(404);
    expect(res.body.message).toEqual("존재하지 않는 유저 또는 FCM 토큰");
  });

  //404 Not Found - 존재하지 않는 fcm_token
  it("푸시알림 여부 수정 테스트(존재하지 않는 fcm_token)", async () => {
    const wrongTokenBody = {
      fcm_token: "wrong_token",
    };
    const res = await req.put("/user/1").send(wrongTokenBody).set("Content-Type", "application/json").set("userId", "1");
    expect(res.status).toBe(404);
    expect(res.body.message).toEqual("존재하지 않는 유저 또는 FCM 토큰");
  });

  //404 Not Found (parameter 에 1 이나 0 이외의 값이 들어온 경우)
  it("푸시알림 여부 수정 테스트(헤더에 1 이외의 userId가 들어간 경우)", async () => {
    const res = await req.put("/user/1").send(tokenBody).set("Content-Type", "application/json").set("userId", "1");
    expect(res.status).toBe(404);
    expect(res.body.message).toEqual("존재하지 않는 자원입니다.");
  });
});
