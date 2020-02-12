import React from 'react';
import { View } from 'react-native';
import {Header, Icon} from 'react-native-elements';
import { DARK_MODE } from './../Styles';

const MyHeader = ({navigation, title, accountFormType = 'EDIT'}) => {
  const HamburgerMenu = () => {
    return (
      <Icon
        color="#fff"
        name="menu"
        onPress={() => navigation.dispatch(navigation.actions.openDrawer())}
      />
    );
  };

  console.log(accountFormType);
  return (
    <View>
    <Header
      leftComponent={<HamburgerMenu />}
      backgroundColor={DARK_MODE.COLORS.HEADER_COLOR}
      // barStyle={{height: 20}}
      centerComponent={{
        text: title,
        style: {color: '#fff', fontWeight: 'bold'},
      }}
      // barStyle="dark-content"
      statusBarProps={{barStyle: 'dark-content'}}
    />
    </View>
  );
};

export default MyHeader;
