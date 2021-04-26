import { useRecoilValue } from 'recoil';
import {
  Toast as ToastSalesforce,
  ToastContainer
} from '@salesforce/design-system-react';

import { $toasts } from 'state';
import { useToast } from 'hooks';

const ToastItem = ({
  type = 'info',
  heading,
  headingLink,
  onClickHeadingLink = () => {}
}) => {
  const { removeToast } = useToast();

  return (
    <div>
      <ToastSalesforce
        labels={{ heading, headingLink }}
        duration={10000}
        onRequestClose={() => {
          removeToast();
        }}
        onClickHeadingLink={onClickHeadingLink}
        variant={type}
      />
    </div>
  );
};

const Toast = () => {
  const toasts = useRecoilValue($toasts);

  if (toasts.length === 0) {
    return null;
  }

  return (
    <ToastContainer>
      {toasts.map((props, i) => (
        <ToastItem id={`toast-${i}`} key={`toast-${props.id}`} {...props} />
      ))}
    </ToastContainer>
  );
};

export default Toast;
