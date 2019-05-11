import React, {
  Component
} from 'react';
import {
  Font
} from 'expo';
import Loader from '../components/Loader';
import SearchBar from '../components/SearchBar';
import ListingCard from '../components/ListingCard';
import {
  ghostGray,
  lightGray
} from '../utils/colors';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView
} from 'react-native';

class Listings extends Component {
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
    return this.state.isReady ? ( <
      SafeAreaView style = {
        {
          flex: 1
        }
      } >
      <
      SearchBar iconName = {
        'home'
      }
      placeholder = {
        "Listing's location"
      }
      /> <
      ScrollView scrollEventThrottle = {
        16
      } >
      <
      View style = {
        {
          backgroundColor: ghostGray,
          paddingBottom: 20
        }
      } >
      <
      View style = {
        styles.listingsContainer
      } >
      <
      Text style = {
        styles.listingsHeaderText
      } >
      Manage your listings <
      /Text> < /
      View > <
      View style = {
        styles.headerTextContainer
      } >
      <
      Text style = {
        styles.headerText
      } > My listings < /Text> < /
      View > <
      View style = {
        styles.listingGroupView
      } >
      <
      ScrollView horizontal = {
        true
      }
      showsHorizontalScrollIndicator = {
        false
      } >
      <
      ListingCard imageUri = {
        require('../assets/images/welcome-img.png')
      }
      price = "$3000"
      houseType = "Apartment"
      contractMode = "Sale"
      location = "Kahawa West, Nairobi, Kenya"
      isBordered = {
        true
      }
      /> <
      ListingCard imageUri = {
        require('../assets/images/welcome-img.png')
      }
      price = "$3000"
      houseType = "Single house"
      contractMode = "Sale"
      location = "Kahawa West, Nairobi, Kenya"
      isBordered = {
        true
      }
      /> <
      ListingCard imageUri = {
        require('../assets/images/welcome-img.png')
      }
      price = "$3000"
      houseType = "Duplex"
      contractMode = "Sale"
      location = "Kahawa West, Nairobi, Kenya"
      isBordered = {
        true
      }
      /> <
      ListingCard imageUri = {
        require('../assets/images/welcome-img.png')
      }
      price = "$3000"
      houseType = "Town house"
      contractMode = "Sale"
      location = "Kahawa West, Nairobi, Kenya"
      isBordered = {
        true
      }
      /> <
      ListingCard imageUri = {
        require('../assets/images/welcome-img.png')
      }
      price = "$3000"
      houseType = "Condo"
      contractMode = "Sale"
      location = "Kahawa West, Nairobi, Kenya"
      isBordered = {
        true
      }
      /> <
      ListingCard imageUri = {
        require('../assets/images/welcome-img.png')
      }
      price = "$3000"
      houseType = "Hostel"
      contractMode = "Sale"
      location = "Kahawa West, Nairobi, Kenya"
      isBordered = {
        true
      }
      /> < /
      ScrollView > <
      /View> <
      View style = {
        styles.headerTextContainer
      } >
      <
      Text style = {
        styles.headerText
      } > My subscriptions < /Text> < /
      View > <
      View style = {
        styles.listingGroupView
      } >
      <
      ScrollView horizontal = {
        true
      }
      showsHorizontalScrollIndicator = {
        false
      } >
      <
      ListingCard imageUri = {
        require('../assets/images/welcome-img.png')
      }
      price = "$3000"
      houseType = "Apartment"
      contractMode = "Sale"
      location = "Kahawa West, Nairobi, Kenya" /
      >
      <
      ListingCard imageUri = {
        require('../assets/images/welcome-img.png')
      }
      price = "$3000"
      houseType = "Single house"
      contractMode = "Sale"
      location = "Kahawa West, Nairobi, Kenya" /
      >
      <
      ListingCard imageUri = {
        require('../assets/images/welcome-img.png')
      }
      price = "$3000"
      houseType = "Duplex"
      contractMode = "Sale"
      location = "Kahawa West, Nairobi, Kenya" /
      >
      <
      ListingCard imageUri = {
        require('../assets/images/welcome-img.png')
      }
      price = "$3000"
      houseType = "Town house"
      contractMode = "Sale"
      location = "Kahawa West, Nairobi, Kenya" /
      >
      <
      ListingCard imageUri = {
        require('../assets/images/welcome-img.png')
      }
      price = "$3000"
      houseType = "Condo"
      contractMode = "Sale"
      location = "Kahawa West, Nairobi, Kenya" /
      >
      <
      ListingCard imageUri = {
        require('../assets/images/welcome-img.png')
      }
      price = "$3000"
      houseType = "Hostel"
      contractMode = "Sale"
      location = "Kahawa West, Nairobi, Kenya" /
      >
      <
      /ScrollView> < /
      View > <
      /View> < /
      ScrollView > <
      /SafeAreaView>
    ) : ( <
      Loader modalVisible = {
        true
      }
      animationType = "fade" / >
    );
  }
}

const styles = StyleSheet.create({
  listingsContainer: {
    flex: 1,
    paddingTop: 20,
  },
  listingsHeaderText: {
    fontSize: 22,
    fontWeight: '700',
    fontFamily: 'SF Pro Display Bold',
    paddingHorizontal: 20,
  },
  headerTextContainer: {
    flex: 1,
    marginTop: 40,
    flexDirection: 'row',
  },
  headerText: {
    fontSize: 18,
    color: lightGray,
    fontFamily: 'SF Pro Display Bold',
    fontWeight: '700',
    paddingHorizontal: 20,
  },
  listingGroupView: {
    marginTop: 20,
    height: 200,
    marginRight: 20,
  },
});

export default Listings;