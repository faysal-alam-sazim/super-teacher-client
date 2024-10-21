import React from "react";

import { Badge, Button, Card, Flex, Text, Title } from "@mantine/core";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { FaFilePdf } from "react-icons/fa";

import { useAppSelector } from "@/shared/redux/hooks";
import { authenticatedUserSelector } from "@/shared/redux/reducers/user.reducer";
import { useLazyGetAttachmentDownloadUrlQuery } from "@/shared/redux/rtk-apis/messages/messages.api";
import { ERole } from "@/shared/typedefs";

import { useChatStyles } from "./ChatCard.styles";
import { TChatCardProps } from "./ChatCard.types";

dayjs.extend(relativeTime);

const ChatCard = ({ message, classroomId }: TChatCardProps) => {
  const { userId } = useAppSelector(authenticatedUserSelector);
  const { classes } = useChatStyles();
  const fullName = message.sender.firstName + " " + message.sender.lastName;

  const [getDownloadUrl, { isLoading: isDownloadLoading }] = useLazyGetAttachmentDownloadUrlQuery();

  const handleOpenFile = async () => {
    const downloadUrl = await getDownloadUrl({ classroomId, messageId: message.id }).unwrap();

    if (!isDownloadLoading) {
      window.open(downloadUrl, "_blank");
    }
  };

  const isTeacher = message?.sender?.role === ERole.TEACHER;

  return (
    <Card className={classes.card}>
      <Flex direction={"column"} pb={"md"}>
        <Flex align={"center"} gap={12}>
          <Title order={5} color="inherit">
            {fullName + (userId === message?.sender?.id ? " (you)" : "")}
          </Title>
          {isTeacher ? <Badge size="xs">Teacher</Badge> : null}
        </Flex>
        <Text className={classes.time}>{dayjs(message.createdAt).fromNow()}</Text>
      </Flex>
      <Text size={"md"}>{message.message}</Text>
      {message.attachmentUrl ? (
        <Button
          className={classes.downloadButton}
          rightIcon={<FaFilePdf />}
          onClick={handleOpenFile}
        >
          Download
        </Button>
      ) : null}
    </Card>
  );
};

export default ChatCard;
