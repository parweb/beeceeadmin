import { useState } from 'react';
import { Button } from '@salesforce/design-system-react';

const GroupExtensionListMore = ({ setCount }) => {
  const [toggle, setToggle] = useState(true);

  const onClick = () => {
    toggle ? setCount(1000) : setCount(5);
    setToggle(!toggle);
  };

  return (
    <Button
      iconCategory="utility"
      iconSize="meduim"
      variant="icon"
      iconName={`chevron${toggle ? 'down' : 'up'}`}
      onClick={onClick}
      label={`Afficher ${toggle ? 'plus' : 'moins'}`}
    />
  );
};

export default GroupExtensionListMore;
