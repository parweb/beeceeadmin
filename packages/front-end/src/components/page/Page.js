import { useInIframe } from 'hooks';
import { Toast } from 'components/layout';

const Page = ({ children }) => {
  const inIframe = useInIframe();

  return inIframe ? (
    <>
      <Toast />
      {children}
    </>
  ) : (
    <div>
      <div>
        <Toast />
        {children}
      </div>
      <center>BcaGDoc - V_VERSION_</center>
    </div>
  );
};

export default Page;
