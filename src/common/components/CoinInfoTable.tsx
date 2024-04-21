import {  ICoin, ICoinDetail, IInfoTableProps } from "@common/interface/interface";
import CoinInfoRow from "./CoinInfoRow";


const CoinInfoTable: React.FC<any> = (data) => (
  <table>
    <tbody>
    <CoinInfoRow key={'rank'} label={'시가총액 Rank'} value={data?.market_cap_rank} />
    <CoinInfoRow key={'websiteUrl'} label={'웹사이트'} value={data?.links?.homepage[0]} />
      {/* {data.map((row, index) => (
        // rank={coinData?.market_cap_rank} webSiteUrl={coinData?.links?.homepage[0]}
        <CoinInfoRow key={index} label={row.label} value={row.value} />
      ))} */}
    </tbody>
  </table>
);

export default CoinInfoTable;