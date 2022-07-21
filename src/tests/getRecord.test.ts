import request from "supertest";
import app from "../app";

/*
[GET] /record/:recordId
*/
describe("[GET] /record/:recordId", () => {
  const req = request(app);

  //200 OK - 첫번째 레코드로
  it("꿈 기록 조회 테스트", async () => {
    const res = await req.get("/record/62d7b6f19669f53b6c72a89f").set("Content-Type", "application/json").set("userId", "1");
    expect(res.status).toBe(200);
    expect(res.body.data).toEqual({
      _id: "62d7b6f19669f53b6c72a89f",
      writer: "레코드림",
      date: "2022/07/04 (월)",
      title: "병원에서 죽을 뻔 했음 ㄷㄷ",
      voice: null,
      content:
        "오늘 꿈꿨는데 얼마나 무서웠는지 깬 이후로 이 시간까지 하나도 안까먹음. 거의 스릴러 영화같은 연출이었음. 배경은 병원이었는데, 너무 내부가 이쁜거야. 막 엄청 큰 통유리로 둘러쌓여있고 창 밖에 자연경치도 장난아니고. 근데 약간 요양원에 계실거같은 할머니 할아버지들이 많긴 했음. 그래서 친구랑 왜인지는 모르겠지만 거기에 딱 들어갔는데, 병원 입구쪽에 어떤 젊은 여자가 휠체어에 타고있었고, 간호사가 그 사람 데리고 어두운 방으로 들어가는게  보였음. 거기서 부터 좀 쎄했다... 그때 뛰쳐나갔어야했는데;; 그래서 보니까 원래 끝쪽 복도에그 여자분이 탄 상태로 휠체어가 끝만 보이게 걸쳐져있었는데 그게 확 사라진거임. 알고보니 그분이 병원 사람들한테  살해당해서 사라진거.. (장기매매, 해부 이런거였음..) 그래서 나랑 내 친구도 끌려가기 직전이었는데, 거기서 딱 타임리프가 되어서 다시 병원 처음 들어가는 순간으로 이동되었음. 근데 친구는 타임리프된거 모르는거같고 나도 꿈인가? 싶었는데 데자뷰처럼 이번에는 다른 여자분이 휠체어타고 검은 방으로 이동되고있는거야. 그래서 머리 탁 맞은거처럼 소름돋아서 간호사들 앞에서는 모르는 척 하다가 나중에 친구 데리고 밖으로 도망나왓음. 근데 거기 병원 간호사랑 의사들이 우리 잡을라고 막 몇키로를 달리고 우린 도망갈라고 미친듯이 뛰고.. 근데 또 서울 번화가 느낌이 아닌 좀 시골 스탈이어서 어디 도망갈데도 없고.. 그러다가 깼네요… ",
      emotion: 2,
      dream_color: 3,
      genre: [4, 5],
      note: "결론은 너무 무서웠다..~",
    });
  });

  //404 Not Found - 없는 id 조회
  it("꿈 기록 조회 테스트(없는 id)", async () => {
    const res = await req.get("/record/62d7965f150e503ea8b6d9bb").set("Content-Type", "application/json").set("userId", "1");
    expect(res.status).toBe(404);
    expect(res.body.message).toEqual("존재하지 않는 자원");
  });
});
