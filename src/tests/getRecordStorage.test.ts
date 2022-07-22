import request from "supertest";
import app from "../app";

/**
 * [GET] /record/storage/list?filter=
 */
describe("[GET] /record/storage/list?filter=", () => {
  const req = request(app);

  //200 OK
  it("꿈 기록 리스트(보관함) 조회 테스트(filter=5)", async () => {
    const res = await req.get("/record/storage/list?filter=5").set("Content-Type", "application/json").set("userId", "1");
    expect(res.status).toBe(200);
    expect(res.body.data).toEqual({
      records_count: 3,
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
          _id: "62d7ba939669f53b6c72a8bb",
          dream_color: 3,
          emotion: 5,
          date: "2022/07/16 (토)",
          title: "헤어질 결심",
          genre: [8],
        },
        {
          _id: "62d7b9989669f53b6c72a8ab",
          dream_color: 2,
          emotion: 5,
          date: "2022/07/11 (월)",
          title: "왕따당했어...ㅠ",
          genre: [9],
        },
      ],
    });
  });

  //200 OK
  it("꿈 기록 리스트(보관함) 조회 테스트(all)", async () => {
    const res = await req.get("/record/storage/list?filter=0").set("Content-Type", "application/json").set("userId", "1");
    expect(res.status).toBe(200);
    expect(res.body.data).toEqual({
      records_count: 27,
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
          _id: "62da7604922301b8af34a3d0",
          dream_color: 3,
          emotion: 3,
          date: "2022/07/22 (금)",
          title: "나는 이소진이다",
          genre: [1, 2, 5],
        },
        {
          _id: "62da743c922301b8af34a3ba",
          dream_color: 3,
          emotion: 3,
          date: "2022/07/22 (금)",
          title: "나는 이소진이다",
          genre: [1, 2, 5],
        },
        {
          _id: "62da72d27f16410492db96a0",
          dream_color: 3,
          emotion: 1,
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
        {
          _id: "62d7baef9669f53b6c72a8bf",
          dream_color: 1,
          emotion: 1,
          date: "2022/07/16 (토)",
          title: "당돌한 초등학교 6학년 남자아이",
          genre: [0, 8],
        },
        {
          _id: "62d7ba939669f53b6c72a8bb",
          dream_color: 3,
          emotion: 5,
          date: "2022/07/16 (토)",
          title: "헤어질 결심",
          genre: [8],
        },
        {
          _id: "62d7ba5f9669f53b6c72a8b7",
          dream_color: 1,
          emotion: 1,
          date: "2022/07/15 (금)",
          title: "장롱면허 탈출했으나 바로 사고 나버리기~",
          genre: [2],
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
          _id: "62d7b9989669f53b6c72a8ab",
          dream_color: 2,
          emotion: 5,
          date: "2022/07/11 (월)",
          title: "왕따당했어...ㅠ",
          genre: [9],
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
        {
          _id: "62d7b6f19669f53b6c72a89f",
          dream_color: 3,
          emotion: 2,
          date: "2022/07/04 (월)",
          title: "병원에서 죽을 뻔 했음 ㄷㄷ",
          genre: [4, 5],
        },
        {
          _id: "62da780f922301b8af34a404",
          dream_color: 4,
          emotion: 4,
          date: "1970/01/09 (금)",
          title: "Ggg",
          genre: [2, 3],
        },
        {
          _id: "62da751d922301b8af34a3be",
          dream_color: 5,
          emotion: 2,
          date: "1970/01/09 (금)",
          title: "Gg",
          genre: [7, 2, 3],
        },
        {
          _id: "62da7405922301b8af34a3b8",
          dream_color: 3,
          emotion: 2,
          date: "1970/01/09 (금)",
          title: "Hhh",
          genre: [1, 7],
        },
        {
          _id: "62da72ca922301b8af34a3a8",
          dream_color: 4,
          emotion: 3,
          date: "1970/01/09 (금)",
          title: "ㅎㅎ기록하기 작성중",
          genre: [1, 7, 3],
        },
      ],
    });
  });

  //404 Not Found
  it("꿈 기록 리스트(보관함) 조회 테스트(존재하지 않는 filter 값)", async () => {
    const res = await req.get("/record/storage/list?filter=7").set("Content-Type", "application/json").set("userId", "1");
    expect(res.status).toBe(404);
    expect(res.body.message).toEqual("존재하지 않는 자원");
  });

  //404 Not Found
  it("꿈 기록 리스트(보관함) 조회 테스트(올바르지 않은 userId)", async () => {
    const res = await req.get("/record/storage/list?filter=5").set("Content-Type", "application/json").set("userId", "2");
    expect(res.status).toBe(404);
    expect(res.body.message).toEqual("존재하지 않는 자원");
  });

  //400 Null Value
  it("꿈 기록 리스트(보관함) 조회 테스트(userId 없음)", async () => {
    const res = await req.get("/record/storage/list?filter=5").set("Content-Type", "application/json");
    expect(res.status).toBe(400);
    expect(res.body.message).toEqual("필요한 값이 없습니다.");
  });
});
