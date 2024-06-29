import PropTypes from 'prop-types';
import { forwardRef, useRef, useImperativeHandle } from 'react';
import styled from 'styled-components';
import Avatar from '../../components/Avatar';
import { useAuthContext } from '../../context/AuthContext';
import { useChatContext } from '../../context/ChatContext';
import { timeFormatter } from '../../utils/timeFormatter';
import { AvatarComponent } from '../../components/AvatarComponent';

const ChatMessage = forwardRef(function ChatMessage({ sender, avatarImage, _id, message, updatedAt, readers }, ref) {
  const { user } = useAuthContext();
  const { chatInfo } = useChatContext();
  const messageRef = useRef(null);

  useImperativeHandle(
    ref,
    () => {
      return {
        scrollIntoView() {
          messageRef.current.scrollIntoView({
            behavior: 'smooth'
          });
        }
      };
    },
    []
  );

  const fromSelf = user._id === sender;
  const isRoom = chatInfo.chatType === 'room';
console.log(avatarImage);
  return (
    <Message className={fromSelf ? 'self' : null} ref={messageRef}>
      <AvatarComponent size={"small"} imageUrl={`http://localhost:5000/${avatarImage}`} />
      <Text className={fromSelf ? 'self' : null}>{message}</Text>
      <MessageDetail>
        {readers.length > 0 && fromSelf && <Status>Read {isRoom && readers.length}</Status>}
        <Time>{timeFormatter(updatedAt)}</Time>
      </MessageDetail>
    </Message>
  );
});

ChatMessage.propTypes = {
  sender: PropTypes.string.isRequired,
  avatarImage: PropTypes.string.isRequired,
  _id: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  updatedAt: PropTypes.string.isRequired,
  readers: PropTypes.array.isRequired
};

const Message = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  margin: 1.5rem 0;

  &.self {
    flex-direction: row-reverse;
    align-self: flex-end;
  }

  @media (max-width: 768px) {
    gap: 0.3rem;
    margin: 1rem 0;
  }
`;

const Text = styled.p`
  padding: 1rem 1rem;
  margin-left: 0.5rem;
  background-color: #dfe4fa;
  border-radius: 20px;
  border-top-left-radius: 4px;
  max-width: 55%;
  font-weight: 500;
  overflow: hidden;
  word-wrap: break-word;
  white-space: pre-wrap;

  &.self {
    border-top-right-radius: 2px;
    border-top-left-radius: 20px;
    background-color: #728ae8;
    color: ${(props) => (props.theme.mode === 'light' ? 'var(--bg-color-main)' : 'var(--main-color)')};
  }

  @media (max-width: 768px) {
    padding: 0.5rem 0.7rem;
    margin-left: 0.3rem;
    font-size: 0.8rem;
  }
`;

const MessageDetail = styled.div`
  align-self: flex-end;
  color: #000;

  @media (max-width: 768px) {
    font-size: 0.7rem;
  }
`;

const Status = styled.span`
  font-size: 0.75rem;
  text-transform: capitalize;
  font-weight: 400;

  @media (max-width: 768px) {
    font-size: 0.6rem;
  }
`;

const Time = styled.p`
  font-size: 0.75rem;
  font-weight: 500;
  margin-bottom: 4px;

  @media (max-width: 768px) {
    font-size: 0.6rem;
    margin-bottom: 2px;
  }
`;

export default ChatMessage;
