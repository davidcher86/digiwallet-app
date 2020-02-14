import React from 'react';
import {View} from 'react-native';
import {Header, Icon} from 'react-native-elements';
import {DARK_MODE} from './../Styles';

const MyHeader = ({navigation, title}) => {
  const HamburgerMenu = () => {
    return (
      <Icon
        color="#fff"
        name="menu"
        style={{height: '20'}}
        onPress={() => navigation.dispatch(navigation.actions.openDrawer())}
      />
    );
  };

  // console.log(accountFormType);
  return (
    <View>
      <Header
        leftComponent={<HamburgerMenu />}
        backgroundColor={DARK_MODE.COLORS.HEADER_COLOR}
        headerStyle={{height: '20'}}
        centerComponent={{
          text: title,
          style: {color: '#fff', fontWeight: 'bold', height: 20},
        }}
        // barStyle="dark-content"
        statusBarProps={{barStyle: 'dark-content'}}
      />
    </View>
  );
};

export default MyHeader;
