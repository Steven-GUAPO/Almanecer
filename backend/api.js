import axios from 'axios';
import { saveToSecureStore } from './secureCache';
import {CACHE_ID_KEY, API_ENDPOINT} from "@env"

const userBaseUrl = API_ENDPOINT + 'user/'

export const signUpUser = async (userData) => {
    const signupendpoint = userBaseUrl
  try {
    //console.log("signupendpoint", signupendpoint);
    const response = await axios.post(signupendpoint, userData);
    //console.log("response", response);
    if (response.data._id) {
      // console.log("saving to cache from login")
      await saveToSecureStore(CACHE_ID_KEY, response.data._id);
    }

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to create user');
  }
};

export const loginUser = async (userData) => {
    const loginendpoint = userBaseUrl+'login/'
  try {
    const response = await axios.post(loginendpoint, userData);
    if (!response.data || response.status === 400) {
        throw new Error('Invalid email or password'); // Custom error message
    }
    
    if (response.data._id) {
      // console.log("saving to cache from login")
      await saveToSecureStore(CACHE_ID_KEY, response.data._id);
    }

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to retrive user');
  }
};

export const ssoLoginById = async (userId) => {
  const ssoLogininEndpoint = userBaseUrl + userId
  try{
    const response = await axios.get(ssoLogininEndpoint);
    return response.data;
  }catch (error){
    throw new Error(error.response?.data?.message || 'Failed Single Sign On');
  }
}
