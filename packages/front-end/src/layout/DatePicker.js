import styled from 'styled-components';
import DatePickerUi from 'react-datepicker';

const StyledDate = styled(DatePickerUi)`
  width: 100%;
  border-radius: 4px;
  box-shadow: inset 0 2px 2px #e9e9e9;
  border: 1px solid #aeaeae;
  padding: 6px 10px 5px;
`;

const DatePicker = ({
  placeholder,
  startDate,
  onChange,
  endDate,
  selected
}) => {
  return (
    <StyledDate
      placeholderText={placeholder}
      selected={selected}
      onChange={onChange}
      startDate={startDate}
      endDate={endDate}
      selectsRange
    />
  );
};

export default DatePicker;
