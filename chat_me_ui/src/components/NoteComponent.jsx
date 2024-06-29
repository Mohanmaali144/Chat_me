import React from 'react';
import styled from 'styled-components';

const UserProfilesContainer = styled.div`
  width: 100%;
  overflow-x: scroll;
  white-space: nowrap;
`;

const UserProfilesWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px; /* Reduced gap between cards */
`;

const UserProfileCard = styled.div`
  background-color: #f0f0f0;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: inline-block;
  margin: 12px;
  padding: 12px;
  text-align: center;
  width: 150px; /* Reduced width of each card */
`;

const UserAvatar = styled.img`
  border-radius: 50%;
  height: 100px; /* Height remains the same */
  width: 100px; /* Width remains the same */
`;

const UserName = styled.h3`
  font-size: 1em; /* Reduced font size */
  margin: 8px 0;
`;

const UserNotes = styled.p`
  color: #666;
  font-size: 0.875em; /* Reduced font size */
`;

const UserProfiles = ({ users }) => {
  return (
    <UserProfilesContainer>
      <UserProfilesWrapper>
        {users.map((user, index) => (
          <UserProfileCard key={index}>
            <UserAvatar src={user.avatar} alt={`${user.name}'s avatar`} />
            <UserName>{user.name}</UserName>
            <UserNotes>{user.notes}</UserNotes>
          </UserProfileCard>
        ))}
      </UserProfilesWrapper>
    </UserProfilesContainer>
  );
};

export default UserProfiles;
