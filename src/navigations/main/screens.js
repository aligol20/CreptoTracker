/**
 * The array of main stack defined here
 */

import AddCrypto from 'src/screens/main/AddCrypto';
import Home from 'src/screens/main/Home';

const commonOptions = {
  headerShown: true,
};
const screens = [
  {
    name: 'Home',
    component: Home,
    options: {
      ...commonOptions,
      headerShadowVisible: false,
      headerTitle: 'Home',
      headerStyle: {
        backgroundColor: 'rgb(56,87,117)',
      },
      headerTitleStyle: {
        color: 'white',
      },
    },
  },
  {
    name: 'AddCrypto',
    component: AddCrypto,
    options: {
      ...commonOptions,
      headerTitle: 'AddCrypto',
      headerShadowVisible: false,
    },
  },
];
export default screens;
