import request from "supertest";
import app from "../app";
/*
[PATCH] /record/:recordId
*/
describe("[PATCH] /record/:recordId", () => {
  const req = request(app);
  let recordId: string;
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
  beforeEach(async () => {
    const resPost = await req.post("/record").send(recordData).set("Content-Type", "application/json").set("userId", "1");
    expect(resPost.status).toBe(201);
    recordId = resPost.body.data._id;
    console.log(recordId);
  });
  afterEach(async () => {
    console.log(recordId);
    const resDelete = await req
      .delete("/record/" + recordId)
      .set("Content-Type", "application/json")
      .set("userId", "1");
    expect(resDelete.status).toBe(204);
  });

  //200 OK - 꿈 기록 수정 성공
  it("꿈 기록 수정 테스트(정상)", async () => {
    const updateData = {
      title: "aaaaabbbbbcccccdddddeeeee",
      date: "2022-07-22T11:14:49.196",
      content: "고쳐라",
      emotion: 4,
      dream_color: 1,
      genre: [1],
      note: "ads",
    };
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
});
