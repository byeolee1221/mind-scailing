# 마인드스케일링 웹사이트 프로젝트

## 프로젝트 소개

- 제작 계기: 개발자 취업을 준비하며 항상 여러가지 고민을 하고, 미래에 대한 불안감, 사회적 관계 축소 등 외로운 시간을 지내고 있어서, 이러한 힘든 시간을 보내고 있는 다른 사람들과 서로의 고민을 공유하며 이야기를 나눠볼 수 있는 웹서비스가 있으면 어떨까 생각을 하며 만들게 되었습니다.
- 웹사이트가 기여할 수 있는 점
  - 힘든 시간을 보내며 외로운 시간을 보내고 있는 회원끼리 이야기를 주고받을 수 있어서 외로움을 조금이라도 덜어낼 수 있습니다.
  - 일상 또는 직장에서 생긴 고민을 주변 지인들에게 말하기 곤란할 때, 커뮤니티를 이용하여 고민을 해결할 수 있습니다.
  - 어느 누구에게도 고민을 말하기 곤란한데 고민이나 스트레스를 어딘가 적고싶을 때, 일기장 서비스를 이용하여 기록할 수 있습니다.
- 제작 기간: 2024.02.27 ~ 2024.03.26
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

|                               메인페이지                               |                            내 글 페이지                            |
| :--------------------------------------------------------------------: | :----------------------------------------------------------------: |
|       <img src="/public/homePage.png" width="400" height="400">        |    <img src="/public/myPostPage.png" width="400" height="400">     |
|                               검색페이지                               |                            일기장페이지                            |
|      <img src="/public/searchPage.png" width="400" height="400">       |    <img src="/public/myDiaryPage.png" width="400" height="400">    |
|                              프로필페이지                              |                           커뮤니티페이지                           |
|      <img src="/public/profilePage.png" width="400" height="400">      |     <img src="/public/boardPage.png" width="400" height="400">     |
|                              게시글페이지                              |                             댓글페이지                             |
|      <img src="/public/detailPage.png" width="400" height="400">       |    <img src="/public/commentPage.png" width="400" height="400">    |
|                               알림페이지                               |                    공감 누른 게시글조회 페이지                     |
|       <img src="/public/alarmPage.png" width="400" height="400">       |   <img src="/public/likePostPage.png" width="400" height="400">    |
|                            프로필이름 변경                             |                           계정 연결해제                            |
| <img src="/public/profileNameChangePage.png" width="400" height="400"> | <img src="/public/accountExpirePage.png" width="400" height="400"> |

## 주요기능

### 카테고리별 커뮤니티 기능

- 일상, 직장, 취업, 학업, 건강, 관계의 카테고리로 나눠 사용자들이 주제에 맞는 이야기를 할 수 있습니다.
- 글을 등록하는 페이지로 이동하는 과정없이 간편하게 글을 등록할 수 있습니다.
- 카드형 글 목록을 적용하여 게시물이 눈에 잘 띄게 구성하였습니다.

### AI와의 고민 이야기 기능

- OpenAI API를 적용하고 고민상담 AI로 설정하여 사용자가 전문가에게 상담받는 것처럼 이야기를 할 수 있습니다.
- 커뮤니티 활동을 하며 고민해결이 어려울 때 AI와 이야기를 나누며 예상 외의 해결방안을 얻을 수 있습니다.

### 나만의 일기장 기능

- 다른 회원과 고민 교환은 원하지 않고, 고민을 어딘가에 기록해두고 싶을 때를 위해 만든 기능입니다.
- 같은 고민을 하고있는 회원들의 이야기를 가까이에서 접하면서, 한 웹서비스에서 본인만의 이야기를 기록하여 블로그처럼 사용하고 싶은 회원에게 적합할 수 있습니다.

### 프로필 및 계정관리

- 다크모드 전환, 프로필 자기소개 및 프로필이름 수정 기능, 내가 공감한 글 조회기능, 알림기능, 계정 연결해제 기능을 제공하고 있습니다.

## 주요기능별 시퀀스 다이어그램

- 커뮤니티
![Alt text](/public/communitySequence.png)
- AI와의 고민 이야기
![Alt text](/public/taliAISequence.png)
- 나만의 일기장
![Alt text](/public/myDiarySequence.png)

## 웹사이트 특징

- Tailwind CSS와 Shadcn-UI를 이용하여 반응형 디자인을 적용하였습니다.
- 모바일버전 디자인은 앱디자인처럼 레이아웃을 구성하였습니다.
- 직접 웹사이트 내에서 가입을 진행하는 대신, Next-auth로 다른 사이트의 계정을 연동하는 방식으로 가입하도록 했습니다.
- 일부 기능에서의 모달창 open-close를 Redux로 상태관리를 하였습니다.
- vitess를 기반으로 하는 서버리스 MySQL을 사용함으로써 사용자가 증가하여 데이터베이스의 확장이 필요할 때 자동적으로 확장할 수 있습니다.
- Prisma를 이용하여 API에서 복잡한 로직없이 데이터의 CRUD를 구현하였습니다.

## 프로젝트 진행 과정에서 생긴 문제와 해결방법

- 문제 1: 공감을 누르면 post에 반영이 되어야 하는데, 공감을 해당 유저가 이미 눌렀는지 확인할 때 like의 id를 찾을 방법이 없는 문제가 있었습니다.
  - 해결: prisma schema의 Like model에 @@unique([postId, userId])를 추가하여 postId와 userId는 유일하니 like의 id없이도 다른 자료를 참조할 수 있도록 하여 유저가 공감을 눌렀는지 확인하였습니다.
- 문제 2: 특정 유저의 게시물에 공감이나 댓글이 생기면 알람이 발송되는데, Alarm model을 구성할 때 받는 유저(toUser)와 보내는 유저(fromUser) 두 개가 같은 User model을 참조하여 오류가 발생했습니다.
  - 해결: toUser와 fromUser에 각각 name을 설정하고, User model에서 @relation(name: "fromUser")식으로 참조할 수 있도록 하여 오류를 해결하였습니다.  
- 문제 3: 테마 전환 로직을 만들 때, localstorage에 값을 저장하여 전환을 하도록 만들었으나, 실시간으로 반영이 안되는 문제가 있었습니다.
  - 해결: shadcn-UI의 테마 전환 컴포넌트를 사용하여 실시간으로 구현하였습니다.
- 문제 4: 다른 사이트의 계정을 연결하여 가입하기 때문에 사용자명은 해당 사이트에서 사용하는 이름으로 되어있어, 받아온 자료를 변경하면 db의 여러 로직 간의 참조에 영향을 줄 것이라 생각했습니다.
  - 해결: User model에 newName이라는 자료를 추가하여 사용자가 변경을 할 시, 변경 이름이 newName에 저장되고, 화면에 이 변경이름이 표출되도록 모든 관련 코드를 수정하였습니다.
- 문제 5: 알람을 보낸 유저가 공감을 취소하거나 댓글을 삭제한 이후에 알람을 받은 유저의 알람을 확인하면 받은 알람이 삭제되지 않고 Alarm model의 fromUser가 전혀 참조되지 않는 문제가 생겼습니다.
  - 해결: 공감 API에서 공감 취소시 보낸 알람도 삭제되도록 하고, 댓글도 삭제시 알람이 삭제되도록 한 후, db를 reset하여 문제를 해결하였습니다. 이후 reset 해야하는 문제는 발생하지 않았습니다.  

## 피드백 반영 및 최초 배포 이후 업데이트 사항
- next-auth의 콜백 관련 로직이 없어서 시크릿 키를 추가한 후 콜백 로직을 추가해 준 후 로그인이 되도록 업데이트하였습니다. (2024.03.27)  
- 게시판의 모바일 화면에서 게시글 간 간격이 없어져서 다시 추가하였습니다. (2024.03.28)
- 각 API의 HTTP 상태코드 중 적절하지 않은 부분을 수정하였으며, 웹사이트의 아이콘이 뜨지 않는 현상을 수정했습니다. (2024.03.30)