import { Outlet } from 'react-router-dom';
import GNBHeader from '@common/components/GNBHeader';

const LayoutWithGNB = () => (
  <>
    <GNBHeader />
    <main>
      {/* <Outlet />은 react-router-dom 라이브러리에서 제공하는 컴포넌트로, 중첩된 라우트를 렌더링하는 데 사용됩니다. */}
      {/* 중첩된 라우트 렌더링: 부모 라우트가 렌더링될 때, 자식 라우트가 <Outlet /> 컴포넌트에 렌더링됩니다. 
      이는 부모 라우트의 레이아웃에 따라 자식 라우트가 적절한 위치에 나타나도록 합니다. */}
      {/* 동적 콘텐츠 삽입: <Outlet />은 자식 라우트가 변경될 때마다 해당 위치에 새로운 콘텐츠를 동적으로 삽입합니다. */}
      {/* 이를 통해, LayoutWithGNB 컴포넌트는 공통 레이아웃(예: 헤더)을 포함하고, 자식 라우트에 따라 동적으로 콘텐츠를 렌더링할 수 있습니다. */}
      <Outlet />
    </main>
  </>
);
export default LayoutWithGNB;
