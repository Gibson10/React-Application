import React, { Component } from 'react';
import {
  white,
  ghostWhite,
  primaryColor,
  lightGray,
  primaryColorDark,
} from '../utils/colors';
import { FontAwesome, Entypo } from '@expo/vector-icons';
import { View, StatusBar, Platform, StyleSheet, TextInput } from 'react-native';

class SearchBar extends Component {
  render() {
    return (
      <View
        style={{
          height: Platform.OS == 'ios' ? 80 : 100 + StatusBar.currentHeight,
          backgroundColor: { white },
        }}
      >
        <View style={styles.searchBarContainer}>
          <FontAwesome
            name={this.props.iconName}
            color={primaryColor}
            size={20}
            style={{
              marginRight: 20,
            }}
          />
          <TextInput
            underlineColorAndroid="transparent"
            placeholder={this.props.placeholder}
            placeholderTextColor={lightGray}
            style={styles.textInput}
          />
          <Entypo
            name="map"
            color={primaryColorDark}
            size={20}
            style={{
              marginLeft: 20,
            }}
          />
        </View>
      </View>
    );
  }
}
export default SearchBar;

const styles = StyleSheet.create({
  searchBarContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: { white },
    marginHorizontal: 20,
    marginTop: 20,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: white,
    backgroundColor: ghostWhite,
  },
  textInput: {
    flex: 1,
    fontWeight: '700',
    fontFamily: 'SF Pro Display',
    fontSize: 18,
  },
});
