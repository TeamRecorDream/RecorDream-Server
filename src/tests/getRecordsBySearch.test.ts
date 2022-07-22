import request from "supertest";
import app from "../app";

/**
 * [GET] /record/storage/search?keyword=
 */
describe("[GET] /record/storage/search?keyword=", () => {
  const req = request(app);

  //200 OK
  it("꿈 기록 검색 테스트(검색 결과 o)", async () => {
    const res = await req
      .get("/record/storage/search?keyword=" + encodeURI("레코드림"))
      .set("Content-Type", "application/json")
      .set("userId", "1");
    expect(res.status).toBe(200);
    expect(res.body.data).toEqual({
      records_count: 3,
      records: [
        {
          _id: "62d7bb239669f53b6c72a8c3",
          dream_color: 2,
          emotion: 6,
          date: "2022/07/16 (토)",
          title: "제주도에 여행간 사고뭉치 금쪽드림팀",
          genre: [8],
        },
        {
          _id: "62d7b9549669f53b6c72a8a7",
          dream_color: 5,
          emotion: 3,
          date: "2022/07/09 (토)",
          title: "레코드림이 하트시그널에?!",
          genre: [0, 1, 8],
        },
        {
          _id: "62d7b7869669f53b6c72a8a3",
          dream_color: 4,
          emotion: 1,
          date: "2022/07/08 (금)",
          title: "레코드림팀이랑 회식했음 ㅋㅋㅋ",
          genre: [0, 8],
        },
      ],
    });
  });

  //200 OK
  it("꿈 기록 검색 테스트(검색 결과 x)", async () => {
    const res = await req
      .get("/record/storage/search?keyword=" + encodeURI("냥냥냥"))
      .set("Content-Type", "application/json")
      .set("userId", "1");
    expect(res.status).toBe(200);
    expect(res.body.data).toEqual({
      records_count: 0,
      records: [],
    });
  });

  //404 Not Found -
  it("꿈 기록 검색 테스트(올바르지 않은 userId)", async () => {
    const res = await req
      .get("/record/storage/search?keyword=" + encodeURI("레코드림"))
      .set("Content-Type", "application/json")
      .set("userId", "2");
    expect(res.status).toBe(404);
    expect(res.body.message).toEqual("존재하지 않는 자원");
  });

  //400 Null Value
  it("꿈 기록 검색 테스트(userId 없음)", async () => {
    const res = await req.get("/record/storage/search?keyword=" + encodeURI("레코드림")).set("Content-Type", "application/json");
    expect(res.status).toBe(400);
    expect(res.body.message).toEqual("필요한 값이 없습니다.");
  });
});
