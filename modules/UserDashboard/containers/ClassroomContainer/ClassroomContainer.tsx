import { useEffect, useState } from "react";

import { useRouter } from "next/router";

import { Box, Flex } from "@mantine/core";

import { useAppSelector } from "@/shared/redux/hooks";
import { authenticatedUserSelector } from "@/shared/redux/reducers/user.reducer";
import { useGetClassroomsQuery } from "@/shared/redux/rtk-apis/classrooms/classrooms.api";
import { TClassroom } from "@/shared/redux/rtk-apis/classrooms/classrooms.types";

import ClassroomCard from "../../components/ClassroomCard/ClassroomCard";
import NoClassroom from "../../components/NoClassroom/NoClassroom";
import { IClassroomContainerProps } from "./ClassroomContainer.types";

const ClassroomContainer = ({ open }: IClassroomContainerProps) => {
  const user = useAppSelector(authenticatedUserSelector);
  const { data, isSuccess } = useGetClassroomsQuery();
  const [classrooms, setClassrooms] = useState<TClassroom[]>([]);

  const router = useRouter();

  useEffect(() => {
    if (isSuccess) {
      setClassrooms(data);
    }
  }, [data, isSuccess]);

  return (
    <Box mih={"91vh"} pos={"relative"}>
      {isSuccess && classrooms.length > 0 ? (
        <Flex justify={"center"} align={"baseline"} gap={32} wrap={"wrap"} my={20}>
          {classrooms.map((classroom) => (
            <Box key={classroom.id} onClick={() => router.push(`classrooms/${classroom.id}`)}>
              <ClassroomCard
                title={classroom.title}
                subject={classroom.subject}
                days={classroom.days}
                classTime={classroom.classTime}
              />
            </Box>
          ))}
        </Flex>
      ) : (
        <NoClassroom role={user.claim} open={open} />
      )}
    </Box>
  );
};

export default ClassroomContainer;
