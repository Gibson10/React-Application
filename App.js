import React from 'react';
import * as firebase from 'firebase';
import {
  config
} from './utils/keys';
import AppContainer from './components/AppNavigator';

firebase.initializeApp(config);

class App extends React.Component {
  render() {
    return <AppContainer / > ;
  }
}

export default App;