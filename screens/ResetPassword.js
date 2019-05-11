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
  eclipse,
  baliHai,
  brightBlue,
  blackBerry,
  textInputBorderColor,
} from '../utils/colors';
import { Font } from 'expo';
import Loader from '../components/Loader';
import Message from '../components/Message';
import * as firebase from 'firebase';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

class ResetPassword extends Component {
  state = {
    fontLoaded: false,
    emailAddress: '',
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
      emailAddress: '',
    }));
  }

  resetAccountPassword() {
    try {
      const { emailAddress } = this.state;

      if (emailAddress.trim().length < 1) {
        return this.setState(() => ({
          messageVisible: true,
          messageType: 'error',
          messageHeader: 'Your email address is missing',
        }));
      }

      this.setState(() => ({ modalVisible: true }));

      firebase
        .auth()
        .sendPasswordResetEmail(emailAddress.trim())
        .catch(e => {
          this.setState(() => ({ modalVisible: false }));
          this.setState(() => ({
            messageVisible: true,
            messageType: 'error',
            messageHeader: e.message,
          }));
        })
        .then(user => {
          this.setState(() => ({ modalVisible: false }));
        });
    } catch (e) {
      // Do nothing
    }
  }

  render() {
    return this.state.fontLoaded ? (
      <SafeAreaView style={styles.container}>
        <KeyboardAwareScrollView
          extraScrollHeight={50}
          showsVerticalScrollIndicator={false}
          scrollEnabled
          enableOnAndroid
        >
          <Text style={styles.resetText}>Let's get you back on track</Text>
          <View style={styles.bottomViewContainer}>
            <Text style={styles.emailAddressText}>Email Address</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={emailAddress =>
                this.setState(() => ({ emailAddress }))
              }
            />
            <TouchableOpacity
              style={styles.resetBtn}
              onPress={() => this.resetAccountPassword()}
            >
              <Text style={styles.resetBtnText}>Reset my account password</Text>
            </TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                marginBottom: 15,
                alignSelf: 'flex-end',
              }}
            >
              <Text style={styles.resetTextRegular}>
                Remember your password?
              </Text>
              <TouchableHighlight
                underlayColor={white}
                onPress={() => this.props.navigation.navigate('Login')}
              >
                <Text style={styles.resetTextBold}>Login now</Text>
              </TouchableHighlight>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginBottom: 30,
                alignSelf: 'flex-end',
              }}
            >
              <TouchableHighlight
                underlayColor={white}
                onPress={() => this.props.navigation.navigate('Welcome')}
              >
                <Text style={styles.resetTextBold}>Register a new account</Text>
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
    backgroundColor: white,
    marginVertical: 25,
    marginHorizontal: 20,
  },
  resetText: {
    marginTop: 20,
    alignSelf: 'flex-start',
    marginBottom: 60,
    color: eclipse,
    fontFamily: 'SF Pro Display Bold',
    fontSize: 20,
    fontWeight: '700',
  },
  emailAddressText: {
    color: baliHai,
    color: baliHai,
    fontFamily: 'SF Pro Display',
    fontSize: 13,
    fontWeight: '400',
    marginTop: 25,
    marginBottom: 5,
    fontFamily: 'SF Pro Display',
    fontSize: 13,
    fontWeight: '400',
    marginTop: 40,
    marginBottom: 5,
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
  bottomViewContainer: {
    flex: 1,
    alignSelf: 'stretch',
  },
  resetBtn: {
    height: 40,
    borderRadius: 6,
    backgroundColor: brightBlue,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resetBtnText: {
    color: white,
    fontFamily: 'SF Pro Display Bold',
    fontSize: 12,
    fontWeight: '700',
  },
  resetTextRegular: {
    color: baliHai,
    fontFamily: 'SF Pro Display',
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 14,
  },
  resetTextBold: {
    color: brightBlue,
    fontFamily: 'SF Pro Display Bold',
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 14,
    marginLeft: 5,
  },
});

export default ResetPassword;
