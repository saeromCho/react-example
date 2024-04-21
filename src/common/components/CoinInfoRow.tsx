import { ICoinInfoRowProps } from "@common/interface/interface";
import { styled } from "styled-components";


// InfoRowProps 타입을 사용하여 컴포넌트의 props에 타입을 지정합니다.
const CoinInfoRow: React.FC<ICoinInfoRowProps> = ({ label, value }) => (
  <StyledRow>
    <CoinInfoRowLabel>{label}</CoinInfoRowLabel>
    {/* TODO: 웹사이트면 링킹 걸기 */}
    <CoinInfoRowValue>{value}</CoinInfoRowValue>
  </StyledRow>
);

export default CoinInfoRow;

// 레이블용 셀 스타일 정의
const CoinInfoRowLabel = styled.td`
  background-color: antiquewhite;
  color: #333; // 텍스트 색상 지정
  font-weight: bold; // 폰트 굵기
  padding: 8px; // 패딩
`;

// 값용 셀 스타일 정의
const CoinInfoRowValue = styled.td`
  padding: 8px; // 패딩
`;

// 테이블 행 스타일 정의
const StyledRow = styled.tr`
  &:not(:last-child) td {
    border-bottom: 1px solid #eaeaea; // 행의 아래쪽에 테두리 적용
    width: 34px;
  }
`;