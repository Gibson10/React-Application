import React, { Component } from 'react';
import { EvilIcons } from '@expo/vector-icons';
import { white, primaryColor } from '../utils/colors';
import { View, Text, Image, StyleSheet } from 'react-native';

class ListingCard extends Component {
  render() {
    return (
      <View
        style={[
          styles.parentView,
          {
            borderWidth: this.props.isBordered ? 1 : 0,
            borderColor: this.props.isBordered ? primaryColor : white,
          },
        ]}
      >
        <View style={{ flex: 2 }}>
          <Image source={this.props.imageUri} style={styles.listingImage} />
        </View>
        <View style={styles.listingTextContainer}>
          <Text style={styles.listingText}>
            {this.props.price} . {this.props.houseType} .{' '}
            {this.props.contractMode}
          </Text>
          <View style={styles.listingBodyContainer}>
            <EvilIcons name="location" size={15} color={primaryColor} />
            <Text
              style={{
                fontFamily: 'SF Pro Display',
                fontSize: 10,
              }}
            >
              {this.props.location}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  parentView: {
    height: 200,
    width: 220,
    marginLeft: 20,
    shadowColor: 'rgba(29, 29, 29, 0.1)',
    shadowOffset: { width: 2, height: 0 },
    shadowRadius: 6,
    borderRadius: 8,
    elevation: 1,
    backgroundColor: white,
  },
  listingImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
  },
  listingTextContainer: {
    flex: 1,
    paddingLeft: 10,
    justifyContent: 'center',
  },
  listingText: {
    fontFamily: 'SF Pro Display Bold',
    fontSize: 14,
    paddingTop: 5,
  },
  listingBodyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 5,
  },
});

export default ListingCard;
