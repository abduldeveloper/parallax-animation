import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import DetailScreen from './src/screens/DetailScreen/DetailScreen';
import DashBoard from './src/screens/HomeScreen/DashBoard';
const App = () => {
  const Stack = createStackNavigator();

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{headerShown: false}}
          >
           
           <Stack.Screen name="DashBoard" component={DashBoard} />
           <Stack.Screen name="DetailScreen" component={DetailScreen} /> 



        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
