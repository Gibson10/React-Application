import React, { Component } from 'react';
import { white } from '../utils/colors';
import { View, Text, Image, StyleSheet } from 'react-native';

class Category extends Component {
  render() {
    return (
      <View style={styles.parentContainer}>
        <View style={{ flex: 2 }}>
          <Image source={this.props.imageUri} style={styles.image} />
        </View>
        <View style={styles.categoryTextContainer}>
          <Text style={styles.categoryText}>{this.props.name}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  parentContainer: {
    height: 130,
    width: 130,
    marginLeft: 20,
    shadowColor: 'rgba(29, 29, 29, 0.1)',
    shadowOffset: { width: 2, height: 0 },
    shadowRadius: 6,
    borderRadius: 130 / 2,
    elevation: 1,
    backgroundColor: white,
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'contain',
  },
  categoryTextContainer: {
    flex: 1,
    paddingBottom: 5,
    justifyContent: 'center',
  },
  categoryText: {
    fontFamily: 'SF Pro Display Bold',
    fontSize: 12,
    alignSelf: 'center',
  },
});

export default Category;
