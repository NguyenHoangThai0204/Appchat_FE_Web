import React, { useEffect, useState, useRef } from "react";
import { getApiNoneTokenConversation } from "../api/Callapi"; // Thay Ä‘á»•i hÃ m gá»i API Ä‘á»ƒ láº¥y tin nháº¯n nhÃ³m
import styled from "styled-components";
import io from "socket.io-client";
import { extractTime } from "../extractTime/extractTime";
import ModalImg from "./modalViewImage";
<<<<<<< HEAD
// hÃ¬nh áº£nh cá»§a file
=======
// hình ảnh của file
>>>>>>> b47a0ad4bfcaf4ffeb2f595b8cf8b1696916d026
import { FaFilePdf, FaFileWord, FaFileExcel, FaFilePowerpoint, FaFile, FaEllipsisV } from 'react-icons/fa';

const ChatListGroup = ({ groupId, idLogin }) => {
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [hoveredMessage, setHoveredMessage] = useState(null);

  useEffect(() => {
    const socket = io("ws://localhost:3000");

    socket.on("newGroupMessage", (newMessage) => {
      loadGroupMessages();
    });

    const loadGroupMessages = async () => {
      try {
        const response = await getApiNoneTokenConversation(`/getGroupMessages/${groupId}`);
        setMessages(response.data.messages);
      } catch (error) {
        console.error("Error loading group messages:", error);
        setMessages([]);
      }
    };
    loadGroupMessages();
  }, [groupId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const isFileExtensionAllowed = (filename) => {
    const allowedExtensions = [
      ".pdf",
      ".doc",
      ".docx",
      ".xls",
      ".xlsx",
      ".ppt",
      ".pptx",
    ];
    const fileExtension = filename.slice(filename.lastIndexOf("."));
    return allowedExtensions.includes(fileExtension.toLowerCase());
  };

  const fileName = (filename) => {
    const part = filename.split("/");
    return part[part.length - 1];
  };

  const allowedVideoExtensions = [".mp4", ".avi", ".mov", ".mkv", ".wmv"];
  const isVideoExtensionAllowed = (filename) => {
    const fileExtension = filename.slice(filename.lastIndexOf("."));
    return allowedVideoExtensions.includes(fileExtension.toLowerCase());
  };

  const [isZoomed, setIsZoomed] = useState(false);

  const handleImageClick = (imgUrl) => {
    setSelectedImage(imgUrl);
    setIsZoomed(true);
  };

  const handleSaveImage = () => {
    const fileName = selectedImage.split('/').pop();
    const link = document.createElement('a');
    link.href = selectedImage;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const getFileIcon = (filename) => {
    const fileExtension = filename.slice(filename.lastIndexOf(".")).toLowerCase();
    switch (fileExtension) {
      case ".pdf":
        return <FaFilePdf style={{ height: 50, width: 70 }} />;
      case ".doc":
      case ".docx":
        return <FaFileWord style={{ height: 50, width: 70 }} />;
      case ".xls":
      case ".xlsx":
        return <FaFileExcel style={{ height: 50, width: 70 }} />;
      case ".ppt":
      case ".pptx":
        return <FaFilePowerpoint style={{ height: 50, width: 70 }} />;
      default:
        return <FaFile style={{ height: 50, width: 70 }} />;
    }
  };

  const closeModal = () => {
    setIsZoomed(false);
    setSelectedImage(null);
  };

  const handleDeleteMessage = (message) => {
<<<<<<< HEAD
    console.log("XÃ³a tin nháº¯n:", message);
  };

  const handleRecallMessage = (message) => {
    console.log("Thu há»“i tin nháº¯n:", message);
  };

  const handleForwardMessage = (message) => {
    console.log("Chuyá»ƒn tiáº¿p tin nháº¯n:", message);
=======
    console.log("Xóa tin nhắn:", message);
  };

  const handleRecallMessage = (message) => {
    console.log("Thu hồi tin nhắn:", message);
  };

  const handleForwardMessage = (message) => {
    console.log("Chuyển tiếp tin nhắn:", message);
>>>>>>> b47a0ad4bfcaf4ffeb2f595b8cf8b1696916d026
  };

  const handleShowMenu = (message) => {
    setHoveredMessage(message);
  };

  const handleHideMenu = () => {
    setHoveredMessage(null);
  };

  return (
    <div style={{ boxSizing: "border-box", padding: "5px", overflowY: "visible" }}>
      {messages && messages.length > 0 ? (
        messages.map((message, index) => (
          <div style={{ flex: 1 }} key={index}>
            <ItemMessageContainer
              ref={messagesEndRef}
              senderId={message.senderId}
              idLogin={idLogin}
              onMouseEnter={() => handleShowMenu(message)}
              onMouseLeave={handleHideMenu}
            >
              {message.senderId !== idLogin ? (
                <Avatar src={message.senderAvatar} alt="Avatar" />
              ) : null}
              <ItemMessageContent>
                {message.message.startsWith("https://") ? (
                  isVideoExtensionAllowed(message.message) ? (
                    <video
                      controls
                      style={{
                        borderRadius: ".7em",
                        height: 200,
                        marginRight: "1px",
                      }}
                    >
                      <source src={message.message} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ) : isFileExtensionAllowed(message.message) ? (
                    <a href={message.message} target="_blank" rel="noreferrer">
                      {getFileIcon(fileName(message.message))}{" "}
                      {fileName(message.message)}
                    </a>
                  ) : (
                    <div>
                      <img
                        src={message.message}
                        alt="áº£nh"
                        style={{
                          borderRadius: ".7em",
                          width: "150px",
                          height: "150px",
                          margin: "1.5px",
                          cursor: "pointer",
                        }}
                        onClick={() => handleImageClick(message.message)}
                      />
                      <ModalImg
                        isZoomed={isZoomed}
                        imageUrl={selectedImage}
                        handleSaveImage={handleSaveImage}
                        closeModal={closeModal}
                      />
                    </div>
                  )
                ) : (
                  <>
                    <span
                      style={{
                        borderRadius: ".7em",
                        padding: "7px",
                        boxShadow: `rgba(0, 0, 0, 0.1) 0px 1px 2px`,
                        maxWidth: `${message.message.length * 10}px`,
                        margin: "1.5px",
                      }}
                    >
                      {message.message}
                    </span>
                  </>
                )}
                <MessageTime>{extractTime(message.createdAt)}</MessageTime>
              </ItemMessageContent>
              {message.senderId === idLogin ? (
                <Avatar src={message.senderAvatar} alt="Avatar" />
              ) : null}
              {hoveredMessage === message && (
                <MessageMenu>
                  <FaEllipsisV />
                  <MenuOptions>
<<<<<<< HEAD
                    <MenuItem onClick={() => handleDeleteMessage(message)}>XÃ³a</MenuItem>
                    <MenuItem onClick={() => handleRecallMessage(message)}>Thu há»“i</MenuItem>
                    <MenuItem onClick={() => handleForwardMessage(message)}>Chuyá»ƒn tiáº¿p</MenuItem>
=======
                    <MenuItem onClick={() => handleDeleteMessage(message)}>Xóa</MenuItem>
                    <MenuItem onClick={() => handleRecallMessage(message)}>Thu hồi</MenuItem>
                    <MenuItem onClick={() => handleForwardMessage(message)}>Chuyển tiếp</MenuItem>
>>>>>>> b47a0ad4bfcaf4ffeb2f595b8cf8b1696916d026
                  </MenuOptions>
                </MessageMenu>
              )}
            </ItemMessageContainer>
            <br />
            <div />
          </div>
        ))
      ) : (
        <div>HÃ£y chat ngay, Ä‘á»ƒ hiá»ƒu hÆ¡n vá» nhau </div>
      )}
    </div>
  );
};

export default ChatListGroup;

const ItemMessageContainer = styled.div`
  display: flex;
  justify-content: ${({ senderId, idLogin }) =>
    senderId === idLogin ? "flex-end" : "flex-start"};
  margin-bottom: 10px;
  position: relative;
`;

const ItemMessageContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const Avatar = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin: 0 5px;
`;

const MessageTime = styled.p`
  font-style: italic;
  margin: 1px;
`;

const MessageMenu = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 280px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1;
`;

const MenuOptions = styled.div`
position: absolute;
background-color: #fff;
border: 1px solid #ccc;
border-radius: 4px;
padding: 8px;
box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
z-index: 1;
top: -40px;
right: 0;
`;

const MenuItem = styled.div`
  padding: 4px 8px;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;