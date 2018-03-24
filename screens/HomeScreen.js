import React from 'react';
import { Text, View, Button } from 'react-native';

import { MonoText } from '../components/StyledText';
import {connect} from "react-redux";
import { incrementCounter, clearCounter } from "../api/counter.reducer";

class HomeScreen extends React.Component {

    constructor() {
        super()
        this.onTimer = this.onTimer.bind(this)
    }

  static navigationOptions = {
      title: 'Home',
  };

  componentDidMount() {
    this.timer = setInterval(this.onTimer, 1000)
  }

  onTimer() {
      this.props.incrementCounter(this.props.count)
  }

  componentWillUnmount() {
    if (this.timer) {
        clearInterval(this.timer)
        this.timer = null
    }
  }

  render() {
    const { count, clearCounter } = this.props
    return (
      <View style={{backgroundColor: 'grey', flex: 1}}>
        <Text>Home Screen</Text>
        <Text>Count: {count}</Text>
          <Button onPress={clearCounter} title="Clear Counter"
              color="#841584" accessibilityLabel="Press to clear the counter" />
      </View>
    );
  }

}

const mapStateToProps = storeState => ({
    count: storeState.counter.count
});

const mapDispatchToProps = { incrementCounter, clearCounter };

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
