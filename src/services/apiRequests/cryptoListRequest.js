import PropTypes from 'prop-types';
import {CRYPTO_LIST_API} from 'src/consts/api';
import {axiosGet} from '../axios';

const cryptoListRequest = (api, page) => {
  return axiosGet({
    api: `${api}&page=${page}`,
  });
};
export default cryptoListRequest;

cryptoListRequest.propTypes = {
  page: PropTypes.number.isRequired,
};
