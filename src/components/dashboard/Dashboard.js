import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Button, Input, Icon  } from 'react-native-elements';
import { connect } from 'react-redux';
import firebase from 'firebase';

import * as actions from './dashboardActions';

class Dashboard extends Component {
    render() {
        const styles = {
            containerStyle: {
                padding: 20
            }
        };

        return(
            <View style={styles.containerStyle}>
                <Text>{'dashboard'}</Text>
            </View>
        );
    }
}

const mapStateToProps = state => {
    return { dashboard: state.dashboard };
};

export default connect(mapStateToProps, actions)(Dashboard);
