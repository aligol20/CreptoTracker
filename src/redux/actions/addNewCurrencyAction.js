import snackBar from 'src/utils/snackBar';
import {cryptoSlice} from '../reducers/cryptoReducer';
import updateSelectedCurrenciesAction from './updateSelectedCurrenciesAction';
import PropTypes from 'prop-types';

const {selectedCryptoList, setSymbol} = cryptoSlice.actions;

const addNewCurrencyAction = cryptoDetails => async (dispatch, getState) => {
  const {selectedCurrencies} = getState().crypto || {};

  const isAlredyExist = selectedCurrencies.find(
    x => x.symbol === cryptoDetails.symbol,
  );

  if (!isAlredyExist) {
    dispatch(selectedCryptoList([...selectedCurrencies, cryptoDetails]));
    dispatch(updateSelectedCurrenciesAction());
    dispatch(setSymbol(''));
    snackBar({text: 'Success'});
  } else {
    dispatch(setSymbol(''));
    snackBar({text: 'This cryptoCurrency already exist!'});
  }
};

export default addNewCurrencyAction;

addNewCurrencyAction.propTypes = {
  cryptoDetails: PropTypes.object.isRequired,
};
