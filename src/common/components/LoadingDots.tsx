import { IDotProps, IPropsLoadingDotsProps } from '@common/interface/interface';
import styled, { keyframes } from 'styled-components';

const LoadingDots: React.FC<IPropsLoadingDotsProps> = ({isFitted = false}) => (
  <DotsContainer isFitted={isFitted}>
    <Dot delay="0s" />
    <Dot delay="0.2s" />
    <Dot delay="0.4s" />
  </DotsContainer>
);

export default LoadingDots;

const DotsContainer = styled.div<IPropsLoadingDotsProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: ${props => props.isFitted ? '20px' : '200px'};
`;

const flash = keyframes`
  0%, 100% { opacity: 0; }
  50% { opacity: 1; }
`;


const Dot = styled.div<IDotProps>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #4A90E2;
  animation: ${flash} 1.4s infinite ease-in-out both;
  animation-delay: ${props => props.delay};

  &:not(:last-child) {
    margin-right: 5px;
  }
`;
