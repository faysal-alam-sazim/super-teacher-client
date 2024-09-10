import { useGetEnrolledStudentsQuery } from "@/shared/redux/rtk-apis/classrooms/classrooms.api";
import { useGetStudentsQuery } from "@/shared/redux/rtk-apis/users/users.api";

type TStudentSelectOption = {
  value: string;
  label: string;
};

const useGetStudentsToEnroll = (classroomId: string) => {
  const { data: allUserStudents, isLoading: allUsersStudentsIsLoading } = useGetStudentsQuery();
  const { data: enrolledStudents, isLoading: enrolledStudentsIsLoading } =
    useGetEnrolledStudentsQuery(classroomId);

  let students: TStudentSelectOption[] = [];

  if (!allUsersStudentsIsLoading && !enrolledStudentsIsLoading) {
    if (allUserStudents && enrolledStudents) {
      const enrolledStudentIds = new Set(enrolledStudents.map((student) => student.id));

      const notEnrolledStudentUser = allUserStudents.filter(
        (user) => !enrolledStudentIds.has(user.student?.id || -1),
      );

      students = notEnrolledStudentUser.map((user) => ({
        value: user.student?.id.toString() || "-1",
        label: `${user.firstName} ${user.lastName}`,
      }));
    }
  }
  return { students };
};

export default useGetStudentsToEnroll;
