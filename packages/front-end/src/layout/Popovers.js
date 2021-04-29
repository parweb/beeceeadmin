import { Popover } from '@salesforce/design-system-react';

const PopoverCmp = ({ body, heading, id }) => {
  return <Popover body={body} heading={heading} id={id} />;
};

export default PopoverCmp;
