import BookmarkIcon from "@common/components/BookmarkIcon";
import { useGlobalContext } from "@contexts/GlobalContext";
import { CurrencyEnum } from "./enum";
import { CurrencyText, SymbolText } from "@common/components/CoinTable";

export const getColumnsData = (currency: CurrencyEnum) => [
  {
    accessorKey: 'name',
    header: '자산',
    cell: (info: any) => (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <BookmarkIcon
          isBookmarked={useGlobalContext().bookmarks.some(coin => coin.id === info.row.original.id)}
          coin={info.row.original} />
        {info.getValue()}
      </div>
    ),
    size: 150,
  },
  {
    accessorKey: 'symbol',
    header: '',
    cell: (info: any) => (
      <SymbolText >
        {info.getValue()}
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
    size: 300,
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
    size: 200,
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


const formatNumber = (value: number, hasDecimal = true) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: hasDecimal ? 2 : 0,
    maximumFractionDigits: hasDecimal ? 2 : 0,
  });
  return formatter.format(value);
}