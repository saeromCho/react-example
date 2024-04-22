import { ISymbolInputProps } from '@common/interface/interface';
import { styled } from 'styled-components';

const SymbolInput: React.FC<ISymbolInputProps> = ({ value, onChange }) => {
  return (
    <div>
      <div style={{ marginBottom: '10px' }}>BTC</div>
      <AmountInput
        id="symbolInput"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default SymbolInput;

export const AmountInput = styled.input`
  padding-right: 10px;
  padding-left: 10px;
  height: 40px;
  width: 100%;
  text-align: right;
`;
