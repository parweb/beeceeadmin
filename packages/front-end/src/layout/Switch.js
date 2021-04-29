import styled from 'styled-components';

const Container = styled.label`
  .toggle-check-input {
    width: 1px;
    height: 1px;
    position: absolute;
  }

  .toggle-check-text {
    display: inline-block;
    position: relative;
    text-transform: uppercase;
    background: #ccc;
    padding: 0.25em 0.5em 0.25em 2em;
    border-radius: 1em;
    min-width: 2em;
    color: #393939;

    cursor: pointer;

    transition: background-color 0.15s;
  }

  .toggle-check-text:after {
    content: ' ';
    display: block;
    background: #fff;
    width: 1.5em;
    height: 1.5em;
    border-radius: 1em;
    position: absolute;
    left: 0.3em;
    top: 0.2em;
    transition: left 0.15s, margin-left 0.15s;
  }

  .toggle-check-text:before {
    content: 'Non';
    font-size: 0.8rem;
  }

  .toggle-check-input:checked ~ .toggle-check-text {
    background: #fec600;
    padding-left: 0.5em;
    padding-right: 2em;
  }

  .toggle-check-input:checked ~ .toggle-check-text:before {
    content: 'Oui';
    font-size: 0.8rem;
  }

  .toggle-check-input:checked ~ .toggle-check-text:after {
    left: 100%;
    margin-left: -1.7em;
  }
`;

const Switch = ({ value, onChange = () => {} }) => {
  return (
    <Container>
      <input
        id="change-assure"
        type="checkbox"
        class="toggle-check-input"
        name="isAssure"
        checked={value}
        onChange={e => {
          onChange(e.target.checked);
        }}
      />
      <span class="toggle-check-text"></span>
    </Container>
  );
};

export default Switch;
