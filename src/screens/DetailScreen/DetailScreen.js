import {
  Animated,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {useRoute} from '@react-navigation/native';
import {SharedElement} from 'react-native-shared-element';
import Color from '../../styles/Color';
import Icon from '../../common/Icons';
import {useNavigation} from '@react-navigation/native';

const DetailScreen = ({route}) => {
  const {item, imageRef} = route.params;
  const translateY = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  // useEffect(() => {
  //   if (imageRef) {
  //     imageRef.measure((x, y, width, height, pageX, pageY) => {
  //       const targetY = 700; //
  //       Animated.timing(translateY, {
  //         toValue: targetY,
  //         duration: 500, // Adjust the duration as needed
  //         useNativeDriver: false,
  //       }).start();
  //     });
  //   }
  // }, [imageRef, translateY]);
  const renderHeader = () => {
    return (
      <>
        <View
          style={{
            flex: 0.05,
            backgroundColor: '#000',
            flexDirection: 'row',
            padding: 10,
            paddingLeft: 20,
            paddingRight: 20,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Icon
            family="FontAwesome5"
            name="grip-lines"
            color={Color.white}
            style={{flex: 0.35, paddingLeft: 10}}
            size={28}
          />
          <View
            style={{
              flex: 0.6,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 20,
            }}>
            <Image
              source={require('../../assets/images/playStationLogo.png')}
              style={styles.ripponImage}
            />
          </View>

          <View
            style={{
              flex: 0.4,
              flexDirection: 'row',
              justifyContent: 'space-evenly',
            }}>
            <Icon
              family="MaterialIcons"
              name="shopping-cart"
              color={Color.white}
              style={{}}
              size={24}
            />
            <Icon
              family="Feather"
              name="search"
              color={Color.white}
              style={{}}
              size={22}
            />
          </View>
        </View>
      </>
    );
  };
  return (
    <View style={{flex: 1}}>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      <SharedElement id={`item.${item.id}.image`} style={{flex: 1}}>
        {renderHeader()}

        <View style={{flex: 0.95}}>
          <Image source={item.image} style={{width: '100%', height: '105%'}} />

          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              position: 'absolute',
              top: 10,
              left: 10,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon
              name="chevron-back"
              family="Ionicons"
              size={30}
              color="white"
            />
            <Text
              style={{fontSize: 14, color: Color.white, fontWeight: 'bold'}}>
              BACK
            </Text>
          </TouchableOpacity>
          <View
            style={{
              position: 'absolute',
              top: 10,
              right: 10,
              width: 60,
              height: 60,
              borderRadius: 30,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: Color.mainColor,
            }}>
            <Icon
              name="game-controller"
              family="Ionicons"
              size={28}
              color="white"
              style={{top: 2}}
            />
            <Text style={{fontSize: 8, color: Color.white, fontWeight: '500'}}>
              GAMES
            </Text>
          </View>
          <View>
            <View style={styles.textContainer}>
              {item.topText != '' && item.topText != undefined && (
                <>
                  <Animated.Text style={styles.topText}>
                    {item.topText}
                  </Animated.Text>
                  <Animated.Text style={styles.bottomText}>
                    {item.bottomText}
                  </Animated.Text>
                </>
              )}

              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  marginTop: 10,
                  left: -10,
                }}>
                <Animated.Image
                  source={require('../../assets/images/ps4.png')}
                  style={{
                    width: '42%',
                    height: 50,
                  }}
                />
              </View>
              <View
                style={styles.buttonContainer}>
                <Text
                  style={{color: Color.white, fontWeight: '600', fontSize: 14}}>
                  PRE -ORDER NOW
                </Text>
              </View>
            </View>
          </View>
        </View>
      </SharedElement>

      {/* Other content goes here */}
    </View>
  );
};

export default DetailScreen;
const styles = StyleSheet.create({
  view: {
    backgroundColor: 'white',
    flex: 1,
  },
  scrollView: {
    width: '100%',
    height: '100%',
  },
  headerName: {
    position: 'absolute',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 13,
    color: 'black',
    zIndex: 12,
    top: 20,
    left: 100,
  },
  header: {
    position: 'absolute',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  contentRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  profileDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    color: 'black',
    paddingTop: 20,
    fontSize: 25,
    textAlign: 'center',
    fontWeight: 'bold',
  },

  ripponImage: {
    width: '25%',
    height: 40,
  },
  textContainer: {
    position: 'absolute',
    bottom: 45,
    left: 40,
    width: '80%',
  },
  topText: {
    fontSize: 20,
    color: Color.white,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  bottomText: {
    fontSize: 16,
    color: Color.white,
  },
  buttonContainer: {
    top: 5,
    backgroundColor: Color.mainColor,
    width: '100%',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    height: 50,
    borderRadius: 8,
  },
});
