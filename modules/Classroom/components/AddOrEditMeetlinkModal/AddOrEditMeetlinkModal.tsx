import { useState } from "react";

import { Button, Flex, Modal, Text, TextInput, Title } from "@mantine/core";
import { showNotification } from "@mantine/notifications";

import { NOTIFICATION_AUTO_CLOSE_TIMEOUT_IN_MILLISECONDS } from "@/shared/constants/app.constants";
import { useEditClassroomMutation } from "@/shared/redux/rtk-apis/classrooms/classrooms.api";
import { TEditClassroomDto } from "@/shared/redux/rtk-apis/classrooms/classrooms.types";
import { parseApiErrorMessage } from "@/shared/utils/errors";

import { useMeetlinkModalStyles } from "./AddOrEditMeetlinkModal.styles";
import { TAddOrEditMeetlinkModalProps } from "./AddOrEditMeetlinkModal.types";

const AddOrEditMeetlinkModal = ({
  opened,
  close,
  classroomId,
  meetlink,
}: TAddOrEditMeetlinkModalProps) => {
  const { classes } = useMeetlinkModalStyles();
  const [newMeetLink, setNewMeetLink] = useState<string>("");
  const [validationMessage, setValidationMessage] = useState<string | null>(null);

  const [editClassroom, { isLoading }] = useEditClassroomMutation();

  const handleCancelButton = () => {
    setNewMeetLink("");
    setValidationMessage(null);
    close();
  };

  const handleAddButton = async () => {
    if (newMeetLink.trim().length === 0) {
      return setValidationMessage("Meet Link is required");
    }

    let formattedLink = newMeetLink.trim();
    if (!/^https?:\/\//i.test(formattedLink)) {
      formattedLink = `https://${formattedLink}`;
    }

    try {
      const url = new URL(formattedLink);

      if (!url.hostname.startsWith("meet.google.com")) {
        return setValidationMessage("URL must start with 'meet.google.com'");
      }
    } catch (error) {
      return setValidationMessage("Please insert a valid URL");
    }

    setValidationMessage("");

    const updatedClassroom: TEditClassroomDto = {
      meetLink: formattedLink,
    };

    try {
      const res = await editClassroom({ classroomId, updatedClassroom }).unwrap();

      if (res) {
        showNotification({
          title: "Success",
          message: "Meet Link Added Successfully",
          autoClose: NOTIFICATION_AUTO_CLOSE_TIMEOUT_IN_MILLISECONDS,
          color: "green",
        });
      }
    } catch (error) {
      const errorMessage = parseApiErrorMessage(error);

      showNotification({
        title: "Error",
        message: errorMessage,
        autoClose: NOTIFICATION_AUTO_CLOSE_TIMEOUT_IN_MILLISECONDS,
        color: "red",
      });
    }
    setValidationMessage(null);
    close();
  };

  return (
    <Modal opened={opened} onClose={close} centered>
      <Title className={classes.title} order={4}>
        {meetlink ? "Edit Meet Link" : "Add Meet Link"}
      </Title>
      <TextInput
        placeholder="Enter a link"
        label="Meet Link"
        value={newMeetLink || meetlink}
        onChange={(e) => setNewMeetLink(e.target.value)}
        className={classes.input}
        withAsterisk
      />
      <Text size={"xs"} color="red">
        {validationMessage}
      </Text>
      <Flex justify={"end"} align={"center"} gap={12} my={10}>
        <Button bg={"green"} onClick={handleCancelButton}>
          Cancel
        </Button>
        <Button loading={isLoading} bg={"green"} type="submit" onClick={handleAddButton}>
          Add
        </Button>
      </Flex>
    </Modal>
  );
};

export default AddOrEditMeetlinkModal;
