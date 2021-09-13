import axios from 'axios';
import PropTypes from 'prop-types';
import {BASE_URL} from 'src/consts/baseUrl';

export const axiosGet = async ({api, data = null}) => {
  const options = {
    method: 'GET',
    data: data,
    url: BASE_URL + api,
  };

  return axios(options);
};
axiosGet.propTypes = {
  api: PropTypes.string.isRequired,
  data: PropTypes.object,
};
