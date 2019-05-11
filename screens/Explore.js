import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { Font } from 'expo';
import Loader from '../components/Loader';
import Category from '../components/Category';
import { AntDesign } from '@expo/vector-icons';
import SearchBar from '../components/SearchBar';
import ListingCard from '../components/ListingCard';
import { primaryColor, lightGray, ghostGray } from '../utils/colors';

class Explore extends Component {
  state = {
    isReady: false,
  };

  async componentDidMount() {
    await Font.loadAsync({
      'SF Pro Display': require('../assets/fonts/SF-Pro-Text-Regular.ttf'),
      'SF Pro Display Bold': require('../assets/fonts/SF-Pro-Display-Bold.ttf'),
    });

    this.setState(() => ({
      isReady: true,
    }));
  }

  render() {
    return this.state.isReady ? (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <SearchBar
            iconName={'location-arrow'}
            placeholder={'Try "Nairobi"'}
          />
          <ScrollView scrollEventThrottle={16}>
            <View style={styles.exploreContainer}>
              <Text style={styles.headerText}>Discover</Text>
              <View style={styles.categoryContainer}>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                >
                  <Category
                    imageUri={require('../assets/images/welcome-img.png')}
                    name="Apartment"
                  />
                  <Category
                    imageUri={require('../assets/images/welcome-img.png')}
                    name="Single house"
                  />
                  <Category
                    imageUri={require('../assets/images/welcome-img.png')}
                    name="Duplex"
                  />
                  <Category
                    imageUri={require('../assets/images/welcome-img.png')}
                    name="Town house"
                  />
                  <Category
                    imageUri={require('../assets/images/welcome-img.png')}
                    name="Condo"
                  />
                  <Category
                    imageUri={require('../assets/images/welcome-img.png')}
                    name="Hostel"
                  />
                </ScrollView>
              </View>
              <View style={styles.headerTextContainer}>
                <Text style={styles.headerText}>Popular</Text>
                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                  <Text style={styles.viewAllText}>View all</Text>
                </View>
              </View>
              <View style={styles.listingGroupView}>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                >
                  <ListingCard
                    imageUri={require('../assets/images/welcome-img.png')}
                    price="$3000"
                    houseType="Apartment"
                    contractMode="Sale"
                    location="Kahawa West, Nairobi, Kenya"
                  />
                  <ListingCard
                    imageUri={require('../assets/images/welcome-img.png')}
                    price="$3000"
                    houseType="Single house"
                    contractMode="Sale"
                    location="Kahawa West, Nairobi, Kenya"
                  />
                  <ListingCard
                    imageUri={require('../assets/images/welcome-img.png')}
                    price="$3000"
                    houseType="Duplex"
                    contractMode="Sale"
                    location="Kahawa West, Nairobi, Kenya"
                  />
                  <ListingCard
                    imageUri={require('../assets/images/welcome-img.png')}
                    price="$3000"
                    houseType="Town house"
                    contractMode="Sale"
                    location="Kahawa West, Nairobi, Kenya"
                  />
                  <ListingCard
                    imageUri={require('../assets/images/welcome-img.png')}
                    price="$3000"
                    houseType="Condo"
                    contractMode="Sale"
                    location="Kahawa West, Nairobi, Kenya"
                  />
                  <ListingCard
                    imageUri={require('../assets/images/welcome-img.png')}
                    price="$3000"
                    houseType="Hostel"
                    contractMode="Sale"
                    location="Kahawa West, Nairobi, Kenya"
                  />
                </ScrollView>
              </View>
              <View style={{ marginTop: 40, flexDirection: 'row', flex: 1 }}>
                <Text style={styles.headerText}>New</Text>
                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                  <Text style={styles.viewAllText}>View all</Text>
                </View>
              </View>
              <View style={styles.listingGroupView}>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                >
                  <ListingCard
                    imageUri={require('../assets/images/welcome-img.png')}
                    price="$3000"
                    houseType="Apartment"
                    contractMode="Sale"
                    location="Kahawa West, Nairobi, Kenya"
                  />
                  <ListingCard
                    imageUri={require('../assets/images/welcome-img.png')}
                    price="$3000"
                    houseType="Single house"
                    contractMode="Sale"
                    location="Kahawa West, Nairobi, Kenya"
                  />
                  <ListingCard
                    imageUri={require('../assets/images/welcome-img.png')}
                    price="$3000"
                    houseType="Duplex"
                    contractMode="Sale"
                    location="Kahawa West, Nairobi, Kenya"
                  />
                  <ListingCard
                    imageUri={require('../assets/images/welcome-img.png')}
                    price="$3000"
                    houseType="Town house"
                    contractMode="Sale"
                    location="Kahawa West, Nairobi, Kenya"
                  />
                  <ListingCard
                    imageUri={require('../assets/images/welcome-img.png')}
                    price="$3000"
                    houseType="Condo"
                    contractMode="Sale"
                    location="Kahawa West, Nairobi, Kenya"
                  />
                  <ListingCard
                    imageUri={require('../assets/images/welcome-img.png')}
                    price="$3000"
                    houseType="Hostel"
                    contractMode="Sale"
                    location="Kahawa West, Nairobi, Kenya"
                  />
                </ScrollView>
              </View>
              <View style={{ marginTop: 40, paddingHorizontal: 20 }}>
                <Text style={{ fontSize: 24, fontWeight: '700' }}>
                  Recommended Pick
                </Text>
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                  <Text style={{ fontWeight: '100' }}>
                    Selected just for you with lots of
                  </Text>
                  <AntDesign
                    style={{ paddingVertical: 3, paddingHorizontal: 6 }}
                    name="heart"
                    size={12}
                    color={primaryColor}
                  />
                  <Text style={{ fontWeight: '100' }}>from Keja</Text>
                </View>
                <View
                  style={{
                    width: Dimensions.get('window').width - 40,
                    height: 200,
                    marginTop: 20,
                  }}
                >
                  <Image
                    style={styles.recommendedImage}
                    source={require('../assets/images/welcome-img.png')}
                  />
                </View>
              </View>
              <View style={{ marginTop: 40, flexDirection: 'row', flex: 1 }}>
                <Text style={styles.headerText}>Nearby</Text>
                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                  <Text style={styles.viewAllText}>View all</Text>
                </View>
              </View>
              <View style={styles.listingGroupView}>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                >
                  <ListingCard
                    imageUri={require('../assets/images/welcome-img.png')}
                    price="$3000"
                    houseType="Apartment"
                    contractMode="Sale"
                    location="Kahawa West, Nairobi, Kenya"
                  />
                  <ListingCard
                    imageUri={require('../assets/images/welcome-img.png')}
                    price="$3000"
                    houseType="Single house"
                    contractMode="Sale"
                    location="Kahawa West, Nairobi, Kenya"
                  />
                  <ListingCard
                    imageUri={require('../assets/images/welcome-img.png')}
                    price="$3000"
                    houseType="Duplex"
                    contractMode="Sale"
                    location="Kahawa West, Nairobi, Kenya"
                  />
                  <ListingCard
                    imageUri={require('../assets/images/welcome-img.png')}
                    price="$3000"
                    houseType="Town house"
                    contractMode="Sale"
                    location="Kahawa West, Nairobi, Kenya"
                  />
                  <ListingCard
                    imageUri={require('../assets/images/welcome-img.png')}
                    price="$3000"
                    houseType="Condo"
                    contractMode="Sale"
                    location="Kahawa West, Nairobi, Kenya"
                  />
                  <ListingCard
                    imageUri={require('../assets/images/welcome-img.png')}
                    price="$3000"
                    houseType="Hostel"
                    contractMode="Sale"
                    location="Kahawa West, Nairobi, Kenya"
                  />
                </ScrollView>
              </View>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    ) : (
      <Loader modalVisible={true} animationType="fade" />
    );
  }
}

const styles = StyleSheet.create({
  exploreContainer: {
    flex: 1,
    backgroundColor: ghostGray,
    paddingTop: 20,
    paddingBottom: 20,
  },
  headerText: {
    fontSize: 18,
    color: lightGray,
    fontFamily: 'SF Pro Display Bold',
    fontWeight: '700',
    paddingHorizontal: 20,
  },
  categoryContainer: {
    height: 130,
    marginTop: 20,
    marginRight: 20,
  },
  headerTextContainer: {
    flex: 1,
    marginTop: 40,
    flexDirection: 'row',
  },
  viewAllText: {
    fontSize: 12,
    color: primaryColor,
    fontFamily: 'SF Pro Display Bold',
    fontWeight: '700',
    paddingHorizontal: 20,
  },
  listingGroupView: {
    marginTop: 20,
    height: 200,
    marginRight: 20,
  },
  recommendedImage: {
    flex: 1,
    height: null,
    width: null,
    resizeMode: 'cover',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: ghostGray,
  },
});

export default Explore;
