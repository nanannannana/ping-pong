# 🗨️<a href="http://3.36.96.127:3002/">PING-PONG</a>
> 어디에서나 새로운 사람들과 대화할 수 있는 온라인 채팅 서비스

<br>

<div align="center">
   
   ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white)
   ![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=NestJS&logoColor=white)
   ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white)
   ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=MongoDB&logoColor=white)
   ![Amazon EC2](https://img.shields.io/badge/Amazon_EC2-FF9900?style=for-the-badge&logo=amazonec2&logoColor=white)
   ![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=Docker&logoColor=white)
   
   ![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black)
   ![Redux](https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=Redux&logoColor=white)
   ![AntDesign](https://img.shields.io/badge/Ant_Design-0170FE?style=for-the-badge&logo=Ant-Design&logoColor=white)
   
</div>

<br>
<br>

## ⭐ 구현 기능
- DB 데이터 모델링(reference 방식을 사용하여 관계 설계)
- **`Socket.io`** 를 이용한 채팅 기능 구현
- **`Passport`** 를 사용한 소셜 로그인(Kakao) 구현
- **`AWS EC2`** 와 **`Fly.io`** 를 이용하여 배포
    - React Build 후 **`Nginx`** 를 이용한 무중단 배포
    - Fly.io를 이용하여 **`Docker`** 기반 NestJS 서버 배포
- 반응형 웹 구현
- **`Fetch`** 를 사용한 서버와의 비동기 통신

<br>
<br>

## ⭐ ERD 설계
<img width="500" alt="erd" src="https://github.com/nanannannana/nanannannana/assets/114964102/650ef945-b3b5-4d6f-be99-60d154405fab">

<br>
<br>

**❖ 총 3개 컬렉션(Users, Rooms, Chats)**
- **User Document**: _id, email, nickname 필드로 구성
- **Room Document**: _id, roomName, host, users 필드로 구성. host와 users는 User 도큐먼트를 참조하여 데이터 저장.
- **Chat Document**: _id, message, user, room, notice, createdAt 필드로 구성. user는 User 도큐먼트를 참조하여 데이터 저장, room은 Room 도큐먼트를 참조하여 데이터 저장.

<br>
<br>

## ⭐ 느낀 점
&emsp;Nest.js를 이용하며 TypeScript와 DI, IoC, 모듈러 구조 등의 개념과 원리를 익힐 수 있었습니다. 또한, Jest와 같은 테스트 도구를 사용해 보지 못한 점이 아쉬웠으며, 향후 개발에서 테스트 코드를 작성하여 디버깅 시간을 절약하고 싶다는 생각을 가지게 되었습니다.

&emsp;프로젝트 초반에는 시간이 제한되어 있다는 압박감으로 검색을 통해 찾은 코드를 온전히 이해하지 못한 채 작성한 적이 있습니다. 그러나 이러한 코드는 결국 재확인을 거치게 되어, 충분히 이해하고 넘어갔을 때보다 훨씬 많은 시간을 투자해야 했습니다. 이 경험으로부터 처음에는 시간이 조금 더 들더라도 코드를 작성할 때, 그 코드가 어떻게 동작하는지 완벽히 이해하는 것이 매우 중요하다는 것을 깨달았습니다.

&emsp;처음에는 AWS EC2와 Docker를 이용하여 Nest.js 애플리케이션을 배포하였지만, 용량이 작은 t2.micro 인스턴스로 인해 서버 다운 문제가 발생했습니다. 이러한 문제를 해결하기 위해 Docker 기반의 애플리케이션 배포 및 관리를 지원하는 Fly.io 서비스를 이용하여 서버를 재배포하였습니다. 이 경험을 통해, Docker의 개념과 사용 방법에 대해 더욱 이해하게 되었고, 매우 유익한 시간이었습니다.
