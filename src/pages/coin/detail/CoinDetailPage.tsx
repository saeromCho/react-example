import { getCoin } from '@apis/coinGecko';
import CoinInfoTable from '@common/components/CoinInfoTable';
import BookmarkIcon from '@common/components/BookmarkIcon';
import { ICoinDetail } from '@common/interface/interface';
import { useGlobalContext } from '@contexts/GlobalContext';
import { CurrencyEnum } from '@lib/enum';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import CoinDescription from '@common/components/CoinDescription';
import CoinPriceAndChangedRate from '@common/components/CoinPriceAndChangedRate';
import CurrencyInput from '@common/components/CurrencyInput';
import LoadingDots from '@common/components/LoadingDots';
import SymbolInput from '@common/components/SymbolInput';
import { styled } from 'styled-components';
import ArrowIconSvg from '@lib/ArrowIconSvg';
import { formatNumber } from '@lib/utils';
import {
  integerOrDecimalUpToTwoPlacesRegex,
  optionalDecimalWithMaxEightPlacesRegex,
  thousandsSeparatorRegex,
} from '@lib/constant';
import arrowImage from '../../../assets/arrow.png';

function setCurrencyAmountInCurrency(
  value: string,
  setCurrencyAmount: (value: ((prevState: string) => string) | string) => void,
) {
  validateCurrency(value, setCurrencyAmount);
}

function setSymbolAmountInSymbol(
  value: string,
  setSymbolAmount: (value: ((prevState: string) => string) | string) => void,
) {
  const cleanValue = value.replace(/,/g, '').match(optionalDecimalWithMaxEightPlacesRegex);

  if (cleanValue) {
    const numericValue = cleanValue[0];
    const parts = numericValue.split('.');
    parts[0] = parts[0].replace(thousandsSeparatorRegex, ',');
    setSymbolAmount(parts.join('.'));
  }
}

function setCurrencyAmountInSymbol(
  coinData: ICoinDetail | null,
  currency: CurrencyEnum,
  value: string,
  setCurrencyAmount: (value: ((prevState: string) => string) | string) => void,
) {
  const currentPrice = coinData?.market_data.current_price[currency] ?? 0;
  const newCurrencyAmount = parseFloat(value) * currentPrice;
  const newCurrencyAmountToString = newCurrencyAmount.toString();
  value = newCurrencyAmountToString.replace(/,/g, '');

  validateCurrency(value, setCurrencyAmount);
  return value;
}

function validateCurrency(
  value: string,
  setCurrencyAmount: (value: ((prevState: string) => string) | string) => void,
) {
  if (value === '') {
    setCurrencyAmount('');
  } else if (integerOrDecimalUpToTwoPlacesRegex.test(value) || value === '') {
    const parts = value.split('.');
    parts[0] = parts[0].replace(thousandsSeparatorRegex, ',');
    setCurrencyAmount(parts.join('.'));
  }
}

function setSymbolAmountInCurrency(
  coinData: ICoinDetail | null,
  currency: CurrencyEnum,
  value: string,
  setSymbolAmount: (value: ((prevState: string) => string) | string) => void,
) {
  const currentPrice = coinData?.market_data.current_price[currency] ?? 0;
  const newSymbolAmount = parseFloat(value) / (currentPrice || 1);
  const newSymbolAmountToString = newSymbolAmount.toString();
  const cleanValue = newSymbolAmountToString
    .replace(/,/g, '')
    .match(optionalDecimalWithMaxEightPlacesRegex);

  if (cleanValue) {
    const numericValue = cleanValue[0];
    const parts = numericValue.split('.');
    parts[0] = parts[0].replace(thousandsSeparatorRegex, ',');
    setSymbolAmount(parts.join('.'));
  }
}

const CoinDetailPage = () => {
  const { id } = useParams();
  const { bookmarks } = useGlobalContext();
  const [coinData, setCoinData] = useState<ICoinDetail | null>(null);
  const [currency, setCurrency] = useState<CurrencyEnum>(CurrencyEnum.KRW);
  const [isDescriptionShown, setIsDescriptionShown] = useState(false);
  const [symbolAmount, setSymbolAmount] = useState('1');
  const [currencyAmount, setCurrencyAmount] = useState('');

  const getQueryKey = () => {
    return ['coins', id];
  };

  const fetchData = () => {
    return getCoin(id);
  };

  const queryResults = useQuery({
    queryKey: getQueryKey(),
    queryFn: fetchData,
    meta: {
      errorMessage: '코인 상세 내용을 가져오는데 문제가 발생하였습니다. 잠시 후 다시 시도해주세요.',
    },
    refetchOnWindowFocus: false,
  });

  if (queryResults.error) {
    return <Navigate to="/error" replace />;
  }

  useEffect(() => {
    if (!queryResults.isLoading && queryResults.data) {
      setCoinData(queryResults.data);
      setCurrencyAmount(formatNumber(queryResults.data.market_data.current_price[currency] ?? 0));
    }
  }, [queryResults.data]);

  const toggleArrow = () => {
    setIsDescriptionShown(!isDescriptionShown);
  };

  const handleChangeCurrency = (event: any) => {
    if (event.target.value == CurrencyEnum.KRW) {
      setCurrency(CurrencyEnum.KRW);
    } else {
      setCurrency(CurrencyEnum.USD);
    }
  };

  const handleChangeSymbolAmount = (value: string) => {
    setSymbolAmountInSymbol(value, setSymbolAmount);

    setCurrencyAmountInSymbol(coinData, currency, value, setCurrencyAmount);
  };

  const handleChangeCurrencyAmount = (value: string) => {
    value = value.replace(/,/g, '');

    setCurrencyAmountInCurrency(value, setCurrencyAmount);

    setSymbolAmountInCurrency(coinData, currency, value, setSymbolAmount);
  };

  return (
    <WrapperDiv>
      {queryResults.isLoading ? (
        <LoadingDots />
      ) : coinData != null ? (
        <>
          {/* 코인 이름, 드랍다운섹션 */}
          <TitleAndDropdown>
            <TitleDiv>
              <BookmarkIcon
                isBookmarked={bookmarks.some((coin) => coin.id === coinData!.id)}
                coin={coinData}
              />
              <CoinImage src={coinData.image.large} alt="Description of Image" />
              <CoinSymbol>
                {coinData.localization.ko} ({coinData.symbol.toLocaleUpperCase()})
              </CoinSymbol>
            </TitleDiv>
            <CurrencyDropdown value={currency} onChange={handleChangeCurrency}>
              <option value={CurrencyEnum.KRW}>KRW 보기</option>
              <option value={CurrencyEnum.USD}>USD 보기</option>
            </CurrencyDropdown>
          </TitleAndDropdown>
          {/* 시가총액, 웹사이트 // 가격, 상승량 등등 섹션 */}
          <InfoAndPriceDiv>
            <CoinInfoTable
              marketCapRank={coinData.market_cap_rank}
              websiteUrl={coinData.links.homepage.at(0)}
            />
            <CoinPriceAndChangedRate
              currency={currency}
              currentPrice={coinData.market_data.current_price[currency]}
              changedRate24HByCurrency={
                coinData.market_data.price_change_percentage_24h_in_currency[currency]
              }
              symbol={coinData.symbol}
              changedRate24H={coinData.market_data.price_change_percentage_24h}
              marketCap={coinData.market_data.market_cap[currency]}
              totalVolume24H={coinData.market_data.total_volume[currency]}
            />
          </InfoAndPriceDiv>
          {/* 가격 계산 섹션 */}
          <AmountConvertingDiv>
            <AmountConvertingTitle>가격 계산</AmountConvertingTitle>
            <AmountConverting>
              <SymbolInput value={symbolAmount} onChange={handleChangeSymbolAmount} />

              <BetweenArrowDiv>
                <ArrowImg src={arrowImage} alt="Logo" />
              </BetweenArrowDiv>

              <CurrencyInput
                currency={currency}
                value={currencyAmount}
                onChange={handleChangeCurrencyAmount}
              />
            </AmountConverting>
          </AmountConvertingDiv>
          {/* 설명보기 섹션 */}
          <DescriptionDiv onClick={toggleArrow}>
            <div>설명 보기</div>
            <ArrowIconSvg isDescriptionShown={isDescriptionShown} />
          </DescriptionDiv>
          {isDescriptionShown && (
            <CoinDescription ko={coinData.description.ko} en={coinData.description.en} />
          )}
          <div></div>
        </>
      ) : (
        <div> 데이터가 없습니다. </div>
      )}
    </WrapperDiv>
  );
};

export default CoinDetailPage;

const CurrencyDropdown = styled.select`
  height: 40px;
  border: none;
  cursor: pointer;
`;

const WrapperDiv = styled.div`
  padding: 60px 60px 40px 60px;
`;

const InfoAndPriceDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 50px;
  align-items: flex-end;
`;

const TitleAndDropdown = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 40px;
  align-items: center;
`;

const AmountConvertingDiv = styled.div`
  padding: 20px;
  background-color: whitesmoke;
`;

const TitleDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const CoinImage = styled.img`
  margin-right: 8px;
  width: 40px;
  height: 40px;
`;

const CoinSymbol = styled.div`
  font-size: 30px;
  font-weight: bold;
`;

const AmountConvertingTitle = styled.div`
  font-weight: bold;
  color: black;
`;

const AmountConverting = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding-top: 16px;
  padding-bottom: 20px;
  align-items: center;
`;

const BetweenArrowDiv = styled.div`
  margin-left: 40px;
  margin-right: 40px;
`;

const DescriptionDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 20px;
  cursor: pointer;
`;

const ArrowImg = styled.img`
  width: 30px;
  height: 30px;
  padding-top: 30px;
`;
