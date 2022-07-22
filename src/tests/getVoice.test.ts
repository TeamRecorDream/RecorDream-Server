import request from "supertest";
import app from "../app";

describe("[GET] /voice", () => {
  const req = request(app);

  //200 OK
  it("음성 녹음 조회 테스트", async () => {
    const res = await req.get("/voice/62d1745119a54968acdd7270").set("Content-Type", "application/json").set("userId", "1");
    expect(res.status).toBe(200);
    expect(res.body.message).toEqual("음성 녹음 재생 성공");
    expect(res.body.data).toEqual({
      _id: "62d1745119a54968acdd7270",
      url: "https://recordream-sample.s3.ap-northeast-2.amazonaws.com/1657893969535_test.wav",
    });
  });
});
