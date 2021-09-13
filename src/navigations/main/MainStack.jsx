/**
 * Here we just run a map on the defined array in the ./screen.js
 */
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import screens from './screens';

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator>
      {screens.map((x, index) => (
        <Stack.Screen
          key={index}
          options={x.options}
          name={x.name}
          component={x.component}
        />
      ))}
    </Stack.Navigator>
  );
};

export default MainStack;
