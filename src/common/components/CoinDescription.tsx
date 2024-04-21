import { ICoinDescription } from "@common/interface/interface";

const CoinDescription:  React.FC<ICoinDescription> = ({ko, en}) => {
  return (
    <div>
    {ko ? <div>{ko}</div> : en ? <div>{en}</div> : null}
  </div>
  );
}

export default CoinDescription;