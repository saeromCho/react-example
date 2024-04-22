import { ICoinPriceAndChangedRateProps } from '@common/interface/interface';
import { CurrencyEnum } from '@lib/enum';
import { formatNumber } from '@lib/utils';

const CoinPriceAndChangedRate: React.FC<ICoinPriceAndChangedRateProps> = ({
  currency,
  currentPrice,
  changedRate24HByCurrency,
  symbol,
  changedRate24H,
  marketCap,
  totalVolume24H,
}) => {
  return (
    <div style={{ textAlign: 'right', width: '50%' }}>
      <div style={{ marginBottom: '20px' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'end',
            alignItems: 'center',
          }}
        >
          <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
            {' '}
            {currency === CurrencyEnum.KRW ? '₩' : '$'}
            {currentPrice != null ? formatNumber(currentPrice) : '-'}
          </div>
          <div
            style={{
              color:
                changedRate24HByCurrency !== undefined && changedRate24HByCurrency >= 0
                  ? 'red'
                  : 'blue',
              fontWeight: 'bold',
              marginLeft: '20px',
            }}
          >
            {changedRate24HByCurrency !== undefined
              ? `${formatNumber(changedRate24HByCurrency)}%`
              : '-'}
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'end',
            alignItems: 'center',
            marginTop: '4px',
          }}
        >
          <div style={{ fontSize: '14px', color: 'grey' }}>
            1.0000000 {symbol.toLocaleUpperCase()}
          </div>

          <div
            style={{
              marginLeft: '28px',
              fontSize: '14px',
              color:
                changedRate24H != null
                  ? changedRate24H >= 0
                    ? changedRate24H == 0
                      ? 'black'
                      : 'red'
                    : 'blue'
                  : 'black',
            }}
          >
            {changedRate24H != null ? formatNumber(changedRate24H) : '-'}%
          </div>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
          paddingLeft: '100px',
        }}
      >
        <div>
          <div style={{ fontSize: '15px', marginBottom: '6px' }}>시가 총액</div>
          <div style={{ fontSize: '15px' }}>
            {currency === CurrencyEnum.KRW ? '₩' : '$'}
            {marketCap !== undefined && formatNumber(marketCap)}
          </div>
        </div>
        <div style={{ marginLeft: '40px' }}>
          <div style={{ fontSize: '15px', marginBottom: '6px' }}>24시간 거래 대금</div>
          <div style={{ fontSize: '15px' }}>
            {currency === CurrencyEnum.KRW ? '₩' : '$'}
            {totalVolume24H !== undefined && formatNumber(totalVolume24H)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoinPriceAndChangedRate;
