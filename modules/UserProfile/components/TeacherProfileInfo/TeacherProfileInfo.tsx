import { Box, Grid, Table, Text } from "@mantine/core";

import { useTeacherProfileStyles } from "./TeacherProfileInfo.styles";
import { TTeacherProfileInfoProps } from "./TeacherProfileInfo.types";

const TeacherProfileInfo = ({ userProfile }: TTeacherProfileInfoProps) => {
  const { classes } = useTeacherProfileStyles();

  const subjects = userProfile?.teacher?.subjectsToTeach;

  return (
    <Grid>
      <Grid.Col span={6}>
        <Box className={classes.infoBox}>
          <Text size={"sm"} className={classes.label}>
            Email
          </Text>
          <Text className={classes.info}>{userProfile?.email}</Text>
        </Box>
        <Box className={classes.infoBox}>
          <Text size={"sm"} className={classes.label}>
            First Name
          </Text>
          <Text className={classes.info}>{userProfile?.firstName}</Text>
        </Box>
        <Box className={classes.infoBox}>
          <Text size={"sm"} className={classes.label}>
            Major Subject
          </Text>
          <Text className={classes.info}>{userProfile?.teacher?.majorSubject}</Text>
        </Box>
        <Box className={classes.infoBox}>
          <Text size={"sm"} className={classes.label}>
            Subjects To Teach
          </Text>
          <Box className={classes.subjectsList}>
            <Table withColumnBorders>
              <tbody>
                <tr>
                  <td className={classes.tableSL}>SL</td>
                  <td className={classes.tableData}>Subject</td>
                </tr>
                {subjects?.map((subject, idx) => (
                  <tr key={idx}>
                    <td className={classes.tableSL}>{idx + 1}</td>
                    <td className={classes.tableData}>{subject}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Box>
        </Box>
      </Grid.Col>

      <Grid.Col span={6}>
        <Box className={classes.infoBox}>
          <Text size={"sm"} className={classes.label}>
            Gender
          </Text>
          <Text className={classes.info}>{userProfile?.gender}</Text>
        </Box>
        <Box className={classes.infoBox}>
          <Text size={"sm"} className={classes.label}>
            Last Name
          </Text>
          <Text className={classes.info}>{userProfile?.lastName}</Text>
        </Box>
        <Box className={classes.infoBox}>
          <Text size={"sm"} className={classes.label}>
            Highest Education Level
          </Text>
          <Text className={classes.info}>{userProfile?.teacher?.highestEducationLevel}</Text>
        </Box>
      </Grid.Col>
    </Grid>
  );
};

export default TeacherProfileInfo;
