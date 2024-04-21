import { ICurrencyProps } from "@common/interface/interface";
import { useState } from "react";

interface CurrencyInputProps {
  currency: string;
  value: string;
  onChange: (value: string) => void; // 문자열을 받는 함수로 타입 변경
}

const CurrencyInput: React.FC<CurrencyInputProps> = ({ currency, value, onChange }) => {
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
      {/* <label htmlFor="inputB" style={{backgroundColor: 'ghostwhite', padding: '20px 10px 20px 10px'}}>{currency}</label> */}
        <input
          id="currencyInput"
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={{paddingLeft: '10px',  height: '40px', width: '100%'}}
        />
      </div>
  );
};

export default CurrencyInput;