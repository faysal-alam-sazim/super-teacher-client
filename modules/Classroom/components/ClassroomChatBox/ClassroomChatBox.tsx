import React, { useEffect, useState } from "react";

import { Box, Button, Flex, Text, Textarea, Title } from "@mantine/core";

import { useWebsocket } from "@/shared/hooks/useWebsocket";
import { useAppSelector } from "@/shared/redux/hooks";
import { authenticatedUserSelector } from "@/shared/redux/reducers/user.reducer";
import {
  useAddMessageMutation,
  useGetAllMessagesQuery,
} from "@/shared/redux/rtk-apis/messages/messages.api";
import { TCreateMessageDto, TMessage } from "@/shared/redux/rtk-apis/messages/messages.types";
import { EGatewayIncomingEvent, EGatewayOutgoingEvent } from "@/shared/typedefs";
import { sortArray } from "@/shared/utils/sortArray";

import ChatCard from "../ChatCard/ChatCard";
import { useClassroomChatBoxStyles } from "./ClassroomChatBox.styles";
import { TClassroomChatBoxProps } from "./ClassroomChatBox.types";

const ClassroomChatBox = ({ classroom }: TClassroomChatBoxProps) => {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<TMessage[]>([]);
  const [validationMessage, setValidationMessage] = useState<string | null>(null);

  const [addMessage] = useAddMessageMutation();
  const { data: savedMessages, isLoading } = useGetAllMessagesQuery(
    classroom?.id ? classroom.id.toString() : "",
    {
      skip: !classroom?.id,
    },
  );

  const { userId } = useAppSelector(authenticatedUserSelector);
  const { classes } = useClassroomChatBoxStyles();

  const newSocket = useWebsocket({ path: "/ws" });

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
      sender: userId,
    };

    try {
      await addMessage({ id: classroom.id, newMessage: messageToAdd }).unwrap();
      setMessage("");
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
        <Flex justify={"end"} gap={6} mt={6}>
          <Button onClick={() => setMessage("")} className={classes.button}>
            Revert
          </Button>
          <Button onClick={handlePost} className={classes.button}>
            Post
          </Button>
        </Flex>
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
