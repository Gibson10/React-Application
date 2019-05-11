import React from 'react';
import {
  createAppContainer,
  createSwitchNavigator,
  createBottomTabNavigator,
} from 'react-navigation';
import Login from '../screens/Login';
import Saved from '../screens/Saved';
import Alert from '../screens/Alert';
import {
  Platform
} from 'react-native';
import Welcome from '../screens/Welcome';
import Profile from '../screens/Profile';
import Explore from '../screens/Explore';
import Listings from '../screens/Listings';
import {
  AntDesign
} from '@expo/vector-icons';
import EmailRegister from '../screens/EmailRegister';
import ResetPassword from '../screens/ResetPassword';
import {
  white,
  primaryColor
} from '../utils/colors';

const BottomTabNavigator = createBottomTabNavigator({
  Explore: {
    screen: Explore,
    navigationOptions: {
      tabBarLabel: 'Explore',
      tabBarIcon: ({
        tintColor
      }) => ( <
        AntDesign name = "search1"
        size = {
          16
        }
        color = {
          tintColor
        }
        />
      ),
    },
  },
  Listings: {
    screen: Listings,
    navigationOptions: {
      tabBarLabel: 'Listings',
      tabBarIcon: ({
        tintColor
      }) => ( <
        AntDesign name = "home"
        size = {
          16
        }
        color = {
          tintColor
        }
        />
      ),
    },
  },
  Saved: {
    screen: Saved,
    navigationOptions: {
      tabBarLabel: 'Pinned',
      tabBarIcon: ({
        tintColor
      }) => ( <
        AntDesign name = "pushpino"
        size = {
          16
        }
        color = {
          tintColor
        }
        />
      ),
    },
  },
  Alert: {
    screen: Alert,
    navigationOptions: {
      tabBarLabel: 'Alerts',
      tabBarIcon: ({
        tintColor
      }) => ( <
        AntDesign name = "bells"
        size = {
          16
        }
        color = {
          tintColor
        }
        />
      ),
    },
  },
  Profile: {
    screen: Profile,
    navigationOptions: {
      tabBarLabel: 'Profile',
      tabBarIcon: ({
        tintColor
      }) => ( <
        AntDesign name = "profile"
        size = {
          16
        }
        color = {
          tintColor
        }
        />
      ),
    },
  },
}, {
  initialRouteName: 'Explore',
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? primaryColor : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? white : primaryColor,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOpacity: 1,
      shadowRadius: 6,
      shadowOffset: {
        width: 0,
        height: 3
      },
      elevation: 5,
    },
    labelStyle: {
      fontSize: 10,
      marginBottom: 8,
      fontWeight: '700',
    },
  },
});

const AppSwitchNavigator = createSwitchNavigator({
  BottomTabNavigator,
});

export default createAppContainer(AppSwitchNavigator);