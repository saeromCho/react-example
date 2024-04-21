import { PAGING_SIZE } from "@static/constant";
import axiosInstance from "./axiosInstance";

export const checkPing = async () => {
  try {
    const response = await axiosInstance.get('/ping')
    return response.data
  } catch ( error) {
    console.error('Failed to fetch ping:', error)
    throw error
  }
}

  export const getCoins = async (currency: string, order:string, per_page: number = PAGING_SIZE, page:number, locale: string) => {
  try {
    const response = await axiosInstance.get('/coins/markets', {
      params: {
        vs_currency: currency,
        order: order,
        per_page: per_page,
        page: page,
        locale: locale,
        price_change_percentage: '1h,24h,7d',
        precision: 2,
      },
    })
    return response.data
  } catch ( error) {
    console.error('Failed to fetch coins:', error)
    throw error
  }
};

export const getCoin = async (id: string | undefined) => {
  try {
    console.log(id)
    const response = await axiosInstance.get(`/coins/${id}`)
    return response.data
  } catch ( error) {
    console.error(`Failed to fetch coin with id ${id}:`, error)
    throw error
  }
};