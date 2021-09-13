/**
 * An action for setting symbol to Redux state
 */
import {cryptoSlice} from 'src/redux/reducers/cryptoReducer';

const {setSymbol} = cryptoSlice.actions;

const setSymbolAction = params => dispatch => {
  dispatch(setSymbol(params));
};
export default setSymbolAction;
