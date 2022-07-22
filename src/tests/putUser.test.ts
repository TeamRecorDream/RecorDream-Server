import request from "supertest";
import app from "../app";

/*
PUT /user/nickname
*/

describe("[PUT] /user/nickname", () => {
  const req = request(app);
  let updateNickname = "레코더림111";
  let originalNickname = "";

  //200 OK - 유일 유저로
  it("유저 닉네임 수정 테스트", async () => {
    const res = await req.get("/user").set("Content-Type", "application/json").set("userId", "1");
    expect(res.status).toBe(200);
    expect(res.body.data).toEqual({
      nickname: "1",
      email: "seokyeong@naver.com",
      is_notified: true,
      time: "PM 06:9",
      is_deleted: false,
    });
  });

  //400 Bad Request - userId 빼고 리퀘스트
  it("유저 닉네임 수정 테스트(없는 id)", async () => {
    const res = await req.get("/user").set("Content-Type", "application/json");
    expect(res.status).toBe(400);
    expect(res.body.message).toEqual("닉네임 수정 실패");
  });

  //400 Bad Request - 닉네임을 입력하지 않음
  it("유저 닉네임 수정 테스트(닉네임을 입력하지 않음)", async () => {
    const res = await req.get("/user").set("Content-Type", "application/json");
    expect(res.status).toBe(400);
    expect(res.body.message).toEqual("닉네임 수정 실패");
  });

  //400 Bad Request - 8글자를 넘음
  it("유저 닉네임 수정 테스트(8글자를 넘음)", async () => {
    const res = await req.get("/user").set("Content-Type", "application/json");
    expect(res.status).toBe(400);
    expect(res.body.message).toEqual("닉네임 수정 실패");
  });
});
