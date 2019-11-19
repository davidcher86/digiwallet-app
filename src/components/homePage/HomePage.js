/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Button, Input, Icon  } from 'react-native-elements';
import { connect } from 'react-redux';
import firebase from 'firebase';

import * as actions from './homePageActions';

class HomePage extends Component {
    render() {
        const styles = {
            containerStyle: {
                padding: 20
            }
        };

        return(
            <View style={styles.containerStyle}>
                <Text>{'HomePage'}</Text>
            </View>
        );
    }
}

const mapStateToProps = state => {
    return { homePage: state.homePage };
};

export default connect(mapStateToProps, actions)(HomePage);
