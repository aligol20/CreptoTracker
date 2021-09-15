import {SINGLE_CURRENCY_API} from 'src/consts/api';
import getCryptoRequest from 'src/services/apiRequests/getCryptoRequest';
import errorHelper from 'src/utils/errorHandler';
import {cryptoSlice} from '../reducers/cryptoReducer';
import addNewCurrencyAction from './addNewCurrencyAction';
import PropTypes from 'prop-types';

const {requestStarted, requestFinished} = cryptoSlice.actions;
const fetchCryptoAction = symbol => async (dispatch, getState) => {
  dispatch(requestStarted());

  try {
    if (symbol) {
      const cryptoFetchResult = await getCryptoRequest(
        SINGLE_CURRENCY_API,
        symbol,
      );
      const {status, data} = cryptoFetchResult || {};

      if (status === 200) {
        dispatch(addNewCurrencyAction(data?.data));
      }
    }
  } catch (err) {
    errorHelper(err?.response?.status);
  }
  dispatch(requestFinished());
};

export default fetchCryptoAction;

fetchCryptoAction.propTypes = {
  symbol: PropTypes.string.isRequired,
};
