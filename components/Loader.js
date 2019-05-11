import React, { Component } from 'react';
import { View, Modal, StyleSheet, ActivityIndicator } from 'react-native';
import { white, loaderBackgroundColor } from '../utils/colors';

class Loader extends Component {
  render() {
    const { animationType, modalVisible } = this.props;
    return (
      <Modal
        transparent={true}
        animationType={animationType}
        visible={modalVisible}
        onRequestClose={() => {
          console.info('loading modal closed');
        }}
      >
        <View style={styles.modalBackground}>
          <View style={styles.activityIndicatorWrapper}>
            <ActivityIndicator animating={modalVisible} />
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: loaderBackgroundColor,
  },
  activityIndicatorWrapper: {
    backgroundColor: white,
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

export default Loader;
