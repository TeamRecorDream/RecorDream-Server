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

/*
[DELETE] /record/:recordId
*/
describe("[DELETE] baseurl/record/:recordId", () => {
  const req = request(app);

  //204 No Content - 정상적으로 삭제 (만들어서 확인하고 지우고 확인하고)
  it("꿈 기록 삭제 테스트(정상)", async () => {
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
    const resPost = await req.post("/record").send(recordData).set("Content-Type", "application/json").set("userId", "1");
    expect(resPost.status).toBe(201);
    const recordId = resPost.body.data._id;
    const resGet = await req
      .get("/record/" + recordId)
      .set("Content-Type", "application/json")
      .set("userId", "1");
    expect(resGet.status).toBe(200);
    const resDelete = await req
      .delete("/record/" + recordId)
      .set("Content-Type", "application/json")
      .set("userId", "1");
    expect(resDelete.status).toBe(204);
    const resGetAgain = await req
      .get("/record/" + recordId)
      .set("Content-Type", "application/json")
      .set("userId", "1");
    expect(resGetAgain.status).toBe(404);
  });

  //404 Not Found - 없는 id 삭제
  it("꿈 기록 삭제 테스트(없는 id)", async () => {
    const resGet = await req.get("/record/62d7965f150e503ea8b6d9bb").set("Content-Type", "application/json").set("userId", "1");
    expect(resGet.status).toBe(404);
    expect(resGet.body.message).toEqual("존재하지 않는 자원");
    const resDelete = await req
      .delete("/record/62d7965f150e503ea8b6d9bb")
      .set("Content-Type", "application/json")
      .set("userId", "1");
    expect(resDelete.status).toBe(404);
    expect(resDelete.body.message).toEqual("존재하지 않는 자원");
  });
});

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
});
