import {AsyncStorage} from 'react-native';

export const getRememberedUser = async () => {
    try {
      const uid = await AsyncStorage.getItem('digiwalletUserUID');

      return uid;
    } catch (error) {
      console.log(error);
    }
};

export const rememberUser = async uid => {
    try {
      await AsyncStorage.setItem('digiwalletUserUID', uid);
    } catch (error) {
      console.log('error while setting AsyncStorage item', error);
    }
};