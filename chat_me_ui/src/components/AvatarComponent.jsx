



import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const AvatarComponent = ({ onlineStyle, size, imageUrl, alt }) => {
    return (
        <StyledAvatar onlineStyle={onlineStyle} size={size}>
            <AvatarImage src={imageUrl} alt={alt} />
        </StyledAvatar>
    );
};

AvatarComponent.propTypes = {
    onlineStyle: PropTypes.string,
    size: PropTypes.oneOf(['small', 'medium', 'large']), 
    imageUrl: PropTypes.string.isRequired, // imageUrl is required and should be a string
    alt: PropTypes.string
};

AvatarComponent.defaultProps = {
    size: 'medium', 
};





const StyledAvatar = styled.div`
  position: relative;
  display: inline-block; 

  &::after {
    content: '';
    width: 0.9rem;
    height: 0.9rem;
    background-color: ${(props) => (props.onlineStyle === 'dotted' ? 'green' : 'transparent')};
    filter: contrast(150%) brightness(105%);
    border-radius: 50%;
    position: absolute;
    bottom: 0;
    right: 0;
  }

  ${(props) => {
        switch (props.size) {
            case 'small':
                return css`
          width: 35px;
          height: 35px;
        `;
            case 'medium':
                return css`
          width: 45px;
          height: 45px;
        `;
            case 'large':
            default:
                return css`
          width: 60px;
          height: 60px;
        `;
        }
    }}
`;

const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  filter: saturate(75%);
  border-radius: 50%;
`;


export { AvatarComponent};
