import axiosSingletonInstance from './axiosSingletonInstance';
import { PAGING_SIZE } from '@lib/constant';

export const checkPing = async () => {
  try {
    const response = await axiosSingletonInstance.get('/ping');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch ping:', error);
    throw error;
  }
};

export const getCoins = async (
  currency: string,
  order: string,
  per_page: number = PAGING_SIZE,
  page: number,
  locale: string,
) => {
  try {
    /// TODO: /coins 를 따로 변수로 빼는 방법도 고려해봤어도 좋았을 듯. 간단한 거지만, 이 두개가 아닌 여러개 쓴다고 가정했을 때를 대비해서 baseAPIURL 을 빼두는 것도 나쁘지 않은 선택이었을 듯.
    /// TODO: axiosInstance 를 만든 이유에 대해서 조금 더 생각해볼 것. 굳이 안만들고 그냥 axios.get() 이렇게 해줘도 됐었을 거 같은데? 할 거면 싱글톤 패턴으로 만들던가, axiosInstance 들어가보면 싱글톤 패턴도 아닌데 뭐할라고 만들었어..? 난 지금까지 싱글톤 패턴인 줄 알았는데 지금 보니까 아니네? 그럼 그냥 axios.get() 하는 거랑 뭐가 달라;
    /// TODO: 오케이 대답해줄게. 엄밀히 말하자면 axiosInstance 는 전형적인 싱글톤 패턴은 아니지만 싱글톤 원리를 이용한 거긴 하대. axios.create() 를 한번만 호출해서 axios 인스턴스를 만들어두고 이를 재사용하기 때문에 매 메소드마다 axios.create() 를 써주는 것보다 메모리 사용 측면이나 재사용 측면에서 나은 성능을 보이는 건 맞대. 휴...
    /// 매 메소드마다 axios.create() 하는 건 매번 axios 인스턴스를 생성해서 사용하는 것인데, axiosInstance 에서 한번만 axios.create() 를 미리 진행하고 axiosInstance 를 사용할 땐 axios.create() 를 진행하지 않으므로 나은 성능을 보이긴 하고 더 나은 코드이긴 하네 ㅇㅈ.
    /// TODO: axiosInstance 를 전형적인 싱글톤 패턴으로 구현했으면 완벽했는데, 그거까지는 못했다. 있으면 그대로 쓰고 없으면 생성하는 코드로 구현되었으면 완벽했을 거임.
    /// TODO: 이렇게 구현을 하는 것보다 axiosInstance 를 사용해서 하는 게 더 나은 성능을 가지긴 함.
    // const response = axios
    //   .create({
    //     baseURL: API_BASE_URL,
    //   })
    //   .get('/coins/markets', {
    //     params: {
    //       vs_currency: currency,
    //       order: order,
    //       per_page: per_page,
    //       page: page,
    //       locale: locale,
    //       price_change_percentage: '1h,24h,7d',
    //       precision: 2,
    //     },
    //   });
    const response = await axiosSingletonInstance.get('/coins/markets', {
      params: {
        vs_currency: currency,
        order: order,
        per_page: per_page,
        page: page,
        locale: locale,
        price_change_percentage: '1h,24h,7d',
        precision: 2,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch coins:', error);
    throw error;
  }
};

export const getCoin = async (id: string | undefined) => {
  try {
    const response = await axiosSingletonInstance.get(`/coins/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch coin with id ${id}:`, error);
    throw error;
  }
};
