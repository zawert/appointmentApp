import React, {useEffect}  from 'react';
import { 
  Animated,
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList
} from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useIsFocused } from '@react-navigation/native';
// Plus...
import plus from './assets/plus.png'
import AppointmentList from './AppointmentList';
import Search from '../search';
import {useSelector, useDispatch} from 'react-redux';
import {getSellers, setSellerLoading} from '../../store/actions';
import ItemTile from '../../components/ui/ItemTile';



// Font Awesome Icons...
// import FontAwesome5 from '@expo/vector-icons'
import { useRef } from 'react';

const Tab = createBottomTabNavigator();

// Hiding Tab Names...
export default function App({navigation}) {

  function SearchScreen({loading, sellers}) {
    const dispatch = useDispatch();
    const sellerHandler = id => {
      dispatch(setSellerLoading(true));
      navigation.navigate({
        routeName: 'Seller',
        params: {
          id,
        },
      });
    };
    
    const renderItem = ({item}) => {
      return (
        <ItemTile
          title={item.user.name}
          subTitle={item.user.email}
          onPress={() => sellerHandler(item.user._id)}
        />
      );
    };
    return (
      <View style={styles.screen}>
        <Search />
        <View style={styles.container}>
        </View>
        <View style={styles.sellerList}>
          <FlatList
            keyExtractor={item => item._id}
            data={sellers}
            renderItem={item => renderItem(item)}
            numColumns={1}
            initialNumToRender={0}
          />
        </View>
      </View>
    );
  }

  function SearchScreenWithSellers() {
    const seller = useSelector(state => state.seller);
    const {loading, sellers} = seller;

    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(getSellers());
    }, []);
    
    return <SearchScreen loading={loading} sellers={sellers} />
  }
  
  // Animated Tab Indicator...
  const tabOffsetValue = useRef(new Animated.Value(0)).current;
  return (
    <NavigationContainer>
      <Tab.Navigator tabBarOptions={{
        showLabel: false,
        // Floating Tab Bar...
        style: {
          backgroundColor: 'white',
          position: 'absolute',
          bottom: 40,
          marginHorizontal: 20,
          // Max Height...
          height: 60,
          borderRadius: 10,
          // Shadow...
          shadowColor: '#000',
          shadowOpacity: 0.06,
          shadowOffset: {
            width: 10,
            height: 10
          },
          paddingHorizontal: 20,
        }
      }}>
        <Tab.Screen name={"Home"} component={HomeScreen} options={{
          tabBarIcon: ({ focused }) => (
            <View style={{
              // centring Tab Button...
              position: 'absolute',
              top: 20
            }}>
              <Text>Home</Text>
            </View>
          )
        }} listeners={({ navigation, route }) => ({
          // Onpress Update....
          tabPress: e => {
            Animated.spring(tabOffsetValue, {
              toValue: 0,
              useNativeDriver: true
            }).start();
          }
        })}></Tab.Screen>

        <Tab.Screen name={"Search"} component={SearchScreenWithSellers} options={{
          tabBarIcon: ({ focused }) => (
            <View style={{
              // centring Tab Button...
              position: 'absolute',
              top: 20
            }}>
              <Text>Book</Text>
            </View>
          )
        }} listeners={({ navigation, route }) => ({
          // Onpress Update....
          tabPress: e => {
            Animated.spring(tabOffsetValue, {
              toValue: getWidth(),
              useNativeDriver: true
            }).start();
          }
        })}></Tab.Screen>
      </Tab.Navigator>

      <Animated.View style={{
        width: getWidth() - 20,
        height: 2,
        backgroundColor: 'red',
        position: 'absolute',
        bottom: 98,
        // Horizontal Padding = 20...
        left: 50,
        borderRadius: 20,
        transform: [
          { translateX: tabOffsetValue }
        ]
      }}>

      </Animated.View>
    </NavigationContainer>
  );
}

function getWidth() {
  let width = Dimensions.get("window").width

  // Horizontal Padding = 20...
  width = width - 80

  // Total five Tabs...
  return width / 2
}

function HomeScreen() {
  const isFocused = useIsFocused();
  return isFocused ? (
    <AppointmentList />
  ) : null;
}

function NotificationScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Notifications!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom:10
  },
});