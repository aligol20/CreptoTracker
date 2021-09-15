import PropTypes from 'prop-types';
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
