import request from "supertest";
import app from "../app";
import config from "../config";

/*
PUT /notice
*/
describe("[PUT] /user", () => {
  const req = request(app);
  let updateTime = "PM 11:00";
  const originalTime = "PM 05:55";

  let updateData = {
    fcm_token: config.fcm_token_ios,
    time: updateTime,
  };
  const originalData = {
    fcm_token: config.fcm_token_ios,
    time: originalTime,
  };

  afterAll(async () => {
    const afterAllRes = await req.put("/notice").send(originalData).set("Content-Type", "application/json").set("userId", "1");
    expect(afterAllRes.status).toBe(200);
  });

  //200 OK
  it("푸시알림 시간 수정 테스트", async () => {
    const res = await req.put("/notice").send(updateData).set("Content-Type", "application/json").set("userId", "1");
    expect(res.status).toBe(200);
    expect(res.body.message).toEqual("푸시알림 시간 수정 성공");
  });

  //400 Bad Request - 헤더에 userId가 없을 경우
  it("푸시알림 시간 수정 테스트(헤더에 userId가 없음)", async () => {
    const res = await req.put("/notice").send(updateData).set("Content-Type", "application/json");
    expect(res.status).toBe(400);
    expect(res.body.message).toEqual("필요한 값이 없습니다.");
  });

  //400 Bad Request - time을 안 넣은 경우
  it("푸시알림 시간 수정 테스트(time을 안 넣음)", async () => {
    updateTime = "";
    updateData = {
      fcm_token: config.fcm_token_ios,
      time: updateTime,
    };
    const res = await req.put("/notice").send(updateData).set("Content-Type", "application/json").set("userId", "1");
    expect(res.status).toBe(400);
    expect(res.body.message).toEqual("푸시알림 시간 수정 실패");
  });
});
