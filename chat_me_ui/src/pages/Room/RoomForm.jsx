import PropTypes from 'prop-types';
import { useState } from 'react';
import { OuterContainer, Container } from '../../components/MainContainer';
import Form from '../../components/Form';
import { Button, PrimaryButton } from '../../components/Button';
import TextInput from '../../components/TextInput';
import styled from 'styled-components';
import { warningToast } from '../../utils/toastify';
import { IoArrowUndo } from 'react-icons/io5';

function RoomForm({ handleRoomCreate, isLoading, toggleShow }) {
  const [formData, setFormData] = useState({
    roomname: '',
    avatarImage: ''
  });
  const [file, setFile] = useState(null);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!formData.roomname) return warningToast('Room name is required!');
    const data = new FormData();
    data.append('roomname', formData.roomname.trim());
    if (file) {
      data.append('avatarImage', file);
    }


    handleRoomCreate(data);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          avatarImage: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <OuterContainer>
      <FormContainer>
        <Form onSubmit={(e) => handleFormSubmit(e)}>
          <FormTitle>Enter Room Details</FormTitle>
          <TextInput
            type="text"
            placeholder="Group Name"
            name="roomname"
            id="roomname"
            value={formData.roomname}
            onChange={(e) => setFormData((prev) => ({ ...prev, roomname: e.target.value }))}
          />
          <FileInputWrapper>
            <FileInput type="file" accept="image/*" onChange={handleFileChange} />
          </FileInputWrapper>
          {formData.avatarImage && (
            <AvatarPreview src={formData.avatarImage} alt="Avatar Preview" />
          )}
          <PrimaryButton>{isLoading ? 'Loading...' : 'Confirm'}</PrimaryButton>
          <DisplayControl>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                toggleShow();
              }}
            >
              <IconWrapper>
                <IoArrowUndo />
              </IconWrapper>
              Back
            </Button>
          </DisplayControl>
        </Form>
      </FormContainer>
    </OuterContainer>
  );
}

RoomForm.propTypes = {
  handleRoomCreate: PropTypes.func,
  isLoading: PropTypes.bool,
  toggleShow: PropTypes.func
};

const FormContainer = styled(Container)`
  height: 100%;

  @media screen and (min-width: 768px) {
    padding-top: calc(40px + 28px + 16px);
    display: flex;
    align-items: flex-start;
  }
`;

const FormTitle = styled.h1`
  font-size: 1.25rem;
  font-weight: 500;
  letter-spacing: 1px;
  text-align: center;
  margin: 0.5rem 0;
`;

const FileInputWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 1rem 0;
`;

const FileInput = styled.input`
  display: block;
`;

const AvatarPreview = styled.img`
  display: block;
  margin: 0 auto 1rem;
  width: 100px;
  height: 100px;
  border-radius: 50%;
`;

const DisplayControl = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

  @media screen and (min-width: 768px) {
    display: none;
  }
`;

const IconWrapper = styled.span`
  position: relative;
  top: 2px;
  margin-right: 0.5rem;
`;

export default RoomForm;
