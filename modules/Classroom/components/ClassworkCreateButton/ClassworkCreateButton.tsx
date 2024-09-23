import { Box, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { FaBook, FaPlus, FaTimes } from "react-icons/fa";
import { LuClipboardList, LuFileEdit } from "react-icons/lu";

import { useCreateButtonStyles } from "./ClassworkCreateButton.styles";
import { TClassworkCreateButtonProps } from "./ClassworkCreateButton.types";

const ClassworkCreateButton = ({
  openExamModal,
  openResourceModal,
  openAssignmentModal,
}: TClassworkCreateButtonProps) => {
  const [opened, { toggle }] = useDisclosure(false);
  const { classes } = useCreateButtonStyles(opened);

  return (
    <Box className={classes.buttonsContainer}>
      <Button
        className={classes.createButton}
        onClick={toggle}
        leftIcon={opened ? <FaTimes /> : <FaPlus />}
      >
        {opened ? "Close" : "Create"}
      </Button>

      <Button
        className={classes.classworkButton}
        leftIcon={<LuClipboardList />}
        onClick={openExamModal}
      >
        Schedule Exam
      </Button>
      <Button
        className={classes.classworkButton}
        leftIcon={<LuFileEdit />}
        onClick={openAssignmentModal}
      >
        Add Assignment
      </Button>
      <Button className={classes.classworkButton} leftIcon={<FaBook />} onClick={openResourceModal}>
        Add Material
      </Button>
    </Box>
  );
};

export default ClassworkCreateButton;
