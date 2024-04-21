import { useState } from "react";

const BTCInput = () => {
  const [inputA, setInputA] = useState('');

  const handleInputAChange = (event: any) => {
    // const { value } = event.target;
    // const regex = /^\d*\.?\d{0,8}$/;

    // if (regex.test(value) || value === "") {
    //   setInputA(value);
    // }
    const { value } = event.target;
    // 쉼표와 추가적인 소수점 제거
    let cleanValue = value.replace(/,/g, '').match(/^\d*\.?\d{0,8}/);
  
    // 매치된 값이 있는 경우에만 처리
    if (cleanValue) {
      cleanValue = cleanValue[0]; // 매치 결과 사용
      const parts = cleanValue.split('.');
      // 정수 부분에 쉼표 추가
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  
      // 정수 부분과 소수점 부분 재결합
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

export default BTCInput;