import request from "supertest";
import app from "../app";
import config from "../config";

/*
GET /user
*/

describe("[GET] /user", () => {
  const req = request(app);

  //200 OK - 유일 유저로
  it("유저 조회 테스트", async () => {
    const res = await req.get("/user").set("Content-Type", "application/json").set("userId", "1");
    expect(res.status).toBe(200);
    expect(res.body.data).toEqual({
      nickname: "레코드림",
      email: "seokyeong@naver.com",
      time: "PM 05:55",
      is_deleted: false,
    });
  });

  //400 Bad Request - userId 빼고 리퀘스트
  it("유저 조회 테스트(없는 id)", async () => {
    const res = await req.get("/user").set("Content-Type", "application/json");
    expect(res.status).toBe(400);
    expect(res.body.message).toEqual("필요한 값이 없습니다.");
  });
});
