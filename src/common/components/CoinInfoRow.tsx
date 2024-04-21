import { ICoinInfoRowProps } from "@common/interface/interface";
import { styled } from "styled-components";


const CoinInfoRow: React.FC<ICoinInfoRowProps> = ({ label, value }) => (
  <StyledRow>
    <CoinInfoRowLabel>{label}</CoinInfoRowLabel>
    {/* TODO: 웹사이트면 링킹 걸기 */}
    <CoinInfoRowValue>{value}</CoinInfoRowValue>
  </StyledRow>
);

export default CoinInfoRow;

const CoinInfoRowLabel = styled.td`
  background-color: antiquewhite;
  color: #333; // 텍스트 색상 지정
  font-weight: bold; // 폰트 굵기
  padding: 8px; // 패딩
`;

const CoinInfoRowValue = styled.td`
  padding: 8px; // 패딩
`;

const StyledRow = styled.tr`
  &:not(:last-child) td {
    border-bottom: 1px solid #eaeaea; // 행의 아래쪽에 테두리 적용
    width: 34px;
  }
`;