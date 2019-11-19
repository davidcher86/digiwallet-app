import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Button, Input, Icon  } from 'react-native-elements';
import { connect } from 'react-redux';
import firebase from 'firebase';

import * as actions from './transactionsActions';

class FinancialActionList extends Component {
    render() {
        const styles = {
            containerStyle: {
                padding: 20
            }
        };

        return(
            <View style={styles.containerStyle}>
                <Text>{'CreateAccount'}</Text>
            </View>
        );
    }
}

const mapStateToProps = state => {
    return { financialActionsList: state.financialActions };
};

export default connect(mapStateToProps, actions)(FinancialActionList);
