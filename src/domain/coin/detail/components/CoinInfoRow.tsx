import { ICoinInfoRowProps } from '@common/interface/interface';
import { styled } from 'styled-components';

const CoinInfoRow: React.FC<ICoinInfoRowProps> = ({ label, value, isLink }) => (
  <StyledRow>
    <CoinInfoRowLabel>{label}</CoinInfoRowLabel>
    <CoinInfoRowValue>
      {isLink ? <MailLinkATag href={`${value}`}>{value}</MailLinkATag> : value}
    </CoinInfoRowValue>
  </StyledRow>
);

export default CoinInfoRow;

const CoinInfoRowLabel = styled.td`
  background-color: midnightblue;
  color: white;
  padding: 18px;
  font-size: 15px;
`;

export const MailLinkATag = styled.a`
  color: #3498db;
  text-decoration: none;
  transition: color 0.3s;

  &:hover {
    color: #2980b9;
    text-decoration: underline;
  }

  &:active {
    color: #145d91;
  }

  &:focus {
    outline: none;
  }
`;

const CoinInfoRowValue = styled.td`
  padding: 8px;
`;

const StyledRow = styled.tr`
  &:not(:last-child) td {
    border-bottom: 1px solid lightgrey;
    width: 30px;
  }
`;
