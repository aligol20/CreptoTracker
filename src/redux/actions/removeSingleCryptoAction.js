import {cryptoSlice} from '../reducers/cryptoReducer';
import PropTypes from 'prop-types';

const {selectedCryptoList} = cryptoSlice.actions;

const removeSingleCryptoAction =
  cryptoDetails => async (dispatch, getState) => {
    const {selectedCurrencies} = getState().crypto || {};

    const newList = selectedCurrencies.filter(
      x => x.symbol !== cryptoDetails.symbol,
    );

    dispatch(selectedCryptoList(newList));
  };

export default removeSingleCryptoAction;

removeSingleCryptoAction.propTypes = {
  cryptoDetails: PropTypes.object.isRequired,
};
