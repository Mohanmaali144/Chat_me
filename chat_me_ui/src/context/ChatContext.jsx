import PropTypes from 'prop-types';
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useAxios } from '../hooks/useAxios';
import { chatAPI } from '../api';
import { useAuthContext } from '../context/AuthContext';
import { useSocketContext } from '../context/SocketContext';
import { socketEmitEvent } from '../socket/emit';

export const ChatContext = createContext({});

export const useChatContext = () => useContext(ChatContext);

function ChatContextProvider({ children }) {
  const { user } = useAuthContext();
  const {
    socketValue: { socket, onlineUsers, messageData }
  } = useSocketContext();
  const [chatInfo, setChatInfo] = useLocalStorage('chat-app-chat-info', null);
  const [contacts, setContacts] = useState([]);
  // const [followers, setFollowers] = useState([]);
  // const [followings, setFollowings] = useState([]);
  // const [blockedUser, setBlockedSUer] = useState([]);

  const { sendRequest: getUserContacts } = useAxios();
  const { sendRequest: updateReadStatus } = useAxios();
  const { sendRequest: blockUserRequest } = useAxios();
  const { sendRequest: unblockUserRequest } = useAxios();
  // const { sendRequest: getFollowers } = useAxios();
  // const { sendRequest: getFollowings } = useAxios();
  // const { sendRequest: getBlockedUser } = useAxios();

  const chatId = chatInfo?._id || null;

  const fetchUserContacts = useCallback(() => {
    if (user) {
      return getUserContacts(
        {
          method: 'GET',
          url: chatAPI.getUserContacts(user._id)
        },
        (data) => {
          const contactsWithOnlineStatus = data.data.map((contact) => ({
            ...contact,
            isOnline: onlineUsers?.some((user) => user.userId === contact._id) || false
          }));
          setContacts(contactsWithOnlineStatus);
        }
      );
    }
  }, [user, getUserContacts, onlineUsers]);

  // fetch user contacts
  useEffect(() => {
    fetchUserContacts();
  }, [fetchUserContacts]);

  const updateContactLatestMessage = useCallback(
    (latestMessageData) => {
      const { updateId, sender, message, updatedAt, unreadCount } = latestMessageData;

      setContacts((prevContact) =>
        prevContact.map((contact) => {
          return contact._id === updateId
            ? {
              ...contact,
              latestMessage: message,
              latestMessageSender: sender,
              latestMessageUpdatedAt: updatedAt,
              unreadCount: chatId === sender ? 0 : unreadCount
            }
            : contact;
        })
      );
    },
    [chatId]
  );

  useEffect(() => {
    if (messageData) {
      const { type, receiver, sender } = messageData;
      updateContactLatestMessage({ ...messageData, updateId: type === 'room' ? receiver : sender });
    }
  }, [messageData, updateContactLatestMessage]);

  const updateMessageStatusToRead = (chatId, type) => {
    updateReadStatus({
      method: 'PUT',
      url: chatAPI.updateReadStatus({
        userId: user._id,
        chatId,
        type
      })
    });

    socketEmitEvent(socket).updateMessageReaders({
      readerId: user._id,
      toId: chatId,
      type
    });
  };

  const handleChatSelect = async (selected) => {
    if (selected._id !== chatId) {
      if (selected.chatType === 'room') {
        socketEmitEvent(socket).enterChatRoom({ roomId: selected._id, message: `${user.name} ` });
      }
      if (chatInfo?.chatType === 'room') {
        socketEmitEvent(socket).leaveChatRoom({ roomId: chatId, message: `${user.name} ` });
      }
      setChatInfo(selected);
      updateMessageStatusToRead(selected._id, selected.chatType);
      setContacts((prevContacts) =>
        prevContacts.map((prev) => (prev._id === selected._id ? { ...prev, unreadCount: 0 } : prev))
      );
    }
  };

  const handleBlockUser = async (userId) => {
    await blockUserRequest({
      method: 'POST',
      url: chatAPI.blockUser(userId)
    });
    setContacts((prev) =>
      prev.map((contact) =>
        contact._id === userId ? { ...contact, isBlocked: true } : contact
      )
    );
  };

  const handleUnblockUser = async (userId) => {
    await unblockUserRequest({
      method: 'POST',
      url: chatAPI.unblockUser(userId)
    });
    setContacts((prev) =>
      prev.map((contact) =>
        contact._id === userId ? { ...contact, isBlocked: false } : contact
      )
    );
  };




  // const fetchFollowers = useCallback(() => {
  //   if (user) {
  //     return getFollowers(
  //       {
  //         method: 'GET',
  //         url: chatAPI.getFollowers(user._id)
  //       },
  //       (data) => {
  //         const contactsWithOnlineStatus = data.data.map((followers) => ({
  //           ...followers,
  //           isOnline: onlineUsers?.some((user) => user.userId === followers._id) || false
  //         }));
  //         setFollowers(contactsWithOnlineStatus);
  //       }
  //     );
  //   }
  // }, [user, fetchFollowers, onlineUsers]);

  // fetch user Follwers
  // useEffect(() => {
  //   fetchFollowers();
  // }, [fetchFollowers]);


  // const fetchFollowings = useCallback(() => {
  //   if (user) {
  //     return getFollowings(
  //       {
  //         method: 'GET',
  //         url: chatAPI.getFollowings(user._id)
  //       },
  //       (data) => {
  //         const contactsWithOnlineStatus = data.data.map((followings) => ({
  //           ...followings,
  //           isOnline: onlineUsers?.some((user) => user.userId === followings._id) || false
  //         }));
  //         setFollowings(contactsWithOnlineStatus);
  //       }
  //     );
  //   }
  // }, [user, fetchFollowings, onlineUsers]);
  // // fetch user Follwers
  // useEffect(() => {
  //   fetchFollowings();
  // }, [fetchFollowings]);



  // getBlocked Users...
  // const fetchBlockedUser = useCallback(() => {
  //   if (user) {
  //     return getBlockedUser(
  //       {
  //         method: 'GET',
  //         url: chatAPI.getBlockedUser(user._id)
  //       },
  //       (data) => {
  //         const contactsWithOnlineStatus = data.data.map((blocked) => ({
  //           ...blocked,
  //           isOnline: onlineUsers?.some((user) => user.userId === blocked._id) || false
  //         }));
  //         setBlockedSUer(contactsWithOnlineStatus);
  //       }
  //     );
  //   }
  // }, [user, fetchFollowings, onlineUsers]);
  // // fetch user Follwers
  // useEffect(() => {
  //   fetchBlockedUser();
  // }, [fetchBlockedUser]);


  return (
    <ChatContext.Provider
      value={{
        chatId,
        chatInfo,
        setChatInfo,
        contacts,

        setContacts,
        handleChatSelect,
        handleBlockUser,
        handleUnblockUser,
        updateContactLatestMessage,
        updateMessageStatusToRead,
        fetchUserContacts,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

ChatContextProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default ChatContextProvider;
