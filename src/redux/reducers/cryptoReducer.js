import {createSlice} from '@reduxjs/toolkit';

export const cryptoSlice = createSlice({
  name: 'crypto',

  initialState: {
    isFetching: false,
    selectedCurrencies: [],
    symbol: '',
  },
  reducers: {
    selectedCryptoList: (state, action) => {
      state.selectedCurrencies = action.payload;
    },
    requestStarted: (state, action) => {
      console.log('list request');
      state.isFetching = true;
    },
    requestFinished: (state, action) => {
      console.log('update finished');

      state.isFetching = false;
    },
    setSymbol: (state, action) => {
      state.symbol = action.payload;
    },
  },
});

export default cryptoSlice.reducer;
