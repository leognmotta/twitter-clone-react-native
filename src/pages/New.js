import React, { Component } from 'react';
import api from '../services/api';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  AsyncStorage
} from 'react-native';

class Tweet extends Component {
  state = {
    newTweet: ''
  };

  static navigationOptions = {
    header: null
  };

  goBack = () => {
    this.props.navigation.pop();
  };

  tweetHandler = async () => {
    const content = this.state.newTweet;
    const author = await AsyncStorage.getItem('@omniStack:username');

    await api.post('/tweets', { author, content });

    this.goBack();
  };

  inputChangedHandler = newTweet => {
    this.setState({ newTweet: newTweet });
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={this.goBack}>
            <Icon name="close" size={24} color="#999" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={this.tweetHandler}>
            <Text style={styles.buttonText}>Tweet!</Text>
          </TouchableOpacity>
        </View>

        <TextInput
          style={styles.input}
          multiline
          placeholder="Is there anything you want to say?"
          placeholderTextColor="#999"
          value={this.state.newTweet}
          onChangeText={this.inputChangedHandler}
          returnKeyType="send"
          onSubmitEditing={this.tweetHandler}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF'
  },

  header: {
    paddingTop: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  button: {
    height: 32,
    paddingHorizontal: 20,
    borderRadius: 16,
    backgroundColor: '#4BB0EE',
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold'
  },

  input: {
    margin: 20,
    fontSize: 16,
    color: '#333'
  }
});

export default Tweet;
