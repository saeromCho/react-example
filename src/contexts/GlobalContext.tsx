import { ICoin } from '@common/interface/interface';
import React, { createContext, useContext, useState } from 'react';

interface BookmarkContextType {
  bookmarks: ICoin[];
  addBookmark: (coin: ICoin) => void;
  removeBookmark: (id: string) => void;
}

const GlobalContext = createContext<BookmarkContextType>({
  bookmarks: [],
  addBookmark: () => {},
  removeBookmark: () => {}
});

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider: React.FC<any> = ({ children  }) => {
  const [bookmarks, setBookmarks] = useState<ICoin[]>([]);

  const addBookmark = (coin: ICoin) => {
    setBookmarks(prev => [...prev, coin]);
  };

  const removeBookmark = (id: string) => {
     setBookmarks(prev => prev.filter(coin => coin.id !== id));
  };

  return (
    <GlobalContext.Provider value={{ bookmarks, addBookmark, removeBookmark}}>
      {children}
    </GlobalContext.Provider>
  );
};
