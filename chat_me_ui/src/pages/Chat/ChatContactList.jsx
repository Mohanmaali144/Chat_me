import React, { useState } from 'react';
import styled from 'styled-components';
import ListItem from './ChatListItem';
import { useChatContext } from '../../context/ChatContext';
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';

function ChatContactList() {
  const { contacts, handleChatSelect, handleBlockUser, handleUnblockUser } = useChatContext();
  const [display, setDisplay] = useState({
    rooms: true,
    users: true,
  });

  // Separate contacts into 'rooms' and 'users' groups
  const contactGroups = contacts.reduce(
    (prev, curr) => {
      curr?.chatType === 'room' ? prev.rooms.push(curr) : prev.users.push(curr);
      return prev;
    },
    {
      rooms: [],
      users: [],
    }
  );

  // Toggle display of rooms or users group
  const handleToggleDisplay = (key) => {
    setDisplay((prev) => ({ ...prev, [key]: !display[key] }));
  };

  // Render each group of contacts
  const renderedGroups = Object.entries(contactGroups).map(([key, values]) => {
    const renderedContacts = values.map((contact) => {
      const { _id, avatarImage, isBlocked, ...otherContact } = contact;
      return (
        <ListItem
          key={_id}
          contactId={_id}
          avatarImage={avatarImage ? `http://localhost:5000/${avatarImage}` : '/user.png'}
          handleItemClick={() => handleChatSelect(contact)}
          isBlocked={isBlocked}
          handleBlockUser={() => handleBlockUser(_id)}
          handleUnblockUser={() => handleUnblockUser(_id)}
          {...otherContact}
        />
      );
    });

    return (
      <ListGroup key={key}>
        <GroupTitle onClick={() => handleToggleDisplay(key)}>
          {key}
          {display[key] ? <BiChevronDown /> : <BiChevronUp />}
        </GroupTitle>
        {display[key] ? renderedContacts : null}
      </ListGroup>
    );
  });

  return <List>{renderedGroups}</List>;
}

const List = styled.div`
  width: 100%;
  max-width: 480px;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;

  // Custom scrollbar
  &::-webkit-scrollbar {
    background-color: #3335c2;
    width: 6px;

    &-thumb {
      background-color: #3335c2;
      border-radius: 8px;
    }
  }
`;

const ListGroup = styled.ul`
  width: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const GroupTitle = styled.h3`
  font-size: 1rem;
  font-weight: 500;
  color: #000;
  align-self: flex-start;
  margin-bottom: 8px;
  text-transform: capitalize;
  cursor: pointer;
`;

export default ChatContactList;
