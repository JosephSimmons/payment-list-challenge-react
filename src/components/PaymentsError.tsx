import { ErrorBox } from './components';
import { I18N } from '../constants/i18n';
import { isAxiosError } from 'axios';

type Props = {
  error: Error;
};

const PaymentsError = ({ error }: Props) => {
  // Axios used to make network request in fetchPaymentsData
  if (isAxiosError(error)) {
    const status = error.response?.status;

    if (status === 404) {
      return <ErrorBox>{I18N.PAYMENT_NOT_FOUND}</ErrorBox>;
    }
  }

  return <ErrorBox>{I18N.SOMETHING_WENT_WRONG}</ErrorBox>;
};

export default PaymentsError;
