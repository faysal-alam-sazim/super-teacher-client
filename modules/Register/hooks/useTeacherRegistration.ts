import { TTeacherRegistrationFormData } from "../components/TeacherRegistrationForm/TeacherRegistrationForm.types";

const useTeacherRegistration = () => {
  const onSubmit = (data: TTeacherRegistrationFormData) => {
    // TO DO: will remove it when implements api call
    console.log(data);
  };
  return { onSubmit };
};

export default useTeacherRegistration;
