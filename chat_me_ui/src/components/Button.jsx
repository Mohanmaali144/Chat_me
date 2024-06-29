import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledButton = styled.button`
  width: 80%;
  min-width: 150px;
  padding: 1rem;
  font-size: 1rem;
  letter-spacing: 1px;
  margin-bottom: 0.5rem;
  border-radius: 4px;

  background-color: #454fd6;
  color: #ffffff;
  border: 2px solid #3335c2;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  filter: ${(props) => (props.disabled ? 'grayscale(10%) saturate(80%) brightness(1.3)' : null)};
  box-shadow: 1px 1px 4px var(--shadow-color);

  &:not(:last-child) {
    margin-top: 0.5rem;
  }

  &:hover {
    filter: contrast(90%) brightness(120%);
  }
`;

const StyledPrimaryButton = styled(StyledButton)`
  background-color: #454fd6;
  color: var(--bg-color-main);
  border-color: transparent;
`;

function Button(props) {
  return <StyledButton {...props}>{props.children}</StyledButton>;
}

function PrimaryButton(props) {
  return <StyledPrimaryButton {...props}>{props.children}</StyledPrimaryButton>;
}

Button.propTypes = {
  children: PropTypes.node.isRequired
};

PrimaryButton.propTypes = {
  children: PropTypes.node.isRequired
};

export { Button, PrimaryButton };
