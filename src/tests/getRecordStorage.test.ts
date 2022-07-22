import request from "supertest";
import app from "../app";

/**
 * [GET] /record/storage/list?filter=
 */
describe("[GET] /record/storage/list?filter=", () => {
  const req = request(app);

  //200 OK
  it("꿈 기록 리스트(보관함) 조회 테스트", async () => {
    const res = await req.get("/record/storage/list?filter=2").set("Content-Type", "application/json").set("userId", "1");
    expect(res.status).toBe(200);
    expect(res.body.data).toEqual({
      records_count: 11,
      records: [
        {
          _id: "62d9b9533f57cadcfe637228",
          dream_color: 3,
          emotion: 2,
          date: "2022/07/22 (금)",
          title: "오늘은 7월 20일",
          genre: [1, 2, 5],
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
          _id: "62d7bc9a9669f53b6c72a8db",
          dream_color: 2,
          emotion: 2,
          date: "2022/07/21 (목)",
          title: "좀비가 집에 들어와서 화장실로 숨었다",
          genre: [3, 5],
        },
        {
          _id: "62d96ad7cddd4668d381e11c",
          dream_color: 3,
          emotion: 2,
          date: "2022/07/20 (수)",
          title: "오늘은 7월 20일",
          genre: [1, 2, 5],
        },
        {
          _id: "62d7bc409669f53b6c72a8d3",
          dream_color: 1,
          emotion: 2,
          date: "2022/07/20 (수)",
          title: "확대된 피그마에서 OPR 작업하는 꿈을 꿨다",
          genre: [9],
        },
        {
          _id: "62d7bb799669f53b6c72a8c7",
          dream_color: 5,
          emotion: 2,
          date: "2022/07/17 (일)",
          title: "바닥이 무너져도 어떻게든 살아남는 럭키걸",
          genre: [2, 5],
        },
        {
          _id: "62d7ba2a9669f53b6c72a8b3",
          dream_color: 6,
          emotion: 2,
          date: "2022/07/15 (금)",
          title: "무서운 엄마 친구와 소매치기를 잡은 장동윤",
          genre: [3, 5],
        },
        {
          _id: "62d7b9e69669f53b6c72a8af",
          dream_color: 4,
          emotion: 2,
          date: "2022/07/14 (목)",
          title: "무서운 메인피엠",
          genre: [0, 8],
        },
        {
          _id: "62d7b6f19669f53b6c72a89f",
          dream_color: 3,
          emotion: 2,
          date: "2022/07/04 (월)",
          title: "병원에서 죽을 뻔 했음 ㄷㄷ",
          genre: [4, 5],
        },
      ],
    });
  });

  //404 Not Found -
  it("꿈 기록 리스트(보관함) 조회 테스트(올바르지 않은 userId)", async () => {
    const res = await req.get("/record/storage/list?filter=2").set("Content-Type", "application/json").set("userId", "2");
    expect(res.status).toBe(404);
    expect(res.body.message).toEqual("존재하지 않는 자원");
  });
});
