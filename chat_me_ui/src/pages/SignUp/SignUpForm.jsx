import React, { useState, useEffect } from 'react';
import Form from '../../components/Form';
import TextInput from '../../components/TextInput';
import { PrimaryButton } from '../../components/Button';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useAxios } from '../../hooks/useAxios';
import { errorToast, warningToast } from '../../utils/toastify';
import { authAPI } from '../../api';
import { useAuthContext } from '../../context/AuthContext';

function SignUpForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    avatarImage: null, // Store file object here
  });
  const { setUser, setToken } = useAuthContext();

  const { error: submitError, isLoading: submitLoading, sendRequest: postRegister } = useAxios();

  useEffect(() => {
    if (submitError?.errors) {
      submitError.errors.forEach((e) => {
        errorToast(e.msg);
      });
    } else if (submitError?.message) {
      errorToast(submitError.message);
    }
  }, [submitError]);

  const submitValidator = () => {
    const { username, email, password, confirmPassword, avatarImage } = formData;

    const checkArray = [username, email, password, confirmPassword];

    if (checkArray.some((el) => el === '')) {
      warningToast('All fields are required!');
      return false;
    }
    if (password !== confirmPassword) {
      warningToast('Password is not equal to confirm password.');
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = submitValidator();
    if (isValid) {
      const formDataToSend = new FormData();
      formDataToSend.append('username', formData.username);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('password', formData.password);
      if (formData.avatarImage) {
        // console.log( formData.avatarImage);
        formDataToSend.append('avatarImage', formData.avatarImage);
      }

      console.log(formDataToSend);
      postRegister(
        {
          method: 'POST',
          url: authAPI.register,
          data: formDataToSend,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
        (data) => {
          const { accessToken, ...other } = data.data;
          setUser({ ...other });
          setToken({ accessToken });
        }
      );
    }
  };

  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({
      ...prev,
      avatarImage: file,
    }));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormTitle>Sign Up</FormTitle>
      <TextInput
        type="text"
        placeholder="User Name"
        name="username"
        id="username"
        value={formData.username}
        onChange={handleInputChange}
      />
      <TextInput
        type="email"
        placeholder="User Email"
        name="email"
        id="email"
        value={formData.email}
        onChange={handleInputChange}
      />
      <TextInput
        type="password"
        placeholder="Password"
        name="password"
        id="password"
        value={formData.password}
        onChange={handleInputChange}
      />
      <TextInput
        type="password"
        placeholder="Confirm Password"
        name="confirmPassword"
        id="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleInputChange}
      />

      <AvatarInput
        type="file"
        accept="image/*"
        onChange={handleAvatarChange}
      />
    
      {formData.avatarImage && (
        <AvatarPreview src={URL.createObjectURL(formData.avatarImage)} alt="Avatar Preview" />
      )}
      <PrimaryButton type="submit" disabled={submitLoading}>
        {submitLoading ? 'Submitting...' : 'Sign Up'}
      </PrimaryButton>
      <LoginSpan>
        Already have an account ?
        <Link to="/login">
          <span>login</span>
        </Link>
      </LoginSpan>
    </Form>
  );
}

const FormTitle = styled.h1`
  font-size: 1.25rem;
  font-weight: 500;
  letter-spacing: 1px;
  text-align: center;
  margin: 0.5rem 0;
`;

const LoginSpan = styled.p`
  font-size: 0.75rem;

  a {
    text-decoration: none;
  }

  span {
    margin-left: 0.5rem;
    color: #5164e0;
    font-weight: 500;
    text-transform: capitalize;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
`;


const AvatarInput = styled.input`
  margin-top: 1rem;
  padding: 0.5rem;
  border: 2px solid #9fb2f1;
  border-radius: 4px;
  font-size: 1rem;
  width: 80%;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  // transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #007bff; 
  }


  &::placeholder {
    color: #aaa;
  }
`;

const AvatarPreview = styled.img`
  max-width: 100px;
  max-height: 100px;
  height:70px;
  width:70px;
  margin-top: 1rem;
  border-radius: 50%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export default SignUpForm;
