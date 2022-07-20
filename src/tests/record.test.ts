import request from "supertest";
import app from "../app";

describe("[GET] /record/:recordId", () => {
  const req = request(app);

  //200 OK - voice 없음
  it("꿈 기록 조회 테스트", async () => {
    const res = await req.get("/record/62d7a4ae00b34f2a62de0f48").set("Content-Type", "application/json").set("userId", "1");
    expect(res.status).toBe(200);
    expect(res.body.data).toEqual({
      _id: "62d7a4ae00b34f2a62de0f48",
      writer: "레코드림",
      date: "2022/07/19 (화)",
      title: "오늘은 7월 20일",
      voice: null,
      content: "귀엽다",
      emotion: 2,
      dream_color: 3,
      genre: [10],
      note: null,
    });
  });

  //200 OK - voice 있음
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

  //404 Not Found - 없는 id 조회
  it("꿈 기록 조회 테스트", async () => {
    const res = await req.get("/record/62d7965f150e503ea8b6d9bb");
    expect(res.status).toBe(404);
    expect(res.body.message).toEqual("존재하지 않는 자원");
  });
});

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
