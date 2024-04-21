import { ISymbolInputProps } from "@common/interface/interface";
import { styled } from "styled-components";

const SymbolInput: React.FC<ISymbolInputProps> = ({ value, onChange }) => {
  // const [inputA, setInputA] = useState('');

  // const handleInputAChange = (event: any) => {
  //   const { value } = event.target;
  //   let cleanValue = value.replace(/,/g, '').match(/^\d*\.?\d{0,8}/);
  
  //   if (cleanValue) {
  //     cleanValue = cleanValue[0];
  //     const parts = cleanValue.split('.');
  //     parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  //     setInputA(parts.join('.'));
  //   }
  // };

  

  return (
      <div>
        <div style={{marginBottom: '10px'}}>BTC</div>
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
  padding-left: 10px;
  height: 40px;
  width: 100%;
`;