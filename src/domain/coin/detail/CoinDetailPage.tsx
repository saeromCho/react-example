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

  /// TODO: URL 로 치고 들어왔을 때 id 가 동일하다면 이전 콜백 사용하면 유용할 거 같다고 생각하긴 했지만, 사실 URL 로 새로 치고 들어오면 이전 상태가 유지가 되어있지 않으므로 사실 필요가 없을 수도 있겠다 싶네. 사실, 해당 페이지에서 코인을 바꿀 수는 없어, 그렇기 때문에 useCallback 이 필요없다고 생각함. 메모이제이션된 콜백을 사용할 수 있는 경우 자체가 없다는 말이야.
  const fetchData = useCallback(() => getCoin(id), [id]);

  const queryResults = useQuery({
    /// TODO: 여기도 마찬가지. 'coins' 는 안 넣어도 됐는데 넣었네.. 후... 더블체킹 좀 할 걸.. 는 아님.
    //  ㄴㄴㄴ queryKey에 'coins'를 포함하는 것은 데이터의 출처나 유형을 명확히 하여, 다양한 컨텍스트에서 동일한 id를 사용할 때 발생할 수 있는 충돌을 피하기 위함입니다. 다른 페이지라 하더라도, 동일한 id를 가진 다른 데이터 유형을 관리할 가능성이 있기 때문에 queryKey를 구체적으로 설정하는 것이 좋음.
    queryKey: ['coins', id],
    queryFn: fetchData,
    meta: {
      errorMessage: '코인 상세 내용을 가져오는데 문제가 발생하였습니다. 잠시 후 다시 시도해주세요.',
    },
    /// TODO: 전체 목록 스크린에서는 autoFetch 가 필요하다고 생각했고, 여기서는 굳이라고 생각했다. 아닌가.. 다시 생각해보니 실시간을 위해서라면 여기서도 해줬어야 됐나 싶기도 하고...
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    console.log('여기 안들어올텐데..?');
    console.log('queryResults.data');
    console.log(queryResults.data);
    if (!queryResults.isLoading && queryResults.data) {
      setCoinData(queryResults.data);
      /// TODO: queryResults.data.market_data.current_price[currency] 이거 변수로 뺼 걸 그랬다; 너무 기네..
      setCurrencyAmount(formatNumber(queryResults.data.market_data.current_price[currency] ?? 0));
    }
    /// TODO: 여기에는 currency 값에 대한 의존성 배열 설정이 필요없는데..? currency 를 바꿔도 API 호출 안하는데 왜 걸었어?
    /// TODO: currency 가 바뀌어도 queryResults.data 값이 있을 수 있나? API 호출을 안하는데?(queryKey 자체에 currency 가 안걸려있어서 API 호출을 안할 거임.) API 호출안하는 거라고 생각하는데 안하는 게 맞는지 확인해볼 것. => 호출안하는 거 맞음. 하지만 벗, 호출은 안하지만 queryResults.data 값은 있어. 이전 값을 갖고 있나봐. 그래서 currency 상태에 따라 의존성이 있어야 되긴 해. 그리고 드랍다운에서 currency 바꾸니까 의존성이 있어야 되긴 함.
  }, [queryResults.data, currency]);

  /**
   * 사용자가 입력한 값을 처리하여 특정 형식의 숫자로 변환하고, 이를 기반으로 관련된 통화 값을 계산하는 역할을 합니다. 이 함수는 useCallback을 사용하여 메모이제이션되고, coinData와 currency에 의존합니다.
   *  문자열 value를 인수로 받는 함수입니다. useCallback을 사용하여 이 함수가 coinData나 currency가 변경되지 않는 한, 동일한 인스턴스를 유지하도록 합니다.
   */
  const handleChangeSymbolAmount = useCallback(
    (value: string) => {
      if (value.trim() === '') {
        // 입력 값이 빈 문자열이거나 공백으로만 구성되어 있으면, setSymbolAmount와 setCurrencyAmount를 각각 '0'으로 설정하고 함수를 종료합니다.
        setSymbolAmount('0');
        setCurrencyAmount('0');
        return;
      }

      if (value.startsWith('0') && value.length > 1) {
        // 입력 값이 '0'으로 시작하고 길이가 1보다 크면, 두 번째 문자가 숫자인지 확인합니다. 만약 그렇다면, 첫 번째 문자를 제거합니다. 예를 들어, '012'는 '12'로 변환됩니다.
        if (!isNaN(Number(value[1]))) {
          value = value.substring(1); // "01", "02" 등의 경우 "0"을 제거
        }
      }

      // 입력 값에서 쉼표를 제거한 후, optionalDecimalWithMaxEightPlacesRegex 정규 표현식을 사용하여 유효한 숫자 형식을 찾습니다.
      // "12,345.67890"에서 쉼표를 제거하면 "12345.67890"이 됩니다.
      // 정규 표현식 ^\d*\.?\d{0,8}는 "12345.67890"에서 "12345.67890"과 일치합니다.
      // 유효한 숫자가 있으면, 정수 부분과 소수 부분을 나눕니다.
      // 정수 부분에 대해 thousandsSeparatorRegex를 사용하여 천 단위 구분 기호를 추가합니다.
      // 소수 부분이 존재하고 그 길이가 8자리를 초과하면, 최대 8자리까지 잘라냅니다.
      // 최종적으로 setSymbolAmount를 사용하여 포맷된 숫자를 설정합니다.
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

      // 입력 값에서 쉼표를 제거한 후, 값이 '0'이면 setCurrencyAmount를 '0'으로 설정하고 함수를 종료합니다.
      // 숫자 변환 처리 전에 0만 연속으로 들어올 경우 처리
      if (value.replace(/,/g, '') === '0') {
        setCurrencyAmount('0');
        return;
      }

      // 소수점 8자리 이상 입력 방지 로직 추가
      // 입력 값에서 쉼표를 제거하고 parseFloat를 사용하여 숫자 형식으로 변환합니다.
      // 소수 부분이 존재하고 그 길이가 8자리를 초과하면 함수를 종료합니다.
      const numericValue = parseFloat(value.replace(/,/g, ''));
      if (numericValue.toString().split('.')[1]?.length > 8) {
        return; // 소수점 8자리 이상의 입력은 처리하지 않음
      }
      // numericValue를 coinData의 market_data.current_price에서 currency에 해당하는 가격과 곱하여 새로운 통화 값을 계산합니다. coinData나 current_price가 존재하지 않으면 0을 사용합니다.
      const newCurrencyAmount = numericValue * (coinData?.market_data.current_price[currency] ?? 0);
      if (newCurrencyAmount === 0) {
        // 계산된 newCurrencyAmount가 0이면 setCurrencyAmount를 '0'으로 설정합니다.
        setCurrencyAmount('0'); // 숫자가 0인 경우 "0.00" 대신 "0"으로 표시
      } else {
        // 그렇지 않으면, newCurrencyAmount를 소수점 둘째 자리까지 반올림하고 천 단위 구분 기호를 추가하여 setCurrencyAmount를 설정합니다.
        setCurrencyAmount(newCurrencyAmount.toFixed(2).replace(thousandsSeparatorRegex, ','));
      }
    },
    [coinData, currency],
  );

  /**
   * 사용자가 입력한 통화 값을 처리하여 특정 형식의 숫자로 변환하고, 이를 기반으로 관련된 심볼 값을 계산하는 역할을 합니다. 이 함수는 useCallback을 사용하여 메모이제이션되고, coinData와 currency에 의존함.
   * 문자열 value를 인수로 받는 함수입니다. useCallback을 사용하여 이 함수가 coinData나 currency가 변경되지 않는 한, 동일한 인스턴스를 유지하도록 합니다.
   */
  const handleChangeCurrencyAmount = useCallback(
    (value: string) => {
      // 입력 값에서 모든 쉼표를 제거합니다. 쉼표는 숫자 형식에서 천 단위 구분 기호로 사용될 수 있으므로 이를 제거합니다.
      value = value.replace(/,/g, ''); // 쉼표 제거
      if (value === '') {
        // 입력 값이 빈 문자열이면 setCurrencyAmount와 setSymbolAmount를 각각 '0'으로 설정하고 함수를 종료합니다.
        // 빈 문자열이면 0을 표시
        setCurrencyAmount('0');
        setSymbolAmount('0');
        return;
      }

      // 입력 값이 '0.' 또는 '.'인 경우 setCurrencyAmount를 '0'으로 설정하고 함수를 종료합니다. 이는 사용자가 소수를 입력하기 시작했을 때를 처리합니다.
      // 입력 값이 완전히 비었거나, '0.' 또는 '.'만 남았을 때
      if (value === '0.' || value === '.') {
        setCurrencyAmount('0');
        return;
      }

      // 입력 값이 '0'으로 시작하고 두 번째 문자가 숫자인 경우, 첫 번째 문자를 제거합니다. 예를 들어, '012'는 '12'로 변환됩니다.
      // 입력 값이 0으로 시작하고 그 이후에 숫자가 입력되면 0을 제거
      if (value.match(/^0\d/)) {
        value = value.substring(1);
      }

      // 입력 값이 빈 문자열이면 setCurrencyAmount를 '0'으로 설정합니다.
      // 입력 값이 integerOrDecimalUpToTwoPlacesRegex 정규 표현식과 일치하면, 즉 정수 또는 소수점 이하 두 자리까지의 숫자 형식이면:
      // 정수 부분과 소수 부분으로 나누고,
      // 정수 부분에 대해 thousandsSeparatorRegex를 사용하여 천 단위 구분 기호를 추가합니다.
      // 최종적으로 setCurrencyAmount를 사용하여 포맷된 숫자를 설정합니다.
      if (value === '') {
        setCurrencyAmount('0'); // 빈 문자열이면 0을 표시
      } else if (integerOrDecimalUpToTwoPlacesRegex.test(value)) {
        const parts = value.split('.');
        parts[0] = parts[0].replace(thousandsSeparatorRegex, ',');
        setCurrencyAmount(parts.join('.'));
      }

      // coinData 객체에서 현재 통화의 가격을 가져옵니다. coinData나 current_price가 존재하지 않으면 기본값으로 1을 사용합니다.
      const currentPrice = coinData?.market_data.current_price[currency] ?? 1;
      // 입력 값에서 쉼표를 제거하고 parseFloat를 사용하여 숫자 형식으로 변환합니다.
      const numericValue = parseFloat(value.replace(/,/g, ''));
      // numericValue를 현재 가격으로 나누어 새로운 심볼 값을 계산합니다.
      const newSymbolAmount = numericValue / currentPrice;
      // newSymbolAmount를 소수점 8자리까지 반올림하여 문자열로 변환합니다.
      const formattedSymbolAmount = newSymbolAmount.toFixed(8); // 소수점 이하 8자리로 포맷, 천 단위 구분자 제거

      // 계산된 formattedSymbolAmount가 '0.00000000'이면 setSymbolAmount를 '0'으로 설정합니다.
      //그렇지 않으면 setSymbolAmount를 formattedSymbolAmount로 설정합니다.
      if (formattedSymbolAmount === '0.00000000') {
        /// TODO: 이 코드의 의미가 '숫자가 매우 작아서 0으로 표시되어야 할 경우' 가 아니지 않아? 0.00000000 이면 0으로 보여준다 아니야? 하..
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
