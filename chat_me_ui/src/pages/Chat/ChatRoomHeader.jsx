import React, { useState } from 'react';
import styled from 'styled-components';
import { useChatContext } from '../../context/ChatContext';
import { IoArrowUndo } from 'react-icons/io5';
import { AvatarComponent } from '../../components/AvatarComponent';
import MultiAvatarComponent from '../../components/MultiAvatar';
import Modal from '../../components/Modal';
import { AvatarView } from '../../components/AvatarView';
function ChatRoomHeader() {
  const { chatInfo, setChatInfo, contacts } = useChatContext();
  const [showMembers, setShowMembers] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);  // State to handle modal visibility

  const isRoom = chatInfo?.chatType === 'room';
  const roomUsersId = chatInfo?.users || [];
  const multipleAvatars = roomUsersId.map((userId) => {
    const user = contacts?.find((contact) => contact._id === userId);

    return user ? (
      <MultiAvatarComponent
        key={userId}
        size="small"
        imageUrls={user.avatarImage ? `http://localhost:5000/${user.avatarImage}` : "/user.png"}
        alt="avatar"
      />
    ) : null;
  });

  const toggleShowMember = () => {
    if (!isRoom) return;
    setShowMembers((prev) => !prev);
  };

  const handleAvatarClick = () => {
    console.log("hello");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    chatInfo !== null && (
      <>
        <RoomHeader>
          <HeaderIcon onClick={() => setChatInfo(null)}>
            <IconWrapper>
              <IoArrowUndo />
            </IconWrapper>
          </HeaderIcon>
          <HeaderContent onClick={toggleShowMember}>
            {showMembers ? (
              <MembersBox>{multipleAvatars}</MembersBox>
            ) : (
              <HeaderName isRoom={isRoom}>
                {chatInfo?.name}
              </HeaderName>
            )}
          </HeaderContent>
          <HeaderMembers onClick={handleAvatarClick} >
            <AvatarComponent
              size="small"
              imageUrl={chatInfo?.avatarImage ? `http://localhost:5000/${chatInfo.avatarImage}` : '/user.png'}

            />
          </HeaderMembers>
        </RoomHeader>
        <Modal show={isModalOpen} onClose={closeModal}>
          <ModalContent>
           
            < AvatarView  
            size="medium" 
            imageUrl={chatInfo?.avatarImage ? `http://localhost:5000/${chatInfo.avatarImage}` : '/user.png'} />
            <h4 style={{color:"blue", margin: "8px"}}>{chatInfo?.name}</h4>
          
          </ModalContent>
        </Modal>
      </>
    )
  );
}

const RoomHeader = styled.div`
  padding: 0 1rem;
  height: 60px;
  background: rgb(159,178,241);
  background: linear-gradient(90deg, rgba(159,178,241,1) 0%, rgba(69,79,214,1) 100%);
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 0.5rem;
  position: relative;
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const MembersBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem; /* Add spacing between avatars */
  z-index:10;
`;

const HeaderIcon = styled.div`
  justify-self: flex-start;
  font-size: 1.25rem;
  color: #1e1e4d;
  cursor: pointer;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HeaderName = styled.h2`
  font-size: 1.15rem;
  font-weight: bold;
  color: #ffffff;
  cursor: ${(props) => (props.isRoom ? 'pointer' : 'default')};
  text-transform: capitalize;
`;

const HeaderMembers = styled.div`
  justify-self: flex-end;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

export default ChatRoomHeader;
