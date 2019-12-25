import {AsyncStorage} from 'react-native';
import {startLoading, endLoading} from './../systemControl/systemControlActions';

export const getRememberedUser = async () => {
  try {
    const uid = await AsyncStorage.getItem('digiwalletUserUID');

    return uid;
  } catch (error) {
    console.log('error while fetching AsyncStorage item', error);
  }
};

export const rememberUser = async uid => {
  try {
    await AsyncStorage.setItem('digiwalletUserUID', uid);
  } catch (error) {
    console.log('error while setting AsyncStorage item', error);
  }
};

export const removeUID = async uid => {
  try {
    await AsyncStorage.removeItem('digiwalletUserUID');
  } catch (error) {
    console.log('error while removing AsyncStorage item ', error);
  }
};
