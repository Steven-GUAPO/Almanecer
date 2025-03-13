import axios from 'axios';

const API_KEY = 'pk.b6ffeb90c6021c0a446af07ed02ad3ee'
const baseUrl = 'https://api.locationiq.com/v1/autocomplete?key=' + API_KEY + '&dedupe=1&limit=5&countrycodes=us&q='

export const relatedAddresses = async (text) => {
    const endpoint = baseUrl+text
    // console.log("endpoint"+endpoint)
  try {
    const response = await axios.get(endpoint);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to get related addresses');
  }
};