import React from 'react';
import { Platform, StatusBar, StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';

import RootNavigation from './navigation/RootNavigation'
import initStore from './config/store'

const store = initStore()

export default class App extends React.Component {

    render() {

        return (
            <Provider store={store}>
                <View style={styles.container}>
                    {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
                    {Platform.OS === 'android' && <View style={styles.statusBarUnderlay} />}
                    <RootNavigation />
                </View>
            </Provider>
        );

    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    statusBarUnderlay: {
        height: 24,
        backgroundColor: 'rgba(0,0,0,0.2)',
    },
});