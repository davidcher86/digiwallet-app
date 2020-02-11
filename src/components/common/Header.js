import React, {Component} from 'react';
import {Header, Icon} from 'react-native-elements';
import {DARK_MODE} from './../Styles';

const MyHeader = props => {
  console.log(this.props);
  const HamburgerMenu = props => {
    return (
      <Icon
        color="#fff"
        name="menu"
        onPress={() => props.navigation.dispatch(props.navigation.actions.openDrawer())}
      />
    );
  };

  return (
    <Header
      leftComponent={<HamburgerMenu navigation={props.navigation} />}
      backgroundColor={DARK_MODE.COLORS.HEADER_COLOR}
      containerStyle={{height: 60, paddingBottom: 25}}
      centerComponent={{
        text: props.title,
        style: {color: '#fff', fontWeight: 'bold'},
      }}
      // barStyle="dark-content"
      statusBarProps={{barStyle: 'dark-content'}}
    />
  );
};

export default MyHeader;
