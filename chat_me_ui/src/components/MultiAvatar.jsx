import React from 'react';

const MultiAvatarComponent = ({ size, imageUrls, alt }) => {
    const avatarSize = size === "small" ? 40 : size === "large" ? 80 : 60;

    const style = {
        width: `${avatarSize}px`,
        height: `${avatarSize}px`,
        borderRadius: '50%',
    };

    return (
        <div className="multi-avatar-component" style={style}>
            <img src={imageUrls} alt={alt} style={style} />
        </div>
    );
};

export default MultiAvatarComponent;
