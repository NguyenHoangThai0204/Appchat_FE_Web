import React, { useEffect, useState, useRef } from "react";
import { getApiNoneTokenMessage } from "../api/Callapi";
import styled from "styled-components";
import io from "socket.io-client";
import { extractTime } from "../extractTime/extractTime";

const Chat = ({ idSelector, idLogin }) => {
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const socket = io("ws://localhost:3000");

    // Lắng nghe tin nhắn mới từ máy chủ WebSocket
    socket.on("newMessage", (newMessage) => {
      // Tải lại tin nhắn
      loadMessage();
    });
    const loadMessage = async () => {
      try {
        const response = await getApiNoneTokenMessage(
          "/getMessages/" + idLogin + "?senderId=" + idSelector
        );
        setMessages(response.data);
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
    const fileExtension = filename.slice(filename.lastIndexOf(".")); // Lấy phần từ dấu . cuối cùng đến hết chuỗi
    return allowedExtensions.includes(fileExtension.toLowerCase()); // Chuyển đuôi file về chữ thường để so sánh
  };
  const fileName = (filename) => {
    const part = filename.split("/");
    const name = part[part.length - 1];
    return name;
  };

  return (
    <div
      style={{ boxSizing: "border-box", padding: "5px", overflowY: "visible" }}
    >
      {messages && messages.length > 0 ? (
        messages.map((message, index) => (
          <div style={{ flex: 1 }} key={index}>
            <ItemMessage
              ref={messagesEndRef}
              senderId={message.senderId}
              idLogin={idLogin}
            >
              {message.message.startsWith("https://") ? (
                isFileExtensionAllowed(message.message) ? (
                  <a href={message.message} target="_blank" rel="noreferrer">
                    {fileName(message.message)}
                  </a>
                ) : (
                  <img
                    src={message.message}
                    alt="ảnh"
                    style={{
                      borderRadius: ".7em",
                      width: "150px",
                      height: "150px",
                      margin: "1.5px",
                    }}
                  />
                )
              ) : (
                // Nếu không phải là đường dẫn URL, hiển thị tin nhắn thông thường
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

              <p style={{ fontStyle: "italic", margin: "1px" }}>
                {extractTime(message.createdAt)}
              </p>
            </ItemMessage>
            <br />
            <div />
          </div>
        ))
      ) : (
        <div>Hãy chat ngây, để hiểu hơn về nhau</div>
      )}
    </div>
  );
};

export default Chat;

const ItemMessage = styled.div`
  border-radius: 8px;
  display: flow;
  width: 100%;
  color: black;
  height: max-content;
  margin: 5px 0;
  word-wrap: break-word;
  flex: 1;
  text-align: ${({ senderId, idLogin }) =>
    senderId === idLogin ? "right" : "left"};
`;
