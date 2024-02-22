/* eslint-disable no-undef */
import React from "react";
import styled from "styled-components";
import { MdOutlineGroupAdd, MdOutlinePersonAddAlt1 } from "react-icons/md";
import { CiVideoOn } from "react-icons/ci";
import { IoIosSearch } from "react-icons/io";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { AiOutlineUsergroupDelete } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";

export default class MessageScreen extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
    this.state = {
      activeContentTab: "Prioritize",
      users: [
        { id: "1", name: "Người dùng 1", email: "user1@example.com" },
        { id: "2", name: "Thành viên Mến", email: "user2@example.com" },
        { id: "3", name: "Nguyễn Hoàng Thái", email: "user1@example.com" },
        { id: "4", name: "Lê Thị Ngọc Mai", email: "user2@example.com" },
        { id: "5", name: "Nguyễn Văn Việt", email: "user1@example.com" },
        { id: "6", name: "Nguyễn Văn Long", email: "user2@example.com" },
        { id: "1", name: "Người dùng 1", email: "user1@example.com" },
        { id: "2", name: "Thành viên Mến", email: "user2@example.com" },
        { id: "3", name: "Nguyễn Hoàng Thái", email: "user1@example.com" },
        { id: "4", name: "Lê Thị Ngọc Mai", email: "user2@example.com" },
        { id: "5", name: "Nguyễn Văn Việt", email: "user1@example.com" },
        { id: "6", name: "Nguyễn Văn Long", email: "user2@example.com" },
        // Thêm thông tin người dùng khác nếu cần
      ],
    };
  }
  handleContentTab(tab) {
    this.setState({
      activeContentTab: tab,
    });
  }
  renderContentMessage() {
    return (
      <ChatMessage className="ChatMessage">
        <ContentMessage className="ContentMessage">
          <HeaderContentMessage className="HeaderContentMessage">
            <LeftMessage>
              <Avatar style={{ margin: "0" }} className="Avatar"></Avatar>
              <InputName style={{ marginLeft: "10px" }}>Your name</InputName>
            </LeftMessage>
            <IconGroupMessage className="HeaderContentMessage">
              <MdOutlineGroupAdd
                style={{ fontSize: "24px" }}
                className="AddPersonGroup"
              />
              <IoIosSearch
                style={{ fontSize: "24px" }}
                className="FindMessage"
              />
              <CiVideoOn style={{ fontSize: "24px" }} className="VideoCall" />
            </IconGroupMessage>
          </HeaderContentMessage>
          <BodyContentMessage className="BodyContentMessage"></BodyContentMessage>
        </ContentMessage>
        <InforMessage className="InforMessage">
          <HeaderInforMessage className="HeaderInforMessage">
            <InputInfor>Thông tin nhóm</InputInfor>
          </HeaderInforMessage>
          <BodyInforMessage className="BodyInforMessage">
            <BodyInforTop className="BodyInforTop">
              <Avatar className="Avatar"></Avatar>
              <InputName>Your Name</InputName>
              <MenutoGroup className="MenuToGroup">
                <AddMemberToGroup className="AddMemberToGroup">
                  <button style={{
                    marginLeft: 30,
                    width: "30px",
                    height: "30px",
                    background: "#f0f0f0",
                    borderRadius: "50%" ,
                  }} >
                    <AiOutlineUsergroupAdd />
                  </button>
                  <h2></h2>
                  <span style={{fontSize:"12px"}}>Thêm thành viên</span>
                </AddMemberToGroup>
                <DeleteMember className="DeleteMember">
                  <button style={{
                      marginLeft: 20,
                      width: "30px",
                      height: "30px",
                      background: "#f0f0f0",
                      borderRadius: "50%" ,
                    }} >
                      <AiOutlineUsergroupDelete/>
                  </button>
                  <h2></h2>
                  <span style={{fontSize:"12px"}}>Xóa thành viên</span>
                </DeleteMember>
                <DeleteGroup className ="DeleteGroup">
                  <button style={{  
                      marginLeft: 10,
                      width: "30px",
                      height: "30px",
                      background: "#f0f0f0",
                      borderRadius: "50%" ,
                    }} >
                    <MdDeleteOutline/>
                  </button>
                  <h2></h2>
                  <span style={{fontSize:"12px"}}>Xóa nhóm</span>
                </DeleteGroup>
              </MenutoGroup>
            </BodyInforTop>
            
            <BodyInforBottom className="BodyInforBottom">
              <h3>Thành viên nhóm</h3>
            </BodyInforBottom>
          </BodyInforMessage>
        </InforMessage>
      </ChatMessage>
    );
  }
  renderContentTab() {
    const { activeContentTab, users } = this.state;
    if (activeContentTab === "Orther") {
      return <h1>Orther</h1>;
    } else if (activeContentTab === "Prioritize") {
      return (
        <div style={{ overflowY: "auto", maxHeight: "100vh" }}>
          {users.map((user) => (
            <button
              
              style={{
                width: "100%",
                outline: "0",
                background: "white",
                border: "none",
              }}
            >
              <ItemUser key={user.id}>
                <Avatar style={{ margin: "0" }} className="Avatar"></Avatar>
                <div
                  style={{
                    display: "block",
                    width: "80%",
                    padding: "5px 0 0 0",
                  }}
                >
                  <h3
                    style={{
                      fontWeight: "530",
                      fontSize: 18,
                      margin: "0 0 0 5px",
                      padding: "0",
                      textAlign: "left",
                      position: "relative",
                      height: "50%",
                      top: "5%",
                    }}
                  >
                    {user.name}
                  </h3>
                  <h5
                    style={{
                      fontWeight: "400",
                      margin: "0 0 0 5px",
                      padding: "0",
                      position: "relative",
                      top: "9%",
                      height: "50%",
                      textAlign: "left",
                      fontStyle: "italic",
                    }}
                  >
                    Hoạt động 15 phút trước
                  </h5>
                </div>
              </ItemUser>
            </button>
          ))}
        </div>
      );
    }
  }
  renderTab() {
    return (
      <ListMessage className="ListMessage">
        <TabsList className="Tabs">
          <TabList
            className="Tab"
            $activeContentTab={this.state.activeContentTab === "Prioritize"}
            onClick={() => this.handleContentTab("Prioritize")}
          >
            Ưu tiên
          </TabList>
          <TabList
            className="Tab"
            $activeContentTab={this.state.activeContentTab === "Orther"}
            onClick={() => this.handleContentTab("Orther")}
          >
            Khác
          </TabList>
        </TabsList>
        <ContentTab className="ContentTab">
          {this.renderContentTab()}
        </ContentTab>
      </ListMessage>
    );
  }
  render() {
    return (
      <>
        <Content>
          <ListPerson className="ListPersonMessage">
            <HeaderList className="HeaderList">
              <Search className="Search">
                <button
                  style={{ fontSize: "15px", padding: "5px", border: "none" }}
                >
                  <i style={{ width: "100%" }} class="ti-search"></i>
                </button>
                <input
                  style={{
                    fontSize: "15px",
                    padding: "5px",
                    outline: "0",
                    border: "none",
                    background: "rgb(240,240,240)",
                  }}
                  placeholder="Tìm kiếm"
                ></input>
              </Search>
              <button
                style={{
                  border: "none",
                  fontSize: "15px",
                  background: "white",
                  padding: "0",
                }}
              >
                <MdOutlinePersonAddAlt1 style={{ fontSize: "24px" }} />
              </button>
              <button
                style={{
                  border: "none",
                  fontSize: "15px",
                  background: "white",
                  padding: "0",
                }}
              >
                <MdOutlineGroupAdd style={{ fontSize: "24px" }} />
              </button>
            </HeaderList>
            <ContentList className="ContentListMessage">
              {this.renderTab()}
            </ContentList>
          </ListPerson>
          <ContentBody className="ContentBodyMessage">
                {this.renderContentMessage()}
          </ContentBody>
        </Content>
      </>
    );
  }
}

const Text = styled.div`

`;
const BodyInforTop = styled.div`
overflow-y: auto;

`;

const BodyInforBottom = styled.div`
overflow-y: auto;

`;


const DeleteMember =styled.div``;
const DeleteGroup =styled.div``;
const AddMemberToGroup = styled.div`
  display:block;
  flexDirection:column;
  
  
`;

const MenutoGroup = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 25px;
  margin-left: 15px;
`;


const ItemUser = styled.div`
  /* border: 1px solid rgb(219, 223, 229); */
  padding: 10px;
  display: flex;
`;
const ListMessage = styled.div``;
const TabList = styled.div`
  margin: 5px;
  opacity: ${(props) => (props.$activeContentTab ? "1" : "0.5")};
  font-weight: ${(props) => (props.$activeContentTab ? "bold" : "normal")};
  transition: opacity 0.3s ease, font-weight 0.3s ease;
`;
const TabsList = styled.div`
  height: 5%;
  display: inline-flex;
`;
const ContentTab = styled.div`
  height: 95%;
`;
const ContentBody = styled.div`
  height: 100vb;
  width: 85%;
  display: flex;
`;
const Content = styled.div`
  height: 100vb;
  width: 96%;
  display: flex;
  box-sizing: border-box;
`;
const Search = styled.div`
  padding: 5px;
`;
const ContentList = styled.div`
  height: 100vh;
  margin: 0;
`;
const HeaderList = styled.div`
  background: white;
  padding: 10px;
  height: 5%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const ListPerson = styled.div`
  height: 100%;
  width: 350px;
  overflow: hidden;
  border-right: 1px solid rgb(219, 223, 229);
`;
const InputInfor = styled.div`
  font-size: 22px;
  font-weight: 500;
`;
const HeaderInforMessage = styled.div`
  height: 8%;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 2px solid rgb(241, 243, 245);
`;
const BodyInforMessage = styled.div`
overflow-y: auto;
max-height: 600px; 
`;
const BodyContentMessage = styled.div`
  background: cyan;
  width: 100%;
  height: 92%;
`;
const LeftMessage = styled.div`
  float: left;
  display: flex;
  width: 80%;
`;
const IconGroupMessage = styled.div`
  display: flex;
  justify-content: space-around;
  float: right;
  align-items: center;
  width: 20%;
`;
const InputName = styled.div`
  margin-left: 90px;
  border: none;
  font-size: 23px;
  font-weight: bold;
  color: black;
`;
const ContentMessage = styled.div`
  height: 100vb;
  width: 70%;
  border-right: 1px solid rgb(219, 223, 229);
`;
const InforMessage = styled.div`
  height: 100vb;
  width: 30%;
`;
const Avatar = styled.div`
  background: black;
  width: 50px;
  height: 50px;
  margin: 15px 0px 15px 125px;
  
  border-radius: 50%;
`;
const HeaderContentMessage = styled.div`
  padding: 10px;
  display: flex;
  height: 8%;
  border-bottom: 1px solid rgb(241, 243, 245);
`;

const ChatMessage = styled.div`
  width: 100%;
  height: 100vb;
  display: flex;
  overflow: hidden;
`;
