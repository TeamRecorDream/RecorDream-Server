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
        {
          _id: "62d7bc6f9669f53b6c72a8d7",
          dream_color: 3,
          emotion: 4,
          date: "2022/07/20 (수)",
          title: "친구가 모르는 사람들이랑 술약을 잡아버렸다",
          genre: [8],
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
          _id: "62d7bc0d9669f53b6c72a8cf",
          dream_color: 6,
          emotion: 6,
          date: "2022/07/19 (화)",
          title: "연예인 친구와 공유 작업실에 갔다",
          genre: [9],
        },
        {
          _id: "62d7bbb29669f53b6c72a8cb",
          dream_color: 4,
          emotion: 1,
          date: "2022/07/18 (월)",
          title: "인플루언서의 연남 탐방",
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
          _id: "62d7bb239669f53b6c72a8c3",
          dream_color: 2,
          emotion: 6,
          date: "2022/07/16 (토)",
          title: "제주도에 여행간 사고뭉치 금쪽드림팀",
          genre: [8],
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
