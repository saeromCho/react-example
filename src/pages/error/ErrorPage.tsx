import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

const ErrorPage = () => {
  const navigate = useNavigate();
  
  const goHome = () => {
    navigate('/');
  }

  return (
    <>
      <ErrorTitle>Error Occurred</ErrorTitle>
      <ErrorContent>문제가 발생하였습니다. 잠시만 기다려주세요. 🙏 </ErrorContent>
      <ErrorContent>문제가 계속 지속되는 경우 <a href="mailto:saerom.r.cho@gmail.com">saerom.r.cho@gmail.com</a> 으로 메일을 보내주세요. </ErrorContent>
      <GoToHome onClick={() => goHome()} >메인 홈으로 이동하기</GoToHome>
    </>
  );
};

export default ErrorPage;

const ErrorTitle = styled.h1`
  text-align: center;
  margin-bottom: 5%;

`;
const ErrorContent = styled.div`
  text-align: center;
  margin-top: 2%;
`;
const GoToHome = styled.div`
  text-align: center;
  margin-top: 5%;
  font-size: 20px;
  cursor: pointer;
`;

