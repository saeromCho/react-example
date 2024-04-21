import styled, { keyframes } from 'styled-components';

const LoadingDots = () => {
  const dotStyle = (delay: string) => ({
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    backgroundColor: '#4A90E2',
    marginRight: '5px',
    animation: `flash 1.4s ${delay} infinite ease-in-out both`
  });

  return (
  <DotsContainer>
    <div style={dotStyle('0s')} />
    <div style={dotStyle('0.2s')} />
    <div style={dotStyle('0.4s')} />
  </DotsContainer>
)
}

export default LoadingDots;

const DotsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 100px;
`;
