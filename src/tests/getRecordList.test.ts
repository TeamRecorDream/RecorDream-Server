import request from "supertest";
import app from "../app";

/**
 * [GET] /record
 */
describe("[GET] /record", () => {
  const req = request(app);

  //200 OK
  it("꿈 기록 리스트(홈화면) 조회 테스트", async () => {
    const res = await req.get("/record").set("Content-Type", "application/json").set("userId", "1");
    expect(res.status).toBe(200);
    expect(res.body.data).toEqual({
      nickname: "레코드림",
      records: [
        {
          _id: "62d82d0cbb7aaf28837aa30a",
          dream_color: 1,
          emotion: 4,
          date: "2022/07/22 (금)",
          title: "지민 언니를 위한삭제용 content~~~",
          genre: [1],
        },
        {
          _id: "62da61b275f0c1ac7ff67171",
          dream_color: 3,
          date: "2022/07/22 (금)",
          title: "나는 이소진이다",
          genre: [1, 2, 5],
        },
        {
          _id: "62da5dda75f0c1ac7ff67145",
          dream_color: 3,
          emotion: 7,
          date: "2022/07/22 (금)",
          title: "나는 이소진이다",
          genre: [1, 2, 5],
        },
        {
          _id: "62da4a7a8a188b0faabb20ca",
          dream_color: 0,
          emotion: 0,
          date: "2022/07/22 (금)",
          title: "1",
          genre: [1, 2, 3],
        },
        {
          _id: "62da498d8a188b0faabb20b5",
          dream_color: 0,
          emotion: 0,
          date: "2022/07/22 (금)",
          title: "1",
          genre: [1, 2, 3],
        },
        {
          _id: "62da47918a188b0faabb20ab",
          dream_color: 0,
          emotion: 0,
          date: "2022/07/22 (금)",
          title: "erere",
          genre: [1, 2, 3],
        },
        {
          _id: "62da476b8a188b0faabb20a9",
          dream_color: 0,
          emotion: 0,
          date: "2022/07/22 (금)",
          title: "rr",
          genre: [1, 2, 3],
        },
        {
          _id: "62da46928a188b0faabb209b",
          dream_color: 0,
          emotion: 0,
          date: "2022/07/22 (금)",
          title: "wd",
          genre: [1, 2, 3],
        },
        {
          _id: "62da464a8a188b0faabb2097",
          dream_color: 3,
          emotion: 2,
          date: "2022/07/22 (금)",
          title: "dvd",
          genre: [1, 2, 3],
        },
        {
          _id: "62da45de8a188b0faabb2091",
          dream_color: 3,
          emotion: 2,
          date: "2022/07/22 (금)",
          title: "d",
          genre: [1, 2, 3],
        },
      ],
    });
  });

  //404 Not Found -
  it("꿈 기록 리스트(홈화면) 조회 테스트(올바르지 않은 userId)", async () => {
    const res = await req.get("/record").set("Content-Type", "application/json").set("userId", "2");
    expect(res.status).toBe(404);
    expect(res.body.message).toEqual("존재하지 않는 자원");
  });

  it("꿈 기록 리스트(홈화면) 조회 테스트(userId 없음)", async () => {
    const res = await req.get("/record").set("Content-Type", "application/json");
    expect(res.status).toBe(400);
    expect(res.body.message).toEqual("필요한 값이 없습니다.");
  });
});
