import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import SearchableListByHashtag from '../components/SearchableListByHashtag';

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View style={styles.container}>
          <SearchableListByHashtag /> 
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }
});
