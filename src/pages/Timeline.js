import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList
} from 'react-native';
import api from '../services/api';

import Icon from 'react-native-vector-icons/MaterialIcons';

import Tweet from '../components/Tweet';

class timeline extends Component {
  state = {
    tweets: []
  };

  static navigationOptions = ({ navigation }) => ({
    title: 'Inicio',
    headerRight: (
      <TouchableOpacity onPress={() => navigation.navigate('New')}>
        <Icon
          style={{ marginRight: 10 }}
          name="add-circle-outline"
          size={24}
          color="#4BB0EE"
        />
      </TouchableOpacity>
    )
  });

  async componentDidMount() {
    const tweets = await api.get('/tweets');

    this.setState({ tweets: tweets.data });
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.tweets}
          keyExtractor={tweet => tweet._id}
          renderItem={({ item }) => <Tweet tweet={item} />}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF'
  }
});

export default timeline;
