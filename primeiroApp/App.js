import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch
} from "react-native";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: true
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Switch
          value={this.state.status}
          onValueChange={(valor) => this.setState({ status: valor })}
        />
        <Text>{this.state.status ? 'Ativo' : 'Inativo'}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 15
  }
});