import React, {Component} from 'react';
import {Header, Icon} from 'react-native-elements';
import { DARK_MODE } from './../Styles';

// const MyHeader = props => {
class MyHeader extends Component {
  render() {
    const HamburgerMenu = props => {
      return (
        <Icon
          color="#fff"
          name="menu"
          onPress={() => props.navigation.dispatch(props.navigation.actions.openDrawer())}
        />
      );
    };
    console.log(this.props);
    return (
      <Header
        leftComponent={<HamburgerMenu navigation={props.navigation} />}
        backgroundColor={DARK_MODE.COLORS.HEADER_COLOR}
        containerStyle={{height: 60, paddingBottom: 25}}
        headerTitle={this.props.navigation}
        centerComponent={{
          text: props.title,
          style: {color: '#fff', fontWeight: 'bold'},
        }}
        // barStyle="dark-content"
        statusBarProps={{barStyle: 'dark-content'}}
      />
    );
    }
};

const mapStateToProps = state => {
  return {
      profile: state.profile,
      identity: state.identity,
   };
};

export default connect(mapStateToProps, actions)(MyHeader);

export default MyHeader;
