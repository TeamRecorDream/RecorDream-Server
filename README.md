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


## commit, coding convention, branch 전략
> https://www.notion.so/Git-504d479dad7042b785e6042f0f7d5083 <br>
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

## 전체 API 로직 구현 진척도
- [ ] GET baseurl 
- [x] PUT baseurl/user/nickname
- [ ] PUT baseurl/user/toggle
- [X] GET baseurl/user
- [ ] PUT baseurl/user/fcm-token
- [X] POST baseurl/voice
- [ ] GET baseurl/voice/:voiceId
- [ ] POST baseurl/record
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



