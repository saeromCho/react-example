import { ICoinPriceAndChangedRateProps } from "@common/interface/interface";
import { CurrencyEnum } from "@lib/enum";
import { formatNumber } from "@lib/utils";

const CoinPriceAndChangedRate: React.FC<ICoinPriceAndChangedRateProps> = ({
  currency,
  currentPrice,
  changedRate24HByCurrency,
  symbol,
  changedRate24H,
  marketCap,
  totalVolume24H}) => {
    console.log(currency);
    console.log(currentPrice);
    console.log(changedRate24HByCurrency);
  
    console.log( symbol)
    console.log(changedRate24H);
    console.log(marketCap);
    console.log(totalVolume24H);
  return (
    <div style={{textAlign: 'right', width: '50%'}}>
      <div style={{marginBottom: '20px'}}>
        <div style={{display: 'flex',
    flexDirection: 'row',
    justifyContent: 'end',
    alignItems: 'center'}}>
          <div style={{fontSize: '24px', fontWeight: 'bold' }}> {currency === CurrencyEnum.KRW ? '₩' : '$'}{currentPrice != null ? formatNumber(currentPrice) : '-'}</div>
          <div style={{marginLeft: '20px',fontSize: '14px', fontWeight: 'bold', color: changedRate24HByCurrency >= 0 ? changedRate24HByCurrency == 0 ? 'black' : 'red': 'blue' }}>{formatNumber(changedRate24HByCurrency)}%</div>
        </div>
        <div style={{display: 'flex',
    flexDirection: 'row',
    justifyContent: 'end',
    alignItems: 'center'}}>
          <div style={{fontSize: '12px', color: 'grey' }}>1.0000000 {symbol.toLocaleUpperCase()}</div>
          
          <div style={{marginLeft: '20px',fontSize: '12px', color: changedRate24H != null ? changedRate24H >= 0 ? changedRate24H == 0 ? 'black' : 'red': 'blue':'black' }}>{changedRate24H != null ? formatNumber(changedRate24H):'-'}%</div>
        </div>
      </div>
      <div style={{display: 'flex',flexDirection: 'row', justifyContent: 'space-between', paddingLeft: '100px'}}>
        <div >
          <div style={{fontSize: '12px', marginBottom: '6px'}}>시가 총액</div>
          <div style={{fontSize: '12px'}}>{currency === CurrencyEnum.KRW ? '₩' : '$'}{formatNumber(marketCap)}</div>
        </div>
        <div>
          <div style={{fontSize: '12px',     marginBottom: '6px'}}>24시간 거래 대금</div>
          <div style={{fontSize: '12px'}}>{currency === CurrencyEnum.KRW ? '₩' : '$'}{formatNumber(totalVolume24H)}</div>
        </div>
      </div>
    </div>
  )
}

export default CoinPriceAndChangedRate;