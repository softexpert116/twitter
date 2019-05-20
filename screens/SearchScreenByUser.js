import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import SearchableListByUser from '../components/SearchableListByUser';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View style={styles.container}>
          <SearchableListByUser /> 
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 1,
  },
});
