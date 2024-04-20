import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";

const GNBHeader = () => (
  <GNB>
      <GNBItem>
        <StyledNavLink to="/coins" className={({ isActive }) => isActive ? "active" : ""}>
          가상자산 시세 목록
        </StyledNavLink>
        <StyledNavLink to="/bookmarked_list" className={({ isActive }) => isActive ? "active" : ""}>
          북마크 목록
        </StyledNavLink>
      </GNBItem>
    </GNB>
);

export default GNBHeader;

const GNB = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #f5f5f5;
  padding: 10px;
`;

const GNBItem = styled.div`
  padding: 10px;
  color: #000;
  width: 100%;
  text-decoration: none;
  }
`;
  
const StyledNavLink = styled(NavLink)`
  color: blue; /* 기본 상태 색상 */
  text-decoration: none;
  width: 50%;
  &.active {
    color: red; /* 활성 상태 색상 */
  }
`;
// const .gnb-item.active {
//   color: #fff;
//   background-color: #000; /* 선택된 탭 색상 */
// }