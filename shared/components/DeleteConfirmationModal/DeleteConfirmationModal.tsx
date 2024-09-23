import { Box, Button, Modal, Title } from "@mantine/core";

import { useDeleteConfirmationModalStyles } from "./DeleteConfirmationModal.styles";
import { TDeleteConfirmationModalProps } from "./DeleteConfirmationModal.types";

const DeleteConfirmationModal = ({
  opened,
  close,
  onDeleteAction,
}: TDeleteConfirmationModalProps) => {
  const { classes } = useDeleteConfirmationModalStyles();

  return (
    <Modal opened={opened} onClose={close} centered>
      <Box className={classes.container}>
        <Title order={4} className={classes.title}>
          Are you sure you want to delete this?
        </Title>
        <Box className={classes.buttonsContianer}>
          <Button className={classes.noButton} onClick={close}>
            Cancel
          </Button>
          <Button className={classes.yesButton} onClick={onDeleteAction}>
            Confirm
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DeleteConfirmationModal;
