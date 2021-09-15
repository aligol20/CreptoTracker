/**
 * An action for setting symbol to Redux state
 */
import {cryptoSlice} from 'src/redux/reducers/cryptoReducer';
import PropTypes from 'prop-types';

const {setSymbol} = cryptoSlice.actions;

const setSymbolAction = params => dispatch => {
  dispatch(setSymbol(params));
};
export default setSymbolAction;

setSymbolAction.propTypes = {
  params: PropTypes.string,
};
