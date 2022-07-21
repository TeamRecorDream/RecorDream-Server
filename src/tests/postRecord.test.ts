import request from "supertest";
import app from "../app";

/*
[POST] /record/:recordId
*/
describe("[POST] /record", () => {
  const req = request(app);

  //201 CREATED - voice 없음
  it("녹음 없는 꿈 기록 생성 테스트(음성x)", async () => {
    const recordData = {
      title: "aaaaa bbbbb ccccc ddddd eeeee",
      date: "2022-07-19T10:00:49.196",
      content: "귀엽다",
      emotion: 2,
      dream_color: 3,
      genre: [2, 5],
      note: null,
      writer: "62c9cf068094605c781a2fb9",
      voice: null,
    };

    const res = await req.post("/record").send(recordData).set("Content-Type", "application/json").set("userId", "1");
    expect(res.status).toBe(201);
    const recordId = res.body.data._id;
    const resDelete = await req
      .delete("/record/" + recordId)
      .set("Content-Type", "application/json")
      .set("userId", "1");
    expect(resDelete.status).toBe(204); //바로 삭제
  });

  //201 CREATED - voice 있음
  it("녹음 없는 꿈 기록 생성 테스트(음성o)", async () => {
    const recordData = {
      title: "오늘은 7월 20일",
      date: "2022-07-19T10:00:49.196",
      content: "귀엽다",
      emotion: 2,
      dream_color: 3,
      genre: [2, 5],
      note: null,
      writer: "62c9cf068094605c781a2fb9",
      voice: "62d1745119a54968acdd7270",
    };

    const res = await req.post("/record").send(recordData).set("Content-Type", "application/json").set("userId", "1");
    expect(res.status).toBe(201);
    const recordId = res.body.data._id;
    const resGet = await req
      .get("/record/" + recordId)
      .set("Content-Type", "application/json")
      .set("userId", "1");
    expect(resGet.status).toBe(200);
    expect(resGet.body.data.voice.url).toEqual(
      "https://recordream-sample.s3.ap-northeast-2.amazonaws.com/1657893969535_test.wav"
    );
    const resDelete = await req
      .delete("/record/" + recordId)
      .set("Content-Type", "application/json")
      .set("userId", "1");
    expect(resDelete.status).toBe(204); //바로 삭제
  });

  //201 CREATED - emotion, dream_color, genre 디폴트 값 확인
  it("녹음 없는 꿈 기록 생성 테스트(not required들 null로)", async () => {
    const recordData = {
      title: "오늘은 7월 20일",
      date: "2022-07-19T10:00:49.196",
      content: null,
      emotion: null,
      dream_color: null,
      genre: null,
      note: null,
      writer: "62c9cf068094605c781a2fb9",
      voice: null,
    };

    const res = await req.post("/record").send(recordData).set("Content-Type", "application/json").set("userId", "1");
    expect(res.status).toBe(201);
    const recordId = res.body.data._id;
    const resGet = await req
      .get("/record/" + recordId)
      .set("Content-Type", "application/json")
      .set("userId", "1");
    expect(resGet.status).toBe(200);
    expect(resGet.body.data.emotion).toEqual(7);
    expect(resGet.body.data.dream_color).toEqual(0);
    expect(resGet.body.data.genre).toEqual([10]);
    expect(resGet.body.data.content).toBeNull();
    expect(resGet.body.data.note).toBeNull();
    expect(resGet.body.data.voice).toBeNull();
    const resDelete = await req
      .delete("/record/" + recordId)
      .set("Content-Type", "application/json")
      .set("userId", "1");
    expect(resDelete.status).toBe(204); //바로 삭제
  });

  //400 Bad Request - 제목 오류(공백)
  it("꿈 기록 생성 테스트 - 제목 오류(공백)", async () => {
    const recordData = {
      title: " ",
      date: "2022-07-19T10:00:49.196",
      content: null,
      emotion: null,
      dream_color: null,
      genre: null,
      note: null,
      writer: "62c9cf068094605c781a2fb9",
      voice: null,
    };

    const res = await req.post("/record").send(recordData).set("Content-Type", "application/json").set("userId", "1");
    expect(res.status).toBe(400);
    expect(res.body.message).toEqual("제목이 없거나 길이를 초과하였습니다");
  });

  //400 Bad Request - 제목 오류(글자 수 초과)
  it("꿈 기록 생성 테스트 - 제목 오류(글자 수 초과)", async () => {
    const recordData = {
      title: "aaaaabbbbbcccccdddddeeeeef",
      date: "2022-07-19T10:00:49.196",
      content: null,
      emotion: null,
      dream_color: null,
      genre: null,
      note: null,
      writer: "62c9cf068094605c781a2fb9",
      voice: null,
    };

    const res = await req.post("/record").send(recordData).set("Content-Type", "application/json").set("userId", "1");
    expect(res.status).toBe(400);
    expect(res.body.message).toEqual("제목이 없거나 길이를 초과하였습니다");
  });

  //400 Bad Request - 감정, 색깔, 장르 오류(emotion<0, dream_color<0, genre원소<0)
  it("꿈 기록 생성 테스트 - 감정, 색깔, 장르 오류(emotion<0)", async () => {
    const recordData = {
      title: "aaaaabbbbbcccccdddddeeeee",
      date: "2022-07-19T10:00:49.196",
      content: null,
      emotion: -2,
      dream_color: null,
      genre: null,
      note: null,
      writer: "62c9cf068094605c781a2fb9",
      voice: null,
    };

    const res = await req.post("/record").send(recordData).set("Content-Type", "application/json").set("userId", "1");
    expect(res.status).toBe(400);
    expect(res.body.message).toEqual("감정, 색깔, 장르 범위 오류입니다");
  });
  it("꿈 기록 생성 테스트 - 감정, 색깔, 장르 오류(dream_color<0)", async () => {
    const recordData = {
      title: "aaaaabbbbbcccccdddddeeeee",
      date: "2022-07-19T10:00:49.196",
      content: null,
      emotion: null,
      dream_color: -1,
      genre: null,
      note: null,
      writer: "62c9cf068094605c781a2fb9",
      voice: null,
    };

    const res = await req.post("/record").send(recordData).set("Content-Type", "application/json").set("userId", "1");
    expect(res.status).toBe(400);
    expect(res.body.message).toEqual("감정, 색깔, 장르 범위 오류입니다");
  });
  it("꿈 기록 생성 테스트 - 감정, 색깔, 장르 오류(genre원소<0)", async () => {
    const recordData = {
      title: "aaaaabbbbbcccccdddddeeeee",
      date: "2022-07-19T10:00:49.196",
      content: null,
      emotion: null,
      dream_color: null,
      genre: [-2],
      note: null,
      writer: "62c9cf068094605c781a2fb9",
      voice: null,
    };

    const res = await req.post("/record").send(recordData).set("Content-Type", "application/json").set("userId", "1");
    expect(res.status).toBe(400);
    expect(res.body.message).toEqual("감정, 색깔, 장르 범위 오류입니다");
  });

  //400 Bad Request - 감정, 색깔, 장르 오류(emotion>6, dream_color>6, genre원소>9)
  it("꿈 기록 생성 테스트 - 감정, 색깔, 장르 오류(emotion>6)", async () => {
    const recordData = {
      title: "aaaaabbbbbcccccdddddeeeee",
      date: "2022-07-19T10:00:49.196",
      content: null,
      emotion: 7,
      dream_color: null,
      genre: null,
      note: null,
      writer: "62c9cf068094605c781a2fb9",
      voice: null,
    };

    const res = await req.post("/record").send(recordData).set("Content-Type", "application/json").set("userId", "1");
    expect(res.status).toBe(400);
    expect(res.body.message).toEqual("감정, 색깔, 장르 범위 오류입니다");
  });
  it("꿈 기록 생성 테스트 - 감정, 색깔, 장르 오류(dream_color>6)", async () => {
    const recordData = {
      title: "aaaaabbbbbcccccdddddeeeee",
      date: "2022-07-19T10:00:49.196",
      content: null,
      emotion: null,
      dream_color: 7,
      genre: null,
      note: null,
      writer: "62c9cf068094605c781a2fb9",
      voice: null,
    };

    const res = await req.post("/record").send(recordData).set("Content-Type", "application/json").set("userId", "1");
    expect(res.status).toBe(400);
    expect(res.body.message).toEqual("감정, 색깔, 장르 범위 오류입니다");
  });
  it("꿈 기록 생성 테스트 - 감정, 색깔, 장르 오류(genre원소>9)", async () => {
    const recordData = {
      title: "aaaaabbbbbcccccdddddeeeee",
      date: "2022-07-19T10:00:49.196",
      content: null,
      emotion: null,
      dream_color: null,
      genre: [1, 2, 10],
      note: null,
      writer: "62c9cf068094605c781a2fb9",
      voice: null,
    };

    const res = await req.post("/record").send(recordData).set("Content-Type", "application/json").set("userId", "1");
    expect(res.status).toBe(400);
    expect(res.body.message).toEqual("감정, 색깔, 장르 범위 오류입니다");
  });

  //400 Bad Request - 감정, 색깔, 장르 오류(genre=[])
  it("꿈 기록 생성 테스트 - 감정, 색깔, 장르 오류(genre=[])", async () => {
    const recordData = {
      title: "aaaaabbbbbcccccdddddeeeee",
      date: "2022-07-19T10:00:49.196",
      content: null,
      emotion: null,
      dream_color: null,
      genre: [],
      note: null,
      writer: "62c9cf068094605c781a2fb9",
      voice: null,
    };

    const res = await req.post("/record").send(recordData).set("Content-Type", "application/json").set("userId", "1");
    expect(res.status).toBe(400);
    expect(res.body.message).toEqual("감정, 색깔, 장르 범위 오류입니다");
  });

  //400 Bad Request - 감정, 색깔, 장르 오류(genre=[1,2,3,4] - 4개 이상)
  it("꿈 기록 생성 테스트 - 감정, 색깔, 장르 오류(genre=[])", async () => {
    const recordData = {
      title: "aaaaabbbbbcccccdddddeeeee",
      date: "2022-07-19T10:00:49.196",
      content: null,
      emotion: null,
      dream_color: null,
      genre: [1, 2, 3, 4],
      note: null,
      writer: "62c9cf068094605c781a2fb9",
      voice: null,
    };

    const res = await req.post("/record").send(recordData).set("Content-Type", "application/json").set("userId", "1");
    expect(res.status).toBe(400);
    expect(res.body.message).toEqual("감정, 색깔, 장르 범위 오류입니다");
  });
});
