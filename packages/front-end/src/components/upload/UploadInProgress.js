import { useEffect, useState } from 'react';
import { ProgressRing, Icon } from '@salesforce/design-system-react';

const UploadInProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(state => (state > 360 ? 0 : state + 1));
    }, 10);
    return () => clearInterval(interval);
  }, []);

  return (
    <ProgressRing
      value={progress}
      hasIcon
      icon={<Icon category="utility" name="upload" />}
    />
  );
};

export default UploadInProgress;
