import React, { useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import {
  Box,
  FormControl,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { getSender, getSenderFull } from "../config/ChatLogics";
import ProfileModal from "./miscellaneous/profileModal";
import UpdateGroupChatModal from "./miscellaneous/UpdateGroupChatModal";
import axios from "axios";

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState();
  const [isInputEmpty, setInputEmpty] = useState(true); // Track if the input field is empty
  const [messageSent, setMessageSent] = useState(false); // Track if a message has been sent
  const toast = useToast();
  const { user, selectedChat, setSelectedChat } = ChatState();

  //Handling  ForwardArrow key press
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  const sendMessage = async (event) => {
    if (newMessage) {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        setNewMessage("");
        const { data } = await axios.post(
          "/api/message",
          {
            content: newMessage,
            chatId: selectedChat._id,
          },
          config
        );
        console.log(data);
        setMessages([...messages, data]);
        setMessageSent(true); // Message has been sent
      } catch (error) {
        toast({
          title: "Error Occured!",
          description: "Failed to send the Message",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "bottom",
        });
      }
    }
  };
  const typingHandler = (e) => {
    setNewMessage(e.target.value);
    setInputEmpty(e.target.value === ""); // Check if the input field is empty
    setMessageSent(false); // Reset messageSent when typing again
    //Typing Indicator Logic
  };
  return (
    <>
      {selectedChat ? (
        <>
          <Text
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            width="100%"
            fontFamily="Work sans"
            display="flex"
            justifyContent={{ base: "space-between" }}
            alignItems="center"
          >
            <IconButton
              display={{ base: "flex", md: "none" }}
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat("")}
            />
            {!selectedChat.isGroupChat ? (
              <>
                {getSender(user, selectedChat.users)}
                <ProfileModal user={getSenderFull(user, selectedChat.users)} />
              </>
            ) : (
              <>
                {selectedChat.chatName.toUpperCase()}
                <UpdateGroupChatModal
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                />
              </>
            )}
          </Text>
          <Box
            display="flex"
            flexDir="column"
            justifyContent="flex-end"
            padding={3}
            bg="#E8E8E8"
            width="100%"
            height="100%"
            borderRadius="lg"
            overflowY="hidden"
          >
            {loading ? (
              <Spinner
                size="xl"
                width={20}
                height={20}
                alignSelf="center"
                margin="auto"
              />
            ) : (
              <div>{/*Messages */}</div>
            )}
            <FormControl isRequired mt={3}>
              <InputGroup>
                {/*<InputRightElement
                  pointerEvents="none"
                  children={<ArrowForwardIcon color="gray.800" />}
                />*/}
                <Input
                  variant="filled"
                  bg="#E0E0E0"
                  placeholder="Type a message"
                  onChange={typingHandler}
                  onKeyDown={handleKeyPress}
                  value={newMessage}
                  style={{
                    width:
                      isInputEmpty || messageSent
                        ? "calc(100% - 1.0rem)"
                        : "calc(100% - 2.6rem)",
                    // Adjusting the width based on the width of the arrow button
                  }}
                />
                <InputRightElement
                  width="2.2rem"
                  pointerEvents="auto"
                  children={
                    isInputEmpty || messageSent ? null : (
                      <IconButton
                        display={{ base: "flex" }}
                        aria-label="Send"
                        icon={<ArrowForwardIcon />}
                        onClick={sendMessage}
                      />
                    )
                  }
                />
                {/*<IconButton
                  display={{ base: "flex" }}
                  icon={<ArrowForwardIcon />}
                  onClick={sendMessage}
                />*/}
              </InputGroup>
            </FormControl>
          </Box>
        </>
      ) : (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="100%"
        >
          <Text
            fontSize={{ base: "28px", md: "25px" }}
            pb={3}
            fontFamily="Work sans"
          >
            Click on a user to start chat
          </Text>
        </Box>
      )}
    </>
  );
};

export default SingleChat;
