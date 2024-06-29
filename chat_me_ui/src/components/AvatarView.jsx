



import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const AvatarView = ({ size, imageUrl, alt }) => {
    return (
        <StyledAvatar size={size}>
            <AvatarImage src={imageUrl} alt={alt} />
        </StyledAvatar>
    );
};

AvatarView.propTypes = {
    size: PropTypes.oneOf(['small', 'medium', 'large']), 
    imageUrl: PropTypes.string.isRequired,
    alt: PropTypes.string
};

AvatarView.defaultProps = {
    size: 'medium', 
};





const StyledAvatar = styled.div`
  position: relative;
  display: inline-block; 


  ${(props) => {
        switch (props.size) {
            case 'small':
                return css`
          width: 100px;
          height: 100px;
        `;
            case 'medium':
                return css`
          width: 300px;
          height: 300px;
        `;
            case 'large':
            default:
                return css`
          width: 500px;
          height: 500px;
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
  border-radius: 5px;
`;


export { AvatarView};
