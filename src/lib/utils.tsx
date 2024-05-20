import BookmarkIcon from '@common/components/BookmarkIcon';
import { useGlobalContext } from '@contexts/GlobalContext';
import { CurrencyEnum } from './enum';
import { CurrencyText, SymbolText } from '@common/components/CoinTable';
import CoinNameCell from '@common/components/CoinNameCell';
import { ICoin } from '@common/interface/interface';
/**
 * 
 "유틸성 함수"에서 "유틸성"은 "유틸리티(Utility)"의 약자로, 
 편리하고 유용한 기능을 제공하는 도구나 도구 모음을 의미합니다. 
 프로그래밍에서 "유틸성 함수"는 일반적으로 자주 사용되는 공통 작업을 수행하거나, 
 특정 작업을 쉽게 처리할 수 있도록 도와주는 함수들을 의미합니다. 
 이러한 함수들은 특정 애플리케이션의 비즈니스 로직과는 직접적인 관련이 없지만, 
 개발자의 생산성을 높이고 코드의 재사용성을 높이는 데 중요한 역할을 합니다.
 유틸성 함수는 반복적으로 사용되는 작업을 간편하게 처리할 수 있게 하여 개발 생산성을 높이고 코드의 가독성을 개선합니다. 
 이러한 함수들은 프로젝트 전반에 걸쳐 널리 사용되며, 코드베이스의 유지보수성을 높이는 중요한 역할을 합니다.
 */
export const getColumnsData = (currency: CurrencyEnum) => [
  {
    accessorKey: 'name',
    header: '자산',
    cell: (info: any) => (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <BookmarkIcon
          isBookmarked={useGlobalContext().bookmarks.some(
            (coin) => coin.id === info.row.original.id,
          )}
          coin={info.row.original}
        />
        <CoinNameCell coinId={info.row.original.id}>{info.getValue()}</CoinNameCell>
      </div>
    ),
    size: 250,
  },
  {
    accessorKey: 'symbol',
    header: '',
    cell: (info: any) => <SymbolText>{info.getValue().toLocaleUpperCase()}</SymbolText>,
    size: 100,
  },
  {
    accessorKey: 'current_price',
    header: 'Price',
    cell: (info: any) => (
      <CurrencyText>
        {currency === CurrencyEnum.KRW ? '₩' : '$'}
        {formatNumber(info.getValue())}
      </CurrencyText>
    ),
    size: 200,
  },
  {
    accessorKey: 'price_change_percentage_1h_in_currency',
    header: '1H',
    cell: (info: any) => (
      <CurrencyText
        style={{ color: info.getValue() >= 0 ? (info.getValue() == 0 ? 'black' : 'red') : 'blue' }}
      >
        {formatNumber(info.getValue())}%
      </CurrencyText>
    ),
    size: 200,
  },
  {
    accessorKey: 'price_change_percentage_24h_in_currency',
    header: '24H',
    cell: (info: any) => (
      <CurrencyText
        style={{ color: info.getValue() >= 0 ? (info.getValue() == 0 ? 'black' : 'red') : 'blue' }}
      >
        {formatNumber(info.getValue())}%
      </CurrencyText>
    ),
    size: 200,
  },
  {
    accessorKey: 'price_change_percentage_7d_in_currency',
    header: '7D',
    cell: (info: any) => (
      <CurrencyText
        style={{ color: info.getValue() >= 0 ? (info.getValue() == 0 ? 'black' : 'red') : 'blue' }}
      >
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
        {currency === CurrencyEnum.KRW ? '₩' : '$'}
        {formatNumber(info.getValue(), false)}
      </CurrencyText>
    ),
    size: 300,
  },
];

export const formatNumber = (value: number, hasDecimal = true) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: hasDecimal ? 2 : 0,
    maximumFractionDigits: hasDecimal ? 2 : 0,
  });
  return formatter.format(value);
};

/// TODO: 정렬순서가 어떤 정렬 순서인지 알기.
export const sortBookmarksByMarketCapRank = (bookmarks: ICoin[]) =>
  bookmarks.sort((a, b) => {
    if (!a.market_cap_rank) return 1;
    if (!b.market_cap_rank) return -1;
    return a.market_cap_rank - b.market_cap_rank;
  });
