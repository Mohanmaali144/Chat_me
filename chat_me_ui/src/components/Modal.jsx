// Modal.js
import React from 'react';
import styled from 'styled-components';

const Modal = ({ show, onClose, children }) => {
  if (!show) {
    return null;
  }

  return (
    <Overlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <Header>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </Header>
        <Body>
          {children}
        </Body>
      </ModalContainer>
    </Overlay>
  );
};

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  // background: rgba(0, 0, 0, 0.5);
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* Ensure the modal appears on top of all elements */
`;

const ModalContainer = styled.div`
  background: #fff;
  padding: 5px;
  border-radius: 8px;
  max-width: 400px;
  max-height:600px;
  height:400px;
  width: 100%;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  position: relative;
`;

const Header = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const CloseButton = styled.span`
  cursor: pointer;
  font-size: 1.5rem;
  font-weight: bold;
`;

const Body = styled.div`
  margin-top: 0px;
`;

export default Modal;
