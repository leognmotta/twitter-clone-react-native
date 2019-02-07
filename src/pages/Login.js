import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Text,
  AsyncStorage,
  Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

class Login extends Component {
  state = {
    username: ''
  };

  async componentDidMount() {
    const username = await AsyncStorage.getItem('@omniStack:username');

    if (username) {
      this.props.navigation.navigate('App');
    }
  }

  loginHandler = async () => {
    const { username } = this.state;

    if (!username.length) return;

    await AsyncStorage.setItem('@omniStack:username', username);

    this.props.navigation.navigate('Timeline');
  };

  inputChangedHandler = username => {
    this.setState({ username: username });
  };

  render() {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        style={styles.container}
      >
        <View style={styles.content}>
          <View>
            <Icon name="twitter" size={64} color="#4BB0EE" />
          </View>

          <TextInput
            style={styles.input}
            placeholder="User name"
            value={this.state.username}
            onChangeText={this.inputChangedHandler}
            onSubmitEditing={this.loginHandler}
            returnKeyType="send"
          />

          <TouchableOpacity onPress={this.loginHandler} style={styles.button}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF'
  },

  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30
  },

  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 5,
    height: 44,
    paddingHorizontal: 15,
    alignSelf: 'stretch',
    marginTop: 30
  },

  button: {
    height: 44,
    alignSelf: 'stretch',
    marginTop: 10,
    backgroundColor: '#4BB0EE',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold'
  }
});

export default Login;
