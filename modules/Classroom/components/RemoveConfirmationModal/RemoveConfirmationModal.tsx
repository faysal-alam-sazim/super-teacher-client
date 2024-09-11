import { Box, Button, Flex, Modal, Title } from "@mantine/core";

import useEnrollmentApiCall from "../../hooks/useEnrollmentApiCall";
import { TRemoveConfirmationModalProps } from "./RemoveConfirmationModal.types";

const RemoveConfirmationModal = ({
  opened,
  close,
  classroomId,
  student,
  setStudentToRemove,
}: TRemoveConfirmationModalProps) => {
  const { removeStudent } = useEnrollmentApiCall();
  const handleDelete = () => {
    if (student) {
      removeStudent(classroomId, student.id);
      setStudentToRemove(null);
    }
    close();
  };

  return (
    <Modal opened={opened} onClose={close} centered>
      <Flex direction={"column"} justify={"center"} align={"center"}>
        <Box w={"80%"}>
          <Title sx={{ color: "green" }} tt="uppercase" size="lg" mb={24}>
            {`Are you sure you want to remove ${student && student.user?.firstName} ${student && student.user?.lastName} from the classroom?`}
          </Title>

          <Flex justify="end" align="center" gap={12} mt={48} mb={32}>
            <Button variant="filled" sx={{ backgroundColor: "#80147AFF" }} onClick={close}>
              Cancel
            </Button>
            <Button variant="filled" sx={{ backgroundColor: "#80147AFF" }} onClick={handleDelete}>
              Confirm
            </Button>
          </Flex>
        </Box>
      </Flex>
    </Modal>
  );
};

export default RemoveConfirmationModal;
