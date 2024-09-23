import React from "react";

import { Card, Flex, Text, Title } from "@mantine/core";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { useAppSelector } from "@/shared/redux/hooks";
import { authenticatedUserSelector } from "@/shared/redux/reducers/user.reducer";
import { ERole } from "@/shared/typedefs";

import { useChatStyles } from "./ChatCard.styles";
import { TChatCardProps } from "./ChatCard.types";

dayjs.extend(relativeTime);

const ChatCard = ({ message }: TChatCardProps) => {
  const { userId } = useAppSelector(authenticatedUserSelector);
  const { classes } = useChatStyles();
  const fullName = message.sender.firstName + " " + message.sender.lastName;

  return (
    <Card className={classes.card}>
      <Flex direction={"column"} pb={"md"}>
        <Title order={5} color={message?.sender?.role === ERole.TEACHER ? "green" : "inherit"}>
          {fullName + (userId === message?.sender?.id ? " (you)" : "")}
        </Title>
        <Text className={classes.time}>{dayjs(message.createdAt).fromNow()}</Text>
      </Flex>
      <Text size={"md"}>{message.message}</Text>
    </Card>
  );
};

export default ChatCard;
