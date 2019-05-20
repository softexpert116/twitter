import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createMaterialTopTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import SearchScreenByUser from '../screens/SearchScreenByUser';
import SearchScreenByHashtag from '../screens/SearchScreenByHashtag';

const UserStack = createStackNavigator({
  User: SearchScreenByUser,
});

UserStack.navigationOptions = {
  tabBarLabel: 'User',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

const HashtagStack = createStackNavigator({
  Hashtag: SearchScreenByHashtag,
});

HashtagStack.navigationOptions = {
  tabBarLabel: 'Hashtag',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
    />
  ),
};

export default createMaterialTopTabNavigator({
  UserStack,
  HashtagStack,
});
