import request from "supertest";
import app from "../app";

//예시로 해둔 거 - 서연이 이어서 하면 됨
describe("[POST] /record", () => {
  const req = request(app);
  it("녹음 없는 꿈 기록 생성 테스트", async () => {
    const recordData = {
      title: "오늘은 7월 20일",
      date: "2022-07-19T10:00:49.196",
      content: "귀엽다",
      emotion: 2,
      dream_color: 3,
      genre: null,
      note: null,
      writer: "62c9cf068094605c781a2fb9",
      voice: null,
    };

    const res = await req.post("/record").send(recordData).set("Content-Type", "application/json").set("userId", "1");
    expect(res.status).toBe(201);
    console.log(res.body.data);
  });
});
