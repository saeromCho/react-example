import { ICurrencyInputProps } from "@common/interface/interface";
import { useState } from "react";

const CurrencyInput: React.FC<ICurrencyInputProps> = ({ currency, value, onChange }) => {
  // const [inputB, setInputB] = useState('');

  const handleInputCurrencyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    onChange(value);
  };
  

  // const handleInputBChange = (event: any) => {
  //   let { value } = event.target;
  //   value = value.replace(/,/g, '');
  
  //   if (value === "") {
  //     setInputB('');
  //   } else 
  
  //   if (/^[1-9]\d*(\.\d{0,2})?$|^0\.\d{0,2}$/.test(value) || value === "") {
  //     const parts = value.split('.');
  //     parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  //     setInputB(parts.join('.'));
  //   }
  // };
  

  return (
    <div>
      <div>
        <label htmlFor="inputB" style={{backgroundColor: 'ghostwhite',
    padding: '20px 10px 20px 10px'}}>{currency}</label>
        <input
          id="inputB"
          type="text"
          value={value}
          onChange={handleInputCurrencyChange}
          style={{paddingLeft: '10px',
          height: '57px'}}
        />
      </div>
    </div>
  );
};

export default CurrencyInput;