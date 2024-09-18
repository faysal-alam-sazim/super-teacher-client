import ClassroomBanner from "../../components/ClassroomBanner/ClassroomBanner";
import { TClassroomStreamContainerProps } from "./ClassroomStreamContainer.types";

const ClassroomStreamContainer = ({ classroom }: TClassroomStreamContainerProps) => (
  <>
    <ClassroomBanner
      title={classroom.title}
      subject={classroom.subject}
      classTime={classroom.classTime}
      days={classroom.days}
    />
  </>
);

export default ClassroomStreamContainer;
