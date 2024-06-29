import PropTypes from 'prop-types';
import styled from 'styled-components';

function TextInput(props) {
  const { label, id, ...otherProps } = props;
  return (
    <>
      {label ? <StyledLabel htmlFor={id}>{label}</StyledLabel> : null}
      <StyledInput {...otherProps} />
    </>
  );
}

TextInput.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string
};

const StyledLabel = styled.label`
  color: var(--primary);
  display: block;
  width: 80%;
  margin-bottom: -8px;
`;

// const StyledInput = styled.input`
//   width: 80%;
//   padding: 1rem;
//   margin: 0.5rem 0;
//   background-color: var(--bg-color-darken);
//   color: var(--primary);
//   border: none;
//   border-radius: 5px;
//   font-size: 1rem;
//   outline: 1px;

//   &:focus {
//     outline: 1px solid var(--primary);
//   }
// `;

const StyledInput = styled.input`
  width: 80%;
  padding: 1rem;
  margin: 0.5rem 0;
  background-color: transparent; /* Set background to transparent */
  color: #1e1e4d;
 
  border: 1.5px solid #9fb2f1; /* Add border */
  border-radius: 5px;
  font-size: 1rem;
  outline: none; /* Remove default outline */

  &:focus {
    outline: 2px solid #728ae8 /* Add custom outline on focus */
  }
`;

export default TextInput;
