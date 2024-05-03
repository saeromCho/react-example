// import { API_BASE_URL } from '@lib/constant';
// import axios from 'axios';

// const axiosInstance = axios.create({
//   baseURL: API_BASE_URL,
// });

// export default axiosInstance;
/// TODO: 이렇게 싱글톤 패턴으로 구현하는 게 더 적합하고 맞았음. 원리는 싱글톤이지만 더 정확한게 좋은 거니까 ㅇㅇ
import axios, { AxiosInstance } from 'axios';
import { API_BASE_URL } from '@lib/constant';

class AxiosSingletonInstance {
  private static instance: AxiosInstance; // 타입을 AxiosInstance로 명시

  // getInstance 메서드를 사용하여 인스턴스 접근을 관리
  public static getInstance(): AxiosInstance {
    if (!AxiosSingletonInstance.instance) {
      AxiosSingletonInstance.instance = axios.create({
        baseURL: API_BASE_URL,
      });
    }
    return AxiosSingletonInstance.instance;
  }
}

// getInstance를 사용하여 싱글톤 인스턴스를 가져옴
const axiosSingletonInstance = AxiosSingletonInstance.getInstance();

export default axiosSingletonInstance;
