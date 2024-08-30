import { TCreateClassroomFormData } from "../components/ClassroomCreatingModal/ClassroomCreatingForm.types";

const useClassroomCreation = () => {
  const onSubmit = (data: TCreateClassroomFormData) => {
    // will add api call here
    console.log(data);
  };
  return { onSubmit };
};

export default useClassroomCreation;
