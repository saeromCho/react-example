import { ICoinInfoTableProps } from '@common/interface/interface';
import CoinInfoRow from './CoinInfoRow';
import { styled } from 'styled-components';

const CoinInfoTable: React.FC<ICoinInfoTableProps> = ({ marketCapRank, websiteUrl }) => {
  return (
    <StyledTable>
      <tbody>
        <CoinInfoRow
          key={'rank'}
          label={'시가총액 Rank'}
          value={`Rank #${marketCapRank}`}
          isLink={false}
        />
        <CoinInfoRow key={'websiteUrl'} label={'웹사이트'} value={websiteUrl} isLink={true} />
      </tbody>
    </StyledTable>
  );
};

export default CoinInfoTable;

const StyledTable = styled.table`
  width: 50%;
  border-collapse: collapse;
  border: 1px solid lightgrey;
`;
