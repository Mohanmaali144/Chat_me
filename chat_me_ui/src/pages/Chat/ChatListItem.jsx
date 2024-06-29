import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { timeFormatter } from '../../utils/timeFormatter';
import {AvatarComponent} from '../../components/AvatarComponent';

function ChatListItem({
  avatarImage,
  name,
  latestMessage,
  latestMessageUpdatedAt,
  unreadCount,
  isOnline,
  handleItemClick
}) {
  return (
    <ChatListItemContainer onClick={handleItemClick}>
      <AvatarComponent onlineStyle={isOnline ? 'dotted' : null} size="medium" imageUrl={avatarImage} alt="avatar" />

      <ListContent>
        <TitleBox>
          <ContentTitle>{name}</ContentTitle>
          <ContentText>{latestMessage}</ContentText>
        </TitleBox>
        <TimeBox>
          <ContentTime>{timeFormatter(latestMessageUpdatedAt)}</ContentTime>
          {unreadCount !== 0 && <ContentUnread>{unreadCount}</ContentUnread>}
        </TimeBox>
      </ListContent>
    </ChatListItemContainer>
  );
}

ChatListItem.propTypes = {
  avatarImage: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  latestMessage: PropTypes.string,
  latestMessageUpdatedAt: PropTypes.string,
  unreadCount: PropTypes.number,
  isOnline: PropTypes.bool,
  handleItemClick: PropTypes.func
};

ChatListItem.defaultProps = {
  latestMessage: '',
  latestMessageUpdatedAt: '',
  unreadCount: 0,
  isOnline: false,
  handleItemClick: () => {}
};

const ChatListItemContainer = styled.li`
  width: 100%;
  min-width: none;
  max-width: 500px;
  height: 70px;
  padding: 1rem;
  margin-bottom: 0.6rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  background-color: #f1f3fd;
  overflow: hidden;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0s, transform 0s, box-shadow 0.3s ease;
  box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;

  &:hover {
    background-color: #e0e7ff;
    transform: scale(1);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
  }
`;

const ListContent = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  border-bottom: 1px solid var(--bg-color-darken);
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
`;

const TitleBox = styled(Box)`
  flex: 1;
  overflow: hidden;
`;

const TimeBox = styled(Box)`
  align-items: flex-end;
  gap: 0.5rem;
`;

const ContentTitle = styled.h2`
  font-size: 1em;
  font-weight: 500;
  margin-bottom: 4px;
  color: #728ae8;
`;

const ContentText = styled.p`
  font-size: 1em;
  font-weight: 400;
  color: #7e7e7e;
  max-width: 100%;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  white-space: pre-wrap;
`;

const ContentTime = styled.p`
  font-size: 0.7em;
  font-weight: 500;
  color: var(--main-color);
  margin-bottom: 8px;
`;

const ContentUnread = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background-color: #5164e0;
  font-size: 0.5em;
  font-weight: 500;
  color: #ffffff;
`;

export default ChatListItem;
