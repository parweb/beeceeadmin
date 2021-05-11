import { useState, forwardRef } from 'react';
import {
  Combobox,
  comboboxFilterAndLimit
} from '@salesforce/design-system-react';

const Select = forwardRef(
  (
    {
      id = null,
      multiple = false,
      required = false,
      variant = null,
      value = null,
      defaultValue = null,
      errorText = null,
      options,
      onSelect = () => {},
      onChange: parentOnChange = () => {},
      labels = {}
    },
    ref
  ) => {
    const [input, setInput] = useState('');
    const selection = multiple && value ? value : value ? [value] : [];

    const onChange = value => {
      parentOnChange(Array.isArray(value) ? value.filter(x => !!x) : value);
    };

    return (
      <Combobox
        selectedListboxRef={ref}
        id={id}
        errorText={errorText}
        multiple={multiple}
        required={required}
        events={{
          onChange: (event, { value }) => {
            setInput(value);
          },
          onSelect: (event, data) => {
            onChange(multiple ? data.selection : data.selection[0]);
            setInput('');
          },
          onRequestRemoveSelectedOption: (event, data) => {
            onChange(multiple ? data.selection : data.selection[0]);
            setInput('');
          }
        }}
        labels={{ ...labels, placeholderReadOnly: labels.placeholder }}
        menuItemVisibleLength={7}
        options={comboboxFilterAndLimit({
          inputValue: input,
          limit: options.length,
          options,
          selection
        })}
        selection={selection}
        value={input}
        defaultValue={defaultValue}
        variant={variant || 'base'}
      />
    );
  }
);

export default Select;
