import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const goHome = () => {
    const navigate = useNavigate();
    navigate('/');
  }

  return (
    <div>
      <h1>Error Occurred</h1>
      <p>문제가 발생하였습니다. 잠시만 기다려주세요. 🙏 </p>
      <p>문제가 계속 지속되는 경우 saerom.r.cho@gmail.com 으로 메일을 보내주세요. </p>
      <div onClick={goHome}>메인 홈으로 이동하기</div>
    </div>
  );
};

export default ErrorPage;
