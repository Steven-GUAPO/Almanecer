import axios from 'axios';
import { API_ENDPOINT } from "@env"

const MenuItemsbaseUrl = API_ENDPOINT + 'menuitems/'

export const getMenuItems = async (userData) => {
    const menuItemsendpoint = MenuItemsbaseUrl
  try {
    //console.log("menuItemsendpoint", menuItemsendpoint)
    const response = await axios.get(menuItemsendpoint);
    //console.log("response", response.data);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to retreive menu items');
  }
};