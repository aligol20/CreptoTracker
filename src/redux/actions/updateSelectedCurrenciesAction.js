import {BTC_API, SINGLE_CURRENCY_API} from 'src/consts/api';
import cryptoListRequest from 'src/services/apiRequests/cryptoListRequest';
import getCryptoRequest from 'src/services/apiRequests/getCryptoRequest';
import {cryptoSlice} from '../reducers/cryptoReducer';

const {selectedCryptoList, requestStarted, requestFinished} =
  cryptoSlice.actions;

const updateSelectedCurrenciesAction = () => async (dispatch, getState) => {
  dispatch(requestStarted());
  console.log('refreshCryptoListRequest');

  try {
    const {selectedCurrencies} = getState().crypto || {};

    for (let i = 0; i < selectedCurrencies?.length; i++) {
      const symbol = selectedCurrencies[i].symbol;
      const cryptoFetchResult = await getCryptoRequest(
        SINGLE_CURRENCY_API,
        symbol,
      );
      const {data, status} = cryptoFetchResult || {};

      if (status === 200) {
        dispatch(
          selectedCryptoList(
            selectedCurrencies?.map(x =>
              x.symbol === data?.data?.symbol ? data?.data : x,
            ),
          ),
        );
      }
    }
    console.log('refreshCryptoListFinished');
  } catch (err) {
    errorHelper(err?.response?.status);

    console.log(err, 'updateSelectedCurrenciesAction err');
  }
  dispatch(requestFinished());
};

export default updateSelectedCurrenciesAction;
