import { useState } from "react";

interface SymbolInputProps {
  value: string;
  onChange: (value: string) => void; // 문자열을 받는 함수로 타입 변경
}

const SymbolInput: React.FC<SymbolInputProps> = ({ value, onChange }) => {
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
         <input
            id="symbolInput"
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            style={{paddingLeft: '10px', height: '40px', width: '100%'}}
          />
      </div>
  );
};

export default SymbolInput;