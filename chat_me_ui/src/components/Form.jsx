import PropTypes from 'prop-types';
import styled from 'styled-components';

function Form({ children, onSubmit }) {
  return <FormWidget onSubmit={onSubmit}>{children}</FormWidget>;
}

Form.propTypes = {
  children: PropTypes.node.isRequired,
  onSubmit: PropTypes.func.isRequired
};

const FormWidget = styled.form`
  width: 90%;
  min-width: 280px;
  max-width: 500px;

  background-color: #f1f3fd;

  padding: 3.5rem 1rem;
  border-radius: 4px;
  border: 1px solid #3335c2;
  box-shadow: ${(props) => (props.theme.mode === 'light' ? '4px 4px 15px #e2e2e2' : '3px 3px 10px #131313')};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.15rem;
`;

export default Form;
