import React, { Component } from 'react';
import {
  Text,
  Easing,
  Animated,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Font, AppLoading } from 'expo';
import { transparent } from '../utils/colors';
import { Ionicons } from '@expo/vector-icons';
import { errorRed, successGreen } from '../utils/colors';

class Message extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fontLoaded: false,
      positionValue: new Animated.Value(170),
    };

    this.closeMessage = this.closeMessage.bind(this);
  }

  async componentDidMount() {
    await Font.loadAsync({
      'SF Pro Display': require('../assets/fonts/SF-Pro-Text-Regular.ttf'),
      'SF Pro Display Bold': require('../assets/fonts/SF-Pro-Display-Bold.ttf'),
    });

    this.setState(() => ({
      fontLoaded: true,
    }));
  }

  animateMessage(value) {
    const { positionValue } = this.state;
    Animated.timing(positionValue, {
      toValue: value,
      duration: 450,
      velocity: 3,
      tension: 2,
      friction: 8,
      easing: Easing.easeOutBack,
      useNativeDriver: true,
    }).start();
  }

  closeMessage() {
    this.props.handleCloseMessage();
  }

  render() {
    const { messageType, messageHeader, showMessage } = this.props;
    const { positionValue } = this.state;
    showMessage ? this.animateMessage(0) : this.animateMessage(170);
    return this.state.fontLoaded ? (
      <Animated.View
        style={[
          { transform: [{ translateY: positionValue }] },
          [
            styles.container,
            { borderColor: messageType === 'error' ? errorRed : successGreen },
          ],
        ]}
      >
        <Text
          style={[
            styles.messageType,
            { color: messageType === 'error' ? errorRed : successGreen },
          ]}
        >
          {messageType === 'error' ? 'Error!' : 'Great!'}
        </Text>
        <Text style={styles.messageText}>{messageHeader}</Text>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={this.closeMessage}
        >
          <Ionicons
            name="md-close"
            size={24}
            color={messageType === 'error' ? errorRed : successGreen}
          />
        </TouchableOpacity>
      </Animated.View>
    ) : (
      <AppLoading />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: 'center',
    width: '100%',
    flexWrap: 'wrap',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderStyle: 'solid',
  },
  messageType: {
    position: 'absolute',
    top: -20,
    left: 10,
    backgroundColor: transparent,
    paddingHorizontal: 4,
    marginRight: 5,
    marginBottom: 2,
    fontSize: 14,
    fontFamily: 'SF Pro Display Bold',
  },
  messageText: {
    marginBottom: 2,
    fontSize: 10.5,
    fontFamily: 'SF Pro Display',
    flexWrap: 'wrap',
  },
  closeButton: {
    position: 'absolute',
    paddingHorizontal: 4,
    right: 10,
    top: -13,
  },
});

export default Message;
