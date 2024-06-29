import React, { useContext, useEffect, useState } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { HiOutlineSun, HiOutlineMoon, HiOutlineArrowTopRightOnSquare } from 'react-icons/hi2';
import { Link } from 'react-router-dom';
import { MdGroupAdd } from 'react-icons/md';
import { useAuthContext } from '../context/AuthContext';
import { useChatContext } from '../context/ChatContext';
import { useSocketContext } from '../context/SocketContext';
import { socketEmitEvent } from '../socket/emit';

function Navbar() {
  const { mode, setMode } = useContext(ThemeContext);
  const { user, setUser, setToken } = useAuthContext();
  const { setChatInfo } = useChatContext();

  const {
    socketValue: { socket, socketId, onlineUsers },
    resetSocketValue
  } = useSocketContext();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (socketId) {
      setShow(true);
    }
  }, [socketId]);

  const handleLogout = () => {
    console.log('logout', socketEmitEvent(socket));
    setUser(null);
    setToken(null);
    setChatInfo(null);
    if (socketId) {
      socketEmitEvent(socket).userOffline(user._id);
      console.log('DISCONNECT');
      resetSocketValue();
      socket.disconnect();
    }
  };

  return (
    <NavContainer>
      <Link to="/">
        <NavLogo>
          <NavImage src="https://www.google.com/imgres?imgurl=https%3A%2F%2Fc8.alamy.com%2Fcomp%2F2M3N693%2Fchat-icon-design-messenger-logo-concept-blue-chat-button-icon-social-media-mobile-messenger-app-icon-modern-colorful-vector-illustration-2M3N693.jpg&tbnid=J9I9N5ik5yNkYM&vet=10CAIQxiAoAGoXChMI0MrghcXkhgMVAAAAAB0AAAAAEBg..i&imgrefurl=https%3A%2F%2Ffull-mark.com.ar%2F%3Fy%3Dchat-icon-download-for-free-%25E2%2580%2593-iconduck-vv-wXzbgnS7&docid=OjqyqlaaorV9vM&w=1300&h=1390&itg=1&q=chat%20logo&ved=0CAIQxiAoAGoXChMI0MrghcXkhgMVAAAAAB0AAAAAEBg" alt="Logo" />
          <NavBrand>Chat_me</NavBrand>
          {show && onlineUsers && <NavCount> Users: {onlineUsers.length || 0}</NavCount>}
        </NavLogo>
      </Link>
      {user ? (
        <NavUser>
          Welcome! <span> {user.name}</span>
        </NavUser>
      ) : null}
      <NavIcons>
        <NavIcon>
          {mode === 'light' ? (
            <HiOutlineSun onClick={() => setMode('dark')} />
          ) : (
            <HiOutlineMoon onClick={() => setMode('light')} />
          )}
        </NavIcon>
        {user ? (
          <>
            <NavIcon>
              <Link to="/open-room">
                <MdGroupAdd />
              </Link>
            </NavIcon>
            <NavIcon>
              <HiOutlineArrowTopRightOnSquare onClick={handleLogout} />
            </NavIcon>
          </>
        ) : null}
      </NavIcons>
    </NavContainer>
  );
}

const NavContainer = styled.nav`
  height: 70px;
  max-width: 1300px;
  margin: 0 auto;
  padding: 1rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;

  background-color: #454fd6;
  color: #ffffff;

  a {
    color: #ffffff;
    text-decoration: none;
  }

  /* Default styles for larger screens (e.g., laptops) */
  width: 100%;
  border: none;
  border-radius: 0;

  @media screen and (max-width: 768px) {
   
    width: 90%;
    border: 1px solid #7a3c0d; 
    border-radius: 15px; /* Rounded corners */
    margin-top: 10px; /* 5px margin on top */
  }
`;

const NavLogo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
`;

const NavImage = styled.img`
  display: block;
  width: 40px;
  height: 40px;
  object-fit: cover;
`;

const NavBrand = styled.h1`
  font-size: 1.25rem;
  font-weight: 900;
  letter-spacing: 1px;
  display: none;

  @media screen and (min-width: 768px) {
    display: block;
  }
`;

const NavCount = styled.p`
  font-size: 0.8rem;
  margin-left: 0.5rem;
`;

const NavUser = styled.h2`
  flex: 1;
  font-size: 1rem;
  text-align: end;
  margin-right: 0.5rem;
  padding: 0 1rem;
  text-transform: capitalize;
  display: none;

  span {
    font-style: italic;
  }

  @media screen and (min-width: 768px) {
    display: block;
  }
`;

const NavIcons = styled.div`
  display: flex;
  align-items: center;
`;

const NavIcon = styled.div`
  width: 40px;
  height: 40px;
  margin: 4px;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: var(--bg-color-main);
  color: var(--main-color);
  cursor: pointer;
  box-shadow: 2px 2px 4px var(--shadow-color);

  &:hover {
    position: relative;
    bottom: 1px;
  }

  a {
    display: flex;
    color: var(--main-color);
  }

  :not(:last-child) {
    margin-right: 0.5rem;
  }
`;

export default Navbar;
