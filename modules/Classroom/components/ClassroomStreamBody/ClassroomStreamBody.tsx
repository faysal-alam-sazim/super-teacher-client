import { Box, SimpleGrid, Text, Title } from "@mantine/core";
import dayjs from "dayjs";

import ClassroomChatBox from "../ClassroomChatBox/ClassroomChatBox";
import ClassroomMeetlink from "../ClassroomMeetlink/ClassroomMeetlink";
import { useClassroomStreamBodyStyles } from "./ClassroomStreamBody.styles";
import { TClassroomStreamBodyProps } from "./ClassroomStreamBody.types";

const ClassroomStreamBody = ({ classroom }: TClassroomStreamBodyProps) => {
  const { classes } = useClassroomStreamBodyStyles();

  return (
    <Box className={classes.streamBody}>
      <Box className={classes.classInfo}>
        <ClassroomMeetlink meetlink={classroom.meetLink} classroomId={classroom.id} />
        <Box className={[classes.boxDetails, classes.detailsContainer].join(" ")}>
          <SimpleGrid p={"xs"}>
            <Title order={4}>Details</Title>
            <Text size="sm">Subject: {classroom.subject}</Text>
            <Text size="sm">Class Time: {dayjs(classroom.classTime).format("hh:mm A")}</Text>
            <Text size="sm">Days: {classroom.days.join(", ")}</Text>
          </SimpleGrid>
        </Box>
      </Box>
      <ClassroomChatBox classroom={classroom} />
    </Box>
  );
};

export default ClassroomStreamBody;
