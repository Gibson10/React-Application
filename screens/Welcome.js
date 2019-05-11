import React, { Component } from 'react';
import {
  facebookAppID,
  googleiOSClientID,
  googleAndroidClientID,
} from '../utils/keys';
import {
  white,
  eclipse,
  baliHai,
  aliceBlue,
  persianBlue,
} from '../utils/colors';
import { Font, Asset } from 'expo';
import * as firebase from 'firebase';
import Loader from '../components/Loader';
import Message from '../components/Message';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';

class Welcome extends Component {
  state = {
    isReady: false,
    modalVisible: false,
    messageVisible: false,
    messageType: '',
    messageHeader: '',
  };

  cacheImages(images) {
    return images.map(image => {
      return Asset.fromModule(image).downloadAsync();
    });
  }

  async componentDidMount() {
    await Font.loadAsync({
      'SF Pro Display': require('../assets/fonts/SF-Pro-Text-Regular.ttf'),
      'SF Pro Display Bold': require('../assets/fonts/SF-Pro-Display-Bold.ttf'),
    });

    await this.cacheImages([
      require('../assets/images/welcome-img.png'),
      require('../assets/images/facebook-logo.png'),
      require('../assets/images/google.png'),
    ]);

    this.setState(() => ({
      isReady: true,
    }));

    firebase.auth().onAuthStateChanged(user => {
      if (user != null) {
        console.log(user);
      }
    });
  }

  async facebookLogin() {
    try {
      const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
        facebookAppID,
        { permissions: ['public_profile'] }
      );
      if (type === 'success') {
        const credential = firebase.auth.FacebookAuthProvider.credential(token);

        this.setState(() => ({ modalVisible: true }));

        firebase
          .auth()
          .signInAndRetrieveDataWithCredential(credential)
          .catch(e => {
            this.setState(() => ({ modalVisible: false }));
            this.setState(() => ({
              messageVisible: true,
              messageType: 'error',
              messageHeader: e.message,
            }));
          })
          .then(user => this.setState(() => ({ modalVisible: false })));
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      // Do nothing
    }
  }

  async googleLogin() {
    try {
      const { idToken, accessToken, type } = await Expo.Google.logInAsync({
        androidClientId: googleAndroidClientID,
        iosClientId: googleiOSClientID,
        scopes: ['profile', 'email'],
      });

      if (type === 'success') {
        const credential = firebase.auth.GoogleAuthProvider.credential(
          idToken,
          accessToken
        );

        this.setState(() => ({ modalVisible: true }));

        firebase
          .auth()
          .signInAndRetrieveDataWithCredential(credential)
          .catch(e => {
            this.setState(() => ({ modalVisible: false }));
            this.setState(() => ({
              messageVisible: true,
              messageType: 'error',
              messageHeader: e.message,
            }));
          })
          .then(user => this.setState(() => ({ modalVisible: false })));
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      // Do nothing
    }
  }

  render() {
    return this.state.isReady ? (
      <SafeAreaView style={styles.container}>
        <Text style={styles.welcomeText}>Get started now</Text>
        <Image
          style={{ flex: 1 }}
          resizeMode="contain"
          source={require('../assets/images/welcome-img.png')}
        />
        <TouchableOpacity
          onPress={() => this.facebookLogin()}
          style={[styles.socialBtn, { marginTop: 35 }]}
        >
          <View style={styles.buttonView}>
            <Image
              style={{ width: 8, height: 14 }}
              resizeMode="contain"
              source={require('../assets/images/facebook-logo.png')}
            />
            <Text style={styles.socialBtnText}>Continue with Facebook</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.googleLogin()}
          style={[styles.socialBtn, { marginTop: 20, marginBottom: 40 }]}
        >
          <View style={styles.buttonView}>
            <Image
              style={{ width: 12, height: 20 }}
              resizeMode="contain"
              source={require('../assets/images/google.png')}
            />
            <Text style={styles.socialBtnText}>Continue with Google</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.socialBtn,
            {
              marginBottom: 20,
              backgroundColor: persianBlue,
              alignItems: 'center',
              justifyContent: 'center',
            },
          ]}
          onPress={() => this.props.navigation.navigate('EmailRegister')}
        >
          <Text style={[styles.socialBtnText, { color: white }]}>
            Signup with Email
          </Text>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.existingUserText}>Existing User?</Text>
          <TouchableHighlight
            underlayColor={white}
            onPress={() => this.props.navigation.navigate('Login')}
          >
            <Text style={styles.loginText}>Login now</Text>
          </TouchableHighlight>
        </View>
        <Loader modalVisible={this.state.modalVisible} animationType="fade" />
        <Message
          messageType={this.state.messageType}
          messageHeader={this.state.messageHeader}
          showMessage={this.state.messageVisible}
          handleCloseMessage={() => {
            this.setState(() => ({ messageVisible: false }));
          }}
        />
      </SafeAreaView>
    ) : (
      <Loader modalVisible={true} animationType="fade" />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    alignItems: 'center',
    marginVertical: 20,
  },
  welcomeText: {
    marginTop: 25,
    marginBottom: 35,
    color: eclipse,
    fontFamily: 'SF Pro Display Bold',
    fontSize: 20,
    fontWeight: '700',
  },
  buttonView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialBtn: {
    borderRadius: 20,
    backgroundColor: aliceBlue,
    paddingHorizontal: 30,
    paddingVertical: 13,
    height: 40,
    width: 250,
  },
  socialBtnText: {
    fontFamily: 'SF Pro Display',
    fontSize: 12,
    color: eclipse,
    marginLeft: 6,
  },
  existingUserText: {
    color: baliHai,
    fontFamily: 'SF Pro Display',
    fontSize: 12,
    fontWeight: '400',
    marginRight: 6,
    opacity: 0.7,
    marginBottom: 20,
  },
  loginText: {
    color: baliHai,
    fontFamily: 'SF Pro Display Bold',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 20,
  },
});

export default Welcome;
