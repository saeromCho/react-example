# 프로젝트 구조

`React 18.2.0` 사용

## src 구성

- `apis`
    - API 요청과 관련된 모듈들을 담고 있는 디렉토리
- `assets`
    - 이미지 및 gif 파일과 같은 에셋 형식을 위한 디렉토리
- `common`
    - `components`: 공통으로 사용할 수 있거나 class 내에서 가독성을 높이기 위해 분리한 컴포넌트들을 담고 있음
    - `interface`: 타입스크립트를 사용하였고, 사용되는 타입들의 인터페이스 선언을 위함
- `contexts`
    - Context API 글로벌한 상태관리를 담당. 해당 프로젝트에서는 북마크 리스트와 currency, locale 변수들과 이를 변경하는 메소드 등을 다룸(locale 은 해당 프로젝트에서 직접적으로
      사용되진 않지만 다국어 확장에 대한 고려도 했기에 추가하였습니다)
- `lib`
    - 공통적으로 쓰이는 정적변수인 `constant`
        - API 엔드포인트
        - 페이징 단위
        - 값 변환에 필요한 정규 표현식
    - `enum` 값 선언
    - 공통적으로 쓰이는 `util` 성 함수를 담고 있음
- `pages`
    - 사용되는 page 들을 담고 있음
- `App.tsx`:
    - 라우팅 관리 및 최상단에서 에러처리를 담당

---

# 사용한 라이브러리의 사용 이유

- `"@tanstack/react-query": "^5.29.2"`: API 호출과 호출 후에 진행되는 데이터 정제 및 관리를 위해 사용
- `"@tanstack/react-table": "^8.16.0"`: 시세목록 페이지와 북마크 목록 페이지에서 row, column 으로도 구현할 수 있었겠지만 행과 열이 명확하였고 레이아웃이 다이나믹하게 변경되는
  UI 가 아니기에 테이블로 구현하였고, 테이블에 대한 css 처리를 수월하게 하기 위해 사용
- `"axios": "^1.6.8"`: API 호출을 위해 사용
- `"react-hot-toast": "^2.4.1"`: 북마크가 추가 및 해제되면 보여질 toast UI 를 빠르고 간단하게 구현할 수 있어서 사용
- `"styled-components": "^6.1.8"`: 인라인 스타일이나 .css 파일로 진행하는 것보다 styled-component 로 진행하는 것이 가독성 측면과 한 파일에서 볼 수 있는 장점이라고
  생각하여
  사용
- `"@tanstack/react-query-devtools"`: "^5.29.2": react-query 사용 시 디버깅용을 위해 설치
- `"@types/styled-components": "^5.1.34"`: styled-component 플러그인과 같이 설치
- CRA 를 통해 프로젝트를 생성하고 구성한 게 아닌 직접 설정하는 방식으로 진행했기에, 그 과정에서 설치한 라이브러리들
    - `"ts-loader": "^9.5.1"`:
    - `"@typescript-eslint/eslint-plugin": "^7.7.0"`
    - `"@typescript-eslint/parser": "^7.7.0"`
    - `"eslint": "^8.57.0"`
    - `"eslint-config-prettier": "^9.1.0"`
    - `"eslint-plugin-prettier": "^5.1.3"`
    - `"eslint-plugin-react": "^7.34.1"`
    - `"eslint-plugin-react-hooks": "^4.6.0"`
    - `"html-webpack-plugin": "^5.6.0"`
    - `"prettier": "^3.2.5"`
    - `"typescript": "^5.4.5"`
    - `"webpack": "^5.91.0"`
    - `"webpack-cli": "^5.1.4"`
    - `"webpack-dev-server": "^5.0.4"`

---

# 실행 방법

1. 터미널 진입
2. npm install 명령어 진행
3. npm run start 명령어 진행
4. 실행 완료

---

### 진행하며 생각한 여러가지 것들

- 북마크 목록 관련해서 어떤 것으로 할까 고민을 했었습니다. 규모가 크지 않은 프로젝트라서 구현이 간단하고 빠른 localStorage 를 사용해서 진행하려고 했으나, 아무래도 react 를 사용하여 서비스를 하는
  곳에서는 localStorage 만을 사용해서 상태관리를 하는
  프로젝트는 거의 없다는 생각이 들어 context API 를 사용해서 구현했습니다.
- select box 에 대한 표현이 헷갈렸던 것 같습니다. 눌렀을 때 어떠한 요소가 뜬다는 거까지는 인지하였는데 select box 가 드랍다운을 의미하는 건지, 아니면 다른 UI 적 요소를 의미하는 건지.
  select box
  라는 워딩은 라디오나 체크박스 UI 에 조금 더 자연스럽다고 생각했으나 어떤 이유가 있었지 않았을까 생각했습니다. UI&UX 상 적합한 UI&UX 는 드랍다운이라고 생각이 들어서 드랍다운으로 구현하긴 했습니다.
  사용하고 있는 또는 정의되어 있는 select box 가 정해져있는 걸까 싶었기도 했습니다.
- 북마크의 위치에 대한 모호함.
- 가상자산 시세 목록의 전체보기 영역에서 북마크 목록 보기를 제공하고 있는데 그것으로는 충분하지 않다고 생각하신 건지 의도하신 생각이 어떤 것이었는지가 궁금했어서 여쭤보고 싶었습니다. 옆 탭에 북마크 목록이
  있는데, 그 UI&UX 만으로는 제공하고자 하셨던 의도가 충분하지 않았던 것인지.
- 설명보기 영역은 클릭하면 표시되면 끝인지, 아니면 토글링이 가능하여 접고 펴고가 가능한 있는 collapse 형식의 UI 인지도 궁금했습니다.(collapse 형식이 적합하다는 생각이 들어, collapse 로
  구현하긴 하였습니다.)
- 진행하실 때, 정의한 기획이나 요구사항들을 개발자들에게 어떻게 전달하시는지가 궁금해졌습니다.

### 프로젝트를 진행하면서 개인적으로 아쉬웠던 점

규모가 작은 프로젝트가 아닌 프로젝트에서는 보통 global state 를 대부분 사용하여 데이터를 관리하기에 해당 프로젝트에서도 이를 사용하여 구현하였는데, 서버가 없기에 CRUD 를 못하는 게 당연하기도 하고,
새로고침하면 다 날라가는 것이 요구사항이었기도 해서 그렇게 진행해도 상관없었지만, 개발을 하면서 사용하다보니까 직접 사이트를 이용하는 입장에서 불편했고, 로컬스토리지로 구현을 했으면 창을 닫지 않는 이상 새로고침해도
유지가 되었을텐데 하는, 사용성 측면에서 제 스스로에게 개인적인 작은 아쉬움이 있었습니다.


