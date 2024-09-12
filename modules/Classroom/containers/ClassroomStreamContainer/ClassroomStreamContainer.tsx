import ClassroomBanner from "../../components/ClassroomBanner/ClassroomBanner";
import ClassroomStreamBody from "../../components/ClassroomStreamBody/ClassroomStreamBody";
import { TClassroomStreamContainerProps } from "./ClassroomStreamContainer.types";

const ClassroomStreamContainer = ({ classroom }: TClassroomStreamContainerProps) => (
  <>
    <ClassroomBanner
      title={classroom.title}
      subject={classroom.subject}
      classTime={classroom.classTime}
      days={classroom.days}
    />
    <ClassroomStreamBody classroom={classroom} />
  </>
);

export default ClassroomStreamContainer;
