// import { useRecoilValue } from 'recoil';

// import { $toasts } from 'states';
// import { useToast } from '../../hooks';

// const ToastItem = ({
//   type = 'info',
//   heading,
//   headingLink,
//   onClickHeadingLink = () => {}
// }) => {
//   const { removeToast } = useToast();

//   return <div>toaster</div>;

//   // return (
//   //   <ToastSalesforce
//   //     labels={{ heading, headingLink }}
//   //     duration={10000}
//   //     onRequestClose={() => {
//   //       removeToast();
//   //     }}
//   //     onClickHeadingLink={onClickHeadingLink}
//   //     variant={type}
//   //   />
//   // );
// };

const Toast = () => {
  // const toasts = useRecoilValue($toasts);
  const toasts = [];

  if (toasts.length === 0) {
    return null;
  }

  return <div>toaster</div>;

  // return (
  //   <ToastContainer>
  //     {toasts.map((props, i) => (
  //       <ToastItem id={`toast-${i}`} key={`toast-${props.id}`} {...props} />
  //     ))}
  //   </ToastContainer>
  // );
};

export default Toast;
