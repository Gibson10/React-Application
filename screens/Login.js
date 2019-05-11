import React, { Component } from 'react';
import {
  facebookAppID,
  googleiOSClientID,
  googleAndroidClientID,
} from '../utils/keys';
import {
  View,
  Text,
  Image,
  TextInput,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import {
  white,
  baliHai,
  echoBlue,
  blackBerry,
  brightBlue,
  textInputBorderColor,
} from '../utils/colors';
import { Font, Asset } from 'expo';
import * as firebase from 'firebase';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

class Login extends Component {
  state = {
    isReady: false,
    emailAddress: '',
    password: '',
    modalVisible: false,
    messageType: '',
    messageHeader: '',
    messageVisible: false,
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
      require('../assets/images/facebook-logo.png'),
      require('../assets/images/google.png'),
    ]);

    this.setState(() => ({
      isReady: true,
    }));
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

  loginWithEmail() {
    try {
      const { emailAddress, password } = this.state;

      // Check that all fields are filled
      if (emailAddress.trim().length < 1) {
        return this.setState(() => ({
          messageVisible: true,
          messageType: 'error',
          messageHeader: 'Your email address is missing',
        }));
      }

      if (password.trim().length < 1) {
        return this.setState(() => ({
          messageVisible: true,
          messageType: 'error',
          messageHeader: 'Your password is missing',
        }));
      }

      this.setState(() => ({ modalVisible: true }));

      firebase
        .auth()
        .signInWithEmailAndPassword(emailAddress.trim(), password.trim())
        .catch(e => {
          this.setState(() => ({ modalVisible: false }));
          this.setState(() => ({
            messageVisible: true,
            messageType: 'error',
            messageHeader: e.message,
          }));
        })
        .then(user =>
          this.setState(() => ({
            modalVisible: false,
          }))
        );
    } catch (e) {
      // Do nothing
    }
  }

  render() {
    return this.state.isReady ? (
      <SafeAreaView style={styles.container}>
        <KeyboardAwareScrollView
          style={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          extraScrollHeight={50}
          scrollEnabled
          enableOnAndroid
        >
          <Text style={styles.loginHeader}>Login Now</Text>
          <Text style={styles.loginSubheader}>
            Please login to continue using Keja.
          </Text>
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.socialLoginText}>Login instantly:</Text>
            <View style={{ flexDirection: 'row', marginBottom: 40 }}>
              <TouchableOpacity
                style={[
                  styles.socialBtn,
                  { alignItems: 'center', marginRight: 12 },
                ]}
                onPress={() => this.facebookLogin()}
              >
                <Image
                  style={{ width: 15, height: 15 }}
                  resizeMode="contain"
                  source={require('../assets/images/facebook-logo.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.socialBtn,
                  { alignItems: 'center', marginLeft: 12 },
                ]}
                onPress={() => this.googleLogin()}
              >
                <Image
                  style={{ width: 15, height: 15 }}
                  resizeMode="contain"
                  source={require('../assets/images/google.png')}
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.socialLoginText}>or login with email</Text>
          </View>
          <Text style={[styles.socialLoginText, { marginBottom: 5 }]}>
            Email Address
          </Text>
          <TextInput
            style={styles.textInput}
            onChangeText={emailAddress =>
              this.setState(() => ({ emailAddress }))
            }
          />
          <Text style={[styles.socialLoginText, { marginBottom: 5 }]}>
            Password
          </Text>
          <TextInput
            style={[styles.textInput, { marginBottom: 15 }]}
            secureTextEntry={true}
            onChangeText={password => this.setState(() => ({ password }))}
          />
          <View style={{ alignItems: 'flex-end' }}>
            <TouchableHighlight
              underlayColor={white}
              onPress={() => this.props.navigation.navigate('ResetPassword')}
            >
              <Text style={styles.forgotPasswordText}>Forgot password?</Text>
            </TouchableHighlight>
          </View>
          <TouchableOpacity
            style={[
              styles.loginBtn,
              { alignItems: 'center', justifyContent: 'center' },
            ]}
            onPress={() => this.loginWithEmail()}
          >
            <Text style={styles.loginBtnText}>Login to my account</Text>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              marginBottom: 30,
              alignSelf: 'flex-end',
            }}
          >
            <Text style={styles.registerTextRegular}>
              Don't have an account?
            </Text>
            <TouchableHighlight
              underlayColor={white}
              onPress={() => this.props.navigation.navigate('Welcome')}
            >
              <Text style={styles.registerTextBold}>Register now</Text>
            </TouchableHighlight>
          </View>
        </KeyboardAwareScrollView>
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
    marginHorizontal: 20,
    marginVertical: 25,
    backgroundColor: white,
  },
  loginHeader: {
    color: echoBlue,
    fontFamily: 'SF Pro Display Bold',
    fontSize: 22,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10,
  },
  loginSubheader: {
    color: baliHai,
    fontFamily: 'SF Pro Display',
    fontSize: 13,
    fontWeight: '400',
    marginBottom: 20,
  },
  socialLoginText: {
    color: baliHai,
    fontFamily: 'SF Pro Display',
    fontSize: 13,
    fontWeight: '400',
    marginBottom: 20,
  },
  socialBtn: {
    borderRadius: 6,
    borderColor: textInputBorderColor,
    borderStyle: 'solid',
    borderWidth: 1,
    backgroundColor: white,
    paddingHorizontal: 30,
    paddingVertical: 13,
    height: 40,
    width: 150,
  },
  textInput: {
    borderRadius: 6,
    borderColor: textInputBorderColor,
    borderStyle: 'solid',
    borderWidth: 1,
    backgroundColor: white,
    height: 40,
    marginBottom: 20,
    color: blackBerry,
    fontFamily: 'SF Pro Display',
    fontSize: 13,
    fontWeight: '400',
    paddingHorizontal: 8,
  },
  forgotPasswordText: {
    color: brightBlue,
    fontFamily: 'SF Pro Display',
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 18,
    marginBottom: 30,
  },
  loginBtn: {
    height: 40,
    borderRadius: 6,
    backgroundColor: brightBlue,
    marginBottom: 20,
  },
  loginBtnText: {
    color: white,
    fontFamily: 'SF Pro Display Bold',
    fontSize: 12,
    fontWeight: '700',
  },
  registerTextRegular: {
    color: baliHai,
    fontFamily: 'SF Pro Display',
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 14,
  },
  registerTextBold: {
    color: brightBlue,
    fontFamily: 'SF Pro Display Bold',
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 14,
    marginLeft: 5,
  },
});

export default Login;
