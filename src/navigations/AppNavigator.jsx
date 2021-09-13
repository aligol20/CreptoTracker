/**
 * The main core for routing is here.
 */
import {NavigationContainer} from '@react-navigation/native';
import React, {useMemo, useReducer} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import MainStack from 'src/navigations/main/MainStack';
import StoreProvider from 'src/redux/StoreProvider';

const initialState = {authState: 'main'};

export const navigationRef = React.createRef();

export default function AppNavigator() {
  // a reducer for keeping the current auth state
  const reducer = (state, action) => {
    switch (action.type) {
      case 'MAIN':
        return {authState: 'main'};
    }
    return {authState: 'main'};
  };
  // reducer definition
  const [state, dispatch] = useReducer(reducer, initialState);

  /**
   * with useMemo and passing this function to all components with help of useContext,
   * We can change the stack immediately
   */
  const authContext = useMemo(
    () => ({
      main: () => dispatch({type: 'MAIN'}),
    }),
    [],
  );

  /**
   * By changing the authState, Stack will be changed immediately
   * @returns current Stack
   */
  const StackManager = () => {
    switch (state?.authState) {
      case 'main':
        return <MainStack />;

      default:
        return (
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <ActivityIndicator color={'grey'} />
          </View>
        );
    }
  };

  return (
    <StoreProvider>
      <SafeAreaProvider>
        <NavigationContainer ref={navigationRef}>
          {StackManager()}
        </NavigationContainer>
      </SafeAreaProvider>
    </StoreProvider>
  );
}
