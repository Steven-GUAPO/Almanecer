import * as SecureStore from 'expo-secure-store';

// Function to save data securely
export const saveToSecureStore = async (key, value) => {
    try {
      await SecureStore.setItemAsync(key, value);
    } catch (error) {
      console.error('Error saving data to SecureStore:', error);
    }
  };
  
  // Function to retrieve data from SecureStore
  export const getFromSecureStore = async (key) => {
    try {
      return await SecureStore.getItemAsync(key);
    } catch (error) {
      console.error('Error retrieving data from SecureStore:', error);
      return null;
    }
  };

  // Function to remove a key from SecureStore
export const removeFromSecureStore = async (key) => {
    try {
      await SecureStore.deleteItemAsync(key);
      console.log(`${key} removed from SecureStore`);
    } catch (error) {
      console.error('Error removing data from SecureStore:', error);
    }
  };