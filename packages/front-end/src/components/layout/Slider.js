import styled from 'styled-components';

import {
  Slider as SliderSalesforce,
  Button
} from '@salesforce/design-system-react';

import { Grid } from 'components/layout';
import { clamp } from 'helpers';

const SliderSalesforceStyled = styled(SliderSalesforce)`
  label {
    text-align: center;
    width: 100%;
  }
`;

const Slider = ({ id = null, label, onChange, value, min, max, step = 1 }) => {
  return (
    <Grid id={id} className="slider-btns" gap="2px" columns="auto 1fr auto">
      <Button
        id="less"
        label="-"
        onClick={() => {
          onChange({ target: { value: clamp(value - step, min, max) } });
        }}
      />
      <SliderSalesforceStyled
        label={label}
        onChange={onChange}
        value={value}
        min={min}
        max={max}
        step={step}
      />
      <Button
        id="more"
        label="+"
        onClick={() => {
          onChange({ target: { value: clamp(value + step, min, max) } });
        }}
      />
    </Grid>
  );
};

export default Slider;
