

# 💜RecorDream-Server
> <img src="https://user-images.githubusercontent.com/76062959/178496227-8a0d25cd-73c9-420e-b042-5733c1455f59.png" width = "5%"> 👩‍💻 드림팀 서버 👩‍💻  <br>

<br />

## About
<img src="https://user-images.githubusercontent.com/76062959/178496454-6556d901-884d-4e7b-a090-1427d34d427c.png" width = "60%"><br>
<br />


## Collection 설계
> <img src="https://user-images.githubusercontent.com/76062959/178497382-47953217-a928-4673-9ed2-f9511a2775d4.png" width = "60%">  <br>
<br />


## 팀원 소개 및 역할 분담

|<img src="https://user-images.githubusercontent.com/76062959/178496227-8a0d25cd-73c9-420e-b042-5733c1455f59.png" width=200>|<img src="https://user-images.githubusercontent.com/76062959/178496227-8a0d25cd-73c9-420e-b042-5733c1455f59.png" width=200>|<img src="https://user-images.githubusercontent.com/76062959/178496227-8a0d25cd-73c9-420e-b042-5733c1455f59.png" width=200>|
|:--:|:--:|:--:|
|**서경**|**서연**|**시연**|
|[@Seokyeong237](https://github.com/Seokyeong237)|[@ChooSeoyeon](https://github.com/ChooSeoyeon)|[@ksiyeon27](https://github.com/ksiyeon27)|
> [API 역할 분담](https://www.notion.so/API-d2c07056e6e048c082b0c3639b34f49d) <br>
<br />


## Branch 전략, Commit Convention
<details>
<summary>❗️ Git Workflow</summary>

### main → develop → feature/이슈번호-기능, fix/이슈번호-기능, refactor/이슈번호-기능

1. local - feature/이슈번호-기능 에서 각자 작업
2. 작업 완료 후 remote - develop 에 PR
3. 코드 리뷰 후 Confirm 받고 Merge
4. remote - develop 에 Merge 될 때 마다 모든 팀원 remote - develop pull 받아 최신 상태 유지
</details>  

<details>
<summary>❗️ Commit Convention</summary>

|태그 이름|설명|
|------|---|
|[Feat]|새로운 기능 구현|
|[Fix]|버그, 오류 수정|
|[Hotfix]|issue나 QA에서 급한 버그 수정|
|[Docs]|문서 수정|
|[Test]|코드 수정, 내부 파일 수정|
|[Chore]|issue나|
|[Del]|불필요한 코드 삭제|
|[Refactor]|전면 수정|
|[Merge]|다른 브랜치를 merge 할 때 사용|
|[Add]|Feat 이외의 부수적인 코드 추가, 라이브러리 추가, 새로운 파일 생성 시|
|[Rename]|파일 이름 변경 시 사용|
|[Move]|프로젝트 내 파일이나 코드의 이동|
 
</details> <br>
<br />


## Coding Convention
<details>
<summary>변수</summary>

1. 변수나 함수명은 `camelCase`를 사용한다.
2. 함수의 경우 동사+명사 사용한다.
- ex) getRecords()
3. flag로 사용 되는 변수는 조동사 + flag 종류로 구성한다.
- ex) isDeleted
4. Class /  Interface / Type / Namespace / Enum 명은 `PascalCase`를 사용한다.
5. 약어는 되도록 사용하지 않는다.
- 부득이하게 약어가 필요하다고 판단되는 경우 팀원과 상의를 거친다.
 
</details> 
<details>
<summary>주석</summary>
1. 한 줄 주석은 // 를 사용한다.

```
  // 한줄 주석일 때
  /**
  * 여러줄
  * 주석일 때
  */
```

2. 컨트롤러에 대한 주석

```
/**
 * @route POST /record
 * @desc Create Record
 * @access Public
 */
```

</details> 
<details>
<summary>Bracket</summary>

- [Prettier](https://prettier.io/)
- [Eslint](https://eslint.org/)
</details> <br>
<br />



## 프로젝트 폴더 구조

```
---📁src
------📄index.ts
------📁config
---------📄index.ts
------📁controllers
---------📄index.ts
---------📄AuthController.ts
---------📄NoticeController.ts
---------📄RecordController.ts
---------📄UserController.ts
---------📄VoiceController.ts
------📁interfaces
---------📁auth
---------📁common
---------📁notice
---------📁record
---------📁user
---------📁voice
------📁loaders
---------📄db.ts
------📁middleware
---------📄auth.ts
------📁models
---------📄Notice.ts
---------📄Record.ts
---------📄User.ts
---------📄UserMocking.ts
---------📄Voice.ts
------📁modules
---------📄responseMessage.ts
---------📄statusCode.ts
---------📄util.ts
------📁routes
---------📄index.ts
---------📄AuthRouter.ts
---------📄NoticeRouter.ts
---------📄RecordRouter.ts
---------📄UserRouter.ts
---------📄VoiceRouter.ts
------📁services
---------📄index.ts
---------📄AuthService.ts
---------📄NoticeService.ts
---------📄RecordService.ts
---------📄UserService.ts
---------📄VoiceService.ts
``` 
<br>
<br />

## 전체 API 로직 구현 진척도
- [ ] GET baseurl 
- [X] PUT baseurl/user/nickname
- [ ] PUT baseurl/user/toggle
- [X] GET baseurl/user
- [ ] PUT baseurl/user/fcm-token
- [X] POST baseurl/voice
- [X] GET baseurl/voice/:voiceId
- [X] POST baseurl/record
- [ ] PATCH baseurl/record/:recordId
- [ ] PUT baseurl/record/:recordId
- [ ] GET baseurl/record/:recordId
- [ ] DELETE baseurl/record/:recordId
- [ ] GET baseurl/record/storage?filter=
- [ ] GET baseurl/record/search?keyword=
- [ ] POST baseurl/notice
- [ ] PUT baseurl/notice/:noticeId


 
<br>
<br />



