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
      nickname: "레",
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
          _id: "62d9ba36ea5ed1250800ef25",
          dream_color: 1,
          emotion: 4,
          date: "2022/07/22 (금)",
          title: "지민 언니를 위한삭제용 content~~~",
          genre: [1],
        },
        {
          _id: "62d9b9533f57cadcfe637228",
          dream_color: 3,
          emotion: 2,
          date: "2022/07/22 (금)",
          title: "오늘은 7월 20일",
          genre: [1, 2, 5],
        },
        {
          _id: "62d9b8f7ea5ed1250800ef23",
          dream_color: 1,
          emotion: 4,
          date: "2022/07/22 (금)",
          title: "지민 언니를 위한삭제용 content~~~",
          genre: [1],
        },
        {
          _id: "62d96b84cddd4668d381e122",
          dream_color: 3,
          emotion: 2,
          date: "2022/07/22 (금)",
          title: "오늘은 7월 20일",
          genre: [1, 2, 5],
        },
        {
          _id: "62d7bd8c9669f53b6c72a8e7",
          dream_color: 6,
          emotion: 5,
          date: "2022/07/22 (금)",
          title: "술을 많이 마셔서 노래방에서 몇 시간 동안 혼자 자고있었다.",
          genre: [8],
        },
        {
          _id: "62d7bd159669f53b6c72a8e3",
          dream_color: 5,
          emotion: 2,
          date: "2022/07/22 (금)",
          title: "한국이 총기합법화되는 무서운 꿈",
          genre: [5],
        },
        {
          _id: "62d9ba453f57cadcfe637232",
          dream_color: 3,
          emotion: 2,
          date: "2022/07/21 (목)",
          title: "오늘은 7월 20일",
          genre: [1, 2, 5],
        },
        {
          _id: "62d7bcd39669f53b6c72a8df",
          dream_color: 4,
          emotion: 1,
          date: "2022/07/21 (목)",
          title: "컨저링 배경에서 그리스 신전을 지나 노을지는 절경까지",
          genre: [5, 8],
        },
        {
          _id: "62d7bc9a9669f53b6c72a8db",
          dream_color: 2,
          emotion: 2,
          date: "2022/07/21 (목)",
          title: "좀비가 집에 들어와서 화장실로 숨었다",
          genre: [3, 5],
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
});
