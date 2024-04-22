import { ICurrencyInputProps } from '@common/interface/interface';
import { AmountInput } from './SymbolInput';

const CurrencyInput: React.FC<ICurrencyInputProps> = ({ currency, value, onChange }) => {
  return (
    <div>
      <div style={{ marginBottom: '10px' }}>{currency.toLocaleUpperCase()}</div>
      <AmountInput
        id="currencyInput"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default CurrencyInput;
