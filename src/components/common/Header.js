import React from 'react';
import {Header, Icon} from 'react-native-elements';

const MyHeader = props => {
  const HamburgerMenu = props => {
    console.log(props.navigation);
    return (
      <Icon
        color="#fff"
        name="menu"
        onPress={() => props.navigation.toggleDrawer()}
      />
    );
  };

  return (
    <Header
      leftComponent={<HamburgerMenu navigation={props.navigation} />}
      centerComponent={{
        text: props.title,
        style: {color: '#fff', fontWeight: 'bold'},
      }}
      statusBarProps={{barStyle: 'light-content'}}
    />
  );
};

export default MyHeader;
