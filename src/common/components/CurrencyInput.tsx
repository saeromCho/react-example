import { ICurrencyInputProps } from "@common/interface/interface";
import { AmountInput } from "./SymbolInput";

const CurrencyInput: React.FC<ICurrencyInputProps> = ({ currency, value, onChange }) => {
  // const [inputB, setInputB] = useState('');


  // const handleInputBChange = (event: any) => {
    // let { value } = event.target;
    // value = value.replace(/,/g, '');
  
    // if (value === "") {
    //   setInputB('');
    // } else 
  
    // if (/^[1-9]\d*(\.\d{0,2})?$|^0\.\d{0,2}$/.test(value) || value === "") {
    //   const parts = value.split('.');
    //   parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    //   setInputB(parts.join('.'));
    // }
  // };
  

  return (
    <div>
      <div style={{marginBottom: '10px'}}>{currency.toLocaleUpperCase()}</div>
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