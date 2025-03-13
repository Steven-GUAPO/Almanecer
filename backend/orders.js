import axios from 'axios';
import { API_ENDPOINT } from "@env"

const ordersBaseUrl = API_ENDPOINT + 'orders/'

export const placeOrder = async (orderData) => {
    const orderendpoint = ordersBaseUrl
  try {
    //console.log("orderendpoint", orderendpoint);
    const response = await axios.post(orderendpoint, orderData);
    //console.log("response", response.data);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to create order');
  }
};

export const ordersByCustomer = async (customerId) => {
  const orderByCustomerEndpoint = ordersBaseUrl + customerId
  try{
    const response = await axios.get(orderByCustomerEndpoint);
    return response.data;
  }catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to get order for a customer');
  }
}