import PropTypes from 'prop-types';
import {CRYPTO_LIST_API} from 'src/consts/api';
import {axiosGet} from '../axios';

const getCryptoRequest = (api, currencyName) => {
  return axiosGet({
    api: `${api}${currencyName}/metrics`,
  });
};
export default getCryptoRequest;

getCryptoRequest.propTypes = {
  currencyName: PropTypes.string.isRequired,
};
