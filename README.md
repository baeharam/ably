## 실행방법

- 시연: `pnpm start`
- 테스트 : `pnpm test`
- 포맷팅 : `pnpm format`



## 구현범위

A + B + C , E2E 테스트



## 페이지 구조

- 비밀번호 재설정(/reset-password) (중첩 라우팅)
  - 인증코드 발급 페이지(/reset-password/issue-authcode)
  - 인증코드 검증 페이지(/reset-password/verify-authcode)
  - 비밀번호 변경 페이지(/reset-password/change-password)
- 로그인 페이지(/login)
- 회원정보 페이지(/user)

괄호 안에 포함된 path 기준으로 테스트해보실 수 있습니다.



## 프로젝트 설명

- `src/pages` 하위에 페이지 관련 컴포넌트가 있고 중첩 페이지의 경우는 해당 컴포넌트 폴더 안에 또 다른 `pages` 폴더가 존재합니다.
- API 엔드 포인트는 각자 달라서 상수로 추출하였습니다.
- "검증" 은 특별한 요구조건이 명시되어 있지 않아서 HTML5 스펙의 검증을 그대로 사용하였습니다.
- "실패한 경우" 또한 특별한 요구조건이 명시되어 있지 않아 실패 메시지를 받은 에러 메시지로 렌더링 하였습니다.
- `cypress/integration` 폴더 안에 E2E 테스트가 있습니다.
- npm/yarn 에 비해서 pnpm 이 더 효율적이기 때문에 pnpm 을 사용하였습니다.
- 디자인의 경우도 명시되어 있는 부분이 없어서 최소한의 디자인만 적용하였습니다.
- axios 를 사용하여 좀 더 편하게 요청할 수 있게 하였고 react-query 를 사용하여 선언적으로 데이터를 가져오게끔 하였습니다.
- craco 를 사용하여 `import` 시에 `@` 접두사를 사용한 절대경로를 할 수 있게 하였습니다.
- 스타일의 경우 BEM 을 사용하여 네이밍 하였습니다.
