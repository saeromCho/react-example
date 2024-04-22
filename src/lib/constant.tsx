export const API_BASE_URL = `https://api.coingecko.com/api/v3`;
export const PAGING_SIZE = 50;

// 세 자리 숫자마다 구분자(예: 쉼표)를 삽입할 위치를 찾는 데 사용
// /\B(?=(\\d{3})+(?!\\d))/g;
export const thousandsSeparatorRegex = /\B(?=(\d{3})+(?!\d))/g;
// 소수점을 포함할 수 있는 숫자를 검사하며, 소수점 이하 최대 8자리까지 허용
export const optionalDecimalWithMaxEightPlacesRegex = /^\d*\.?\d{0,8}/;
// 소수점 이하 최대 두 자리를 허용하는 유효한 숫자를 검사합니다. 숫자는 0 이상이어야 하며, 0.01과 같이 0으로 시작할 수도 있음.
export const integerOrDecimalUpToTwoPlacesRegex = /^[1-9]\d*(\.\d{0,2})?$|^0\.\d{0,2}$/;
