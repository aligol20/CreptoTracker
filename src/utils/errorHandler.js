import snackBar from './snackBar';

const errorHelper = status => {
  switch (status) {
    case 400:
      snackBar({text: 'Bad Request'});
      break;
    case 401:
      snackBar({text: 'Unauthorized, please try later'});
      break;
    case 403:
      snackBar({text: 'Forbidden, please try later'});
      break;
    case 429:
      snackBar({text: 'Too many request, please try few minutes later'});
      break;
    case 429:
      snackBar({text: 'Internal server error, please try few minutes later'});
      break;
    case 404:
      snackBar({text: 'This cryptoCurrency does not exist!'});
      break;
    default:
      snackBar({text: 'Failed, please try few minutes later'});
  }
};
export default errorHelper;
