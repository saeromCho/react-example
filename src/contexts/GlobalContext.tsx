import { ICoin, IGlobalContextType } from '@common/interface/interface';
import { LocaleEnum, CurrencyEnum } from '@lib/enum';
import React, { createContext, useContext, useState } from 'react';

const GlobalContext = createContext<IGlobalContextType>({
  bookmarks: [],
  addBookmark: () => {},
  removeBookmark: () => {},
  locale: LocaleEnum.KO,
  changeLocale: (locale: LocaleEnum) => {},
  currency: CurrencyEnum.KRW,
  changeCurrency: (currency: CurrencyEnum) => {},
});

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider: React.FC<any> = ({ children }) => {
  const [bookmarks, setBookmarks] = useState<ICoin[]>([]);
  const [locale, setLocale] = useState(LocaleEnum.KO);
  const [currency, setCurrency] = useState(CurrencyEnum.KRW);

  const changeLocale = (locale: LocaleEnum) => {
    setLocale(locale);
  };

  const changeCurrency = (currency: CurrencyEnum) => {
    setCurrency(currency);
  };

  const addBookmark = (coin: ICoin) => {
    setBookmarks((prev) => [...prev, coin]);
  };

  const removeBookmark = (id: string) => {
    setBookmarks((prev) => prev.filter((coin) => coin.id !== id));
  };

  return (
    <GlobalContext.Provider
      value={{
        locale,
        changeLocale,
        currency,
        changeCurrency,
        bookmarks,
        addBookmark,
        removeBookmark,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
