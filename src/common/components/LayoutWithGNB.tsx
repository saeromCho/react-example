import { Outlet } from 'react-router-dom';
import GNBHeader from '@common/components/GNBHeader';

const LayoutWithGNB = () => (
  <>
    <GNBHeader />
    <main>
      <Outlet />
    </main>
  </>
);
export default LayoutWithGNB;
