# 마인드스케일링 웹사이트 프로젝트

## 프로젝트 소개

- 제작 계기: 개발자 취업을 준비하며 항상 여러가지 고민을 하고, 미래에 대한 불안감, 사회적 관계 축소 등 외로운 시간을 지내고 있어서, 이러한 힘든 시간을 보내고 있는 다른 사람들과 서로의 고민을 공유하며 이야기를 나눠볼 수 있는 웹서비스가 있으면 어떨까 생각을 하며 만들게 되었습니다.
- 웹사이트가 기여할 수 있는 점
  - 힘든 시간을 보내며 외로운 시간을 보내고 있는 회원끼리 이야기를 주고받을 수 있어서 외로움을 조금이라도 덜어낼 수 있습니다.
  - 일상 또는 직장에서 생긴 고민을 주변 지인들에게 말하기 곤란할 때, 커뮤니티를 이용하여 고민을 해결할 수 있습니다.
  - 어느 누구에게도 고민을 말하기 곤란한데 고민이나 스트레스를 어딘가 적고싶을 때, 일기장 서비스를 이용하여 기록할 수 있습니다.
- 제작 기간: 2024.02.27 ~ 2024.03.25
- 제작 인원: 1명 (프론트엔드 - 문창기)
- 웹사이트:
- 사용 기술스택
  - 프론트엔드
    ![](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=JavaScript&logoColor=white)
    ![](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=white)
    ![](https://img.shields.io/badge/NextJS-000000?style=flat-square&logo=NextJS&logoColor=white)
    ![](https://img.shields.io/badge/Typescript-3178C6?style=flat-square&logo=Typescript&logoColor=white)
    ![](https://img.shields.io/badge/TailwindCSS-06B6D4?style=flat-square&logo=TailwindCSS&logoColor=white)
  - 백엔드 및 호스팅
    ![](https://img.shields.io/badge/Prisma-2D3748?style=flat-square&logo=Prisma&logoColor=white)
    ![](https://img.shields.io/badge/PlanetScale-000000?style=flat-square&logo=PlanetScale&logoColor=white)
    ![](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=Vercel&logoColor=white)
  - AI
    ![](https://img.shields.io/badge/OpenAI-412991?style=flat-square&logo=OpenAI&logoColor=white)

## 시작 가이드

### 요구사항

- React 18.2.0
- Next.JS 14.1.0
- Next-auth 4.24.6
- Redux 5.0.1
- react-redux 9.1.0
- swr 2.2.5
- zod 3.22.4
- axios 1.6.7
- Prisma 5.10.2
- Tailwind CSS 3.3.0
- Typescript 5.3.3

### 설치

```
$ git clone https://github.com/byeolee1221/mind-scailing.git
$ cd mind-scailing
$ npm install
$ npm run dev
```

## 화면 구성

| 메인페이지 | 내 글 페이지 |
| :--------: | :--------: |
|<img src="/public/mainpage.png" width="400" height="400">|<img src="/public/myPostPage.png" width="400" height="400">|
| 검색페이지 | 일기장페이지 |
|<img src="/public/searchPage.png" width="400" height="400">|<img src="/public/myDiaryPage.png" width="400" height="400">|
| 프로필페이지 | 커뮤니티페이지 |
|<img src="/public/profilePage.png" width="400" height="400">|<img src="/public/boardPage.png" width="400" height="400">|
| 게시글페이지 | 댓글페이지 |
|<img src="/public/detailPage.png" width="400" height="400">|<img src="/public/commentPage.png" width="400" height="400">|
| 알림페이지 | 공감 누른 게시글조회 페이지 |
|<img src="/public/alarmPage.png" width="400" height="400">|<img src="/public/likePostPage.png" width="400" height="400">|
| 프로필이름 변경 | 계정 연결해제 |
|<img src="/public/profileNameChangePage.png" width="400" height="400">|<img src="/public/accountExpirePage.png" width="400" height="400">|