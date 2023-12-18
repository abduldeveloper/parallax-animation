import React, {useRef} from 'react';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
} from 'react-native-reanimated';

import {
  FlatList,
  StyleSheet,
  Text,
  Dimensions,
  View,
  useWindowDimensions,
  SafeAreaView,
  Image,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Color from '../../styles/Color';
import Icon from '../../common/Icons';
import { SharedElement } from 'react-native-shared-element';

const DashBoard = ({navigation}) => {
  // Dummy Data to show inside the scrollView
  const games = [
    {
      image: require('../../assets/images/cyperpung.jpg'),
      id: '1',
      topText: 'Cyperpunk 2077',
      bottomText: 'Exclusive PlayStation',
    },
    {
      image: require('../../assets/images/ghoust.jpg'),
      id: '2',
      topText: 'Ghost of Tsushima',
      bottomText: 'Exclusive PlayStation',
    },

    {
      image: require('../../assets/images/lastofus2.png'),
      id: '3',
    },
    {
      image: require('../../assets/images/hunting.jpg'),
      id: '4',
      topText: 'Predator Hunting Grounds',
      bottomText: 'Exclusive PlayStation',
    },
    {
      image: require('../../assets/images/doomEt.png'),
      id: '5',
      topText: 'Doom Eternal',
      bottomText: 'Exclusive PlayStation',
    },
    {
      image: require('../../assets/images/marvel.jpeg'),
      id: '5',
      topText: 'Marvel Studios',
      bottomText: 'Exclusive PlayStation',
    },
  ];
  const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
  const scrollPosition = useSharedValue(0);

  const renderHeader = () => {
    return (
      <>
        <View
          style={{
            flex: 0.05,
            backgroundColor: Color.white,
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
            color={Color.mainColor}
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
              color={Color.mainColor}
              style={{}}
              size={24}
            />
            <Icon
              family="Feather"
              name="search"
              color={Color.mainColor}
              style={{}}
              size={22}
            />
          </View>
        </View>
      </>
    );
  };
  const handleScroll = useAnimatedScrollHandler({
    onScroll: event => {
      scrollPosition.value = event.contentOffset.y;
    },
  });

  const viewabilityConfig = useRef({viewAreaCoveragePercentThreshold: 100});

  const {height, width} = useWindowDimensions();

  const navigateToDetail = item => {
    navigation.navigate('DetailScreen', {item});
  };
  const ListofGames = ({item, index}) => {
    const textTranslate = useAnimatedStyle(() => {
      const translateY = interpolate(
        scrollPosition.value,
        [
          ((index - 1) * height) / 2,
          (index * height) / 2,
          ((index + 1) * height) / 2,
        ],
        [-100, 0, 100],
      );
      return {
        transform: [{translateY}],
      };
    }, []);
    return (
      <View style={{marginBottom: 20, flex: 1}}>
        <View
          style={[
            styles.scrollContent,
            {
              flex: 1,
              position: 'relative',
              borderRadius: 20,
              margin: 25,
              justifyContent: 'center',
              zIndex: -999,
              alignContent: 'center',
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.4,
              shadowRadius: 4,
              shadowOffset: {width: 0, height: 0},
              shadowOpacity: 0.6,
              shadowRadius: 10,
              elevation: 11,
            },
          ]}
          key={index}>
          <Animated.Image
            style={[
              {
                width: '100%',
                resizeMode: 'cover',
                height: height * 0.7,
                borderRadius: 20,
              },
              textTranslate,
            ]}
            source={item.image}
            ref={(ref) => (item.imageRef = ref)}
          />
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
              style={{flex: 1, flexDirection: 'row', marginTop: 10, left: -10}}>
              <Animated.Image
                source={require('../../assets/images/ps4.png')}
                style={{
                  width: '42%',
                  height: 50,
                }}
              />
              <View
                style={{
                  position: 'absolute',
                  bottom: 10,
                  right: 0,
                  width: 30,
                  height: 30,
                  borderRadius: 40,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: Color.white,
                }}>
                <Icon
                  name="pluscircle"
                  family="AntDesign"
                  size={30}
                  color={Color.mainColor}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <View style={{flex: 1, backgroundColor: Color.white}}>
        {renderHeader()}
        <Animated.ScrollView
          style={{flex: 1}}
          scrollEventThrottle={16}
          onScroll={handleScroll}
          showsVerticalScrollIndicator={false}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 10,
            }}>
            <Text style={styles.headerText}>GREAT GAMES</Text>
            <Text style={styles.headerText2}>Coming Soon</Text>
          </View>
          <View style={styles.view}>
            <AnimatedFlatList
              onScroll={handleScroll}
              data={games}
              scrollEventThrottle={16}
              renderItem={({item, index}: any) => {
                const imageIndex = index % 2;
                return (
                  <>
                    <TouchableOpacity onPress={() => navigateToDetail(item)} style={{flex:1}}>
                    <SharedElement id={`item.${item.id}.image`} style={{flex:1}}>
                    <View
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginTop: 10,
                        }}>
                        {imageIndex === 0 && (
                          <Image
                            source={require('../../assets/images/front3d.png')}
                            style={{
                              width: '100%',
                              position: 'absolute',
                              right: 0,
                              zIndex: 1,
                              height: '100%',
                              top: 0,
                              opacity: 1,
                            }}
                          />
                        )}
                        {imageIndex === 1 && (
                          <Image
                            source={require('../../assets/images/end3d.png')}
                            style={{
                              width: '100%',
                              position: 'absolute',
                              left: 0,
                              zIndex: 1,
                              height: '100%',
                              top: -60,
                              opacity: 1,
                            }}
                          />
                        )}
                        <ListofGames
                          scrollPosition={scrollPosition}
                          item={item}
                          index={index}
                        />
                      </View>
                    </SharedElement>
                   
                    </TouchableOpacity>
                  </>
                );
              }}
            />
          </View>
        </Animated.ScrollView>
      </View>
    </SafeAreaView>
  );
};

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
  scrollContent: {
    height: Dimensions.get('screen').height / 2.2,
    width: Dimensions.get('screen').width / 1.08,
    alignItems: 'center',
    overflow: 'hidden',
    margin: 16,
    marginBottom: -16,
  },
  ripponImage: {
    width: '25%',
    height: 40,
  },
  textContainer: {
    position: 'absolute',
    bottom: 15,
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
  headerText: {
    fontSize: 16,
    color: Color.mainColor,
    fontWeight: '700',
  },
  headerText2: {
    fontSize: 25,
    color: Color.fontColor,
    fontWeight: '400',
  },
});

export default DashBoard;
