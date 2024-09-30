import ClassroomBanner from "../../components/ClassroomBanner/ClassroomBanner";
import ClassroomStreamBody from "../../components/ClassroomStreamBody/ClassroomStreamBody";
import { TClassroomStreamContainerProps } from "./ClassroomStreamContainer.types";

const ClassroomStreamContainer = ({ classroom }: TClassroomStreamContainerProps) => (
  <>
    <ClassroomBanner classroom={classroom} />
    <ClassroomStreamBody classroom={classroom} />
  </>
);

export default ClassroomStreamContainer;
