# react-example

규모가 크지 않은 프로젝트라서 구현이 간단하고 빠른 localStorage 를 사용해서 진행하려고 했으나, 아무래도 react 를 사용하여 서비스를 하는 곳에서는 localStorage 만을 사용해서 상태관리를 하는
프로젝트는 거의 없다는 생각이 들어 context API 를 사용해서 구현함.

select box 에 대한 표현이 헷갈렸다. 드랍다운이 조금 더 자연스럽다고 생각했고, select box 는 라디오나 체크박스 UI 에 조금 더 자연스럽다고 생각했다.
눌렀을 때 어떠한 요소가 뜬다는 거까지는 인지했는데 select box 가 드랍다운을 의미하는 건지, 아니면 다른 UI 적 요소를 의미하는 건지.
UI&UX 상 적합한 UI&UX 는 드랍다운이라고 생각이 들어서 그렇게 구현하긴 했지만 이에 대한 부분이 명확하지 않았음. 사용하고 있는 select box 의 형태가 정해져있는 걸까 싶었다.

북마크의 위치에 대한 모호함

가상자산 시세 목록의 전체보기 영역에서 북마크 목록 보기를 제공하고 있는데 그것으로는 충분하지 않다고 생각하신 건지 의도하신 생각이 어떤 것이었는지가 궁금했어서 여쭤보고 싶었다. 옆 탭에 북마크 목록이 있는데, 그
UI&UX 만으로는 제공하고자 하셨던 의도가 충분하지 않았던 것인지.

코인 상세 페이지에서의 가격 계산 영역에 있는 설명보기 텍스트와 화살표 영역은 클릭커블한 건지. UX 상 클릭커블한 영역은 아니라는 건 인지했지만, 모양새와 형태 자체는 클릭커블 할 수도 있겠다라고 인지할 가능성도
없진 않아 보임. 표현된 size 부분도 다른 부분에 비해 강조되어있기에 더 그렇게 느껴짐.

설명보기 영역은 있으면 보여지고 없으면 보여주지 않는 게 다인 건지, 아니면 토글링이 가능해서 접었다가 펼 수 있는 collapse 영역인지도 확인해보고 싶었다.

공통으로 뺄 수 있는 UI 다 빼기
공통으로 사용되는 로직 다 빼기
네이밍 신경
드랍다운 호버했을 때 뜨게끔 하는 걸로 바꾸기

아쉬운 점
회사에서는 보통 global state 를 대부분 사용하니까 이를 사용해서 구현하였는데, 요구 사항은 새로고침하면 다 날라가도록 해도 상관없엇지만 제가 직접 쓰는 입장에서 로컬스토리지로 구현을 했으면 새로고침해도
유지가 되었을텐데 하는 그냥 제 개인적인 사용성 측면에서의 아쉬움

업무를 진행할 때 개발자에게 전달하는 방식이 이러한 방식일까? 가 궁금했다. 디자인 및 UI 적으로는 확인해야 할 사항이 상당수 있다고 생각했지만, UX 상으로의 요구사항들은 꽤나 명확하게 적혀있다고
생각했다.
