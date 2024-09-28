import { Box, Grid, Text } from "@mantine/core";

import { EEducationLevel } from "@/shared/typedefs";

import { useStudentProfileStyles } from "./StudentProfileInfo.styles";
import { TStudentProfileInfoProps } from "./StudentProfileInfo.types";

const StudentProfileInfo = ({ userProfile }: TStudentProfileInfoProps) => {
  const { classes } = useStudentProfileStyles();

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
            Address
          </Text>
          <Text className={classes.info}>{userProfile?.student?.address}</Text>
        </Box>
        <Box className={classes.infoBox}>
          <Text size={"sm"} className={classes.label}>
            Education Level
          </Text>
          <Text className={classes.info}>{userProfile?.student?.educationLevel}</Text>
        </Box>
        {userProfile?.student?.educationLevel === EEducationLevel.UNIVERSITY ? (
          <Box className={classes.infoBox}>
            <Text size={"sm"} className={classes.label}>
              Degree Name
            </Text>
            <Text className={classes.info}>{userProfile?.student?.degreeName}</Text>
          </Box>
        ) : (
          <Box className={classes.infoBox}>
            <Text size={"sm"} className={classes.label}>
              Class
            </Text>
            <Text className={classes.info}>{userProfile?.student?.class}</Text>
          </Box>
        )}
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
            Phone Number
          </Text>
          <Text className={classes.info}>{userProfile?.student?.phoneNumber}</Text>
        </Box>
        {userProfile?.student?.educationLevel === EEducationLevel.UNIVERSITY ? (
          <Box className={classes.infoBox}>
            <Text size={"sm"} className={classes.label}>
              Degree
            </Text>
            <Text className={classes.info}>{userProfile?.student?.degree}</Text>
          </Box>
        ) : (
          <Box className={classes.infoBox}>
            <Text size={"sm"} className={classes.label}>
              Medium
            </Text>
            <Text className={classes.info}>{userProfile?.student?.medium}</Text>
          </Box>
        )}

        {userProfile?.student?.educationLevel === EEducationLevel.UNIVERSITY ? (
          <Box className={classes.infoBox}>
            <Text size={"sm"} className={classes.label}>
              Semester/Year
            </Text>
            <Text className={classes.info}>{userProfile?.student?.semesterYear}</Text>
          </Box>
        ) : null}
      </Grid.Col>
    </Grid>
  );
};

export default StudentProfileInfo;
