import { Popover } from '@salesforce/design-system-react';
import React from 'react';

const PopoverCmp = ({ body, heading, id }) => {
  return <Popover body={body} heading={heading} id={id} />;
};

export default PopoverCmp;
