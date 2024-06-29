import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

function Avatar({ onlineStyle, size, src, alt }) {

  console.log(src);
  return (
    <StyledAvatar onlineStyle={onlineStyle} size={size}>

      {/* <AvatarImage src={src} alt={alt} /> */}
      <AvatarImage src={"http://localhost:5000/public/images/avatarImage-1718786845113-827097897.jpg"} alt={alt} />
    </StyledAvatar>
  );
}

Avatar.propTypes = {
  onlineStyle: PropTypes.string,
  size: PropTypes.string,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string
};

export function MultiAvatar({ size, src, alt }) {
  return (
    <StyledMultiAvatar size={size}>
      <AvatarImage src={src} alt={alt} />
    </StyledMultiAvatar>
  );
}

MultiAvatar.propTypes = {
  size: PropTypes.string,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string
};

const StyledAvatar = styled.div`
  position: relative;
  &::after {
    content: '';
    width: 0.9rem;
    height: 0.9rem;
    background-color: ${(props) => (props.onlineStyle === 'dotted' ? 'var(--warning)' : 'transparent')};
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
          min-width: 35px;
          min-height: 35px;
          width: 35px;
          height: 35px;
        `;
      case 'medium':
        return css`
          min-width: 45px;
          min-height: 45px;
          width: 45px;
          height: 45px;
          z-index: 1000;
          
        `;
      default:
        return css`
          min-width: 60px;
          min-height: 60px;
          width: 60px;
          height: 60px;
          z-index: 1000;
        `;
    }
  }}
`;

const AvatarImage = styled.img`
  object-fit: cover;
  object-position: center;
  filter: saturate(75%);
  border-radius: 50%;
  z-index: 1000;

`;

const StyledMultiAvatar = styled(StyledAvatar)`
  transform: scale(1);

  &:not(:first-child) {
    margin-left: -8px;
  }
`;

export default Avatar;
