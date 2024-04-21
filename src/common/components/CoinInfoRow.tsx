import { ICoinInfoRowProps } from "@common/interface/interface";


// InfoRowProps 타입을 사용하여 컴포넌트의 props에 타입을 지정합니다.
const CoinInfoRow: React.FC<ICoinInfoRowProps> = ({ label, value }) => (
  <tr>
    <td>{label}</td>
    <td>{value}</td>
  </tr>
);

export default CoinInfoRow;