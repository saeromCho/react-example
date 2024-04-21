import React, { useState, useEffect } from 'react';
import SymbolInput from './SymbolInput';
import CurrencyInput from './CurrencyInput';
import { ICurrencyConverterProps } from '@common/interface/interface';

const CurrencyConverter: React.FC<ICurrencyConverterProps> = ({ currentPrice }) => {
  const [symbolAmount, setSymbolAmount] = useState<string>('');
  const [currencyAmount, setCurrencyAmount] = useState<string>('');

  const handleSymbolChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const symbol = event.target.value;
    setSymbolAmount(symbol);
    const newCurrencyAmount = (parseFloat(symbol.replace(/,/g, '')) * currentPrice).toFixed(2).toString();
    const parts = newCurrencyAmount.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    setCurrencyAmount(parts.join('.'));
  };

  const handleCurrencyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currency = event.target.value;
    setCurrencyAmount(currency);
    const newBtcAmount = (parseFloat(currency.replace(/,/g, '')) / currentPrice).toFixed(8).toString();
    const parts = newBtcAmount.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    setSymbolAmount(parts.join('.'));
  };

  return (
    <div>
      <SymbolInput value={symbolAmount} onChange={handleSymbolChange} />
      <div>
              화살표
              {/* <img src={arrowImage} alt="Logo" /> */}
            </div>
      <CurrencyInput currency="USD" value={currencyAmount} onChange={handleCurrencyChange} />
    </div>
  );
};

export default CurrencyConverter;
