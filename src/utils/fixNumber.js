import PropTypes from 'prop-types';

const fixNumber = num => {
  return num > 0
    ? Number.parseFloat(num).toFixed(2)
    : Number.parseFloat(-1 * num).toFixed(2);
};
export default fixNumber;

fixNumber.propTypes = {
  num: PropTypes.number.isRequired,
};
