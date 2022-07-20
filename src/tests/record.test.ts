import request from "supertest";
import app from "../app";
import { RecordCreateDto } from "../interfaces/record/RecordCreateDto";
import recordRequestBody from "./data.json";

describe("[GET] /record/:recordId", () => {
  const req = request(app);
  it("꿈 기록 조회 테스트", async () => {
    const res = await req.get("/record/62d7965f150e503ea8b6d9ba").set("Content-Type", "application/json").set("userId", "1");
    expect(res.status).toBe(200);
    expect(res.body.data).toEqual({
      _id: "62d7965f150e503ea8b6d9ba",
      writer: "레코드림",
      date: "2022/07/19 (화)",
      title: "오늘은 7월 20일",
      voice: {
        _id: "62d1745119a54968acdd7270",
        url: "https://recordream-sample.s3.ap-northeast-2.amazonaws.com/1657893969535_test.wav",
      },
      content: "귀엽다",
      emotion: 2,
      dream_color: 3,
      genre: [10],
      note: null,
    });
  });
});
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
      voice: "62d1745119a54968acdd7270",
    };

    const res = await req.post("/record").send(recordData).set("Content-Type", "application/json").set("userId", "1");
    expect(res.status).toBe(201);
    console.log(res.body.data);
  });
});
