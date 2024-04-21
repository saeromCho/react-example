import { ICurrencyProps } from "@common/interface/interface";
import { useState } from "react";

const CurrencyInput: React.FC<ICurrencyProps> = ({currency}) => {
  const [inputB, setInputB] = useState('');


  const handleInputBChange = (event: any) => {
    let { value } = event.target;
    value = value.replace(/,/g, '');
  
    if (value === "") {
      setInputB('');
    } else 
  
    if (/^[1-9]\d*(\.\d{0,2})?$|^0\.\d{0,2}$/.test(value) || value === "") {
      const parts = value.split('.');
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      setInputB(parts.join('.'));
    }
  };
  

  return (
    <div>
      <div>
        <label htmlFor="inputB" style={{backgroundColor: 'ghostwhite',
    padding: '20px 10px 20px 10px'}}>{currency}</label>
        <input
          id="inputB"
          type="text"
          value={inputB}
          onChange={handleInputBChange}
          style={{paddingLeft: '10px',
          height: '57px'}}
        />
      </div>
    </div>
  );
};

export default CurrencyInput;