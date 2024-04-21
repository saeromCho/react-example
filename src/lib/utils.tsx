import BookmarkIcon from "@common/components/BookmarkIcon";
import { useGlobalContext } from "@contexts/GlobalContext";
import { CurrencyEnum } from "./enum";
import { CurrencyText, SymbolText } from "@common/components/CoinTable";
import CoinNameCell from "@common/components/CoinNameCell";
import { ICoin } from "@common/interface/interface";

export const getColumnsData = (currency: CurrencyEnum) => [
  {
    accessorKey: 'name',
    header: '자산',
    cell: (info: any) => (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <BookmarkIcon
          isBookmarked={useGlobalContext().bookmarks.some(coin => coin.id === info.row.original.id)}
          coin={info.row.original} />
        <CoinNameCell coinId={info.row.original.id}>
          {info.getValue()}
        </CoinNameCell>
      </div>
    ),
    size: 250,
  },
  {
    accessorKey: 'symbol',
    header: '',
    cell: (info: any) => (
      <SymbolText >
        {info.getValue().toLocaleUpperCase()}
      </SymbolText>
    ),
    size: 100,
  },
  {
    accessorKey: 'current_price',
    header: 'Price',
    cell: (info: any) => (
      <CurrencyText>
        {currency === CurrencyEnum.KRW ? '₩' : '$'}{formatNumber(info.getValue())}
      </CurrencyText>
    ),
    size: 200,
  },
  {
    accessorKey: 'price_change_percentage_1h_in_currency',
    header: '1H',
    cell: (info: any) => (
      <CurrencyText style={{ color: info.getValue() >= 0 ? info.getValue() == 0 ? 'black' : 'red': 'blue' }}>
        {formatNumber(info.getValue())}%
      </CurrencyText>
    ),
    size: 200,
  },
  {
    accessorKey: 'price_change_percentage_24h_in_currency',
    header: '24H',
    cell: (info: any) => (
      <CurrencyText style={{ color: info.getValue() >= 0 ? info.getValue() == 0 ? 'black' : 'red': 'blue' }}>
        {formatNumber(info.getValue())}%
      </CurrencyText>
    ),
    size: 200,
  },
  {
    accessorKey: 'price_change_percentage_7d_in_currency',
    header: '7D',
    cell: (info: any) => (
      <CurrencyText style={{ color: info.getValue() >= 0 ? info.getValue() == 0 ? 'black' : 'red': 'blue' }}>
        {formatNumber(info.getValue())}%
      </CurrencyText>
    ),
    size: 250,
  },
  {
    accessorKey: 'total_volume',
    header: '24H Volume',
    cell: (info: any) => (
      <CurrencyText>
        {currency === CurrencyEnum.KRW ? '₩' : '$'}{formatNumber(info.getValue(), false)}
      </CurrencyText>
    ),
    size: 300,
  }
];


export const formatNumber = (value: number, hasDecimal = true) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: hasDecimal ? 2 : 0,
    maximumFractionDigits: hasDecimal ? 2 : 0,
  });
  return formatter.format(value);
}

// export const formatNumberInput = (value: string, decimalPlaces: number) => {
//   const regex = new RegExp(`^\\d*\\.?\\d{0,${decimalPlaces}}$`);
//   let cleanValue = value.replace(/,/g, '').match(regex);

//   if (cleanValue) {
//     let numericValue = cleanValue[0]; // 첫 번째 매치 결과 사용
//     const parts = numericValue.split('.');
//     parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
//     return parts.join('.');
//   }
//   return ''; // 유효하지 않은 입력의 경우 빈 문자열 반환
// }
function formatNumberInput(value: string, decimalPlaces: number) {
  let cleanValue = value.replace(/,/g, '').match(new RegExp(`^\\d*\\.?\\d{0,${decimalPlaces}}$`));
  if (cleanValue) {
      let numericValue = cleanValue[0]; // 첫 번째 매치 결과 사용
    const parts = numericValue.split('.');
    parts[0] = parts[0].replace(/\B(?=(\\d{3})+(?!\\d))/g, ',');
    return parts.join('.');
  }
  return value; // 유효하지 않은 경우 이전 값 반환
}


export const sortBookmarksByMarketCapRank = (bookmarks: ICoin[]) => bookmarks.sort((a, b) => {
  if (!a.market_cap_rank) return 1;
  if (!b.market_cap_rank) return -1;
  return a.market_cap_rank - b.market_cap_rank;
});