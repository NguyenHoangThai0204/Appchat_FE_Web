import React, { useEffect, useState, useRef } from "react";
import { getApiNoneTokenMessage, getApiNoneToken } from "../api/Callapi";
import styled from "styled-components";
import io from "socket.io-client";
import { extractTime } from "../extractTime/extractTime";
import ModalImg from "./modalViewImage";
import { FaFilePdf, FaFileWord, FaFileExcel, FaFilePowerpoint, FaFile } from 'react-icons/fa';

const Chat = ({ idSelector, idLogin }) => {
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [hoveredMessage, setHoveredMessage] = useState(null);

  useEffect(() => {
    const socket = io("ws://localhost:3000");

    socket.on("newMessage", (newMessage) => {
      loadMessage();
    });

    const loadMessage = async () => {
      try {
        const response = await getApiNoneTokenMessage(
          `/getMessages/${idLogin}?senderId=${idSelector}`
        );
        const messagesWithAvatar = await Promise.all(
          response.data.map(async (message) => {
            const senderDetails = await getApiNoneToken(
              `/getDetails/${message.senderId}`
            );

            return {
              ...message,
              senderAvatar: senderDetails.data.data.avatar,
            };
          })
        );
        setMessages(messagesWithAvatar);
      } catch (error) {
        console.error("Error loading messages:", error);
        setMessages([]);
      }
    };
    loadMessage();
  }, [idLogin, idSelector]);

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

  const closeModal = () => {
    setIsZoomed(false);
    setSelectedImage(null);
  };

  const getFileIcon = (filename) => {
    const fileExtension = filename.slice(filename.lastIndexOf(".")).toLowerCase();
    switch (fileExtension) {
      case ".pdf":
        return <FaFilePdf style={{ height: 20, width: 40 , color: "orange" }} />;
      case ".doc":
      case ".docx":
        return <FaFileWord style={{ height: 20, width: 40 , color: "blue"}} />;
      case ".xls":
      case ".xlsx":
        return <FaFileExcel style={{ height: 20, width: 40 , color: "green" }} />;
      case ".ppt":
      case ".pptx":
        return <FaFilePowerpoint style={{ height: 20, width: 40 , color: "brick " }} />;
      default:
        return <FaFile style={{ height: 50, width: 70 }} />;
    }
  };

  const handleDeleteMessage = (message) => {
    // Gá»i API xÃ³a tin nháº¯n vÃ  cáº­p nháº­t state messages
  };

  const handleRecallMessage = (message) => {
    // Gá»i API thu há»“i tin nháº¯n vÃ  cáº­p nháº­t state messages
  };

  const handleForwardMessage = (message) => {
    // Hiá»ƒn thá»‹ giao diá»‡n chá»n ngÆ°á»i nháº­n Ä‘á»ƒ chuyá»ƒn tiáº¿p tin nháº¯n
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
            >
              {message.senderId !== idLogin ? (
                <Avatar src={message.senderAvatar} alt="Avatar" />
              ) : null}
              <ItemMessageContent
                onMouseEnter={() => setHoveredMessage(message)}
                onMouseLeave={() => setHoveredMessage(null)}
              >
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
                    <FileLink href={message.message} target="_blank" rel="noreferrer">
                      {getFileIcon(fileName(message.message))}
                      <FileName>{fileName(message.message)}</FileName>
                    </FileLink>
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
                {hoveredMessage === message && (
                  <MessageOptions>
                    <MessageOption onClick={() => handleDeleteMessage(message)}>
                      XÃ³a
                    </MessageOption>
                    <MessageOption onClick={() => handleRecallMessage(
                      message)}>
                      Thu há»“i
                    </MessageOption>
                    <MessageOption onClick={() => handleForwardMessage(message)}>
                      Chuyá»ƒn tiáº¿p
                    </MessageOption>
                  </MessageOptions>
                )}
              </ItemMessageContent>
              {message.senderId === idLogin ? (
                <Avatar src={message.senderAvatar} alt="Avatar" />
              ) : null}
            </ItemMessageContainer>
            <br />
            <div />
          </div>
        ))
      ) : (
        <div>HÃ£y chat ngay, Ä‘á»ƒ hiá»ƒu hÆ¡n vá» nhau</div>
      )}
    </div>
  );
};

export default Chat;

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
  position: relative;
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

const MessageOptions = styled.div`
  position: absolute;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  z-index: 1;
  top: -110px;
  right: -50px;
`;

const MessageOption = styled.div`
  cursor: pointer;
  padding: 5px 8px;

  &:hover {
    background-color: #f0f0f0;
  }
`;
const FileLink = styled.a`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: inherit;
`;
const FileName = styled.span`
  margin-top: -10px; /* Di chuyển tên file lên phía trên */
`;