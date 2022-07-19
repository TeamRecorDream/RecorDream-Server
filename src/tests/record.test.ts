import request from "supertest";
import app from "../app";
import { RecordCreateDto } from "../interfaces/record/RecordCreateDto";
import recordRequestBody from "./data.json";

describe("[GET] /record/:recordId", () => {
  const req = request(app);
  it("녹음 조회 테스트", async () => {
    const res = await req.get("/record/62d16e7fe8b4508dbca5ead6").set("Content-Type", "application/json");
    expect(res.status).toBe(200);
    expect(res.body.data).toEqual({
      _id: "62d16e7fe8b4508dbca5ead6",
      writer: "레코드림",
      date: "2023/07/15 (토)",
      title: "우리 유저1",
      voice: null,
      content: "귀엽다",
      emotion: 1,
      dream_color: 3,
      genre: [1, 2, 5],
      note: "씨몽키를 더 키우자",
    });
  });
});
describe("[POST] /record", () => {
  const req = request(app);
  it("녹음 없는 꿈 기록 생성 테스트", async () => {
    const recordData: RecordCreateDto = {
      dream_color: 3,
      genre: [1, 2, 5],
      content: "테스트 내용",
      title: "테스트 제목 이걸로",
      emotion: 5,
    };

    const res = await req.post("/record").send(recordData).set("Content-Type", "application/json");
    expect(res.status).toBe(201);
    console.log(res.body.data);
  });
});
