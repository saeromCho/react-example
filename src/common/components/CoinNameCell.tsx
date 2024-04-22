import { ICoinNameCellProps } from '@common/interface/interface';
import { useNavigate } from 'react-router-dom';
import { CoinName } from './CoinTable';

const CoinNameCell: React.FC<ICoinNameCellProps> = ({ coinId, children }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/coins/${coinId}`);
  };

  return <CoinName onClick={handleClick}>{children}</CoinName>;
};

export default CoinNameCell;
