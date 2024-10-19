import React, { useEffect, useState } from "react";

import { ActionIcon, Box, Button, FileButton, Flex, Text, Textarea, Title } from "@mantine/core";
import { FaPaperclip } from "react-icons/fa";
import { LuX } from "react-icons/lu";
import { io } from "socket.io-client";

import { ACCESS_TOKEN_LOCAL_STORAGE_KEY } from "@/shared/constants/app.constants";
import { WS_BASE_URL } from "@/shared/constants/env.constants";
import { useAppSelector } from "@/shared/redux/hooks";
import { authenticatedUserSelector } from "@/shared/redux/reducers/user.reducer";
import {
  useAddMessageMutation,
  useGetAllMessagesQuery,
} from "@/shared/redux/rtk-apis/messages/messages.api";
import { TCreateMessageDto, TMessage } from "@/shared/redux/rtk-apis/messages/messages.types";
import { EGatewayIncomingEvent, EGatewayOutgoingEvent } from "@/shared/typedefs";
import { getFromLocalStorage } from "@/shared/utils/localStorage";
import { sortArray } from "@/shared/utils/sortArray";

import ChatCard from "../ChatCard/ChatCard";
import { useClassroomChatBoxStyles } from "./ClassroomChatBox.styles";
import { TClassroomChatBoxProps } from "./ClassroomChatBox.types";

const ClassroomChatBox = ({ classroom }: TClassroomChatBoxProps) => {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<TMessage[]>([]);
  const [validationMessage, setValidationMessage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const [addMessage] = useAddMessageMutation();
  const { data: savedMessages, isLoading } = useGetAllMessagesQuery(
    classroom?.id ? classroom.id.toString() : "",
    {
      skip: !classroom?.id,
    },
  );

  const { userId } = useAppSelector(authenticatedUserSelector);
  const { classes } = useClassroomChatBoxStyles();

  const accessToken = getFromLocalStorage(ACCESS_TOKEN_LOCAL_STORAGE_KEY);

  const newSocket = io(WS_BASE_URL, {
    path: "/ws",
    transports: ["websocket"],
    auth: {
      authorization: `Bearer ${accessToken}`,
    },
  });

  useEffect(() => {
    if (!isLoading) {
      const sortedMessage = sortArray([...(savedMessages || [])], "createdAt", "desc");
      setMessages(sortedMessage);
    }
  }, [savedMessages, isLoading]);

  useEffect(() => {
    newSocket.emit(EGatewayOutgoingEvent.JOIN_CLASSROOM, classroom.id);

    newSocket.on(EGatewayIncomingEvent.RECEIVE_MESSAGE, (newMessage) => {
      setMessages((prevMessages) => [newMessage, ...prevMessages]);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [newSocket, classroom.id]);

  const handlePost = async () => {
    if (message.trim().length === 0) {
      return setValidationMessage("Can't post blank message!");
    }

    setValidationMessage(null);
    const messageToAdd: TCreateMessageDto = {
      message,
      sender: userId || -1,
    };

    try {
      await addMessage({ id: classroom.id, newMessage: messageToAdd, attachment: file }).unwrap();
      setMessage("");
      setFile(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box className={classes.container}>
      <Box p={12}>
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.currentTarget.value)}
          placeholder="Announce something in the class"
          minRows={3}
        />
        <Text p={4} size={"sm"} color="red">
          {validationMessage}
        </Text>

        <Box className={classes.buttonsContainer}>
          {file ? (
            <Flex>
              <Text color="green">{file.name}</Text>{" "}
              <ActionIcon onClick={() => setFile(null)}>
                <LuX />
              </ActionIcon>
            </Flex>
          ) : (
            <FileButton
              onChange={setFile}
              accept={"application/pdf, image/png, image/jpg, image/jpeg"}
            >
              {(props) => (
                <Button {...props} leftIcon={<FaPaperclip />} className={classes.attachmentButton}>
                  Add Attachment
                </Button>
              )}
            </FileButton>
          )}
          <Flex gap={12}>
            <Button onClick={() => setMessage("")} className={classes.button}>
              Revert
            </Button>
            <Button onClick={handlePost} className={classes.button}>
              Post
            </Button>
          </Flex>
        </Box>
      </Box>
      <Box p={12}>
        {messages.length > 0 ? (
          messages.map((message, idx) => <ChatCard key={idx} message={message} />)
        ) : (
          <Flex h={"200px"} justify={"center"} align={"center"}>
            <Title order={3} color="black">
              This is where you share things with the class
            </Title>
          </Flex>
        )}
      </Box>
    </Box>
  );
};

export default ClassroomChatBox;
