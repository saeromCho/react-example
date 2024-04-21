import { useState } from "react";

const SymbolInput = () => {
  const [inputA, setInputA] = useState('');

  const handleInputAChange = (event: any) => {
    const { value } = event.target;
    let cleanValue = value.replace(/,/g, '').match(/^\d*\.?\d{0,8}/);
  
    if (cleanValue) {
      cleanValue = cleanValue[0];
      const parts = cleanValue.split('.');
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      setInputA(parts.join('.'));
    }
  };

  

  return (
    <div>
      <div>
        <label htmlFor="inputA" style={{backgroundColor: 'ghostwhite',
    padding: '20px 10px 20px 10px'}}>BTC</label>
        <input
          id="BTC"
          type="text"
          value={inputA}
          onChange={handleInputAChange}
          style={{paddingLeft: '10px',
            height: '57px'}}
        />
      </div>
    </div>
  );
};

export default SymbolInput;