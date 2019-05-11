import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import {
  white,
  baliHai,
  echoBlue,
  brightBlue,
  blackBerry,
  textInputBorderColor,
} from '../utils/colors';
import { Font } from 'expo';
import * as firebase from 'firebase';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

class EmailRegister extends Component {
  state = {
    fontLoaded: false,
    emailAddress: '',
    password: '',
    confirmedPassword: '',
    modalVisible: false,
    messageVisible: false,
    messageType: '',
    messageHeader: '',
  };

  async componentDidMount() {
    await Font.loadAsync({
      'SF Pro Display': require('../assets/fonts/SF-Pro-Text-Regular.ttf'),
      'SF Pro Display Bold': require('../assets/fonts/SF-Pro-Display-Bold.ttf'),
    });

    this.setState(() => ({
      fontLoaded: true,
    }));
  }

  signupWithEmail() {
    try {
      const { emailAddress, password, confirmedPassword } = this.state;

      // Check that all fields are filled
      if (emailAddress.trim().length < 1) {
        return this.setState(() => ({
          messageVisible: true,
          messageType: 'error',
          messageHeader: 'Your email address is missing',
        }));
      } else if (password.trim().length < 1) {
        return this.setState(() => ({
          messageVisible: true,
          messageType: 'error',
          messageHeader: 'Your password is missing',
        }));
      } else if (confirmedPassword.trim().length < 1) {
        return this.setState(() => ({
          messageVisible: true,
          messageType: 'error',
          messageHeader: 'You have not confirmed your password',
        }));
      }

      // Check if password is strong enough (Equal to or greater than 6 chars)
      if (password.length < 6) {
        return this.setState(() => ({
          messageVisible: true,
          messageType: 'error',
          messageHeader: 'Please strengthen your password',
        }));
      }

      // Check if password === confirmedPassword
      if (password !== confirmedPassword) {
        return this.setState(() => ({
          messageVisible: true,
          messageType: 'error',
          messageHeader: 'Passwords do not match',
        }));
      }

      this.setState(() => ({ modalVisible: true }));

      firebase
        .auth()
        .createUserWithEmailAndPassword(emailAddress.trim(), password.trim())
        .then(user =>
          this.setState(() => ({
            modalVisible: false,
          }))
        )
        .catch(e => {
          this.setState(() => ({ modalVisible: false }));
          this.setState(() => ({
            messageVisible: true,
            messageType: 'error',
            messageHeader: e.message,
          }));
        });
    } catch (e) {
      // Do nothing
    }
  }

  render() {
    return this.state.fontLoaded ? (
      <SafeAreaView style={styles.container}>
        <KeyboardAwareScrollView
          style={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          extraScrollHeight={50}
          scrollEnabled
          enableOnAndroid
        >
          <View>
            <Text style={styles.EmailRegisterHeader}>Register</Text>
            <Text style={styles.EmailRegisterSubheader}>
              Please register to start using Keja.
            </Text>
            <Text style={[styles.socialEmailRegisterText, { marginBottom: 5 }]}>
              Email Address
            </Text>
            <TextInput
              style={styles.textInput}
              onChangeText={emailAddress =>
                this.setState(() => ({ emailAddress }))
              }
            />
            <Text style={[styles.socialEmailRegisterText, { marginBottom: 5 }]}>
              Password
            </Text>
            <TextInput
              secureTextEntry={true}
              style={styles.textInput}
              onChangeText={password => this.setState(() => ({ password }))}
            />
            <Text style={[styles.socialEmailRegisterText, { marginBottom: 5 }]}>
              Confirm Password
            </Text>
            <TextInput
              secureTextEntry={true}
              style={[styles.textInput, { marginBottom: 15 }]}
              onChangeText={confirmedPassword =>
                this.setState(() => ({ confirmedPassword }))
              }
            />
            <TouchableOpacity
              style={[
                styles.EmailRegisterBtn,
                { alignItems: 'center', justifyContent: 'center' },
              ]}
              onPress={() => this.signupWithEmail()}
            >
              <Text style={styles.EmailRegisterBtnText}>
                Register my account
              </Text>
            </TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                marginBottom: 30,
                alignSelf: 'flex-end',
              }}
            >
              <Text style={styles.registerTextRegular}>
                Already have an account?
              </Text>
              <TouchableHighlight
                underlayColor={white}
                onPress={() => this.props.navigation.navigate('Login')}
              >
                <Text style={styles.registerTextBold}>Login now</Text>
              </TouchableHighlight>
            </View>
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
    marginVertical: 25,
    marginHorizontal: 20,
    backgroundColor: white,
  },
  EmailRegisterHeader: {
    color: echoBlue,
    fontFamily: 'SF Pro Display Bold',
    fontSize: 22,
    fontWeight: '600',
    marginTop: 30,
    marginBottom: 10,
  },
  EmailRegisterSubheader: {
    color: baliHai,
    fontFamily: 'SF Pro Display',
    fontSize: 13,
    fontWeight: '400',
    marginBottom: 40,
  },
  textInput: {
    borderRadius: 6,
    borderColor: textInputBorderColor,
    borderStyle: 'solid',
    borderWidth: 1,
    backgroundColor: white,
    height: 40,
    marginBottom: 30,
    color: blackBerry,
    fontFamily: 'SF Pro Display',
    fontSize: 13,
    fontWeight: '400',
    paddingHorizontal: 8,
  },
  EmailRegisterBtn: {
    height: 40,
    borderRadius: 6,
    backgroundColor: brightBlue,
    marginBottom: 20,
  },
  EmailRegisterBtnText: {
    color: white,
    fontFamily: 'SF Pro Display Bold',
    fontSize: 12,
    fontWeight: '700',
  },
  socialEmailRegisterText: {
    color: baliHai,
    fontFamily: 'SF Pro Display',
    fontSize: 13,
    fontWeight: '400',
    marginBottom: 20,
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

export default EmailRegister;
