import { PageSizeEnum, LocaleEnum, CurrencyEnum } from "@lib/enum";
import { Dispatch, SetStateAction } from "react";

export interface ICoin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price?: number;
  market_cap: number;
  market_cap_rank?: number;
  fully_diluted_valuation?: number;
  total_volume: number;
  high_24h?: number;
  low_24h?: number;
  price_change_24h?: number;
  price_change_percentage_24h?: number;
  market_cap_change_24h?: number;
  market_cap_change_percentage_24h?: number;
  circulating_supply: number;
  total_supply: number;
  max_supply?: number;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  roi?: string;
  last_updated: string;
  price_change_percentage_1h_in_currency: number
  price_change_percentage_24h_in_currency: number,
  price_change_percentage_7d_in_currency: number,
}

export interface IGlobalContextType {
  bookmarks: ICoin[];
  addBookmark: (coin: ICoin) => void;
  removeBookmark: (id: string) => void;
  locale: LocaleEnum;
  changeLocale: (locale: LocaleEnum) => void;
  currency: CurrencyEnum,
  changeCurrency: (currency: CurrencyEnum) => void,
}

export interface IBookmarkIconProps {
  isBookmarked: boolean;
  coin: ICoin;
}