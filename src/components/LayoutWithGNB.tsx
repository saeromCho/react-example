import GNBHeader from "./GNBHeader";
import { Outlet } from "react-router-dom";

const LayoutWithGNB = () => (
  <>
    <GNBHeader />
    <main>
      <Outlet/>
    </main>
  </>
);
export default LayoutWithGNB;