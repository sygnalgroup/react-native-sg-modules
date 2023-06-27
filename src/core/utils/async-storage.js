import AsyncStorage from '@react-native-async-storage/async-storage';

export async function persistData(key, value) {
  if (value === 'batch-request') {
    return;
  }

  if (value === null || value === undefined) {
    await AsyncStorage.removeItem(key);
    return;
  }

  await AsyncStorage.setItem(key, value);
}

export async function retrieveData(key) {
  return AsyncStorage.getItem(key);
}

export async function removeData(key) {
  return AsyncStorage.removeItem(key);
}
