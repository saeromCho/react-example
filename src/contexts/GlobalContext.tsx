import { ICoin, IGlobalContextType } from '@common/interface/interface';
import { PageSizeEnum, LocaleEnum } from '@lib/enum';
import React, { createContext, useContext, useState } from 'react';


const GlobalContext = createContext<IGlobalContextType>({
  bookmarks: [],
  addBookmark: () => {},
  removeBookmark: () => {},
  locale: LocaleEnum.KO,
  changeLocale: (locale: LocaleEnum) => {},
});

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider: React.FC<any> = ({ children  }) => {
  const [bookmarks, setBookmarks] = useState<ICoin[]>([]);
  const [locale, setLocale] = useState(LocaleEnum.KO);

  const changeLocale = (locale: LocaleEnum) => {
    setLocale(locale);
  }
 
  const addBookmark = (coin: ICoin) => {
    setBookmarks(prev => [...prev, coin]);
  };

  const removeBookmark = (id: string) => {
     setBookmarks(prev => prev.filter(coin => coin.id !== id));
  };

  return (
    <GlobalContext.Provider value={{ locale, changeLocale, bookmarks, addBookmark, removeBookmark}}>
      {children}
    </GlobalContext.Provider>
  );
};
