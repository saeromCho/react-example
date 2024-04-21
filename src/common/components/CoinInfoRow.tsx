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
  background-color: midnightblue;
  color: white;
  padding: 18px;
  font-size: 15px;
`;

const CoinInfoRowValue = styled.td`
  padding: 8px; // 패딩
`;

const StyledRow = styled.tr`
  &:not(:last-child) td {
    border-bottom: 1px solid lightgrey;
    width: 30px;
  }
`;