import { getCoin } from '@apis/coinGecko';
import BookmarkIcon from '@common/components/BookmarkIcon';
import { ICoinDetail } from '@common/interface/interface';
import { useGlobalContext } from '@contexts/GlobalContext';
import { CurrencyEnum } from '@lib/enum';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { styled } from 'styled-components';
import { formatNumber } from '@lib/utils';
import {
  integerOrDecimalUpToTwoPlacesRegex,
  optionalDecimalWithMaxEightPlacesRegex,
  thousandsSeparatorRegex,
} from '@lib/constant';
import arrowImage from '../../../assets/arrow.png';
import LoadingDots from '@common/components/LoadingDots';
import CoinInfoTable from '@domain/coin/detail/components/CoinInfoTable';
import CoinPriceAndChangedRate from '@domain/coin/detail/components/CoinPriceAndChangedRate';
import SymbolInput from '@domain/coin/detail/components/SymbolInput';
import CurrencyInput from '@domain/coin/detail/components/CurrencyInput';
import ArrowIconSvg from '@domain/coin/detail/components/ArrowIconSvg';
import CoinDescription from '@domain/coin/detail/components/CoinDescription';

const CoinDetailPage = () => {
  const { id } = useParams();
  const { bookmarks, changeCurrency } = useGlobalContext();
  const [coinData, setCoinData] = useState<ICoinDetail | null>(null);
  const [currency, setCurrency] = useState<CurrencyEnum>(CurrencyEnum.KRW);
  const [isDescriptionShown, setIsDescriptionShown] = useState(false);
  const [symbolAmount, setSymbolAmount] = useState('1');
  const [currencyAmount, setCurrencyAmount] = useState('');

  const fetchData = useCallback(() => getCoin(id), [id]);

  const queryResults = useQuery({
    queryKey: ['coins', id],
    queryFn: fetchData,
    meta: {
      errorMessage: '코인 상세 내용을 가져오는데 문제가 발생하였습니다. 잠시 후 다시 시도해주세요.',
    },
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (!queryResults.isLoading && queryResults.data) {
      setCoinData(queryResults.data);
      setCurrencyAmount(formatNumber(queryResults.data.market_data.current_price[currency] ?? 0));
    }
  }, [queryResults.data, currency]);

  const handleChangeSymbolAmount = useCallback(
    (value: string) => {
      if (value.trim() === '') {
        setSymbolAmount('0');
        setCurrencyAmount('0');
        return;
      }

      if (value.startsWith('0') && value.length > 1) {
        if (!isNaN(Number(value[1]))) {
          value = value.substring(1); // "01", "02" 등의 경우 "0"을 제거
        }
      }

      const cleanValue = value.replace(/,/g, '').match(optionalDecimalWithMaxEightPlacesRegex);
      if (cleanValue) {
        const numericValue = cleanValue[0];
        const parts = numericValue.split('.');
        parts[0] = parts[0].replace(thousandsSeparatorRegex, ',');
        if (parts.length > 1 && parts[1].length > 8) {
          parts[1] = parts[1].substring(0, 8); // 소수점 이하 8자리로 제한
        }
        setSymbolAmount(parts.join('.'));
      }

      // 숫자 변환 처리 전에 0만 연속으로 들어올 경우 처리
      if (value.replace(/,/g, '') === '0') {
        setCurrencyAmount('0');
        return;
      }

      // 소수점 8자리 이상 입력 방지 로직 추가
      const numericValue = parseFloat(value.replace(/,/g, ''));
      if (numericValue.toString().split('.')[1]?.length > 8) {
        return; // 소수점 8자리 이상의 입력은 처리하지 않음
      }
      const newCurrencyAmount = numericValue * (coinData?.market_data.current_price[currency] ?? 0);
      if (newCurrencyAmount === 0) {
        setCurrencyAmount('0'); // 숫자가 0인 경우 "0.00" 대신 "0"으로 표시
      } else {
        setCurrencyAmount(newCurrencyAmount.toFixed(2).replace(thousandsSeparatorRegex, ','));
      }
    },
    [coinData, currency],
  );

  const handleChangeCurrencyAmount = useCallback(
    (value: string) => {
      value = value.replace(/,/g, ''); // 쉼표 제거
      if (value === '') {
        // 빈 문자열이면 0을 표시
        setCurrencyAmount('0');
        setSymbolAmount('0');
        return;
      }

      // 입력 값이 완전히 비었거나, '0.' 또는 '.'만 남았을 때
      if (value === '0.' || value === '.') {
        setCurrencyAmount('0');
        return;
      }

      // 입력 값이 0으로 시작하고 그 이후에 숫자가 입력되면 0을 제거
      if (value.match(/^0\d/)) {
        value = value.substring(1);
      }

      if (value === '') {
        setCurrencyAmount('0'); // 빈 문자열이면 0을 표시
      } else if (integerOrDecimalUpToTwoPlacesRegex.test(value)) {
        const parts = value.split('.');
        parts[0] = parts[0].replace(thousandsSeparatorRegex, ',');
        setCurrencyAmount(parts.join('.'));
      }

      const currentPrice = coinData?.market_data.current_price[currency] ?? 1;
      const numericValue = parseFloat(value.replace(/,/g, ''));
      const newSymbolAmount = numericValue / currentPrice;
      const formattedSymbolAmount = newSymbolAmount.toFixed(8); // 소수점 이하 8자리로 포맷, 천 단위 구분자 제거
      if (formattedSymbolAmount === '0.00000000') {
        setSymbolAmount('0'); // 추가된 조건, 숫자가 매우 작아서 0으로 표시되어야 할 경우
      } else {
        setSymbolAmount(formattedSymbolAmount);
      }
    },
    [coinData, currency],
  );

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
