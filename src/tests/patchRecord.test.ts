import request from "supertest";
import app from "../app";

/*
[PATCH] /record/:recordId
*/

describe("[PATCH] /record/:recordId", () => {
  const req = request(app);
  let recordId: string;
  const postData = {
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
  let updateData = {
    title: "aaaaabbbbbcccccdddddeeeee",
    date: "2022-07-22T11:14:49.196",
    content: "고쳐라",
    emotion: 4,
    dream_color: 1,
    genre: [1],
    note: "ads",
  };

  beforeEach(async () => {
    updateData = {
      title: "aaaaabbbbbcccccdddddeeeee",
      date: "2022-07-22T11:14:49.196",
      content: "고쳐라",
      emotion: 4,
      dream_color: 1,
      genre: [1],
      note: "ads",
    };
    const resPost = await req.post("/record").send(postData).set("Content-Type", "application/json").set("userId", "1");
    expect(resPost.status).toBe(201);
    recordId = resPost.body.data._id;
  });
  afterEach(async () => {
    const resDelete = await req
      .delete("/record/" + recordId)
      .set("Content-Type", "application/json")
      .set("userId", "1");
    expect(resDelete.status).toBe(204);
  });

  //200 OK - 꿈 기록 수정 성공
  it("꿈 기록 수정 테스트(정상)", async () => {
    const resPatch = await req
      .patch("/record/" + recordId)
      .send(updateData)
      .set("Content-Type", "application/json")
      .set("userId", "1");
    expect(resPatch.status).toBe(200);
    expect(resPatch.body.message).toEqual("꿈 기록 수정 성공");
    const resGet = await req
      .get("/record/" + recordId)
      .set("Content-Type", "application/json")
      .set("userId", "1");
    expect(resGet.status).toBe(200);
    expect(resGet.body.data).toEqual({
      _id: recordId,
      writer: "레코드림",
      date: "2022/07/22 (금)",
      title: "aaaaabbbbbcccccdddddeeeee",
      voice: null,
      content: "고쳐라",
      emotion: 4,
      dream_color: 1,
      genre: [1],
      note: "ads",
    });
  });

  //404 Not Found - 없는 id 수정 시도
  it("꿈 기록 수정 테스트(없는 id)", async () => {
    const res = await req
      .patch("/record/62d7965f150e503ea8b6d9bb")
      .send(updateData)
      .set("Content-Type", "application/json")
      .set("userId", "1");
    expect(res.status).toBe(404);
    expect(res.body.message).toEqual("존재하지 않는 자원");
  });

  //400 Bad Request - 제목 오류(공백)
  it("꿈 기록 수정 테스트 - 제목 오류(공백)", async () => {
    updateData.title = " ";
    const res = await req
      .patch("/record/" + recordId)
      .send(updateData)
      .set("Content-Type", "application/json")
      .set("userId", "1");
    expect(res.status).toBe(400);
    expect(res.body.message).toEqual("제목 오류 또는 음성/작성자 수정 시도");
  });

  //400 Bad Request - 제목 오류(글자 수 초과)
  it("꿈 기록 수정 테스트 - 제목 오류(글자 수 초과)", async () => {
    updateData.title = "aaaaabbbbbcccccdddddeeeee f";
    const res = await req
      .patch("/record/" + recordId)
      .send(updateData)
      .set("Content-Type", "application/json")
      .set("userId", "1");
    expect(res.status).toBe(400);
    expect(res.body.message).toEqual("제목 오류 또는 음성/작성자 수정 시도");
  });

  //400 Bad Request - 감정, 색깔, 장르 오류(emotion<0, dream_color<0, genre원소<0)
  it("꿈 기록 수정 테스트 - 감정, 색깔, 장르 오류(emotion<0)", async () => {
    updateData.emotion = -1;
    const res = await req
      .patch("/record/" + recordId)
      .send(updateData)
      .set("Content-Type", "application/json")
      .set("userId", "1");
    expect(res.status).toBe(400);
    expect(res.body.message).toEqual("감정, 색깔, 장르 범위 오류입니다");
  });
  it("꿈 기록 수정 테스트 - 감정, 색깔, 장르 오류(dream_color<0)", async () => {
    updateData.dream_color = -1;
    const res = await req
      .patch("/record/" + recordId)
      .send(updateData)
      .set("Content-Type", "application/json")
      .set("userId", "1");
    expect(res.status).toBe(400);
    expect(res.body.message).toEqual("감정, 색깔, 장르 범위 오류입니다");
  });
  it("꿈 기록 수정 테스트 - 감정, 색깔, 장르 오류(genre원소<0)", async () => {
    updateData.genre = [-1];
    const res = await req
      .patch("/record/" + recordId)
      .send(updateData)
      .set("Content-Type", "application/json")
      .set("userId", "1");
    expect(res.status).toBe(400);
    expect(res.body.message).toEqual("감정, 색깔, 장르 범위 오류입니다");
  });

  //400 Bad Request - 감정, 색깔, 장르 오류(emotion>6, dream_color>6, genre원소>9)
  it("꿈 기록 수정 테스트 - 감정, 색깔, 장르 오류(emotion>6)", async () => {
    updateData.emotion = 7;
    const res = await req
      .patch("/record/" + recordId)
      .send(updateData)
      .set("Content-Type", "application/json")
      .set("userId", "1");
    expect(res.status).toBe(400);
    expect(res.body.message).toEqual("감정, 색깔, 장르 범위 오류입니다");
  });
  it("꿈 기록 수정 테스트 - 감정, 색깔, 장르 오류(dream_color>6)", async () => {
    updateData.dream_color = 7;
    const res = await req
      .patch("/record/" + recordId)
      .send(updateData)
      .set("Content-Type", "application/json")
      .set("userId", "1");
    expect(res.status).toBe(400);
    expect(res.body.message).toEqual("감정, 색깔, 장르 범위 오류입니다");
  });
  it("꿈 기록 수정 테스트 - 감정, 색깔, 장르 오류(genre원소>9)", async () => {
    updateData.genre = [10];
    const res = await req
      .patch("/record/" + recordId)
      .send(updateData)
      .set("Content-Type", "application/json")
      .set("userId", "1");
    expect(res.status).toBe(400);
    expect(res.body.message).toEqual("감정, 색깔, 장르 범위 오류입니다");
  });

  //400 Bad Request - 감정, 색깔, 장르 오류(genre=[])
  it("꿈 기록 수정 테스트 - 감정, 색깔, 장르 오류(genre=[])", async () => {
    updateData.genre = [];
    const res = await req
      .patch("/record/" + recordId)
      .send(updateData)
      .set("Content-Type", "application/json")
      .set("userId", "1");
    expect(res.status).toBe(400);
    expect(res.body.message).toEqual("감정, 색깔, 장르 범위 오류입니다");
  });

  //400 Bad Request - 감정, 색깔, 장르 오류(genre=[1,2,3,4] - 4개 이상)
  it("꿈 기록 수정 테스트 - 감정, 색깔, 장르 오류(genre=[])", async () => {
    updateData.genre = [1, 2, 3, 4];
    const res = await req
      .patch("/record/" + recordId)
      .send(updateData)
      .set("Content-Type", "application/json")
      .set("userId", "1");
    expect(res.status).toBe(400);
    expect(res.body.message).toEqual("감정, 색깔, 장르 범위 오류입니다");
  });
});
