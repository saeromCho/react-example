import {  ICoin, ICoinDetail, ICoinInfoTableProps, IInfoTableProps } from "@common/interface/interface";
import CoinInfoRow from "./CoinInfoRow";
import { styled } from "styled-components";


const CoinInfoTable: React.FC<ICoinInfoTableProps> = ({marketCapRank, websiteUrl}) => {
  console.log('랭크' + marketCapRank);
  console.log('사이ㅡ' + websiteUrl);
  return (
    <StyledTable>
      <tbody>
      <CoinInfoRow key={'rank'} label={'시가총액 Rank'} value={`Rank #${marketCapRank}`} />
      <CoinInfoRow key={'websiteUrl'} label={'웹사이트'} value={websiteUrl} />
      </tbody>
    </StyledTable>
  )
  
};

export default CoinInfoTable;

const StyledTable = styled.table`
  width: 50%;
  border-collapse: collapse; // 테두리 중복을 방지
  border: 1px solid lightgrey; // 테이블 외곽에 테두리 적용
`;


